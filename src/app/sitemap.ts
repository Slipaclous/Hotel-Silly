import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';
import { routing } from '@/i18n/routing';
import { HREFLANGS, localizedUrl } from '@/lib/seo';

// Régénéré au plus toutes les heures : les <lastmod> suivent les modifications du back-office
export const revalidate = 3600;

// Pages au texte écrit dans le code (pas dans le back-office).
// ⚠️ Mettre à jour la date quand le texte de la page change.
const STATIC_LASTMOD: Record<string, string> = {
    '/cgv': '2026-02-26',
    '/mentions-legales': '2026-03-12',
    '/politique-confidentialite': '2026-02-26',
};

type Row = { updatedAt: Date } | null;

/** Date de dernière modification la plus récente parmi les contenus d'une page. */
function latest(...rows: (Row | Row[])[]): Date | undefined {
    const dates = rows
        .flat()
        .filter((r): r is { updatedAt: Date } => !!r)
        .map((r) => r.updatedAt.getTime());
    return dates.length ? new Date(Math.max(...dates)) : undefined;
}

/** Dernier élément modifié d'une table (une seule ligne lue). */
const lastOf = (model: { findFirst: (args: object) => Promise<Row> }) =>
    model.findFirst({ orderBy: { updatedAt: 'desc' }, select: { updatedAt: true } });

const heroOf = (page: string) =>
    prisma.pageHero.findUnique({ where: { page }, select: { updatedAt: true } });

async function getLastModified(): Promise<Record<string, Date | undefined>> {
    {
        const [
            hero, about, room, roomService, feature, homeRoomSection, gallery, event,
            seminarPage, seminarFeature, seminarPackage, giftCardPage, giftCardPackage, collaboration,
            phChambres, phAbout, phGalerie, phEvents, phSeminaires, phGift, phContact, phCollab,
        ] = await Promise.all([
            lastOf(prisma.hero), lastOf(prisma.about), lastOf(prisma.room), lastOf(prisma.roomService),
            lastOf(prisma.feature), lastOf(prisma.homeRoomSection), lastOf(prisma.galleryImage), lastOf(prisma.event),
            lastOf(prisma.seminarPage), lastOf(prisma.seminarFeature), lastOf(prisma.seminarPackage),
            lastOf(prisma.giftCardPage), lastOf(prisma.giftCardPackage), lastOf(prisma.collaboration),
            heroOf('chambres'), heroOf('a-propos'), heroOf('galerie'), heroOf('evenements'),
            heroOf('seminaires'), heroOf('carte-cadeau'), heroOf('contact'), heroOf('collaborations'),
        ]);

        return {
            '': latest(hero, about, room, feature, homeRoomSection),
            '/chambres': latest(room, roomService, gallery, phChambres),
            '/a-propos': latest(about, feature, phAbout),
            '/galerie': latest(gallery, phGalerie),
            '/evenements': latest(event, phEvents),
            '/seminaires': latest(seminarPage, seminarFeature, seminarPackage, phSeminaires),
            '/carte-cadeau': latest(giftCardPage, giftCardPackage, phGift),
            '/contact': latest(phContact),
            '/collaborations': latest(collaboration, phCollab),
        };
    }
}

/** Images de chaque page, déclarées pour Google Images (URL Cloudinary d'origine). */
async function getImages(): Promise<Record<string, string[]>> {
    const [homeHero, about, rooms, gallery, events, pageHeroes, homeRoomSection] = await Promise.all([
        prisma.hero.findFirst({ select: { imageUrl: true } }),
        prisma.about.findFirst({ select: { imageUrl: true, historyImageUrl: true } }),
        prisma.room.findMany({ orderBy: { order: 'asc' }, select: { imageUrl: true, images: { select: { url: true } } } }),
        prisma.galleryImage.findMany({ orderBy: { order: 'asc' }, select: { url: true } }),
        prisma.event.findMany({ orderBy: { order: 'asc' }, select: { imageUrl: true } }),
        prisma.pageHero.findMany({ select: { page: true, imageUrl: true } }),
        prisma.homeRoomSection.findFirst({ select: { imageUrl: true } }),
    ]);
    const hero = (page: string) => pageHeroes.find((p) => p.page === page)?.imageUrl;
    const clean = (urls: (string | null | undefined)[]) =>
        [...new Set(urls.filter((u): u is string => !!u && u.startsWith('http')))];

    return {
        '': clean([homeHero?.imageUrl, about?.imageUrl, homeRoomSection?.imageUrl, ...rooms.map((r) => r.imageUrl)]),
        '/chambres': clean([hero('chambres'), ...rooms.flatMap((r) => [r.imageUrl, ...r.images.map((i) => i.url)])]),
        '/a-propos': clean([hero('a-propos'), about?.imageUrl, about?.historyImageUrl]),
        '/galerie': clean([hero('galerie'), ...gallery.map((g) => g.url)]),
        '/evenements': clean([hero('evenements'), ...events.map((e) => e.imageUrl)]),
        '/seminaires': clean([hero('seminaires')]),
        '/carte-cadeau': clean([hero('carte-cadeau')]),
        '/contact': clean([hero('contact')]),
        '/collaborations': clean([hero('collaborations')]),
    };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

    const [lastModified, images] = await Promise.all([getLastModified(), getImages()]);

    return pages.flatMap(({ path, priority, changeFrequency }) => {
        // Chaque URL déclare ses traductions (hreflang) + x-default
        const languages: Record<string, string> = {};
        for (const l of routing.locales) {
            languages[HREFLANGS[l]] = localizedUrl(l, path);
        }
        languages['x-default'] = localizedUrl(routing.defaultLocale, path);

        // Date exacte si connue, sinon pas de <lastmod> (mieux qu'une date fausse)
        const lastmod = lastModified[path] ?? (STATIC_LASTMOD[path] ? new Date(STATIC_LASTMOD[path]) : undefined);

        // Pages légales rédigées en français uniquement : seule la version /fr est déclarée
        if (path in STATIC_LASTMOD) {
            return [{
                url: localizedUrl('fr', path),
                ...(lastmod ? { lastModified: lastmod } : {}),
                changeFrequency,
                priority,
            }];
        }

        return routing.locales.map((locale) => ({
            url: localizedUrl(locale, path),
            ...(images[path]?.length ? { images: images[path] } : {}),
            ...(lastmod ? { lastModified: lastmod } : {}),
            changeFrequency,
            priority,
            alternates: { languages },
        }));
    });
}
