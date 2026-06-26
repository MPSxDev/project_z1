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
        className="pointer-events-auto flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_10px_36px_rgba(37,211,102,0.3)] transition-all duration-300 relative group focus:outline-none"
        aria-label={ariaLabel}
      >
        {/* WhatsApp SVG Icon - Visually centered with optical alignment */}
        <svg
          className="w-8 h-8 relative z-10 -translate-x-[0.5px] translate-y-[0.5px]"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* White speech bubble background */}
          <path
            fill="white"
            d="M13.601 2.326A7.85 7.85 0 0 0 8 .094c-4.42 0-8 3.58-8 8 0 1.417.37 2.798 1.066 4.02L0 16l4.137-1.086a7.86 7.86 0 0 0 3.863 1.023h.001c4.42 0 8-3.58 8-8a7.86 7.86 0 0 0-2.399-5.617z"
          />
          {/* Green WhatsApp branding receiver (transitions dynamically to match background on hover) */}
          <path
            fill="#25D366"
            className="fill-[#25D366] group-hover:fill-[#20ba5a] transition-colors duration-300"
            d="M11.587 9.7a1.52 1.52 0 0 0-.25-.098c-.13-.06-.772-.382-.893-.425-.12-.045-.208-.068-.295.068-.088.135-.34.424-.417.512-.078.088-.156.1-.286.035a5.43 5.43 0 0 1-1.062-.658 5.7 5.7 0 0 1-1.212-1.12c-.08-.135-.008-.208.058-.274.06-.06.135-.156.2-.234a1 1 0 0 0 .135-.22c.045-.09.023-.17-.01-.24-.035-.07-.295-.71-.405-.98-.106-.256-.215-.22-.295-.224-.076-.004-.163-.005-.25-.005-.088 0-.23.033-.35.17-.12.135-.46.45-.46 1.096 0 .646.47 1.268.535 1.355.067.088 1.93 2.95 4.675 4.14.654.28 1.164.448 1.56.574.655.21 1.25.18 1.72.11.525-.078 1.614-.66 1.84-1.294.228-.635.228-1.18.16-1.294-.07-.115-.257-.185-.515-.31z"
          />
        </svg>
      </motion.a>
    </div>
  );
}
