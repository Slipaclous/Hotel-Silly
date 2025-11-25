'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Star, Users, ArrowRight, Wifi, Coffee, Car, Calendar } from 'lucide-react';
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

interface PageHero {
  page: string;
  title: string;
  subtitle: string;
  imageUrl: string;
}

export default function ChambresPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [pageHero, setPageHero] = useState<PageHero | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/rooms').then(res => res.json()),
      fetch('/api/page-hero/chambres').then(res => res.json())
    ])
      .then(([roomsData, heroData]) => {
        setRooms(roomsData);
        setPageHero(heroData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur chargement:', err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-blanc">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mt-[120px]">
        <div className="absolute inset-0">
          {pageHero?.imageUrl && (
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('${pageHero.imageUrl}')`
              }}
            ></div>
          )}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="w-12 h-px bg-or mx-auto mb-6"></div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium mb-6">
              {pageHero?.title || 'Chambres & Suites'}
            </h1>
            <p className="font-body text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              {pageHero?.subtitle || 'Découvrez nos chambres et suites d\'exception, conçues pour offrir le summum du confort et de l\'élégance.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Rooms Section */}
      <section className="py-24 bg-blanc">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="font-body text-noir/60">Chargement des chambres...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {rooms.map((room, index) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-blanc border border-noir/10 overflow-hidden card-hover group"
                >
                  {/* Image */}
                  <div className="relative h-72 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${room.imageUrl})` }}
                    />

                    {/* Badge prix */}
                    <div className="absolute top-6 right-6 bg-blanc border border-noir/10 text-noir px-4 py-2 text-sm font-body shadow-elegant">
                      {room.price}
                    </div>

                    {/* Note */}
                    <div className="absolute bottom-6 left-6 flex items-center space-x-1">
                      {[...Array(room.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-or fill-current" />
                      ))}
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="p-8">
                    <h3 className="font-display text-2xl font-medium text-noir mb-3">
                      {room.name}
                    </h3>

                    <p className="font-body text-sm text-noir/70 mb-6 leading-relaxed">
                      {room.description}
                    </p>

                    {/* Capacité */}
                    <div className="flex items-center space-x-2 text-noir/60 mb-6 pb-6 border-b border-noir/10">
                      <Users className="w-4 h-4" />
                      <span className="font-body text-sm">{room.capacity}</span>
                    </div>

                    {/* Caractéristiques */}
                    <div className="space-y-3 mb-8">
                      {room.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <div className="w-1 h-1 bg-or rounded-full"></div>
                          <span className="font-body text-sm text-noir/70">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Bouton CTA */}
                    <Link
                      href={`/contact?room=${room.id}`}
                      className="group/btn w-full border border-noir text-noir hover:bg-noir hover:text-blanc py-3 font-body text-sm transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <span>Réserver maintenant</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-blanc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="w-12 h-px bg-or mx-auto mb-6"></div>
            <h2 className="font-display text-4xl sm:text-5xl font-medium text-noir mb-6">
              Services & Équipements
            </h2>
            <p className="font-body text-lg text-noir/70 max-w-3xl mx-auto leading-relaxed">
              Profitez de nos équipements de luxe et de nos services personnalisés
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: Wifi, title: 'WiFi Premium', description: 'Connexion haut débit dans toutes les chambres' },
              { icon: Coffee, title: 'Room Service', description: 'Service 24h/24 pour votre confort' },
              { icon: Car, title: 'Parking Privé', description: 'Parking sécurisé gratuit' },
              { icon: Calendar, title: 'Réservation', description: 'Annulation gratuite jusqu\'à 48h avant' },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 border border-noir/20 flex items-center justify-center mx-auto mb-6 hover:border-or transition-colors duration-300">
                  <service.icon className="w-7 h-7 text-or" />
                </div>
                <h3 className="font-display text-xl font-medium text-noir mb-3">
                  {service.title}
                </h3>
                <p className="font-body text-sm text-noir/70 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
