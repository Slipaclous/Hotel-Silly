import ChambresContent from '@/components/ChambresContent';
import { prisma } from '@/lib/prisma';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, page: 'rooms', path: '/chambres' });
}

export default async function ChambresPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  // Récupération des données sur le serveur (SSR)
  const [rooms, pageHero, roomServices] = await Promise.all([
    prisma.room.findMany({
      orderBy: { order: 'asc' },
      include: { images: { orderBy: { order: 'asc' } } }
    }),
    prisma.pageHero.findFirst({ where: { page: 'chambres' } }),
    prisma.roomService.findMany({ orderBy: { order: 'asc' } })
  ]);

  return (
    <main className="min-h-screen bg-blanc">
      <BreadcrumbJsonLd locale={locale} page="rooms" path="/chambres" />
      <ChambresContent rooms={rooms} pageHero={pageHero} roomServices={roomServices} />
    </main>
  );
}
