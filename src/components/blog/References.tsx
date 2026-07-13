'use client';

import { motion } from 'framer-motion';
import { BookOpen, ExternalLink } from 'lucide-react';
import type { Reference } from '@/lib/blog';

interface ReferencesProps {
  items: Reference[];
  title: string;
}

export default function References({ items, title }: ReferencesProps) {
  if (!items || items.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-8 border-t border-gray-100"
      aria-labelledby="references-title"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#eff4ff] flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-[#1F5CFF]" />
        </div>
        <h2 id="references-title" className="text-xl font-semibold text-gray-900">
          {title}
        </h2>
      </div>

      <ol className="space-y-3 list-decimal list-inside">
        {items.map((ref, index) => (
          <li key={index} className="text-gray-600">
            <span className="font-medium text-gray-900">{ref.title}</span>
            {ref.author && <span className="text-gray-500"> - {ref.author}</span>}
            {ref.url && (
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 ml-2 text-[#1F5CFF] hover:underline"
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </li>
        ))}
      </ol>
    </motion.section>
  );
}
