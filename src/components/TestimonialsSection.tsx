'use client';

import { Star, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { useLocale } from 'next-intl';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  locationEn?: string | null;
  locationNl?: string | null;
  rating: number;
  text: string;
  textEn?: string | null;
  textNl?: string | null;
  avatarUrl: string;
}

export default function TestimonialsSection({ initialTestimonials }: { initialTestimonials?: Testimonial[] }) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials || []);
  const locale = useLocale();

  useEffect(() => {
    if (!initialTestimonials) {
      fetch('/api/testimonials')
        .then(res => res.json())
        .then(data => setTestimonials(data))
        .catch(err => console.error('Erreur chargement testimonials:', err));
    }
  }, [initialTestimonials]);

  if (testimonials.length === 0 && !initialTestimonials) return null;

  const getLocalized = (fr: string, en?: string | null, nl?: string | null) => {
    if (locale === 'nl') return nl || fr;
    if (locale === 'en') return en || fr;
    return fr;
  };

  const t = {
    fr: {
      title: "Avis de nos Clients",
      subtitle: "Découvrez ce que nos clients disent de leur expérience dans notre hôtel de luxe.",
      cta: "Voir Tous les Avis"
    },
    en: {
      title: "Guest Reviews",
      subtitle: "Discover what our guests are saying about their experience in our luxury hotel.",
      cta: "View All Reviews"
    },
    nl: {
      title: "Gastervaringen",
      subtitle: "Ontdek wat onze gasten zeggen over hun ervaring in ons luxe hotel.",
      cta: "Bekijk Alle Beoordelingen"
    }
  }[locale as 'fr' | 'en' | 'nl'];

  return (
    <section className="py-24 bg-noir text-blanc">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <div className="w-12 h-px bg-or mx-auto mb-6"></div>
          <h2 className="font-display text-4xl sm:text-5xl font-medium mb-6">
            {t.title}
          </h2>
          <p className="font-body text-lg text-blanc/70 max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Grille de témoignages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => {
            const localizedLoc = getLocalized(testimonial.location, testimonial.locationEn, testimonial.locationNl);
            const localizedText = getLocalized(testimonial.text, testimonial.textEn, testimonial.textNl);

            return (
              <div
                key={testimonial.id}
                className="bg-noir-800 border border-blanc/10 p-8 hover:border-or/30 transition-colors duration-300"
              >
                {/* Icône citation */}
                <div className="mb-6">
                  <Quote className="w-8 h-8 text-or" />
                </div>

                {/* Note */}
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-or fill-current" />
                  ))}
                </div>

                {/* Texte du témoignage */}
                <p className="font-body text-sm text-blanc/80 mb-8 leading-relaxed">
                  &ldquo;{localizedText}&rdquo;
                </p>

                {/* Auteur */}
                <div className="flex items-center space-x-3 pt-6 border-t border-blanc/10">
                  <div className="relative w-12 h-12 overflow-hidden border border-blanc/20">
                    <Image
                      src={testimonial.avatarUrl}
                      alt={`Avatar de ${testimonial.name} - Client Villa Dolce`}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <h4 className="font-body font-medium text-blanc text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="font-body text-xs text-blanc/50">
                      {localizedLoc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bouton Voir Tous les Avis */}
        <div className="text-center mt-12">
          <Link
            href="/avis"
            className="inline-block font-body text-sm px-8 py-3 bg-or text-noir hover:bg-black hover:text-white transition-all duration-300"
          >
            {t.cta}
          </Link>
        </div>
      </div>
    </section>
  );
} 