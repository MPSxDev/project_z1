'use client';

import { memo, useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import {
  ArrowRight,
  CheckCircle,
  User,
  Building2,
  Mail,
  MessageSquare,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Target,
  Search,
  TrendingUp,
  Stethoscope,
  Briefcase,
  Scale,
  FlaskConical,
  Wrench,
  Building,
  UserCircle,
  Rocket,
  Phone,
} from 'lucide-react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';

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
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

// Hero Section
function HeroSection() {
  const t = useTranslations('presenciaDigital.hero');

  return (
    <section className="relative min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-4.5rem)] flex items-center bg-gradient-to-b from-[#eff4ff] via-white to-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-[#1F5CFF]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1F5CFF]/3 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10 pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          <motion.span
            variants={fadeInUp}
            className="block text-gray-500 font-medium text-xs uppercase tracking-[0.2em] mb-6 sm:mb-8"
          >
            {t('eyebrow')}
          </motion.span>

          <motion.h1
            variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-[-0.03em] text-gray-900 leading-[1.1] mb-8"
          >
            {t('title')}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-6"
          >
            {t('description')}
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto mb-10"
          >
            {t('supportingText')}
          </motion.p>

          <motion.div variants={fadeInUp} className="flex justify-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-gray-900 text-white font-medium rounded-lg border border-gray-900 hover:bg-gray-800 transition-colors duration-200"
            >
              {t('cta')}
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

// Practice Areas Section
const practiceAreaIcons = [Sparkles, Target, Search, TrendingUp];

function PracticeAreasSection() {
  const t = useTranslations('presenciaDigital.practiceAreas');
  const areas = ['strategy', 'website', 'visibility', 'growth'] as const;

  return (
    <Section background="gray" id="services">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-3xl mx-auto text-center mb-12 sm:mb-16"
      >
        <motion.span
          variants={fadeInUp}
          className="block text-gray-500 font-medium text-xs uppercase tracking-[0.2em] mb-4 sm:mb-5"
        >
          {t('eyebrow')}
        </motion.span>
        <motion.h2
          variants={fadeInUp}
          className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4 sm:mb-6 leading-tight"
        >
          {t('title')}
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="text-base sm:text-lg text-gray-600 leading-relaxed"
        >
          {t('description')}
        </motion.p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
      >
        {areas.map((area, index) => {
          const Icon = practiceAreaIcons[index];
          const steps = t.raw(`items.${area}.steps`) as string[];

          return (
            <motion.div
              key={area}
              variants={fadeInUp}
              className="group relative bg-white rounded-lg p-6 sm:p-8 border border-gray-200 hover:border-gray-400 transition-colors duration-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#1F5CFF]/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#1F5CFF]" />
                </div>
                <span className="text-xs font-medium text-[#1F5CFF] uppercase tracking-wider">
                  {t(`items.${area}.label`)}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 leading-tight">
                {t(`items.${area}.title`)}
              </h3>

              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                {t(`items.${area}.description`)}
              </p>

              <ul className="space-y-2 sm:space-y-2.5">
                {steps.map((step: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-xs sm:text-sm text-gray-600"
                  >
                    <span className="text-gray-400 font-mono text-xs mt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}

// Approach Section - Using SVG icons
const approachIcons = [
  { src: '/assets/iconset/icons/1.svg', alt: 'Premium Design' },
  { src: '/assets/iconset/icons/2.svg', alt: 'Conversion Focus' },
  { src: '/assets/iconset/icons/3.svg', alt: 'Search Visibility' },
  { src: '/assets/iconset/icons/4.svg', alt: 'Scalable Platform' },
  { src: '/assets/iconset/icons/5.svg', alt: 'Long-Term Partnership' },
];

function ApproachSection() {
  const t = useTranslations('presenciaDigital.approach');
  const items = ['design', 'conversion', 'search', 'scalable', 'partnership'] as const;

  return (
    <Section background="white" id="approach">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-3xl mx-auto text-center mb-12 sm:mb-16"
      >
        <motion.span
          variants={fadeInUp}
          className="block text-gray-500 font-medium text-xs uppercase tracking-[0.2em] mb-4 sm:mb-5"
        >
          {t('eyebrow')}
        </motion.span>
        <motion.h2
          variants={fadeInUp}
          className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4 sm:mb-6 leading-tight"
        >
          {t('title')}
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="text-base sm:text-lg text-gray-600 leading-relaxed"
        >
          {t('description')}
        </motion.p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        {items.map((item, index) => {
          const icon = approachIcons[index];
          return (
            <motion.div
              key={item}
              variants={fadeInUp}
              className="group text-left p-6 lg:p-8 rounded-lg bg-white border border-gray-200 hover:border-gray-300 transition-colors duration-200"
            >
              <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center mb-5">
                <div className="relative w-8 h-8">
                  <Image
                    src={icon.src}
                    alt={icon.alt}
                    fill
                    draggable={false}
                    className="object-contain opacity-70"
                  />
                </div>
              </div>
              <span className="text-xs font-medium text-[#1F5CFF] uppercase tracking-wider mb-2 block">
                {t(`items.${item}.label`)}
              </span>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t(`items.${item}.title`)}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t(`items.${item}.description`)}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}

// Capabilities Section
function CapabilitiesSection() {
  const t = useTranslations('presenciaDigital.capabilities');
  const items = t.raw('items') as string[];

  return (
    <Section background="gray" id="capabilities">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-3xl mx-auto text-center mb-12 sm:mb-16"
      >
        <motion.span
          variants={fadeInUp}
          className="block text-gray-500 font-medium text-xs uppercase tracking-[0.2em] mb-4 sm:mb-5"
        >
          {t('eyebrow')}
        </motion.span>
        <motion.h2
          variants={fadeInUp}
          className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4 sm:mb-6 leading-tight"
        >
          {t('title')}
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="text-base sm:text-lg text-gray-600 leading-relaxed"
        >
          {t('description')}
        </motion.p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {items.map((item: string, index: number) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            className="flex items-start gap-3 p-4 rounded-lg bg-white border border-gray-200"
          >
            <CheckCircle className="w-5 h-5 text-[#1F5CFF] flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-700 font-medium">{item}</span>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

// Applications Section
const applicationIcons = [
  Stethoscope,
  Briefcase,
  Scale,
  FlaskConical,
  Wrench,
  Building,
  UserCircle,
  Rocket,
];

function ApplicationsSection() {
  const t = useTranslations('presenciaDigital.applications');
  const items = t.raw('items') as string[];

  return (
    <Section background="white" id="applications">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-3xl mx-auto text-center mb-12 sm:mb-16"
      >
        <motion.span
          variants={fadeInUp}
          className="block text-gray-500 font-medium text-xs uppercase tracking-[0.2em] mb-4 sm:mb-5"
        >
          {t('eyebrow')}
        </motion.span>
        <motion.h2
          variants={fadeInUp}
          className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4 sm:mb-6 leading-tight"
        >
          {t('title')}
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="text-base sm:text-lg text-gray-600 leading-relaxed"
        >
          {t('description')}
        </motion.p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {items.map((item: string, index: number) => {
          const Icon = applicationIcons[index];
          return (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="flex items-start gap-4 p-5 rounded-lg bg-gray-50 border border-gray-200"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white flex items-center justify-center border border-gray-200">
                <Icon className="w-5 h-5 text-gray-500" />
              </div>
              <p className="text-gray-700 font-medium leading-relaxed text-sm pt-2">
                {item}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}

// Collaborations Section
interface CompanyLogo {
  name: string;
  logo: string;
  large?: boolean;
}

const logos: CompanyLogo[] = [
  { name: '3M', logo: '/assets/logos/3m.png' },
  { name: 'GastroMedical CR', logo: '/assets/logos/drzuniga-logo.png', large: true },
  { name: 'PHYC', logo: '/assets/logos/phyclogo-removedbg.png' },
  { name: 'HS', logo: '/assets/logos/hslogo.png' },
  { name: 'Construrack', logo: '/assets/logos/construrack.png' },
];

function CollaborationsSection() {
  const t = useTranslations('presenciaDigital.collaborations');
  const totalLogos = logos.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [visibleCount, setVisibleCount] = useState(1);

  const handlePrev = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  const handleNext = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else {
        setVisibleCount(3);
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  useEffect(() => {
    if (currentIndex <= 0) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(totalLogos);
      }, 500);
      return () => clearTimeout(timeout);
    }
    if (currentIndex >= totalLogos * 2) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(totalLogos);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, totalLogos]);

  useEffect(() => {
    if (!isTransitioning) {
      const timeout = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [isTransitioning]);

  const extendedLogos = [...logos, ...logos, ...logos];
  const itemWidthPercent = 100 / visibleCount;

  return (
    <section
      id="collaborations"
      className="relative bg-gradient-to-b from-white to-[#eff4ff]/20 py-16 sm:py-20 lg:py-24 overflow-hidden"
    >
      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <motion.span
              variants={fadeInUp}
              className="block text-gray-500 font-medium text-xs uppercase tracking-[0.2em] mb-4 sm:mb-5"
            >
              {t('eyebrow')}
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4 sm:mb-6 leading-tight"
            >
              {t('title')}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg text-gray-600 leading-relaxed"
            >
              {t('description')}
            </motion.p>
          </div>

          <motion.div variants={fadeInUp} className="w-full">
            <div className="relative flex items-center gap-4">
              <button
                onClick={handlePrev}
                className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-gray-300 text-gray-600 hover:border-[#1F5CFF] hover:text-[#1F5CFF] hover:bg-[#1F5CFF]/5 cursor-pointer flex items-center justify-center transition-all duration-200"
                aria-label="Previous logos"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="flex-1 overflow-hidden">
                <div
                  className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-out' : ''}`}
                  style={{
                    transform: `translateX(-${currentIndex * itemWidthPercent}%)`,
                  }}
                >
                  {extendedLogos.map((company, index) => (
                    <div
                      key={`${company.name}-${index}`}
                      className="flex-shrink-0 px-4 sm:px-6 lg:px-8"
                      style={{ width: `${itemWidthPercent}%` }}
                    >
                      <div className="relative w-full h-72 sm:h-72 lg:h-80 flex items-center justify-center">
                        <Image
                          src={company.logo}
                          alt={`${company.name} logo`}
                          width={company.large ? 720 : 576}
                          height={company.large ? 346 : 269}
                          className="max-h-80 sm:max-h-72 lg:max-h-80 max-w-full object-contain"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleNext}
                className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-gray-300 text-gray-600 hover:border-[#1F5CFF] hover:text-[#1F5CFF] hover:bg-[#1F5CFF]/5 cursor-pointer flex items-center justify-center transition-all duration-200"
                aria-label="Next logos"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

// Contact Form Section
interface FormData {
  name: string;
  organization: string;
  email: string;
  message: string;
}

const ContactFormSection = memo(function ContactFormSection() {
  const t = useTranslations('presenciaDigital.cta');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    organization: '',
    email: '',
    message: '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
        body: JSON.stringify({
          ...formData,
          formType: 'presencia-digital',
          institution: formData.organization,
          challenge: formData.message,
        }),
      });

      if (!res.ok) {
        throw new Error('submit_failed');
      }

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: '', organization: '', email: '', message: '' });
      }, 5000);
    } catch {
      setHasError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = t.raw('benefits') as string[];

  return (
    <section
      id="contact"
      className="relative py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#1F5CFF]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-3xl" />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1F5CFF]/30 to-transparent" />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
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
              className="text-xl text-gray-600 leading-relaxed mb-4"
            >
              {t('description')}
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-500 leading-relaxed mb-10"
            >
              {t('supportingText')}
            </motion.p>

            <motion.div variants={staggerContainer} className="space-y-4">
              {benefits.map((benefit: string, index: number) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-[#1F5CFF] flex-shrink-0" />
                  <span className="text-gray-600">{benefit}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-10 pt-10 border-t border-gray-200"
            >
              <p className="text-gray-500 mb-4">También puede contactarnos directamente:</p>
              <div className="flex flex-col gap-3">
                <a
                  href={`mailto:${t('contact.email')}`}
                  className="inline-flex items-center gap-2 text-[#1F5CFF] hover:text-blue-600 font-medium transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  {t('contact.email')}
                </a>
                <a
                  href="https://wa.me/50683335408"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#1F5CFF] hover:text-blue-600 font-medium transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  WhatsApp: +506 8333 5408
                </a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#1F5CFF]/10 via-blue-400/10 to-[#1F5CFF]/10 rounded-2xl blur-xl opacity-50" />

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
                      <p className="text-gray-500">{t('success.message')}</p>
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
                            <p className="font-semibold text-sm">
                              {t('error.title')}
                            </p>
                            <p className="text-sm mt-1 text-red-700">
                              {t('error.message')}
                            </p>
                          </div>
                        </div>
                      )}

                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          {t('form.name.label')}
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
                            placeholder={t('form.name.placeholder')}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="organization"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          {t('form.organization.label')}
                        </label>
                        <div className="relative">
                          <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            id="organization"
                            name="organization"
                            value={formData.organization}
                            onChange={handleChange}
                            required
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1F5CFF] focus:ring-1 focus:ring-[#1F5CFF] transition-colors"
                            placeholder={t('form.organization.placeholder')}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          {t('form.email.label')}
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
                            placeholder={t('form.email.placeholder')}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          {t('form.message.label')}
                        </label>
                        <div className="relative">
                          <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={4}
                            required
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1F5CFF] focus:ring-1 focus:ring-[#1F5CFF] transition-colors resize-none"
                            placeholder={t('form.message.placeholder')}
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            {t('submitting')}
                          </>
                        ) : (
                          <>
                            {t('form.button')}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
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

// Main Page Content Component
export default function PresenciaDigitalPageContent() {
  return (
    <>
      <HeroSection />
      <main id="main-content">
        <PracticeAreasSection />
        <ApproachSection />
        <CapabilitiesSection />
        <ApplicationsSection />
        <CollaborationsSection />
        <ContactFormSection />
      </main>
    </>
  );
}
