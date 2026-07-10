'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import {
  ArrowRight,
  CheckCircle,
  Minus,
  Plus,
  Search,
  PenTool,
  TrendingUp,
  BarChart3,
  Quote,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Container from '@/components/ui/Container';
import { cn } from '@/lib/utils';
import HeroMockupOverlays, {
  HeroResultBadge,
} from '@/components/presencia-digital/HeroMockupOverlays';
import {
  PRESENCIA_DIGITAL_IMAGES,
  PRESENCIA_DIGITAL_LOGOS,
  getPresenciaDigitalWhatsAppUrl,
} from '@/lib/presencia-digital';

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

function WhatsAppCta({
  children,
  variant = 'green',
  className,
}: {
  children: React.ReactNode;
  variant?: 'green' | 'white';
  className?: string;
}) {
  const locale = useLocale();
  const base =
    'group inline-flex items-center justify-center gap-2.5 px-8 py-4 font-semibold rounded-lg transition-all duration-300 shadow-lg';
  const styles =
    variant === 'white'
      ? 'bg-white text-[#1F5CFF] hover:bg-gray-50 hover:-translate-y-0.5'
      : 'bg-[#25D366] text-white hover:bg-[#20bd5a] hover:-translate-y-0.5 hover:shadow-[#25D366]/30';

  return (
    <a
      href={getPresenciaDigitalWhatsAppUrl(locale)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(base, styles, className)}
    >
      {children}
    </a>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      variants={fadeInUp}
      className="inline-flex items-center gap-3 text-gray-500 font-medium text-xs uppercase tracking-[0.2em] mb-6"
    >
      <span className="w-8 h-px bg-gray-400" />
      {children}
      <span className="w-8 h-px bg-gray-400" />
    </motion.span>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer}
      className="text-center mb-16 lg:mb-20"
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <motion.h2
        variants={fadeInUp}
        className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.02em] text-gray-900 mb-6 leading-[1.1]"
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p variants={fadeInUp} className="text-lg text-gray-600 max-w-3xl mx-auto">
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}

const DotGrid = () => (
  <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_2px_2px,rgba(31,92,255,0.1)_1px,transparent_0)] [background-size:40px_40px]" />
);

const AccentTop = () => (
  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1F5CFF]/30 to-transparent" />
);

const AccentBottom = () => (
  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
);

function ScrollOnHoverPreview({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className={cn('relative overflow-hidden bg-gray-100', className ?? 'h-44 sm:h-52')}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, 50vw"
        className="object-cover ease-in-out scale-[1.02]"
        style={{
          objectPosition: `center ${isHovering ? '100%' : '0%'}`,
          transitionProperty: 'object-position',
          transitionDuration: isHovering ? '5000ms' : '900ms',
        }}
      />
    </div>
  );
}

// Static "melted" letters: each glyph is frozen mid-drip with a soft blur.
// Deterministic per-index pattern so the look is stable (no animation).
const MELT_OFFSETS = [0, 0.6, 1.4, 0.4, 1.8, 1, 0.6, 1.4, 0, 1, 1.6, 0.4, 1.2, 0.8, 1];
const MELT_STRETCH = [1, 1.03, 1.07, 1.02, 1.09, 1.05, 1.03, 1.07, 1, 1.05, 1.08, 1.02, 1.06, 1.04, 1.05];

