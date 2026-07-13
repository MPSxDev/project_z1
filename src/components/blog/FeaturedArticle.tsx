'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Clock, User, Star } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import type { ArticleCard } from '@/lib/blog';
import { categoryConfig } from '@/lib/blog';

interface FeaturedArticleProps {
  article: ArticleCard;
  translations: {
    featured: string;
    readMore: string;
    minRead: string;
  };
  categoryLabel: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function FeaturedArticle({
  article,
  translations,
  categoryLabel,
}: FeaturedArticleProps) {
  const categoryStyle = categoryConfig[article.category];

  return (
    <motion.article
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="group"
    >
      <Link href={`/blog/${article.slug}`} className="block">
        <div
          className={cn(
            'relative rounded-2xl transition-all duration-300 overflow-hidden',
            'bg-gradient-to-br from-[#1F5CFF]/5 to-[#eff4ff]',
            'border border-[#dbe6ff] hover:border-[#1F5CFF]/30',
            'hover:shadow-2xl hover:shadow-[#1F5CFF]/10'
          )}
        >
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Content */}
            <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
              {/* Featured Badge */}
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#1F5CFF] text-white">
                  <Star className="w-3 h-3" />
                  {translations.featured}
                </span>
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
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-4 leading-tight group-hover:text-[#1F5CFF] transition-colors">
                {article.title}
              </h2>

              {/* Excerpt */}
              <p className="text-lg text-gray-600 leading-relaxed mb-6 line-clamp-3">
                {article.excerpt}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  {article.author.name}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {article.readingTime} {translations.minRead}
                </span>
              </div>

              {/* CTA */}
              <div className="inline-flex items-center gap-2 text-[#1F5CFF] font-semibold text-lg group-hover:gap-4 transition-all">
                {translations.readMore}
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>

            {/* Image */}
            {article.featuredImage && (
              <div className="relative h-64 lg:h-auto lg:min-h-[400px]">
                <Image
                  src={article.featuredImage}
                  alt={article.featuredImageAlt || article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#eff4ff] via-transparent to-transparent lg:from-transparent" />
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
