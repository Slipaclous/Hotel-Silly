'use client';

import { motion } from 'framer-motion';
import { Star, Users, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

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

export default function RoomSection() {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    fetch('/api/rooms')
      .then(res => res.json())
      .then(data => setRooms(data.slice(0, 3))) // Limiter à 3 chambres
      .catch(err => console.error('Erreur chargement rooms:', err));
  }, []);

  return (
    <section className="py-24 bg-blanc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="w-12 h-px bg-or mx-auto mb-6"></div>
          <h2 className="font-display text-4xl sm:text-5xl font-medium text-noir mb-6">
            Nos Chambres & Suites
          </h2>
          <p className="font-body text-lg text-noir/70 max-w-3xl mx-auto leading-relaxed">
            Découvrez un aperçu de nos chambres et suites d&apos;exception,
            conçues pour offrir le summum du confort et de l&apos;élégance.
          </p>
        </motion.div>

        {/* Liste de chambres - Format horizontal */}
        <div className="space-y-8">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-blanc border border-noir/10 overflow-hidden card-hover group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Image */}
                <div className="relative h-80 lg:h-96 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${room.imageUrl})` }}
                  />

                  {/* Note en overlay */}
                  <div className="absolute top-6 left-6 flex items-center space-x-1">
                    {[...Array(room.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-or fill-current" />
                    ))}
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-8 lg:p-12 flex flex-col justify-between">
                  <div>
                    {/* Prix */}
                    <div className="font-body text-sm text-or mb-4">{room.price}</div>

                    <h3 className="font-display text-3xl font-medium text-noir mb-4">
                      {room.name}
                    </h3>

                    <p className="font-body text-base text-noir/70 mb-6 leading-relaxed">
                      {room.description}
                    </p>

                    {/* Capacité */}
                    <div className="flex items-center space-x-2 text-noir/60 mb-6">
                      <Users className="w-4 h-4" />
                      <span className="font-body text-sm">{room.capacity}</span>
                    </div>

                    {/* Caractéristiques - Afficher seulement 3 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                      {room.features.slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-1 h-1 bg-or rounded-full"></div>
                          <span className="font-body text-sm text-noir/70">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bouton CTA */}
                  <Link
                    href={`/chambres#room-${room.id}`}
                    className="group/btn inline-flex items-center space-x-2 font-body text-sm text-noir hover:text-or transition-colors duration-300"
                  >
                    <span>Découvrir cette chambre</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bouton Voir Tout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/chambres"
            className="inline-block font-body text-sm px-8 py-3 border border-noir text-noir hover:bg-noir hover:text-blanc transition-all duration-300"
          >
            Voir Toutes nos Chambres
          </Link>
        </motion.div>
      </div>
    </section>
  );
}