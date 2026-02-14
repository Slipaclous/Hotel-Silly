'use client';

import { useState, useEffect } from 'react';
import { Phone, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();


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
        : isScrolled
          ? 'bg-white/98 backdrop-blur-sm shadow-elegant'
          : 'bg-transparent'
        }`}
    >
      {/* Barre supérieure discrète */}
      <div className={`border-b transition-all duration-300 ${(!isScrolled && !isMenuOpen) ? 'border-white/20' : 'border-[var(--color-gris-clair)]'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-10">
            <div className="flex items-center space-x-6 text-xs">
              <span className={`font-body font-light ${(!isScrolled && !isMenuOpen) ? 'text-white/90' : 'text-[var(--color-gris)]'
                }`}>
                Silly, Belgique
              </span>
              <span className={`hidden sm:inline font-body font-light ${(!isScrolled && !isMenuOpen) ? 'text-white/90' : 'text-[var(--color-gris)]'
                }`}>
                Ouverture Printemps 2025
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className={`w-3 h-3 ${(!isScrolled && !isMenuOpen) ? 'text-white' : 'text-[var(--color-or)]'
                }`} />
              <span className={`text-xs font-body font-light ${(!isScrolled && !isMenuOpen) ? 'text-white' : 'text-[var(--color-noir)]'
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
              <div className={`relative h-62 w-62 transition-all duration-300 ${(!isScrolled && !isMenuOpen) ? 'invert brightness-0' : ''
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
                className={`font-body text-sm font-light tracking-wide link-underline transition-colors duration-300 ${(!isScrolled && !isMenuOpen)
                  ? 'text-white hover:text-white/80'
                  : 'text-[var(--color-noir)] hover:text-[var(--color-or)]'
                  }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Menu déroulant Services */}
            <div
              className={`relative h-full flex items-center`}
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className={`font-body text-sm font-light tracking-wide transition-colors duration-300 flex items-center space-x-1 h-full ${(!isScrolled && !isMenuOpen)
                  ? 'text-white hover:text-white/80'
                  : 'text-[var(--color-noir)] hover:text-[var(--color-or)]'
                  }`}
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown menu */}
              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 pt-4 z-50"
                  >
                    <div className="bg-white shadow-elegant border border-noir/10 py-2 w-48 rounded-sm overflow-hidden">
                      {servicesMenu.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-3 font-body text-sm text-noir hover:bg-noir/[0.02] hover:text-or transition-colors duration-300"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Bouton réservation */}
          <div className="hidden lg:block">
            <Link
              href="/contact"
              className={`font-body text-sm font-normal px-6 py-2.5 border transition-all duration-300 ${(!isScrolled && !isMenuOpen)
                ? 'border-white text-white hover:bg-white hover:text-[var(--color-noir)]'
                : 'border-[var(--color-noir)] text-[var(--color-noir)] hover:bg-[var(--color-noir)] hover:text-white'
                }`}
            >
              Réserver
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 z-[60] relative group"
            aria-label="Menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between relative">
              <span className={`block h-0.5 w-full transition-all duration-300 transform origin-center ${isMenuOpen
                  ? 'rotate-45 translate-y-[9px] bg-[#2c3840]'
                  : (isScrolled ? 'bg-[#2c3840]' : 'bg-white')
                }`}></span>
              <span className={`block h-0.5 w-full transition-all duration-300 ${isMenuOpen
                  ? 'opacity-0'
                  : (isScrolled ? 'bg-[#2c3840]' : 'bg-white')
                }`}></span>
              <span className={`block h-0.5 w-full transition-all duration-300 transform origin-center ${isMenuOpen
                  ? '-rotate-45 -translate-y-[9px] bg-[#2c3840]'
                  : (isScrolled ? 'bg-[#2c3840]' : 'bg-white')
                }`}></span>
            </div>
          </button>
        </div>

        {/* Menu mobile Full Screen Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: "tween", duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="fixed inset-0 bg-white z-[55] flex flex-col pt-32 px-8 lg:hidden"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-or/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-noir/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

              <nav className="flex flex-col space-y-6 relative z-10">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="font-display text-4xl text-noir hover:text-or transition-colors block"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="pt-6 border-t border-noir/10 mt-6"
                >
                  <p className="font-body text-xs font-bold uppercase tracking-widest text-noir/40 mb-4">Services</p>
                  <div className="space-y-3">
                    {servicesMenu.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block font-body text-lg text-noir/70 hover:text-or transition-colors"
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="pt-8"
                >
                  <Link
                    href="/contact"
                    className="w-full block bg-noir text-white text-center py-4 font-body text-sm uppercase tracking-widest hover:bg-or transition-all"
                    onClick={() => setMenuOpen(false)}
                  >
                    Réserver votre séjour
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
} 