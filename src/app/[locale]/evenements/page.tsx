import EvenementsContent from '@/components/EvenementsContent';
import { prisma } from '@/lib/prisma';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import EventsJsonLd from '@/components/EventsJsonLd';
import { withBlur } from '@/lib/blur';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, page: 'events', path: '/evenements' });
}

export default async function EvenementsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  // Événements datés déjà passés : masqués automatiquement (ceux sans date sont permanents).
  // La page est régénérée au plus toutes les heures, donc l'événement disparaît le lendemain.
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  // Récupération des données sur le serveur (SSR)
  const [events, pageHero] = await Promise.all([
    prisma.event.findMany({
      where: { OR: [{ date: null }, { date: { gte: startOfToday } }] },
      orderBy: { order: 'asc' },
    }),
    prisma.pageHero.findFirst({ where: { page: 'evenements' } })
  ]);

  return (
    <main className="min-h-screen bg-blanc">
      <BreadcrumbJsonLd locale={locale} page="events" path="/evenements" />
      <EventsJsonLd events={events} locale={locale} />
      <EvenementsContent events={events} pageHero={await withBlur(pageHero)} />
    </main>
  );
}
