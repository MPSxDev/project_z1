'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';
import { X } from 'lucide-react';

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
                <WhatsAppIcon className="h-4 w-4" />
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
        <WhatsAppIcon className="relative z-10 h-8 w-8 text-white" />
      </motion.a>
    </div>
  );
}