'use client';

import { useState, useEffect } from 'react';
import { Phone, Star, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Accueil', href: '/' },
    { 
      name: 'Chambres & Suites', 
      href: '/chambres',
      dropdown: [
        { name: 'Suite Présidentielle', href: '/chambres/suite-presidentielle' },
        { name: 'Chambre Deluxe', href: '/chambres/chambre-deluxe' },
        { name: 'Suite Familiale', href: '/chambres/suite-familiale' },
        { name: 'Toutes nos Chambres', href: '/chambres' },
      ]
    },
    { name: 'Galerie', href: '/galerie' },
    { name: 'Événements', href: '/evenements' },
    { name: 'À Propos', href: '/a-propos' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl border-b border-white/30 shadow-2xl' 
        : 'bg-transparent'
    }`}>
      {/* Barre de statut luxueuse */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 text-gray-300" />
                <span className="font-medium">Ouverture 2025 - Luxe & Confort</span>
              </div>
              <span className="hidden sm:inline">|</span>
              <span className="hidden sm:inline">Silly, Belgique</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="hidden md:inline">Ouverture prévue : Printemps 2025</span>
              <span className="hidden lg:inline">|</span>
              <span className="hidden lg:inline">+32 2 123 45 67</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation principale */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo élégant */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <span className="text-white font-serif text-2xl font-bold">H</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center">
                  <Star className="w-2 h-2 text-white" />
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-serif font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                  Hôtel de Silly
                </h1>
                <p className={`text-xs font-cursive tracking-wider transition-colors duration-300 ${
                  isScrolled ? 'text-gray-600' : 'text-white'
                }`}>
                  Expérience Unique
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex space-x-1">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className={`relative px-4 py-2 font-medium transition-all duration-300 rounded-lg backdrop-blur-sm ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/50' 
                      : 'text-white hover:text-gray-200 hover:bg-white/10'
                  }`}
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.name}
                  {item.dropdown && (
                    <ChevronDown className="inline w-3 h-3 ml-1 transition-transform duration-300 group-hover:rotate-180" />
                  )}
                  
                  {/* Ligne de soulignement animée */}
                  <div className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                    isScrolled ? 'bg-gray-800' : 'bg-white'
                  }`}></div>
                </Link>

                {/* Dropdown élégant */}
                {item.dropdown && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/30 overflow-hidden">
                    <div className="py-2">
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="block px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50/50 transition-all duration-200 font-medium"
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Boutons d'action */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className={`relative group px-6 py-2 font-medium transition-all duration-300 rounded-lg backdrop-blur-sm ${
              isScrolled 
                ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/50' 
                : 'text-white hover:text-gray-200 hover:bg-white/10'
            }`}>
              <span className="relative z-10">Contact</span>
            </button>
            
            <button className="relative group px-8 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              <span className="relative z-10 flex items-center space-x-2">
                <Star className="w-4 h-4" />
                <span>Pré-réserver</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Menu mobile */}
          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!isMenuOpen)}
              className={`relative p-2 rounded-lg backdrop-blur-sm transition-all duration-200 ${
                isScrolled 
                  ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/50' 
                  : 'text-white hover:text-gray-200 hover:bg-white/10'
              }`}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
                }`}></span>
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}></span>
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
                }`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Menu mobile élégant */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-4 py-6 bg-white/95 backdrop-blur-xl border-t border-white/30 shadow-2xl rounded-b-2xl">
              <div className="space-y-2">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className="block px-4 py-3 text-gray-700 hover:text-gray-900 font-medium rounded-lg hover:bg-gray-50/50 transition-all duration-200"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.dropdown && (
                      <div className="ml-4 mt-2 space-y-1">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50/50 transition-all duration-200"
                            onClick={() => setMenuOpen(false)}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/30">
                <div className="flex items-center space-x-2 text-gray-700 mb-4">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm font-medium">+32 2 123 45 67</span>
                </div>
                <button className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white font-medium py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Pré-réserver
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 