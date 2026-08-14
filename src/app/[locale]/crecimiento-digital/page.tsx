import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import CrecimientoDigitalNavbar from '@/components/crecimiento-digital/CrecimientoDigitalNavbar';
import { CrecimientoDigitalMarketProvider } from '@/components/crecimiento-digital/market-context';
import CrecimientoDigitalPageContent from '@/components/CrecimientoDigitalPageContent';
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
      ? 'Digital Growth for Businesses in Costa Rica | Yieldge'
      : 'Crecimiento Digital para Empresas en Costa Rica | Yieldge',
    description: isEnglish
      ? 'We help businesses improve their digital presence, appear on Google, and convert visits into clients through websites, SEO, analytics, and digital strategy.'
      : 'Ayudamos a empresas a mejorar su presencia digital, aparecer en Google y convertir visitas en clientes mediante sitios web, SEO, analítica y estrategia digital.',
    keywords: isEnglish
      ? 'digital growth, web design, SEO, conversion optimization, business website, real estate website, tourism website, construction website, B2B website, Costa Rica'
      : 'crecimiento digital, diseño web, SEO, optimización de conversiones, sitio web empresarial, bienes raíces, turismo, construcción, B2B, Costa Rica',
    openGraph: {
      title: isEnglish
        ? 'Digital Growth for Businesses in Costa Rica | Yieldge'
        : 'Crecimiento Digital para Empresas en Costa Rica | Yieldge',
      description: isEnglish
        ? 'We help businesses improve their digital presence, appear on Google, and convert visits into clients.'
        : 'Ayudamos a empresas a mejorar su presencia digital, aparecer en Google y convertir visitas en clientes.',
      type: 'website',
      locale: isEnglish ? 'en_US' : 'es_ES',
      url: `${siteUrl}${isEnglish ? '/en' : ''}/crecimiento-digital`,
      siteName: 'Yieldge',
      images: [
        {
          url: `${siteUrl}/assets/featured.jpg`,
          width: 1200,
          height: 630,
          alt: 'Yieldge Digital Growth',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isEnglish
        ? 'Digital Growth for Businesses in Costa Rica | Yieldge'
        : 'Crecimiento Digital para Empresas en Costa Rica | Yieldge',
      description: isEnglish
        ? 'We help businesses improve their digital presence, appear on Google, and convert visits into clients.'
        : 'Ayudamos a empresas a mejorar su presencia digital, aparecer en Google y convertir visitas en clientes.',
      images: [`${siteUrl}/assets/featured.jpg`],
    },
    alternates: {
      canonical: `${siteUrl}${isEnglish ? '/en' : ''}/crecimiento-digital`,
      languages: {
        es: `${siteUrl}/crecimiento-digital`,
        en: `${siteUrl}/en/crecimiento-digital`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CrecimientoDigitalPage({
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
      name: isEnglish ? 'Digital Growth' : 'Crecimiento Digital',
      url: isEnglish ? '/en/crecimiento-digital' : '/crecimiento-digital',
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
      <CrecimientoDigitalMarketProvider market="cr">
        <CrecimientoDigitalNavbar />
        <CrecimientoDigitalPageContent />
      </CrecimientoDigitalMarketProvider>
    </div>
  );
}
