'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { FAQ as FAQType } from '@/lib/blog';

interface FAQProps {
  items: FAQType[];
  title: string;
}

export default function FAQ({ items, title }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!items || items.length === 0) return null;

  return (
    <section className="py-12 border-t border-gray-100" aria-labelledby="faq-title">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-[#eff4ff] flex items-center justify-center">
          <HelpCircle className="w-5 h-5 text-[#1F5CFF]" />
        </div>
        <h2 id="faq-title" className="text-2xl font-semibold text-gray-900">
          {title}
        </h2>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-100 overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className={cn(
                'w-full flex items-center justify-between p-5 text-left',
                'hover:bg-gray-50 transition-colors',
                openIndex === index && 'bg-gray-50'
              )}
              aria-expanded={openIndex === index}
            >
              <span className="font-medium text-gray-900 pr-4">{item.question}</span>
              <ChevronDown
                className={cn(
                  'w-5 h-5 text-gray-500 flex-shrink-0 transition-transform',
                  openIndex === index && 'rotate-180'
                )}
              />
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-5 pb-5 text-gray-600 leading-relaxed">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
