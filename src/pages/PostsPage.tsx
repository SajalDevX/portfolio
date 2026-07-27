import React from 'react';
import { Link } from 'react-router-dom';
import { getPublishedPosts } from '../config/posts';
import { PostTags } from '../components/posts/PostTags';

export const PostsPage: React.FC = () => {
	const posts = getPublishedPosts();

	return (
		<div className="mx-auto max-w-4xl px-4 py-12">
			<h1 className="text-text mb-12 text-4xl font-bold">Posts</h1>
			
			<div className="space-y-8">
				{posts.map((post) => (
					<Link
						key={post.slug}
						to={`/posts/${post.slug}`}
						className="hover:bg-surface0/50 bg-mantle block rounded-lg border border-surface0 p-6 transition-all duration-200"
					>
						<article>
							<h2 className="text-text mb-2 text-2xl font-bold hover:text-accent transition-colors">
								{post.title}
							</h2>
							
							<time className="text-subtext0 mb-3 block text-sm">
								{post.date}
							</time>
							
							<p className="text-text mb-4 leading-relaxed">
								{post.description}
							</p>
							
							<PostTags tags={post.tags} />
						</article>
					</Link>
				))}
			</div>
		</div>
	);
};
