'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NewsletterCTAProps {
  title: string;
  description: string;
  placeholder: string;
  buttonText: string;
  successMessage: string;
  errorMessage: string;
  privacyText: string;
}

export default function NewsletterCTA({
  title,
  description,
  placeholder,
  buttonText,
  successMessage,
  errorMessage,
  privacyText,
}: NewsletterCTAProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    // Simulate API call - in production, this would be a real API endpoint
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For demo purposes, always succeed
    setStatus('success');
    setEmail('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl bg-gradient-to-br from-[#1F5CFF] to-[#1a4edb] p-8 sm:p-10 lg:p-12 text-white"
    >
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6">
          <Mail className="w-7 h-7" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-semibold mb-4">{title}</h3>
        <p className="text-white/80 text-lg mb-8">{description}</p>

        {status === 'success' ? (
          <div className="flex items-center justify-center gap-2 text-white bg-white/20 rounded-full py-4 px-6">
            <Check className="w-5 h-5" />
            <span className="font-medium">{successMessage}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholder}
                required
                className={cn(
                  'w-full px-5 py-4 rounded-full bg-white/10 border border-white/20',
                  'text-white placeholder:text-white/60',
                  'focus:outline-none focus:ring-2 focus:ring-white/50',
                  'transition-all'
                )}
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className={cn(
                'flex items-center justify-center gap-2 px-8 py-4 rounded-full',
                'bg-white text-[#1F5CFF] font-semibold',
                'hover:bg-white/90 transition-colors',
                'disabled:opacity-70 disabled:cursor-not-allowed'
              )}
            >
              {status === 'loading' ? (
                <span className="w-5 h-5 border-2 border-[#1F5CFF]/30 border-t-[#1F5CFF] rounded-full animate-spin" />
              ) : (
                <>
                  {buttonText}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {status === 'error' && (
          <div className="flex items-center justify-center gap-2 mt-4 text-red-200">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{errorMessage}</span>
          </div>
        )}

        <p className="mt-6 text-sm text-white/60">{privacyText}</p>
      </div>
    </motion.div>
  );
}
