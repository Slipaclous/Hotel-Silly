import AboutContent from '@/components/AboutContent';
import { prisma } from '@/lib/prisma';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';

// Active le cache statique avec revalidation toutes les heures
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, page: 'about', path: '/a-propos' });
}

export default async function AProposPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  // Récupération des données sur le serveur (SSR)
  const [aboutData, features, pageHero] = await Promise.all([
    prisma.about.findFirst(),
    prisma.feature.findMany({
      orderBy: { order: 'asc' },
    }),
    prisma.pageHero.findFirst({
      where: { page: 'a-propos' },
    })
  ]);

  return (
    <main className="min-h-screen bg-blanc">
      <AboutContent
        aboutData={aboutData}
        features={features}
        pageHero={pageHero}
      />
    </main>
  );
}