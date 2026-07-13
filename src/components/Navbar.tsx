'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, memo } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';

// Helper function to get the vertical prefix from the current pathname
function getVerticalPrefix(pathname: string): string {
  const verticals = ['cr'];
  for (const vertical of verticals) {
    if (pathname.startsWith(`/${vertical}`)) {
      return `/${vertical}`;
    }
  }
  return '';
}

// Route-aware navigation helper functions
function logoHref(pathname: string): string {
  const prefix = getVerticalPrefix(pathname);
  return prefix || '/';
}

function solutionsHref(pathname: string): string {
  const prefix = getVerticalPrefix(pathname);
  return prefix ? `${prefix}/solutions` : '/solutions';
}

function companyHref(pathname: string): string {
  const prefix = getVerticalPrefix(pathname);
  // For CR route, use /mision instead of /company
  if (prefix === '/cr') {
    return '/cr/mision';
  }
  return prefix ? `${prefix}/company` : '/company';
}

function careersHref(pathname: string): string {
  const prefix = getVerticalPrefix(pathname);
  return prefix ? `${prefix}/careers` : '/careers';
}

function blogHref(pathname: string): string {
  const prefix = getVerticalPrefix(pathname);
  return prefix ? `${prefix}/blog` : '/blog';
}

function casosDeExitoHref(pathname: string): string {
  const prefix = getVerticalPrefix(pathname);
  return prefix ? `${prefix}/casos-de-exito` : '/casos-de-exito';
}

function researchHref(pathname: string): string {
  const prefix = getVerticalPrefix(pathname);
  return prefix ? `${prefix}/research` : '/research';
}

function testimonialsHref(pathname: string): string {
  const prefix = getVerticalPrefix(pathname);
  if (prefix === '/cr') {
    return '/cr#testimonios';
  }
  return '';
}

interface NavbarProps {
  hideNavLinks?: boolean;
}

/**
 * Navbar - Optimized navigation component
 *
 * Performance optimizations:
 * 1. Memoized with React.memo
 * 2. useCallback for event handlers
 * 3. Passive scroll listener
 * 4. Optimized re-render prevention
 */
const Navbar = memo(function Navbar({ hideNavLinks = false }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');

  // Optimized scroll handler with useCallback
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10);
  }, []);

  // Track scroll for enhanced navbar styling
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Memoized toggle handler
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  // Memoized close handler
  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  // Build nav links with dynamic hrefs based on current route context
  const isCRRoute = getVerticalPrefix(pathname) === '/cr';

  // CR-specific navigation: Soluciones, Empresa, Testimonios, Trabaja con nosotros
  const navLinks = isCRRoute
    ? [
        { label: 'Soluciones', href: solutionsHref(pathname) },
        { label: 'Empresa', href: companyHref(pathname) },
        { label: 'Testimonios', href: testimonialsHref(pathname) },
        { label: 'Trabaja con nosotros', href: careersHref(pathname) },
      ]
    : [
        { label: t('solutions'), href: solutionsHref(pathname) },
        { label: t('casosDeExito'), href: casosDeExitoHref(pathname) },
        { label: t('company'), href: companyHref(pathname) },
        { label: t('blog'), href: blogHref(pathname) },
        { label: t('careers'), href: careersHref(pathname) },
      ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-xl bg-white/90 shadow-sm border-b border-gray-100'
          : 'backdrop-blur-xl bg-white/80 border-b border-gray-200/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between items-center h-16 sm:h-18">
          {/* Logo - route-aware: links to vertical root when inside a vertical */}
          <Link href={logoHref(pathname)} className="flex items-center cursor-pointer">
            <motion.div className="h-9 sm:h-10 w-auto relative flex-shrink-0 overflow-hidden">
              <Image
                src="/brand/logo-main.png"
                alt={tCommon('logoAlt')}
                width={140}
                height={36}
                className="object-contain h-full w-auto max-h-10"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {!hideNavLinks && navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative text-gray-600 hover:text-gray-900 transition-colors duration-200 text-[15px] font-medium group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1F5CFF] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            {/* Language Switcher - hidden for CR route */}
            {!isCRRoute && <LanguageSwitcher variant="compact" />}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            {!isCRRoute && <LanguageSwitcher variant="compact" />}
            <button
              onClick={toggleMobileMenu}
              className="p-2 -mr-2 rounded-xl hover:bg-gray-100 active:bg-gray-200 transition-colors"
              aria-label={mobileMenuOpen ? t('closeMenu') : t('openMenu')}
              aria-expanded={mobileMenuOpen}
            >
              <motion.div
                initial={false}
                animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
                )}
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 top-16 sm:top-18 bg-black/20 backdrop-blur-sm z-40"
              onClick={closeMobileMenu}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-xl relative z-50"
            >
              <div className="px-4 sm:px-6 py-6 space-y-1">
                {!hideNavLinks && navLinks.map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMobileMenu}
                      className="block text-gray-700 hover:text-[#1F5CFF] hover:bg-[#eff4ff] rounded-xl transition-all text-base font-medium py-3.5 px-4 active:scale-[0.98]"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
});

export default Navbar;
