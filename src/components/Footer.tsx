'use client';

import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Hotel Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm border border-white/30 rounded-lg flex items-center justify-center">
                <span className="text-white font-serif text-xl font-bold">H</span>
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-white">Hôtel de Silly</h3>
                <p className="text-gray-300 text-sm font-cursive">Expérience Unique</p>
              </div>
            </div>
            <p className="text-gray-200 mb-6 leading-relaxed max-w-md">
              Découvrez notre hôtel de luxe au cœur de Silly, où élégance et confort 
              se rencontrent pour créer une expérience hôtelière exceptionnelle en Belgique.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-200">
                <Phone className="w-4 h-4 text-white" />
                <span className="font-medium">+32 2 123 45 67</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-200">
                <Mail className="w-4 h-4 text-white" />
                <span className="font-medium">contact@hoteldesilly.be</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-200">
                <MapPin className="w-4 h-4 text-white" />
                <span className="font-medium">Rue de l&apos;Hôtel, 7830 Silly, Belgique</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-200">
                <Clock className="w-4 h-4 text-white" />
                <span className="font-medium">Ouverture prévue : Printemps 2025</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-6 text-white">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-200 hover:text-white transition-colors duration-200 font-medium">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/chambres" className="text-gray-200 hover:text-white transition-colors duration-200 font-medium">
                  Chambres & Suites
                </Link>
              </li>
              <li>
                <Link href="/galerie" className="text-gray-200 hover:text-white transition-colors duration-200 font-medium">
                  Galerie
                </Link>
              </li>
              <li>
                <Link href="/evenements" className="text-gray-200 hover:text-white transition-colors duration-200 font-medium">
                  Événements
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-gray-200 hover:text-white transition-colors duration-200 font-medium">
                  À Propos
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-6 text-white">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/restaurant" className="text-gray-200 hover:text-white transition-colors duration-200 font-medium">
                  Restaurant Gastronomique
                </Link>
              </li>
              <li>
                <Link href="/spa" className="text-gray-200 hover:text-white transition-colors duration-200 font-medium">
                  Spa & Bien-être
                </Link>
              </li>
              <li>
                <Link href="/salle-reunion" className="text-gray-200 hover:text-white transition-colors duration-200 font-medium">
                  Salles de Réunion
                </Link>
              </li>
              <li>
                <Link href="/transport" className="text-gray-200 hover:text-white transition-colors duration-200 font-medium">
                  Transport & Conciergerie
                </Link>
              </li>
              <li>
                <Link href="/evenements-prives" className="text-gray-200 hover:text-white transition-colors duration-200 font-medium">
                  Événements Privés
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="text-center">
            <h4 className="text-lg font-serif font-bold mb-4 text-white">Newsletter</h4>
            <p className="text-gray-200 mb-6 max-w-md mx-auto">
              Recevez nos offres exclusives et actualités directement dans votre boîte mail.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:border-white/40 transition-colors duration-200"
              />
              <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:bg-white/30 transform hover:scale-105">
                S&apos;abonner
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-300 text-sm">
              © 2025 Hôtel de Silly. Tous droits réservés.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 hover:scale-110 transform">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 hover:scale-110 transform">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 hover:scale-110 transform">
                <Twitter className="w-5 h-5" />
              </a>
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/mentions-legales" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
                Mentions Légales
              </Link>
              <Link href="/politique-confidentialite" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
                Politique de Confidentialité
              </Link>
              <Link href="/cgv" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
                CGV
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 