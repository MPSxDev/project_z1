'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Clock, User } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import type { ArticleCard as ArticleCardType, BlogCategory } from '@/lib/blog';
import { categoryConfig } from '@/lib/blog';

interface ArticleCardProps {
  article: ArticleCardType;
  translations: {
    readMore: string;
    minRead: string;
  };
  categoryLabel: string;
  index?: number;
  variant?: 'default' | 'compact';
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function ArticleCard({
  article,
  translations,
  categoryLabel,
  index = 0,
  variant = 'default',
}: ArticleCardProps) {
  const categoryStyle = categoryConfig[article.category];

  if (variant === 'compact') {
    return (
      <motion.article
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: index * 0.05 }}
        className="group"
      >
        <Link href={`/blog/${article.slug}`} className="block">
          <div className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="flex-1 min-w-0">
              <span
                className={cn(
                  'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mb-2',
                  categoryStyle.color
                )}
              >
                {categoryLabel}
              </span>
              <h3 className="text-base font-medium text-gray-900 group-hover:text-[#1F5CFF] transition-colors line-clamp-2">
                {article.title}
              </h3>
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>{article.readingTime} {translations.minRead}</span>
              </div>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  return (
    <motion.article
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.1 }}
      className="group h-full"
    >
      <Link href={`/blog/${article.slug}`} className="block h-full">
        <div
          className={cn(
            'relative rounded-2xl transition-all duration-300 h-full',
            'bg-white border border-gray-100 hover:border-[#dbe6ff]',
            'hover:shadow-xl hover:shadow-[#1F5CFF]/5',
            'p-6 sm:p-8 flex flex-col'
          )}
        >
          {/* Category Badge */}
          <div className="mb-4">
            <span
              className={cn(
                'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
                categoryStyle.color
              )}
            >
              {categoryLabel}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 leading-tight group-hover:text-[#1F5CFF] transition-colors line-clamp-2">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-base text-gray-600 leading-relaxed mb-6 flex-grow line-clamp-3">
            {article.excerpt}
          </p>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {article.author.name}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {article.readingTime} {translations.minRead}
            </span>
          </div>

          {/* Read More Link */}
          <div className="flex items-center gap-2 text-[#1F5CFF] font-medium group-hover:gap-3 transition-all">
            {translations.readMore}
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
