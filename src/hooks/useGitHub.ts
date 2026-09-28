import { useEffect, useState } from 'react';
import Site from '../config/common';
import {
	languageMix,
	pullRequestStats,
	recentCommits,
	repoStats,
	type Commit,
	type LanguageShare,
	type PullRequestStats,
	type RepoStats
} from '../lib/github';

function useAsync<T>(load: () => Promise<T | null>, deps: unknown[]): T | null | undefined {
	// undefined = loading, null = unavailable
	const [value, setValue] = useState<T | null | undefined>(undefined);
	useEffect(() => {
		let alive = true;
		setValue(undefined);
		load().then((v) => {
			if (alive) setValue(v);
		});
		return () => {
			alive = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);
	return value;
}

export const useRecentCommits = (limit = 4) =>
	useAsync<Commit[]>(() => recentCommits(Site.handle, limit), [limit]);

export const useLanguageMix = () => useAsync<LanguageShare[]>(() => languageMix(Site.handle), []);

export const usePullRequestStats = () =>
	useAsync<PullRequestStats>(() => pullRequestStats(Site.handle), []);

export const useRepoStats = (owner?: string, repo?: string) =>
	useAsync<RepoStats>(
		() => (owner && repo ? repoStats(owner, repo) : Promise.resolve(null)),
		[owner, repo]
	);
