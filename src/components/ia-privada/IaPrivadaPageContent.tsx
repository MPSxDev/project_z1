'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  Boxes,
  ChevronDown,
  EyeOff,
  HeartPulse,
  Landmark,
  Lock,
  Minus,
  Pickaxe,
  Plus,
  Scale,
  ShieldAlert,
  type LucideIcon,
} from 'lucide-react';
import Container from '@/components/ui/Container';
import { PRIVATE_AI_ASSETS, PRIVATE_AI_SECTIONS } from '@/lib/ia-privada';
import { cn } from '@/lib/utils';
import DemoAssistant from './DemoAssistant';
import PrivateAiAsset from './PrivateAiAsset';
import {
  fadeUp,
  MonoLabel,
  plexMono,
  PrimaryCta,
  SectionEyebrow,
  stagger,
} from './shared';
import { ProcessRail, TechStackVisual } from './visuals';

const GlassCubeCanvas = dynamic(() => import('./GlassCubeCanvas'), {
  ssr: false,
});

/** Order matches useCases.cards in messages (Legal, Mining, Finance, Healthcare). */
const USE_CASE_ICONS: LucideIcon[] = [Scale, Pickaxe, Landmark, HeartPulse];

/** Order matches problem.cards (sensitive data, control, security, generic models). */
const PROBLEM_ICONS: LucideIcon[] = [Lock, EyeOff, ShieldAlert, Boxes];

type TextCard = { title: string; text: string };
type NamedCard = { name: string; text: string };
type FaqItem = { q: string; a: string };
type PackageCard = {
  id: 'assessment' | 'pilot' | 'enterprise' | 'managed';
  title: string;
  text: string;
  ideal: string;
  cta: string;
};
type ProcessStep = { id: string; name: string; text: string };
type StackLayer = { label: string; detail?: string };

