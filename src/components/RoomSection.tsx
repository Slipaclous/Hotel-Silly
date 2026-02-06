'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Room {
  id: number;
  name: string;
  description: string;
  price: string;
  capacity: string;
  rating: number;
  imageUrl: string;
  features: string[];
}

export default function RoomSection({ initialRooms }: { initialRooms?: Room[] }) {
  const [rooms, setRooms] = useState<Room[]>(initialRooms || []);

  useEffect(() => {
    if (!initialRooms) {
      fetch('/api/rooms')
        .then(res => res.json())
        .then(data => setRooms(data.slice(0, 3)))
        .catch(err => console.error('Erreur chargement rooms:', err));
    }
  }, [initialRooms]);

  // Si on n'a pas de data, on ne render rien pour le moment
  if (rooms.length === 0 && !initialRooms) return null;

  // On prend la première chambre comme "image de couverture" pour le teaser
  const featuredImage = rooms[0]?.imageUrl || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80';

  return (
    <section className="py-0 border-t border-noir/5">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
        {/* Image Side */}
        <div className="relative h-[50vh] lg:h-auto overflow-hidden group">
          <Image
            src={featuredImage}
            alt="Nos Chambres"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-noir/10 group-hover:bg-noir/0 transition-colors duration-500"></div>
        </div>

        {/* Text Side */}
        <div className="bg-blanc flex flex-col justify-center p-12 lg:p-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-or/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <span className="font-body text-xs tracking-[0.2em] uppercase text-or mb-6 block">
              Hébergement
            </span>
            <h2 className="font-display text-4xl lg:text-5xl lg:leading-tight font-medium text-noir mb-8">
              L&apos;Art du Repos <br /> <span className="text-or italic">à l&apos;Italienne</span>
            </h2>
            <div className="w-12 h-px bg-or mb-8"></div>
            <p className="font-body text-base lg:text-lg text-noir/70 mb-10 leading-relaxed max-w-md">
              Chacune de nos chambres est une invitation à la détente, mêlant charme intemporel et confort moderne.
              Une atmosphère feutrée pour des nuits inoubliables.
            </p>

            <Link
              href="/chambres"
              className="group inline-flex items-center space-x-4"
            >
              <div className="w-12 h-12 border border-noir/20 rounded-full flex items-center justify-center group-hover:border-or group-hover:bg-or transition-all duration-300">
                <ArrowRight className="w-4 h-4 text-noir group-hover:text-white transition-colors" />
              </div>
              <span className="font-body text-sm tracking-widest uppercase text-noir group-hover:text-or transition-colors duration-300">
                Découvrir nos chambres
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}