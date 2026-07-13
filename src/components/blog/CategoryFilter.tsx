'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { BlogCategory } from '@/lib/blog';
import { categoryConfig, categoryTranslationKeys } from '@/lib/blog';

interface CategoryFilterProps {
  categories: BlogCategory[];
  activeCategory: BlogCategory | 'all';
  onCategoryChange: (category: BlogCategory | 'all') => void;
  translations: Record<string, string>;
  allLabel: string;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
  translations,
  allLabel,
}: CategoryFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-wrap justify-center gap-2 sm:gap-3"
    >
      <button
        onClick={() => onCategoryChange('all')}
        className={cn(
          'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
          activeCategory === 'all'
            ? 'bg-[#1F5CFF] text-white shadow-lg shadow-[#1F5CFF]/20'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        )}
      >
        {allLabel}
      </button>
      {categories.map((category) => {
        const config = categoryConfig[category];
        const translationKey = categoryTranslationKeys[category];

        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
              activeCategory === category
                ? 'bg-[#1F5CFF] text-white shadow-lg shadow-[#1F5CFF]/20'
                : cn('bg-gray-100 text-gray-700 hover:bg-gray-200', config.color)
            )}
          >
            {translations[translationKey]}
          </button>
        );
      })}
    </motion.div>
  );
}
