import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import RoomSection from '@/components/RoomSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';
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
      <div id="hero" data-nav-section="Accueil" data-nav-is-dark="true">
        <HeroSection initialData={heroData} />
      </div>
      <div id="about" data-nav-section="À propos">
        <AboutSection initialAbout={aboutData} initialFeatures={featuresData} />
      </div>
      <div id="rooms" data-nav-section="Chambres">
        <RoomSection initialRooms={roomsData.slice(0, 3)} />
      </div>
      <div id="testimonials" data-nav-section="Témoignages" data-nav-is-dark="true">
        <TestimonialsSection initialTestimonials={testimonialsData} />
      </div>
      <div id="footer" data-nav-section="Contact" data-nav-is-dark="true">
        <Footer />
      </div>
    </main>
  );
}
