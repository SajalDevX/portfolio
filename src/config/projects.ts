export interface Project {
    slug: string;
    title: string;
    description: string;
    fullDescription: string;
    date: string;
    languages: string[];
    tags: string[];
    github?: string;
    live?: string;
    image?: {
        url: string;
        alt: string;
    };
    featured?: boolean;
    githubInfo?: {
        owner: string;
        repo: string;
        stars?: number;
        contributors?: number;
    };
}

export const projects: Project[] = [
    {
        slug: 'dxtalent',
        title: 'DXTalent',
        description: 'AI-powered DX learning marketplace with Stripe monetization and gamified credibility engine',
        fullDescription: 'DXTalent is an AI-powered learning platform for skill development and recruitment. It uses gamification to help users practice coding skills and connects top learners with recruiters via an integrated marketplace. Specifically, DXTalent generates educational content using AI and motivates users with game-like lessons and challenges. It provides an analytics dashboard to track learner progress and performance in real time. A core feature is its Talent Marketplace, where qualified users are matched with recruiting companies. All content generation, gamification, analytics, and the multi-tenant architecture are built on a Node.js/React/TypeScript stack.',
        date: '2025-11-21',
        languages: ['JavaScript', 'TypeScript', 'Node.js'],
        tags: ['AI', 'education', 'learning-platform', 'gamification', 'marketplace'],
        github: 'https://github.com/sajaldev/DXTalent',
        live: 'https://dxtalent.vercel.app',
        image: {
            url: '/images/projects/dxtalent.png',
            alt: 'DXTalent Project'
        },
        featured: true,
        githubInfo: {
            owner: 'sajaldev',
            repo: 'DXTalent',
            stars: 12,
            contributors: 3
        }
    },
    {
        slug: 'pathos',
        title: 'Pathos',
        description: 'VS Code extension that tracks focus time for indie developers',
        fullDescription: 'Pathos is a Visual Studio Code extension for tracking developer activity. It runs in the background as you code, recording metrics like file changes, programming language usage, and editing time. These insights are presented in an interactive dashboard to help developers understand their coding habits and productivity patterns. All data is stored locally for privacy. Key features include per-session activity logs, time spent per file, and charts showing work rhythm. The extension is open-source and can be installed via the VSCode Marketplace.',
        date: '2025-01-08',
        languages: ['TypeScript', 'VSCode Extension API'],
        tags: ['developer-tools', 'analytics', 'VSCode', 'productivity'],
        github: 'https://github.com/sajaldev/pathos',
        image: {
            url: '/images/projects/pathos.svg',
            alt: 'Pathos Extension'
        },
        featured: true,
        githubInfo: {
            owner: 'sajaldev',
            repo: 'pathos',
            stars: 8,
            contributors: 2
        }
    },
    {
        slug: 'jims',
        title: 'JIMS (Jewelry Management)',
        description: 'Full-featured shop management system for jewelry stores with inventory tracking and role-based auth',
        fullDescription: 'JIMS is a full-featured shop management system for a jewelry store. Built with Next.js and TypeScript, it includes role-based authentication, inventory tracking, order processing, and customer management. Staff users can log in with secure credentials (via the Clerk auth framework) to manage products and orders. The application supports tracking gemstones and jewelry pieces in an inventory database (using Prisma for data handling). Key features include inventory item listings, a shopping cart workflow, sales reports, and notifications for reordering. Its design focuses on security and data consistency in a commerce setting.',
        date: '2025-06-10',
        languages: ['TypeScript', 'Next.js', 'React'],
        tags: ['inventory-management', 'role-based-auth', 'retail', 'Next.js'],
        github: 'https://github.com/sajaldev/jims',
        githubInfo: {
            owner: 'sajaldev',
            repo: 'jims',
            stars: 5,
            contributors: 1
        }
    },
    {
        slug: 'moveinsync',
        title: 'moveInSync',
        description: 'Backend system for scalable carpooling platform with microservices architecture',
        fullDescription: 'moveInSync is a backend system for a scalable carpooling platform. It adopts a microservices architecture to meet Indian market needs. The platform enables ride-sharing services with advanced features: it uses secure and efficient request routing via an API gateway and distributed microservices for user management, ride creation, matching riders to drivers, and real-time communications. Each service has a defined role (e.g. Auth Service for JWT auth, Ride Service for creating rides, Matching Service for intelligent rider-driver matching). Additional safety modules include an Emergency SOS service and automated notifications. This architecture makes the system scalable and privacy-focused, with health checks and automated setup scripts for development.',
        date: '2025-06-21',
        languages: ['JavaScript', 'Node.js', 'Express'],
        tags: ['microservices', 'ride-sharing', 'backend', 'transportation'],
        github: 'https://github.com/sajaldev/carpooling',
        githubInfo: {
            owner: 'sajaldev',
            repo: 'carpooling',
            stars: 7,
            contributors: 2
        }
    },
    {
        slug: 'bookheaven',
        title: 'BookHeaven',
        description: 'Modern online bookstore application with e-commerce checkout and personalized bookshelves',
        fullDescription: 'BookHeaven is a modern online bookstore application. Built with Next.js and React (TypeScript) on the frontend and PostgreSQL on the backend, it offers a rich user experience for book lovers. Features include comprehensive book management (listing, categorizing, and inventory), personalized bookshelves for each user, secure authentication, and full e-commerce checkout. It integrates with Clerk for user authentication and uses Drizzle ORM for database access. Media management (e.g. book cover uploads) is also supported. In sum, BookHeaven provides a full-stack book retail platform with browsing, account management, and purchasing functionality.',
        date: '2025-05-17',
        languages: ['TypeScript', 'React', 'Next.js', 'PostgreSQL'],
        tags: ['e-commerce', 'bookstore', 'full-stack', 'Next.js'],
        github: 'https://github.com/sajaldev/bookheaven',
        githubInfo: {
            owner: 'sajaldev',
            repo: 'bookheaven',
            stars: 10,
            contributors: 2
        }
    },
    {
        slug: 'epilepsy-detection',
        title: 'Epilepsy Seizure Detection',
        description: 'Web application for managing and monitoring epilepsy seizure-prediction devices',
        fullDescription: 'This project is a web application for managing and monitoring epilepsy seizure-prediction devices. Built with Next.js 15 and integrated with Firebase, it allows patients and caregivers to track predicted seizures and respond quickly. Key functionality includes real-time alerts (via push notifications or emails) when a seizure risk is detected by a connected device, and an emergency contact management system to notify family or doctors immediately. The app collects data from wearable sensors, stores patient profiles in a PostgreSQL database, and displays upcoming risk alerts on a dashboard. Security and data privacy are also incorporated given the medical context.',
        date: '2025-05-03',
        languages: ['TypeScript', 'Next.js', 'Firebase', 'PostgreSQL'],
        tags: ['healthcare', 'IoT', 'monitoring', 'notifications'],
        github: 'https://github.com/sajaldev/epilepsy-detection'
    },
    {
        slug: 'securo',
        title: 'Securo',
        description: 'Fleet management solution with real-time GPS tracking and route optimization',
        fullDescription: 'Securo is a fleet management solution for companies tracking vehicles and drivers. It provides real-time monitoring of vehicle locations, route planning, and driver status. The system includes a GPS tracking interface, where fleet coordinators can view and manage live positions of all vehicles. Securo supports route optimization and allows dispatchers to assign rides to drivers. Safety features include driver check-in alerts and maintenance scheduling. In essence, Securo helps organizations improve logistics and safety by digitizing vehicle tracking and workflow management.',
        date: '2025-05-01',
        languages: ['JavaScript', 'Node.js', 'Express'],
        tags: ['fleet-management', 'logistics', 'real-time', 'GPS'],
        github: 'https://github.com/sajaldev/securo'
    },
    {
        slug: 'faceauth-sso',
        title: 'FaceAuth-SSO',
        description: 'Facial recognition single sign-on application with biometric authentication',
        fullDescription: 'FaceAuth-SSO is a facial recognition single sign-on application. It enables users to log in to multiple services using face biometric authentication. The system captures a user\'s facial image, processes it with a recognition model, and verifies the identity against stored profiles. Once authenticated, the user gains access through the centralized SSO server without entering passwords for each service. This improves security and user convenience. The key feature is the integration of a face recognition pipeline into a standard web SSO workflow.',
        date: '2025-04-19',
        languages: ['JavaScript', 'React', 'Node.js'],
        tags: ['biometrics', 'authentication', 'SSO', 'facial-recognition'],
        github: 'https://github.com/sajaldev/faceauth-sso'
    },
    {
        slug: 'digital-watermarking',
        title: 'Digital Watermarking',
        description: 'Image watermarking algorithms for IP protection using Hall\'s Property decomposition',
        fullDescription: 'This repository implements digital watermarking algorithms for images. It uses Hall\'s Property Image Decomposition to embed and detect invisible marks. The project provides basic and enhanced implementations of watermark embedding in digital images to protect ownership and detect tampering. Users can apply a watermark to an image and later verify its presence. This is useful for copyright protection of photos or documents. Key components include embedding routines, attack simulations (to test robustness), and detection algorithms. The focus is on research-level image processing techniques.',
        date: '2025-04-18',
        languages: ['Python'],
        tags: ['security', 'image-processing', 'IP-protection', 'watermarking'],
        github: 'https://github.com/sajaldev/digital-watermarking'
    },
    {
        slug: 'sault',
        title: 'Sault',
        description: 'Blockchain-based document management with IPFS and Aptos for immutability',
        fullDescription: 'Sault is a blockchain-based document management system. It provides a secure and transparent way to handle important documents (like contracts or certificates) by leveraging blockchain and IPFS. When a document is uploaded, Sault records it on the Aptos blockchain, ensuring immutability and auditability. Each document is hashed and pinned (e.g. via Pinata) to IPFS for decentralized storage, while the blockchain ledger stores a proof of existence. The web interface (React/TypeScript) allows users to upload, view, and share documents; every action is cryptographically tracked. In summary, Sault offers trusted document security and tamper-evidence by combining blockchain and distributed storage.',
        date: '2025-04-06',
        languages: ['TypeScript', 'React', 'Aptos', 'IPFS'],
        tags: ['blockchain', 'document-management', 'DeFi', 'transparency'],
        github: 'https://github.com/sajaldev/sault'
    },
    {
        slug: 'isekai-io',
        title: 'Isekai.io',
        description: 'Virtual world platform with anonymous avatars and 3D community spaces',
        fullDescription: 'Isekai.io is a virtual world project inspired by the "isekai" genre (where characters escape to another reality). The platform creates an immersive online environment where users can create anonymous avatars, join communities, and interact without revealing their real identities. Built with React and Three.js (for 3D graphics), it offers social features like forming guilds or clubs. Key features include user anonymity, community building, and a rich 3D environment. The intent is to provide a safe, engaging space for users to collaborate and socialize freely. The frontend is built with React (Vite) and Three.js for 3D rendering.',
        date: '2025-01-15',
        languages: ['JavaScript', 'React', 'Three.js'],
        tags: ['virtual-world', 'VR', 'community', 'gaming'],
        github: 'https://github.com/sajaldev/isekai-io',
        live: 'https://isekai.io'
    },
    {
        slug: 'synergy',
        title: 'Synergy',
        description: 'Open-source project for standardizing educational content structure',
        fullDescription: 'Synergy is an open-source project aimed at "Standardizing Odd School Structure". The repository deals with creating a unified structure for educational content (possibly curricula or materials). From the code (TypeScript) and context, it appears to be a back-end and front-end suite to organize and manage educational resources. It may include APIs to serve lessons or a content management system to help schools align curricula. The goal is likely to bring consistency to educational content delivery.',
        date: '2025-01-15',
        languages: ['TypeScript'],
        tags: ['education', 'standardization', 'structure', 'OSS'],
        github: 'https://github.com/sajaldev/synergy'
    }
];

export const getFeaturedProjects = () => projects.filter(p => p.featured);
export const getProjectBySlug = (slug: string) => projects.find(p => p.slug === slug);
