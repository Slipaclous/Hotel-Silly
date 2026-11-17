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

import { setRequestLocale } from 'next-intl/server';
import { buildPageMetadata, SITE_URL } from '@/lib/seo';

// Pré-génère /fr, /en, /nl au build (rendu statique + ISR)
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Contenu modifiable depuis l'admin : régénéré au plus toutes les heures,
// et immédiatement via revalidatePath après chaque modification.
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  // Valeurs par défaut (page d'accueil). Chaque page surcharge titre, description et canonical.
  const base = await buildPageMetadata({ locale, page: 'home', path: '' });

  return {
    ...base,
    metadataBase: new URL(SITE_URL),
    keywords: ["hotel silly", "hotel enghien", "hôtel de luxe silly", "logement enghien", "villa dolce", "hotel belgique", "chambre d'hotes silly", "chambre d'hotes enghien"],
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

  // Active le rendu statique pour next-intl
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale });

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
