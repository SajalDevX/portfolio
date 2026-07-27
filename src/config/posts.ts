import type { PostMetadata } from '../types/posts';

export const posts: PostMetadata[] = [
	{
		slug: 'aws-lambda-handler-gotchas',
		title: 'AWS Lambda InvalidEntrypoint Debugging',
		date: 'November 28, 2025',
		description:
			'Runtime.InvalidEntrypoint can mean async handlers, architecture mismatches, or file permissions — CloudWatch won\'t tell you which.',
		tags: ['aws', 'lambda', 'python', 'docker', 'debugging'],
		published: true
	},
	{
		slug: 'aws-cdk-credentials-hell',
		title: 'AWS CDK Credentials Hell',
		date: 'November 26, 2025',
		description:
			'Fix AWS CDK InvalidClientTokenId error after migrating to AWS SSO. The solution: delete stale ~/.aws/credentials.',
		tags: ['aws', 'cdk', 'sso', 'debugging'],
		published: true
	},
	{
		slug: 'hello-world',
		title: 'Hello World',
		date: 'October 19, 2025',
		description: 'Hey there - What this site is built with and how it works.',
		tags: ['meta', 'web-dev', 'sveltekit'],
		published: true
	},
	{
		slug: 'stop-burning-cpu-fastapi-streams',
		title: 'Stop Burning CPU on Dead FastAPI Streams',
		date: 'July 06, 2025',
		description:
			'Monitor FastAPI client connections and auto-cancel abandoned streaming tasks with structured concurrency',
		tags: ['fastapi', 'python', 'async', 'streaming'],
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
