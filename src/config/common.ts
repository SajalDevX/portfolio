import {
    IconBrandGithub,
    IconBrandLinkedin,
    IconMail,
    IconChefHat,
} from '@tabler/icons-react';

export interface Site {
    name: string;
    url: string;
    description: string;
    tags: string[];
    seo: {
        author: string;
        birthDate: string;
        worksFor: {
            name: string;
            url: string;
        };
        location: {
            city: string;
            region: string;
            country: string;
        };
    };
    abacus: { enabled: boolean; instance?: string; namespace?: string; key?: string };
    out: {
        github: string;
        linkedin: string;
        calcom: string;
        wakatime?: string;
        bluesky?: string;
        instagram?: string;
        x?: string;
        leetcode?: string;
        codechef?: string;
        email: string;
    };
    repo: { url: string; commitBaseUrl: string };
}

const Site: Site = {
    name: 'Sajal Kumar Jana',

    url: import.meta.env.DEV ? 'http://localhost:5173' : 'https://sajal-dev.github.io',
    description:
        "Sajal Kumar Jana — Army Institute of Technology Pune IT undergrad building DX platforms, developer tooling, and thoughtful web experiences.",
    tags: [
        'Sajal Kumar Jana',
        'IIITDM Jabalpur',
        'DX Platform Engineer',
        'Full Stack Developer India',
        'Next.js Developer',
        'Django Developer',
        'DevOps',
        'Digital Transformation',
        'Open Source Contributor',
        'Docker',
        'AWS',
        'React',
        'TypeScript',
        'Node.js',
        'Python',
        'Data Visualization',
        'Product Engineering',
        'Gamification'
    ],
    seo: {
        author: 'Sajal Kumar Jana',
        birthDate: '2004-01-01',
        worksFor: {
            name: 'PrepAiro',
            url: 'https://prepair.com/'
        },
        location: {
            city: 'Jabalpur',
            region: 'Madhya Pradesh',
            country: 'India'
        }
    },
    abacus: {
        enabled: false
    },
    out: {
        github: 'https://github.com/SajalDevX',
        linkedin: 'https://www.linkedin.com/in/sajalkumarjana',
        calcom: 'https://cal.com/sajal-kumar-jana/15min',
        wakatime: 'https://wakatime.com/@sajaldev',
        leetcode: 'https://leetcode.com/u/sajaldev/',
        codechef: 'https://www.codechef.com/users/sajaldev',
        email: 'mailto:kakalijana1254@gmail.com'
    },
    repo: {
        url: 'https://github.com/sajaldev/portfolio',
        commitBaseUrl: 'https://github.com/sajaldev/portfolio/commit/'
    }
};

export const Socials = [
    {
        label: 'GitHub',
        url: Site.out.github,
        icon: IconBrandGithub,
        footer: true
    },
    {
        label: 'LinkedIn',
        url: Site.out.linkedin,
        icon: IconBrandLinkedin,
        footer: true
    },
    {
        label: 'Email',
        url: Site.out.email,
        icon: IconMail,
        footer: true
    },
    {
        label: 'CodeChef',
        url: Site.out.codechef || '#',
        icon: IconChefHat,
        footer: false
    }
];

export default Site;
