import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
//   experimental: {
//     ppr: true,
//   },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'moomoo-menu-assets.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'photos.alonglfb.com',
      },
      {
        protocol: 'https',
        hostname: 'imgbed.alonglfb.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline' va.vercel-scripts.com;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: https: blob:;
              font-src 'self' data:;
              connect-src 'self' vitals.vercel-insights.com;
              frame-src 'self';
            `.replace(/\s{2,}/g, ' ').trim()
          }
        ]
      }
    ]
  }
};

export default withNextIntl(nextConfig);
