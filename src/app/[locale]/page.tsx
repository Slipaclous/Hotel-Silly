import HeroSection from '@/components/HeroSection';
import BookingWidget from '@/components/BookingWidget';
import AboutSection from '@/components/AboutSection';
import RoomSection from '@/components/RoomSection';
import { prisma } from '@/lib/prisma';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, page: 'home', path: '' });
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('nav');

  // Récupération de toutes les données sur le serveur (SSR)
  // Pas de try/catch : si la base est momentanément injoignable, Next.js garde la
  // version précédente de la page (ISR) au lieu de publier un accueil vide.
  const [heroData, aboutData, roomsData, featuresData, roomSectionData] = await Promise.all([
    prisma.hero.findFirst(),
    prisma.about.findFirst(),
    prisma.room.findMany({
      orderBy: { order: 'asc' },
      take: 3
    }),
    prisma.feature.findMany(),
    prisma.homeRoomSection.findFirst(),
  ]);

  return (
    <main className="min-h-screen">
      <div id="hero" data-nav-section={t('home') || 'Accueil'} data-nav-is-dark="true">
        <HeroSection initialData={heroData} />
      </div>
      <BookingWidget />
      <div id="about" data-nav-section={t('about')} className="pt-12">
        <AboutSection initialAbout={aboutData} initialFeatures={featuresData} />
      </div>
      <div id="rooms" data-nav-section={t('rooms')}>
        <RoomSection initialRooms={roomsData.slice(0, 3)} initialData={roomSectionData} />
      </div>
      {/* <div id="testimonials" data-nav-section={t('testimonials')} data-nav-is-dark="true">
        <TestimonialsSection initialTestimonials={testimonialsData} />
      </div> */}
    </main>
  );
}
