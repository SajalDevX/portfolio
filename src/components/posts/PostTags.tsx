import React from 'react';
import { accentColors } from '../../hooks/useTheme';

interface PostTagsProps {
	tags: string[];
	colored?: boolean;
}

// Simple hash function for consistent tag colors
function hashCode(str: string): number {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = (hash << 5) - hash + str.charCodeAt(i);
		hash |= 0;
	}
	return Math.abs(hash);
}

export const PostTags: React.FC<PostTagsProps> = ({ tags, colored = true }) => {
	return (
		<div className="flex flex-wrap gap-2 text-xs">
			{tags.map((tag) => {
				const hash = hashCode(tag);
				const color = accentColors[hash % accentColors.length];

				return (
					<span
						key={tag}
						className="bg-surface0 rounded px-2.5 py-1 font-semibold"
						style={
							colored
								? { color: `var(--catppuccin-color-${color})` }
								: { color: 'var(--color-subtext0)' }
						}
					>
						{tag}
					</span>
				);
			})}
		</div>
	);
};
