import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import CrecimientoDigitalNavbar from '@/components/crecimiento-digital/CrecimientoDigitalNavbar';
import { CrecimientoDigitalMarketProvider } from '@/components/crecimiento-digital/market-context';
import CrecimientoDigitalPageContent from '@/components/CrecimientoDigitalPageContent';
import { BreadcrumbSchema } from '@/components/seo';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yieldge.com';
const PATH = '/crecimiento-digital/cl';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEnglish = locale === 'en';

  return {
    title: isEnglish
      ? 'Digital Growth for Companies in Chile | Yieldge'
      : 'Crecimiento Digital para Empresas en Chile | Yieldge',
    description: isEnglish
      ? 'We help companies in Chile get found on Google, build trust, and turn visits into inquiries, bookings, quotes, and new business opportunities.'
      : 'Ayudamos a empresas en Chile a ser encontradas en Google, generar confianza y convertir visitas en consultas, reservaciones, cotizaciones y nuevas oportunidades de negocio.',
    keywords: isEnglish
      ? 'digital growth Chile, web design Santiago, SEO Chile, digital marketing Chile, website for companies Chile, Google ranking Santiago'
      : 'crecimiento digital Chile, diseño web Santiago, SEO Chile, marketing digital Chile, página web para empresas Chile, posicionamiento Google Santiago',
    openGraph: {
      title: isEnglish
        ? 'Digital Growth for Companies in Chile | Yieldge'
        : 'Crecimiento Digital para Empresas en Chile | Yieldge',
      description: isEnglish
        ? 'We help companies in Chile get found on Google, build trust, and turn visits into new business opportunities.'
        : 'Ayudamos a empresas en Chile a ser encontradas en Google, generar confianza y convertir visitas en nuevas oportunidades de negocio.',
      type: 'website',
      locale: isEnglish ? 'en_US' : 'es_CL',
      url: `${siteUrl}${isEnglish ? '/en' : ''}${PATH}`,
      siteName: 'Yieldge',
      images: [
        {
          url: `${siteUrl}/assets/featured.jpg`,
          width: 1200,
          height: 630,
          alt: 'Yieldge Crecimiento Digital Chile',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isEnglish
        ? 'Digital Growth for Companies in Chile | Yieldge'
        : 'Crecimiento Digital para Empresas en Chile | Yieldge',
      description: isEnglish
        ? 'We help companies in Chile get found on Google, build trust, and turn visits into new business opportunities.'
        : 'Ayudamos a empresas en Chile a ser encontradas en Google, generar confianza y convertir visitas en nuevas oportunidades de negocio.',
      images: [`${siteUrl}/assets/featured.jpg`],
    },
    alternates: {
      canonical: `${siteUrl}${isEnglish ? '/en' : ''}${PATH}`,
      languages: {
        es: `${siteUrl}${PATH}`,
        en: `${siteUrl}/en${PATH}`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CrecimientoDigitalChilePage({
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
    {
      name: 'Chile',
      url: isEnglish ? `/en${PATH}` : PATH,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <BreadcrumbSchema items={breadcrumbItems} />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-[#1F5CFF] focus:px-6 focus:py-3 focus:text-white focus:outline-none"
      >
        Skip to main content
      </a>
      <CrecimientoDigitalMarketProvider market="cl">
        <CrecimientoDigitalNavbar />
        <CrecimientoDigitalPageContent />
      </CrecimientoDigitalMarketProvider>
    </div>
  );
}
