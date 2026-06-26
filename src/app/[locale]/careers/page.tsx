import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { generatePageMetadata, pageMetadata } from '@/lib/seo';
import { BreadcrumbSchema } from '@/components/seo';
import CareersPageClient from './CareersPageClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return generatePageMetadata({
    locale,
    ...pageMetadata.careers,
    path: '/careers',
  });
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isEnglish = locale === 'en';
  const breadcrumbItems = [
    { name: isEnglish ? 'Home' : 'Inicio', url: isEnglish ? '/en' : '/' },
    { name: isEnglish ? 'Careers' : 'Carreras', url: isEnglish ? '/en/careers' : '/careers' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <CareersPageClient />
    </>
  );
}
