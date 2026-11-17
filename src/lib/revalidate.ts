import { revalidatePath } from 'next/cache';

/**
 * Invalide le cache de tout le site public après une modification dans l'admin :
 * toutes les pages (3 langues), le sitemap (dates <lastmod>) et llms.txt.
 */
export function revalidateSite() {
    revalidatePath('/[locale]', 'layout');
    revalidatePath('/sitemap.xml');
    revalidatePath('/llms.txt');
}
