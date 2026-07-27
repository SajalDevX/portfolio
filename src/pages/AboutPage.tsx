import React from 'react';
import { IconBrandGithub, IconBrandLinkedin, IconMail } from '@tabler/icons-react';
import Site from '../config/common';

export const AboutPage: React.FC = () => {
	const handleEmailClick = () => {
		window.location.href = 'mailto:kakalijana1254@gmail.com';
	};

	return (
		<div className="mx-auto max-w-6xl space-y-10 px-4 py-8 md:px-6">
			{/* About Me Section */}
			<section className="space-y-6">
				<h1 className="flex items-center gap-3 text-3xl font-bold md:text-4xl">
					<span>About Me</span>
				</h1>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
					<div className="md:col-span-1">
						<img
							src="/images/dipan-avatar.svg"
							alt="Sajal Kumar Jana"
							className="border-surface0 bg-surface0 h-full w-full rounded-md border object-cover shadow-lg transition-transform duration-300 hover:scale-[1.02]"
						/>
					</div>

					<div className="space-y-4 md:col-span-2">
						<p className="text-subtext0 text-base leading-relaxed">
							<b>Hey!</b> I'm Sajal Kumar Jana{' '}
							<a className="link" href="/socials">
								(@sajaldev)
							</a>{' '}
							— a final-year Information Technology undergrad at Army Institute of Technology Pune
							with 1.5+ years of experience shipping production systems. I build at the intersection of
							scalable backend systems, AI-powered platforms, and civic technology.
						</p>

						<p className="text-subtext0 text-base leading-relaxed">
							Currently a <b>Software Engineer Intern (Full Stack) at PrepAiro</b> (Oct 2024 – Jun 2026),
							a UPSC CSE prep platform. As founding engineer, I built and scaled a cross-platform
							Flutter app to <b>150,000+ installs</b> on Android and iOS. On the backend, I architected
							a horizontally-scalable, pod-death-safe real-time Duel battle system (1v1 + multiplayer
							all-compete rooms) around Centrifugo + Django — replacing pod-local STOMP state with
							Postgres advisory locks, owning-pod heartbeats, and an orphaned-room sweeper to make the
							backend safe under HPA scale events. I also designed a full-stack clickstream analytics
							pipeline (Flutter → Kafka → Confluent S3 Connector → DuckDB) and built an in-house
							mobile attribution microservice replacing AppsFlyer, processing <b>1M+ clicks</b> and
							attributing <b>50,000+ installs</b> via deep-linking — saving thousands of dollars daily.
						</p>

						<p className="text-subtext0 text-base leading-relaxed">
							Before that, I spent a summer at <b>Code For GovTech</b> (The Mifos Initiative) building
							identity and workflow infrastructure for financial inclusion. I shipped a Keycloak+jBPM
							automation layer and Grafana/Prometheus observability stack that cut manual beneficiary
							operations in half — unlocking richer segmentation for <b>100,000+ accounts</b>. That
							experience taught me how unglamorous backend work (RBAC, audit logs, workflow engines)
							becomes the backbone of systems that serve real people at scale.
						</p>

						<p className="text-subtext0 text-base leading-relaxed">
							My side projects live in the same neighborhood. <b>DXTalent</b> is an AI-powered DX
							learning marketplace with Stripe monetization, role-based access, and a gamified
							credibility engine — because developers deserve better than passive tutorials.
							<b>Pathos</b>, my VS Code extension (now on the Marketplace), helps indie devs
							understand their focus patterns through local-first activity analytics. And
							<b>RAKSHAK</b>, a safety platform my team built, won <b>1st place out of 2,000+
							teams</b> at the eRaksha Hackathon (IIT Delhi & CyberPeace Foundation) and demoed live
							at the Global AI Summit 2026 in New Delhi.
						</p>

						<p className="text-subtext0 text-base leading-relaxed">
							I work extensively with AI and Retrieval-Augmented Generation (RAG) — building hybrid
							retrieval pipelines combining vector search (Qdrant), BM25 keyword ranking, and
							entity-based lookup for memory-augmented AI chat systems (<b>Jyntrix AI</b>). My
							toolkit spans <b>Java, Spring Boot, Dart/Flutter, Kotlin, Python, JavaScript,
							PostgreSQL, PostGIS, Kafka, AWS, Docker, Firebase, DuckDB, Qdrant</b>. I care less
							about the stack and more about <em>engineering systems that scale from zero to real
							users</em> — whether that's a real-time battle backend handling pod autoscaling, an
							attribution pipeline processing millions of events, or a civic system a field officer
							uses in a rural branch.
						</p>

						<p className="text-subtext0 text-base leading-relaxed">
							When I'm not coding, you'll find me organizing hackathons, sketching campus architecture
							on paper, or chasing blue-hour light around Jabalpur with a compact camera. If you're
							building anything around DX, developer productivity, AI-assisted workflows, or
							technology for public good —{' '}
							<a href={Site.out.calcom} className="link">
								book a chat
							</a>{' '}
							— I'd love to hear about it.
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
							<button
								className="hover:text-accent inline-flex items-center gap-1.5 text-sm transition-colors"
								onClick={handleEmailClick}
							>
								<IconMail size={16} />
								kakalijana1254@gmail.com
							</button>
						</div>
					</div>
				</div>
			</section>

			{/* Beyond the keyboard */}
			<section id="hobbies-section" className="space-y-8">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					<div className="bg-base rounded-lg p-5 shadow-sm">
						<h3 className="mb-2 text-lg font-semibold">Sunrise photo walks</h3>
						<p className="text-subtext0 text-sm leading-relaxed">
							I carry a compact camera around campus to document brutalist corners, chai stalls
							waking up, and friends rehearsing for cultural nights. The gallery lives{' '}
							<a className="link" href="/photos">
								here
							</a>{' '}
							whenever I get around to curating it.
						</p>
					</div>
					<div className="bg-base rounded-lg p-5 shadow-sm">
						<h3 className="mb-2 text-lg font-semibold">Community energy</h3>
						<p className="text-subtext0 text-sm leading-relaxed">
							I mentor hackathons, host internal ship nights, and help juniors prepare for their
							first open source PR. Teaching forces me to explain trade-offs with far more empathy.
						</p>
					</div>
					<div className="bg-base rounded-lg p-5 shadow-sm">
						<h3 className="mb-2 text-lg font-semibold">Analog tinkering</h3>
						<p className="text-subtext0 text-sm leading-relaxed">
							When the code editor closes, I sketch interface ideas on paper, journal about
							experiments, and learn new ragas on my synth. Slow hobbies keep my shipping pace
							sustainable.
						</p>
					</div>
				</div>
			</section>
		</div>
	);
};
