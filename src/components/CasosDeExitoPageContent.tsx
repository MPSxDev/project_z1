'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Building2, CheckCircle2, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import Container from '@/components/ui/Container';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';

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
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

// Logos data
interface CompanyLogo {
  name: string;
  logo: string;
  url?: string;
  large?: boolean;
}

const logos: CompanyLogo[] = [
  { name: '3M', logo: '/assets/logos/3m.png' },
  { name: 'GastroMedical CR', logo: '/assets/logos/drzuniga-logo.png', large: true },
  { name: 'PHYC', logo: '/assets/logos/phyclogo-removedbg.png' },
  { name: 'HS', logo: '/assets/logos/hslogo.png' },
  { name: 'Quant Energy', logo: '/assets/logos/quant_energy.png' },
];

// Impact pillars icons (using same icons as main page)
const pillarIcons = [
  { src: '/assets/iconset/icons/1.svg', alt: 'Presencia Digital' },
  { src: '/assets/iconset/icons/2.svg', alt: 'Eficiencia Operativa' },
  { src: '/assets/iconset/icons/3.svg', alt: 'Experiencia Digital' },
  { src: '/assets/iconset/icons/4.svg', alt: 'Capacitación y Adopción Tecnológica' },
  { src: '/assets/iconset/icons/5.svg', alt: 'Staff Augmentation' },
  { src: '/assets/iconset/minified/Scalable-Infrastructure.png', alt: 'Modernización Tecnológica' },
];

// Impact pillars data
const impactPillars = [
  {
    icon: pillarIcons[0],
    title: 'Presencia Digital',
    description: 'Diseñamos experiencias digitales modernas que fortalecen la percepción de marca, mejoran la comunicación con los clientes y aumentan la capacidad de generación de oportunidades de negocio.',
  },
  {
    icon: pillarIcons[1],
    title: 'Eficiencia Operativa',
    description: 'Identificamos procesos manuales, cuellos de botella y tareas repetitivas para implementar soluciones que permitan operar con mayor velocidad, precisión y escalabilidad.',
  },
  {
    icon: pillarIcons[2],
    title: 'Experiencia Digital',
    description: 'Creamos plataformas intuitivas, accesibles y centradas en el usuario para que cada interacción digital refleje la calidad y profesionalismo de la organización.',
  },
  {
    icon: pillarIcons[3],
    title: 'Capacitación y Adopción Tecnológica',
    description: 'Ayudamos a los equipos a maximizar el valor de sus herramientas digitales mediante capacitaciones prácticas en inteligencia artificial, productividad, automatización y transformación digital, acelerando la adopción tecnológica y el retorno de inversión.',
  },
  {
    icon: pillarIcons[4],
    title: 'Staff Augmentation',
    description: 'Integramos profesionales especializados a sus equipos para fortalecer capacidades técnicas, acelerar iniciativas estratégicas y ejecutar proyectos con mayor velocidad, flexibilidad y eficiencia, manteniendo altos estándares de calidad y continuidad operativa.',
  },
  {
    icon: pillarIcons[5],
    title: 'Modernización Tecnológica',
    description: 'Evaluamos plataformas, procesos y sistemas existentes para identificar oportunidades de mejora, reducir deuda tecnológica y preparar a la organización para crecer con una infraestructura más moderna, segura y escalable.',
  },
];

// Case studies data
const caseStudies = [
  {
    client: 'Physical Care Fisioterapia',
    industry: 'Salud y Rehabilitación',
    challenge: 'Comunicar digitalmente el nivel de excelencia, innovación y liderazgo de una de las clínicas de rehabilitación y terapia física más avanzadas de Costa Rica.',
    solution: 'Acompañamiento en un proceso integral de transformación digital orientado a fortalecer la presencia digital de la organización, mejorar la experiencia de los usuarios y proyectar adecuadamente sus capacidades, especialización y liderazgo en rehabilitación física.',
    impact: 'Una presencia digital más sólida, moderna y profesional, alineada con la calidad clínica, la innovación tecnológica y el posicionamiento de una de las clínicas de terapia física con mayor nivel de tecnología y equipamiento especializado del país.',
  },
  {
    client: 'GastroMedical Costa Rica',
    industry: 'Salud',
    challenge: 'Fortalecer la visibilidad digital y preparar una estrategia enfocada en turismo médico.',
    solution: 'Optimización del sitio web, análisis de experiencia digital y desarrollo de nuevas oportunidades orientadas a pacientes internacionales.',
    impact: 'Mayor preparación para atraer nuevos mercados y fortalecer el posicionamiento digital de la organización.',
  },
];

