import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import RoomSection from '@/components/RoomSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';
import NavigationDots from '@/components/NavigationDots';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <div id="hero">
        <HeroSection />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <div id="rooms">
        <RoomSection />
      </div>
      <div id="testimonials">
        <TestimonialsSection />
      </div>
      <div id="footer">
        <Footer />
      </div>
      <NavigationDots />
    </main>
  );
}
