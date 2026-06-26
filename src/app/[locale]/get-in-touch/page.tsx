import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { generatePageMetadata, pageMetadata } from '@/lib/seo';
import { BreadcrumbSchema } from '@/components/seo';
import GetInTouchPageClient from './GetInTouchPageClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return generatePageMetadata({
    locale,
    ...pageMetadata.getInTouch,
    path: '/get-in-touch',
  });
}

export default async function GetInTouchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isEnglish = locale === 'en';
  const breadcrumbItems = [
    { name: isEnglish ? 'Home' : 'Inicio', url: isEnglish ? '/en' : '/' },
    { name: isEnglish ? 'Contact' : 'Contacto', url: isEnglish ? '/en/get-in-touch' : '/get-in-touch' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <GetInTouchPageClient />
    </>
  );
}
