import React from 'react';
import { IconX } from '@tabler/icons-react';
import { mainNavItems, moreNavItems } from '../../config/navItems';
import { Link, useLocation } from 'react-router-dom';
import { ThemeSelector } from '../themes/ThemeSelector';
import { ColorSelector } from '../themes/ColorSelector';

interface SidebarProps {
	isOpen: boolean;
	onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
	const location = useLocation();

	return (
		<>
			{/* Backdrop */}
			{isOpen && (
				<div
					className="fixed inset-0 z-30 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
					onClick={onClose}
					role="button"
					tabIndex={-1}
					aria-label="Close sidebar"
				/>
			)}

			{/* Sidebar */}
			<aside
				id="sidebar-nav"
				className={`bg-mantle text-text border-surface0 fixed inset-y-0 right-0 z-40 flex w-64 transform flex-col border-l shadow-xl transition-transform duration-300 ease-in-out ${
					isOpen ? 'translate-x-0' : 'translate-x-full'
				}`}
			>
				{/* Header */}
				<div className="border-surface0 flex h-16 shrink-0 items-center justify-between border-b p-4">
					<span className="text-accent font-mono text-lg font-semibold">Navigation</span>
					<button
						onClick={onClose}
						className="text-subtext1 hover:text-red rounded"
						aria-label="Close navigation menu"
					>
						<IconX size={24} />
					</button>
				</div>

				{/* Theme Selectors */}
				<div className="border-surface0 shrink-0 border-b p-4">
					<div className="pb-1">
						<ThemeSelector />
					</div>
					<ColorSelector />
				</div>

				{/* Navigation */}
				<nav className="flex-1 overflow-y-auto p-4">
					<ul className="space-y-2" role="list">
						{mainNavItems.map((item) => {
							const isActive = !item.external && location.pathname === item.href;
							return (
								<li key={item.title}>
									{item.external ? (
										<a
											href={item.href}
											target="_blank"
											rel="noopener noreferrer"
											className="hover:bg-surface0 focus:bg-surface1 block rounded p-2 transition-colors duration-150 focus:outline-none"
											onClick={onClose}
										>
											{item.title}
										</a>
									) : (
										<Link
											to={item.href}
											className="hover:bg-surface0 focus:bg-surface1 block rounded p-2 transition-colors duration-150 focus:outline-none"
											aria-current={isActive ? 'page' : undefined}
											onClick={onClose}
										>
											{item.title}
										</Link>
									)}
								</li>
							);
						})}

						<li>
							<hr className="border-surface1 my-2 border-t" />
						</li>

						<li className="text-subtext0 px-2 py-1 text-xs font-semibold tracking-wider uppercase">
							More
						</li>

						{moreNavItems.map((item) => {
							const isActive = !item.external && location.pathname === item.href;
							return (
								<li key={item.title}>
									{item.external ? (
										<a
											href={item.href}
											target="_blank"
											rel="noopener noreferrer"
											className="hover:bg-surface0 focus:bg-surface1 block rounded p-2 transition-colors duration-150 focus:outline-none"
											onClick={onClose}
										>
											{item.title}
										</a>
									) : (
										<Link
											to={item.href}
											className="hover:bg-surface0 focus:bg-surface1 block rounded p-2 transition-colors duration-150 focus:outline-none"
											aria-current={isActive ? 'page' : undefined}
											onClick={onClose}
										>
											{item.title}
										</Link>
									)}
								</li>
							);
						})}
					</ul>
				</nav>
			</aside>
		</>
	);
};
