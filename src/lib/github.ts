// Thin, unauthenticated GitHub API client for the portfolio's live widgets.
// Everything here degrades to "no data" on rate limits or network errors.

const API = 'https://api.github.com';
const HEADERS = { Accept: 'application/vnd.github+json' };
const TTL_MS = 10 * 60 * 1000;

async function cached<T>(key: string, load: () => Promise<T>): Promise<T | null> {
	const storageKey = `gh:${key}`;
	try {
		const raw = sessionStorage.getItem(storageKey);
		if (raw) {
			const { at, data } = JSON.parse(raw) as { at: number; data: T };
			if (Date.now() - at < TTL_MS) return data;
		}
	} catch {
		/* storage unavailable */
	}
	try {
		const data = await load();
		try {
			sessionStorage.setItem(storageKey, JSON.stringify({ at: Date.now(), data }));
		} catch {
			/* ignore quota errors */
		}
		return data;
	} catch {
		return null;
	}
}

async function get<T>(path: string): Promise<T> {
	const res = await fetch(`${API}${path}`, { headers: HEADERS });
	if (!res.ok) throw new Error(`${res.status} ${path}`);
	return (await res.json()) as T;
}

export interface Commit {
	sha: string;
	message: string;
	repo: string;
	branch: string;
	href: string;
	date: string;
}

interface PushEvent {
	type: string;
	created_at: string;
	repo: { name: string };
	payload?: { ref?: string; head?: string };
}

/**
 * Most recent pushes to public repos, newest first. The public events feed no
 * longer embeds commit messages, so the head commit of each push is fetched.
 */
export function recentCommits(user: string, limit = 4): Promise<Commit[] | null> {
	return cached(`commits:${user}:${limit}`, async () => {
		const events = await get<PushEvent[]>(`/users/${user}/events/public?per_page=100`);
		const seen = new Set<string>();
		const pushes: PushEvent[] = [];
		for (const ev of events) {
			const head = ev.payload?.head;
			if (ev.type !== 'PushEvent' || !head || seen.has(head)) continue;
			seen.add(head);
			pushes.push(ev);
			if (pushes.length >= limit) break;
		}
		const commits = await Promise.all(
			pushes.map(async (ev) => {
				const head = ev.payload!.head!;
				let message = 'Pushed ' + head.slice(0, 7);
				try {
					const c = await get<{ commit: { message: string } }>(`/repos/${ev.repo.name}/commits/${head}`);
					message = c.commit.message.split('\n')[0];
				} catch {
					/* keep the fallback message */
				}
				return {
					sha: head,
					message,
					repo: ev.repo.name,
					branch: (ev.payload?.ref ?? '').replace('refs/heads/', ''),
					href: `https://github.com/${ev.repo.name}/commit/${head}`,
					date: ev.created_at
				};
			})
		);
		return commits;
	});
}

export interface LanguageShare {
	name: string;
	size: number;
	color: string;
}

const LANGUAGE_COLORS: Record<string, string> = {
	Kotlin: '#A97BFF',
	Python: '#3572A5',
	Dart: '#00B4AB',
	Java: '#b07219',
	TypeScript: '#3178c6',
	JavaScript: '#f1e05a',
	'C++': '#f34b7d',
	C: '#555555',
	Go: '#00ADD8',
	Solidity: '#AA6746',
	HTML: '#e34c26',
	CSS: '#663399',
	Shell: '#89e051',
	'Jupyter Notebook': '#DA5B0B'
};

/** Primary-language mix across the user's own (non-fork) public repos. */
export function languageMix(user: string, top = 6): Promise<LanguageShare[] | null> {
	return cached(`langs:${user}`, async () => {
		const repos = await get<{ language: string | null; fork: boolean }[]>(
			`/users/${user}/repos?per_page=100&type=owner`
		);
		const counts = new Map<string, number>();
		for (const r of repos) {
			if (r.fork || !r.language) continue;
			counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
		}
		return [...counts.entries()]
			.sort((a, b) => b[1] - a[1])
			.slice(0, top)
			.map(([name, size]) => ({ name, size, color: LANGUAGE_COLORS[name] ?? '#8b949e' }));
	});
}

export interface PullRequestStats {
	total: number;
	merged: number;
	open: number;
	projects: number;
}

/** Pull requests the user opened in repositories they do not own. */
export function pullRequestStats(user: string): Promise<PullRequestStats | null> {
	return cached(`prs:${user}`, async () => {
		const q = encodeURIComponent(`author:${user} is:pr -user:${user} is:public`);
		const data = await get<{
			total_count: number;
			items: { state: string; repository_url: string; pull_request?: { merged_at: string | null } }[];
		}>(`/search/issues?q=${q}&per_page=100`);
		const merged = data.items.filter((i) => i.pull_request?.merged_at).length;
		const open = data.items.filter((i) => i.state === 'open').length;
		const projects = new Set(data.items.map((i) => i.repository_url)).size;
		return { total: data.total_count, merged, open, projects };
	});
}

export interface RepoStats {
	stars: number;
	forks: number;
	description: string | null;
	pushedAt: string;
}

export function repoStats(owner: string, repo: string): Promise<RepoStats | null> {
	return cached(`repo:${owner}/${repo}`, async () => {
		const r = await get<{
			stargazers_count: number;
			forks_count: number;
			description: string | null;
			pushed_at: string;
		}>(`/repos/${owner}/${repo}`);
		return {
			stars: r.stargazers_count,
			forks: r.forks_count,
			description: r.description,
			pushedAt: r.pushed_at
		};
	});
}
