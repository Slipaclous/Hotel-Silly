import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { SITE_URL } from '@/lib/seo';

const HREFLANGS: Record<string, string> = {
    fr: 'fr-BE',
    en: 'en-BE',
    nl: 'nl-BE',
};

export default function sitemap(): MetadataRoute.Sitemap {
    const pages: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' }[] = [
        { path: '', priority: 1, changeFrequency: 'weekly' },
        { path: '/chambres', priority: 0.9, changeFrequency: 'weekly' },
        { path: '/evenements', priority: 0.8, changeFrequency: 'weekly' },
        { path: '/seminaires', priority: 0.8, changeFrequency: 'monthly' },
        { path: '/carte-cadeau', priority: 0.7, changeFrequency: 'monthly' },
        { path: '/a-propos', priority: 0.7, changeFrequency: 'monthly' },
        { path: '/galerie', priority: 0.6, changeFrequency: 'monthly' },
        { path: '/contact', priority: 0.7, changeFrequency: 'yearly' },
        { path: '/collaborations', priority: 0.5, changeFrequency: 'monthly' },
        { path: '/cgv', priority: 0.2, changeFrequency: 'yearly' },
        { path: '/mentions-legales', priority: 0.1, changeFrequency: 'yearly' },
        { path: '/politique-confidentialite', priority: 0.1, changeFrequency: 'yearly' },
    ];

    return pages.flatMap(({ path, priority, changeFrequency }) => {
        // Chaque URL déclare ses traductions (hreflang) + x-default
        const languages: Record<string, string> = {};
        for (const l of routing.locales) {
            languages[HREFLANGS[l]] = `${SITE_URL}/${l}${path}`;
        }
        languages['x-default'] = `${SITE_URL}/${routing.defaultLocale}${path}`;

        return routing.locales.map((locale) => ({
            url: `${SITE_URL}/${locale}${path}`,
            changeFrequency,
            priority,
            alternates: { languages },
        }));
    });
}
