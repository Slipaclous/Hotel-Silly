'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

interface HeroData {
  badge: string;
  badgeEn?: string | null;
  badgeNl?: string | null;
  title: string;
  titleEn?: string | null;
  titleNl?: string | null;
  subtitle: string;
  subtitleEn?: string | null;
  subtitleNl?: string | null;
  description: string;
  descriptionEn?: string | null;
  descriptionNl?: string | null;
  location: string;
  locationEn?: string | null;
  locationNl?: string | null;
  imageUrl: string;
}

export default function HeroSection({ initialData }: { initialData?: HeroData | null }) {
  const [heroData, setHeroData] = useState<HeroData | null>(initialData || null);
  const locale = useLocale();
  const ct = useTranslations('common');

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

  const getLocalized = (fr: string, en?: string | null, nl?: string | null) => {
    if (locale === 'nl') return nl || fr;
    if (locale === 'en') return en || fr;
    return fr;
  };

  const titleFinal = getLocalized(data.title, data.titleEn, data.titleNl);
  const subtitleFinal = getLocalized(data.subtitle, data.subtitleEn, data.subtitleNl);
  const descriptionFinal = getLocalized(data.description, data.descriptionEn, data.descriptionNl);
  const locationFinal = getLocalized(data.location, data.locationEn, data.locationNl);



  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Image de fond optimisée */}
      <div className="absolute inset-0">
        <Image
          src={data.imageUrl}
          alt={titleFinal}
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
          {/* Titre principal */}
          <h1 className="mb-6">
            <span className="block font-body text-sm uppercase tracking-widest mb-4 text-white/80">
              {subtitleFinal}
            </span>
            <div className="relative h-98 w-full max-w-md mx-auto mb-2 brightness-0 invert">
              <Image
                src="/images/logo-clef.png"
                alt={titleFinal}
                fill
                className="object-contain"
                priority
              />
            </div>
          </h1>

          {/* Ligne décorative */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-px bg-[var(--color-or)]"></div>
          </div>

          {/* Description */}
          <p className="font-body text-base sm:text-lg text-white/90 mb-6 max-w-2xl mx-auto leading-relaxed">
            {descriptionFinal}
          </p>

          {/* Localisation */}
          <div className="flex items-center justify-center space-x-2 text-white/70 mb-12">
            <MapPin className="w-4 h-4" />
            <span className="font-body text-sm">{locationFinal}</span>
          </div>

          {/* Boutons CTA */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href={locale === 'nl'
                  ? 'https://bookingengine.mylighthouse.com/villa-dolce-silly?language=nl-NL'
                  : locale === 'en'
                    ? 'https://bookingengine.mylighthouse.com/villa-dolce-silly?language=en-GB'
                    : 'https://bookingengine.mylighthouse.com/villa-dolce-silly?language=fr-FR'
                }
                target="_blank"
                rel="noopener noreferrer"
                className="group font-body text-xs font-bold uppercase tracking-widest px-10 py-4 bg-[#C6ad7a] text-white hover:bg-white hover:text-[#2c3840] transition-all duration-500 flex items-center space-x-3 shadow-lg hover:shadow-2xl border border-[#C6ad7a] hover:border-white"
              >
                <span>{ct('book')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
              </a>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/chambres"
                className="font-body text-xs font-bold uppercase tracking-widest px-10 py-4 border border-white text-white hover:bg-white hover:text-[#2c3840] transition-all duration-500 shadow-lg hover:shadow-2xl"
              >
                {ct('discoverRooms')}
              </Link>
            </motion.div>
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