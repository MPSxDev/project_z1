'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';
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

// CTA section IDs to detect
const CTA_SECTION_IDS = ['contact', 'contact-form'];

// Official WhatsApp logo SVG component
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

// Phone numbers for different paths
const DEFAULT_PHONE = '50670724236';

interface WhatsAppButtonProps {
  phoneNumber?: string;
}

/**
 * WhatsAppButton - Floating WhatsApp button
 * Hides when final CTA section is visible
 */
export default function WhatsAppButton({ phoneNumber: customPhoneNumber }: WhatsAppButtonProps = {}) {
  const locale = useLocale();
  const pathname = usePathname();
  const [isCtaVisible, setIsCtaVisible] = useState(false);

  // Detect when CTA section is visible
  useEffect(() => {
    const checkCtaVisibility = () => {
      const anyCtaVisible = CTA_SECTION_IDS.some((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      });
      setIsCtaVisible(anyCtaVisible);
    };

    window.addEventListener('scroll', checkCtaVisibility, { passive: true });
    checkCtaVisibility();

    return () => {
      window.removeEventListener('scroll', checkCtaVisibility);
    };
  }, []);

  // Use custom phone for landing pages
  const isChileLanding = isCrecimientoDigitalClPath(pathname);
  const isCrecimientoDigital = pathname.includes('/crecimiento-digital');
  const isPresenciaDigital = pathname.includes('/presencia-digital');
  const isClinicasLanding = pathname.includes('/sistema-comercial-clinicas');
  const phoneNumber =
    customPhoneNumber ||
    (isChileLanding
      ? CRECIMIENTO_DIGITAL_CL_PHONE
      : isCrecimientoDigital
        ? CRECIMIENTO_DIGITAL_PHONE
        : isClinicasLanding
          ? CLINICAS_PHONE
          : isPresenciaDigital
            ? PRESENCIA_DIGITAL_PHONE
            : DEFAULT_PHONE);

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
            ? 'Hola, me interesa obtener información sobre sus servicios.'
            : 'Hello, I am interested in learning more about your services.';

  const ariaLabel =
    locale === 'es'
      ? 'Contactar por WhatsApp'
      : 'Contact us on WhatsApp';

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <AnimatePresence>
      {!isCtaVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{
            type: 'spring',
            stiffness: 280,
            damping: 18,
          }}
          className="fixed bottom-24 md:bottom-8 right-6 z-50"
        >
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaLabel}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] shadow-[0_12px_35px_rgba(37,211,102,0.35)] transition-all duration-300 hover:bg-[#20ba5a] hover:shadow-[0_18px_45px_rgba(37,211,102,0.45)] focus:outline-none"
          >
            {/* Pulse animation */}
            <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20" />

            {/* WhatsApp Icon */}
            <WhatsAppIcon className="relative z-10 h-8 w-8 text-white" />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
