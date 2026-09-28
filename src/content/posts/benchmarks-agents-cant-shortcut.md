For the last few months I've been writing evaluation tasks for terminal-based AI coding agents — Terminal-Bench style work for AfterQuery's Frontier Bench and Handshake's Dynamo and Seal projects. The job sounds like writing programming exercises. It isn't. It's adversarial design: you are building a small world in which the only way to pass is to actually do the work, and agents are very good at finding the other ways.

Here is what a task looks like and the checks I've learned to build in.

## Anatomy of a task

Every task ships as a container image plus a few files:

- **The environment** the agent sees: a repository, some data, a broken build, a service that misbehaves — whatever the scenario needs, in a realistic layout.
- **The instruction**: a short, unambiguous description of the deliverable. Not the steps, the outcome.
- **A reference solution** ("oracle") that a competent engineer would write, used to prove the task is solvable as specified.
- **A verifier** that runs *after* the agent finishes, in an isolated step the agent cannot see or influence, and returns pass or fail. Binary grading, no partial credit.

The verifier is where most of the design effort goes.

## Contract first: define the artifact

The single most useful habit is to write the artifact contract before anything else. Not "fix the parser" but "when finished, `./bin/parse fixtures/*.log` must exit 0 and write `out/summary.json` matching this schema, with these exact aggregate values for the provided fixtures". A precise contract does three things at once: it makes the instruction unambiguous, it makes the verifier mechanical, and it removes the temptation to grade on vibes.

Determinism follows from this. If the expected output depends on time, randomness, network or hardware, the task is broken — pin seeds, freeze clocks, vendor dependencies, and make the verifier compare against values you can regenerate.

## Three runs every task must survive

Before a task is accepted I run it three ways:

1. **Oracle run.** Apply the reference solution, run the verifier. It must pass. Obvious, and still the step most often skipped.
2. **No-op run.** Do nothing, run the verifier. It must *fail*. If an untouched environment passes, the verifier is checking something that was already true.
3. **Shortcut runs.** Try the lazy solutions an agent would try, and make sure each one fails.

The third category is where the craft lives.

## The shortcuts

A non-exhaustive list of things agents actually do when the verifier lets them:

- **Hard-code the answer.** If the fixtures are visible and the expected output is derivable by hand, an agent will write `print(42)`. Counter: verify on held-out inputs the agent never sees, generated from the same distribution.
- **Edit the test instead of the code.** Counter: the verifier runs from a pristine copy of the checks, not from the agent's working tree, and diffs protected paths to confirm they were not touched.
- **Special-case the fixture names.** `if filename == "sample_3.log": return known_result`. Counter: held-out inputs with fresh names, and property checks (totals must equal the sum of parts, output must be sorted) rather than only golden files.
- **Satisfy the exit code, not the behaviour.** A build that "succeeds" by disabling the failing step. Counter: assert on the produced artifact, never on the process exit code alone.
- **Modify protected inputs.** Rewrite the ground truth so the comparison becomes trivial. Counter: pin SHA-256 hashes of every input the instruction says is read-only and check them in the verifier.
- **Print the right thing along with a lot of wrong things.** Counter: if the contract says "stdout contains exactly one line", the verifier enforces exactly one line — blank lines and log noise included.

Each counter is small. The discipline is remembering to add all of them, every time.

## Difficulty is a property of the gap

A good task has a gap between "understands the problem" and "produced the artifact" that requires real terminal work: reading code, running things, reading their output, adjusting. Tasks that can be solved by reading the instruction and typing the answer are too easy regardless of how sophisticated the domain sounds. Tasks that can't be solved by a careful engineer with the tools in the container are broken, not hard. The oracle run keeps you honest on the second point; watching agent trajectories keeps you honest on the first.

## Reading trajectories

Once a task is live, the transcripts of agents attempting it are the best feedback I get. Patterns I look for:

- Agents consistently stuck on the same ambiguous sentence → the instruction needs a rewrite, not the agent.
- Agents passing without touching the file that contains the bug → the verifier has a hole.
- Agents solving it in two commands → the gap is too small; move the difficulty into the environment, not the wording.

Every one of those becomes an edit to the task and another spin through the oracle / no-op / shortcut loop.

## Why I like this work

Shipping product code taught me to make things work. Writing benchmarks is teaching me to ask, for everything I build, "what is the cheapest way this could *appear* to work?" — and then to close that door on purpose. It's the same instinct that makes a good code reviewer, and I think it makes me a better engineer on the other side of the table too.
