'use client';

import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  Brain,
  Building2,
  Cpu,
  Landmark,
  LineChart,
  Network,
  RefreshCw,
  ArrowRight,
  BookOpen,
  CheckCircle,
  Clock,
  Calendar,
  User,
  ChevronDown,
  FileText,
  Globe,
  Mail,
  BookMarked,
  TrendingUp,
  Search,
  Database,
} from 'lucide-react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Heading from '@/components/ui/Heading';
import { Link } from '@/i18n/navigation';

// Animation variants matching existing components
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

const lineAnimation = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const, delay: 0.8 },
  },
};

// Research area icons mapping
const researchAreaIcons: Record<string, React.ElementType> = {
  operationalIntelligence: Brain,
  enterpriseArchitecture: Building2,
  aiAutomation: Cpu,
  financialSystems: Landmark,
  governmentTechnology: Globe,
  digitalTransformation: RefreshCw,
  observability: LineChart,
  systemsIntegration: Network,
};

// Research publications data
const publications = [
  {
    id: 1,
    category: 'Observability',
    title: 'The Hidden Cost of Legacy System Fragmentation',
    summary: 'Analysis of how disconnected enterprise systems create operational blind spots and increase total cost of ownership across large organizations.',
    readTime: '12 min read',
    date: '2024',
    author: 'Yieldge Research',
  },
  {
    id: 2,
    category: 'Enterprise Architecture',
    title: 'Why Enterprise Dashboards Are Failing Executives',
    summary: 'A critical examination of dashboard fatigue and the shift toward contextual, action-oriented operational intelligence systems.',
    readTime: '9 min read',
    date: '2024',
    author: 'Yieldge Research',
  },
  {
    id: 3,
    category: 'AI & Automation',
    title: 'The Rise of AI-Powered Operational Intelligence',
    summary: 'How machine learning is transforming enterprise operations from reactive monitoring to predictive and prescriptive decision support.',
    readTime: '15 min read',
    date: '2024',
    author: 'Yieldge Research',
  },
  {
    id: 4,
    category: 'Government Technology',
    title: 'Building Observable Government Systems',
    summary: 'Framework for implementing cross-agency observability in public sector organizations while maintaining security and compliance.',
    readTime: '11 min read',
    date: '2024',
    author: 'Yieldge Research',
  },
  {
    id: 5,
    category: 'Financial Systems',
    title: 'Operational Resilience in Financial Institutions',
    summary: 'Strategies for building antifragile operational infrastructure that strengthens under stress in regulated financial environments.',
    readTime: '14 min read',
    date: '2024',
    author: 'Yieldge Research',
  },
  {
    id: 6,
    category: 'Systems Integration',
    title: 'Enterprise Integration Beyond APIs',
    summary: 'Examining the evolution from point-to-point integrations to event-driven architectures and unified data fabrics.',
    readTime: '10 min read',
    date: '2024',
    author: 'Yieldge Research',
  },
];

// Methodology sources
const methodologySources = [
  { key: 'oecd', icon: Globe },
  { key: 'worldBank', icon: Database },
  { key: 'gartner', icon: TrendingUp },
  { key: 'enterpriseArchitecture', icon: Building2 },
  { key: 'operationalIntelligence', icon: Brain },
  { key: 'publicSector', icon: Landmark },
  { key: 'fintech', icon: LineChart },
  { key: 'bestPractices', icon: BookMarked },
] as const;

// Research metrics
const metrics = [
  { value: '20+', label: 'Research Topics Analyzed' },
  { value: '5', label: 'Industries Covered' },
  { value: '100+', label: 'Sources Reviewed' },
  { value: 'Enterprise', label: 'Focused Research' },
];

// Research areas
const researchAreas = [
  'operationalIntelligence',
  'enterpriseArchitecture',
  'aiAutomation',
  'financialSystems',
  'governmentTechnology',
  'digitalTransformation',
  'observability',
  'systemsIntegration',
] as const;

// Publication card component
interface PublicationCardProps {
  publication: typeof publications[0];
}

