'use client';

import { memo, useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import {
  ArrowRight,
  CheckCircle,
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
  Rocket,
  MessageCircle,
  Plus,
  Minus,
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

// Applications Section - 6 items for 3x2 grid
const applicationIcons = [
  Stethoscope,
  Briefcase,
  Scale,
  FlaskConical,
  Wrench,
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
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
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

// CTA Section
const WHATSAPP_NUMBER = '50683335408';
const WHATSAPP_MESSAGE = encodeURIComponent('Hola, me interesa conocer más sobre sus servicios de presencia digital.');

function CTASection() {
  const t = useTranslations('presenciaDigital.cta');
  const trustIndicators = t.raw('trustIndicators') as string[];

  return (
    <Section background="gray" id="contact">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-4xl mx-auto text-center"
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
          className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6"
        >
          {t('description')}
        </motion.p>
        <motion.p
          variants={fadeInUp}
          className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 font-medium bg-white p-6 rounded-xl border border-gray-200"
        >
          {t('highlight')}
        </motion.p>

        <motion.div variants={fadeInUp} className="flex flex-col items-center gap-4">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#20bd5a] transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <MessageCircle className="w-5 h-5" />
            {t('primaryButton')}
          </a>
          <p className="text-sm text-gray-500">{t('secondaryText')}</p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="flex flex-wrap justify-center gap-4 mt-8"
        >
          {trustIndicators.map((indicator: string, index: number) => (
            <div
              key={index}
              className="flex items-center gap-2 text-sm text-gray-600"
            >
              <CheckCircle className="w-4 h-4 text-[#25D366]" />
              <span>{indicator}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </Section>
  );
}

// FAQ Section
interface FAQItem {
  question: string;
  answer: string;
}

function FAQItemComponent({ item, index }: { item: FAQItem; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      className="border-b border-gray-200 last:border-b-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full py-5 sm:py-6 flex items-start justify-between gap-4 text-left hover:bg-gray-50/50 transition-colors px-5 sm:px-6"
      >
        <span className="text-base sm:text-lg font-semibold text-gray-900 flex-1">
          {item.question}
        </span>
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#dbe6ff] flex items-center justify-center mt-0.5">
          {isOpen ? (
            <Minus className="w-4 h-4 text-[#1F5CFF]" />
          ) : (
            <Plus className="w-4 h-4 text-[#1F5CFF]" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-base text-gray-600 leading-relaxed">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FAQSection() {
  const t = useTranslations('presenciaDigital.faq');
  const items = t.raw('items') as FAQItem[];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <Section background="white" id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
          <motion.h2
            variants={fadeInUp}
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900"
          >
            {t('title')}
          </motion.h2>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          {items.map((item, index) => (
            <FAQItemComponent key={index} item={item} index={index} />
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

// Closing Section
function ClosingSection() {
  const t = useTranslations('presenciaDigital.closing');

  return (
    <section className="relative bg-gradient-to-b from-white to-[#eff4ff] py-16 sm:py-20 lg:py-24">
      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4 sm:mb-6 leading-tight"
          >
            {t('title')}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8"
          >
            {t('description')}
          </motion.p>
          <motion.div variants={fadeInUp}>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#20bd5a] transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="w-5 h-5" />
              {t('button')}
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

// Main Page Content Component
export default function PresenciaDigitalPageContent() {
  return (
    <>
      <HeroSection />
      <main id="main-content">
        <PracticeAreasSection />
        <ApproachSection />
        <CollaborationsSection />
        <CapabilitiesSection />
        <ApplicationsSection />
        <CTASection />
        <FAQSection />
        <ClosingSection />
      </main>
    </>
  );
}
