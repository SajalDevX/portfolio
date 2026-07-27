export interface ProjectMetadata {
    title: string;
    description: string;
    image?: {
        url: string;
        alt: string;
    };
    tags?: string[];
    published_at?: string;
    featured?: boolean;
}

export interface FeaturedProject {
    slug: string;
    metadata: ProjectMetadata;
}
