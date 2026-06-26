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
        className="pointer-events-auto flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-[#25D366] hover:text-[#20ba5a] rounded-full shadow-[0_4px_24px_rgba(37,211,102,0.45)] transition-colors relative group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366] dark:focus:ring-offset-gray-950"
        aria-label={ariaLabel}
      >
        {/* Glow pulsing ring behind the button */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping group-hover:animate-none group-hover:scale-110 transition-transform duration-300" />
        
        {/* WhatsApp SVG Icon */}
        <svg
          className="w-9 h-9 relative z-10"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* White speech bubble background */}
          <path
            fill="white"
            d="M12.004 2c-5.5 0-9.98 4.48-9.98 9.98 0 1.76.46 3.47 1.33 4.98L2 22l5.25-1.38c1.47.8 3.12 1.22 4.75 1.22 5.5 0 9.98-4.48 9.98-9.98C21.98 6.48 17.5 2 12.004 2z"
          />
          {/* Green WhatsApp branding receiver & background (inherits parent hover/tap text color) */}
          <path
            fill="currentColor"
            d="M12.004 3.79c4.52 0 8.2 3.68 8.2 8.2 0 4.52-3.68 8.2-8.2 8.2-1.63 0-3.18-.48-4.5-1.39l-.32-.19-3.11.82.83-3.03-.21-.33a8.14 8.14 0 0 1-1.26-4.28c0-4.52 3.68-8.2 8.17-8.2zm-3 3.44c-.17 0-.32.01-.46.03-.33.04-.63.22-.8.53-.17.31-.2.72-.04 1.16.45 1.2 1.55 2.77 2.77 3.9 1.13 1.05 2.5 2.05 3.9 2.77.44.22.85.19 1.16.04.31-.17.49-.47.53-.8.02-.14.03-.29.03-.46l-1.36-.56c-.15-.06-.25-.09-.36-.02-.1.08-.62.6-.73.71-.11.11-.22.12-.41.02-.18-.1-.83-.34-1.57-1-.74-.66-1.24-1.48-1.35-1.66-.11-.18 0-.28.1-.37l.28-.33c.09-.1.12-.18.18-.31.06-.12.03-.23-.02-.33l-.56-1.35c-.07-.11-.1-.14-.21-.14-.11 0-.14.03-.24.03z"
          />
        </svg>
      </motion.a>
    </div>
  );
}
