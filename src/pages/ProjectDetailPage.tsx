import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { IconArrowLeft, IconBrandGithub, IconCalendar, IconFileText } from '@tabler/icons-react';
import { getProjectBySlug } from '../config/projects';
import { ProjectTags } from '../components/projects/ProjectTags';
import { ProjectCard } from '../components/projects/ProjectCard';

export const ProjectDetailPage: React.FC = () => {
	const { slug } = useParams<{ slug: string }>();
	const project = slug ? getProjectBySlug(slug) : null;

	if (!project) {
		return (
			<div className="mx-auto max-w-4xl space-y-8 px-4 py-8">
				<Link
					to="/projects"
					className="hover:text-accent inline-flex items-center gap-2 text-sm transition-colors"
				>
					<IconArrowLeft size={16} />
					Back to Projects
				</Link>
				<div className="text-center">
					<h1 className="mb-4 text-3xl font-bold">Project Not Found</h1>
					<p className="text-subtext0">The project you're looking for doesn't exist.</p>
				</div>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-4xl space-y-8 px-4 py-8">
			{/* Terminal-style Project Card */}
			{project.githubInfo && (
				<ProjectCard
					owner={project.githubInfo.owner}
					repo={project.githubInfo.repo}
					description={project.description}
					stars={project.githubInfo.stars || 0}
					contributors={project.githubInfo.contributors || 0}
				/>
			)}

			{/* Project Title */}
			<div className="space-y-4">
				<h1 className="text-4xl font-bold md:text-5xl">{project.title}</h1>

				<div className="flex flex-wrap items-center gap-4 text-sm">
					<div className="text-subtext0 flex items-center gap-1.5">
						<IconCalendar size={16} />
						<span>March 01, 2025</span>
					</div>

					{project.github && (
						<a
							href={project.github}
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-accent inline-flex items-center gap-1.5 transition-colors"
						>
							<IconBrandGithub size={16} />
						</a>
					)}

					{project.live && (
						<a
							href={project.live}
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-accent inline-flex items-center gap-1.5 transition-colors"
						>
							<IconFileText size={16} />
						</a>
					)}
				</div>

				{/* Tags */}
				<div className="text-subtext0">
					<ProjectTags project={{ slug: project.slug, metadata: { tags: project.tags } }} />
				</div>
			</div>

			<hr className="border-surface1 my-8" />

			{/* Description */}
			<div className="prose prose-invert max-w-none space-y-6">
				<h2 className="text-2xl font-semibold">{project.title}</h2>
				{project.fullDescription.split('\n\n').map((paragraph, index) => (
					<p key={index} className="text-subtext0 text-base leading-relaxed">
						{paragraph}
					</p>
				))}
			</div>

			{/* Key Features Section */}
			<div className="space-y-4">
				<h2 className="text-2xl font-semibold">Key Features</h2>
				<ul className="text-subtext0 ml-6 list-disc space-y-2">
					{project.tags.map((tag) => (
						<li key={tag}>
							<span className="text-text font-medium capitalize">{tag.replace(/-/g, ' ')}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
