Analytics for a consumer app tends to arrive in one of two flavours: a SaaS dashboard that answers the ten questions its vendor thought of, or a warehouse with a monthly bill that scales faster than your user base. At PrepAiro we needed to answer arbitrary questions about how 150K+ learners moved through the app, on a budget appropriate for an early-stage team. This is the pipeline we ended up with: Flutter events, through Kafka, into S3 as Parquet, queried with DuckDB.

## Requirements, honestly stated

- Capture every meaningful interaction — screen views, quiz starts, answers, duel joins, purchases — with enough context to reconstruct a session.
- Never lose events because the phone was offline or the app was killed.
- Let engineers and product ask ad-hoc questions in SQL without waiting for someone to build a report.
- Keep the marginal cost per event close to zero.

## On the device

Events are appended to a local queue first, not sent straight to the network. The Flutter client batches them and flushes on a timer or when the batch reaches a size threshold, retrying with backoff. The important property is that an event, once recorded locally, survives app restarts, network failures and device reboots until the server has acknowledged it. Fire-and-forget HTTP calls are how you end up with analytics that quietly under-count your worst-connected users — usually the ones you most need to understand.

Every event carries a client-generated id, a device id, a session id, the app version and a monotonic sequence number. The server uses the id for de-duplication, because "at least once" delivery is the only kind you can build reliably on a phone.

## Ingestion: a thin Kafka producer

The ingest service does as little as possible: authenticate, validate the envelope, stamp a server-side receive time, and produce to a Kafka topic keyed by device id. Keying by device keeps one user's events ordered within a partition, which makes sessionisation downstream much simpler.

Kafka here is a buffer more than a streaming platform. It absorbs spikes (an evening push notification can 10× traffic for a few minutes), decouples the app from the storage layer, and gives us replay if anything downstream breaks.

## Landing: Confluent S3 sink, ten-minute Parquet files

Rather than write a consumer, we used the Confluent S3 sink connector with the Parquet format and a time-based partitioner. Every ten minutes it closes a file per partition and writes it to a path like:

```
s3://prepairo-events/clickstream/dt=2026-02-14/hour=19/part-00003.parquet
```

Ten minutes was the compromise between file count and freshness. Parquet matters more than it sounds: columnar layout plus compression means a day of events is a small fraction of the raw JSON size, and any query that touches three columns reads only those three columns.

## Querying: DuckDB straight off S3

This is the part that made the whole thing cheap. [DuckDB](https://duckdb.org/) can query Parquet files in S3 directly, with predicate pushdown on the Hive-style partitions:

```sql
INSTALL httpfs; LOAD httpfs;

SELECT event_name, count(*) AS n
FROM read_parquet('s3://prepairo-events/clickstream/dt=2026-02-*/**/*.parquet')
WHERE app_version >= '3.2.0'
GROUP BY 1
ORDER BY n DESC;
```

An analyst runs that on a laptop. A scheduled job runs a longer version of it for the daily funnel report. There is no warehouse cluster to keep warm, no per-query billing surprise, and the same files serve both.

For questions we ask every day we materialise small rollups (daily active devices, funnel step counts, duel completion rates) back to S3 as their own Parquet files, so the dashboards read pre-aggregated data and the raw layer is only scanned for new questions.

## What it cost, roughly

- Kafka: a small managed cluster we were already paying for.
- S3: pennies per month at our volume, dominated by request count rather than storage.
- Compute: DuckDB on whatever machine is asking the question.

Two million-plus campaign events a month flowed through the same path once ads attribution was added, without changing the architecture.

## Lessons

- **Sessionise late.** Store raw events and derive sessions in SQL. Every time we thought we knew the session rule, a product change proved us wrong.
- **Version the schema in the event.** An `app_version` column saved us repeatedly when an old client kept emitting a field we'd renamed.
- **Ten-minute files are fine; one-minute files are not.** Small-file overhead in S3 and Parquet footers will eat your query time long before storage costs matter.
- **Keep the ingest service dumb.** Enrichment belongs in the query layer where it can be changed without a deploy.

If you're a small team wondering whether you need a warehouse: probably not yet. Get the events onto disk in a columnar format and you'll be surprised how far a single DuckDB process goes.
