import { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yieldge.com';

interface GenerateMetadataOptions {
  locale: string;
  title: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
  path: string;
  keywords?: {
    es: string;
    en: string;
  };
  noIndex?: boolean;
}

export function generatePageMetadata({
  locale,
  title,
  description,
  path,
  keywords,
  noIndex = false,
}: GenerateMetadataOptions): Metadata {
  const isEnglish = locale === 'en';
  const localizedTitle = isEnglish ? title.en : title.es;
  const localizedDescription = isEnglish ? description.en : description.es;
  const localizedKeywords = keywords ? (isEnglish ? keywords.en : keywords.es) : undefined;
  const canonicalPath = path === '/' ? '' : path;
  const canonicalUrl = `${siteUrl}${isEnglish ? '/en' : ''}${canonicalPath}`;

  return {
    title: localizedTitle,
    description: localizedDescription,
    keywords: localizedKeywords?.split(', '),
    openGraph: {
      title: localizedTitle,
      description: localizedDescription,
      type: 'website',
      locale: isEnglish ? 'en_US' : 'es_ES',
      url: canonicalUrl,
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
      title: localizedTitle,
      description: localizedDescription,
      images: [`${siteUrl}/assets/featured.jpg`],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        es: `${siteUrl}${canonicalPath}`,
        en: `${siteUrl}/en${canonicalPath}`,
      },
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export const pageMetadata = {
  careers: {
    title: {
      es: 'Carreras en Tecnología Costa Rica - Únete a Yieldge',
      en: 'Technology Careers Costa Rica - Join Yieldge',
    },
    description: {
      es: 'Únete al equipo de Yieldge en Costa Rica. Descubre oportunidades de carrera en desarrollo de software, QA, cloud solutions y más. Trabaja con tecnología de vanguardia.',
      en: 'Join the Yieldge team in Costa Rica. Discover career opportunities in software development, QA, cloud solutions and more. Work with cutting-edge technology.',
    },
    keywords: {
      es: 'carreras tecnología Costa Rica, empleo desarrollo software Costa Rica, trabajo QA, vacantes cloud, empleo tecnología San José',
      en: 'technology careers Costa Rica, software development jobs Costa Rica, QA jobs, cloud vacancies, tech employment Latin America',
    },
  },
  getInTouch: {
    title: {
      es: 'Contáctanos - Consultoría Tecnológica Costa Rica | Yieldge',
      en: "Contact Us - Technology Consulting Costa Rica | Yieldge",
    },
    description: {
      es: 'Contáctanos para discutir tu próximo proyecto tecnológico en Costa Rica. Consultoría gratuita de 30 minutos con nuestros expertos. Desarrollo de software, cloud, QA y más.',
      en: 'Contact us to discuss your next technology project. Based in Costa Rica, serving clients globally. Free 30-minute consultation with our experts.',
    },
    keywords: {
      es: 'contacto desarrollo software Costa Rica, consultoría tecnológica Costa Rica, cotización software, empresa desarrollo software',
      en: 'software development contact Costa Rica, technology consulting Costa Rica, software quote, development company Latin America',
    },
  },
  privacyPolicy: {
    title: {
      es: 'Política de Privacidad | Yieldge',
      en: 'Privacy Policy | Yieldge',
    },
    description: {
      es: 'Política de privacidad de Yieldge. Conozca cómo recopilamos, utilizamos y protegemos su información personal.',
      en: 'Yieldge privacy policy. Learn how we collect, use, and protect your personal information.',
    },
  },
  terms: {
    title: {
      es: 'Términos y Condiciones | Yieldge',
      en: 'Terms and Conditions | Yieldge',
    },
    description: {
      es: 'Términos y condiciones de uso de los servicios de Yieldge. Lea nuestras políticas antes de utilizar nuestros servicios.',
      en: 'Terms and conditions for using Yieldge services. Read our policies before using our services.',
    },
  },
};
