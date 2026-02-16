'use client';

import { useEffect, useState } from 'react';
import { useRouter } from '@/i18n/routing';
import Sidebar from '@/components/admin/Sidebar';
import DashboardOverview from '@/components/admin/DashboardOverview';
import HeroEditor from '@/components/admin/HeroEditor';
import AboutEditor from '@/components/admin/AboutEditor';
import FeaturesEditor from '@/components/admin/FeaturesEditor';
import RoomsEditor from '@/components/admin/RoomsEditor';
import TestimonialsEditor from '@/components/admin/TestimonialsEditor';
import GalleryEditor from '@/components/admin/GalleryEditor';
import EventsEditor from '@/components/admin/EventsEditor';
import TranslationsManager from '@/components/admin/TranslationsManager';
import PageHeroEditor from '@/components/admin/PageHeroEditor';

interface Admin {
  name: string;
  email: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [activePage, setActivePage] = useState<string>('dashboard');
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [admin, setAdmin] = useState<Admin | null>(null);

  useEffect(() => {
    // Vérifier l'authentification
    const adminData = sessionStorage.getItem('admin');
    if (!adminData) {
      router.push('/admin');
      return;
    }
    setAdmin(JSON.parse(adminData));
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('admin');
    router.push('/admin');
  };

  const handlePageChange = (page: string, section: string) => {
    setActivePage(page);
    setActiveSection(section);
  };

  if (!admin) {
    return (
      <div className="min-h-screen bg-blanc-100 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-or mb-4"></div>
          <p className="text-noir/40 font-body text-sm animate-pulse">Initialisation de l&apos;espace sécurisé...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blanc flex font-body">
      {/* Sidebar - Fixe à gauche */}
      <Sidebar
        activePage={activePage}
        activeSection={activeSection}
        onPageChange={handlePageChange}
        onSectionChange={setActiveSection}
        onLogout={handleLogout}
        adminName={admin.name}
      />

      {/* Main Content - Décalé à droite à cause de la sidebar fixe */}
      <main className="flex-1 ml-72 min-h-screen relative bg-blanc-100/30">
        {/* Grain Overlay */}
        <div className="fixed inset-0 bg-grain pointer-events-none z-50 opacity-[0.03]" />

        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-or/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-taupe/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 p-12 max-w-7xl mx-auto">
          {/* Content Rendering */}
          <div className="min-h-screen pb-20">
            {activePage === 'dashboard' && <DashboardOverview />}
            {activePage === 'translations' && <TranslationsManager />}

            {activeSection === 'hero' && <HeroEditor />}
            {activeSection === 'about' && <AboutEditor />}
            {activeSection === 'features' && <FeaturesEditor />}
            {activeSection === 'rooms' && <RoomsEditor />}
            {activeSection === 'testimonials' && <TestimonialsEditor />}
            {activeSection === 'gallery' && <GalleryEditor />}
            {activeSection === 'events' && <EventsEditor />}

            {activeSection === 'hero-chambres' && <PageHeroEditor page="chambres" pageLabel="Page Chambres" />}
            {activeSection === 'hero-a-propos' && <PageHeroEditor page="a-propos" pageLabel="Page À Propos" />}
            {activeSection === 'hero-galerie' && <PageHeroEditor page="galerie" pageLabel="Page Galerie" />}
            {activeSection === 'hero-evenements' && <PageHeroEditor page="evenements" pageLabel="Page Événements" />}
          </div>
        </div>
      </main>
    </div>
  );
}


