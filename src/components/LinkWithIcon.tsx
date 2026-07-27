import React from 'react';
import { IconExternalLink, type Icon } from '@tabler/icons-react';

interface LinkWithIconProps {
	href: string;
	text: string;
	icon: Icon;
	external?: boolean;
	className?: string;
}

export const LinkWithIcon: React.FC<LinkWithIconProps> = ({
	href,
	text,
	icon: IconComponent,
	external = false,
	className = ''
}) => {
	const linkProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

	return (
		<a
			href={href}
			{...linkProps}
			className={`group text-subtext1 hover:text-accent inline-flex items-center gap-1.5 transition-colors duration-200 ${className}`}
		>
			<IconComponent size={16} />
			<span>{text}</span>
			{external && (
				<IconExternalLink
					size={14}
					className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
				/>
			)}
		</a>
	);
};
