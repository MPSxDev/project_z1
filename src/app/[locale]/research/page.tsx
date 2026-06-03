import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ResearchPageContent from '@/components/ResearchPageContent';
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
      ? 'Research & Analysis | Yieldge'
      : 'Investigación y Análisis | Yieldge',
    description: isEnglish
      ? 'Enterprise research and analysis on operational intelligence, digital transformation, AI automation, and technology strategy. Insights from Yieldge Research.'
      : 'Investigación y análisis empresarial sobre inteligencia operativa, transformación digital, automatización con IA y estrategia tecnológica. Insights de Yieldge Research.',
    keywords: isEnglish
      ? 'enterprise research, operational intelligence, digital transformation, AI automation, technology strategy, business insights, enterprise architecture, data governance'
      : 'investigación empresarial, inteligencia operativa, transformación digital, automatización IA, estrategia tecnológica, insights de negocio, arquitectura empresarial, gobernanza de datos',
    openGraph: {
      title: isEnglish ? 'Research & Analysis | Yieldge' : 'Investigación y Análisis | Yieldge',
      description: isEnglish
        ? 'Enterprise research and insights on operational intelligence and digital transformation.'
        : 'Investigación e insights empresariales sobre inteligencia operativa y transformación digital.',
      type: 'website',
      locale: isEnglish ? 'en_US' : 'es_ES',
      url: `${siteUrl}${isEnglish ? '/en' : ''}/research`,
      siteName: 'Yieldge',
      images: [
        {
          url: `${siteUrl}/assets/featured.jpg`,
          width: 1200,
          height: 630,
          alt: 'Yieldge Research & Analysis',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isEnglish ? 'Research & Analysis | Yieldge' : 'Investigación y Análisis | Yieldge',
      description: isEnglish
        ? 'Enterprise research and insights on operational intelligence and digital transformation.'
        : 'Investigación e insights empresariales sobre inteligencia operativa y transformación digital.',
      images: [`${siteUrl}/assets/featured.jpg`],
    },
    alternates: {
      canonical: `${siteUrl}${isEnglish ? '/en' : ''}/research`,
      languages: {
        es: `${siteUrl}/research`,
        en: `${siteUrl}/en/research`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function ResearchPage() {
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
        <ResearchPageContent />
      </main>
      <Footer />
    </div>
  );
}
