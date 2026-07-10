import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import StickyCTA from '@/components/StickyCTA';
import PresenciaDigitalPageContent from '@/components/PresenciaDigitalPageContent';
import { BreadcrumbSchema } from '@/components/seo';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yieldge.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const isEnglish = locale === 'en';

  return {
    title: isEnglish
      ? 'Digital Presence & Growth | Yieldge'
      : 'Presencia Digital y Crecimiento | Yieldge',
    description: isEnglish
      ? 'Transform your digital presence into a client attraction machine. Premium web design, SEO, and conversion optimization for businesses that want to grow.'
      : 'Convierta su presencia digital en una máquina para atraer clientes. Diseño web premium, SEO y optimización de conversiones para empresas que desean crecer.',
    keywords: isEnglish
      ? 'digital presence, web design, SEO, conversion optimization, premium website, business growth, digital marketing Costa Rica'
      : 'presencia digital, diseño web, SEO, optimización de conversiones, sitio web premium, crecimiento empresarial, marketing digital Costa Rica',
    openGraph: {
      title: isEnglish
        ? 'Digital Presence & Growth | Yieldge'
        : 'Presencia Digital y Crecimiento | Yieldge',
      description: isEnglish
        ? 'Transform your digital presence into a client attraction machine.'
        : 'Convierta su presencia digital en una máquina para atraer clientes.',
      type: 'website',
      locale: isEnglish ? 'en_US' : 'es_ES',
      url: `${siteUrl}${isEnglish ? '/en' : ''}/presencia-digital`,
      siteName: 'Yieldge',
      images: [
        {
          url: `${siteUrl}/assets/featured.jpg`,
          width: 1200,
          height: 630,
          alt: 'Yieldge Digital Presence',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isEnglish
        ? 'Digital Presence & Growth | Yieldge'
        : 'Presencia Digital y Crecimiento | Yieldge',
      description: isEnglish
        ? 'Transform your digital presence into a client attraction machine.'
        : 'Convierta su presencia digital en una máquina para atraer clientes.',
      images: [`${siteUrl}/assets/featured.jpg`],
    },
    alternates: {
      canonical: `${siteUrl}${isEnglish ? '/en' : ''}/presencia-digital`,
      languages: {
        es: `${siteUrl}/presencia-digital`,
        en: `${siteUrl}/en/presencia-digital`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function PresenciaDigitalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isEnglish = locale === 'en';
  const breadcrumbItems = [
    { name: isEnglish ? 'Home' : 'Inicio', url: isEnglish ? '/en' : '/' },
    {
      name: isEnglish ? 'Digital Presence' : 'Presencia Digital',
      url: isEnglish ? '/en/presencia-digital' : '/presencia-digital',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <BreadcrumbSchema items={breadcrumbItems} />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-[#1F5CFF] focus:text-white focus:rounded-full focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>
      <Navbar hideNavLinks />
      <PresenciaDigitalPageContent />
      <StickyCTA />
    </div>
  );
}
