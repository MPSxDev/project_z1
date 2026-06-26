import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SolutionsPageContent from '@/components/SolutionsPageContent';
import StickyCTA from '@/components/StickyCTA';
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
      ? 'Technology Solutions & Services | Yieldge'
      : 'Soluciones y Servicios Tecnológicos | Yieldge',
    description: isEnglish
      ? 'Comprehensive technology solutions including QA automation, security services, cloud solutions, mobile & web development, and offshore teams. Transform your business with Yieldge.'
      : 'Soluciones tecnológicas integrales incluyendo automatización QA, servicios de seguridad, soluciones en la nube, desarrollo móvil y web, y equipos offshore. Transformá tu negocio con Yieldge.',
    keywords: isEnglish
      ? 'technology solutions Costa Rica, software development company, QA automation services, cybersecurity consulting, cloud solutions, offshore development Latin America, mobile apps, web development, staff augmentation nearshore'
      : 'soluciones tecnológicas Costa Rica, empresa desarrollo software, automatización QA, consultoría ciberseguridad, soluciones nube, desarrollo offshore Costa Rica, apps móviles, desarrollo web, aumento de personal nearshore',
    openGraph: {
      title: isEnglish ? 'Technology Solutions & Services | Yieldge' : 'Soluciones y Servicios Tecnológicos | Yieldge',
      description: isEnglish
        ? 'Comprehensive technology solutions to accelerate your business growth and operational excellence.'
        : 'Soluciones tecnológicas integrales para acelerar el crecimiento de tu negocio y la excelencia operativa.',
      type: 'website',
      locale: isEnglish ? 'en_US' : 'es_ES',
      url: `${siteUrl}${isEnglish ? '/en' : ''}/solutions`,
      siteName: 'Yieldge',
      images: [
        {
          url: `${siteUrl}/assets/featured.jpg`,
          width: 1200,
          height: 630,
          alt: 'Yieldge Technology Solutions',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isEnglish ? 'Technology Solutions & Services | Yieldge' : 'Soluciones y Servicios Tecnológicos | Yieldge',
      description: isEnglish
        ? 'Transform your business with our comprehensive technology solutions.'
        : 'Transformá tu negocio con nuestras soluciones tecnológicas integrales.',
      images: [`${siteUrl}/assets/featured.jpg`],
    },
    alternates: {
      canonical: `${siteUrl}${isEnglish ? '/en' : ''}/solutions`,
      languages: {
        es: `${siteUrl}/solutions`,
        en: `${siteUrl}/en/solutions`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isEnglish = locale === 'en';
  const breadcrumbItems = [
    { name: isEnglish ? 'Home' : 'Inicio', url: isEnglish ? '/en' : '/' },
    { name: isEnglish ? 'Solutions' : 'Soluciones', url: isEnglish ? '/en/solutions' : '/solutions' },
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
      <Navbar />
      <StickyCTA />
      <main id="main-content">
        <SolutionsPageContent />
      </main>
      <Footer />
    </div>
  );
}
