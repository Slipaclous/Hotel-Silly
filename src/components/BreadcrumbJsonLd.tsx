import { getTranslations } from 'next-intl/server';
import { SITE_URL, type SeoPageKey } from '@/lib/seo';

/**
 * Fil d'Ariane en données structurées (schema.org BreadcrumbList) :
 * Google affiche « Villa Dolce › Chambres & Suites » au lieu de l'URL brute.
 */
export default async function BreadcrumbJsonLd({
    locale,
    page,
    path,
}: {
    locale: string;
    page: Exclude<SeoPageKey, 'home'>;
    path: string;
}) {
    const nav = await getTranslations({ locale, namespace: 'nav' });
    const seo = await getTranslations({ locale, namespace: 'seo.pages' });

    const data = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: nav('home'), item: `${SITE_URL}/${locale}` },
            { '@type': 'ListItem', position: 2, name: seo(`${page}.title`), item: `${SITE_URL}/${locale}${path}` },
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
        />
    );
}
