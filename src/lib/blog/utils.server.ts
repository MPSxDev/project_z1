import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type {
  Article,
  ArticleCard,
  ArticleFrontmatter,
  BlogCategory,
  TableOfContentsItem,
} from './types';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

function extractHeadings(content: string): TableOfContentsItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: TableOfContentsItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    headings.push({ id, text, level });
  }

  return headings;
}

function getArticleFiles(locale: string): string[] {
  const localeDir = path.join(CONTENT_DIR, locale);

  if (!fs.existsSync(localeDir)) {
    return [];
  }

  return fs
    .readdirSync(localeDir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

export function getArticle(slug: string, locale: string): Article | null {
  const filePath = path.join(CONTENT_DIR, locale, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  const frontmatter = data as ArticleFrontmatter;
  const stats = readingTime(content);
  const headings = extractHeadings(content);

  return {
    slug,
    locale,
    frontmatter,
    content,
    readingTime: Math.ceil(stats.minutes),
    headings,
  };
}

export function getAllArticles(locale: string): ArticleCard[] {
  const slugs = getArticleFiles(locale);

  const articles = slugs
    .map((slug) => {
      const article = getArticle(slug, locale);
      if (!article) return null;

      return {
        slug: article.slug,
        locale: article.locale,
        title: article.frontmatter.title,
        excerpt: article.frontmatter.excerpt,
        category: article.frontmatter.category,
        tags: article.frontmatter.tags,
        author: article.frontmatter.author,
        readingTime: article.readingTime,
        featured: article.frontmatter.featured,
        featuredImage: article.frontmatter.featuredImage,
        featuredImageAlt: article.frontmatter.featuredImageAlt,
      } as ArticleCard;
    })
    .filter((article): article is ArticleCard => article !== null);

  return articles;
}

export function getFeaturedArticle(locale: string): ArticleCard | null {
  const articles = getAllArticles(locale);
  return articles.find((article) => article.featured) || articles[0] || null;
}

export function getLatestArticles(locale: string, count: number = 6): ArticleCard[] {
  const articles = getAllArticles(locale);
  return articles.slice(0, count);
}

export function getArticlesByCategory(
  locale: string,
  category: BlogCategory
): ArticleCard[] {
  const articles = getAllArticles(locale);
  return articles.filter((article) => article.category === category);
}

export function getArticlesByTag(locale: string, tag: string): ArticleCard[] {
  const articles = getAllArticles(locale);
  return articles.filter((article) =>
    article.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getRelatedArticles(
  currentSlug: string,
  locale: string,
  count: number = 3
): ArticleCard[] {
  const currentArticle = getArticle(currentSlug, locale);
  if (!currentArticle) return [];

  const allArticles = getAllArticles(locale);

  // First try to get articles from relatedSlugs
  if (currentArticle.frontmatter.relatedSlugs?.length) {
    const related = currentArticle.frontmatter.relatedSlugs
      .map((slug) => allArticles.find((a) => a.slug === slug))
      .filter((a): a is ArticleCard => a !== undefined)
      .slice(0, count);

    if (related.length >= count) return related;
  }

  // Otherwise, get articles from same category
  return allArticles
    .filter(
      (article) =>
        article.slug !== currentSlug &&
        article.category === currentArticle.frontmatter.category
    )
    .slice(0, count);
}

export function getAllSlugs(locale: string): string[] {
  return getArticleFiles(locale);
}

export function getAllCategories(locale: string): BlogCategory[] {
  const articles = getAllArticles(locale);
  const categories = new Set(articles.map((article) => article.category));
  return Array.from(categories);
}

export function getAllTags(locale: string): string[] {
  const articles = getAllArticles(locale);
  const tags = new Set(articles.flatMap((article) => article.tags));
  return Array.from(tags);
}

export function searchArticles(locale: string, query: string): ArticleCard[] {
  if (!query.trim()) return getAllArticles(locale);

  const articles = getAllArticles(locale);
  const lowerQuery = query.toLowerCase();

  return articles.filter(
    (article) =>
      article.title.toLowerCase().includes(lowerQuery) ||
      article.excerpt.toLowerCase().includes(lowerQuery) ||
      article.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}

export function getPopularArticles(locale: string, count: number = 5): ArticleCard[] {
  // In a real implementation, this would be based on analytics
  // For now, we return featured articles first, then latest
  const articles = getAllArticles(locale);
  const featured = articles.filter((a) => a.featured);
  const nonFeatured = articles.filter((a) => !a.featured);

  return [...featured, ...nonFeatured].slice(0, count);
}
