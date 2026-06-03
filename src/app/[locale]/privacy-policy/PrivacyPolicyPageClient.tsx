'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import Container from '@/components/ui/Container';
import { useTranslations } from 'next-intl';

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
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

interface SectionBlockProps {
  title: string;
  children: React.ReactNode;
  index: number;
}

function SectionBlock({ title, children, index }: SectionBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="mb-10 pb-10 border-b border-gray-100 last:border-b-0 last:pb-0"
    >
      <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-gray-900 mb-4">
        {title}
      </h2>
      <div className="text-gray-700 leading-relaxed space-y-4">
        {children}
      </div>
    </motion.div>
  );
}

export default function PrivacyPolicyPageClient() {
  const t = useTranslations('privacyPolicy');

  return (
    <div className="min-h-screen bg-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-[#1F5CFF] focus:text-white focus:rounded-full focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>
      <Navbar />
      <StickyCTA />

      <main id="main-content">
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 bg-gradient-to-b from-[#eff4ff] via-white to-white">
          <Container>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-4xl"
            >
              <motion.span
                variants={fadeInUp}
                className="inline-block text-[#1F5CFF] font-medium text-xs uppercase tracking-[0.2em] mb-4 sm:mb-5 bg-[#eff4ff] px-3 py-1 rounded-full"
              >
                {t('lastUpdated')}
              </motion.span>
              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-gray-900 mb-6"
              >
                {t('title')}
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl"
              >
                {t('introduction')}
              </motion.p>
            </motion.div>
          </Container>
        </section>

        {/* Content Section */}
        <section className="py-16 sm:py-20 lg:py-24">
          <Container>
            <div className="max-w-4xl mx-auto">
              {/* Information We Collect */}
              <SectionBlock title={t('sections.informationCollect.title')} index={0}>
                <p>{t('sections.informationCollect.description')}</p>
                <ul className="list-none space-y-3 mt-4">
                  {['personal', 'contact', 'business', 'device', 'technical', 'usage', 'communication'].map((item, i) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-[#eff4ff] text-[#1F5CFF] rounded-full flex items-center justify-center text-xs font-semibold mt-0.5">
                        {i + 1}
                      </span>
                      <span>{t(`sections.informationCollect.items.${item}`)}</span>
                    </li>
                  ))}
                </ul>
              </SectionBlock>

              {/* How We Use Information */}
              <SectionBlock title={t('sections.howWeUse.title')} index={1}>
                <p>{t('sections.howWeUse.description')}</p>
                <ul className="list-none space-y-3 mt-4">
                  {['delivery', 'support', 'security', 'compliance', 'communications', 'analytics', 'improvement'].map((item, i) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-[#eff4ff] text-[#1F5CFF] rounded-full flex items-center justify-center text-xs font-semibold mt-0.5">
                        {i + 1}
                      </span>
                      <span>{t(`sections.howWeUse.items.${item}`)}</span>
                    </li>
                  ))}
                </ul>
              </SectionBlock>

              {/* Data Governance */}
              <SectionBlock title={t('sections.dataGovernance.title')} index={2}>
                <p>{t('sections.dataGovernance.description')}</p>
                <ul className="list-none space-y-3 mt-4">
                  {['accountability', 'traceability', 'access', 'stewardship', 'lifecycle', 'responsible'].map((item, i) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-[#eff4ff] text-[#1F5CFF] rounded-full flex items-center justify-center text-xs font-semibold mt-0.5">
                        {i + 1}
                      </span>
                      <span>{t(`sections.dataGovernance.items.${item}`)}</span>
                    </li>
                  ))}
                </ul>
              </SectionBlock>

              {/* Data Security */}
              <SectionBlock title={t('sections.dataSecurity.title')} index={3}>
                <p>{t('sections.dataSecurity.description')}</p>
                <ul className="list-none space-y-3 mt-4">
                  {['access', 'authentication', 'encryption', 'monitoring', 'audit'].map((item, i) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-[#eff4ff] text-[#1F5CFF] rounded-full flex items-center justify-center text-xs font-semibold mt-0.5">
                        {i + 1}
                      </span>
                      <span>{t(`sections.dataSecurity.items.${item}`)}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-600 text-sm">
                  {t('sections.dataSecurity.disclaimer')}
                </p>
              </SectionBlock>

              {/* Information Sharing */}
              <SectionBlock title={t('sections.informationSharing.title')} index={4}>
                <p>{t('sections.informationSharing.description')}</p>
                <ul className="list-none space-y-3 mt-4">
                  {['serviceProviders', 'cloudProviders', 'legal', 'business'].map((item, i) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-[#eff4ff] text-[#1F5CFF] rounded-full flex items-center justify-center text-xs font-semibold mt-0.5">
                        {i + 1}
                      </span>
                      <span>{t(`sections.informationSharing.items.${item}`)}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200 text-green-800 font-medium">
                  {t('sections.informationSharing.noSale')}
                </p>
              </SectionBlock>

              {/* AI Processing */}
              <SectionBlock title={t('sections.aiProcessing.title')} index={5}>
                <p>{t('sections.aiProcessing.description')}</p>
              </SectionBlock>

              {/* Responsible AI */}
              <SectionBlock title={t('sections.responsibleAI.title')} index={6}>
                <p>{t('sections.responsibleAI.description')}</p>
              </SectionBlock>

              {/* International Transfers */}
              <SectionBlock title={t('sections.internationalTransfers.title')} index={7}>
                <p>{t('sections.internationalTransfers.description')}</p>
              </SectionBlock>

              {/* Data Retention */}
              <SectionBlock title={t('sections.dataRetention.title')} index={8}>
                <p>{t('sections.dataRetention.description')}</p>
              </SectionBlock>

              {/* User Rights */}
              <SectionBlock title={t('sections.userRights.title')} index={9}>
                <p>{t('sections.userRights.description')}</p>
                <ul className="list-none space-y-3 mt-4">
                  {['access', 'correction', 'deletion', 'restriction', 'clarification'].map((item, i) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-[#eff4ff] text-[#1F5CFF] rounded-full flex items-center justify-center text-xs font-semibold mt-0.5">
                        {i + 1}
                      </span>
                      <span>{t(`sections.userRights.items.${item}`)}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4">{t('sections.userRights.exercise')}</p>
              </SectionBlock>

              {/* Cookies */}
              <SectionBlock title={t('sections.cookies.title')} index={10}>
                <p>{t('sections.cookies.description')}</p>
                <p className="mt-4">{t('sections.cookies.management')}</p>
              </SectionBlock>

              {/* Incident Response */}
              <SectionBlock title={t('sections.incidentResponse.title')} index={11}>
                <p>{t('sections.incidentResponse.description')}</p>
              </SectionBlock>

              {/* Regulatory Compliance */}
              <SectionBlock title={t('sections.regulatoryCompliance.title')} index={12}>
                <p>{t('sections.regulatoryCompliance.description')}</p>
              </SectionBlock>

              {/* Changes */}
              <SectionBlock title={t('sections.changes.title')} index={13}>
                <p>{t('sections.changes.description')}</p>
              </SectionBlock>

              {/* Contact */}
              <SectionBlock title={t('sections.contact.title')} index={14}>
                <p>{t('sections.contact.description')}</p>
                <div className="mt-4 p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <a
                    href="mailto:privacy@yieldge.com"
                    className="text-[#1F5CFF] hover:text-[#1a4edb] font-semibold text-lg flex items-center gap-2 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    privacy@yieldge.com
                  </a>
                </div>
              </SectionBlock>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
