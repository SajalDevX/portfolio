import type { PostMetadata } from '../types/posts';

// Post bodies live in src/content/posts/<slug>.md and are bundled at build time.
const bodies = import.meta.glob('../content/posts/*.md', { query: '?raw', import: 'default', eager: true }) as Record<
	string,
	string
>;

export const posts: PostMetadata[] = [
	{
		slug: 'benchmarks-agents-cant-shortcut',
		title: "Designing benchmark tasks that agents can't shortcut",
		date: 'September 21, 2026',
		description:
			'What a Terminal-Bench style task is made of, the oracle / no-op / shortcut runs every task must survive, and the specific ways agents cheat when the verifier lets them.',
		tags: ['ai-agents', 'benchmarks', 'terminal-bench', 'evaluation', 'docker'],
		published: true
	},
	{
		slug: 'pod-death-safe-realtime-rooms',
		title: 'Real-time game rooms that survive pod death',
		date: 'August 30, 2026',
		description:
			"How PrepAiro's duel backend went from pod-local state to Postgres-backed rooms with advisory locks, owning-pod heartbeats and an orphaned-room sweeper — no coordinator required.",
		tags: ['spring-boot', 'postgresql', 'kubernetes', 'centrifugo', 'real-time'],
		published: true
	},
	{
		slug: 'clickstream-kafka-parquet-duckdb',
		title: 'A clickstream pipeline for a small team: Kafka → Parquet → DuckDB',
		date: 'August 9, 2026',
		description:
			'Capturing every interaction from a 150K-install Flutter app and answering ad-hoc questions in SQL, without a warehouse bill: offline-first events, a thin Kafka producer, ten-minute Parquet files on S3, DuckDB on top.',
		tags: ['kafka', 'duckdb', 'parquet', 'analytics', 'flutter'],
		published: true
	}
];

export function getPublishedPosts(): PostMetadata[] {
	return posts
		.filter((post) => post.published !== false)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): PostMetadata | undefined {
	return posts.find((post) => post.slug === slug);
}

export function getPostBody(slug: string): string | undefined {
	return bodies[`../content/posts/${slug}.md`];
}
