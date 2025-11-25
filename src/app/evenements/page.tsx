'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Calendar, Users, MapPin, Clock, ArrowRight, Utensils, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Event {
  id: number;
  title: string;
  description: string;
  icon: string;
  imageUrl: string;
  capacity: string;
  duration: string;
  order: number;
}

const services = [
  {
    icon: Utensils,
    title: 'Catering sur mesure',
    description: 'Menus personnalisés pour chaque événement'
  },
  {
    icon: Users,
    title: 'Service dédié',
    description: 'Équipe professionnelle à votre service'
  },
  {
    icon: MapPin,
    title: 'Emplacement privilégié',
    description: 'Proche de Bruxelles et accessible facilement'
  },
  {
    icon: Clock,
    title: 'Planification flexible',
    description: 'Horaires adaptés à vos besoins'
  }
];

const iconMap: { [key: string]: any } = {
  'Calendar': Calendar,
  'Users': Users,
  'MapPin': MapPin,
  'Clock': Clock,
  'Utensils': Utensils,
  'Heart': Heart,
};

interface PageHero {
  page: string;
  title: string;
  subtitle: string;
  imageUrl: string;
}

export default function EvenementsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [pageHero, setPageHero] = useState<PageHero | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/events').then(res => res.json()),
      fetch('/api/page-hero/evenements').then(res => res.json())
    ])
      .then(([eventsData, heroData]) => {
        setEvents(eventsData);
        setPageHero(heroData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur chargement events:', err);
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
              {pageHero?.title || 'Événements & Réceptions'}
            </h1>
            <p className="font-body text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              {pageHero?.subtitle || 'Organisez vos événements dans un cadre d\'exception au cœur de la Belgique'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-24 bg-blanc">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="w-12 h-px bg-or mx-auto mb-6"></div>
            <h2 className="font-display text-4xl sm:text-5xl font-medium text-noir mb-6">
              Des Espaces pour Tous vos Événements
            </h2>
            <p className="font-body text-lg text-noir/70 leading-relaxed">
              Que vous organisiez un mariage, un séminaire d&apos;entreprise, un dîner d&apos;affaires
              ou une célébration privée, notre hôtel offre des espaces polyvalents et élégants,
              accompagnés d&apos;un service exceptionnel.
            </p>
          </motion.div>

          {/* Grille Événements */}
          {loading ? (
            <div className="text-center py-20">
              <div className="font-body text-noir/60">Chargement des événements...</div>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-20">
              <div className="font-body text-noir/60">Aucun événement trouvé</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
              {events.map((event, index) => {
                const IconComponent = iconMap[event.icon] || Calendar;
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-blanc border border-noir/10 overflow-hidden card-hover group"
                  >
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Icône */}
                      <div className="absolute top-6 left-6 bg-blanc p-3 shadow-elegant">
                        <IconComponent className="w-6 h-6 text-or" />
                      </div>
                    </div>

                    {/* Contenu */}
                    <div className="p-8">
                      <h3 className="font-display text-2xl font-medium text-noir mb-3">
                        {event.title}
                      </h3>
                      <p className="font-body text-sm text-noir/70 mb-6 leading-relaxed">
                        {event.description}
                      </p>

                      {/* Infos */}
                      <div className="space-y-3 mb-8 pb-6 border-b border-noir/10">
                        <div className="flex items-center space-x-3 text-noir/60">
                          <Users className="w-4 h-4" />
                          <span className="font-body text-sm">{event.capacity}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-noir/60">
                          <Clock className="w-4 h-4" />
                          <span className="font-body text-sm">{event.duration}</span>
                        </div>
                      </div>

                      {/* Bouton CTA */}
                      <Link
                        href="/contact"
                        className="group/btn w-full border border-noir text-noir hover:bg-noir hover:text-blanc py-3 font-body text-sm transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        <span>Demander un devis</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Section Services */}
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
              Nos Services
            </h2>
            <p className="font-body text-lg text-noir/70 max-w-3xl mx-auto leading-relaxed">
              Un accompagnement complet pour la réussite de votre événement
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {services.map((service, index) => (
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

      {/* CTA Contact */}
      <section className="py-24 bg-noir text-blanc">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-px bg-or mx-auto mb-6"></div>
            <h2 className="font-display text-4xl sm:text-5xl font-medium mb-6">
              Prêt à Organiser Votre Événement ?
            </h2>
            <p className="font-body text-lg text-blanc/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Contactez notre équipe événementielle pour discuter de vos besoins
              et obtenir un devis personnalisé.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 bg-blanc text-noir px-8 py-3 font-body text-sm hover:bg-or hover:text-blanc transition-all duration-300"
            >
              <span>Nous Contacter</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
