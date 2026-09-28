import { IconBrandGithub, IconBrandLinkedin, IconMail } from '@tabler/icons-react';
import Site from './common';

export const Home = {
    socialLinks: [
        { href: Site.out.github, text: 'GitHub', icon: IconBrandGithub },
        { href: Site.out.linkedin, text: 'LinkedIn', icon: IconBrandLinkedin },
        { href: Site.out.email, text: 'Email', icon: IconMail }
    ]
};

export interface ExperienceTimelineItem {
    company: string;
    role: string;
    url: string;
    logoUrl: string;
    logoAlt: string;
    startDate: string;
    endDate?: string;
    details?: string;
    logoScale?: number;
}

const favicon = (domain: string) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

export const experienceTimeline: ExperienceTimelineItem[] = [
    {
        company: 'AfterQuery',
        role: 'Frontier Bench Task Author (Kepler)',
        url: 'https://afterquery.com/',
        logoUrl: favicon('afterquery.com'),
        logoAlt: 'AfterQuery logo',
        startDate: '2026-08-01',
        details:
            'Design containerized, machine-verifiable Frontier Bench tasks: agent-visible environments, reference solutions and isolated verifiers. Define deterministic artifact contracts and adversarial checks so a correct oracle run passes while no-op and shortcut paths fail. Analyze agent trajectories to tune clarity, fairness and difficulty.'
    },
    {
        company: 'Handshake',
        role: 'AI Benchmark Task Author (Dynamo, Seal)',
        url: 'https://joinhandshake.com/',
        logoUrl: favicon('joinhandshake.com'),
        logoAlt: 'Handshake logo',
        startDate: '2026-07-01',
        details:
            'Author Terminal-Bench-style tasks that need real terminal analysis, repair and reproducible deliverables. Build Dockerized environments and test harnesses; validate isolation, deterministic scoring and anti-cheat behaviour before evaluation. Convert real engineering workflows into tasks with explicit artifacts, resource limits and binary grading.'
    },
    {
        company: 'PrepAiro',
        role: 'Founding Engineer · Software Engineer Intern',
        url: 'https://prepairo.ai/',
        logoUrl: favicon('prepairo.ai'),
        logoAlt: 'PrepAiro logo',
        startDate: '2024-10-01',
        endDate: '2026-03-31',
        details:
            'Shipped the cross-platform Flutter app (Android + iOS) to 150K+ Play Store and 20K+ App Store installs. Architected the multi-pod real-time Duel system around Centrifugo + Spring Boot: JPA-backed shared room state, Postgres advisory locks, owning-pod heartbeats and an orphaned-room sweeper, so rooms survive HPA scale events. Built the clickstream pipeline (Flutter → Kafka → Confluent S3 / Parquet → DuckDB) and an in-house attribution service that replaced AppsFlyer — 1M+ clicks, 50K+ attributed installs.'
    }
];
