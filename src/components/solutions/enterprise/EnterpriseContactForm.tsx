'use client';

import { memo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  Send,
  CheckCircle,
  Building2,
  Mail,
  User,
  MessageSquare,
  ArrowRight,
  AlertCircle,
  Phone,
} from 'lucide-react';
import Container from '@/components/ui/Container';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

interface FormData {
  name: string;
  institution: string;
  email: string;
  challenge: string;
}

type FormType = 'pilot' | 'consultation';

/**
 * EnterpriseContactForm - Premium enterprise contact section
 */
const EnterpriseContactForm = memo(function EnterpriseContactForm() {
  const t = useTranslations('solutionsPage.enterprise.contact');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    institution: '',
    email: '',
    challenge: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasError, setHasError] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (formType: FormType) => {
    const form = formRef.current;
    if (form && !form.reportValidity()) {
      return;
    }

    setIsSubmitting(true);
    setHasError(false);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, formType }),
      });

      if (!res.ok) {
        throw new Error('submit_failed');
      }

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: '', institution: '', email: '', challenge: '' });
      }, 5000);
    } catch {
      setHasError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void submitForm('pilot');
  };

  const handleConsultationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    void submitForm('consultation');
  };

  return (
    <section
      id="contact-form"
      className="relative py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#1F5CFF]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-3xl" />
      </div>

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1F5CFF]/30 to-transparent" />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-3 text-gray-500 font-medium text-xs uppercase tracking-[0.2em] mb-6"
            >
              <span className="w-8 h-px bg-gray-400" />
              {t('eyebrow')}
            </motion.span>

            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.02em] text-gray-900 mb-6"
            >
              {t('title')}
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-600 leading-relaxed mb-10"
            >
              {t('description')}
            </motion.p>

            {/* Trust messaging */}
            <motion.div variants={staggerContainer} className="space-y-4">
              {(['confidentiality', 'noObligation', 'response'] as const).map((item) => (
                <motion.div
                  key={item}
                  variants={fadeInUp}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-[#1F5CFF] flex-shrink-0" />
                  <span className="text-gray-600">{t(`trust.${item}`)}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Alternative contact */}
            <motion.div
              variants={fadeInUp}
              className="mt-10 pt-10 border-t border-gray-200"
            >
              <p className="text-gray-500 mb-4">{t('alternative')}</p>
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:contacto@yieldge.com"
                  className="inline-flex items-center gap-2 text-[#1F5CFF] hover:text-blue-600 font-medium transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  contacto@yieldge.com
                </a>
                <a
                  href="https://wa.me/50670724236"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#1F5CFF] hover:text-blue-600 font-medium transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Whatsapp cotizaciones: +506 7072 4236
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#1F5CFF]/10 via-blue-400/10 to-[#1F5CFF]/10 rounded-2xl blur-xl opacity-50" />

              {/* Form card */}
              <div className="relative bg-white rounded-2xl border border-gray-200 p-8 lg:p-10 shadow-sm">
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                        {t('success.title')}
                      </h3>
                      <p className="text-gray-500">
                        {t('success.message')}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      ref={formRef}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      {hasError && (
                        <div
                          role="alert"
                          className="flex gap-3 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800"
                        >
                          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-sm">{t('error.title')}</p>
                            <p className="text-sm mt-1 text-red-700">{t('error.message')}</p>
                          </div>
                        </div>
                      )}
                      {/* Name field */}
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          {t('fields.name')}
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1F5CFF] focus:ring-1 focus:ring-[#1F5CFF] transition-colors"
                            placeholder={t('placeholders.name')}
                          />
                        </div>
                      </div>

                      {/* Institution field */}
                      <div>
                        <label
                          htmlFor="institution"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          {t('fields.institution')}
                        </label>
                        <div className="relative">
                          <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            id="institution"
                            name="institution"
                            value={formData.institution}
                            onChange={handleChange}
                            required
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1F5CFF] focus:ring-1 focus:ring-[#1F5CFF] transition-colors"
                            placeholder={t('placeholders.institution')}
                          />
                        </div>
                      </div>

                      {/* Email field */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          {t('fields.email')}
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1F5CFF] focus:ring-1 focus:ring-[#1F5CFF] transition-colors"
                            placeholder={t('placeholders.email')}
                          />
                        </div>
                      </div>

                      {/* Challenge field */}
                      <div>
                        <label
                          htmlFor="challenge"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          {t('fields.challenge')}
                        </label>
                        <div className="relative">
                          <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                          <textarea
                            id="challenge"
                            name="challenge"
                            value={formData.challenge}
                            onChange={handleChange}
                            rows={4}
                            required
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1F5CFF] focus:ring-1 focus:ring-[#1F5CFF] transition-colors resize-none"
                            placeholder={t('placeholders.challenge')}
                          />
                        </div>
                      </div>

                      {/* Submit buttons */}
                      <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="group flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              {t('submitting')}
                            </>
                          ) : (
                            <>
                              {t('submitPilot')}
                              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={handleConsultationClick}
                          disabled={isSubmitting}
                          className="flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 bg-gray-100 text-gray-700 font-semibold rounded-lg border border-gray-200 hover:bg-gray-200 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                        >
                          <Send className="w-5 h-5" />
                          {t('submitConsultation')}
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
});

export default EnterpriseContactForm;