function MeltingText({ text, className }: { text: string; className?: string }) {
  const characters = Array.from(text);

  return (
    <span
      className={cn('inline-block whitespace-nowrap align-baseline', className)}
      aria-label={text}
    >
      {characters.map((char, index) => (
        <span
          key={`${char}-${index}`}
          aria-hidden="true"
          className="inline-block origin-top"
          style={{
            transform: `translateY(${MELT_OFFSETS[index % MELT_OFFSETS.length]}px) scaleY(${MELT_STRETCH[index % MELT_STRETCH.length]})`,
            filter: 'blur(0.2px)',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

// ─── Hero ───────────────────────────────────────────────────────────────────
function HeroSection() {
  const t = useTranslations('presenciaDigital.hero');
  const tLogos = useTranslations('presenciaDigital.logos');

  return (
    <section className="relative flex items-center bg-gradient-to-b from-[#eff4ff] via-white to-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-[#1F5CFF]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1F5CFF]/3 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10 pt-28 pb-10 sm:pt-36 sm:pb-12 lg:pt-40 lg:pb-14">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          <div className="text-center lg:text-left">
            <motion.div variants={fadeInUp} className="mb-8">
              <span className="inline-flex items-center gap-3 text-gray-500 font-medium text-xs uppercase tracking-[0.2em]">
                <span className="w-8 h-px bg-gray-400" />
                {t('eyebrow')}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-gray-900 leading-[1.1] mb-6"
            >
              {t('title')}
            </motion.h1>

            <motion.div
              variants={fadeInUp}
              className="w-32 h-px bg-gradient-to-r from-[#1F5CFF] to-blue-400 mb-8 origin-left mx-auto lg:mx-0"
            />

            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
            >
              {t('description')}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col items-center lg:items-start gap-3"
            >
              <WhatsAppCta>
                <WhatsAppIcon className="w-5 h-5" />
                {t('cta')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </WhatsAppCta>
              <p className="text-sm text-gray-500">{t('microcopy')}</p>
            </motion.div>
          </div>

          <motion.div variants={fadeInUp} className="relative">
            <div className="relative rounded-2xl overflow-hidden border border-gray-200/80 shadow-[0_20px_60px_-15px_rgba(31,92,255,0.25)] bg-white">
              <Image
                src={PRESENCIA_DIGITAL_IMAGES.heroMockup}
                alt="Sitio web de GastroMedical CR"
                width={800}
                height={600}
                className="w-full h-auto"
                priority
              />
              <HeroMockupOverlays />
            </div>
            <HeroResultBadge />
          </motion.div>
        </motion.div>

        {/* Logo strip */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mt-16 pt-10 border-t border-gray-200/80"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 text-center mb-8">
            {tLogos('title')}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 items-center">
            {PRESENCIA_DIGITAL_LOGOS.map((company) => (
              <div
                key={company.name}
                className="flex items-center justify-center h-14 sm:h-16 px-3"
              >
                <Image
                  src={company.logo}
                  alt={`${company.name} logo`}
                  width={company.large ? 160 : 120}
                  height={48}
                  className="max-h-12 w-auto object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

// ─── Social Proof ─────────────────────────────────────────────────────────────
interface StatItem {
  value: string;
  label: string;
}

interface CaseStudy {
  client: string;
  sector: string;
  service: string;
  result: string;
}

const caseStudyImages = [
  PRESENCIA_DIGITAL_IMAGES.caseStudyGastroMedical,
  PRESENCIA_DIGITAL_IMAGES.caseStudyPhyc,
];

function SocialProofSection() {
  const t = useTranslations('presenciaDigital.socialProof');
  const stats = t.raw('stats') as StatItem[];
  const caseStudies = t.raw('caseStudies') as CaseStudy[];

  return (
    <section className="relative pt-14 pb-24 lg:pt-16 lg:pb-28 bg-white overflow-hidden">
      <Container className="relative z-10">
        {/* Stats */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14 lg:mb-20"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50/80 border border-gray-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
            >
              <p className="text-3xl sm:text-4xl font-semibold bg-gradient-to-r from-[#1F5CFF] to-blue-500 bg-clip-text text-transparent mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonial + case studies */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-stretch"
        >
          {/* Testimonial */}
          <motion.blockquote
            variants={fadeInUp}
            className="lg:col-span-2 relative flex flex-col justify-center p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-[0_8px_30px_-8px_rgba(0,0,0,0.4)]"
          >
            <Quote className="w-8 h-8 text-blue-400/60 mb-4" />
            <p className="text-base sm:text-lg leading-relaxed mb-6 text-gray-100">
              {t('testimonial.quote')}
            </p>
            <div className="flex items-center gap-3 mt-auto">
              <div className="relative w-12 h-12 shrink-0 rounded-full overflow-hidden border border-white/20">
                <Image
                  src={PRESENCIA_DIGITAL_IMAGES.testimonialAvatar}
                  alt={t('testimonial.author')}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold">{t('testimonial.author')}</p>
                <p className="text-sm text-gray-400">{t('testimonial.role')}</p>
              </div>
            </div>
          </motion.blockquote>

          {/* Case study */}
          {caseStudies[0] ? (
            <motion.div
              variants={fadeInUp}
              className="group lg:col-span-3 flex flex-col bg-white rounded-2xl border border-gray-200/60 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-blue-200/80 hover:shadow-[0_8px_30px_-8px_rgba(31,92,255,0.15)] transition-all duration-300"
            >
              <ScrollOnHoverPreview
                src={caseStudyImages[0]}
                alt={`${caseStudies[0].client} website`}
                className="flex-1 min-h-[16rem] sm:min-h-[20rem]"
              />
              <div className="p-6 sm:p-7">
                <p className="text-[10px] font-semibold text-[#1F5CFF] uppercase tracking-[0.15em] mb-1.5">
                  {caseStudies[0].sector}
                </p>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {caseStudies[0].client}
                </h3>
                <p className="text-sm text-gray-500 mb-3">{caseStudies[0].service}</p>
                <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#25D366]" />
                  {caseStudies[0].result}
                </p>
              </div>
            </motion.div>
          ) : null}
        </motion.div>
      </Container>
    </section>
  );
}

// ─── Problem / Solution ────────────────────────────────────────────────────────
function ProblemSolutionSection() {
  const t = useTranslations('presenciaDigital.problemSolution');
  const problems = t.raw('problems') as string[];
  const solutions = t.raw('solutions') as string[];

  return (
    <section className="relative py-24 lg:py-32 bg-gray-50 overflow-hidden">
      <AccentTop />
      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
        >
          <div>
            <Eyebrow>{t('eyebrow')}</Eyebrow>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.02em] text-gray-900 mb-5 leading-[1.1]"
            >
              {t('title')}{' '}
              <MeltingText
                text={t('titleEmphasis')}
                className="text-rose-600 [filter:drop-shadow(0_2px_10px_rgba(225,29,72,0.28))]"
              />
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-600 leading-relaxed mb-8"
            >
              {t('intro')}
            </motion.p>
            <div className="space-y-3">
              {problems.map((problem) => (
                <motion.div
                  key={problem}
                  variants={fadeInUp}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white border border-gray-200/80"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-sm font-bold mt-0.5">
                    ✕
                  </span>
                  <span className="text-gray-700">{problem}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div variants={fadeInUp}>
            <div className="relative rounded-2xl overflow-hidden border border-gray-200/80 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)] mb-8">
              <Image
                src={PRESENCIA_DIGITAL_IMAGES.problemVisual}
                alt="Problema de presencia digital"
                width={640}
                height={480}
                className="w-full h-auto"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('solutionsTitle')}</h3>
            <div className="space-y-3">
              {solutions.map((solution) => (
                <div
                  key={solution}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white border border-[#1F5CFF]/15"
                >
                  <CheckCircle className="w-5 h-5 text-[#25D366] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{solution}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>
      <AccentBottom />
    </section>
  );
}

// ─── Process ────────────────────────────────────────────────────────────────
interface ProcessStep {
  title: string;
  description: string;
}

const processIcons: LucideIcon[] = [Search, PenTool, TrendingUp, BarChart3];

function ProcessSection() {
  const t = useTranslations('presenciaDigital.process');
  const steps = t.raw('steps') as ProcessStep[];

  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <Container className="relative z-10">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {steps.map((step, index) => {
            const Icon = processIcons[index];
            return (
              <motion.div
                key={step.title}
                variants={fadeInUp}
                className="group relative flex flex-col items-center text-center"
              >
                <div className="relative mb-5">
                  <div className="absolute -inset-3 rounded-3xl blur-2xl opacity-50 transition-opacity duration-300 group-hover:opacity-90 bg-gradient-to-br from-[#1F5CFF]/25 to-blue-400/10" />
                  <div className="relative w-16 h-16 rounded-2xl bg-white border border-gray-200/80 flex items-center justify-center shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
                    <span className="absolute -top-2 -right-2 min-w-[1.375rem] h-[1.375rem] px-1 rounded-full border border-[#1F5CFF]/20 bg-[#1F5CFF]/10 text-[#1F5CFF] text-[9px] font-bold flex items-center justify-center">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <Icon className="w-7 h-7 text-gray-400 transition-colors duration-300 group-hover:text-[#1F5CFF]" />
                  </div>
                </div>
                <div className="w-full flex-1 rounded-xl border border-gray-100 bg-white/70 backdrop-blur-sm px-4 py-5 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md group-hover:bg-white">
                  <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-[#1F5CFF]">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}

// ─── Results ────────────────────────────────────────────────────────────────
interface ResultItem {
  metric: string;
  label: string;
  description: string;
}

function ResultsSection() {
  const t = useTranslations('presenciaDigital.results');
  const items = t.raw('items') as ResultItem[];

  return (
    <section className="relative py-24 lg:py-32 bg-gray-50 overflow-hidden">
      <AccentTop />
      <Container className="relative z-10">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {items.map((item) => (
            <motion.div
              key={item.label}
              variants={fadeInUp}
              className="group relative p-6 lg:p-8 rounded-2xl bg-white border border-gray-200/60 text-center hover:border-blue-200/80 hover:shadow-[0_8px_30px_-8px_rgba(31,92,255,0.15)] transition-all duration-300"
            >
              <p className="text-4xl font-semibold bg-gradient-to-r from-[#1F5CFF] to-blue-500 bg-clip-text text-transparent mb-2">
                {item.metric}
              </p>
              <p className="font-semibold text-gray-900 mb-2">{item.label}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
      <AccentBottom />
    </section>
  );
}

// ─── Mid CTA ────────────────────────────────────────────────────────────────
function MidCtaSection() {
  const t = useTranslations('presenciaDigital.midCta');

  return (
    <section className="relative py-16 sm:py-20 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
      <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_2px_2px,rgba(31,92,255,0.15)_1px,transparent_0)] [background-size:40px_40px]" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#1F5CFF]/10 rounded-full blur-3xl pointer-events-none" />
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-white mb-8 leading-[1.15]">
            {t('title')}
          </h2>
          <WhatsAppCta variant="white">
            <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
            {t('button')}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </WhatsAppCta>
        </motion.div>
      </Container>
    </section>
  );
}

// ─── Final CTA ──────────────────────────────────────────────────────────────
function CTASection() {
  const t = useTranslations('presenciaDigital.cta');
  const trustIndicators = t.raw('trustIndicators') as string[];

  return (
    <section id="contact" className="relative py-24 lg:py-32 bg-gray-50 overflow-hidden">
      <DotGrid />
      <AccentTop />
      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="max-w-3xl mx-auto text-center"
        >
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.02em] text-gray-900 mb-6 leading-[1.1]"
          >
            {t('title')}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-gray-600 leading-relaxed mb-8"
          >
            {t('description')}
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col items-center gap-4">
            <WhatsAppCta>
              <WhatsAppIcon className="w-5 h-5" />
              {t('primaryButton')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </WhatsAppCta>
            <p className="text-sm text-gray-500">{t('secondaryText')}</p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-x-6 gap-y-3 mt-10"
          >
            {trustIndicators.map((indicator) => (
              <div key={indicator} className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-[#25D366]" />
                <span>{indicator}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
      <AccentBottom />
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
interface FAQItem {
  question: string;
  answer: string;
}

function FAQItemComponent({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div variants={fadeInUp} className="border-b border-gray-200 last:border-b-0">
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
        {isOpen ? (
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
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

function FAQSection() {
  const t = useTranslations('presenciaDigital.faq');
  const items = t.raw('items') as FAQItem[];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Container className="relative z-10">
        <SectionHeading title={t('title')} />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm"
        >
          {items.map((item) => (
            <FAQItemComponent key={item.question} item={item} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

// ─── Footer ─────────────────────────────────────────────────────────────────
function FooterSection() {
  const t = useTranslations('presenciaDigital.footer');
  const legal = t.raw('legal') as string[];

  return (
    <footer className="relative bg-gray-900 text-gray-300 py-14 sm:py-16 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1F5CFF]/30 to-transparent" />
      <Container>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          <div>
            <p className="text-white font-bold text-lg mb-1">{t('brand')}</p>
            <p className="text-sm text-gray-400 mb-3">{t('tagline')}</p>
            <p className="text-sm leading-relaxed text-gray-400">{t('description')}</p>
          </div>
          <div>
            <p className="text-white font-semibold mb-3">{t('contactTitle')}</p>
            <p className="text-sm mb-2 text-gray-400">{t('contactDescription')}</p>
            <a
              href={`mailto:${t('email')}`}
              className="text-sm text-blue-300 hover:text-white transition-colors"
            >
              {t('email')}
            </a>
          </div>
          <div>
            <p className="text-white font-semibold mb-3">{t('legalTitle')}</p>
            <div className="flex flex-col gap-2">
              <Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-white transition-colors">
                {legal[0]}
              </Link>
              <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                {legal[1]}
              </Link>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-500 border-t border-gray-800 pt-8">{t('copyright')}</p>
      </Container>
    </footer>
  );
}

export default function PresenciaDigitalPageContent() {
  return (
    <>
      <HeroSection />
      <main id="main-content">
        <SocialProofSection />
        <ProblemSolutionSection />
        <ProcessSection />
        <ResultsSection />
        <MidCtaSection />
        <CTASection />
        <FAQSection />
        <FooterSection />
      </main>
    </>
  );
}
