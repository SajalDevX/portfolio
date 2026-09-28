When we launched the Duel feature at PrepAiro — 1v1 and multiplayer "all-compete" quiz rooms — the first version worked fine on one pod and fell apart the moment Kubernetes scaled us to two. This is a write-up of what broke and the three mechanisms that fixed it: Postgres advisory locks, owning-pod heartbeats, and an orphaned-room sweeper.

## The setup

Clients talk to the backend over WebSockets through [Centrifugo](https://centrifugal.dev/), which handles fan-out and reconnects. The Spring Boot service behind it owns the game logic: who's in the room, the current question, who answered what, when the round ends. Rooms are short-lived (a few minutes) and there are many of them at once.

The original implementation kept each room's state in memory on whichever pod created it, with STOMP sessions pinned to that pod. Simple, fast, and completely wrong for a horizontally scaled deployment.

## What broke

Three failure modes showed up as soon as the HPA started scaling on evening traffic:

1. **Split brain.** A player's reconnect landed on a different pod, which had never heard of the room. From the client's point of view the game had vanished.
2. **Double scheduling.** Round timers were local `ScheduledExecutorService` tasks. When two pods both believed they owned a room, both advanced the question and clients received conflicting state.
3. **Zombie rooms.** When a pod was terminated mid-game (scale-down, rollout, OOM), its rooms simply stopped. Players sat on a spinner until they gave up.

## Move the state out of the pod

The first change is boring and non-negotiable: room state has to live somewhere every pod can see. We moved it into Postgres via JPA — a `duel_room` row with the participants, current question index, deadlines and a version column. Pods became stateless with respect to games; any pod could serve any room.

That alone fixes split brain, but it makes double scheduling *worse*, because now every pod can see every room and will happily try to advance all of them.

## One owner per room: advisory locks

We needed exactly one pod to run the timers for a given room at any moment, without introducing a coordinator. Postgres already has a primitive for this: [advisory locks](https://www.postgresql.org/docs/current/explicit-locking.html#ADVISORY-LOCKS).

Before a pod does anything that mutates a room's progression, it does:

```sql
SELECT pg_try_advisory_xact_lock(:roomKey);
```

inside the transaction that performs the mutation. `roomKey` is a stable 64-bit hash of the room id. If the call returns `false`, some other pod is acting on this room right now and we simply skip our tick. Because the lock is transaction-scoped, it releases automatically on commit or rollback — there is no lock to forget to release when a pod dies.

Advisory locks give you mutual exclusion per tick; they don't tell you *who should be ticking*. For that we added ownership.

## Owning-pod heartbeats

Each room row records `owner_pod` and `owner_heartbeat_at`. A pod that creates a room, or successfully takes it over, writes its own pod name and stamps the heartbeat. While it owns the room it refreshes the heartbeat every few seconds from a lightweight job. Timer ticks are only executed by the pod that currently owns the room; other pods see the row and leave it alone.

The rule is: a room whose heartbeat is older than a threshold (we used roughly three missed beats) is presumed orphaned, whatever `owner_pod` says. This turns "is that pod alive?" — a question Kubernetes answers slowly and indirectly — into "did anyone touch this row recently?", which any pod can answer with one indexed query.

## The orphaned-room sweeper

Every pod runs a sweeper on a short interval. It selects rooms whose heartbeat has gone stale, and for each one tries to take ownership:

```sql
UPDATE duel_room
   SET owner_pod = :me, owner_heartbeat_at = now()
 WHERE id = :roomId
   AND owner_heartbeat_at < now() - interval '15 seconds';
```

The `WHERE` clause is the whole trick. If two pods race to adopt the same orphan, only the first `UPDATE` matches; the second updates zero rows and moves on. The adopting pod then recomputes where the room should be in its timeline from the persisted deadlines — not from wall-clock guesses — and resumes, publishing the current state through Centrifugo so reconnecting clients snap straight back in.

## What it looks like under a scale event

Putting the pieces together, when a pod is killed mid-round:

- Its rooms' heartbeats stop.
- Within one sweeper interval another pod adopts them, guarded by the conditional update.
- The new owner replays the room's timeline from Postgres and takes over timers.
- Clients that dropped reconnect through Centrifugo and receive the current state — a few seconds of pause instead of a dead game.

No coordinator service, no distributed cache, no leader election library. Three columns, one lock primitive and a conditional `UPDATE`.

## Things I'd tell past me

- **Persist deadlines, not durations.** Store "round ends at 12:03:45Z", never "30 seconds left". A recovering pod can reason about the former; the latter is meaningless once the original owner is gone.
- **Make the sweeper idempotent from day one.** It will run against rooms that are half-adopted, already finished or being adopted by someone else. Every step must tolerate that.
- **Tune the heartbeat threshold against your rollout strategy.** Too short and normal GC pauses trigger takeovers; too long and players notice the gap. Measure your real p99 pause before picking a number.
- **Advisory locks are per-connection.** If you use a connection pool (you do), make sure the lock and the mutation share the same transaction, or you've locked nothing.
