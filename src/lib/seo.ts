import type { Metadata } from 'next';
import { cache } from 'react';
import { getTranslations } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import { routing } from '@/i18n/routing';

export const SITE_URL = 'https://www.villadolce-hotel.com';
const SITE_NAME = 'Villa Dolce';
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/logo-512.png`;

const OG_LOCALES: Record<string, string> = {
  fr: 'fr_BE',
  en: 'en_US',
  nl: 'nl_BE',
};

const HREFLANGS: Record<string, string> = {
  fr: 'fr-BE',
  en: 'en-BE',
  nl: 'nl-BE',
};

export type SeoPageKey =
  | 'home'
  | 'rooms'
  | 'about'
  | 'gallery'
  | 'events'
  | 'seminars'
  | 'giftCard'
  | 'contact'
  | 'collaborations'
  | 'cgv'
  | 'legal'
  | 'privacy';

/** Pages dont le texte n'existe qu'en français (contenu identique dans les 3 langues). */
export const FRENCH_ONLY_PAGES: SeoPageKey[] = ['cgv', 'legal', 'privacy'];

// Image d'en-tête propre à une page (PageHero du back-office), pour l'aperçu de partage
const getPageHeroImage = cache(async (page: string): Promise<string | null> => {
  try {
    const hero = await prisma.pageHero.findUnique({ where: { page }, select: { imageUrl: true } });
    const url = hero?.imageUrl;
    if (!url) return null;
    return url.startsWith('http') ? url : `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
  } catch {
    return null;
  }
});

// Image du Hero utilisée comme image de partage par défaut (dédupliquée par rendu)
const getDefaultOgImage = cache(async (): Promise<string> => {
  try {
    const hero = await prisma.hero.findFirst({ select: { imageUrl: true } });
    const url = hero?.imageUrl;
    if (!url) return DEFAULT_OG_IMAGE;
    return url.startsWith('http') ? url : `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
  } catch (error) {
    console.error('Error fetching hero for metadata:', error);
    return DEFAULT_OG_IMAGE;
  }
});

/**
 * Alternates hreflang pour un chemin donné (sans préfixe de langue).
 * Ex: path = '/chambres' -> /fr/chambres, /en/chambres, /nl/chambres + x-default.
 */
export function buildAlternates(locale: string, path: string, frenchOnly = false): Metadata['alternates'] {
  // Pages rédigées uniquement en français : une seule version de référence
  if (frenchOnly) {
    return {
      canonical: `/fr${path}`,
      languages: { [HREFLANGS.fr]: `/fr${path}`, 'x-default': `/fr${path}` },
    };
  }
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[HREFLANGS[l]] = `/${l}${path}`;
  }
  languages['x-default'] = `/${routing.defaultLocale}${path}`;
  return {
    canonical: `/${locale}${path}`,
    languages,
  };
}

/**
 * Métadonnées complètes d'une page : titre, description, canonical,
 * hreflang, Open Graph et Twitter.
 */
export async function buildPageMetadata({
  locale,
  page,
  path,
  image,
  noindex = false,
}: {
  locale: string;
  page: SeoPageKey;
  path: string;
  image?: string | null;
  noindex?: boolean;
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo.pages' });
  const isHome = page === 'home';
  const title = isHome ? t('home.title') : `${t(`${page}.title`)} | ${SITE_NAME}`;
  const description = t(`${page}.description`);
  const frenchOnly = FRENCH_ONLY_PAGES.includes(page);
  const ogImage =
    image ||
    (path ? await getPageHeroImage(path.replace(/^\//, '')) : null) ||
    (await getDefaultOgImage());
  const url = `${SITE_URL}/${frenchOnly ? 'fr' : locale}${path}`;

  return {
    title,
    description,
    alternates: buildAlternates(locale, path, frenchOnly),
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: OG_LOCALES[locale] ?? OG_LOCALES.fr,
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}
