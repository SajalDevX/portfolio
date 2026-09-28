import React from 'react';
import { IconStar } from '@tabler/icons-react';

interface ProjectCardProps {
	owner: string;
	repo: string;
	description: string;
	stars: number | null;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
	owner,
	repo,
	description,
	stars
}) => {
	return (
		<div className="bg-surface1 mx-auto max-w-2xl overflow-hidden rounded-2xl p-6 shadow-xl">
			{/* Terminal Header */}
			<div className="bg-surface2 mb-4 flex items-center justify-between rounded-lg p-4">
				<div className="flex items-center gap-2">
					<div className="flex gap-1.5">
						<div className="bg-red h-3 w-3 rounded-full"></div>
						<div className="bg-yellow h-3 w-3 rounded-full"></div>
						<div className="bg-green h-3 w-3 rounded-full"></div>
					</div>
				</div>
				{stars !== null && (
					<div className="flex items-center gap-2 text-sm" title="GitHub stars">
						<span className="text-subtext0">{stars}</span>
						<IconStar size={16} className="text-yellow fill-yellow" />
					</div>
				)}
			</div>

			{/* Repository Info */}
			<div className="bg-surface2 space-y-4 rounded-lg p-6">
				<div className="font-mono text-lg">
					<span className="text-pink">{owner}</span>
					<span className="text-subtext0"> / </span>
					<span className="text-green">{repo}</span>
				</div>

				<p className="text-text text-base leading-relaxed">{description}</p>

			</div>
		</div>
	);
};
