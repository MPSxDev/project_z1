'use client';

import { useState, useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';
import { locales, LOCALE_COOKIE, type Locale } from '@/i18n/config';
import { getPrivateAiPath, isPrivateAiPath } from '@/lib/ia-privada';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'default' | 'compact' | 'minimal';
}

const localeLabels: Record<Locale, { short: string; full: string }> = {
  en: { short: 'EN', full: 'English' },
  es: { short: 'ES', full: 'Español' },
};

export default function LanguageSwitcher({
  className = '',
}: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const [isNavigating, setIsNavigating] = useState(false);
  const [isCRRoute, setIsCRRoute] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Check if we're on a CR route (always Spanish, no language switch needed)
  useEffect(() => {
    const path = window.location.pathname;
    setIsCRRoute(path.startsWith('/cr') || path.startsWith('/en/cr'));
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Don't show language switcher on CR routes (always Spanish)
  if (isCRRoute) {
    return null;
  }

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale || isNavigating) return;

    setIsNavigating(true);
    setIsOpen(false);

    const currentFullPath = window.location.pathname;
    let newPath: string;

    if (isPrivateAiPath(currentFullPath)) {
      newPath =
        newLocale === 'es'
          ? getPrivateAiPath('es')
          : `/en${getPrivateAiPath('en')}`;
    } else {
      let cleanPath = currentFullPath;

      if (cleanPath.startsWith('/en/')) {
        cleanPath = cleanPath.substring(3);
      } else if (cleanPath === '/en') {
        cleanPath = '/';
      }

      newPath =
        newLocale === 'es'
          ? cleanPath || '/'
          : `/en${cleanPath === '/' ? '' : cleanPath}`;
    }

    document.cookie = `${LOCALE_COOKIE}=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    window.location.href = newPath;
  };

  const isLoading = isNavigating;
  const otherLocales = locales.filter((loc) => loc !== locale);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Current language button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        whileHover={isLoading ? {} : { scale: 1.02 }}
        whileTap={isLoading ? {} : { scale: 0.98 }}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-semibold text-gray-700">
          {localeLabels[locale].short}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </motion.button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 min-w-[100px]"
          >
            {/* Current locale */}
            <div className="px-4 py-2 bg-[#d4ffd4] border-b border-gray-100">
              <span className="text-sm font-semibold text-gray-800">
                {localeLabels[locale].short}
              </span>
              <span className="text-xs text-gray-600 ml-2">
                {localeLabels[locale].full}
              </span>
            </div>

            {/* Other locales */}
            {otherLocales.map((loc) => (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                disabled={isLoading}
                className="w-full px-4 py-2 hover:bg-gray-50 transition-colors disabled:opacity-50 text-left flex items-center gap-2"
              >
                <span className="text-sm font-semibold text-gray-700">
                  {localeLabels[loc].short}
                </span>
                <span className="text-xs text-gray-500">
                  {localeLabels[loc].full}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
