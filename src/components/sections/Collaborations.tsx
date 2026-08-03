'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

interface CompanyLogo {
  name: string;
  logo: string;
  url?: string;
  large?: boolean;
}

const logos: CompanyLogo[] = [
  {
    name: '3M',
    logo: '/assets/logos/3m.png',
  },
  {
    name: 'GastroMedical CR',
    logo: '/assets/logos/drzuniga-logo.png',
    large: true,
  },
  {
    name: 'PHYC',
    logo: '/assets/logos/phyclogo-removedbg.png',
  },
  {
    name: 'HS',
    logo: '/assets/logos/hslogo.png',
  },
  {
    name: 'Logo',
    logo: '/assets/logos/construrack.png',
  },
  {
    name: 'Quant Energy',
    logo: '/assets/logos/quant_energy.png',
  },
];

export default function Collaborations() {
  const t = useTranslations('homepage.collaborations');
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
    <section
      id="collaborations"
      className="relative bg-gradient-to-b from-white to-[#eff4ff]/20 py-16 sm:py-20 lg:py-24 overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#dbe6ff]/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1, margin: '0px 0px -100px 0px' }}
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

              <div
                className="flex-1 overflow-hidden"
                aria-label="Company logos carousel"
              >
                <div
                  className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-out' : ''}`}
                  style={{
                    transform: `translateX(-${currentIndex * itemWidthPercent}%)`,
                  }}
                >
                  {extendedLogos.map((company, index) => {
                    const LogoWrapper = company.url ? 'a' : 'div';
                    const linkProps = company.url
                      ? {
                          href: company.url,
                          target: '_blank' as const,
                          rel: 'noopener noreferrer' as const,
                        }
                      : {};
                    const isLarge = company.large ?? false;

                    return (
                      <div
                        key={`${company.name}-${index}`}
                        className="flex-shrink-0 px-4 sm:px-6 lg:px-8 group/logo"
                        style={{ width: `${itemWidthPercent}%` }}
                      >
                        <LogoWrapper
                          {...linkProps}
                          className={`block ${company.url ? 'cursor-pointer' : 'cursor-default'}`}
                        >
                          <div
                            className="relative w-full h-86 sm:h-72 lg:h-86 flex items-center justify-center"
                          >
                            <Image
                              src={company.logo}
                              alt={`${company.name} logo`}
                              width={isLarge ? logoSizeLarge : logoSize}
                              height={isLarge ? 346 : 269}
                              className={`${logoHeightClass} max-w-full object-contain`}
                              sizes={isLarge ? '720px' : '576px'}
                            />
                          </div>
                        </LogoWrapper>
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
