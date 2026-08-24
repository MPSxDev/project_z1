'use client';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { PRIVATE_AI_SECTIONS } from '@/lib/ia-privada';
import { PrimaryCta } from './shared';

interface NavItem {
  id: string;
  label: string;
  href: string;
}

const IaPrivadaNavbar = memo(function IaPrivadaNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations('iaPrivada.navbar');
  const tCommon = useTranslations('common');

  const navItems: NavItem[] = useMemo(
    () => [
      { id: PRIVATE_AI_SECTIONS.howItWorks, label: t('howItWorks'), href: `#${PRIVATE_AI_SECTIONS.howItWorks}` },
      { id: PRIVATE_AI_SECTIONS.capabilities, label: t('capabilities'), href: `#${PRIVATE_AI_SECTIONS.capabilities}` },
      { id: PRIVATE_AI_SECTIONS.packages, label: t('packages'), href: `#${PRIVATE_AI_SECTIONS.packages}` },
      { id: PRIVATE_AI_SECTIONS.faq, label: t('faq'), href: `#${PRIVATE_AI_SECTIONS.faq}` },
    ],
    [t]
  );

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        scrolled
          ? 'border-b border-white/10 bg-[#05070A]/90 backdrop-blur-xl'
          : 'border-b border-transparent bg-[#05070A]/40 backdrop-blur-md'
      }`}
      role="navigation"
      aria-label="Private AI"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-18 sm:px-6 lg:px-12">
        <Link href="/" className="flex items-center">
          <Image
            src="/brand/logo-main.png"
            alt={tCommon('logoAlt')}
            width={100}
            height={26}
            className="h-5 w-auto brightness-0 invert sm:h-6"
            priority
          />
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="text-sm font-medium text-white/65 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <LanguageSwitcher />
          <PrimaryCta className="px-5 py-2.5 text-sm">{t('cta')}</PrimaryCta>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="rounded-lg p-2 text-white/80 hover:bg-white/10"
            aria-label={mobileMenuOpen ? t('closeMenu') : t('openMenu')}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/10 bg-[#05070A] lg:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="block px-3 py-3 text-base font-medium text-white/80"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-3">
                <PrimaryCta className="w-full">{t('cta')}</PrimaryCta>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.nav>
  );
});

export default IaPrivadaNavbar;
