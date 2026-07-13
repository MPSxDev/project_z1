import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import BlogHomeContent from './BlogHomeContent';
import { BreadcrumbSchema } from '@/components/seo';
import {
  getAllArticles,
  getFeaturedArticle,
  getPopularArticles,
  getAllCategories,
} from '@/lib/blog/utils.server';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yieldge.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });

  const isEnglish = locale === 'en';
  const title = `${t('hero.title')} | Yieldge`;
  const description = t('hero.subtitle');

  return {
    title,
    description,
    keywords: isEnglish
      ? 'technology blog, digital transformation insights, AI automation, enterprise technology, SEO, business growth, automation, branding'
      : 'blog tecnología, transformación digital, automatización IA, tecnología empresarial, SEO, crecimiento empresarial, automatización, branding',
    openGraph: {
      title,
      description,
      type: 'website',
      locale: isEnglish ? 'en_US' : 'es_ES',
      url: `${siteUrl}${isEnglish ? '/en' : ''}/blog`,
      siteName: 'Yieldge',
      images: [
        {
          url: `${siteUrl}/assets/featured.jpg`,
          width: 1200,
          height: 630,
          alt: 'Yieldge Blog',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteUrl}/assets/featured.jpg`],
    },
    alternates: {
      canonical: `${siteUrl}${isEnglish ? '/en' : ''}/blog`,
      languages: {
        es: `${siteUrl}/blog`,
        en: `${siteUrl}/en/blog`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isEnglish = locale === 'en';
  const breadcrumbItems = [
    { name: isEnglish ? 'Home' : 'Inicio', url: isEnglish ? '/en' : '/' },
    { name: 'Blog', url: isEnglish ? '/en/blog' : '/blog' },
  ];

  // Get data server-side
  const articles = getAllArticles(locale);
  const featuredArticle = getFeaturedArticle(locale);
  const popularArticles = getPopularArticles(locale, 5);
  const categories = getAllCategories(locale);

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
        <BlogHomeContent
          locale={locale}
          initialArticles={articles}
          featuredArticle={featuredArticle}
          popularArticles={popularArticles}
          categories={categories}
        />
      </main>
      <Footer />
    </div>
  );
}
