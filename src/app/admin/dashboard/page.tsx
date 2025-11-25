'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Home, Info, Bed, Image, Calendar, ChevronRight } from 'lucide-react';
import HeroEditor from '@/components/admin/HeroEditor';
import AboutEditor from '@/components/admin/AboutEditor';
import FeaturesEditor from '@/components/admin/FeaturesEditor';
import RoomsEditor from '@/components/admin/RoomsEditor';
import TestimonialsEditor from '@/components/admin/TestimonialsEditor';
import GalleryEditor from '@/components/admin/GalleryEditor';
import EventsEditor from '@/components/admin/EventsEditor';
import PageHeroEditor from '@/components/admin/PageHeroEditor';

interface Admin {
  name: string;
  email: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [activePage, setActivePage] = useState<string | null>('accueil');
  const [activeSection, setActiveSection] = useState<string>('hero');
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

  if (!admin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif font-bold text-gray-900">
                Back Office - Hôtel de Silly
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Bienvenue, {admin.name}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Home className="w-5 h-5" />
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-4">
              <h2 className="text-sm font-semibold text-gray-500 uppercase mb-4">
                Pages du site
              </h2>
              <nav className="space-y-1">
                {/* Page d'accueil */}
                <div>
                  <button
                    onClick={() => {
                      setActivePage('accueil');
                      setActiveSection('hero');
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                      activePage === 'accueil'
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Home className="w-5 h-5" />
                      <span className="font-medium">Page d&apos;accueil</span>
                    </div>
                    {activePage === 'accueil' && (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  {activePage === 'accueil' && (
                    <div className="mt-2 ml-4 space-y-1">
                      <button
                        onClick={() => setActiveSection('hero')}
                        className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                          activeSection === 'hero'
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        Section Hero
                      </button>
                      <button
                        onClick={() => setActiveSection('about')}
                        className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                          activeSection === 'about'
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        Section À Propos
                      </button>
                      <button
                        onClick={() => setActiveSection('features')}
                        className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                          activeSection === 'features'
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        Features
                      </button>
                      <button
                        onClick={() => setActiveSection('rooms')}
                        className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                          activeSection === 'rooms'
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        Chambres
                      </button>
                      <button
                        onClick={() => setActiveSection('testimonials')}
                        className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                          activeSection === 'testimonials'
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        Témoignages
                      </button>
                    </div>
                  )}
                </div>

                {/* Page Chambres */}
                <div>
                  <button
                    onClick={() => {
                      setActivePage('chambres');
                      setActiveSection('hero-chambres');
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                      activePage === 'chambres'
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Bed className="w-5 h-5" />
                      <span className="font-medium">Page Chambres</span>
                    </div>
                    {activePage === 'chambres' && (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  {activePage === 'chambres' && (
                    <div className="mt-2 ml-4 space-y-1">
                      <button
                        onClick={() => setActiveSection('hero-chambres')}
                        className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                          activeSection === 'hero-chambres'
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        Hero
                      </button>
                      <button
                        onClick={() => setActiveSection('rooms')}
                        className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                          activeSection === 'rooms'
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        Chambres
                      </button>
                    </div>
                  )}
                </div>

                {/* Page À Propos */}
                <div>
                  <button
                    onClick={() => {
                      setActivePage('a-propos');
                      setActiveSection('about');
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                      activePage === 'a-propos'
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Info className="w-5 h-5" />
                      <span className="font-medium">Page À Propos</span>
                    </div>
                    {activePage === 'a-propos' && (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  {activePage === 'a-propos' && (
                    <div className="mt-2 ml-4 space-y-1">
                      <button
                        onClick={() => setActiveSection('hero-a-propos')}
                        className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                          activeSection === 'hero-a-propos'
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        Hero
                      </button>
                      <button
                        onClick={() => setActiveSection('about')}
                        className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                          activeSection === 'about'
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        Section À Propos
                      </button>
                      <button
                        onClick={() => setActiveSection('features')}
                        className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                          activeSection === 'features'
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        Features
                      </button>
                    </div>
                  )}
                </div>

                {/* Page Galerie */}
                <div>
                  <button
                    onClick={() => {
                      setActivePage('galerie');
                      setActiveSection('hero-galerie');
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                      activePage === 'galerie'
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Image className="w-5 h-5" />
                      <span className="font-medium">Page Galerie</span>
                    </div>
                    {activePage === 'galerie' && (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  {activePage === 'galerie' && (
                    <div className="mt-2 ml-4 space-y-1">
                      <button
                        onClick={() => setActiveSection('hero-galerie')}
                        className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                          activeSection === 'hero-galerie'
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        Hero
                      </button>
                      <button
                        onClick={() => setActiveSection('gallery')}
                        className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                          activeSection === 'gallery'
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        Galerie
                      </button>
                    </div>
                  )}
                </div>

                {/* Page Événements */}
                <div>
                  <button
                    onClick={() => {
                      setActivePage('evenements');
                      setActiveSection('hero-evenements');
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                      activePage === 'evenements'
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5" />
                      <span className="font-medium">Page Événements</span>
                    </div>
                    {activePage === 'evenements' && (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  {activePage === 'evenements' && (
                    <div className="mt-2 ml-4 space-y-1">
                      <button
                        onClick={() => setActiveSection('hero-evenements')}
                        className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                          activeSection === 'hero-evenements'
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        Hero
                      </button>
                      <button
                        onClick={() => setActiveSection('events')}
                        className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                          activeSection === 'events'
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        Événements
                      </button>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-9">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {/* Breadcrumb */}
              <div className="mb-6 flex items-center space-x-2 text-sm text-gray-600">
                <span>Pages</span>
                <ChevronRight className="w-4 h-4" />
                <span className="font-medium text-gray-900">
                  {activePage === 'accueil' && "Page d'accueil"}
                  {activePage === 'chambres' && 'Page Chambres'}
                  {activePage === 'a-propos' && "Page À Propos"}
                  {activePage === 'galerie' && 'Page Galerie'}
                  {activePage === 'evenements' && 'Page Événements'}
                </span>
                {activePage === 'accueil' && activeSection !== 'hero' && (
                  <>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-900">
                      {activeSection === 'about' && 'Section À Propos'}
                      {activeSection === 'features' && 'Features'}
                      {activeSection === 'rooms' && 'Chambres'}
                      {activeSection === 'testimonials' && 'Témoignages'}
                    </span>
                  </>
                )}
                {activePage === 'chambres' && (
                  <>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-900">
                      {activeSection === 'hero-chambres' && 'Hero'}
                      {activeSection === 'rooms' && 'Chambres'}
                    </span>
                  </>
                )}
                {activePage === 'a-propos' && (
                  <>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-900">
                      {activeSection === 'hero-a-propos' && 'Hero'}
                      {activeSection === 'about' && 'Section À Propos'}
                      {activeSection === 'features' && 'Features'}
                    </span>
                  </>
                )}
                {activePage === 'galerie' && (
                  <>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-900">
                      {activeSection === 'hero-galerie' && 'Hero'}
                      {activeSection === 'gallery' && 'Galerie'}
                    </span>
                  </>
                )}
                {activePage === 'evenements' && (
                  <>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-900">
                      {activeSection === 'hero-evenements' && 'Hero'}
                      {activeSection === 'events' && 'Événements'}
                    </span>
                  </>
                )}
              </div>

              {/* Content */}
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
        </div>
      </div>
    </div>
  );
}


