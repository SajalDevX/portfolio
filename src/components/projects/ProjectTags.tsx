import React from 'react';
import { IconTag } from '@tabler/icons-react';

const accentColorNames = [
	'rosewater',
	'flamingo',
	'pink',
	'mauve',
	'red',
	'maroon',
	'peach',
	'yellow',
	'green',
	'teal',
	'sky',
	'sapphire',
	'blue',
	'lavender'
] as const;

function getRandomAccentColor() {
	const randomIndex = Math.floor(Math.random() * accentColorNames.length);
	return accentColorNames[randomIndex];
}

interface ProjectTagsProps {
	project: {
		slug: string;
		metadata: {
			tags?: string[];
		};
	};
}

export const ProjectTags: React.FC<ProjectTagsProps> = ({ project }) => {
	// Generate stable random colors for each tag
	const tagColors = React.useMemo(() => {
		return (
			project.metadata.tags?.reduce(
				(acc, tag) => {
					acc[tag] = getRandomAccentColor();
					return acc;
				},
				{} as Record<string, string>
			) || {}
		);
	}, [project.slug, project.metadata.tags]);

	if (!project.metadata.tags || project.metadata.tags.length === 0) {
		return null;
	}

	return (
		<div className="flex max-h-8 flex-wrap gap-2 overflow-hidden pt-2 text-xs">
			<IconTag size={18} />

			{project.metadata.tags.map((tag) => (
				<span
					key={`${project.slug}-${tag}`}
					className="tag bg-surface0 rounded px-2 py-1 font-semibold"
					style={{ color: `var(--color-${tagColors[tag]})` }}
				>
					{tag}
				</span>
			))}
		</div>
	);
};
