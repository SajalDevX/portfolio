import React, { useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { marked } from 'marked';
import { getPostBySlug, getPostBody } from '../config/posts';
import { PostTags } from '../components/posts/PostTags';
import { IconTag, IconCalendar, IconArrowLeft, IconClock } from '@tabler/icons-react';

marked.setOptions({ gfm: true, breaks: false });

const readingTime = (markdown: string) => Math.max(1, Math.round(markdown.split(/\s+/).length / 220));

export const PostDetailPage: React.FC = () => {
	const { slug } = useParams<{ slug: string }>();
	const post = slug ? getPostBySlug(slug) : undefined;
	const body = slug ? getPostBody(slug) : undefined;

	const html = useMemo(() => (body ? (marked.parse(body) as string) : ''), [body]);

	if (!post) {
		return <Navigate to="/posts" replace />;
	}

	return (
		<div className="mx-auto max-w-3xl px-4 py-12">
			<Link
				to="/posts"
				className="text-subtext1 hover:text-accent mb-8 inline-flex items-center gap-1.5 text-sm transition-colors"
			>
				<IconArrowLeft size={16} />
				All posts
			</Link>

			<header className="mb-10">
				<h1 className="text-text mb-5 text-3xl leading-tight font-bold md:text-4xl">{post.title}</h1>
				<p className="text-subtext0 mb-5 text-lg leading-relaxed">{post.description}</p>
				<div className="text-subtext0 mb-5 flex flex-wrap items-center gap-4 text-sm">
					<span className="flex items-center gap-2">
						<IconCalendar size={16} className="text-accent" />
						<time>{post.date}</time>
					</span>
					{body && (
						<span className="flex items-center gap-2">
							<IconClock size={16} className="text-accent" />
							{readingTime(body)} min read
						</span>
					)}
				</div>
				{post.tags.length > 0 && (
					<div className="flex items-start gap-2">
						<IconTag size={16} className="text-accent mt-1" />
						<PostTags tags={post.tags} />
					</div>
				)}
			</header>

			{body ? (
				<article className="post-body" dangerouslySetInnerHTML={{ __html: html }} />
			) : (
				<p className="text-subtext1 italic">This post is still being written.</p>
			)}
		</div>
	);
};
