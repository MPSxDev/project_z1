'use client';

import { motion } from 'framer-motion';
import ArticleCard from './ArticleCard';
import type { ArticleCard as ArticleCardType } from '@/lib/blog';
import { categoryTranslationKeys } from '@/lib/blog';

interface RelatedArticlesProps {
  articles: ArticleCardType[];
  title: string;
  translations: {
    readMore: string;
    minRead: string;
    categories: Record<string, string>;
  };
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export default function RelatedArticles({
  articles,
  title,
  translations,
}: RelatedArticlesProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="py-12 border-t border-gray-100" aria-labelledby="related-title">
      <h2
        id="related-title"
        className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-8"
      >
        {title}
      </h2>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {articles.map((article, index) => (
          <ArticleCard
            key={article.slug}
            article={article}
            translations={{
              readMore: translations.readMore,
              minRead: translations.minRead,
            }}
            categoryLabel={
              translations.categories[categoryTranslationKeys[article.category]]
            }
            index={index}
          />
        ))}
      </motion.div>
    </section>
  );
}
