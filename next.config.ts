import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import { DEVICE_SIZES, IMAGE_SIZES } from './src/lib/image-sizes';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  eslint: {
    // Permet le build même avec des erreurs ESLint
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Permet le build même avec des erreurs TypeScript (à utiliser temporairement)
    ignoreBuildErrors: false,
  },
  images: {
    // Images servies et redimensionnées par Cloudinary (voir src/lib/image-loader.ts)
    loader: 'custom',
    loaderFile: './src/lib/image-loader.ts',
    // Peu de tailles, max 1920 px (voir src/lib/image-sizes.ts)
    deviceSizes: DEVICE_SIZES,
    imageSizes: IMAGE_SIZES,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
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
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // unsafe-eval est souvent requis par Next.js en dev, unsafe-inline pour certaines libs
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' blob: data: https://res.cloudinary.com https://images.unsplash.com https://www.google.com https://maps.gstatic.com https://*.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://res.cloudinary.com",
              "frame-src 'self' https://www.google.com https://maps.google.com",
              "frame-ancestors 'none'",
            ].join('; '),
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
