'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MessageCircle } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import {
  PRESENCIA_DIGITAL_PHONE,
  PRESENCIA_DIGITAL_WHATSAPP_MESSAGE_EN,
  PRESENCIA_DIGITAL_WHATSAPP_MESSAGE_ES,
} from '@/lib/presencia-digital';
import {
  CRECIMIENTO_DIGITAL_PHONE,
  CRECIMIENTO_DIGITAL_WHATSAPP_MESSAGE_EN,
  CRECIMIENTO_DIGITAL_WHATSAPP_MESSAGE_ES,
} from '@/lib/crecimiento-digital';
import {
  CRECIMIENTO_DIGITAL_CL_PHONE,
  CRECIMIENTO_DIGITAL_CL_WHATSAPP_MESSAGE_EN,
  CRECIMIENTO_DIGITAL_CL_WHATSAPP_MESSAGE_ES,
  isCrecimientoDigitalClPath,
} from '@/lib/crecimiento-digital-cl';
import {
  CLINICAS_PHONE,
  CLINICAS_WHATSAPP_MESSAGE_EN,
  CLINICAS_WHATSAPP_MESSAGE_ES,
} from '@/lib/sistema-comercial-clinicas';

// Phone numbers for different paths

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
  const tCrecimiento = useTranslations('crecimientoDigital.hero');
  const tCrecimientoCl = useTranslations('crecimientoDigitalCl.hero');
  const tClinicas = useTranslations('sistemaComercialClinicas');
  const locale = useLocale();
  const pathname = usePathname();

  const isChileLanding = isCrecimientoDigitalClPath(pathname);
  const isCrecimientoDigital = pathname.includes('/crecimiento-digital');
  const isPresenciaDigital = pathname.includes('/presencia-digital');
  const isClinicasLanding = pathname.includes('/sistema-comercial-clinicas');

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

  const effectiveWhatsappNumber =
    whatsappNumber ||
    (isChileLanding
      ? CRECIMIENTO_DIGITAL_CL_PHONE
      : isCrecimientoDigital
        ? CRECIMIENTO_DIGITAL_PHONE
        : isClinicasLanding
          ? CLINICAS_PHONE
          : isPresenciaDigital
            ? PRESENCIA_DIGITAL_PHONE
            : null);

  const message = isChileLanding
    ? locale === 'es'
      ? CRECIMIENTO_DIGITAL_CL_WHATSAPP_MESSAGE_ES
      : CRECIMIENTO_DIGITAL_CL_WHATSAPP_MESSAGE_EN
    : isCrecimientoDigital
      ? locale === 'es'
        ? CRECIMIENTO_DIGITAL_WHATSAPP_MESSAGE_ES
        : CRECIMIENTO_DIGITAL_WHATSAPP_MESSAGE_EN
      : isClinicasLanding
        ? locale === 'es'
          ? CLINICAS_WHATSAPP_MESSAGE_ES
          : CLINICAS_WHATSAPP_MESSAGE_EN
        : isPresenciaDigital
          ? locale === 'es'
            ? PRESENCIA_DIGITAL_WHATSAPP_MESSAGE_ES
            : PRESENCIA_DIGITAL_WHATSAPP_MESSAGE_EN
          : locale === 'es'
            ? 'Hola, me interesa obtener información sobre sus servicios de presencia digital.'
            : 'Hello, I am interested in learning more about your digital presence services.';

  const href = effectiveWhatsappNumber
    ? `https://wa.me/${effectiveWhatsappNumber}?text=${encodeURIComponent(message)}`
    : 'mailto:contacto@yieldge.com';

  const Icon = effectiveWhatsappNumber ? MessageCircle : Calendar;
  const buttonText =
    ctaText ||
    (isChileLanding
      ? tCrecimientoCl('cta')
      : isCrecimientoDigital
        ? tCrecimiento('cta')
        : isClinicasLanding
          ? tClinicas('stickyCta')
          : isPresenciaDigital
            ? tPresencia('cta')
            : t('primaryCta'));

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
