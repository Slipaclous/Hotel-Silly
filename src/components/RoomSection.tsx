'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

interface Room {
  id: number;
  name: string;
  nameEn?: string | null;
  nameNl?: string | null;
  description: string;
  descriptionEn?: string | null;
  descriptionNl?: string | null;
  price: string;
  capacity: string;
  rating: number;
  imageUrl: string;
  features: string[];
}

interface HomeRoomSectionData {
  id: number;
  title: string;
  titleEn?: string | null;
  titleNl?: string | null;
  titleItalic: string;
  titleItalicEn?: string | null;
  titleItalicNl?: string | null;
  description: string;
  descriptionEn?: string | null;
  descriptionNl?: string | null;
  imageUrl: string;
  ctaText?: string | null;
  ctaTextEn?: string | null;
  ctaTextNl?: string | null;
}

export default function RoomSection({ initialRooms, initialData }: { initialRooms?: Room[], initialData?: HomeRoomSectionData | null }) {
  const [rooms, setRooms] = useState<Room[]>(initialRooms || []);
  const [data, setData] = useState<HomeRoomSectionData | null>(initialData || null);
  const locale = useLocale();
  const t = useTranslations('home');

  useEffect(() => {
    if (!initialRooms) {
      fetch('/api/rooms')
        .then(res => res.json())
        .then(data => setRooms(data.slice(0, 3)))
        .catch(err => console.error('Erreur chargement rooms:', err));
    }
  }, [initialRooms]);

  useEffect(() => {
    if (!initialData) {
      fetch('/api/home-room-section')
        .then(res => res.json())
        .then(d => setData(d))
        .catch(err => console.error('Erreur chargement home-room-section:', err));
    }
  }, [initialData]);

  const getLocalized = (fr: string, en?: string | null, nl?: string | null) => {
    if (locale === 'nl') return nl || fr;
    if (locale === 'en') return en || fr;
    return fr;
  };

  // Si on n'a pas de data rooms et pas d'initialRooms, on ne render rien pour le moment
  if (rooms.length === 0 && !initialRooms && !data && !initialData) return null;

  // On prend l'image du back-office ou la première chambre comme "image de couverture"
  const featuredImage = data?.imageUrl || rooms[0]?.imageUrl || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80';

  return (
    <section className="py-0 border-t border-noir/5">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
        {/* Image Side */}
        <div className="relative h-[50vh] lg:h-auto overflow-hidden group">
          <Image
            src={featuredImage}
            alt={data ? getLocalized(data.title, data.titleEn, data.titleNl) : "Nos Chambres"}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-noir/10 group-hover:bg-noir/0 transition-colors duration-500"></div>
        </div>

        {/* Text Side */}
        <div className="bg-blanc flex flex-col justify-center p-12 lg:p-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-or/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>

          <div className="relative z-10">
            <span className="font-body text-xs tracking-[0.2em] uppercase text-or mb-6 block">
              {t('roomsBadge')}
            </span>
            <h2 className="font-display text-4xl lg:text-5xl lg:leading-tight font-medium text-noir mb-8">
              {data ? getLocalized(data.title, data.titleEn, data.titleNl) : t('roomsTitle')}
              <br />
              <span className="text-or italic">
                {data ? getLocalized(data.titleItalic, data.titleItalicEn, data.titleItalicNl) : t('roomsTitleItalic')}
              </span>
            </h2>
            <div className="w-12 h-px bg-or mb-8"></div>
            <p className="font-body text-base lg:text-lg text-noir/70 mb-10 leading-relaxed max-w-md">
              {data ? getLocalized(data.description, data.descriptionEn, data.descriptionNl) : t('roomsDescription')}
            </p>

            <motion.div
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/chambres"
                className="group inline-flex items-center space-x-4"
              >
                {/* Bouton de recherche */}
                <div className="w-14 h-14 border border-[#2c3840]/20 rounded-full flex items-center justify-center group-hover:border-[#C6ad7a] group-hover:bg-[#C6ad7a] transition-all duration-500 shadow-sm group-hover:shadow-lg">
                  <ArrowRight className="w-5 h-5 text-[#2c3840] group-hover:text-white transition-colors duration-500" />
                </div>
                <span className="font-body text-xs tracking-[0.3em] uppercase text-[#2c3840] group-hover:text-[#C6ad7a] transition-colors duration-500 font-bold">
                  {data ? getLocalized(data.ctaText || 'Découvrir nos chambres', data.ctaTextEn, data.ctaTextNl) : t('roomsCta')}
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}