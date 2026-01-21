'use client';

import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Chambres & Suites', href: '/chambres' },
    { name: 'Galerie', href: '/galerie' },
    { name: 'Événements', href: '/evenements' },
    { name: 'À Propos', href: '/a-propos' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isMenuOpen
          ? 'bg-white shadow-elegant'
          : isHomePage
            ? isScrolled
              ? 'bg-white/98 backdrop-blur-sm shadow-elegant'
              : 'bg-transparent'
            : 'bg-white/98 backdrop-blur-sm shadow-elegant'
        }`}
    >
      {/* Barre supérieure discrète */}
      <div className={`border-b transition-all duration-300 ${(isHomePage && !isScrolled && !isMenuOpen) ? 'border-white/20' : 'border-[var(--color-gris-clair)]'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-10">
            <div className="flex items-center space-x-6 text-xs">
              <span className={`font-body font-light ${(isHomePage && !isScrolled && !isMenuOpen) ? 'text-white/90' : 'text-[var(--color-gris)]'
                }`}>
                Silly, Belgique
              </span>
              <span className={`hidden sm:inline font-body font-light ${(isHomePage && !isScrolled && !isMenuOpen) ? 'text-white/90' : 'text-[var(--color-gris)]'
                }`}>
                Ouverture Printemps 2025
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className={`w-3 h-3 ${(isHomePage && !isScrolled && !isMenuOpen) ? 'text-white' : 'text-[var(--color-or)]'
                }`} />
              <span className={`text-xs font-body font-light ${(isHomePage && !isScrolled && !isMenuOpen) ? 'text-white' : 'text-[var(--color-noir)]'
                }`}>
                +32 2 123 45 67
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation principale */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo minimaliste */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="flex flex-col">
              <h1 className={`font-display text-2xl font-medium tracking-tight transition-colors duration-300 ${(isHomePage && !isScrolled && !isMenuOpen) ? 'text-white' : 'text-[var(--color-noir)]'
                }`}>
                Villa Dolce
              </h1>
              <div className="flex items-center space-x-2 mt-0.5">
                <div className="w-8 h-px bg-[var(--color-or)]"></div>
                <span className={`font-body text-[10px] uppercase tracking-widest transition-colors duration-300 ${(isHomePage && !isScrolled && !isMenuOpen) ? 'text-white/80' : 'text-[var(--color-gris)]'
                  }`}>
                  Luxe & Raffinement
                </span>
              </div>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-body text-sm font-light tracking-wide link-underline transition-colors duration-300 ${(isHomePage && !isScrolled && !isMenuOpen)
                    ? 'text-white hover:text-white/80'
                    : 'text-[var(--color-noir)] hover:text-[var(--color-or)]'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Bouton réservation */}
          <div className="hidden lg:block">
            <Link
              href="/contact"
              className={`font-body text-sm font-normal px-6 py-2.5 border transition-all duration-300 ${(isHomePage && !isScrolled && !isMenuOpen)
                  ? 'border-white text-white hover:bg-white hover:text-[var(--color-noir)]'
                  : 'border-[var(--color-noir)] text-[var(--color-noir)] hover:bg-[var(--color-noir)] hover:text-white'
                }`}
            >
              Réserver
            </Link>
          </div>

          {/* Menu mobile */}
          <button
            onClick={() => setMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2"
            aria-label="Menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`block h-px w-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                } ${(isHomePage && !isScrolled && !isMenuOpen) ? 'bg-white' : 'bg-[var(--color-noir)]'}`}></span>
              <span className={`block h-px w-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'
                } ${(isHomePage && !isScrolled && !isMenuOpen) ? 'bg-white' : 'bg-[var(--color-noir)]'}`}></span>
              <span className={`block h-px w-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                } ${(isHomePage && !isScrolled && !isMenuOpen) ? 'bg-white' : 'bg-[var(--color-noir)]'}`}></span>
            </div>
          </button>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="lg:hidden pb-6 border-t border-[var(--color-gris-clair)]">
            <nav className="flex flex-col space-y-4 pt-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="font-body text-sm text-[var(--color-noir)] hover:text-[var(--color-or)] transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="font-body text-sm border border-[var(--color-noir)] text-[var(--color-noir)] hover:bg-[var(--color-noir)] hover:text-white transition-all px-6 py-2.5 text-center mt-4"
                onClick={() => setMenuOpen(false)}
              >
                Réserver
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 