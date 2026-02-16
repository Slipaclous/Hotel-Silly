'use client';

import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, usePathname } from '@/i18n/routing';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const n = useTranslations('nav');
  const pathname = usePathname();

  const [newsletterEmail, setNewsletterEmail] = useState('');

  if (pathname.startsWith('/admin')) {
    return null;
  }
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterMessage, setNewsletterMessage] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterStatus('loading');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail })
      });

      const data = await response.json();

      if (response.ok) {
        setNewsletterStatus('success');
        setNewsletterMessage(t('newsletterSuccess'));
        setNewsletterEmail('');
        setTimeout(() => {
          setNewsletterStatus('idle');
          setNewsletterMessage('');
        }, 3000);
      } else {
        setNewsletterStatus('error');
        setNewsletterMessage(data.error || t('newsletterError'));
        setTimeout(() => {
          setNewsletterStatus('idle');
          setNewsletterMessage('');
        }, 3000);
      }
    } catch (error) {
      setNewsletterStatus('error');
      setNewsletterMessage(t('newsletterConnError'));
      setTimeout(() => {
        setNewsletterStatus('idle');
        setNewsletterMessage('');
      }, 3000);
    }
  };

  return (
    <footer className="bg-[var(--color-noir)] text-white">
      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Informations hôtel */}
          <div className="md:col-span-4">

            <div className="relative h-46 w-46 mb-4 brightness-0 invert">
              <Link href="/">
                <Image
                  src="/images/logo-clef.png"
                  alt="Villa Dolce"
                  fill
                  className="object-contain"
                />
              </Link>
            </div>
            <p className="font-body text-sm text-white/70 leading-relaxed mb-8 max-w-md">
              {t('description')}
            </p>

            {/* Coordonnées */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[var(--color-or)] mt-0.5 flex-shrink-0" />
                <span className="font-body text-sm text-white/80">
                  PLACE COMMUNALE 9, 7830 Silly, Belgique
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-[var(--color-or)] flex-shrink-0" />
                <span className="font-body text-sm text-white/80">
                  +32 470 13 73 13
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[var(--color-or)] flex-shrink-0" />
                <span className="font-body text-sm text-white/80">
                  info@dolcehotel-silly.com
                </span>
              </div>

            </div>
          </div>

          {/* Navigation principale */}
          <div className="md:col-span-2">
            <h4 className="font-display text-lg font-medium mb-6 mt-16">{t('navTitle')}</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="font-body text-sm text-white/70 hover:text-or transition-colors duration-300 link-underline"
                >
                  {n('home')}
                </Link>
              </li>
              <li>
                <Link
                  href="/chambres"
                  className="font-body text-sm text-white/70 hover:text-or transition-colors duration-300 link-underline"
                >
                  {n('rooms')}
                </Link>
              </li>
              <li>
                <Link
                  href="/galerie"
                  className="font-body text-sm text-white/70 hover:text-or transition-colors duration-300 link-underline"
                >
                  {n('gallery')}
                </Link>
              </li>
              <li>
                <Link
                  href="/a-propos"
                  className="font-body text-sm text-white/70 hover:text-or transition-colors duration-300 link-underline"
                >
                  {n('about')}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="font-body text-sm text-white/70 hover:text-or transition-colors duration-300 link-underline"
                >
                  {n('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Nos Services */}
          <div className="md:col-span-2">
            <h4 className="font-display text-lg font-medium mb-6 mt-16">{t('servicesTitle')}</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/evenements"
                  className="font-body text-sm text-white/70 hover:text-or transition-colors duration-300 link-underline"
                >
                  {n('events')}
                </Link>
              </li>
              <li>
                <Link
                  href="/seminaires"
                  className="font-body text-sm text-white/70 hover:text-or transition-colors duration-300 link-underline"
                >
                  {n('seminars')}
                </Link>
              </li>
              <li>
                <Link
                  href="/carte-cadeau"
                  className="font-body text-sm text-white/70 hover:text-or transition-colors duration-300 link-underline"
                >
                  {n('giftCard')}
                </Link>
              </li>
            </ul>

            <h4 className="font-display text-lg font-medium mb-6 mt-8">{t('infoTitle')}</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/mentions-legales"
                  className="font-body text-sm text-white/70 hover:text-or transition-colors duration-300 link-underline"
                >
                  {t('legal')}
                </Link>
              </li>
              <li>
                <Link
                  href="/politique-confidentialite"
                  className="font-body text-sm text-white/70 hover:text-or transition-colors duration-300 link-underline"
                >
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link
                  href="/cgv"
                  className="font-body text-sm text-white/70 hover:text-or transition-colors duration-300 link-underline"
                >
                  {t('terms')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Réseaux sociaux */}
          <div className="md:col-span-4">
            <h4 className="font-display text-lg font-medium mb-6 mt-16">{t('stayConnected')}</h4>

            {/* Newsletter */}
            <div className="mb-8">
              <h5 className="font-body text-xs uppercase tracking-widest text-white/60 mb-4">
                {t('newsletterTitle')}
              </h5>
              <p className="font-body text-sm text-white/70 mb-4 leading-relaxed">
                {t('newsletterDesc')}
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col space-y-3">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={t('newsletterPlaceholder')}
                  required
                  disabled={newsletterStatus === 'loading'}
                  className="px-4 py-2 bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[var(--color-or)] transition-colors duration-300 font-body text-sm disabled:opacity-50"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={newsletterStatus === 'loading'}
                  className="px-6 py-3 bg-[#C6ad7a] text-white font-body text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-[#2c3840] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed border border-[#C6ad7a] hover:border-white shadow-lg"
                >
                  {newsletterStatus === 'loading' ? t('newsletterLoading') : t('newsletterButton')}
                </motion.button>
                {newsletterMessage && (
                  <p className={`font-body text-xs ${newsletterStatus === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                    {newsletterMessage}
                  </p>
                )}
              </form>
            </div>

            {/* Réseaux sociaux */}
            <div>
              <h5 className="font-body text-xs uppercase tracking-widest text-white/60 mb-4">
                {t('followUs')}
              </h5>
              <div className="flex items-center space-x-4">
                <a
                  href="#"
                  className="text-white/60 hover:text-[var(--color-or)] transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-white/60 hover:text-[var(--color-or)] transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-white/60 hover:text-[var(--color-or)] transition-colors duration-300"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de copyright */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="font-body text-xs text-white/50">
              © 2025 Villa Dolce. {t('copyright')}
            </p>
            <p className="font-body text-xs text-white/40">
              {t('designedWith')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 