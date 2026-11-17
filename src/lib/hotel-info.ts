import { cache } from 'react';
import { prisma } from '@/lib/prisma';
import { SITE_URL } from '@/lib/seo';

/**
 * Informations fixes de l'établissement (non éditables dans le back-office).
 * Coordonnées GPS alignées sur la carte Google affichée sur la page À propos.
 */
export const HOTEL = {
  name: 'Villa Dolce',
  telephone: '+32 470 13 73 13',
  email: 'info@dolcehotel-silly.com',
  starRating: 3,
  address: {
    streetAddress: 'Place Communale 9',
    addressLocality: 'Silly',
    postalCode: '7830',
    addressRegion: 'Hainaut',
    addressCountry: 'BE',
  },
  geo: { latitude: 50.6375333, longitude: 3.92135 },
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Villa+Dolce+Place+Communale+9+7830+Silly',
  bookingUrl: 'https://bookingengine.mylighthouse.com/villa-dolce-silly',
  sameAs: [
    'https://www.facebook.com/profile.php?id=61578920094391',
    'https://www.instagram.com/villadolce_silly',
  ],
  logo: `${SITE_URL}/images/icon-512.png`,
  image: `${SITE_URL}/images/logo-512.png`,
};

type Loc = 'fr' | 'en' | 'nl';

/** Choisit le champ traduit (xxxEn / xxxNl) avec repli sur le français. */
export function pick<T extends Record<string, unknown>>(obj: T | null | undefined, field: string, locale: string): string {
  if (!obj) return '';
  const suffix = locale === 'en' ? 'En' : locale === 'nl' ? 'Nl' : '';
  const v = (suffix && obj[`${field}${suffix}`]) || obj[field];
  return typeof v === 'string' ? v.trim() : '';
}

/** Extrait une heure ("à partir de 14h", "10h30", "11:00") au format HH:MM. */
export function parseTime(text: string | null | undefined): string | undefined {
  const m = text?.match(/(\d{1,2})\s*(?:h|:|u)\s*(\d{2})?/i);
  if (!m) return undefined;
  return `${m[1].padStart(2, '0')}:${m[2] ?? '00'}`;
}

/** Premier montant trouvé dans une chaîne de prix ("A partir de 150€" -> 150). */
export function parsePrice(text: string | null | undefined): number | undefined {
  const m = text?.match(/(\d+(?:[.,]\d+)?)/);
  return m ? Number(m[1].replace(',', '.')) : undefined;
}

/** Données de l'établissement issues du back-office (dédupliquées par rendu). */
export const getHotelData = cache(async () => {
  try {
    const [hero, about, rooms] = await Promise.all([
      prisma.hero.findFirst(),
      prisma.about.findFirst(),
      prisma.room.findMany({ orderBy: { order: 'asc' } }),
    ]);
    return { hero, about, rooms };
  } catch (error) {
    console.error('Error fetching hotel data:', error);
    return { hero: null, about: null, rooms: [] };
  }
});

export function absoluteUrl(url: string | null | undefined): string | undefined {
  if (!url) return undefined;
  return url.startsWith('http') ? url : `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
}

export function localeOf(locale: string): Loc {
  return locale === 'en' || locale === 'nl' ? locale : 'fr';
}

/** Texte brut depuis le HTML de l'éditeur riche (balises, entités, emojis-lettres). */
export function cleanText(html: string | null | undefined): string {
  return (html ?? '')
    .replace(/<\/(p|div|li|h\d)>|<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/[\u{1F100}-\u{1F1FF}]/gu, '')
    .replace(/[ \t\u00a0]+/g, ' ')
    .replace(/\s*\n\s*/g, '\n')
    .trim();
}
