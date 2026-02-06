'use client';

import { useState, useEffect } from 'react';
import { Phone, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setServicesOpen] = useState(false);
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
    { name: 'À Propos', href: '/a-propos' },
    { name: 'Contact', href: '/contact' },
  ];

  const servicesMenu = [
    { name: 'Événements', href: '/evenements' },
    { name: 'Séminaires', href: '/seminaires' },
    { name: 'Carte-Cadeau', href: '/carte-cadeau' },
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
              <div className={`relative h-62 w-62 transition-all duration-300 ${(isHomePage && !isScrolled && !isMenuOpen) ? 'invert brightness-0' : ''
                }`}>
                <Image
                  src="/images/logo-clef.png"
                  alt="Villa Dolce"
                  fill
                  className="object-contain"
                  priority
                />
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

            {/* Menu déroulant Services */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className={`font-body text-sm font-light tracking-wide transition-colors duration-300 flex items-center space-x-1 ${(isHomePage && !isScrolled && !isMenuOpen)
                  ? 'text-white hover:text-white/80'
                  : 'text-[var(--color-noir)] hover:text-[var(--color-or)]'
                  }`}
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown menu */}
              {isServicesOpen && (
                <div className="absolute top-full left-0 pt-2 z-50">
                  <div className="bg-white shadow-elegant border border-noir/10 py-2 w-48">
                    {servicesMenu.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2 font-body text-sm text-noir hover:bg-[var(--color-blanc-200)] hover:text-[var(--color-or)] transition-colors duration-300"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
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

              {/* Services accordéon mobile */}
              <div>
                <button
                  onClick={() => setServicesOpen(!isServicesOpen)}
                  className="w-full flex items-center justify-between font-body text-sm text-[var(--color-noir)] hover:text-[var(--color-or)] transition-colors"
                >
                  <span>Services</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>

                {isServicesOpen && (
                  <div className="mt-2 ml-4 space-y-2">
                    {servicesMenu.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block font-body text-sm text-[var(--color-noir)]/70 hover:text-[var(--color-or)] transition-colors"
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

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