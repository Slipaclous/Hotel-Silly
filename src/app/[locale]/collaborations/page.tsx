import CollaborationsContent from '@/components/CollaborationsContent';
import { prisma } from '@/lib/prisma';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { withBlur } from '@/lib/blur';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, page: 'collaborations', path: '/collaborations' });
}

export default async function CollaborationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Récupération des données sur le serveur (SSR)
  const [collaborations, pageHero] = await Promise.all([
    prisma.collaboration.findMany({ orderBy: { order: 'asc' } }),
    prisma.pageHero.findFirst({ where: { page: 'collaborations' } })
  ]);

  return (
    <main className="min-h-screen bg-white">
      <BreadcrumbJsonLd locale={locale} page="collaborations" path="/collaborations" />
      <CollaborationsContent collaborations={collaborations} pageHero={await withBlur(pageHero)} />
    </main>
  );
}
