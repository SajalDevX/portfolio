export interface Project {
    slug: string;
    title: string;
    description: string;
    fullDescription: string;
    highlights: string[];
    date: string;
    languages: string[];
    tags: string[];
    github?: string;
    live?: string;
    liveLabel?: string;
    image?: {
        url: string;
        alt: string;
    };
    featured?: boolean;
    githubInfo?: {
        owner: string;
        repo: string;
    };
}

const cover = (slug: string, alt: string) => ({ url: `/images/projects/${slug}.svg`, alt });

export const projects: Project[] = [
    {
        slug: 'rakshak',
        title: 'RAKSHAK',
        description:
            'Agentic AI cyber guardian for home IoT — 1st place out of 2,000+ teams at the eRaksha Hackathon (IIT Delhi × CyberPeace Foundation).',
        fullDescription:
            'RAKSHAK is an edge-AI security device that sits on a home network and defends the IoT devices behind it. It runs on a Raspberry Pi 5 (with an Nvidia Jetson build for heavier models) and combines two ideas: a reinforcement-learning agent that decides how to respond to a threat, and language-model-driven honeypots that keep an attacker busy while the device learns who they are.\n\nThe response agent is a Dueling DQN trained to choose among isolation, rate-limiting, alerting and decoy actions based on live traffic features from Scapy and nmap scans. The honeypots are powered by TinyLlama 1.1B and dynamically imitate real devices on the network — a smart plug, a camera, a router admin page — so probes and credential attempts are answered convincingly, logged and fingerprinted instead of reaching the real device.\n\nThe project ranked 1st of 2,000+ teams nationwide at eRaksha 2026 and was then selected to demo live at the Global AI Summit 2026 at Bharat Mandapam, New Delhi.',
        highlights: [
            'Dueling DQN agent selects autonomous threat responses from live network features',
            'TinyLlama-1.1B honeypots impersonate real IoT devices to stall and fingerprint attackers',
            'Runs fully on-device on a Raspberry Pi 5; Flask dashboard for alerts and captured sessions',
            '1st place, eRaksha Hackathon 2026; demoed at the Global AI Summit 2026'
        ],
        date: '2026-03-01',
        languages: ['Python', 'PyTorch', 'Flask'],
        tags: ['edge-ai', 'reinforcement-learning', 'iot-security', 'honeypot', 'hackathon-winner'],
        github: 'https://github.com/SajalDevX/e-rakshak',
        image: cover('rakshak', 'e-rakshak cover'),
        featured: true,
        githubInfo: { owner: 'SajalDevX', repo: 'e-rakshak' }
    },
    {
        slug: 'pess',
        title: 'PESS — Public Emergency Surveillance System',
        description:
            'Camera-to-phone-call fire response: YOLOv8 detection, Gemini verification to kill false alarms, then Vapi voice agents dial the fire brigade over Twilio.',
        fullDescription:
            'PESS turns ordinary RTSP camera feeds into an automated emergency responder. Frames stream through a YOLOv8 detector into a temporal scorer; a detection only counts when the score stays at or above 50 for three sustained seconds, which filters out flicker, reflections and single-frame false positives.\n\nA sustained detection is handed to Gemini 2.5 Flash (via OpenRouter) for a second opinion on the actual frames before anything escalates. Once a fire is confirmed, the system dispatches two sequential voice-agent calls through Vapi and Twilio PSTN — first to the fire brigade, then to the camera owner. The agent answers live questions from the caller strictly from the incident facts it was given (location, time, camera, confidence), so it cannot hallucinate details under pressure.',
        highlights: [
            'YOLOv8 + temporal scoring: score ≥ 50 sustained for 3 s before escalation',
            'Gemini 2.5 Flash verifies frames to eliminate false alarms before any call goes out',
            'Two sequential Vapi voice-agent calls over Twilio PSTN (fire brigade, then camera owner)',
            'Voice agent answers only from incident facts — no hallucinated details'
        ],
        date: '2026-04-26',
        languages: ['Python', 'OpenCV'],
        tags: ['computer-vision', 'yolov8', 'llm', 'voice-agents', 'public-safety'],
        github: 'https://github.com/SajalDevX/PESS',
        image: cover('pess', 'PESS cover'),
        featured: true,
        githubInfo: { owner: 'SajalDevX', repo: 'PESS' }
    },
    {
        slug: 'prepairo',
        title: 'PrepAiro',
        description:
            'UPSC CSE prep app with 150K+ Play Store installs — founding engineer across the Flutter client and the real-time Spring Boot backend.',
        fullDescription:
            'PrepAiro is an AI-driven UPSC preparation platform. I joined as the founding engineer and shipped the cross-platform Flutter app to Android and iOS, where it reached 150,000+ installs on Google Play and 20,000+ on the App Store.\n\nOn the backend I designed the real-time Duel system — 1v1 and multiplayer all-compete rooms — around Centrifugo and Spring Boot. The first version kept room state in memory per pod, which broke whenever the cluster autoscaled; I replaced it with JPA-backed shared room state guarded by Postgres advisory locks, owning-pod heartbeats and an orphaned-room sweeper, making the service horizontally scalable and safe when a pod dies mid-game.\n\nI also built the analytics and growth plumbing: a clickstream pipeline from Flutter events through a Kafka microservice and the Confluent S3 connector (Parquet, ten-minute batches) into DuckDB for ad-hoc queries, integrations with Meta Ads, Google Ads and AppsFlyer processing 2M+ campaign events a month, and finally an in-house attribution microservice that replaced AppsFlyer — 1M+ clicks and 50K+ attributed installs via deep links and conversion tracking.',
        highlights: [
            '150K+ Google Play and 20K+ App Store installs',
            'Pod-death-safe real-time duel rooms: Centrifugo, Postgres advisory locks, heartbeats, orphan sweeper',
            'Clickstream pipeline: Flutter → Kafka → S3/Parquet → DuckDB',
            'In-house attribution service replacing AppsFlyer (1M+ clicks, 50K+ installs attributed)'
        ],
        date: '2026-03-31',
        languages: ['Flutter', 'Dart', 'Java', 'Spring Boot', 'PostgreSQL', 'Kafka'],
        tags: ['mobile', 'real-time', 'kafka', 'analytics', 'production'],
        live: 'https://play.google.com/store/apps/details?id=ai.prepairo.app',
        liveLabel: 'Play Store',
        image: cover('prepairo', 'PrepAiro cover'),
        featured: false
    },
    {
        slug: 'jyntrix-ai',
        title: 'Jyntrix AI',
        description:
            'Memory-augmented chat: hybrid retrieval over Qdrant, BM25 and entity graphs gives an LLM long-term semantic, episodic and profile memory.',
        fullDescription:
            'Jyntrix AI is a retrieval-augmented generation system built to give AI chats a durable memory across sessions. Memory is split into three kinds — semantic (facts), episodic (what happened when) and profile (who the user is) — and each is stored and retrieved differently.\n\nRetrieval is hybrid: dense vector search in Qdrant, BM25 keyword ranking, entity-based lookup and recency-aware selection are fused and reranked. An async backend pipeline runs query analysis, hybrid ranking and token-budgeted context assembly, then streams the LLM response over Server-Sent Events so the client renders tokens as they arrive.',
        highlights: [
            'Semantic, episodic and profile memory with different storage and retrieval strategies',
            'Hybrid retrieval: Qdrant vectors + BM25 + entity lookup + recency, fused and reranked',
            'Token-budgeted context assembly and SSE-streamed responses'
        ],
        date: '2025-12-27',
        languages: ['Python', 'Qdrant'],
        tags: ['rag', 'vector-search', 'llm', 'memory', 'streaming'],
        github: 'https://github.com/Jyntrix-ai/jyntrix-ai',
        image: cover('jyntrix-ai', 'jyntrix-ai cover'),
        githubInfo: { owner: 'Jyntrix-ai', repo: 'jyntrix-ai' }
    },
    {
        slug: 'lufious',
        title: 'Lufious',
        description:
            'AI-powered plant-care app: Clean Architecture Compose client with an expert-picker that routes scans to specialised diagnosis agents.',
        fullDescription:
            'Lufious helps people keep plants alive. Point the camera at a plant and an expert-picker algorithm decides which of five-plus specialised AI agents should look at it — disease detection, growth analysis, watering, and so on — then orchestrates the scan per agent and streams the answer back into a WebSocket chat.\n\nThe Android app is built with Jetpack Compose under Clean Architecture and MVVM, split into five modules (auth, garden, scan, shop, profile) wired with Koin. It has its own responsive UI kit (375×812dp scaling), 3D-animated buttons, real-time validation and dynamic theming, a Retrofit + OkHttp networking layer, Room with Flow-based reactive queries for offline use, S3 media uploads and weather/location sync. The backend lives in a companion TypeScript service.',
        highlights: [
            'Expert-picker routes each scan to the right specialised agent (5+ agents)',
            'Five Compose modules under Clean Architecture + MVVM with Koin DI',
            'Reusable responsive UI kit, Room + Flow offline layer, WebSocket chat, S3 uploads'
        ],
        date: '2026-06-12',
        languages: ['Kotlin', 'Jetpack Compose', 'TypeScript'],
        tags: ['android', 'jetpack-compose', 'clean-architecture', 'ai-agents'],
        github: 'https://github.com/SajalDevX/Lufious',
        image: cover('lufious', 'Lufious cover'),
        githubInfo: { owner: 'SajalDevX', repo: 'Lufious' }
    },
    {
        slug: 'gustosa',
        title: 'Gustosa',
        description:
            'College dining app serving 1,000+ students during the 10 PM – 2 AM night-canteen window, with payments and live order tracking.',
        fullDescription:
            'Gustosa is the night-canteen delivery app for campus. Co-developed with seniors at AIT, it takes mess and canteen orders between 10 PM and 2 AM and has served 1,000+ students.\n\nThe client is Jetpack Compose with MVVM on a layered UI/domain/data codebase, which let several people build features in parallel. The backend is Firebase and Supabase: Realtime Database drives live order tracking, FCM handles push notifications, and the Minis payment gateway takes care of transactions.',
        highlights: [
            '1,000+ students served in the nightly 10 PM – 2 AM window',
            'Minis payment gateway, Firebase Realtime Database order tracking, FCM notifications',
            'Layered UI/domain/data architecture enabling parallel feature work'
        ],
        date: '2024-10-27',
        languages: ['Kotlin', 'Jetpack Compose', 'Firebase', 'Supabase'],
        tags: ['android', 'firebase', 'payments', 'campus'],
        github: 'https://github.com/SajalDevX/Gustosa',
        image: cover('gustosa', 'Gustosa cover'),
        githubInfo: { owner: 'SajalDevX', repo: 'Gustosa' }
    },
    {
        slug: 'vincino',
        title: 'Vincino',
        description:
            'Social platform I founded: three Spring Boot microservices behind an API gateway, PostGIS-powered "users near me" discovery and QR-code sharing.',
        fullDescription:
            'Vincino is a social networking platform I founded and led. The backend is a three-service Spring Boot microservice architecture behind an API gateway, with a Flutter client.\n\nIts signature feature is real-time geospatial discovery — "users near me" — built on PostGIS, which asynchronously stores and queries thousands of location points. It also supports QR-code social sharing and professional job-search networking across industries, on a modular architecture intended to grow with the product.',
        highlights: [
            'Three-service Spring Boot microservice backend behind an API gateway',
            'PostGIS geospatial discovery handling 1,000+ asynchronous location queries',
            'Real-time QR-code sharing and cross-industry professional networking'
        ],
        date: '2025-08-01',
        languages: ['Java', 'Spring Boot', 'PostgreSQL', 'PostGIS', 'Flutter'],
        tags: ['microservices', 'postgis', 'social', 'flutter'],
        github: 'https://github.com/VicinVro',
        image: cover('vincino', 'Vincino cover')
    }
];

export const getFeaturedProjects = () => projects.filter((p) => p.featured);
export const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
