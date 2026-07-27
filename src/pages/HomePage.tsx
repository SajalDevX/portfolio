import React from 'react';
import {
	IconArrowRight,
	IconExternalLink,
	IconArticle,
	IconCalendarEvent,
	IconActivity,
	IconMail
} from '@tabler/icons-react';
import Site from '../config/common';
import { Home as HomeConfig } from '../config/pages';
import { ThemeSelector } from '../components/themes/ThemeSelector';
import { ColorSelector } from '../components/themes/ColorSelector';
import { Experience } from '../components/Experience';
import { LocationMap } from '../components/bento/LocationMap';
import { TimeWaster } from '../components/bento/TimeWaster';
import { Featured } from '../components/layout/Featured';
import { LinkWithIcon } from '../components/LinkWithIcon';
import { formatDate } from '../utils/date';
import { getFeaturedProjects } from '../config/projects';
import { type FeaturedProject } from '../types/projects';

// Get featured projects from config
const mockFeaturedProjects: FeaturedProject[] = getFeaturedProjects().map((p) => ({
	slug: p.slug,
	metadata: {
		title: p.title,
		description: p.description,
		image: p.image,
		tags: p.tags,
		featured: p.featured
	}
}));

const mockCommitData = {
	commits: [
		{
			sha: '1234567',
			message: 'Add new feature',
			repo: 'sajaldev/portfolio',
			href: 'https://github.com/sajaldev/portfolio/commit/1234567',
			additions: 45,
			deletions: 12
		},
		{
			sha: '2345678',
			message: 'Fix bug in component',
			repo: 'sajaldev/dxtalent',
			href: 'https://github.com/sajaldev/dxtalent/commit/2345678',
			additions: 23,
			deletions: 8
		}
	],
	languages: [
		{ name: 'TypeScript', size: 45000, color: '#3178c6' },
		{ name: 'JavaScript', size: 30000, color: '#f1e05a' },
		{ name: 'Python', size: 15000, color: '#3572A5' },
		{ name: 'CSS', size: 10000, color: '#563d7c' }
	]
};

const mockLatestPosts = [
	{
		slug: 'shipping-dxtalent',
		metadata: {
			title: { text: 'Shipping DXTalent' },
			published_at: '2025-11-15'
		}
	}
];

