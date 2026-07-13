'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { List } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TableOfContentsItem } from '@/lib/blog';

interface TableOfContentsProps {
  headings: TableOfContentsItem[];
  title: string;
}

export default function TableOfContents({ headings, title }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0% -80% 0%' }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-24 p-6 rounded-2xl bg-gray-50 border border-gray-100"
      aria-label="Table of contents"
    >
      <div className="flex items-center gap-2 mb-4 text-gray-900 font-semibold">
        <List className="w-5 h-5" />
        <span>{title}</span>
      </div>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id}>
            <button
              onClick={() => scrollToHeading(heading.id)}
              className={cn(
                'text-left w-full text-sm transition-colors hover:text-[#1F5CFF]',
                heading.level === 3 && 'pl-4',
                activeId === heading.id
                  ? 'text-[#1F5CFF] font-medium'
                  : 'text-gray-600'
              )}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
