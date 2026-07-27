import React from 'react';
import { IconFolders } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { projects } from '../config/projects';
import { ProjectTags } from '../components/projects/ProjectTags';
import { formatDate } from '../utils/date';

export const ProjectsPage: React.FC = () => {
	return (
		<div className="space-y-8">
			<h1 className="mb-8 flex items-center gap-3 text-3xl font-bold">
				<IconFolders size={30} className="text-accent" />
				<span>Projects</span>
			</h1>

			{projects.length > 0 ? (
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{projects.map((project) => (
						<Link
							key={project.slug}
							to={`/projects/${project.slug}`}
							className="border-surface0 bg-base hover:border-accent group block space-y-3 rounded-xl border p-5 shadow-lg transition-colors duration-200"
						>
							{project.image ? (
								<img
									src={project.image.url}
									alt={project.image.alt}
									className="mb-4 aspect-video w-full rounded-md"
								/>
							) : (
								<div className="bg-surface2 mb-4 aspect-video w-full rounded-md"></div>
							)}
							<div className="flex items-center justify-between gap-3 pe-3">
								<h2 className="text-text group-hover:text-accent min-w-0 flex-1 truncate text-xl font-semibold">
									{project.title}
								</h2>
								<p className="text-overlay1 shrink-0 text-xs whitespace-nowrap">
									{formatDate(project.date)}
								</p>
							</div>
							<p className="text-subtext0 line-clamp-3 text-sm">{project.description}</p>

							<ProjectTags project={{ slug: project.slug, metadata: { tags: project.tags } }} />
						</Link>
					))}
				</div>
			) : (
				<p className="text-subtext1">No projects published yet.</p>
			)}
		</div>
	);
};
