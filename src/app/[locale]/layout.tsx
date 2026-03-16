import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { prisma } from '@/lib/prisma';

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-display",
  display: 'swap',
  preload: true,
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-body",
  display: 'swap',
  preload: true,
});

import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });

  // Récupérer l'image du Hero pour l'utiliser comme image de partage (OG Image)
  let ogImage = 'https://www.villadolce-hotel.com/images/logo.png';
  try {
    const hero = await prisma.hero.findFirst();
    if (hero?.imageUrl) {
      ogImage = hero.imageUrl;
    }
  } catch (error) {
    console.error('Error fetching hero for metadata:', error);
  }

  // S'assurer que l'URL est absolue pour les réseaux sociaux
  const fullOgImageUrl = ogImage.startsWith('http')
    ? ogImage
    : `https://www.villadolce-hotel.com${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;

  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL('https://www.villadolce-hotel.com'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'fr-BE': '/fr',
        'en-BE': '/en',
        'nl-BE': '/nl',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://www.villadolce-hotel.com/${locale}`,
      siteName: 'Villa Dolce',
      locale: locale === 'en' ? 'en_US' : locale === 'nl' ? 'nl_BE' : 'fr_BE',
      type: 'website',
      images: [
        {
          url: fullOgImageUrl,
          width: 1200,
          height: 630,
          alt: t('title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [fullOgImageUrl],
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/images/logo-simple.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [
        { url: "/images/logo-simple.png", sizes: "180x180", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
    },

  };
}

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import StructuredData from "@/components/StructuredData";
import ScrollToTop from "@/components/ScrollToTop";

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as 'fr' | 'en' | 'nl')) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  // Fetch hero data for footer
  const heroData = await prisma.hero.findFirst();

  return (
    <html lang={locale} className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="font-body antialiased transition-colors duration-300">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <StructuredData />
          <Header />
          <div className="min-h-screen">
            {children}
          </div>
          <Footer heroData={heroData} />
          <CookieConsent />
          <ScrollToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
