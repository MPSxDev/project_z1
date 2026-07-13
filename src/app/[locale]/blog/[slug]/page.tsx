import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import ArticlePageContent from './ArticlePageContent';
import { BreadcrumbSchema, ArticleSchema, FAQSchema } from '@/components/seo';
import { getArticle, getAllSlugs, getRelatedArticles } from '@/lib/blog/utils.server';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yieldge.com';

export async function generateStaticParams() {
  const locales = ['es', 'en'];
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    const slugs = getAllSlugs(locale);
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticle(slug, locale);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  const isEnglish = locale === 'en';
  const { frontmatter } = article;
  const title = frontmatter.metaTitle || frontmatter.title;
  const description = frontmatter.metaDescription;
  const image = frontmatter.featuredImage || '/assets/featured.jpg';

  return {
    title: `${title} | Yieldge Blog`,
    description,
    keywords: frontmatter.tags.join(', '),
    authors: [{ name: frontmatter.author.name }],
    openGraph: {
      title: `${title} | Yieldge Blog`,
      description,
      type: 'article',
      locale: isEnglish ? 'en_US' : 'es_ES',
      url: `${siteUrl}${isEnglish ? '/en' : ''}/blog/${slug}`,
      siteName: 'Yieldge',
      authors: [frontmatter.author.name],
      images: [
        {
          url: image.startsWith('http') ? image : `${siteUrl}${image}`,
          width: 1200,
          height: 630,
          alt: frontmatter.featuredImageAlt || title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Yieldge`,
      description,
      images: [image.startsWith('http') ? image : `${siteUrl}${image}`],
    },
    alternates: {
      canonical: `${siteUrl}${isEnglish ? '/en' : ''}/blog/${slug}`,
      languages: {
        es: `${siteUrl}/blog/${slug}`,
        en: `${siteUrl}/en/blog/${slug}`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const article = getArticle(slug, locale);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(slug, locale, 3);
  const isEnglish = locale === 'en';
  const { frontmatter } = article;

  const breadcrumbItems = [
    { name: isEnglish ? 'Home' : 'Inicio', url: isEnglish ? '/en' : '/' },
    { name: 'Blog', url: isEnglish ? '/en/blog' : '/blog' },
    {
      name: frontmatter.title,
      url: isEnglish ? `/en/blog/${slug}` : `/blog/${slug}`,
    },
  ];

  const articleUrl = `${siteUrl}${isEnglish ? '/en' : ''}/blog/${slug}`;
  const articleImage = frontmatter.featuredImage || '/assets/featured.jpg';

  return (
    <div className="min-h-screen bg-white">
      {/* SEO Schemas */}
      <BreadcrumbSchema items={breadcrumbItems} />
      <ArticleSchema
        title={frontmatter.title}
        description={frontmatter.metaDescription}
        author={frontmatter.author.name}
        datePublished={new Date().toISOString().split('T')[0]}
        image={articleImage}
        url={articleUrl}
      />
      {frontmatter.faq && frontmatter.faq.length > 0 && (
        <FAQSchema faqs={frontmatter.faq} />
      )}

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-[#1F5CFF] focus:text-white focus:rounded-full focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>
      <Navbar />
      <StickyCTA />
      <main id="main-content">
        <ArticlePageContent
          article={article}
          locale={locale}
          relatedArticles={relatedArticles}
          articleUrl={articleUrl}
        />
      </main>
      <Footer />
    </div>
  );
}
