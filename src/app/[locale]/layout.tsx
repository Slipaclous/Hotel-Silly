import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

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

  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL('https://hotel-silly.com'), // À adapter selon votre vrai domaine
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
      url: `https://hotel-silly.com/${locale}`,
      siteName: 'Hôtel de Silly',
      locale: locale === 'en' ? 'en_US' : locale === 'nl' ? 'nl_BE' : 'fr_BE',
      type: 'website',
      images: [
        {
          url: '/images/logo.png',
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
      images: ['/images/logo.png'],
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/images/logo.png",
      apple: "/images/logo.png",
    },
  };
}

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import StructuredData from "@/components/StructuredData";

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

  return (
    <html lang={locale} className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="font-body antialiased transition-colors duration-300">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <StructuredData />
          <Header />
          <div className="min-h-screen">
            {children}
          </div>
          <Footer />
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