// Methodology steps
const methodologySteps = [
  {
    number: '01',
    title: 'Descubrimiento',
    description: 'Analizamos procesos, sistemas y objetivos estratégicos.',
  },
  {
    number: '02',
    title: 'Identificación de Oportunidades',
    description: 'Detectamos áreas de mejora con mayor potencial de impacto.',
  },
  {
    number: '03',
    title: 'Implementación',
    description: 'Diseñamos y ejecutamos soluciones tecnológicas alineadas con las necesidades del negocio.',
  },
  {
    number: '04',
    title: 'Optimización Continua',
    description: 'Medimos resultados y realizamos mejoras iterativas para maximizar el retorno de inversión.',
  },
];

// Hero Section
function HeroSection() {
  const t = useTranslations('casosDeExito.hero');

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
            className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-6"
          >
            {t('subtitle1')}
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-12"
          >
            {t('subtitle2')}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex justify-center"
          >
            <a
              href="#clientes"
              className="inline-flex flex-col items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors duration-200 group"
            >
              <span className="text-sm font-medium">{t('scrollCta')}</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown className="w-6 h-6" />
              </motion.div>
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

// Client Logos Section
function ClientLogosSection() {
  const t = useTranslations('casosDeExito.logos');
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

  const logoHeightClass = 'max-h-80 sm:max-h-72 lg:max-h-80';
  const logoSize = 576;
  const logoSizeLarge = 720;
  const extendedLogos = [...logos, ...logos, ...logos];
  const itemWidthPercent = 100 / visibleCount;

  return (
    <section id="clientes" className="relative bg-gradient-to-b from-white to-[#eff4ff]/20 py-16 sm:py-20 lg:py-24 overflow-hidden scroll-mt-16">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#dbe6ff]/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
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

              <div className="flex-1 overflow-hidden" aria-label="Company logos carousel">
                <div
                  className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-out' : ''}`}
                  style={{ transform: `translateX(-${currentIndex * itemWidthPercent}%)` }}
                >
                  {extendedLogos.map((company, index) => {
                    const isLarge = company.large ?? false;
                    return (
                      <div
                        key={`${company.name}-${index}`}
                        className="flex-shrink-0 px-4 sm:px-6 lg:px-8 group/logo"
                        style={{ width: `${itemWidthPercent}%` }}
                      >
                        <div className="block cursor-default">
                          <div className="relative w-full h-86 sm:h-72 lg:h-86 flex items-center justify-center">
                            <Image
                              src={company.logo}
                              alt={`${company.name} logo`}
                              width={isLarge ? logoSizeLarge : logoSize}
                              height={isLarge ? 346 : 269}
                              className={`${logoHeightClass} max-w-full object-contain`}
                              sizes={isLarge ? '720px' : '576px'}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
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

// Value Creation Section
function ValueCreationSection() {
  const t = useTranslations('casosDeExito.valueCreation');

  return (
    <section className="relative bg-white py-20 sm:py-24 lg:py-32 overflow-hidden">
      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
            <motion.span
              variants={fadeInUp}
              className="block text-[#1F5CFF] font-medium text-xs uppercase tracking-[0.2em] mb-4"
            >
              {t('eyebrow')}
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-6 leading-tight"
            >
              {t('title')}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4"
            >
              {t('description1')}
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg text-gray-600 leading-relaxed"
            >
              {t('description2')}
            </motion.p>
          </div>

          {/* Impact Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {impactPillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                variants={scaleIn}
                custom={index}
                className="group relative bg-white rounded-2xl p-8 lg:p-10 border border-gray-200 hover:border-[#1F5CFF]/30 hover:shadow-xl hover:shadow-[#1F5CFF]/5 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center mb-6">
                  <div className="relative w-8 h-8">
                    <Image
                      src={pillar.icon.src}
                      alt={pillar.icon.alt}
                      fill
                      draggable={false}
                      className="object-contain opacity-70"
                    />
                  </div>
                </div>
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-4">
                  {pillar.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

// Case Studies Section
function CaseStudiesSection() {
  const t = useTranslations('casosDeExito.caseStudies');

  return (
    <section id="casos-destacados" className="relative bg-gradient-to-b from-[#eff4ff]/30 to-white py-20 sm:py-24 lg:py-32 overflow-hidden">
      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
            <motion.span
              variants={fadeInUp}
              className="block text-[#1F5CFF] font-medium text-xs uppercase tracking-[0.2em] mb-4"
            >
              {t('eyebrow')}
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-6 leading-tight"
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

          {/* Case Study Cards */}
          <div className="space-y-8 lg:space-y-12">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.client}
                variants={fadeInUp}
                className="group relative bg-white rounded-2xl lg:rounded-3xl overflow-hidden border border-gray-200 hover:border-[#1F5CFF]/20 hover:shadow-2xl hover:shadow-[#1F5CFF]/5 transition-all duration-500"
              >
                <div className="p-8 sm:p-10 lg:p-12">
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 pb-8 border-b border-gray-100">
                    <div>
                      <span className="inline-block text-[#1F5CFF] text-sm font-medium uppercase tracking-wider mb-2">
                        {t('case')} {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                        {study.client}
                      </h3>
                    </div>
                    <div className="mt-4 lg:mt-0">
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                        <Building2 className="w-4 h-4" />
                        {study.industry}
                      </span>
                    </div>
                  </div>

                  {/* Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        {t('challenge')}
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        {study.challenge}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        {t('solution')}
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        {study.solution}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#1F5CFF] uppercase tracking-wider mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        {t('impact')}
                      </h4>
                      <p className="text-gray-900 font-medium leading-relaxed">
                        {study.impact}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

// Methodology Section
function MethodologySection() {
  const t = useTranslations('casosDeExito.methodology');

  return (
    <section className="relative bg-white py-20 sm:py-24 lg:py-32 overflow-hidden">
      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
            <motion.span
              variants={fadeInUp}
              className="block text-[#1F5CFF] font-medium text-xs uppercase tracking-[0.2em] mb-4"
            >
              {t('eyebrow')}
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-tight"
            >
              {t('title')}
            </motion.h2>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#1F5CFF]/20 to-transparent -translate-y-1/2" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
              {methodologySteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  variants={fadeInUp}
                  custom={index}
                  className="relative group"
                >
                  <div className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-200 hover:border-[#1F5CFF]/30 hover:shadow-xl transition-all duration-300 h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-4xl lg:text-5xl font-bold text-[#1F5CFF]/20 group-hover:text-[#1F5CFF]/40 transition-colors duration-300">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

// Final CTA Section
function FinalCTASection() {
  const t = useTranslations('casosDeExito.finalCta');

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 py-20 sm:py-24 lg:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1F5CFF]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1F5CFF]/5 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-tight"
          >
            {t('title')}
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-4 max-w-3xl mx-auto"
          >
            {t('description1')}
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-10 max-w-3xl mx-auto"
          >
            {t('description2')}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              href="/get-in-touch"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {t('primaryCta')}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/get-in-touch"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-transparent text-white font-medium rounded-lg border border-white/30 hover:bg-white/10 hover:border-white/50 transition-colors duration-200"
            >
              {t('secondaryCta')}
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

// Main Page Content
export default function CasosDeExitoPageContent() {
  return (
    <div className="bg-white">
      <HeroSection />
      <ClientLogosSection />
      <ValueCreationSection />
      <MethodologySection />
      <FinalCTASection />
    </div>
  );
}
