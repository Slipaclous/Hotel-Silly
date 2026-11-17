import EvenementsContent from '@/components/EvenementsContent';
import { prisma } from '@/lib/prisma';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, page: 'events', path: '/evenements' });
}

export default async function EvenementsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  // Récupération des données sur le serveur (SSR)
  const [events, pageHero] = await Promise.all([
    prisma.event.findMany({ orderBy: { order: 'asc' } }),
    prisma.pageHero.findFirst({ where: { page: 'evenements' } })
  ]);

  return (
    <main className="min-h-screen bg-blanc">
      <EvenementsContent events={events} pageHero={pageHero} />
    </main>
  );
}
