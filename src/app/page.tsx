import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import RoomSection from '@/components/RoomSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';
import dynamic from 'next/dynamic';

const NavigationDots = dynamic(() => import('@/components/NavigationDots'));

import { prisma } from '@/lib/prisma';

export default async function Home() {
  // Récupération de toutes les données sur le serveur (SSR)
  const [heroData, aboutData, roomsData, featuresData, testimonialsData] = await Promise.all([
    prisma.hero.findFirst(),
    prisma.about.findFirst(),
    prisma.room.findMany({
      orderBy: { order: 'asc' },
      take: 3
    }),
    prisma.feature.findMany(),
    prisma.testimonial.findMany(),
  ]);

  return (
    <main className="min-h-screen">
      <Header />
      <div id="hero">
        <HeroSection initialData={heroData} />
      </div>
      <div id="about">
        <AboutSection initialAbout={aboutData} initialFeatures={featuresData} />
      </div>
      <div id="rooms">
        <RoomSection initialRooms={roomsData.slice(0, 3)} />
      </div>
      <div id="testimonials">
        <TestimonialsSection initialTestimonials={testimonialsData} />
      </div>
      <div id="footer">
        <Footer />
      </div>
      <NavigationDots />
    </main>
  );
}
