'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { getCrecimientoDigitalWhatsAppUrl } from '@/lib/crecimiento-digital';

interface NavItem {
  id: string;
  label: string;
  href: string;
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const CrecimientoDigitalNavbar = memo(function CrecimientoDigitalNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const t = useTranslations('crecimientoDigital.navbar');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  const navItems: NavItem[] = useMemo(() => [
    { id: 'como-atraemos-pacientes', label: t('howWeAttract'), href: '#como-atraemos-pacientes' },
    { id: 'posicionamiento-google', label: t('googlePositioning'), href: '#posicionamiento-google' },
    { id: 'sistema-digital', label: t('digitalSystem'), href: '#sistema-digital' },
    { id: 'resultados', label: t('results'), href: '#resultados' },
  ], [t]);

  // Scroll handler
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10);

    // Detect active section
    const sections = navItems.map(item => document.getElementById(item.id));
    const scrollPosition = window.scrollY + 100;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (section && section.offsetTop <= scrollPosition) {
        setActiveSection(navItems[i].id);
        return;
      }
    }
    setActiveSection('');
  }, [navItems]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
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

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: 'smooth',
      });
    }
    closeMobileMenu();
  }, [closeMobileMenu]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-xl bg-white/95 shadow-sm border-b border-gray-100'
          : 'backdrop-blur-xl bg-white/90 border-b border-gray-200/50'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between items-center h-16 sm:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center cursor-pointer">
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
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative text-[15px] font-medium transition-colors duration-200 group ${
                  activeSection === item.id
                    ? 'text-[#1F5CFF]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                aria-current={activeSection === item.id ? 'true' : undefined}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-[#1F5CFF] transition-all duration-300 ${
                    activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            ))}

            {/* CTA Button */}
            <a
              href={getCrecimientoDigitalWhatsAppUrl(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-white font-semibold text-sm rounded-lg hover:bg-[#20bd5a] transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <WhatsAppIcon className="w-4 h-4" />
              {t('cta')}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={toggleMobileMenu}
              className="p-2 -mr-2 rounded-xl hover:bg-gray-100 active:bg-gray-200 transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
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
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`block rounded-xl transition-all text-base font-medium py-3.5 px-4 active:scale-[0.98] ${
                        activeSection === item.id
                          ? 'text-[#1F5CFF] bg-[#eff4ff]'
                          : 'text-gray-700 hover:text-[#1F5CFF] hover:bg-[#eff4ff]'
                      }`}
                    >
                      {item.label}
                    </a>
                  </motion.div>
                ))}

                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.08 }}
                  className="pt-4"
                >
                  <a
                    href={getCrecimientoDigitalWhatsAppUrl(locale)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobileMenu}
                    className="flex items-center justify-center gap-2 w-full px-5 py-4 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#20bd5a] transition-all duration-300 shadow-sm"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                    {t('cta')}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
});

export default CrecimientoDigitalNavbar;
