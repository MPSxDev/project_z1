'use client';

import { useState, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Heading from '@/components/ui/Heading';
import Button from '@/components/ui/Button';
import {
  ArticleCard,
  FeaturedArticle,
  CategoryFilter,
  SearchBar,
} from '@/components/blog';
import type { ArticleCard as ArticleCardType, BlogCategory } from '@/lib/blog';
import { categoryTranslationKeys } from '@/lib/blog';

interface BlogHomeContentProps {
  locale: string;
  initialArticles: ArticleCardType[];
  featuredArticle: ArticleCardType | null;
  popularArticles: ArticleCardType[];
  categories: BlogCategory[];
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export default function BlogHomeContent({
  locale,
  initialArticles,
  featuredArticle,
  popularArticles,
  categories,
}: BlogHomeContentProps) {
  const t = useTranslations('blog');
  const [activeCategory, setActiveCategory] = useState<BlogCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categoryTranslations = useMemo(() => {
    const translations: Record<string, string> = {};
    Object.entries(categoryTranslationKeys).forEach(([key, translationKey]) => {
      translations[translationKey] = t(`categories.${translationKey}`);
    });
    return translations;
  }, [t]);

  const filteredArticles = useMemo(() => {
    let articles = initialArticles;

    // Filter by category
    if (activeCategory !== 'all') {
      articles = articles.filter((article) => article.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      articles = articles.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.excerpt.toLowerCase().includes(query) ||
          article.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return articles;
  }, [initialArticles, activeCategory, searchQuery]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleCategoryChange = useCallback((category: BlogCategory | 'all') => {
    setActiveCategory(category);
  }, []);

  // Articles to show in main grid (excluding featured if showing all)
  const gridArticles = useMemo(() => {
    if (activeCategory === 'all' && !searchQuery && featuredArticle) {
      return filteredArticles.filter((a) => a.slug !== featuredArticle.slug);
    }
    return filteredArticles;
  }, [filteredArticles, activeCategory, searchQuery, featuredArticle]);

  return (
    <>
      {/* Hero Section */}
      <Section background="gradient" className="pt-32 sm:pt-36 lg:pt-40">
        <div className="text-center max-w-4xl mx-auto">
          <Heading
            as="h1"
            size="4xl"
            eyebrow={t('hero.eyebrow')}
            subtitle={t('hero.subtitle')}
            centered
          >
            {t('hero.title')}
          </Heading>
        </div>
      </Section>

      {/* Search Bar */}
      <Section background="white" className="py-8 sm:py-12">
        <SearchBar
          placeholder={t('listing.searchPlaceholder')}
          onSearch={handleSearch}
        />
      </Section>

      {/* Featured Article */}
      {featuredArticle && activeCategory === 'all' && !searchQuery && (
        <Section background="white" className="pt-0 pb-8">
          <FeaturedArticle
            article={featuredArticle}
            translations={{
              featured: t('listing.featured'),
              readMore: t('listing.readMore'),
              minRead: t('listing.minRead'),
            }}
            categoryLabel={t(
              `categories.${categoryTranslationKeys[featuredArticle.category]}`
            )}
          />
        </Section>
      )}

      {/* Category Filter */}
      <Section background="white" className="py-8">
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          translations={categoryTranslations}
          allLabel={t('categories.all')}
        />
      </Section>

      {/* Articles Grid */}
      <Section background="white" className="pt-0">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            {activeCategory === 'all' && !searchQuery
              ? t('listing.latestArticles')
              : t('listing.allPosts')}
          </h2>
        </div>

        {gridArticles.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            key={`${activeCategory}-${searchQuery}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {gridArticles.map((article, index) => (
              <ArticleCard
                key={article.slug}
                article={article}
                translations={{
                  readMore: t('listing.readMore'),
                  minRead: t('listing.minRead'),
                }}
                categoryLabel={t(
                  `categories.${categoryTranslationKeys[article.category]}`
                )}
                index={index}
              />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">{t('listing.noPostsFound')}</p>
          </div>
        )}
      </Section>

      {/* Popular Articles Section */}
      {popularArticles.length > 0 && activeCategory === 'all' && !searchQuery && (
        <Section background="gray">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-8">
            {t('listing.popularArticles')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {popularArticles.map((article, index) => (
              <ArticleCard
                key={article.slug}
                article={article}
                translations={{
                  readMore: t('listing.readMore'),
                  minRead: t('listing.minRead'),
                }}
                categoryLabel={t(
                  `categories.${categoryTranslationKeys[article.category]}`
                )}
                index={index}
              />
            ))}
          </div>
        </Section>
      )}

      {/* CTA Section */}
      <Section background="white">
        <div className="text-center max-w-3xl mx-auto">
          <Heading as="h2" size="3xl" centered>
            {t('cta.title')}
          </Heading>
          <p className="text-lg sm:text-xl text-gray-600 mb-8">
            {t('cta.description')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/get-in-touch" variant="primary" size="md">
              {t('cta.consultation')}
            </Button>
            <Button href="/presencia-digital" variant="secondary" size="md">
              {t('cta.website')}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
