import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://hotel-silly.com';
    const locales = ['fr', 'en', 'nl'];
    const pages = [
        '',
        '/chambres',
        '/a-propos',
        '/galerie',
        '/evenements',
        '/seminaires',
        '/carte-cadeau',
        '/contact',
        '/cgv',
        '/mentions-legales',
        '/politique-confidentialite',
    ];

    const sitemapEntries: MetadataRoute.Sitemap = [];

    for (const locale of locales) {
        for (const page of pages) {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${page}`,
                lastModified: new Date(),
                changeFrequency: page === '' ? 'daily' : 'weekly',
                priority: page === '' ? 1 : 0.8,
            });
        }
    }

    return sitemapEntries;
}
