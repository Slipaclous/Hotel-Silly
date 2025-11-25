'use client';

import { motion } from 'framer-motion';
import { Award, Heart, Shield, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

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

const iconMap: { [key: string]: any } = {
  'Award': Award,
  'Heart': Heart,
  'Shield': Shield,
  'Star': Star,
};

export default function AboutSection() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [features, setFeatures] = useState<Feature[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('/api/about').then(res => res.json()),
      fetch('/api/features').then(res => res.json())
    ]).then(([about, feats]) => {
      setAboutData(about);
      setFeatures(feats);
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
    <section className="py-24 bg-blanc">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Contenu */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Ligne décorative */}
            <div className="w-12 h-px bg-or mb-6"></div>

            <h2 className="font-display text-4xl sm:text-5xl font-medium text-noir mb-6">
              {data.title}
            </h2>

            <p className="font-body text-lg text-noir/70 mb-10 leading-relaxed">
              {data.description}
            </p>

            <div className="space-y-6 mb-10">
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

            <Link
              href="/a-propos"
              className="inline-block font-body text-sm px-8 py-3 border border-noir text-noir hover:bg-noir hover:text-blanc transition-all duration-300"
            >
              Découvrir Notre Histoire
            </Link>
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
                <div className="font-body text-xs uppercase tracking-widest text-noir/60">Année d'Ouverture</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Grille de caractéristiques */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon] || Award;
            return (
              <div
                key={feature.title}
                className="text-center"
              >
                <div className="w-16 h-16 border border-noir/20 flex items-center justify-center mx-auto mb-6 group-hover:border-or transition-colors duration-300">
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
      </div>
    </section>
  );
} 