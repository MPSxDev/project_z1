'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import {
  ReadingProgress,
  TableOfContents,
  AuthorCard,
  ShareButtons,
  FAQ,
  References,
  ArticleCTA,
  RelatedArticles,
} from '@/components/blog';
import type { Article, ArticleCard } from '@/lib/blog';
import { categoryConfig, categoryTranslationKeys } from '@/lib/blog';
import { cn } from '@/lib/utils';

interface ArticlePageContentProps {
  article: Article;
  locale: string;
  relatedArticles: ArticleCard[];
  articleUrl: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function ArticlePageContent({
  article,
  locale,
  relatedArticles,
  articleUrl,
}: ArticlePageContentProps) {
  const t = useTranslations('blog');
  const { frontmatter, content, readingTime, headings } = article;
  const categoryStyle = categoryConfig[frontmatter.category];
  const categoryLabel = t(
    `categories.${categoryTranslationKeys[frontmatter.category]}`
  );

  // Build category translations for RelatedArticles
  const categoryTranslations: Record<string, string> = {};
  Object.entries(categoryTranslationKeys).forEach(([, translationKey]) => {
    categoryTranslations[translationKey] = t(`categories.${translationKey}`);
  });

  return (
    <>
      <ReadingProgress />

      {/* Hero Section */}
      <Section background="gradient" className="pt-32 sm:pt-36 lg:pt-40">
        <Container size="6xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            {/* Back Link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-[#1F5CFF] transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('post.backToBlog')}
            </Link>

            {/* Category Badge */}
            <div className="mb-6">
              <span
                className={cn(
                  'inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium',
                  categoryStyle.color
                )}
              >
                {categoryLabel}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] text-gray-900 leading-[1.1] mb-8">
              {frontmatter.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span className="font-medium text-gray-900">
                  {frontmatter.author.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>
                  {readingTime} {t('listing.minRead')}
                </span>
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Article Content */}
      <Section background="white">
        <Container size="7xl">
          <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Main Content */}
            <motion.article
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="lg:col-span-3"
            >
              {/* Rendered Markdown Content */}
              <div
                className={cn(
                  'prose prose-lg prose-gray max-w-none',
                  'prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-gray-900',
                  'prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:scroll-mt-24',
                  'prose-h3:text-xl prose-h3:sm:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:scroll-mt-24',
                  'prose-p:text-gray-600 prose-p:leading-relaxed',
                  'prose-a:text-[#1F5CFF] prose-a:no-underline hover:prose-a:underline',
                  'prose-strong:text-gray-900 prose-strong:font-semibold',
                  'prose-ul:text-gray-600 prose-ol:text-gray-600',
                  'prose-li:marker:text-[#1F5CFF]',
                  'prose-blockquote:border-l-[#1F5CFF] prose-blockquote:text-gray-700',
                  'prose-code:text-[#1F5CFF] prose-code:bg-[#eff4ff] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-normal',
                  'prose-pre:bg-gray-900 prose-pre:text-gray-100'
                )}
                dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
              />

              {/* Author Card */}
              <div className="mt-12 pt-8 border-t border-gray-100">
                <AuthorCard author={frontmatter.author} label={t('post.author')} />
              </div>

              {/* Share Buttons */}
              <div className="mt-8">
                <ShareButtons
                  url={articleUrl}
                  title={frontmatter.title}
                  label={t('post.shareArticle')}
                />
              </div>

              {/* FAQ Section */}
              {frontmatter.faq && frontmatter.faq.length > 0 && (
                <FAQ items={frontmatter.faq} title={t('post.faq')} />
              )}

              {/* References */}
              {frontmatter.references && frontmatter.references.length > 0 && (
                <References
                  items={frontmatter.references}
                  title={t('post.references')}
                />
              )}

              {/* Article CTA */}
              <div className="mt-12">
                <ArticleCTA
                  title={t('cta.title')}
                  description={t('cta.description')}
                  buttonText={t('cta.consultation')}
                  buttonHref="/get-in-touch"
                />
              </div>
            </motion.article>

            {/* Sidebar - Table of Contents */}
            <aside className="hidden lg:block lg:col-span-1">
              <TableOfContents
                headings={headings}
                title={t('post.tableOfContents')}
              />
            </aside>
          </div>
        </Container>
      </Section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <Section background="gray">
          <Container size="7xl">
            <RelatedArticles
              articles={relatedArticles}
              title={t('post.relatedPosts')}
              translations={{
                readMore: t('listing.readMore'),
                minRead: t('listing.minRead'),
                categories: categoryTranslations,
              }}
            />
          </Container>
        </Section>
      )}
    </>
  );
}

function renderMarkdown(markdown: string): string {
  let html = markdown
    .replace(/^### (.*$)/gim, (_, text) => {
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      return `<h3 id="${id}">${text}</h3>`;
    })
    .replace(/^## (.*$)/gim, (_, text) => {
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      return `<h2 id="${id}">${text}</h2>`;
    })
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/^- (.+)/gim, '<li>$1</li>')
    .replace(/^\d+\. (.+)/gim, '<li>$1</li>');

  // Wrap consecutive li elements in ul
  const lines = html.split('\n');
  const result: string[] = [];
  let inList = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('<li>')) {
      if (!inList) {
        result.push('<ul>');
        inList = true;
      }
      result.push(trimmed);
    } else {
      if (inList) {
        result.push('</ul>');
        inList = false;
      }
      if (
        trimmed &&
        !trimmed.startsWith('<h') &&
        !trimmed.startsWith('<ul') &&
        !trimmed.startsWith('<ol') &&
        !trimmed.startsWith('<blockquote')
      ) {
        result.push(`<p>${trimmed}</p>`);
      } else if (trimmed) {
        result.push(trimmed);
      }
    }
  }

  if (inList) {
    result.push('</ul>');
  }

  return result
    .join('')
    .replace(/<p><\/p>/g, '')
    .replace(/<p><h/g, '<h')
    .replace(/<\/h(\d)><\/p>/g, '</h$1>')
    .trim();
}
