import React from 'react';
import { IconGitPullRequest, IconExternalLink } from '@tabler/icons-react';
import Site from '../../config/common';
import { usePullRequestStats } from '../../hooks/useGitHub';

const Stat: React.FC<{ value: React.ReactNode; label: string }> = ({ value, label }) => (
	<div>
		<div className="text-text text-2xl font-bold tabular-nums">{value}</div>
		<div className="text-subtext1 text-xs">{label}</div>
	</div>
);

export const OpenSource: React.FC = () => {
	const stats = usePullRequestStats();
	const dash = <span className="text-overlay0">—</span>;

	return (
		<div className="border-surface0 bg-base flex flex-col rounded-xl border p-4 shadow-lg lg:col-span-1">
			<div className="text-text mb-3 flex items-center justify-between gap-2 text-sm">
				<h3 className="flex items-center gap-2 font-semibold">
					<IconGitPullRequest size={16} className="text-accent" />
					<span>Open source</span>
				</h3>
				<a
					href={Site.out.pullRequests}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="All pull requests on GitHub"
					className="text-accent/80 hover:text-accent transition-colors"
				>
					<IconExternalLink size={16} />
				</a>
			</div>

			<p className="text-subtext0 mb-4 text-sm">
				Bug fixes sent upstream to projects I don't own — EDA tooling, hospital software,
				transit APIs, ML platforms, robotics.
			</p>

			<div className="mt-auto grid grid-cols-2 gap-3">
				<Stat value={stats ? stats.total : dash} label="pull requests" />
				<Stat value={stats ? stats.merged : dash} label="merged" />
				<Stat value={stats ? stats.open : dash} label="in review" />
				<Stat value={stats ? stats.projects : dash} label="projects" />
			</div>

			{stats === null && (
				<p className="text-overlay1 mt-3 text-xs">
					Live numbers unavailable right now (GitHub rate limit) — see the link above.
				</p>
			)}
		</div>
	);
};
