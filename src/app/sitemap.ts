import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yieldge.com';
  const currentDate = new Date();

  // Main pages (ES - default)
  const mainPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1,
      alternates: {
        languages: {
          es: baseUrl,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
      alternates: {
        languages: {
          es: `${baseUrl}/solutions`,
          en: `${baseUrl}/en/solutions`,
        },
      },
    },
    {
      url: `${baseUrl}/company`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: {
        languages: {
          es: `${baseUrl}/company`,
          en: `${baseUrl}/en/company`,
        },
      },
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: {
        languages: {
          es: `${baseUrl}/careers`,
          en: `${baseUrl}/en/careers`,
        },
      },
    },
    {
      url: `${baseUrl}/get-in-touch`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
      alternates: {
        languages: {
          es: `${baseUrl}/get-in-touch`,
          en: `${baseUrl}/en/get-in-touch`,
        },
      },
    },
    {
      url: `${baseUrl}/casos-de-exito`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: {
        languages: {
          es: `${baseUrl}/casos-de-exito`,
          en: `${baseUrl}/en/casos-de-exito`,
        },
      },
    },
  ];

  // English versions of main pages
  const englishPages = [
    {
      url: `${baseUrl}/en`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1,
      alternates: {
        languages: {
          es: baseUrl,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/en/solutions`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
      alternates: {
        languages: {
          es: `${baseUrl}/solutions`,
          en: `${baseUrl}/en/solutions`,
        },
      },
    },
    {
      url: `${baseUrl}/en/company`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: {
        languages: {
          es: `${baseUrl}/company`,
          en: `${baseUrl}/en/company`,
        },
      },
    },
    {
      url: `${baseUrl}/en/careers`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: {
        languages: {
          es: `${baseUrl}/careers`,
          en: `${baseUrl}/en/careers`,
        },
      },
    },
    {
      url: `${baseUrl}/en/get-in-touch`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
      alternates: {
        languages: {
          es: `${baseUrl}/get-in-touch`,
          en: `${baseUrl}/en/get-in-touch`,
        },
      },
    },
    {
      url: `${baseUrl}/en/casos-de-exito`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: {
        languages: {
          es: `${baseUrl}/casos-de-exito`,
          en: `${baseUrl}/en/casos-de-exito`,
        },
      },
    },
  ];

  // Legal pages
  const legalPages = [
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
      alternates: {
        languages: {
          es: `${baseUrl}/privacy-policy`,
          en: `${baseUrl}/en/privacy-policy`,
        },
      },
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
      alternates: {
        languages: {
          es: `${baseUrl}/terms`,
          en: `${baseUrl}/en/terms`,
        },
      },
    },
    {
      url: `${baseUrl}/en/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
      alternates: {
        languages: {
          es: `${baseUrl}/privacy-policy`,
          en: `${baseUrl}/en/privacy-policy`,
        },
      },
    },
    {
      url: `${baseUrl}/en/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
      alternates: {
        languages: {
          es: `${baseUrl}/terms`,
          en: `${baseUrl}/en/terms`,
        },
      },
    },
  ];

  return [...mainPages, ...englishPages, ...legalPages];
}

