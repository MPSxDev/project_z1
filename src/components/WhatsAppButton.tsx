'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';
import { X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

/**
 * WhatsAppButton - Premium floating WhatsApp button
 */
export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const locale = useLocale();

  const phoneNumber = '50670724236';

  const message =
    locale === 'es'
      ? 'Hola, me interesa obtener información sobre sus servicios.'
      : 'Hello, I am interested in learning more about your services.';

  const tooltipText =
    locale === 'es'
      ? '¿Cómo podemos ayudarte?'
      : 'How can we help you?';

  const titleText =
    locale === 'es'
      ? 'Soporte Yieldge'
      : 'Yieldge Support';

  const linkText =
    locale === 'es'
      ? 'Escríbenos'
      : 'Chat now';

  const ariaLabel =
    locale === 'es'
      ? 'Contactar por WhatsApp'
      : 'Contact us on WhatsApp';

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  useEffect(() => {
    const timer = setTimeout(() => {
      const dismissed = localStorage.getItem('whatsapp-tooltip-dismissed');

      if (!dismissed) {
        setShowTooltip(true);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setShowTooltip(false);

    localStorage.setItem('whatsapp-tooltip-dismissed', 'true');
  };

  return (
    <div className="fixed bottom-24 md:bottom-8 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none select-none">

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-auto relative max-w-[260px] rounded-2xl border border-gray-200 bg-white p-4 shadow-xl dark:border-gray-800 dark:bg-gray-900"
          >
            <button
              onClick={handleDismiss}
              className="absolute right-3 top-3 text-gray-400 transition hover:text-gray-600 dark:hover:text-white"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="pr-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#25D366]">
                {titleText}
              </p>

              <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                {tooltipText}
              </p>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowTooltip(false)}
                className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#20ba5a]"
              >
                <FaWhatsapp className="h-4 w-4" />
                {linkText}
              </a>
            </div>

            <div className="absolute bottom-2 right-5 h-3 w-3 rotate-45 border-b border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{
          scale: 1.08,
        }}
        whileTap={{
          scale: 0.94,
        }}
        transition={{
          type: 'spring',
          stiffness: 280,
          damping: 18,
        }}
        className="pointer-events-auto relative flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] shadow-[0_12px_35px_rgba(37,211,102,0.35)] transition-all duration-300 hover:bg-[#20ba5a] hover:shadow-[0_18px_45px_rgba(37,211,102,0.45)] focus:outline-none"
      >
        {/* Pulse animation */}
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20" />

        {/* WhatsApp Icon */}
        <FaWhatsapp className="relative z-10 h-8 w-8 text-white" />
      </motion.a>
    </div>
  );
}