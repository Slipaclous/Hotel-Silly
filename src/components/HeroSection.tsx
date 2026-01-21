'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface HeroData {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  location: string;
  imageUrl: string;
}

export default function HeroSection({ initialData }: { initialData?: HeroData | null }) {
  const [heroData, setHeroData] = useState<HeroData | null>(initialData || null);

  useEffect(() => {
    if (!initialData) {
      fetch('/api/hero')
        .then(res => res.json())
        .then(data => setHeroData(data))
        .catch(err => console.error('Erreur chargement hero:', err));
    }
  }, [initialData]);

  if (!heroData && !initialData) return null;

  const data = heroData || initialData!;

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Image de fond optimisée */}
      <div className="absolute inset-0">
        <Image
          src={data.imageUrl}
          alt={data.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Overlay noir subtil */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Contenu */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-32 sm:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge discret */}
          <div className="inline-flex items-center space-x-2 border border-white/30 px-4 py-2 mb-8">
            <span className="font-body text-xs uppercase tracking-widest">
              {data.badge}
            </span>
          </div>

          {/* Titre principal */}
          <h1 className="mb-6">
            <span className="block font-body text-sm uppercase tracking-widest mb-4 text-white/80">
              {data.subtitle}
            </span>
            <span className="block font-display text-5xl sm:text-6xl lg:text-7xl font-medium">
              {data.title}
            </span>
          </h1>

          {/* Ligne décorative */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-px bg-[var(--color-or)]"></div>
          </div>

          {/* Description */}
          <p className="font-body text-base sm:text-lg text-white/90 mb-6 max-w-2xl mx-auto leading-relaxed">
            {data.description}
          </p>

          {/* Localisation */}
          <div className="flex items-center justify-center space-x-2 text-white/70 mb-12">
            <MapPin className="w-4 h-4" />
            <span className="font-body text-sm">{data.location}</span>
          </div>

          {/* Boutons CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="group font-body text-sm px-8 py-3 bg-white text-[var(--color-noir)] hover:bg-[var(--color-or)] hover:text-white transition-all duration-300 flex items-center space-x-2"
            >
              <span>Réserver</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>

            <Link
              href="/chambres"
              className="font-body text-sm px-8 py-3 border border-white text-white hover:bg-white hover:text-[var(--color-noir)] transition-all duration-300"
            >
              Découvrir nos Chambres
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Indicateur de scroll minimaliste */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-white/40"
        ></motion.div>
      </motion.div>
    </section>
  );
} 