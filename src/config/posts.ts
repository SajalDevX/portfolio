import type { PostMetadata } from '../types/posts';

// Add posts here as they are written. Each entry needs a matching page or
// markdown file (see public/posts/README.md). Nothing is listed until it is real.
export const posts: PostMetadata[] = [];

export function getPublishedPosts(): PostMetadata[] {
	return posts
		.filter((post) => post.published !== false)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): PostMetadata | undefined {
	return posts.find((post) => post.slug === slug);
}
