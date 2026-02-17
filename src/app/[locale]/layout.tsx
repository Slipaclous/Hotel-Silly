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

export const metadata: Metadata = {
  title: "Hôtel de Silly - Luxe & Raffinement",
  description: "Découvrez notre hôtel de luxe où élégance et confort se rencontrent pour créer une expérience inoubliable.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

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
