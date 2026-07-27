import { IconBrandGithub, IconBrandLinkedin, IconMail } from '@tabler/icons-react';
import Site from './common';

export const Home = {
    socialLinks: [
        {
            href: Site.out.github,
            text: 'GitHub',
            icon: IconBrandGithub
        },
        {
            href: Site.out.linkedin,
            text: 'LinkedIn',
            icon: IconBrandLinkedin
        },
        {
            href: Site.out.email,
            text: 'Email',
            icon: IconMail
        }
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

export const experienceTimeline: ExperienceTimelineItem[] = [
    {
        company: 'PrepAiro',
        role: 'Software Engineer Intern (Full Stack Developer)',
        url: 'https://prepair.com/',
        logoUrl: 'https://prepair.com/logo.png',
        logoAlt: 'PrepAiro Logo',
        startDate: '2024-10-01',
        endDate: '2026-06-30',
        details:
            'Founding engineer on a cross-platform Flutter mobile app (150k+ installs). Architected horizontally-scalable real-time Duel battle system with Centrifugo + Django, Postgres advisory locks, heartbeat-based failover under HPA. Built clickstream analytics pipeline (Flutter → Kafka → Confluent S3 → DuckDB) and in-house attribution microservice replacing AppsFlyer (1M+ clicks, 50k+ attributed installs).',
        logoScale: 1.05
    },
    {
        company: 'Code For GovTech',
        role: 'Open Source Developer Intern',
        url: 'https://codeforgovtech.in/',
        logoUrl: 'https://codeforgovtech.in/wp-content/uploads/2024/01/logo.webp',
        logoAlt: 'C4GT Logo',
        startDate: '2024-06-01',
        endDate: '2024-09-30',
        details:
            'Delivered Keycloak-powered RBAC, jBPM automation, and Grafana/Prometheus monitoring for The Mifos Initiative—cutting manual beneficiary ops in half for 100k+ accounts.'
    }
];