export type BlogCategory =
  | 'seo'
  | 'ai'
  | 'websites'
  | 'digital-transformation'
  | 'business-growth'
  | 'automation'
  | 'branding'
  | 'technology'
  | 'cybersecurity'
  | 'analytics';

export interface Author {
  name: string;
  role: string;
  image?: string;
  bio?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Reference {
  title: string;
  url?: string;
  author?: string;
}

export interface ArticleFrontmatter {
  title: string;
  metaTitle?: string;
  metaDescription: string;
  excerpt: string;
  category: BlogCategory;
  tags: string[];
  author: Author;
  featured?: boolean;
  featuredImage?: string;
  featuredImageAlt?: string;
  faq?: FAQ[];
  references?: Reference[];
  relatedSlugs?: string[];
  internalLinks?: {
    text: string;
    href: string;
  }[];
}

export interface Article {
  slug: string;
  locale: string;
  frontmatter: ArticleFrontmatter;
  content: string;
  readingTime: number;
  headings: TableOfContentsItem[];
}

export interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

export interface ArticleCard {
  slug: string;
  locale: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  tags: string[];
  author: Author;
  readingTime: number;
  featured?: boolean;
  featuredImage?: string;
  featuredImageAlt?: string;
}

export const categoryConfig: Record<BlogCategory, { color: string; icon: string }> = {
  seo: { color: 'bg-emerald-50 text-emerald-700', icon: 'Search' },
  ai: { color: 'bg-purple-50 text-purple-700', icon: 'Brain' },
  websites: { color: 'bg-blue-50 text-blue-700', icon: 'Globe' },
  'digital-transformation': { color: 'bg-indigo-50 text-indigo-700', icon: 'Zap' },
  'business-growth': { color: 'bg-amber-50 text-amber-700', icon: 'TrendingUp' },
  automation: { color: 'bg-cyan-50 text-cyan-700', icon: 'Cog' },
  branding: { color: 'bg-rose-50 text-rose-700', icon: 'Palette' },
  technology: { color: 'bg-sky-50 text-sky-700', icon: 'Cpu' },
  cybersecurity: { color: 'bg-red-50 text-red-700', icon: 'Shield' },
  analytics: { color: 'bg-orange-50 text-orange-700', icon: 'BarChart3' },
};

export const categoryTranslationKeys: Record<BlogCategory, string> = {
  seo: 'seo',
  ai: 'ai',
  websites: 'websites',
  'digital-transformation': 'digitalTransformation',
  'business-growth': 'businessGrowth',
  automation: 'automation',
  branding: 'branding',
  technology: 'technology',
  cybersecurity: 'cybersecurity',
  analytics: 'analytics',
};