export const HomePage: React.FC = () => {
	const langTotal = mockCommitData.languages.reduce((a, l) => a + l.size, 0);

	return (
		<div className="mx-auto max-w-6xl space-y-12 px-0 py-8 md:space-y-16 md:px-4 md:py-12">
			{/* Hero Section */}
			<section className="space-y-5 px-4 md:px-0">
				<h1 className="text-3xl font-bold md:text-4xl">
					Hey! I'm{' '}
					<span className="text-accent">Sajal Kumar Jana</span>
				</h1>
				<p className="text-subtext0 max-w-prose text-lg leading-relaxed">
						Backend & Full-Stack Engineer who loves building systems that scale from zero to real
						users. I'm currently a final-year Information Technology engineering student at Army
						Institute of Technology, Pune, with 1.5+ years of experience shipping production software.
					</p>
					<p className="text-subtext0 max-w-prose text-lg leading-relaxed">
						As the founding engineer at PrepAiro (a UPSC CSE prep platform), I built and scaled a
						cross-platform Flutter app to 150,000+ installs on Android and iOS. On the backend, I
						architected a horizontally-scalable, pod-death-safe real-time duel/battle system using
						Spring Boot, Centrifugo, and PostgreSQL — backed by JPA-managed shared state, advisory
						locks, and heartbeat-based failover under autoscaling. I also designed a full clickstream
						analytics pipeline (Flutter → Kafka → Confluent S3 Connector → DuckDB) and built an
						in-house attribution microservice that replaced AppsFlyer, processing over a million
						clicks and saving thousands of dollars daily.
					</p>
					<p className="text-subtext0 max-w-prose text-lg leading-relaxed">
						Beyond backend systems, I work extensively with AI and Retrieval-Augmented Generation
						(RAG) — building hybrid retrieval pipelines combining vector search (Qdrant), BM25
						keyword ranking, and entity-based lookup for memory-augmented AI chat systems.
					</p>
					<p className="text-subtext0 max-w-prose text-lg leading-relaxed">
						My toolkit spans Java, Spring Boot, Dart/Flutter, PostgreSQL, PostGIS, Kafka, AWS,
						Docker, Firebase, and DuckDB. I recently won 1st place at the eRaksha Hackathon (IIT
						Delhi & CyberPeace Foundation), competing against 2,000+ teams nationwide, and was
						selected to demo live at the Global AI Summit 2026.
					</p>
				<div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2">
					{HomeConfig.socialLinks.map((link, index) => (
						<React.Fragment key={link.href}>
							<LinkWithIcon
								href={link.href}
								text={link.text}
								icon={link.icon}
								external={true}
								className="text-sm"
							/>
							{index < HomeConfig.socialLinks.length - 1 && (
								<span className="text-surface1 text-xs">|</span>
							)}
						</React.Fragment>
					))}
					<span className="text-surface1 text-xs">|</span>
					<a
						href="/about"
						className="group text-subtext1 hover:text-accent inline-flex items-center gap-1 text-sm transition-colors duration-200"
					>
						<span>More about me</span>
						<IconArrowRight
							size={16}
							className="transition-transform duration-200 group-hover:translate-x-0.5"
						/>
					</a>
				</div>
			</section>

			{/* Experience Section */}
			<Experience />

			{/* Featured Projects */}
			<Featured projects={mockFeaturedProjects} maxProjects={2} />

			{/* Bento Grid */}
			<section className="px-4 md:px-0">
				<h2 className="sr-only">Dashboard / Highlights</h2>
				<div className="grid grid-cols-1 justify-center gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
					{/* Theme Selector */}
					<div className="border-surface0 bg-base rounded-xl border p-4 shadow-lg sm:col-span-2 xl:col-span-1">
						<ThemeSelector />
						<ColorSelector />
					</div>

					{/* Book a Chat */}
					<div className="border-surface0 bg-base rounded-xl border p-4 shadow-lg lg:col-span-1">
						<h3 className="text-text mb-3 flex items-center gap-2 text-sm font-semibold">
							<IconCalendarEvent size={16} className="text-accent" />
							Let's Connect
						</h3>
						<p className="text-subtext0 mb-4 text-sm">
							Always open to interesting projects and conversations.
						</p>
						<a
							href={Site.out.calcom}
							target="_blank"
							rel="noopener noreferrer"
							className="bg-surface0 text-text hover:bg-accent focus:ring-accent/50 focus:ring-offset-base inline-flex w-full items-center justify-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium shadow-sm transition-colors hover:text-black focus:ring-2 focus:ring-offset-2 focus:outline-none"
						>
							<IconCalendarEvent size={16} />
							Book a Chat
						</a>

						<div className="border-surface0 my-4 border-t"></div>

						<h3 className="text-text mb-3 flex items-center gap-2 text-sm font-semibold">
							<IconMail size={16} className="text-accent" />
							Email Me
						</h3>
						<p className="text-subtext0 mb-4 text-sm">
							Drop me a line and I'll get back to you as soon as possible.
						</p>
						<a
							href="mailto:kakalijana1254@gmail.com"
							className="bg-surface0 text-text hover:bg-accent focus:ring-accent/50 focus:ring-offset-base inline-flex w-full items-center justify-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium shadow-sm transition-colors hover:text-black focus:ring-2 focus:ring-offset-2 focus:outline-none"
						>
							<IconMail size={16} />
							kakalijana1254@gmail.com
						</a>
					</div>

					{/* Location Map */}
					<LocationMap />

					{/* Time Waster */}
					<TimeWaster />

					{/* Latest Commits */}
					<div className="border-surface0 bg-base rounded-xl border p-4 shadow-lg md:col-span-2">
						<div className="text-text mb-3 flex items-center justify-between gap-2 text-sm">
							<h3 className="flex items-center gap-2 font-semibold">
								<IconActivity size={16} className="text-accent" />
								<span>Recent Commits</span>
							</h3>
							<a
								href={Site.out.github}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="See more activity on GitHub"
								className="text-accent/80 hover:text-accent text-xs font-medium transition-colors"
							>
								[#opensource]
							</a>
						</div>
						{mockCommitData.commits.length > 0 ? (
							<ul className="space-y-1.5 text-sm">
								{mockCommitData.commits.slice(0, 4).map((commit) => (
									<li key={commit.sha}>
										<a
											href={commit.href}
											target="_blank"
											rel="noopener noreferrer"
											className="text-subtext0 hover:text-accent flex min-w-0 items-center gap-2"
											title={`${commit.repo}: ${commit.message}`}
										>
											<span className="text-text shrink-0 font-medium">
												{commit.repo.split('/')[1]}:
											</span>
											<span className="min-w-0 flex-1 truncate">{commit.message}</span>
											<span className="shrink-0 text-xs whitespace-nowrap">
												<span className="text-green">+{commit.additions}</span>
												<span className="text-surface1">/</span>
												<span className="text-red">-{commit.deletions}</span>
											</span>
										</a>
									</li>
								))}
							</ul>
						) : (
							<p className="text-subtext1 text-sm italic">No recent public commits.</p>
						)}
						<div className="mt-3 flex items-center gap-3">
							<a
								href="https://github.com/sajaldev"
								target="_blank"
								rel="noopener noreferrer"
								className="group text-accent inline-flex items-center gap-1 text-sm hover:underline"
							>
								<span>View on GitHub</span>
								<IconExternalLink
									size={14}
									className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
								/>
							</a>
							{langTotal > 0 && (
								<div
									className="ml-auto max-w-xs flex-1 sm:max-w-sm md:max-w-md"
									aria-label="Language breakdown"
								>
									<div className="bg-surface2 h-2 w-full rounded-[3px]">
										<div className="flex h-full w-full">
											{mockCommitData.languages.map((lang) => (
												<div
													key={lang.name}
													className="group relative h-full first:rounded-l-[3px] last:rounded-r-[3px]"
													style={{
														width: `clamp(8px, ${(lang.size / langTotal) * 100}%, ${(lang.size / langTotal) * 100}%)`,
														backgroundColor: lang.color
													}}
												>
													<div className="border-surface1 bg-surface1 pointer-events-none absolute -top-7 left-1/2 z-10 -translate-x-1/2 rounded border px-2 py-0.5 text-xs whitespace-nowrap opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">
														<span className="inline-flex items-center gap-2">
															<span
																className="inline-block h-2 w-2 rounded"
																style={{ backgroundColor: lang.color }}
															></span>
															<span className="text-subtext0">{lang.name}</span>
															<span className="text-surface1">•</span>
															<span className="text-subtext1">
																{Math.round((lang.size / langTotal) * 100)}%
															</span>
														</span>
													</div>
												</div>
											))}
										</div>
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Latest Posts */}
					<div className="border-surface0 bg-base rounded-xl border p-4 shadow-lg sm:col-span-2 lg:col-span-2">
						<div className="text-text mb-3 flex items-center justify-between gap-2 text-sm">
							<h3 className="flex items-center gap-2 font-semibold">
								<IconArticle size={14} className="text-accent" />
								<span>Latest Posts</span>
							</h3>
							<a
								href="/posts"
								aria-label="View all posts"
								className="text-accent/80 transition-transform duration-500 ease-in hover:translate-x-0.5 hover:-translate-y-0.5"
							>
								<IconExternalLink size={18} />
							</a>
						</div>

						{mockLatestPosts.length > 0 ? (
							<ul className="list-none space-y-2">
								{mockLatestPosts.map((post) => (
									<li key={post.slug}>
										<a
											href={'/posts/' + post.slug}
											className="text-subtext0 hover:text-accent flex min-w-0 items-center gap-2 text-sm"
										>
											<span className="min-w-0 flex-1 truncate">{post.metadata.title.text}</span>
											{post.metadata.published_at && (
												<>
													<span className="text-surface1 mx-2 shrink-0 text-xs">–</span>
													<span className="text-subtext1 shrink-0 text-xs whitespace-nowrap">
														{formatDate(post.metadata.published_at, { shortMonth: true })}
													</span>
												</>
											)}
										</a>
									</li>
								))}
							</ul>
						) : (
							<p className="text-subtext1 text-xs italic">No posts yet.</p>
						)}
					</div>
				</div>
			</section>
		</div>
	);
};
