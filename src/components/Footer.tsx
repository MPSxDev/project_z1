'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import FooterBackToTop from './FooterBackToTop';

interface FooterProps {
  description?: string;
  minimal?: boolean;
  ctaText?: string;
  ctaLink?: string;
}

/**
 * Footer - Memoized footer component
 * Uses React.memo to prevent unnecessary re-renders
 */
const Footer = memo(function Footer({ description, minimal = false, ctaText, ctaLink }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const t = useTranslations('footer');
  const tLinks = useTranslations('solutionsLinks');
  const tCommon = useTranslations('common');

  // Minimal footer for landing pages - just a CTA button
  if (minimal && ctaText && ctaLink) {
    return (
      <footer className="relative bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8">
          <div className="flex flex-col items-center gap-4">
            <motion.a
              href={ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold hover:bg-[#1da851] transition-all text-lg shadow-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {ctaText}
            </motion.a>
            <p className="text-xs text-gray-500">
              {t('copyright', { year: currentYear })}
            </p>
          </div>
        </div>
      </footer>
    );
  }

  const solutionsLinks = [
    { text: t('aiAutomation'), href: '/#services' },
    { text: tLinks('cloud'), href: '/#services' },
    { text: t('dataIntegration'), href: '/#services' },
    { text: t('customPlatforms'), href: '/#services' },
  ];

  const legalLinks = [
    { text: t('privacyPolicy'), href: '/privacy-policy' },
    { text: t('termsAndConditions'), href: '/terms' },
  ];

  
  return (
    <footer className="relative bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-10 lg:py-12">
        {/* Main Content */}
        <div className={minimal ? "mb-6 sm:mb-8" : "grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 mb-6 sm:mb-8"}>
          {/* Brand - Full width on mobile */}
          <div className={minimal ? "" : "col-span-2 md:col-span-1"}>
            <div className="mb-4 sm:mb-5">
              <div className="h-8 sm:h-10 w-auto max-w-[120px] sm:max-w-[160px] overflow-hidden">
                <Image
                  src="/brand/logo-main.png"
                  alt={tCommon('logoAlt')}
                  width={120}
                  height={32}
                  className="object-contain h-full w-auto"
                  loading="lazy"
                />
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4 sm:mb-5 text-xs sm:text-sm max-w-xs">
              {description || t('description')}
            </p>

            </div>

          {!minimal && (
            <>
              {/* Solutions Links */}
              <div className="col-span-1">
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wide mb-3 sm:mb-4">
                  {t('solutions')}
                </h3>
                <ul className="space-y-1.5 sm:space-y-2">
                  {solutionsLinks.map((link) => (
                    <li key={link.text}>
                      <Link
                        href={link.href}
                        className="text-gray-600 hover:text-[#1F5CFF] transition-colors text-xs sm:text-sm block py-0.5"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal Links - Shown on mobile only */}
              <div className="col-span-1 md:hidden">
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
                  {t('legal')}
                </h3>
                <ul className="space-y-2">
                  {legalLinks.map((link) => (
                    <li key={link.text}>
                      <Link
                        href={link.href}
                        className="text-gray-600 hover:text-[#1F5CFF] transition-colors text-xs block py-0.5"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact & Legal - Hidden on small mobile, visible on md+ */}
              <div className="hidden md:block col-span-1">
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wide mb-3 sm:mb-4">
                  {t('contact')}
                </h3>
                <p className="text-gray-600 mb-3 sm:mb-4 leading-relaxed text-xs sm:text-sm">
                  {t('readyToStreamline')}
                </p>
                <a
                  href="#contact-form"
                  className="inline-block px-5 py-2 sm:px-6 sm:py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200 text-xs sm:text-sm mb-4 sm:mb-5"
                >
                  {t('scheduleConsultation')}
                </a>

                {/* Legal Links */}
                <div className="mt-4 sm:mt-5">
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wide mb-3 sm:mb-4">
                    {t('legal')}
                  </h3>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {legalLinks.map((link) => (
                      <li key={link.text}>
                        <Link
                          href={link.href}
                          className="text-gray-600 hover:text-gray-900 transition-colors text-xs sm:text-sm block py-0.5"
                        >
                          {link.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact Info */}
                <div className="mt-4 sm:mt-5 space-y-1.5 text-xs sm:text-sm text-gray-600">
                  <p>
                    <strong>{t('email')}:</strong>{' '}
                    <a href="mailto:info@yieldge.com" className="hover:text-gray-900">
                      info@yieldge.com
                    </a>
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Mobile CTA - Only visible on small screens */}
        {!minimal && (
          <div className="md:hidden mb-6 text-center">
            <p className="text-gray-600 mb-3 text-sm">{t('readyToStreamline')}</p>
            <a
              href="#contact-form"
              className="inline-block w-full px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200 text-sm"
            >
              {t('scheduleConsultation')}
            </a>
            <div className="mt-3 text-xs text-gray-600">
              <a href="mailto:info@yieldge.com" className="hover:text-gray-900">
                info@yieldge.com
              </a>
            </div>
          </div>
        )}

        {/* Bottom Bar */}
        <div className="pt-4 sm:pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
            {t('copyright', { year: currentYear })}
          </p>

          {/* Back to top - Client component */}
          <FooterBackToTop />
        </div>
      </div>
    </footer>
  );
});

export default Footer;
