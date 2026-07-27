import React from 'react';
import { Breadcrumb } from './Breadcrumb';
import { IconMenu2 } from '@tabler/icons-react';
import { mainNavItems } from '../../config/navItems';
import { Link } from 'react-router-dom';

interface HeaderProps {
	toggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
	return (
		<div className="header sticky top-0 z-10 flex h-24 items-center justify-between p-5 pb-10 select-none">
			<Breadcrumb />
			<button
				onClick={toggleSidebar}
				className="text-text hover:text-accent rounded p-2 md:hidden"
				aria-label="Open navigation menu"
				aria-expanded="false"
				aria-controls="sidebar-nav"
			>
				<IconMenu2 size={24} />
			</button>
			<nav className="hidden items-center space-x-4 md:flex">
				{mainNavItems.map((item) =>
					item.external ? (
						<a
							key={item.title}
							href={item.href}
							target="_blank"
							rel="noopener noreferrer"
							className="text-text hover:text-accent rounded px-3 py-2 text-sm font-medium transition-colors duration-150"
						>
							{item.title}
						</a>
					) : (
						<Link
							key={item.title}
							to={item.href}
							className="text-text hover:text-accent rounded px-3 py-2 text-sm font-medium transition-colors duration-150"
						>
							{item.title}
						</Link>
					)
				)}
				<button
					onClick={toggleSidebar}
					className="text-text hover:text-accent cursor-pointer rounded px-3 py-2 text-sm font-medium"
					aria-label="Open more navigation items"
				>
					More...
				</button>
			</nav>
			<style>{`
        .header {
          mask: linear-gradient(black, black, transparent);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
      `}</style>
		</div>
	);
};
