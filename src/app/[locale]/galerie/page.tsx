import GalerieContent from '@/components/GalerieContent';
import { prisma } from '@/lib/prisma';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

// Active le cache statique avec revalidation toutes les heures
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, page: 'gallery', path: '/galerie' });
}

export default async function GaleriePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  // Récupération des données sur le serveur (SSR)
  const [images, pageHero] = await Promise.all([
    prisma.galleryImage.findMany({
      orderBy: { order: 'asc' },
    }),
    prisma.pageHero.findFirst({
      where: { page: 'galerie' },
    })
  ]);

  return (
    <main className="min-h-screen bg-blanc">
      <BreadcrumbJsonLd locale={locale} page="gallery" path="/galerie" />
      <GalerieContent
        initialImages={images}
        pageHero={pageHero}
      />
    </main>
  );
}
