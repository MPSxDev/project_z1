import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

// Create the next-intl plugin with our i18n config
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // Explicitly set the workspace root to silence the lockfile warning
  outputFileTracingRoot: __dirname,

  images: {
    // WebP only for better Android compatibility (AVIF has limited support on older Android)
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Enable compression for better performance
  compress: true,

  // Headers for SEO and security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/en/ia-privada',
        destination: '/en/private-ai',
        permanent: true,
      },
      {
        source: '/private-ai',
        destination: '/ia-privada',
        permanent: true,
      },
      // Redirect www to non-www (or vice versa based on preference)
      // Uncomment if needed:
      // {
      //   source: '/:path*',
      //   has: [
      //     {
      //       type: 'host',
      //       value: 'www.yieldge.com',
      //     },
      //   ],
      //   destination: 'https://yieldge.com/:path*',
      //   permanent: true,
      // },
    ];
  },

  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', 'three'],
  },
};

export default withNextIntl(nextConfig);
