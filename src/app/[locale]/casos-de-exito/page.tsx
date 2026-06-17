import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CasosDeExitoPageContent from '@/components/CasosDeExitoPageContent';
import StickyCTA from '@/components/StickyCTA';

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
      ? 'Success Stories | Yieldge'
      : 'Casos de Éxito | Yieldge',
    description: isEnglish
      ? 'Discover how we help organizations strengthen their digital presence, optimize operational processes, and create digital experiences that drive growth and efficiency.'
      : 'Descubre cómo ayudamos a organizaciones a fortalecer su presencia digital, optimizar procesos operativos y crear experiencias digitales que impulsan el crecimiento y la eficiencia.',
    keywords: isEnglish
      ? 'success stories, case studies, digital transformation, business results, operational efficiency, digital presence, client success'
      : 'casos de éxito, estudios de caso, transformación digital, resultados de negocio, eficiencia operativa, presencia digital, éxito de clientes',
    openGraph: {
      title: isEnglish ? 'Success Stories | Yieldge' : 'Casos de Éxito | Yieldge',
      description: isEnglish
        ? 'Discover how we help organizations achieve measurable business results through technology and digital transformation.'
        : 'Descubre cómo ayudamos a organizaciones a lograr resultados de negocio medibles mediante tecnología y transformación digital.',
      type: 'website',
      locale: isEnglish ? 'en_US' : 'es_ES',
      url: `${siteUrl}${isEnglish ? '/en' : ''}/casos-de-exito`,
      siteName: 'Yieldge',
      images: [
        {
          url: `${siteUrl}/assets/featured.jpg`,
          width: 1200,
          height: 630,
          alt: 'Yieldge Success Stories',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isEnglish ? 'Success Stories | Yieldge' : 'Casos de Éxito | Yieldge',
      description: isEnglish
        ? 'Discover how we help organizations achieve measurable business results.'
        : 'Descubre cómo ayudamos a organizaciones a lograr resultados de negocio medibles.',
      images: [`${siteUrl}/assets/featured.jpg`],
    },
    alternates: {
      canonical: `${siteUrl}${isEnglish ? '/en' : ''}/casos-de-exito`,
      languages: {
        es: `${siteUrl}/casos-de-exito`,
        en: `${siteUrl}/en/casos-de-exito`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function CasosDeExitoPage() {
  return (
    <div className="min-h-screen bg-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-[#1F5CFF] focus:text-white focus:rounded-full focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>
      <Navbar />
      <StickyCTA />
      <main id="main-content">
        <CasosDeExitoPageContent />
      </main>
      <Footer />
    </div>
  );
}
