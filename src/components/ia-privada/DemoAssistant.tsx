'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { MonoLabel, plexMono } from './shared';

export default function DemoAssistant() {
  const t = useTranslations('iaPrivada.demo');
  const [visibleChars, setVisibleChars] = useState(0);
  const answer = t('answer');

  useEffect(() => {
    setVisibleChars(0);
    const interval = window.setInterval(() => {
      setVisibleChars((current) => {
        if (current >= answer.length) {
          window.clearInterval(interval);
          return current;
        }
        return current + 1;
      });
    }, 16);

    return () => window.clearInterval(interval);
  }, [answer]);

  const sources = t.raw('sources') as Array<{ title: string; loc: string }>;

  return (
    <div className="overflow-hidden border border-white/10 bg-[#070B12]">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <MonoLabel className="text-white">{t('title')}</MonoLabel>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#3DDC97] shadow-[0_0_8px_#3DDC97]" />
          <MonoLabel className="text-[#B8F5D4]">{t('localBadge')}</MonoLabel>
        </div>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        <div>
          <MonoLabel className="text-white/40">{t('promptLabel')}</MonoLabel>
          <p className="mt-2 text-base leading-relaxed text-white/85">
            {t('prompt')}
          </p>
        </div>

        <div className="border border-white/10 bg-white/[0.03] p-4">
          <MonoLabel className="text-[#7EA0FF]">{t('answerLabel')}</MonoLabel>
          <p className="mt-3 min-h-[4.5rem] text-[15px] leading-relaxed text-white/80">
            {answer.slice(0, visibleChars)}
            {visibleChars < answer.length ? (
              <span className="ml-0.5 inline-block h-4 w-px bg-[#1F5CFF] align-middle" />
            ) : null}
          </p>
        </div>

        <div>
          <MonoLabel className="text-white/40">{t('sourcesLabel')}</MonoLabel>
          <ul className="mt-3 space-y-2">
            {sources.map((source) => (
              <li
                key={`${source.title}-${source.loc}`}
                className={`${plexMono.className} text-xs tracking-wide text-white/55`}
              >
                {source.title} · {source.loc}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-3">
          <MonoLabel className="border border-[#3DDC97]/30 bg-[#3DDC97]/10 px-3 py-1.5 text-[#B8F5D4]">
            {t('localBadge')}
          </MonoLabel>
          <MonoLabel className="border border-white/15 px-3 py-1.5 text-white/60">
            {t('privateBadge')}
          </MonoLabel>
        </div>
      </div>
    </div>
  );
}
