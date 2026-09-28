import React from 'react';
import {
	IconArrowRight,
	IconExternalLink,
	IconArticle,
	IconActivity,
	IconMail,
	IconBrandLinkedin,
	IconFileCv
} from '@tabler/icons-react';
import Site from '../config/common';
import { Home as HomeConfig } from '../config/pages';
import { ThemeSelector } from '../components/themes/ThemeSelector';
import { ColorSelector } from '../components/themes/ColorSelector';
import { Experience } from '../components/Experience';
import { LocationMap } from '../components/bento/LocationMap';
import { OpenSource } from '../components/bento/OpenSource';
import { Featured } from '../components/layout/Featured';
import { LinkWithIcon } from '../components/LinkWithIcon';
import { formatDate } from '../utils/date';
import { getFeaturedProjects } from '../config/projects';
import { getPublishedPosts } from '../config/posts';
import { type FeaturedProject } from '../types/projects';
import { useLanguageMix, useRecentCommits } from '../hooks/useGitHub';

const featuredProjects: FeaturedProject[] = getFeaturedProjects().map((p) => ({
	slug: p.slug,
	metadata: {
		title: p.title,
		description: p.description,
		image: p.image,
		tags: p.tags,
		featured: p.featured
	}
}));

const latestPosts = getPublishedPosts().slice(0, 3);

