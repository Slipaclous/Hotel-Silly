'use client';

import { useState, useEffect } from 'react';
import { Phone, ChevronDown } from 'lucide-react';
import { Link, usePathname } from '@/i18n/routing';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslations } from 'next-intl';

export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('nav');
  const c = useTranslations('common');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: t('home'), href: '/' },
    { name: t('rooms'), href: '/chambres' },
    { name: t('gallery'), href: '/galerie' },
    { name: t('about'), href: '/a-propos' },
    { name: t('contact'), href: '/contact' },
  ];

  const servicesMenu = [
    { name: t('events'), href: '/evenements' },
    { name: t('seminars'), href: '/seminaires' },
    { name: t('giftCard'), href: '/carte-cadeau' },
  ];

  if (pathname.startsWith('/admin')) {
    return null;
  }

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
      <div className={`hidden lg:block border-b transition-all duration-300 ${(!isScrolled && !isMenuOpen) ? 'border-white/20' : 'border-[var(--color-gris-clair)]'
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
                Hôtel Villa Dolce ★★★
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className={`w-3 h-3 ${(!isScrolled && !isMenuOpen) ? 'text-white' : 'text-[var(--color-or)]'
                  }`} />
                <span className={`text-xs font-body font-light ${(!isScrolled && !isMenuOpen) ? 'text-white' : 'text-[var(--color-noir)]'
                  }`}>
                  +32 470 13 73 13
                </span>
              </div>
              <LanguageSwitcher isScrolled={isScrolled} isMenuOpen={isMenuOpen} />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation principale */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center h-20 ${isMenuOpen ? 'justify-between' : 'justify-end lg:justify-between'}`}>
          {/* Logo minimaliste */}
          <Link href="/" className={`items-center space-x-3 group ${isMenuOpen ? 'flex' : 'hidden lg:flex'}`}>
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
                key={item.href}
                href={item.href as any}
                prefetch={true}
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
                <span>{t('services')}</span>
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
                          key={item.href}
                          href={item.href as any}
                          prefetch={true}
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
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/#booking-widget"
                prefetch={true}
                className={`font-body text-xs font-bold uppercase tracking-widest px-8 py-3 border transition-all duration-500 shadow-md hover:shadow-lg ${(!isScrolled && !isMenuOpen)
                  ? 'border-white text-white hover:bg-white hover:text-[#2c3840] hover:border-white'
                  : 'border-[#2c3840] text-white bg-[#2c3840] hover:bg-[#C6ad7a] hover:border-[#C6ad7a]'
                  }`}
              >
                {c('book')}
              </Link>
            </motion.div>
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
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    <Link
                      href={item.href as any}
                      prefetch={true}
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
                  <p className="font-body text-xs font-bold uppercase tracking-widest text-noir/40 mb-4">{t('services')}</p>
                  <div className="space-y-3">
                    {servicesMenu.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href as any}
                        prefetch={true}
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
                  className="pt-8 mb-8"
                >
                  <Link
                    href="/#booking-widget"
                    prefetch={true}
                    className="w-full block bg-[#2c3840] text-white text-center py-5 font-body text-xs font-bold uppercase tracking-widest hover:bg-[#C6ad7a] transition-all duration-500 shadow-lg"
                    onClick={() => setMenuOpen(false)}
                  >
                    {c('bookStay')}
                  </Link>
                </motion.div>

                {/* Mobile Language Switcher & Contact */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="mt-auto pb-10 border-t border-noir/10 pt-8"
                >
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-body text-noir/40 uppercase tracking-widest">Langue</span>
                    <LanguageSwitcher isScrolled={true} isMenuOpen={true} />
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-noir/5 rounded-xl">
                    <div className="w-10 h-10 bg-or/10 rounded-full flex items-center justify-center">
                      <Phone className="w-4 h-4 text-or" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-noir/40 font-bold mb-0.5">Contact</p>
                      <p className="text-sm font-body text-noir">+32 470 13 73 13</p>
                    </div>
                  </div>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div >
    </header >
  );
}
