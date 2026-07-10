'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CalendarCheck, Search, TrendingUp } from 'lucide-react';
import { useTranslations } from 'next-intl';

const BAR_HEIGHTS = [28, 42, 68, 100];

function ConsultasChartCard() {
  const t = useTranslations('presenciaDigital.hero.overlays.chart');
  const months = useTranslations('presenciaDigital.hero.overlays').raw('months') as string[];
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-[132px] sm:w-[142px] rounded-lg bg-white/93 backdrop-blur-sm border border-white/70 shadow-[0_4px_18px_-6px_rgba(31,92,255,0.28)] p-2.5 overflow-hidden"
    >
      <p className="text-[9px] font-semibold text-gray-900 leading-tight">{t('title')}</p>

      <div className="flex items-center justify-between mt-0.5 mb-2">
        <span className="text-[8px] text-gray-400">{t('period')}</span>
        <span className="text-[8px] font-semibold text-[#25D366] tabular-nums">{t('growth')}</span>
      </div>

      <div className="flex items-end justify-between gap-1.5 h-11 overflow-hidden">
        {BAR_HEIGHTS.map((height, index) => (
          <div key={months[index]} className="flex flex-col items-center gap-1 flex-1 h-full min-w-0">
            <div className="flex-1 w-full flex items-end overflow-hidden">
              <motion.div
                className="w-full rounded-[2px] bg-gradient-to-t from-[#1F5CFF] to-blue-400"
                initial={{ height: prefersReducedMotion ? `${height}%` : '0%' }}
                animate={{ height: `${height}%` }}
                transition={{
                  delay: prefersReducedMotion ? 0 : 0.55 + index * 0.1,
                  duration: prefersReducedMotion ? 0 : 0.65,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              />
            </div>
            <span className="text-[7px] text-gray-400 font-medium shrink-0">{months[index]}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function InquiryNotificationCarousel() {
  const notifications = useTranslations('presenciaDigital.hero.overlays').raw(
    'notifications',
  ) as string[];
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % notifications.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [notifications.length, prefersReducedMotion]);

  const activeNotification = notifications[activeIndex] ?? notifications[0];

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.55, duration: 0.5 }}
      className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3"
    >
      <div className="inline-flex items-center gap-2 rounded-lg bg-white/93 backdrop-blur-sm border border-white/70 shadow-[0_4px_18px_-6px_rgba(37,211,102,0.22)] px-3 py-2 min-w-[118px]">
        <span className="relative flex h-2 w-2 flex-shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-50" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#25D366]" />
        </span>
        <div className="min-w-[88px]">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeNotification}
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-[10px] sm:text-[11px] font-medium text-gray-800 whitespace-nowrap leading-snug"
            >
              {activeNotification}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function GoogleRankBadge() {
  const t = useTranslations('presenciaDigital.hero.overlays.google');

  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
      className="absolute bottom-12 right-2.5 sm:bottom-14 sm:right-3"
    >
      <div className="flex items-center gap-1.5 rounded-full bg-gray-900/88 backdrop-blur-sm text-white px-2.5 py-1 shadow-md border border-white/10">
        <Search className="w-2.5 h-2.5 text-blue-300 flex-shrink-0" aria-hidden="true" />
        <div>
          <p className="text-[8px] font-semibold leading-tight whitespace-nowrap">{t('rank')}</p>
          <p className="text-[7px] text-gray-400 leading-tight whitespace-nowrap">{t('keyword')}</p>
        </div>
      </div>
    </motion.div>
  );
}

function ResultBadge() {
  const t = useTranslations('presenciaDigital.hero.overlays.result');

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.85, duration: 0.5 }}
      className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 z-10"
    >
      <div className="flex items-center gap-2 bg-[#1F5CFF] text-white pl-2.5 pr-3 py-2 rounded-lg shadow-md">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white/15">
          <CalendarCheck className="w-3 h-3" aria-hidden="true" />
        </div>
        <div>
          <p className="text-[10px] font-semibold leading-tight whitespace-nowrap">{t('client')}</p>
          <p className="text-[8px] text-blue-100 flex items-center gap-0.5 leading-tight whitespace-nowrap">
            <TrendingUp className="w-2 h-2" aria-hidden="true" />
            {t('metric')}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function HeroResultBadge() {
  return <ResultBadge />;
}

export default function HeroMockupOverlays() {
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
      <InquiryNotificationCarousel />
      <ConsultasChartCard />
      <GoogleRankBadge />
    </div>
  );
}
