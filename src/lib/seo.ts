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
export function buildAlternates(locale: string, path: string): Metadata['alternates'] {
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
  const ogImage = image || (await getDefaultOgImage());
  const url = `${SITE_URL}/${locale}${path}`;

  return {
    title,
    description,
    alternates: buildAlternates(locale, path),
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
