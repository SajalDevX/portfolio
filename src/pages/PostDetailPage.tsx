import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getPostBySlug } from '../config/posts';
import { PostTags } from '../components/posts/PostTags';
import { IconTag, IconCalendar } from '@tabler/icons-react';

export const PostDetailPage: React.FC = () => {
	const { slug } = useParams<{ slug: string }>();
	const post = slug ? getPostBySlug(slug) : undefined;

	if (!post) {
		return <Navigate to="/posts" replace />;
	}

	return (
		<div className="mx-auto max-w-4xl px-4 py-12">
			{/* Header */}
			<header className="mb-12">
				<h1 className="text-text mb-6 text-4xl font-bold leading-tight md:text-5xl">
					{post.title}
				</h1>

				<div className="text-subtext0 mb-6 flex flex-wrap items-center gap-4 text-sm">
					<div className="flex items-center gap-2">
						<IconCalendar size={18} className="text-accent" />
						<time>{post.date}</time>
					</div>
				</div>

				{post.tags && post.tags.length > 0 && (
					<div className="flex items-start gap-2">
						<IconTag size={18} className="text-accent mt-1" />
						<PostTags tags={post.tags} />
					</div>
				)}
			</header>

			{/* Content */}
			<article className="prose-custom">
				<section className="text-text space-y-6">
					<p className="text-lg leading-relaxed">{post.description}</p>

					<div className="bg-surface0 rounded-lg border border-surface1 p-6">
						<p className="text-subtext0">
							Full blog post content would go here. This is a placeholder for the actual
							markdown or rich text content.
						</p>
					</div>

					<p className="text-subtext0 italic">
						Note: Add your actual blog post content by creating markdown files or integrating
						with a CMS.
					</p>
				</section>
			</article>
		</div>
	);
};
