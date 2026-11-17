import { ArrowRight, MapPin } from 'lucide-react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';

interface HeroData {
  badge: string;
  badgeEn?: string | null;
  badgeNl?: string | null;
  title: string;
  titleEn?: string | null;
  titleNl?: string | null;
  subtitle: string;
  subtitleEn?: string | null;
  subtitleNl?: string | null;
  description: string;
  descriptionEn?: string | null;
  descriptionNl?: string | null;
  location: string;
  locationEn?: string | null;
  locationNl?: string | null;
  imageUrl: string;
}

const BOOKING_LANG: Record<string, string> = { fr: 'fr-FR', en: 'en-GB', nl: 'nl-NL' };

// Composant serveur : aucun JavaScript envoyé au navigateur pour le Hero.
// Les animations sont en CSS (voir .animate-hero-rise dans globals.css).
export default async function HeroSection({ initialData }: { initialData?: HeroData | null }) {
  if (!initialData) return null;

  const locale = await getLocale();
  const ct = await getTranslations('common');
  const seo = await getTranslations('seo.pages');
  const data = initialData;

  const getLocalized = (fr: string, en?: string | null, nl?: string | null) => {
    if (locale === 'nl') return nl || fr;
    if (locale === 'en') return en || fr;
    return fr;
  };

  const titleFinal = getLocalized(data.title, data.titleEn, data.titleNl);
  const subtitleFinal = getLocalized(data.subtitle, data.subtitleEn, data.subtitleNl);
  const descriptionFinal = getLocalized(data.description, data.descriptionEn, data.descriptionNl);
  const locationFinal = getLocalized(data.location, data.locationEn, data.locationNl);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20 lg:pt-32">
      {/* Image de fond optimisée */}
      <div className="absolute inset-0">
        {data.imageUrl && (
          <Image
            src={data.imageUrl}
            alt={titleFinal}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}
        {/* Overlay noir léger pour la lisibilité */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Contenu */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="animate-hero-rise">
          {/* Titre principal */}
          <h1 className="mb-6">
            <span className="sr-only">{seo('home.title')}</span>
            <span className="block font-body text-xs sm:text-sm uppercase tracking-[0.3em] mb-4 text-white/80">
              {subtitleFinal}
            </span>
            <span className="block relative h-32 sm:h-40 md:h-48 xl:h-56 w-full max-w-md mx-auto mb-2 brightness-0 invert">
              <Image
                src="/images/logo-clef.png"
                unoptimized
                alt="Villa Dolce"
                fill
                sizes="(min-width: 640px) 448px, 90vw"
                className="object-contain"
                priority
              />
            </span>
          </h1>

          {/* Ligne décorative */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-px bg-[var(--color-or)]"></div>
          </div>

          {/* Description */}
          <p className="font-body text-base sm:text-lg text-white/90 mb-6 max-w-2xl mx-auto leading-relaxed">
            {descriptionFinal}
          </p>

          {/* Localisation */}
          <div className="flex items-center justify-center space-x-2 text-white/70 mb-12">
            <MapPin className="w-4 h-4" />
            <span className="font-body text-sm">{locationFinal}</span>
          </div>

          {/* Boutons CTA */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href={`https://bookingengine.mylighthouse.com/villa-dolce-silly?language=${BOOKING_LANG[locale] ?? BOOKING_LANG.fr}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group font-body text-xs font-bold uppercase tracking-widest px-10 py-4 bg-[#C6ad7a] text-white hover:bg-white hover:text-[#2c3840] hover:scale-105 active:scale-95 transition-all duration-500 flex items-center space-x-3 shadow-lg hover:shadow-2xl border border-[#C6ad7a] hover:border-white"
            >
              <span>{ct('book')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
            </a>

            <Link
              href="/chambres"
              className="font-body text-xs font-bold uppercase tracking-widest px-10 py-4 border border-white text-white hover:bg-white hover:text-[#2c3840] hover:scale-105 active:scale-95 transition-all duration-500 shadow-lg hover:shadow-2xl"
            >
              {ct('discoverRooms')}
            </Link>
          </div>
        </div>
      </div>

      {/* Indicateur de scroll minimaliste */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-px h-12 bg-white/40 animate-scroll-hint"></div>
      </div>
    </section>
  );
}
