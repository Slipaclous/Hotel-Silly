'use client';

import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[var(--color-noir)] text-white">
      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Informations hôtel */}
          <div className="md:col-span-5">
            <h3 className="font-display text-3xl font-medium mb-2">
              Villa Dolce
            </h3>
            <div className="flex items-center space-x-2 mb-8">
              <div className="w-12 h-px bg-[var(--color-or)]"></div>
              <span className="font-body text-[10px] uppercase tracking-widest text-white/60">
                Luxe & Raffinement
              </span>
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

          {/* Navigation */}
          <div className="md:col-span-3">
            <h4 className="font-display text-lg font-medium mb-6">Navigation</h4>
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
                  href="/evenements"
                  className="font-body text-sm text-white/70 hover:text-[var(--color-or)] transition-colors duration-300 link-underline"
                >
                  Événements
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

          {/* Informations légales */}
          <div className="md:col-span-4">
            <h4 className="font-display text-lg font-medium mb-6">Informations</h4>
            <ul className="space-y-3 mb-8">
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