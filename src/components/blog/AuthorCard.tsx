'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { User } from 'lucide-react';
import type { Author } from '@/lib/blog';

interface AuthorCardProps {
  author: Author;
  label: string;
}

export default function AuthorCard({ author, label }: AuthorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-4 p-5 rounded-xl bg-gray-50 border border-gray-100"
    >
      {author.image ? (
        <Image
          src={author.image}
          alt={author.name}
          width={56}
          height={56}
          className="rounded-full object-cover"
        />
      ) : (
        <div className="w-14 h-14 rounded-full bg-[#eff4ff] flex items-center justify-center">
          <User className="w-6 h-6 text-[#1F5CFF]" />
        </div>
      )}
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</p>
        <p className="font-semibold text-gray-900">{author.name}</p>
        <p className="text-sm text-gray-600">{author.role}</p>
      </div>
    </motion.div>
  );
}