export const HomePage: React.FC = () => {
	const commits = useRecentCommits(4);
	const languages = useLanguageMix();
	const langTotal = (languages ?? []).reduce((a, l) => a + l.size, 0);

	return (
		<div className="mx-auto max-w-6xl space-y-12 px-0 py-8 md:space-y-16 md:px-4 md:py-12">
			{/* Hero */}
			<section className="space-y-5 px-4 md:px-0">
				<h1 className="text-3xl font-bold md:text-4xl">
					Hey! I'm <span className="text-accent">Sajal Kumar Jana</span>
				</h1>
				<p className="text-subtext0 max-w-prose text-lg leading-relaxed">
					I build mobile apps and the backends they lean on — Flutter and Jetpack Compose on the
					client, Spring Boot, Postgres and Kafka behind it. Final-year IT student at Army
					Institute of Technology, Pune.
				</p>
				<p className="text-subtext0 max-w-prose text-lg leading-relaxed">
					As founding engineer at <b>PrepAiro</b> I shipped a Flutter app to 150K+ installs and
					designed the real-time duel backend that survives pod restarts, the Kafka → DuckDB
					clickstream pipeline, and the attribution service that replaced AppsFlyer. These days I
					write terminal-agent benchmarks for <b>AfterQuery</b> and <b>Handshake</b> — Dockerized
					tasks with deterministic verifiers that an agent can't shortcut — and spend the rest of
					my time sending fixes upstream to open-source projects.
				</p>
				<p className="text-subtext0 max-w-prose text-lg leading-relaxed">
					In 2026 my team's <b>RAKSHAK</b> took 1st place out of 2,000+ teams at the eRaksha
					Hackathon (IIT Delhi × CyberPeace Foundation) and demoed at the Global AI Summit in New
					Delhi.
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
					<LinkWithIcon
						href={Site.out.resume}
						text="Resume"
						icon={IconFileCv}
						external={true}
						className="text-sm"
					/>
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

			<Experience />

			<Featured projects={featuredProjects} maxProjects={2} />

			{/* Bento grid */}
			<section className="px-4 md:px-0">
				<h2 className="sr-only">Highlights</h2>
				<div className="grid grid-cols-1 justify-center gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
					<div className="border-surface0 bg-base rounded-xl border p-4 shadow-lg sm:col-span-2 xl:col-span-1">
						<ThemeSelector />
						<ColorSelector />
					</div>

					{/* Contact */}
					<div className="border-surface0 bg-base rounded-xl border p-4 shadow-lg lg:col-span-1">
						<h3 className="text-text mb-3 flex items-center gap-2 text-sm font-semibold">
							<IconMail size={16} className="text-accent" />
							Get in touch
						</h3>
						<p className="text-subtext0 mb-4 text-sm">
							Open to Android and backend roles, and to interesting bugs.
						</p>
						<a
							href={Site.out.email}
							className="bg-surface0 text-text hover:bg-accent focus:ring-accent/50 focus:ring-offset-base inline-flex w-full items-center justify-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium shadow-sm transition-colors hover:text-black focus:ring-2 focus:ring-offset-2 focus:outline-none"
						>
							<IconMail size={16} />
							kakalijana1254@gmail.com
						</a>

						<div className="border-surface0 my-4 border-t"></div>

						<a
							href={Site.out.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							className="bg-surface0 text-text hover:bg-accent focus:ring-accent/50 focus:ring-offset-base inline-flex w-full items-center justify-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium shadow-sm transition-colors hover:text-black focus:ring-2 focus:ring-offset-2 focus:outline-none"
						>
							<IconBrandLinkedin size={16} />
							Connect on LinkedIn
						</a>
					</div>

					<LocationMap />

					<OpenSource />

					{/* Recent commits */}
					<div className="border-surface0 bg-base rounded-xl border p-4 shadow-lg md:col-span-2">
						<div className="text-text mb-3 flex items-center justify-between gap-2 text-sm">
							<h3 className="flex items-center gap-2 font-semibold">
								<IconActivity size={16} className="text-accent" />
								<span>Recent commits</span>
							</h3>
							<a
								href={Site.out.github}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="See more activity on GitHub"
								className="text-accent/80 hover:text-accent text-xs font-medium transition-colors"
							>
								@{Site.handle}
							</a>
						</div>
						{commits === undefined ? (
							<p className="text-subtext1 text-sm italic">Loading…</p>
						) : commits && commits.length > 0 ? (
							<ul className="space-y-1.5 text-sm">
								{commits.map((commit) => (
									<li key={commit.sha}>
										<a
											href={commit.href}
											target="_blank"
											rel="noopener noreferrer"
											className="text-subtext0 hover:text-accent flex min-w-0 items-center gap-2"
											title={`${commit.repo}${commit.branch ? ' @ ' + commit.branch : ''}: ${commit.message}`}
										>
											<span className="text-text shrink-0 font-medium">
												{commit.repo.split('/')[1]}:
											</span>
											<span className="min-w-0 flex-1 truncate">{commit.message}</span>
											<span className="text-subtext1 shrink-0 text-xs whitespace-nowrap">
												{formatDate(commit.date, { shortMonth: true })}
											</span>
										</a>
									</li>
								))}
							</ul>
						) : (
							<p className="text-subtext1 text-sm italic">
								Recent activity unavailable right now — see GitHub.
							</p>
						)}
						<div className="mt-3 flex items-center gap-3">
							<a
								href={Site.out.github}
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
							{languages && langTotal > 0 && (
								<div
									className="ml-auto max-w-xs flex-1 sm:max-w-sm md:max-w-md"
									aria-label="Primary language across public repositories"
									title="Primary language across public repositories"
								>
									<div className="bg-surface2 h-2 w-full rounded-[3px]">
										<div className="flex h-full w-full">
											{languages.map((lang) => (
												<div
													key={lang.name}
													className="group relative h-full first:rounded-l-[3px] last:rounded-r-[3px]"
													style={{
														width: `${(lang.size / langTotal) * 100}%`,
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

					{/* Latest posts */}
					<div className="border-surface0 bg-base rounded-xl border p-4 shadow-lg sm:col-span-2 lg:col-span-2">
						<div className="text-text mb-3 flex items-center justify-between gap-2 text-sm">
							<h3 className="flex items-center gap-2 font-semibold">
								<IconArticle size={14} className="text-accent" />
								<span>Latest posts</span>
							</h3>
							<a
								href="/posts"
								aria-label="View all posts"
								className="text-accent/80 transition-transform duration-500 ease-in hover:translate-x-0.5 hover:-translate-y-0.5"
							>
								<IconExternalLink size={18} />
							</a>
						</div>

						{latestPosts.length > 0 ? (
							<ul className="list-none space-y-2">
								{latestPosts.map((post) => (
									<li key={post.slug}>
										<a
											href={'/posts/' + post.slug}
											className="text-subtext0 hover:text-accent flex min-w-0 items-center gap-2 text-sm"
										>
											<span className="min-w-0 flex-1 truncate">{post.title}</span>
											<span className="text-surface1 mx-2 shrink-0 text-xs">–</span>
											<span className="text-subtext1 shrink-0 text-xs whitespace-nowrap">
												{post.date}
											</span>
										</a>
									</li>
								))}
							</ul>
						) : (
							<p className="text-subtext1 text-sm italic">
								Nothing published yet. Notes on real-time backends, Android internals and
								agent benchmarks are on the way.
							</p>
						)}
					</div>
				</div>
			</section>
		</div>
	);
};
