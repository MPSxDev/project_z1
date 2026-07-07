'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MessageCircle } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';

// Phone numbers for different paths
const PRESENCIA_DIGITAL_PHONE = '50683335408';

interface StickyCTAProps {
  whatsappNumber?: string;
  ctaText?: string;
}

/**
 * StickyCTA - Optimized sticky call-to-action component
 *
 * Performance optimizations:
 * 1. Memoized with React.memo
 * 2. useCallback for scroll handler
 * 3. Passive scroll listener
 * 4. RequestAnimationFrame for scroll updates (debounced)
 */
const StickyCTA = memo(function StickyCTA({ whatsappNumber, ctaText }: StickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations('homepage.hero');
  const tPresencia = useTranslations('presenciaDigital.hero');
  const locale = useLocale();
  const pathname = usePathname();

  // Check if on presencia-digital path
  const isPresenciaDigital = pathname.includes('/presencia-digital');

  // Optimized scroll handler with requestAnimationFrame
  const handleScroll = useCallback(() => {
    // Using requestAnimationFrame for smoother updates
    requestAnimationFrame(() => {
      setIsVisible(window.scrollY > 600);
    });
  }, []);

  useEffect(() => {
    // Passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Check initial position
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Use presencia-digital phone number on that path
  const effectiveWhatsappNumber = whatsappNumber || (isPresenciaDigital ? PRESENCIA_DIGITAL_PHONE : null);

  const message = locale === 'es'
    ? 'Hola, me interesa obtener información sobre sus servicios de presencia digital.'
    : 'Hello, I am interested in learning more about your digital presence services.';

  const href = effectiveWhatsappNumber
    ? `https://wa.me/${effectiveWhatsappNumber}?text=${encodeURIComponent(message)}`
    : 'mailto:contacto@yieldge.com';

  const Icon = effectiveWhatsappNumber ? MessageCircle : Calendar;
  const buttonText = ctaText || (isPresenciaDigital ? tPresencia('cta') : t('primaryCta'));

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-2xl md:hidden safe-area-inset-bottom"
        >
          <a
            href={href}
            target={effectiveWhatsappNumber ? '_blank' : undefined}
            rel={effectiveWhatsappNumber ? 'noopener noreferrer' : undefined}
            aria-label="Schedule a free consultation"
            className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-[#1F5CFF] text-white font-bold rounded-full hover:bg-[#1a4edb] transition-all shadow-lg active:scale-[0.98]"
          >
            <Icon className="w-5 h-5" />
            {buttonText}
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default StickyCTA;
