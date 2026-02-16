import HeroSection from '@/components/HeroSection';
import BookingWidget from '@/components/BookingWidget';
import AboutSection from '@/components/AboutSection';
import RoomSection from '@/components/RoomSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import { prisma } from '@/lib/prisma';
import { getTranslations } from 'next-intl/server';

export default async function Home() {
  const t = await getTranslations('nav');

  // Récupération de toutes les données sur le serveur (SSR)
  let heroData: any = null;
  let aboutData: any = null;
  let roomsData: any[] = [];
  let featuresData: any[] = [];
  let testimonialsData: any[] = [];
  let roomSectionData: any = null;

  try {
    [heroData, aboutData, roomsData, featuresData, testimonialsData] = await Promise.all([
      prisma.hero.findFirst(),
      prisma.about.findFirst(),
      prisma.room.findMany({
        orderBy: { order: 'asc' },
        take: 3
      }),
      prisma.feature.findMany(),
      prisma.testimonial.findMany(),
      (prisma as any).homeRoomSection.findFirst(),
    ]);
  } catch (error) {
    console.error('Error fetching data:', error);
    // Les valeurs par défaut sont déjà définies ci-dessus
  }

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
      <div id="testimonials" data-nav-section={t('testimonials')} data-nav-is-dark="true">
        <TestimonialsSection initialTestimonials={testimonialsData} />
      </div>
    </main>
  );
}
