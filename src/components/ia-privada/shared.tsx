'use client';

import { IBM_Plex_Mono } from 'next/font/google';
import { ArrowRight } from 'lucide-react';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import {
  getPrivateAiWhatsAppUrl,
  type PrivateAiIntent,
} from '@/lib/ia-privada';

export const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-private-ai-mono',
});

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

export function MonoLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        plexMono.className,
        'text-[11px] font-medium uppercase tracking-[0.22em]',
        className
      )}
    >
      {children}
    </span>
  );
}

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#7EA0FF]">
      {children}
    </p>
  );
}

export function PrimaryCta({
  children,
  intent = 'assessment',
  className,
  variant = 'solid',
}: {
  children: React.ReactNode;
  intent?: PrivateAiIntent;
  className?: string;
  variant?: 'solid' | 'ghost' | 'light';
}) {
  const locale = useLocale();

  return (
    <a
      href={getPrivateAiWhatsAppUrl(locale, intent)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group inline-flex min-h-12 items-center justify-center gap-2.5 px-7 py-3.5 text-[15px] font-semibold transition-colors duration-300',
        variant === 'solid' &&
          'bg-[#1F5CFF] text-white hover:bg-[#4d7aff]',
        variant === 'ghost' &&
          'border border-white/20 bg-transparent text-white hover:border-white/40 hover:bg-white/5',
        variant === 'light' &&
          'bg-white text-[#05070A] hover:bg-[#E8EEFF]',
        className
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
}
