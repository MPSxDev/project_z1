'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { PRIVATE_AI_SECTIONS } from '@/lib/ia-privada';
import { MonoLabel } from './shared';

export default function IaPrivadaFooter() {
  const t = useTranslations('iaPrivada.footer');
  const year = new Date().getFullYear();

  const solutions = t.raw('solutionsItems') as string[];
  const industries = t.raw('industriesItems') as string[];

  return (
    <footer className="border-t border-white/10 bg-[#05070A] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-12">
        <div className="md:col-span-1">
          <MonoLabel className="text-white">{t('brand')}</MonoLabel>
          <p className="mt-3 text-sm leading-relaxed text-white/50">
            {t('tagline')}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">{t('solutions')}</p>
          <ul className="mt-4 space-y-2 text-sm text-white/50">
            {solutions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">{t('industries')}</p>
          <ul className="mt-4 space-y-2 text-sm text-white/50">
            {industries.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">{t('company')}</p>
          <ul className="mt-4 space-y-2 text-sm text-white/50">
            <li>
              <Link href="/company" className="hover:text-white">
                {t('about')}
              </Link>
            </li>
            <li>
              <a href={`#${PRIVATE_AI_SECTIONS.assessment}`} className="hover:text-white">
                {t('contact')}
              </a>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-white">
                {t('security')}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-white/35 sm:px-6 lg:px-12">
          {t('copyright', { year })}
        </p>
      </div>
    </footer>
  );
}
