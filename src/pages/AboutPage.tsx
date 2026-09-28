import React from 'react';
import {
	IconBrandGithub,
	IconBrandLinkedin,
	IconMail,
	IconFileCv,
	IconGitPullRequest,
	IconTrophy,
	IconTerminal2
} from '@tabler/icons-react';
import Site from '../config/common';

export const AboutPage: React.FC = () => {
	return (
		<div className="mx-auto max-w-6xl space-y-10 px-4 py-8 md:px-6">
			<section className="space-y-6">
				<h1 className="flex items-center gap-3 text-3xl font-bold md:text-4xl">
					<span>About me</span>
				</h1>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
					<div className="md:col-span-1">
						<img
							src={`https://github.com/${Site.handle}.png?size=600`}
							alt="Sajal Kumar Jana"
							width={600}
							height={600}
							className="border-surface0 bg-surface0 aspect-square w-full rounded-md border object-cover shadow-lg transition-transform duration-300 hover:scale-[1.02]"
						/>
					</div>

					<div className="space-y-4 md:col-span-2">
						<p className="text-subtext0 text-base leading-relaxed">
							<b>Hey!</b> I'm Sajal Kumar Jana{' '}
							<a className="link" href={Site.out.github} target="_blank" rel="noopener noreferrer">
								(@{Site.handle})
							</a>{' '}
							— a final-year Information Technology student at Army Institute of Technology,
							Pune (class of 2027). I build mobile apps and the backends they lean on, and I like
							the unglamorous middle of that work: making a real-time system survive a pod
							restart, making analytics events survive a phone reboot, making a benchmark an agent
							can't shortcut.
						</p>

						<p className="text-subtext0 text-base leading-relaxed">
							From October 2024 to March 2026 I was the founding engineer at{' '}
							<b>PrepAiro</b>, a UPSC CSE prep platform. I shipped the cross-platform Flutter app
							to <b>150,000+ installs on Google Play</b> and <b>20,000+ on the App Store</b>. On
							the backend I designed the multi-pod real-time Duel system (1v1 and multiplayer
							all-compete rooms) around Centrifugo and Spring Boot: pod-local STOMP state became
							JPA-backed shared room state guarded by Postgres advisory locks, owning-pod heartbeats
							and an orphaned-room sweeper, so games survive HPA scale events. I also built the
							clickstream pipeline (Flutter → Kafka → Confluent S3 / Parquet → DuckDB), wired up
							Meta Ads, Google Ads and AppsFlyer for 2M+ campaign events a month, and then replaced
							AppsFlyer with an in-house attribution service that has handled <b>1M+ clicks</b> and
							attributed <b>50,000+ installs</b>.
						</p>

						<p className="text-subtext0 text-base leading-relaxed">
							Since mid-2026 I've been authoring benchmarks for AI coding agents — Terminal-Bench
							style tasks for <b>AfterQuery</b> (Frontier Bench / Kepler) and <b>Handshake</b>{' '}
							(Dynamo and Seal). Each task is a Dockerized environment with a reference solution,
							an isolated verifier and adversarial checks, so a correct oracle run passes while
							no-op and shortcut solutions fail. Reading agent trajectories to understand where they
							go wrong has made me a much more careful engineer.
						</p>

						<p className="text-subtext0 text-base leading-relaxed">
							On the side: <b>RAKSHAK</b>, an edge-AI cyber guardian for home IoT (Dueling DQN
							response agent + TinyLlama honeypots on a Raspberry Pi), won <b>1st place out of
							2,000+ teams</b> at the eRaksha Hackathon run by IIT Delhi and the CyberPeace
							Foundation, and was selected to demo at the Global AI Summit 2026 at Bharat Mandapam.{' '}
							<b>PESS</b> turns camera feeds into verified fire alerts and automated voice calls.{' '}
							<b>Jyntrix AI</b> gives chat models long-term memory through hybrid retrieval. And
							most weeks I send a few bug fixes upstream — OpenROAD, OneBusAway, CARE, AnkiDroid,
							MLflow and others — with the aim of being a Google Summer of Code contributor in 2027.
						</p>

						<p className="text-subtext0 text-base leading-relaxed">
							Tools I reach for: <b>Kotlin, Java, Dart, Python, C++</b>; <b>Flutter, Jetpack
							Compose, Spring Boot</b>; <b>PostgreSQL, PostGIS, Kafka, DuckDB, Qdrant</b>;{' '}
							<b>Docker, AWS, Firebase, Supabase</b>; <b>YOLOv8, OpenCV, PyTorch</b>. I care less
							about the stack than about whether the thing keeps working once real people are on
							it.
						</p>

						<div className="flex flex-wrap gap-3 pt-2">
							<a
								href={Site.out.github}
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-accent inline-flex items-center gap-1.5 text-sm transition-colors"
							>
								<IconBrandGithub size={16} />
								GitHub
							</a>
							<span className="text-surface1">*</span>
							<a
								href={Site.out.linkedin}
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-accent inline-flex items-center gap-1.5 text-sm transition-colors"
							>
								<IconBrandLinkedin size={16} />
								LinkedIn
							</a>
							<span className="text-surface1">*</span>
							<a
								href={Site.out.resume}
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-accent inline-flex items-center gap-1.5 text-sm transition-colors"
							>
								<IconFileCv size={16} />
								Resume
							</a>
							<span className="text-surface1">*</span>
							<a
								href={Site.out.email}
								className="hover:text-accent inline-flex items-center gap-1.5 text-sm transition-colors"
							>
								<IconMail size={16} />
								kakalijana1254@gmail.com
							</a>
						</div>
					</div>
				</div>
			</section>

			{/* Beyond the day job */}
			<section className="space-y-8">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					<div className="bg-base rounded-lg p-5 shadow-sm">
						<h3 className="mb-2 flex items-center gap-2 text-lg font-semibold">
							<IconGitPullRequest size={18} className="text-accent" />
							Upstream fixes
						</h3>
						<p className="text-subtext0 text-sm leading-relaxed">
							I pick an unfamiliar codebase, find a real bug, reproduce it locally and send the
							fix. EDA tools, hospital software, transit APIs, compilers, robotics dataflow — the
							domain matters less than the habit. The running list is on my{' '}
							<a className="link" href={Site.out.pullRequests} target="_blank" rel="noopener noreferrer">
								GitHub
							</a>
							.
						</p>
					</div>
					<div className="bg-base rounded-lg p-5 shadow-sm">
						<h3 className="mb-2 flex items-center gap-2 text-lg font-semibold">
							<IconTrophy size={18} className="text-accent" />
							Hackathons
						</h3>
						<p className="text-subtext0 text-sm leading-relaxed">
							eRaksha 2026 (1st of 2,000+ teams) was the big one, but I keep entering them —
							they're the fastest way I know to find out whether an architecture idea holds up
							when the clock is running.
						</p>
					</div>
					<div className="bg-base rounded-lg p-5 shadow-sm">
						<h3 className="mb-2 flex items-center gap-2 text-lg font-semibold">
							<IconTerminal2 size={18} className="text-accent" />
							Breaking agents on purpose
						</h3>
						<p className="text-subtext0 text-sm leading-relaxed">
							Designing benchmark tasks means thinking like an adversary: what would a lazy
							solution do, and how does the verifier catch it? It's become my favourite way to
							think about correctness.
						</p>
					</div>
				</div>
			</section>
		</div>
	);
};
