import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { BreadcrumbSchema, FAQSchema } from '@/components/seo';
import IaPrivadaFooter from '@/components/ia-privada/IaPrivadaFooter';
import IaPrivadaNavbar from '@/components/ia-privada/IaPrivadaNavbar';
import IaPrivadaPageContent from '@/components/ia-privada/IaPrivadaPageContent';
import { getPrivateAiPath } from '@/lib/ia-privada';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yieldge.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'iaPrivada.meta' });
  const isEnglish = locale === 'en';
  const path = getPrivateAiPath(locale);
  const pathWithLocale = locale === 'en' ? `/en${path}` : path;

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords').split(', '),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: isEnglish ? 'en_US' : 'es_ES',
      url: `${siteUrl}${pathWithLocale}`,
      siteName: 'Yieldge',
      images: [
        {
          url: `${siteUrl}/assets/featured.jpg`,
          width: 1200,
          height: 630,
          alt: t('ogAlt'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [`${siteUrl}/assets/featured.jpg`],
    },
    alternates: {
      canonical: `${siteUrl}${pathWithLocale}`,
      languages: {
        es: `${siteUrl}${getPrivateAiPath('es')}`,
        en: `${siteUrl}/en${getPrivateAiPath('en')}`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function IaPrivadaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'iaPrivada' });
  const isEnglish = locale === 'en';
  const faqItems = t.raw('faq.items') as Array<{ q: string; a: string }>;

  const breadcrumbItems = [
    { name: isEnglish ? 'Home' : 'Inicio', url: isEnglish ? '/en' : '/' },
    {
      name: 'Private AI',
      url: locale === 'en' ? `/en${getPrivateAiPath('en')}` : getPrivateAiPath('es'),
    },
  ];

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Private AI',
    serviceType: isEnglish
      ? 'Private AI infrastructure'
      : 'Infraestructura de IA privada',
    provider: {
      '@type': 'Organization',
      name: 'Yieldge',
      url: siteUrl,
    },
    description: t('meta.description'),
    areaServed: 'Worldwide',
    url: `${siteUrl}${locale === 'en' ? `/en${getPrivateAiPath('en')}` : getPrivateAiPath('es')}`,
  };

  return (
    <div className="min-h-screen bg-[#05070A]">
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQSchema
        faqs={faqItems.map((item) => ({
          question: item.q,
          answer: item.a,
        }))}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-[#1F5CFF] focus:px-6 focus:py-3 focus:text-white focus:outline-none"
      >
        Skip to main content
      </a>
      <IaPrivadaNavbar />
      <main id="main-content">
        <IaPrivadaPageContent />
      </main>
      <IaPrivadaFooter />
    </div>
  );
}
