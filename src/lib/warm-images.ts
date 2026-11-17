import { imageUrl } from './image-url';
import { DEVICE_SIZES, IMAGE_SIZES } from './image-sizes';

// Formats négociés par f_auto : un navigateur récent reçoit de l'AVIF, les autres du WebP
const ACCEPT_HEADERS = ['image/avif,image/webp,*/*', 'image/webp,*/*'];

/**
 * Préchauffe le cache Cloudinary : génère à l'avance toutes les variantes
 * (tailles × formats) qu'utilisera le site. Sans ça, le premier visiteur
 * attend ~0,6-0,9 s par variante ; ensuite elle est servie en ~70 ms.
 */
export async function warmImage(src: string): Promise<void> {
    if (!src.includes('res.cloudinary.com')) return;
    const urls = [...IMAGE_SIZES, ...DEVICE_SIZES].map((width) => imageUrl({ src, width }));
    await Promise.allSettled(
        urls.flatMap((url) =>
            ACCEPT_HEADERS.map((accept) =>
                fetch(url, { headers: { Accept: accept } }).then((r) => r.arrayBuffer()),
            ),
        ),
    );
}
