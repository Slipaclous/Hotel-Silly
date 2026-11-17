import { cache } from 'react';

/**
 * Miniature floue (~1 Ko, base64) d'une image Cloudinary, intégrée directement
 * dans la page : affichée instantanément pendant le chargement de la vraie photo.
 */
export const getBlurDataURL = cache(async (src: string | null | undefined): Promise<string | null> => {
    if (!src || !src.includes('res.cloudinary.com') || !src.includes('/upload/')) return null;
    const [base, rest] = src.split('/upload/');
    const url = `${base}/upload/w_24,q_40,e_blur:300,f_webp/${rest}`;
    try {
        const res = await fetch(url, { cache: 'force-cache' });
        if (!res.ok) return null;
        const buf = Buffer.from(await res.arrayBuffer());
        return `data:image/webp;base64,${buf.toString('base64')}`;
    } catch {
        return null;
    }
});

/** Ajoute blurDataURL à un en-tête de page (PageHero) pour l'aperçu flou. */
export async function withBlur<T extends { imageUrl: string }>(hero: T | null): Promise<(T & { blurDataURL: string | null }) | null> {
    if (!hero) return null;
    return { ...hero, blurDataURL: await getBlurDataURL(hero.imageUrl) };
}
