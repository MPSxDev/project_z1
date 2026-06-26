import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CompanyPageContent from '@/components/CompanyPageContent';
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
      ? 'About Us - 15+ Years of Technology Excellence | Yieldge'
      : 'Sobre Nosotros - Más de 15 Años de Excelencia Tecnológica | Yieldge',
    description: isEnglish
      ? 'Learn about Yieldge, your trusted technology partner with 15+ years of experience in digital transformation, offshore development, and innovative technology solutions across the Americas.'
      : 'Conocé Yieldge, tu socio tecnológico de confianza con más de 15 años de experiencia en transformación digital, desarrollo offshore y soluciones tecnológicas innovadoras en las Américas.',
    keywords: isEnglish
      ? 'technology company Costa Rica, software development company, offshore development Latin America, digital transformation, technology partner, nearshore development, enterprise consulting'
      : 'empresa tecnológica Costa Rica, empresa desarrollo software, desarrollo offshore, transformación digital, socio tecnológico, desarrollo nearshore, consultoría empresarial',
    openGraph: {
      title: isEnglish
        ? 'About Us - 15+ Years of Technology Excellence | Yieldge'
        : 'Sobre Nosotros - Más de 15 Años de Excelencia Tecnológica | Yieldge',
      description: isEnglish
        ? 'Your trusted technology partner with 15+ years of experience in digital transformation and innovative solutions.'
        : 'Tu socio tecnológico de confianza con más de 15 años de experiencia en transformación digital y soluciones innovadoras.',
      type: 'website',
      locale: isEnglish ? 'en_US' : 'es_ES',
      url: `${siteUrl}${isEnglish ? '/en' : ''}/company`,
      siteName: 'Yieldge',
      images: [
        {
          url: `${siteUrl}/assets/featured.jpg`,
          width: 1200,
          height: 630,
          alt: 'Yieldge - Technology that Performs',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isEnglish ? 'About Yieldge - Your Technology Partner' : 'Sobre Yieldge - Tu Socio Tecnológico',
      description: isEnglish
        ? '15+ years of technology excellence and digital transformation.'
        : 'Más de 15 años de excelencia tecnológica y transformación digital.',
      images: [`${siteUrl}/assets/featured.jpg`],
    },
    alternates: {
      canonical: `${siteUrl}${isEnglish ? '/en' : ''}/company`,
      languages: {
        es: `${siteUrl}/company`,
        en: `${siteUrl}/en/company`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isEnglish = locale === 'en';
  const breadcrumbItems = [
    { name: isEnglish ? 'Home' : 'Inicio', url: isEnglish ? '/en' : '/' },
    { name: isEnglish ? 'About Us' : 'Sobre Nosotros', url: isEnglish ? '/en/company' : '/company' },
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
        <CompanyPageContent />
      </main>
      <Footer />
    </div>
  );
}
