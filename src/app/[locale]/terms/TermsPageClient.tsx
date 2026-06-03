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

export default function TermsPageClient() {
  const t = useTranslations('terms');

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
            {/* Nature of Professional Services */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                {t('sections.professionalServices.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('sections.professionalServices.description')}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {t('sections.professionalServices.noGuarantees')}
              </p>
            </section>

            {/* Independent Professional Judgment */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                {t('sections.professionalJudgment.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('sections.professionalJudgment.description')}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {t('sections.professionalJudgment.disclaimer')}
              </p>
            </section>

            {/* Client Responsibilities */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                {t('sections.clientResponsibilities.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('sections.clientResponsibilities.description')}
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>{t('sections.clientResponsibilities.items.accurate')}</li>
                <li>{t('sections.clientResponsibilities.items.review')}</li>
                <li>{t('sections.clientResponsibilities.items.validate')}</li>
                <li>{t('sections.clientResponsibilities.items.approvals')}</li>
                <li>{t('sections.clientResponsibilities.items.compliance')}</li>
              </ul>
            </section>

            {/* Client Decision Responsibility */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                {t('sections.decisionResponsibility.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t('sections.decisionResponsibility.description')}
              </p>
            </section>

            {/* Intellectual Property */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                {t('sections.intellectualProperty.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t('sections.intellectualProperty.description')}
              </p>
            </section>

            {/* Ownership of Deliverables */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                {t('sections.deliverables.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('sections.deliverables.description')}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {t('sections.deliverables.retained')}
              </p>
            </section>

            {/* Retained Knowledge */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                {t('sections.retainedKnowledge.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t('sections.retainedKnowledge.description')}
              </p>
            </section>

            {/* Confidentiality */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                {t('sections.confidentiality.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('sections.confidentiality.description')}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {t('sections.confidentiality.definition')}
              </p>
            </section>

            {/* Security and Information Protection */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                {t('sections.security.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('sections.security.description')}
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>{t('sections.security.items.access')}</li>
                <li>{t('sections.security.items.monitoring')}</li>
                <li>{t('sections.security.items.audit')}</li>
                <li>{t('sections.security.items.governance')}</li>
                <li>{t('sections.security.items.procedures')}</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                {t('sections.security.disclaimer')}
              </p>
            </section>

            {/* Artificial Intelligence Services */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                {t('sections.aiServices.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('sections.aiServices.description')}
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>{t('sections.aiServices.items.ai')}</li>
                <li>{t('sections.aiServices.items.ml')}</li>
                <li>{t('sections.aiServices.items.genai')}</li>
                <li>{t('sections.aiServices.items.agents')}</li>
                <li>{t('sections.aiServices.items.decision')}</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                {t('sections.aiServices.disclaimer')}
              </p>
              <p className="text-gray-600 leading-relaxed mt-2">
                {t('sections.aiServices.review')}
              </p>
            </section>

            {/* Responsible Artificial Intelligence */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                {t('sections.responsibleAI.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('sections.responsibleAI.description')}
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>{t('sections.responsibleAI.items.transparency')}</li>
                <li>{t('sections.responsibleAI.items.accountability')}</li>
                <li>{t('sections.responsibleAI.items.oversight')}</li>
                <li>{t('sections.responsibleAI.items.explainability')}</li>
                <li>{t('sections.responsibleAI.items.traceability')}</li>
                <li>{t('sections.responsibleAI.items.risk')}</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                {t('sections.responsibleAI.augment')}
              </p>
            </section>

            {/* Digital Governance, Observability and Traceability */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                {t('sections.governance.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('sections.governance.description')}
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>{t('sections.governance.items.visibility')}</li>
                <li>{t('sections.governance.items.observability')}</li>
                <li>{t('sections.governance.items.traceability')}</li>
                <li>{t('sections.governance.items.governanceItem')}</li>
                <li>{t('sections.governance.items.intelligence')}</li>
                <li>{t('sections.governance.items.auditability')}</li>
                <li>{t('sections.governance.items.monitoring')}</li>
                <li>{t('sections.governance.items.decision')}</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                {t('sections.governance.disclaimer')}
              </p>
            </section>

            {/* Third Party Platforms */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                {t('sections.thirdParty.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('sections.thirdParty.description')}
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>{t('sections.thirdParty.items.cloud')}</li>
                <li>{t('sections.thirdParty.items.apis')}</li>
                <li>{t('sections.thirdParty.items.telecom')}</li>
                <li>{t('sections.thirdParty.items.software')}</li>
                <li>{t('sections.thirdParty.items.infrastructure')}</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                {t('sections.thirdParty.disclaimer')}
              </p>
            </section>

            {/* No Reliance by Third Parties */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                {t('sections.noReliance.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t('sections.noReliance.description')}
              </p>
            </section>

            {/* Disclaimer of Warranties */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                {t('sections.warranties.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('sections.warranties.description')}
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>{t('sections.warranties.items.merchantability')}</li>
                <li>{t('sections.warranties.items.fitness')}</li>
                <li>{t('sections.warranties.items.availability')}</li>
                <li>{t('sections.warranties.items.nonInfringement')}</li>
                <li>{t('sections.warranties.items.performance')}</li>
                <li>{t('sections.warranties.items.accuracy')}</li>
                <li>{t('sections.warranties.items.uninterrupted')}</li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                {t('sections.liability.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('sections.liability.description')}
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>{t('sections.liability.items.profits')}</li>
                <li>{t('sections.liability.items.revenue')}</li>
                <li>{t('sections.liability.items.opportunity')}</li>
                <li>{t('sections.liability.items.business')}</li>
                <li>{t('sections.liability.items.goodwill')}</li>
                <li>{t('sections.liability.items.interruption')}</li>
                <li>{t('sections.liability.items.reputation')}</li>
                <li>{t('sections.liability.items.indirect')}</li>
                <li>{t('sections.liability.items.consequential')}</li>
                <li>{t('sections.liability.items.special')}</li>
                <li>{t('sections.liability.items.punitive')}</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                {t('sections.liability.cap')}
              </p>
            </section>

            {/* Regulatory Environments */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                {t('sections.regulatory.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('sections.regulatory.description')}
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>{t('sections.regulatory.items.financial')}</li>
                <li>{t('sections.regulatory.items.government')}</li>
                <li>{t('sections.regulatory.items.healthcare')}</li>
                <li>{t('sections.regulatory.items.insurance')}</li>
                <li>{t('sections.regulatory.items.critical')}</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                {t('sections.regulatory.additional')}
              </p>
            </section>

            {/* Force Majeure */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                {t('sections.forceMajeure.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t('sections.forceMajeure.description')}
              </p>
            </section>

            {/* Governing Law */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                {t('sections.governingLaw.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t('sections.governingLaw.description')}
              </p>
            </section>

            {/* Changes to Terms */}
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
                <a href="mailto:legal@yieldge.com" className="text-[#1F5CFF] hover:underline">
                  legal@yieldge.com
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
