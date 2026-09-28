import Site from './common';

interface NavItem {
    title: string;
    href: string;
    external?: boolean;
}

export const mainNavItems: NavItem[] = [
    { title: 'About', href: '/about' },
    { title: 'Projects', href: '/projects' },
    { title: 'Posts', href: '/posts' },
    { title: 'Resume', href: Site.out.resume, external: true }
];

export const moreNavItems: NavItem[] = [
    { title: 'GitHub', href: Site.out.github, external: true },
    { title: 'Pull requests', href: Site.out.pullRequests, external: true }
];
