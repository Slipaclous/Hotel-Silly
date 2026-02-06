'use client';

import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
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
        setNewsletterMessage('Inscription réussie !');
        setNewsletterEmail('');
        setTimeout(() => {
          setNewsletterStatus('idle');
          setNewsletterMessage('');
        }, 3000);
      } else {
        setNewsletterStatus('error');
        setNewsletterMessage(data.error || 'Une erreur est survenue');
        setTimeout(() => {
          setNewsletterStatus('idle');
          setNewsletterMessage('');
        }, 3000);
      }
    } catch (error) {
      setNewsletterStatus('error');
      setNewsletterMessage('Erreur de connexion');
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
              <Image
                src="/images/logo.png"
                alt="Villa Dolce"
                fill
                className="object-contain"
              />
            </div>
            <p className="font-body text-sm text-white/70 leading-relaxed mb-8 max-w-md">
              Découvrez notre hôtel de luxe au cœur de Silly, où élégance et confort
              se rencontrent pour créer une expérience hôtelière exceptionnelle.
            </p>

            {/* Coordonnées */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[var(--color-or)] mt-0.5 flex-shrink-0" />
                <span className="font-body text-sm text-white/80">
                  Rue de l&apos;Hôtel, 7830 Silly, Belgique
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-[var(--color-or)] flex-shrink-0" />
                <span className="font-body text-sm text-white/80">
                  +32 2 123 45 67
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[var(--color-or)] flex-shrink-0" />
                <span className="font-body text-sm text-white/80">
                  contact@villadolce.be
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-[var(--color-or)] mt-0.5 flex-shrink-0" />
                <span className="font-body text-sm text-white/80">
                  Ouverture prévue : Printemps 2025
                </span>
              </div>
            </div>
          </div>

          {/* Navigation principale */}
          <div className="md:col-span-2">
            <h4 className="font-display text-lg font-medium mb-6 mt-16">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="font-body text-sm text-white/70 hover:text-[var(--color-or)] transition-colors duration-300 link-underline"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/chambres"
                  className="font-body text-sm text-white/70 hover:text-[var(--color-or)] transition-colors duration-300 link-underline"
                >
                  Chambres & Suites
                </Link>
              </li>
              <li>
                <Link
                  href="/galerie"
                  className="font-body text-sm text-white/70 hover:text-[var(--color-or)] transition-colors duration-300 link-underline"
                >
                  Galerie
                </Link>
              </li>
              <li>
                <Link
                  href="/a-propos"
                  className="font-body text-sm text-white/70 hover:text-[var(--color-or)] transition-colors duration-300 link-underline"
                >
                  À Propos
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="font-body text-sm text-white/70 hover:text-[var(--color-or)] transition-colors duration-300 link-underline"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Nos Services */}
          <div className="md:col-span-2">
            <h4 className="font-display text-lg font-medium mb-6 mt-16">Nos Services</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/evenements"
                  className="font-body text-sm text-white/70 hover:text-[var(--color-or)] transition-colors duration-300 link-underline"
                >
                  Événements
                </Link>
              </li>
              <li>
                <Link
                  href="/seminaires"
                  className="font-body text-sm text-white/70 hover:text-[var(--color-or)] transition-colors duration-300 link-underline"
                >
                  Séminaires
                </Link>
              </li>
              <li>
                <Link
                  href="/carte-cadeau"
                  className="font-body text-sm text-white/70 hover:text-[var(--color-or)] transition-colors duration-300 link-underline"
                >
                  Carte-Cadeau
                </Link>
              </li>
            </ul>

            <h4 className="font-display text-lg font-medium mb-6 mt-8">Informations</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/mentions-legales"
                  className="font-body text-sm text-white/70 hover:text-[var(--color-or)] transition-colors duration-300 link-underline"
                >
                  Mentions Légales
                </Link>
              </li>
              <li>
                <Link
                  href="/politique-confidentialite"
                  className="font-body text-sm text-white/70 hover:text-[var(--color-or)] transition-colors duration-300 link-underline"
                >
                  Politique de Confidentialité
                </Link>
              </li>
              <li>
                <Link
                  href="/cgv"
                  className="font-body text-sm text-white/70 hover:text-[var(--color-or)] transition-colors duration-300 link-underline"
                >
                  Conditions Générales
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Réseaux sociaux */}
          <div className="md:col-span-4">
            <h4 className="font-display text-lg font-medium mb-6 mt-16">Restez Connecté</h4>

            {/* Newsletter */}
            <div className="mb-8">
              <h5 className="font-body text-xs uppercase tracking-widest text-white/60 mb-4">
                Restez informé
              </h5>
              <p className="font-body text-sm text-white/70 mb-4 leading-relaxed">
                Recevez les dernières mises à jour sur nos offres et activités
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col space-y-3">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Votre email"
                  required
                  disabled={newsletterStatus === 'loading'}
                  className="px-4 py-2 bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[var(--color-or)] transition-colors duration-300 font-body text-sm disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === 'loading'}
                  className="px-4 py-2 bg-[var(--color-or)] text-white font-body text-sm font-medium hover:bg-[var(--color-or)]/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {newsletterStatus === 'loading' ? 'Envoi...' : 'Enregistrez-moi'}
                </button>
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
                Suivez-nous
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
              © 2025 Villa Dolce. Tous droits réservés.
            </p>
            <p className="font-body text-xs text-white/40">
              Conçu avec élégance
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 