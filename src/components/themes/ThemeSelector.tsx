import React from 'react';
import { IconPalette } from '@tabler/icons-react';
import { usePalette, paletteNames } from '../../hooks/useTheme';

export const ThemeSelector: React.FC = () => {
	const [palette, setPalette] = usePalette();

	return (
		<>
			<h3 className="text-text mb-4 flex items-center gap-2 text-sm font-semibold">
				<IconPalette size={16} className="text-accent" />
				Theme
			</h3>
			<div className="ring-surface0 relative mb-4 flex flex-wrap items-center justify-center gap-1 rounded-md p-1 ring-1 md:justify-start">
				{paletteNames.map((name) => {
					const isSelected = palette === name;
					return (
						<button
							key={name}
							onClick={() => setPalette(name)}
							className={`flex-1 cursor-pointer rounded-[5px] px-2 py-1 text-center text-xs font-medium transition-all duration-300 ${
								isSelected
									? 'bg-base text-text ring-accent/70 shadow-sm ring-1 ring-inset'
									: 'text-subtext1 hover:text-subtext0'
							}`}
						>
							{name.charAt(0).toUpperCase() + name.slice(1)}
						</button>
					);
				})}
			</div>
		</>
	);
};
