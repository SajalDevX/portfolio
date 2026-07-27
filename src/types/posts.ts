export interface Post {
	slug: string;
	title: string;
	date: string;
	description: string;
	tags: string[];
	content?: string;
	published?: boolean;
}

export type PostMetadata = Omit<Post, 'content'>;
