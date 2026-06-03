'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
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
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

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
                className="block text-gray-500 font-medium text-xs uppercase tracking-[0.2em] mb-4 sm:mb-5"
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
        <Section background="white">
          <div className="max-w-4xl mx-auto prose prose-gray">
            {/* Information We Collect */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                {t('sections.informationCollect.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('sections.informationCollect.description')}
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>{t('sections.informationCollect.items.personal')}</li>
                <li>{t('sections.informationCollect.items.contact')}</li>
                <li>{t('sections.informationCollect.items.business')}</li>
                <li>{t('sections.informationCollect.items.device')}</li>
                <li>{t('sections.informationCollect.items.technical')}</li>
                <li>{t('sections.informationCollect.items.usage')}</li>
                <li>{t('sections.informationCollect.items.communication')}</li>
              </ul>
            </section>

            {/* How We Use Information */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                {t('sections.howWeUse.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('sections.howWeUse.description')}
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>{t('sections.howWeUse.items.delivery')}</li>
                <li>{t('sections.howWeUse.items.support')}</li>
                <li>{t('sections.howWeUse.items.security')}</li>
                <li>{t('sections.howWeUse.items.compliance')}</li>
                <li>{t('sections.howWeUse.items.communications')}</li>
                <li>{t('sections.howWeUse.items.analytics')}</li>
                <li>{t('sections.howWeUse.items.improvement')}</li>
              </ul>
            </section>

            {/* Data Governance */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                {t('sections.dataGovernance.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('sections.dataGovernance.description')}
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>{t('sections.dataGovernance.items.accountability')}</li>
                <li>{t('sections.dataGovernance.items.traceability')}</li>
                <li>{t('sections.dataGovernance.items.access')}</li>
                <li>{t('sections.dataGovernance.items.stewardship')}</li>
                <li>{t('sections.dataGovernance.items.lifecycle')}</li>
                <li>{t('sections.dataGovernance.items.responsible')}</li>
              </ul>
            </section>

            {/* Data Security */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                {t('sections.dataSecurity.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('sections.dataSecurity.description')}
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>{t('sections.dataSecurity.items.access')}</li>
                <li>{t('sections.dataSecurity.items.authentication')}</li>
                <li>{t('sections.dataSecurity.items.encryption')}</li>
                <li>{t('sections.dataSecurity.items.monitoring')}</li>
                <li>{t('sections.dataSecurity.items.audit')}</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                {t('sections.dataSecurity.disclaimer')}
              </p>
            </section>

            {/* Information Sharing */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                {t('sections.informationSharing.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('sections.informationSharing.description')}
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>{t('sections.informationSharing.items.serviceProviders')}</li>
                <li>{t('sections.informationSharing.items.cloudProviders')}</li>
                <li>{t('sections.informationSharing.items.legal')}</li>
                <li>{t('sections.informationSharing.items.business')}</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4 font-medium">
                {t('sections.informationSharing.noSale')}
              </p>
            </section>

            {/* Artificial Intelligence Processing */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                {t('sections.aiProcessing.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t('sections.aiProcessing.description')}
              </p>
            </section>

            {/* Responsible AI Processing */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                {t('sections.responsibleAI.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t('sections.responsibleAI.description')}
              </p>
            </section>

            {/* International Transfers */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                {t('sections.internationalTransfers.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t('sections.internationalTransfers.description')}
              </p>
            </section>

            {/* Data Retention */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                {t('sections.dataRetention.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t('sections.dataRetention.description')}
              </p>
            </section>

            {/* User Rights */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                {t('sections.userRights.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('sections.userRights.description')}
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>{t('sections.userRights.items.access')}</li>
                <li>{t('sections.userRights.items.correction')}</li>
                <li>{t('sections.userRights.items.deletion')}</li>
                <li>{t('sections.userRights.items.restriction')}</li>
                <li>{t('sections.userRights.items.clarification')}</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                {t('sections.userRights.exercise')}
              </p>
            </section>

            {/* Cookies and Analytics */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                {t('sections.cookies.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('sections.cookies.description')}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {t('sections.cookies.management')}
              </p>
            </section>

            {/* Incident Response */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                {t('sections.incidentResponse.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t('sections.incidentResponse.description')}
              </p>
            </section>

            {/* Regulatory Compliance */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                {t('sections.regulatoryCompliance.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t('sections.regulatoryCompliance.description')}
              </p>
            </section>

            {/* Changes to Policy */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                {t('sections.changes.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t('sections.changes.description')}
              </p>
            </section>

            {/* Contact */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                {t('sections.contact.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t('sections.contact.description')}
              </p>
              <p className="text-gray-600 mt-2">
                <a href="mailto:privacy@yieldge.com" className="text-[#1F5CFF] hover:underline">
                  privacy@yieldge.com
                </a>
              </p>
            </section>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
