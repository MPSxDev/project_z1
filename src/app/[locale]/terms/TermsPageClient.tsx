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
              {/* Nature of Professional Services */}
              <SectionBlock title={t('sections.professionalServices.title')} index={0}>
                <p>{t('sections.professionalServices.description')}</p>
                <p className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200 text-amber-800 text-sm">
                  {t('sections.professionalServices.noGuarantees')}
                </p>
              </SectionBlock>

              {/* Independent Professional Judgment */}
              <SectionBlock title={t('sections.professionalJudgment.title')} index={1}>
                <p>{t('sections.professionalJudgment.description')}</p>
                <p className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-600 text-sm">
                  {t('sections.professionalJudgment.disclaimer')}
                </p>
              </SectionBlock>

              {/* Client Responsibilities */}
              <SectionBlock title={t('sections.clientResponsibilities.title')} index={2}>
                <p>{t('sections.clientResponsibilities.description')}</p>
                <ul className="list-none space-y-3 mt-4">
                  {['accurate', 'review', 'validate', 'approvals', 'compliance'].map((item, i) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-[#eff4ff] text-[#1F5CFF] rounded-full flex items-center justify-center text-xs font-semibold mt-0.5">
                        {i + 1}
                      </span>
                      <span>{t(`sections.clientResponsibilities.items.${item}`)}</span>
                    </li>
                  ))}
                </ul>
              </SectionBlock>

              {/* Client Decision Responsibility */}
              <SectionBlock title={t('sections.decisionResponsibility.title')} index={3}>
                <p>{t('sections.decisionResponsibility.description')}</p>
              </SectionBlock>

              {/* Intellectual Property */}
              <SectionBlock title={t('sections.intellectualProperty.title')} index={4}>
                <p>{t('sections.intellectualProperty.description')}</p>
              </SectionBlock>

              {/* Ownership of Deliverables */}
              <SectionBlock title={t('sections.deliverables.title')} index={5}>
                <p>{t('sections.deliverables.description')}</p>
                <p className="mt-4">{t('sections.deliverables.retained')}</p>
              </SectionBlock>

              {/* Retained Knowledge */}
              <SectionBlock title={t('sections.retainedKnowledge.title')} index={6}>
                <p>{t('sections.retainedKnowledge.description')}</p>
              </SectionBlock>

              {/* Confidentiality */}
              <SectionBlock title={t('sections.confidentiality.title')} index={7}>
                <p>{t('sections.confidentiality.description')}</p>
                <p className="mt-4">{t('sections.confidentiality.definition')}</p>
              </SectionBlock>

              {/* Security and Information Protection */}
              <SectionBlock title={t('sections.security.title')} index={8}>
                <p>{t('sections.security.description')}</p>
                <ul className="list-none space-y-3 mt-4">
                  {['access', 'monitoring', 'audit', 'governance', 'procedures'].map((item, i) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-[#eff4ff] text-[#1F5CFF] rounded-full flex items-center justify-center text-xs font-semibold mt-0.5">
                        {i + 1}
                      </span>
                      <span>{t(`sections.security.items.${item}`)}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-600 text-sm">
                  {t('sections.security.disclaimer')}
                </p>
              </SectionBlock>

              {/* Artificial Intelligence Services */}
              <SectionBlock title={t('sections.aiServices.title')} index={9}>
                <p>{t('sections.aiServices.description')}</p>
                <ul className="list-none space-y-3 mt-4">
                  {['ai', 'ml', 'genai', 'agents', 'decision'].map((item, i) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-[#eff4ff] text-[#1F5CFF] rounded-full flex items-center justify-center text-xs font-semibold mt-0.5">
                        {i + 1}
                      </span>
                      <span>{t(`sections.aiServices.items.${item}`)}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200 text-amber-800 text-sm">
                  {t('sections.aiServices.disclaimer')}
                </p>
                <p className="mt-4">{t('sections.aiServices.review')}</p>
              </SectionBlock>

              {/* Responsible Artificial Intelligence */}
              <SectionBlock title={t('sections.responsibleAI.title')} index={10}>
                <p>{t('sections.responsibleAI.description')}</p>
                <ul className="list-none space-y-3 mt-4">
                  {['transparency', 'accountability', 'oversight', 'explainability', 'traceability', 'risk'].map((item, i) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-[#eff4ff] text-[#1F5CFF] rounded-full flex items-center justify-center text-xs font-semibold mt-0.5">
                        {i + 1}
                      </span>
                      <span>{t(`sections.responsibleAI.items.${item}`)}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4">{t('sections.responsibleAI.augment')}</p>
              </SectionBlock>

              {/* Digital Governance, Observability and Traceability */}
              <SectionBlock title={t('sections.governance.title')} index={11}>
                <p>{t('sections.governance.description')}</p>
                <ul className="list-none space-y-3 mt-4">
                  {['visibility', 'observability', 'traceability', 'governanceItem', 'intelligence', 'auditability', 'monitoring', 'decision'].map((item, i) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-[#eff4ff] text-[#1F5CFF] rounded-full flex items-center justify-center text-xs font-semibold mt-0.5">
                        {i + 1}
                      </span>
                      <span>{t(`sections.governance.items.${item}`)}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-600 text-sm">
                  {t('sections.governance.disclaimer')}
                </p>
              </SectionBlock>

              {/* Third Party Platforms */}
              <SectionBlock title={t('sections.thirdParty.title')} index={12}>
                <p>{t('sections.thirdParty.description')}</p>
                <ul className="list-none space-y-3 mt-4">
                  {['cloud', 'apis', 'telecom', 'software', 'infrastructure'].map((item, i) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-[#eff4ff] text-[#1F5CFF] rounded-full flex items-center justify-center text-xs font-semibold mt-0.5">
                        {i + 1}
                      </span>
                      <span>{t(`sections.thirdParty.items.${item}`)}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-600 text-sm">
                  {t('sections.thirdParty.disclaimer')}
                </p>
              </SectionBlock>

              {/* No Reliance by Third Parties */}
              <SectionBlock title={t('sections.noReliance.title')} index={13}>
                <p>{t('sections.noReliance.description')}</p>
              </SectionBlock>

              {/* Disclaimer of Warranties */}
              <SectionBlock title={t('sections.warranties.title')} index={14}>
                <p>{t('sections.warranties.description')}</p>
                <ul className="list-none space-y-3 mt-4">
                  {['merchantability', 'fitness', 'availability', 'nonInfringement', 'performance', 'accuracy', 'uninterrupted'].map((item, i) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-red-50 text-red-600 rounded-full flex items-center justify-center text-xs font-semibold mt-0.5">
                        {i + 1}
                      </span>
                      <span>{t(`sections.warranties.items.${item}`)}</span>
                    </li>
                  ))}
                </ul>
              </SectionBlock>

              {/* Limitation of Liability */}
              <SectionBlock title={t('sections.liability.title')} index={15}>
                <p>{t('sections.liability.description')}</p>
                <ul className="list-none space-y-3 mt-4">
                  {['profits', 'revenue', 'opportunity', 'business', 'goodwill', 'interruption', 'reputation', 'indirect', 'consequential', 'special', 'punitive'].map((item, i) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-red-50 text-red-600 rounded-full flex items-center justify-center text-xs font-semibold mt-0.5">
                        {i + 1}
                      </span>
                      <span>{t(`sections.liability.items.${item}`)}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200 text-amber-800 text-sm font-medium">
                  {t('sections.liability.cap')}
                </p>
              </SectionBlock>

              {/* Regulatory Environments */}
              <SectionBlock title={t('sections.regulatory.title')} index={16}>
                <p>{t('sections.regulatory.description')}</p>
                <ul className="list-none space-y-3 mt-4">
                  {['financial', 'government', 'healthcare', 'insurance', 'critical'].map((item, i) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-[#eff4ff] text-[#1F5CFF] rounded-full flex items-center justify-center text-xs font-semibold mt-0.5">
                        {i + 1}
                      </span>
                      <span>{t(`sections.regulatory.items.${item}`)}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4">{t('sections.regulatory.additional')}</p>
              </SectionBlock>

              {/* Force Majeure */}
              <SectionBlock title={t('sections.forceMajeure.title')} index={17}>
                <p>{t('sections.forceMajeure.description')}</p>
              </SectionBlock>

              {/* Governing Law */}
              <SectionBlock title={t('sections.governingLaw.title')} index={18}>
                <p className="p-4 bg-[#eff4ff] rounded-lg border border-[#dbe6ff] text-gray-800">
                  {t('sections.governingLaw.description')}
                </p>
              </SectionBlock>

              {/* Changes to Terms */}
              <SectionBlock title={t('sections.changes.title')} index={19}>
                <p>{t('sections.changes.description')}</p>
              </SectionBlock>

              {/* Contact */}
              <SectionBlock title={t('sections.contact.title')} index={20}>
                <p>{t('sections.contact.description')}</p>
                <div className="mt-4 p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <a
                    href="mailto:legal@yieldge.com"
                    className="text-[#1F5CFF] hover:text-[#1a4edb] font-semibold text-lg flex items-center gap-2 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    legal@yieldge.com
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
