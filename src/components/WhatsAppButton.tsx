'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';
import { X } from 'lucide-react';

/**
 * WhatsAppButton - A premium, animated floating button for direct WhatsApp contact.
 * Features a localized tooltip prompt that appears after a delay, which can be dismissed.
 */
export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const locale = useLocale();
  const phoneNumber = '50670724236';

  // Localized messages and tooltips
  const message = locale === 'es'
    ? 'Hola, me interesa obtener información sobre sus servicios.'
    : 'Hello, I am interested in learning more about your services.';

  const tooltipText = locale === 'es'
    ? '¿Cómo podemos ayudarte?'
    : 'How can we help you?';

  const titleText = locale === 'es'
    ? 'Soporte Yieldge'
    : 'Yieldge Support';

  const linkText = locale === 'es'
    ? 'Escríbenos'
    : 'Chat now';

  const ariaLabel = locale === 'es'
    ? 'Contactar por WhatsApp'
    : 'Contact us on WhatsApp';

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    // Show tooltip after 4 seconds to catch user attention
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
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="pointer-events-auto bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl rounded-2xl p-4 max-w-[260px] relative flex flex-col gap-1.5"
          >
            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            
            <div className="pr-4">
              <p className="text-xs text-[#25D366] font-semibold tracking-wide uppercase">
                {titleText}
              </p>
              <p className="text-sm text-gray-800 dark:text-gray-100 font-medium leading-snug mt-0.5">
                {tooltipText}
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowTooltip(false)}
                className="mt-2.5 inline-flex items-center text-xs bg-[#25D366] text-white hover:bg-[#20ba5a] font-bold px-3 py-1.5 rounded-lg shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                {linkText}
              </a>
            </div>
            
            {/* Tooltip triangle indicator */}
            <div className="absolute right-6 -bottom-1.5 w-3.5 h-3.5 rotate-45 bg-white dark:bg-gray-900 border-r border-b border-gray-100 dark:border-gray-800" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20
        }}
        className="pointer-events-auto flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_4px_24px_rgba(37,211,102,0.45)] hover:bg-[#20ba5a] transition-colors relative group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366] dark:focus:ring-offset-gray-950"
        aria-label={ariaLabel}
      >
        {/* Glow pulsing ring behind the button */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping group-hover:animate-none group-hover:scale-110 transition-transform duration-300" />
        
        {/* WhatsApp SVG Icon */}
        <svg
          className="w-8 h-8 fill-current relative z-10"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.436.002 9.852-4.388 9.855-9.832.002-2.637-1.025-5.11-2.89-6.98-1.866-1.872-4.348-2.9-6.984-2.9-5.44 0-9.856 4.388-9.86 9.835-.001 1.957.512 3.864 1.488 5.56l-.969 3.537 3.636-.971zm10.102-7.477c-.365-.175-2.16-1.033-2.494-1.153-.333-.12-.576-.175-.818.175-.243.35-.937 1.153-1.149 1.385-.213.23-.426.26-.79.088-.365-.175-1.543-.549-2.94-1.764-1.086-.942-1.82-2.105-2.033-2.456-.213-.35-.023-.539.159-.713.164-.157.365-.41.549-.615.182-.204.243-.35.365-.583.12-.23.06-.437-.03-.612-.09-.175-.818-1.912-1.12-2.607-.294-.672-.594-.582-.818-.593-.212-.01-.456-.012-.7-.012-.243 0-.64.088-.973.437-.333.35-1.277 1.212-1.277 2.95 0 1.737 1.299 3.417 1.482 3.65.182.23 2.556 3.777 6.19 5.305.864.363 1.54.582 2.066.743.868.267 1.66.23 2.285.139.697-.101 2.16-.853 2.464-1.678.304-.825.304-1.533.213-1.678-.09-.146-.333-.23-.698-.405z" />
        </svg>
      </motion.a>
    </div>
  );
}
