import React from 'react';
import { IconArrowRight, IconStar } from '@tabler/icons-react';
import { type FeaturedProject } from '../../types/projects';
import { ProjectTags } from '../projects/ProjectTags';
import { Link } from 'react-router-dom';

interface FeaturedProps {
	projects: FeaturedProject[];
	maxProjects?: number;
}

export const Featured: React.FC<FeaturedProps> = ({ projects, maxProjects = 2 }) => {
	const displayProjects = projects.slice(0, maxProjects);

	if (displayProjects.length === 0) return null;

	return (
		<section className="px-4 py-8 md:px-0">
			<div className="mb-8 flex items-center justify-between">
				<h2 className="flex items-center gap-3 text-2xl font-semibold md:text-3xl">
					<IconStar size={28} className="text-accent" />
					<span>Featured Projects</span>
				</h2>
				<Link
					to="/projects"
					className="group text-accent/90 link hidden items-center gap-1 text-sm sm:inline-flex"
				>
					<span>View all</span>
					<IconArrowRight
						size={14}
						className="transition-transform duration-200 group-hover:translate-x-0.5"
					/>
				</Link>
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				{displayProjects.map((project) => (
					<Link
						key={project.slug}
						to={`/projects/${project.slug}`}
						className="border-surface0 bg-mantle hover:border-accent focus-visible:border-accent group block overflow-hidden rounded-xl border shadow-lg transition-all duration-300 hover:shadow-xl focus:outline-none"
					>
						{project.metadata.image && (
							<div className="overflow-hidden">
								<img
									src={project.metadata.image.url}
									alt={project.metadata.image.alt}
									className="aspect-video w-full transition-transform duration-300 group-hover:scale-105"
								/>
							</div>
						)}

						<div className="space-y-3 p-5">
							<h3 className="text-text group-hover:text-accent text-xl font-semibold transition-colors">
								{project.metadata.title}
							</h3>
							<p className="text-subtext0 line-clamp-2 text-sm">{project.metadata.description}</p>

							{project.metadata.tags && project.metadata.tags.length > 0 && (
								<div className="flex items-center gap-x-2 pt-1 text-xs">
									<ProjectTags project={project} />
								</div>
							)}
						</div>
					</Link>
				))}
			</div>

			<div className="mt-6 text-center sm:hidden">
				<Link
					to="/projects"
					className="group text-accent inline-flex items-center gap-1 text-sm hover:underline"
				>
					<span>View all projects</span>
					<IconArrowRight
						size={14}
						className="transition-transform duration-200 group-hover:translate-x-0.5"
					/>
				</Link>
			</div>
		</section>
	);
};