const PublicationCard = memo(function PublicationCard({ publication }: PublicationCardProps) {
  return (
    <motion.article
      variants={fadeInUp}
      className="group relative bg-white rounded-lg p-6 lg:p-8 border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300"
    >
      {/* Category badge */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#1F5CFF] bg-[#1F5CFF]/5 px-3 py-1 rounded-full">
          {publication.category}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-snug tracking-[-0.01em] group-hover:text-[#1F5CFF] transition-colors">
        {publication.title}
      </h3>

      {/* Summary */}
      <p className="text-sm text-gray-500 leading-relaxed mb-6 line-clamp-3">
        {publication.summary}
      </p>

      {/* Meta info */}
      <div className="flex items-center gap-4 text-xs text-gray-400">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          <span>{publication.readTime}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          <span>{publication.date}</span>
        </div>
      </div>

      {/* Hover arrow */}
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowRight className="w-5 h-5 text-[#1F5CFF]" />
      </div>
    </motion.article>
  );
});

// Research area card component
interface ResearchAreaCardProps {
  area: typeof researchAreas[number];
  index: number;
}

const ResearchAreaCard = memo(function ResearchAreaCard({ area, index }: ResearchAreaCardProps) {
  const t = useTranslations('researchPage.areas.items');
  const Icon = researchAreaIcons[area];

  return (
    <motion.div
      variants={fadeInUp}
      className="group relative bg-white rounded-lg p-6 border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300"
    >
      {/* Number badge */}
      <span className="absolute top-4 right-4 text-[10px] font-mono text-gray-300">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Icon */}
      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-[#1F5CFF]/10 transition-colors">
        <Icon className="w-6 h-6 text-gray-500 group-hover:text-[#1F5CFF] transition-colors" />
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-gray-900 mb-2 leading-snug">
        {t(`${area}.title`)}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-500 leading-relaxed">
        {t(`${area}.description`)}
      </p>

      {/* Publication count placeholder */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <span className="text-xs text-gray-400">Research available</span>
      </div>
    </motion.div>
  );
});

/**
 * ResearchPageContent - Enterprise Research Publication Platform
 *
 * Designed to match the institutional aesthetic of:
 * - McKinsey Research
 * - Gartner Research
 * - Deloitte Insights
 * - Accenture Technology Vision
 */
const ResearchPageContent = memo(function ResearchPageContent() {
  const t = useTranslations('researchPage');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setStatus('error');
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      {/* ============================================
          HERO SECTION
          Institutional style matching EnterpriseHero
          ============================================ */}
      <section className="relative min-h-[85vh] flex items-center bg-gradient-to-b from-[#eff4ff] via-white to-white overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-[#1F5CFF]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1F5CFF]/3 rounded-full blur-3xl" />
        </div>

        <Container className="relative z-10 pt-32 pb-16 lg:pt-40 lg:pb-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-5xl"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeInUp} className="mb-8">
              <span className="inline-flex items-center gap-3 text-gray-500 font-medium text-xs uppercase tracking-[0.2em]">
                <span className="w-8 h-px bg-gray-400" />
                {t('hero.eyebrow')}
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.03em] text-gray-900 mb-8 leading-[1.1]"
            >
              Research & Analysis
            </motion.h1>

            {/* Decorative line */}
            <motion.div
              variants={lineAnimation}
              className="w-32 h-px bg-gradient-to-r from-[#1F5CFF] to-blue-400 mb-8 origin-left"
            />

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-3xl mb-12"
            >
              {t('hero.subheadline')}
            </motion.p>

            {/* CTA buttons - institutional style */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#featured-research"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-lg"
              >
                {t('hero.primaryCta')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                href="/get-in-touch"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-700 font-semibold rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
              >
                {t('hero.secondaryCta')}
              </Link>
            </motion.div>
          </motion.div>
        </Container>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a
            href="#featured-research"
            className="flex flex-col items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Scroll to featured research"
          >
            <span className="text-xs uppercase tracking-wider">Explore</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </a>
        </motion.div>
      </section>

      {/* ============================================
          FEATURED RESEARCH SECTION
          Premium featured publication highlight
          ============================================ */}
      <section id="featured-research" className="relative py-20 lg:py-28 bg-white overflow-hidden">
        {/* Top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            {/* Section eyebrow */}
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-3 text-gray-500 font-medium text-xs uppercase tracking-[0.2em] mb-8"
            >
              <span className="w-8 h-px bg-gray-400" />
              {t('featured.eyebrow')}
            </motion.span>

            {/* Featured publication card */}
            <motion.div
              variants={fadeInUp}
              className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 overflow-hidden"
            >
              <div className="grid lg:grid-cols-12 gap-0">
                {/* Left: Visual/Icon area */}
                <div className="lg:col-span-4 bg-gradient-to-br from-gray-900 to-gray-800 p-8 lg:p-12 flex flex-col justify-center">
                  <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-6">
                    <BookOpen className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex items-center gap-3 text-white/60 text-sm">
                    <span className="text-[10px] uppercase tracking-[0.15em] bg-white/10 px-3 py-1 rounded-full">
                      Featured
                    </span>
                  </div>
                </div>

                {/* Right: Content */}
                <div className="lg:col-span-8 p-8 lg:p-12">
                  {/* Category and meta */}
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#1F5CFF] bg-[#1F5CFF]/5 px-3 py-1.5 rounded-full">
                      Observability
                    </span>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>18 min read</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        <span>Yieldge Research</span>
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-[-0.02em] text-gray-900 mb-6 leading-tight">
                    {t('featured.title')}
                  </h2>

                  {/* Summary */}
                  <p className="text-gray-600 leading-relaxed mb-8 max-w-2xl">
                    {t('featured.description')}
                  </p>

                  {/* CTA */}
                  <button className="group inline-flex items-center gap-3 px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300">
                    {t('featured.cta')}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ============================================
          RESEARCH AREAS SECTION
          Grid of research domains
          ============================================ */}
      <Section background="gray" id="research-areas">
        <Heading
          as="h2"
          size="3xl"
          eyebrow={t('areas.eyebrow')}
          subtitle={t('areas.subtitle')}
          centered
        >
          {t('areas.title')}
        </Heading>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {researchAreas.map((area, index) => (
            <ResearchAreaCard key={area} area={area} index={index} />
          ))}
        </motion.div>
      </Section>

      {/* ============================================
          LATEST RESEARCH SECTION
          Publication grid
          ============================================ */}
      <Section background="white" id="latest-research">
        <Heading
          as="h2"
          size="3xl"
          eyebrow={t('latest.eyebrow')}
          subtitle={t('latest.subtitle')}
          centered
        >
          {t('latest.title')}
        </Heading>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {publications.map((publication) => (
            <PublicationCard key={publication.id} publication={publication} />
          ))}
        </motion.div>
      </Section>

      {/* ============================================
          RESEARCH METHODOLOGY SECTION
          Credibility and rigor
          ============================================ */}
      <section className="relative py-20 lg:py-28 bg-gray-900 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.03) 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#1F5CFF]/10 rounded-full blur-3xl" />

        <Container className="relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
              className="lg:col-span-5"
            >
              <motion.span
                variants={fadeInUp}
                className="inline-flex items-center gap-3 text-gray-400 font-medium text-xs uppercase tracking-[0.2em] mb-6"
              >
                <span className="w-8 h-px bg-gray-600" />
                {t('methodology.eyebrow')}
              </motion.span>

              <motion.h2
                variants={fadeInUp}
                className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.02em] text-white mb-6"
              >
                {t('methodology.title')}
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                className="text-lg text-gray-300 leading-relaxed mb-6"
              >
                {t('methodology.subtitle')}
              </motion.p>

              <motion.p
                variants={fadeInUp}
                className="text-gray-400 leading-relaxed"
              >
                {t('methodology.description')}
              </motion.p>
            </motion.div>

            {/* Right: Sources grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
              className="lg:col-span-7"
            >
              <motion.h3
                variants={fadeInUp}
                className="text-lg font-semibold text-white mb-6"
              >
                {t('methodology.sources.title')}
              </motion.h3>

              <div className="grid sm:grid-cols-2 gap-4">
                {methodologySources.map((source) => {
                  const Icon = source.icon;
                  return (
                    <motion.div
                      key={source.key}
                      variants={fadeInUp}
                      className="flex items-start gap-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#1F5CFF]/20 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#1F5CFF]" />
                      </div>
                      <span className="text-gray-300 text-sm leading-relaxed pt-2">
                        {t(`methodology.sources.items.${source.key}`)}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ============================================
          RESEARCH METRICS SECTION
          Key statistics
          ============================================ */}
      <Section background="white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="text-center p-6 lg:p-8 rounded-lg bg-gray-50 border border-gray-200"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.02em] text-gray-900 mb-2">
                {metric.value}
              </div>
              <div className="text-sm text-gray-500 font-medium">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ============================================
          RESEARCH BRIEFING SECTION
          Newsletter subscription
          ============================================ */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        {/* Top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#1F5CFF]/5 rounded-full blur-3xl" />
        </div>

        <Container className="relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-3 text-gray-500 font-medium text-xs uppercase tracking-[0.2em] mb-6"
            >
              <span className="w-8 h-px bg-gray-400" />
              {t('newsletter.eyebrow')}
              <span className="w-8 h-px bg-gray-400" />
            </motion.span>

            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.02em] text-gray-900 mb-6"
            >
              {t('newsletter.title')}
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-600 leading-relaxed mb-10"
            >
              {t('newsletter.description')}
            </motion.p>

            {/* Subscription form */}
            <motion.form
              variants={fadeInUp}
              onSubmit={handleSubmit}
              className="max-w-xl mx-auto"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('newsletter.placeholder')}
                    className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1F5CFF] focus:ring-1 focus:ring-[#1F5CFF] transition-colors"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors shadow-lg"
                >
                  {t('newsletter.subscribe')}
                </button>
              </div>

              {/* Status messages */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center gap-2 mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Successfully subscribed!</span>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center gap-2 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
                >
                  <span>Please enter a valid email address.</span>
                </motion.div>
              )}

              <motion.p
                variants={fadeInUp}
                className="text-sm text-gray-500 mt-4"
              >
                {t('newsletter.privacy')}
              </motion.p>
            </motion.form>
          </motion.div>
        </Container>
      </section>

      {/* ============================================
          FINAL CTA SECTION
          Matching existing enterprise CTA patterns
          ============================================ */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        {/* Top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1F5CFF]/30 to-transparent" />

        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#1F5CFF]/5 rounded-full blur-3xl" />
        </div>

        <Container className="relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-3 text-gray-500 font-medium text-xs uppercase tracking-[0.2em] mb-6"
            >
              <span className="w-8 h-px bg-gray-400" />
              {t('cta.eyebrow')}
              <span className="w-8 h-px bg-gray-400" />
            </motion.span>

            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.02em] text-gray-900 mb-6"
            >
              {t('cta.title')}
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-600 leading-relaxed mb-10"
            >
              {t('cta.description')}
            </motion.p>

            <motion.div variants={fadeInUp}>
              <Link
                href="/get-in-touch"
                className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-lg"
              >
                {t('cta.button')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </>
  );
});

export default ResearchPageContent;
