"use client";
import { motion } from 'framer-motion';
import { Award, Heart, Shield, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { LucideIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

interface AboutData {
  title: string;
  titleEn?: string | null;
  titleNl?: string | null;
  description: string;
  descriptionEn?: string | null;
  descriptionNl?: string | null;
  keyPoint1Title: string;
  keyPoint1TitleEn?: string | null;
  keyPoint1TitleNl?: string | null;
  keyPoint1Text: string;
  keyPoint1TextEn?: string | null;
  keyPoint1TextNl?: string | null;
  keyPoint2Title: string;
  keyPoint2TitleEn?: string | null;
  keyPoint2TitleNl?: string | null;
  keyPoint2Text: string;
  keyPoint2TextEn?: string | null;
  keyPoint2TextNl?: string | null;
  keyPoint3Title: string;
  keyPoint3TitleEn?: string | null;
  keyPoint3TitleNl?: string | null;
  keyPoint3Text: string;
  keyPoint3TextEn?: string | null;
  keyPoint3TextNl?: string | null;
  openingYear: string;
  imageUrl: string;
}

interface Feature {
  icon: string;
  title: string;
  titleEn?: string | null;
  titleNl?: string | null;
  description: string;
  descriptionEn?: string | null;
  descriptionNl?: string | null;
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
  const locale = useLocale();
  const t = useTranslations('common');

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

  const getLocalized = (fr: string, en?: string | null, nl?: string | null) => {
    if (locale === 'nl') return nl || fr;
    if (locale === 'en') return en || fr;
    return fr;
  };

  const title = getLocalized(data.title, data.titleEn, data.titleNl);
  const description = getLocalized(data.description, data.descriptionEn, data.descriptionNl);
  const kp1Title = getLocalized(data.keyPoint1Title, data.keyPoint1TitleEn, data.keyPoint1TitleNl);
  const kp1Text = getLocalized(data.keyPoint1Text, data.keyPoint1TextEn, data.keyPoint1TextNl);
  const kp2Title = getLocalized(data.keyPoint2Title, data.keyPoint2TitleEn, data.keyPoint2TitleNl);
  const kp2Text = getLocalized(data.keyPoint2Text, data.keyPoint2TextEn, data.keyPoint2TextNl);
  const kp3Title = getLocalized(data.keyPoint3Title, data.keyPoint3TitleEn, data.keyPoint3TitleNl);
  const kp3Text = getLocalized(data.keyPoint3Text, data.keyPoint3TextEn, data.keyPoint3TextNl);

  return (
    <section className="py-24 bg-blanc">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Contenu */}
          <div>
            {/* Ligne décorative */}
            <div className="w-12 h-px bg-or mb-6"></div>

            <h2 className="font-display text-4xl sm:text-5xl font-medium text-noir mb-6">
              {title}
            </h2>

            <p className="font-body text-lg text-noir/70 mb-10 leading-relaxed">
              {description}
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-start space-x-4">
                <div className="w-1 h-1 bg-or rounded-full mt-3 flex-shrink-0"></div>
                <p className="font-body text-base text-noir/80">
                  <strong className="font-medium text-noir">{kp1Title}</strong> — {kp1Text}
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-1 h-1 bg-or rounded-full mt-3 flex-shrink-0"></div>
                <p className="font-body text-base text-noir/80">
                  <strong className="font-medium text-noir">{kp2Title}</strong> — {kp2Text}
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-1 h-1 bg-or rounded-full mt-3 flex-shrink-0"></div>
                <p className="font-body text-base text-noir/80">
                  <strong className="font-medium text-noir">{kp3Title}</strong> — {kp3Text}
                </p>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                href="/a-propos"
                className="inline-block font-body text-xs font-bold uppercase tracking-widest px-10 py-4 bg-[#2c3840] text-white hover:bg-[#C6ad7a] transition-all duration-500 shadow-lg hover:shadow-xl border border-[#2c3840] hover:border-[#C6ad7a]"
              >
                {t('discoverHistory')}
              </Link>
            </motion.div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative h-[500px] overflow-hidden">
              <Image
                src={data.imageUrl}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Badge année */}
              <div className="absolute bottom-8 left-8 bg-blanc shadow-elegant p-6 border border-noir/10">
                <div className="font-display text-4xl font-medium text-noir mb-1">{data.openingYear}</div>
                <div className="font-body text-xs uppercase tracking-widest text-noir/60">{t('openingYear')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Grille de caractéristiques */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature) => {
            const IconComponent = iconMap[feature.icon] || Award;
            const fTitle = getLocalized(feature.title, feature.titleEn, feature.titleNl);
            const fDesc = getLocalized(feature.description, feature.descriptionEn, feature.descriptionNl);
            return (
              <div
                key={fTitle}
                className="text-center"
              >
                <div className="w-16 h-16 border border-noir/20 flex items-center justify-center mx-auto mb-6 group-hover:border-or transition-colors duration-300">
                  <IconComponent className="w-7 h-7 text-or" />
                </div>
                <h3 className="font-display text-xl font-medium text-noir mb-3">
                  {fTitle}
                </h3>
                <p className="font-body text-sm text-noir/70 leading-relaxed">
                  {fDesc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
