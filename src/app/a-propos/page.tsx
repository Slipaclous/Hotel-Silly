'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Award, Heart, Shield, Star, MapPin, Clock, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { LucideIcon } from 'lucide-react';

interface AboutData {
  title: string;
  description: string;
  keyPoint1Title: string;
  keyPoint1Text: string;
  keyPoint2Title: string;
  keyPoint2Text: string;
  keyPoint3Title: string;
  keyPoint3Text: string;
  openingYear: string;
  imageUrl: string;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const iconMap: Record<string, LucideIcon> = {
  'Award': Award,
  'Heart': Heart,
  'Shield': Shield,
  'Star': Star,
};

interface PageHero {
  page: string;
  title: string;
  subtitle: string;
  imageUrl: string;
}

export default function AProposPage() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [pageHero, setPageHero] = useState<PageHero | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/about').then(res => res.json()),
      fetch('/api/features').then(res => res.json()),
      fetch('/api/page-hero/a-propos').then(res => res.json())
    ]).then(([about, feats, hero]) => {
      setAboutData(about);
      setFeatures(feats);
      setPageHero(hero);
    }).catch(err => console.error('Erreur chargement about:', err));
  }, []);

  const data = aboutData || {
    title: 'Une Expérience Unique',
    description: "Notre hôtel de luxe va ouvrir ses portes au printemps 2025 dans le charmant village de Silly, au cœur de la Belgique. Chaque détail a été pensé pour offrir une expérience inoubliable dans un cadre d'exception.",
    keyPoint1Title: 'Emplacement idéal',
    keyPoint1Text: 'Au cœur de Silly, village pittoresque de la Région Wallonne, à proximité de Bruxelles et des principales attractions belges.',
    keyPoint2Title: 'Service personnalisé',
    keyPoint2Text: "Notre équipe dédiée s'engage à anticiper vos besoins et à rendre votre séjour exceptionnel.",
    keyPoint3Title: 'Équipements de luxe',
    keyPoint3Text: 'Chambres et suites équipées des dernières technologies et du confort le plus raffiné.',
    openingYear: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  };

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
              {pageHero?.title || "À Propos de l&apos;Hôtel"}
            </h1>
            <p className="font-body text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              {pageHero?.subtitle || "Découvrez l&apos;histoire et l&apos;identité de notre hôtel de luxe"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contenu Principal */}
      <section className="py-24 bg-blanc">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            {/* Contenu */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-px bg-or mb-6"></div>

              <h2 className="font-display text-4xl sm:text-5xl font-medium text-noir mb-6">
                {data.title}
              </h2>

              <p className="font-body text-lg text-noir/70 mb-10 leading-relaxed">
                {data.description}
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-1 h-1 bg-or rounded-full mt-3 flex-shrink-0"></div>
                  <p className="font-body text-base text-noir/80">
                    <strong className="font-medium text-noir">{data.keyPoint1Title}</strong> — {data.keyPoint1Text}
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-1 h-1 bg-or rounded-full mt-3 flex-shrink-0"></div>
                  <p className="font-body text-base text-noir/80">
                    <strong className="font-medium text-noir">{data.keyPoint2Title}</strong> — {data.keyPoint2Text}
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-1 h-1 bg-or rounded-full mt-3 flex-shrink-0"></div>
                  <p className="font-body text-base text-noir/80">
                    <strong className="font-medium text-noir">{data.keyPoint3Title}</strong> — {data.keyPoint3Text}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative h-[500px] overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url('${data.imageUrl}')`
                  }}
                />

                {/* Badge année */}
                <div className="absolute bottom-8 left-8 bg-blanc shadow-elegant p-6 border border-noir/10">
                  <div className="font-display text-4xl font-medium text-noir mb-1">{data.openingYear}</div>
                  <div className="font-body text-xs uppercase tracking-widest text-noir/60">Année d&apos;Ouverture</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Grille de caractéristiques */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24"
          >
            {features.map((feature) => {
              const IconComponent = iconMap[feature.icon] || Award;
              return (
                <div key={feature.title} className="text-center">
                  <div className="w-16 h-16 border border-noir/20 flex items-center justify-center mx-auto mb-6 hover:border-or transition-colors duration-300">
                    <IconComponent className="w-7 h-7 text-or" />
                  </div>
                  <h3 className="font-display text-xl font-medium text-noir mb-3">
                    {feature.title}
                  </h3>
                  <p className="font-body text-sm text-noir/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </motion.div>

          {/* Section Valeurs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-blanc-200 p-8"
            >
              <div className="w-12 h-12 bg-noir flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6 text-blanc" />
              </div>
              <h3 className="font-display text-2xl font-medium text-noir mb-4">
                Notre Emplacement
              </h3>
              <p className="font-body text-sm text-noir/70 leading-relaxed">
                Situé au cœur de Silly, village pittoresque de la Région Wallonne,
                notre hôtel vous offre un accès privilégié aux principales attractions belges
                tout en préservant le calme et la sérénité d&apos;un cadre exceptionnel.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-blanc-200 p-8"
            >
              <div className="w-12 h-12 bg-noir flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-blanc" />
              </div>
              <h3 className="font-display text-2xl font-medium text-noir mb-4">
                Notre Histoire
              </h3>
              <p className="font-body text-sm text-noir/70 leading-relaxed">
                Fondé en {data.openingYear}, notre hôtel allie tradition et modernité
                pour offrir une expérience unique où chaque détail a été pensé
                pour votre confort et votre bien-être.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-blanc-200 p-8"
            >
              <div className="w-12 h-12 bg-noir flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-blanc" />
              </div>
              <h3 className="font-display text-2xl font-medium text-noir mb-4">
                Notre Engagement
              </h3>
              <p className="font-body text-sm text-noir/70 leading-relaxed">
                Notre équipe dédiée s&apos;engage à anticiper vos besoins et à rendre
                votre séjour exceptionnel. Nous mettons un point d&apos;honneur à offrir
                un service personnalisé de qualité supérieure.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}