export default function IaPrivadaPageContent() {
  const t = useTranslations('iaPrivada');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const deploymentModes = t.raw('hero.modes') as string[];
  const trustBadges = t.raw('trust.badges') as string[];
  const problemCards = t.raw('problem.cards') as TextCard[];
  const capabilities = t.raw('capabilities.items') as TextCard[];
  const controlBadges = t.raw('dataControl.badges') as string[];
  const useCaseCards = t.raw('useCases.cards') as NamedCard[];
  const industries = t.raw('industries.items') as string[];
  const stackLayers = t.raw('technology.layers') as StackLayer[];
  const deploymentColumns = t.raw('deployment.columns') as TextCard[];
  const securityItems = t.raw('security.items') as string[];
  const processSteps = t.raw('process.steps') as ProcessStep[];
  const startSteps = t.raw('startSmall.steps') as string[];
  const packages = t.raw('packages.items') as PackageCard[];
  const roiItems = t.raw('roi.items') as TextCard[];
  const faqItems = t.raw('faq.items') as FaqItem[];

  return (
    <div className={cn(plexMono.variable, 'bg-[#05070A] text-white antialiased')}>
      {/* Hero */}
      <section className="relative min-h-[100svh] overflow-hidden bg-black">
        <GlassCubeCanvas />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_88%_0%,rgba(255,255,255,0.16),transparent_58%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_72%_48%,rgba(31,92,255,0.14),transparent_62%)]" />
        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-black from-0% via-black/80 via-38% to-transparent to-72% lg:block" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black from-0% via-black/78 via-42% to-transparent to-82% lg:hidden" />

        <Container className="relative z-10 grid min-h-[100svh] items-center gap-12 pb-16 pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:pt-24">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp}>
              <SectionEyebrow>{t('hero.eyebrow')}</SectionEyebrow>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="max-w-xl text-4xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-6xl"
            >
              {t('hero.headline')}
              <span className="mt-2 block text-white/90">{t('hero.headlineLine2')}</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-lg leading-relaxed text-white/65 sm:text-xl"
            >
              {t('hero.subheadline')}
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col items-start gap-3 sm:flex-row"
            >
              <PrimaryCta>{t('hero.primaryCta')}</PrimaryCta>
              <a
                href={`#${PRIVATE_AI_SECTIONS.howItWorks}`}
                className="inline-flex min-h-12 items-center gap-2 px-2 text-[15px] font-semibold text-white/70 hover:text-white"
              >
                {t('hero.secondaryCta')}
                <ChevronDown className="h-4 w-4" />
              </a>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-2">
              {deploymentModes.map((mode) => (
                <span
                  key={mode}
                  className="border border-white/12 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-white/55"
                >
                  {mode}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <div
            className="relative h-[38vh] min-h-[240px] lg:h-auto lg:min-h-[32rem]"
            aria-hidden="true"
          />
        </Container>
      </section>

      {/* Trust bar */}
      <section className="border-y border-white/10 bg-[#080C14]">
        <Container className="py-10">
          <p className="max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">
            {t('trust.statement')}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {trustBadges.map((badge) => (
              <MonoLabel
                key={badge}
                className="border border-white/10 px-3 py-2 text-white/45"
              >
                {badge}
              </MonoLabel>
            ))}
          </div>
        </Container>
      </section>

      {/* Problem */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="flex flex-col gap-8">
              <div>
                <SectionEyebrow>{t('problem.eyebrow')}</SectionEyebrow>
                <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
                  {t('problem.title')}
                </h2>
              </div>
              <PrivateAiAsset
                src={PRIVATE_AI_ASSETS.problem}
                alt={t('assets.problem')}
                className="mx-0 w-full max-w-md lg:max-w-none"
                fadeBottom
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {problemCards.map((card, index) => {
                const Icon = PROBLEM_ICONS[index] ?? Lock;
                return (
                  <div
                    key={card.title}
                    className="border border-white/10 bg-[#080C14] p-5"
                  >
                    <span className="flex h-10 w-10 items-center justify-center border border-[#1F5CFF]/35 bg-[#1F5CFF]/12 text-[#7EA0FF]">
                      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                    </span>
                    <h3 className="mt-3 text-lg font-semibold">{card.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">
                      {card.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-16 max-w-4xl border-l-2 border-[#1F5CFF] pl-6">
            <p className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {t('problem.anchor1')}
            </p>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-white/80 sm:text-3xl">
              {t('problem.anchor2')}
            </p>
          </div>
        </Container>
      </section>

      {/* Solution */}
      <section
        id={PRIVATE_AI_SECTIONS.howItWorks}
        className="scroll-mt-24 border-t border-white/10 bg-[#080C14] py-20 sm:py-28"
      >
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            <div>
              <SectionEyebrow>{t('solution.eyebrow')}</SectionEyebrow>
              <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                {t('solution.title')}
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/60">
                {t('solution.subheadline')}
              </p>
            </div>
            <PrivateAiAsset
              src={PRIVATE_AI_ASSETS.architecture}
              alt={t('assets.architecture')}
              size="md"
              className="mx-0 lg:justify-self-end"
            />
          </div>
        </Container>
      </section>

      {/* What we build */}
      <section
        id={PRIVATE_AI_SECTIONS.capabilities}
        className="scroll-mt-24 py-20 sm:py-28"
      >
        <Container>
          <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
            <div>
              <SectionEyebrow>{t('capabilities.eyebrow')}</SectionEyebrow>
              <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                {t('capabilities.title')}
              </h2>
            </div>
            <PrivateAiAsset
              src={PRIVATE_AI_ASSETS.core}
              alt={t('assets.core')}
              className="mx-0 lg:justify-self-end"
            />
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((item, index) => (
              <div
                key={item.title}
                className="border border-white/10 bg-[#080C14] p-6"
              >
                <MonoLabel className="text-[#7EA0FF]">
                  {String(index + 1).padStart(2, '0')}
                </MonoLabel>
                <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Data control */}
      <section className="border-y border-white/10 bg-[#06080D] py-20 sm:py-28">
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                {t('dataControl.title')}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/60">
                {t('dataControl.body')}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {controlBadges.map((badge) => (
                  <MonoLabel
                    key={badge}
                    className="border border-white/10 px-3 py-2 text-white/50"
                  >
                    {badge}
                  </MonoLabel>
                ))}
              </div>
            </div>
            <PrivateAiAsset
              src={PRIVATE_AI_ASSETS.dataControl}
              alt={t('assets.dataControl')}
              size="md"
              className="mx-0 lg:justify-self-end"
            />
          </div>
        </Container>
      </section>

      {/* Use cases */}
      <section
        id={PRIVATE_AI_SECTIONS.useCases}
        className="scroll-mt-24 py-20 sm:py-28"
      >
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              {t('useCases.title')}
            </h2>
            <PrivateAiAsset
              src={PRIVATE_AI_ASSETS.knowledge}
              alt={t('assets.knowledge')}
              className="mx-0 w-full max-w-xs shrink-0 sm:max-w-[20rem] lg:max-w-[22rem]"
            />
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="border border-white/10 bg-[#080C14] p-6 sm:p-8">
              <MonoLabel className="text-[#7EA0FF]">
                {t('useCases.featured.label')}
              </MonoLabel>
              <h3 className="mt-4 text-2xl font-semibold sm:text-3xl">
                {t('useCases.featured.title')}
              </h3>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/60">
                {t('useCases.featured.text')}
              </p>
              <div className="mt-8">
                <DemoAssistant />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {useCaseCards.map((card, index) => {
                const Icon = USE_CASE_ICONS[index] ?? Scale;
                return (
                  <div
                    key={card.name}
                    className="border border-white/10 bg-[#080C14] p-5 transition-colors hover:border-[#1F5CFF]/40"
                  >
                    <div className="flex items-start gap-3.5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#1F5CFF]/35 bg-[#1F5CFF]/12 text-[#7EA0FF]">
                        <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold">{card.name}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                          {card.text}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Industries */}
      <section className="border-t border-white/10 bg-[#080C14] py-20 sm:py-28">
        <Container>
          <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            {t('industries.title')}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/60">
            {t('industries.body')}
          </p>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
            {industries.map((industry) => (
              <div
                key={industry}
                className="border border-white/10 px-4 py-5 text-sm font-semibold tracking-wide text-white/80"
              >
                {industry}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Technology */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionEyebrow>{t('technology.eyebrow')}</SectionEyebrow>
              <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                {t('technology.title')}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/60">
                {t('technology.body')}
              </p>
            </div>
            <TechStackVisual layers={stackLayers} />
          </div>
        </Container>
      </section>

      {/* Local / private / hybrid */}
      <section className="border-t border-white/10 bg-[#080C14] py-20 sm:py-28">
        <Container>
          <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            {t('deployment.title')}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/60">
            {t('deployment.subheadline')}
          </p>
          <PrivateAiAsset
            src={PRIVATE_AI_ASSETS.gateway}
            alt={t('assets.gateway')}
            size="md"
            className="mt-8"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {deploymentColumns.map((column) => (
              <div
                key={column.title}
                className="border border-white/10 bg-[#05070A] p-6"
              >
                <h3 className="text-xl font-semibold">{column.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">
                  {column.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Security */}
      <section className="py-20 sm:py-28">
        <Container>
          <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            {t('security.title')}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/60">
            {t('security.body')}
          </p>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {securityItems.map((item) => (
              <div
                key={item}
                className="border border-white/10 bg-[#080C14] px-4 py-5"
              >
                <MonoLabel className="text-white/75">{item}</MonoLabel>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="border-t border-white/10 bg-[#080C14] py-20 sm:py-28">
        <Container>
          <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            {t('process.title')}
          </h2>
          <div className="mt-10">
            <ProcessRail steps={processSteps} />
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-5">
            {processSteps.map((step) => (
              <div key={step.id}>
                <p className="text-sm font-semibold text-white">{step.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Start small */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              {t('startSmall.title')}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/60">
              {t('startSmall.body')}
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            {startSteps.map((step, index) => (
              <div key={step} className="flex items-center gap-3">
                <span className="border border-white/10 bg-[#080C14] px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white/80">
                  {step}
                </span>
                {index < startSteps.length - 1 ? (
                  <span className="hidden text-white/30 sm:inline">→</span>
                ) : null}
              </div>
            ))}
          </div>
          <p className="mt-8 text-xl font-semibold tracking-tight">
            {t('startSmall.anchor')}
          </p>
        </Container>
      </section>

      {/* Packages */}
      <section
        id={PRIVATE_AI_SECTIONS.packages}
        className="scroll-mt-24 border-t border-white/10 bg-[#080C14] py-20 sm:py-28"
      >
        <Container>
          <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            {t('packages.title')}
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {packages.map((item, index) => (
              <div
                key={item.id}
                className="flex flex-col border border-white/10 bg-[#05070A] p-6 sm:p-8"
              >
                <MonoLabel className="text-[#7EA0FF]">
                  {String(index + 1).padStart(2, '0')}
                </MonoLabel>
                <h3 className="mt-4 text-2xl font-semibold">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/55">
                  {item.text}
                </p>
                <p className="mt-4 text-sm text-white/70">{item.ideal}</p>
                <div className="mt-6">
                  <PrimaryCta intent={item.id} variant="ghost">
                    {item.cta}
                  </PrimaryCta>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ROI */}
      <section className="py-20 sm:py-28">
        <Container>
          <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            {t('roi.title')}
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {roiItems.map((item) => (
              <div
                key={item.title}
                className="border border-white/10 bg-[#080C14] p-6"
              >
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-xl font-semibold tracking-tight text-white/90">
            {t('roi.anchor')}
          </p>
        </Container>
      </section>

      {/* NVIDIA / partners */}
      <section className="border-y border-white/10 bg-[#080C14] py-20 sm:py-28">
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                {t('partners.title')}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/60">
                {t('partners.body')}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {(t.raw('partners.badges') as string[]).map((badge) => (
                  <MonoLabel
                    key={badge}
                    className="border border-white/10 px-4 py-3 text-white/50"
                  >
                    {badge}
                  </MonoLabel>
                ))}
              </div>
            </div>
            <PrivateAiAsset
              src={PRIVATE_AI_ASSETS.infrastructure}
              alt={t('assets.infrastructure')}
              size="md"
              className="mx-0 lg:justify-self-end"
            />
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section
        id={PRIVATE_AI_SECTIONS.faq}
        className="scroll-mt-24 py-20 sm:py-28"
      >
        <Container size="6xl">
          <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            {t('faq.title')}
          </h2>
          <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {faqItems.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-semibold text-white sm:text-lg">
                      {item.q}
                    </span>
                    {isOpen ? (
                      <Minus className="h-5 w-5 shrink-0 text-white/50" />
                    ) : (
                      <Plus className="h-5 w-5 shrink-0 text-white/50" />
                    )}
                  </button>
                  {isOpen ? (
                    <p className="pb-5 text-sm leading-relaxed text-white/55 sm:text-base">
                      {item.a}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section
        id={PRIVATE_AI_SECTIONS.assessment}
        className="scroll-mt-24 border-t border-white/10 bg-[#1F5CFF] py-20 sm:py-28"
      >
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
              {t('finalCta.title')}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/80">
              {t('finalCta.subheadline')}
            </p>
            <div className="mt-8">
              <PrimaryCta variant="light">{t('finalCta.cta')}</PrimaryCta>
            </div>
            <p className="mt-5 text-sm text-white/75">{t('finalCta.microcopy')}</p>
          </div>
        </Container>
      </section>
    </div>
  );
}
