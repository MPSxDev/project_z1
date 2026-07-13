'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

interface ArticleCTAProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

export default function ArticleCTA({
  title,
  description,
  buttonText,
  buttonHref,
}: ArticleCTAProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl bg-gray-50 border border-gray-100 p-8 sm:p-10 text-center"
    >
      <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
        {title}
      </h3>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        {description}
      </p>
      <Button href={buttonHref} variant="primary" size="md">
        {buttonText}
        <ArrowRight className="w-5 h-5" />
      </Button>
    </motion.div>
  );
}
