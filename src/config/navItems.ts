interface NavItem {
    title: string;
    href: string;
    external?: boolean;
}

export const mainNavItems: NavItem[] = [
    { title: 'About', href: '/about' },
    { title: 'Posts', href: '/posts' },
    { title: 'Projects', href: '/projects' },
    { title: 'Resume', href: 'https://drive.google.com/file/d/1fpmYTjThWXE_q-3NXkPNjK0CW7MdWIgd/view', external: true }
];

export const moreNavItems: NavItem[] = [
    { title: 'Tutorials', href: '/tutorials' },
    { title: 'Notes', href: '/notes' },
];
