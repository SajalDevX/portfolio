import { IconBrandGithub, IconBrandLinkedin, IconMail } from '@tabler/icons-react';

export interface Site {
    name: string;
    handle: string;
    url: string;
    description: string;
    abacus: { enabled: boolean; instance?: string; namespace?: string; key?: string };
    out: {
        github: string;
        linkedin: string;
        email: string;
        resume: string;
        playStore: string;
        pullRequests: string;
    };
    repo: { url: string; commitBaseUrl: string };
}

const Site: Site = {
    name: 'Sajal Kumar Jana',
    handle: 'SajalDevX',

    url: import.meta.env.DEV
        ? 'http://localhost:5173'
        : 'https://portfolio-sajaldevxs-projects.vercel.app',
    description:
        'Sajal Kumar Jana — Android & backend engineer. Founding engineer at PrepAiro (150K+ installs); now authoring terminal-agent benchmarks for AfterQuery and Handshake and contributing to open source.',
    abacus: {
        enabled: false
    },
    out: {
        github: 'https://github.com/SajalDevX',
        linkedin: 'https://www.linkedin.com/in/sajal-kumar-jana-803917289',
        email: 'mailto:kakalijana1254@gmail.com',
        resume: 'https://drive.google.com/file/d/1fpmYTjThWXE_q-3NXkPNjK0CW7MdWIgd/view',
        playStore: 'https://play.google.com/store/apps/details?id=ai.prepairo.app',
        pullRequests:
            'https://github.com/search?q=author%3ASajalDevX+is%3Apr+-user%3ASajalDevX&type=pullrequests'
    },
    repo: {
        url: 'https://github.com/SajalDevX/portfolio',
        commitBaseUrl: 'https://github.com/SajalDevX/portfolio/commit/'
    }
};

export const Socials = [
    { label: 'GitHub', url: Site.out.github, icon: IconBrandGithub, footer: true },
    { label: 'LinkedIn', url: Site.out.linkedin, icon: IconBrandLinkedin, footer: true },
    { label: 'Email', url: Site.out.email, icon: IconMail, footer: true }
];

export default Site;
