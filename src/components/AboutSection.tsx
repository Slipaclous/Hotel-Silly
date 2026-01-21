'use client';

import { motion } from 'framer-motion';
import { Award, Heart, Shield, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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

export default function AboutSection({ initialAbout, initialFeatures }: { initialAbout?: AboutData | null, initialFeatures?: Feature[] }) {
  const [aboutData, setAboutData] = useState<AboutData | null>(initialAbout || null);
  const [features, setFeatures] = useState<Feature[]>(initialFeatures || []);

  useEffect(() => {
    if (!initialAbout || !initialFeatures) {
      Promise.all([
        fetch('/api/about').then(res => res.json()),
        fetch('/api/features').then(res => res.json())
      ]).then(([about, feats]) => {
        setAboutData(about);
        setFeatures(feats);
      }).catch(err => console.error('Erreur chargement about:', err));
    }
  }, [initialAbout, initialFeatures]);

  if (!aboutData && !initialAbout) return null;

  const data = aboutData || initialAbout!;

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
              <Image
                src={data.imageUrl}
                alt={data.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Badge année */}
              <div className="absolute bottom-8 left-8 bg-blanc shadow-elegant p-6 border border-noir/10">
                <div className="font-display text-4xl font-medium text-noir mb-1">{data.openingYear}</div>
                <div className="font-body text-xs uppercase tracking-widest text-noir/60">Année d&apos;ouverture</div>
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