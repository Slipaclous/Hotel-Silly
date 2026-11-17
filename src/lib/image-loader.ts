'use client';

/**
 * Loader global next/image.
 *
 * - Cloudinary : redimensionnement + format moderne (AVIF/WebP) + compression faits
 *   directement par le CDN Cloudinary. Évite l'aller-retour par l'optimiseur Next
 *   (/_next/image), lent au premier affichage et facturé sur Vercel.
 * - Unsplash : paramètres natifs w / q / auto=format.
 * - Fichiers locaux (/images/...) : servis tels quels (déjà légers).
 */
export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  const q = quality ?? 'auto';

  if (src.includes('res.cloudinary.com') && src.includes('/upload/')) {
    // N'ajoute pas une transformation si l'URL en contient déjà une
    const [base, rest] = src.split('/upload/');
    const firstSegment = rest.split('/')[0];
    const hasTransform = /(^|,)(w|c|f|q)_/.test(firstSegment);
    if (hasTransform) return src;
    return `${base}/upload/f_auto,q_${q},c_limit,w_${width}/${rest}`;
  }

  if (src.includes('images.unsplash.com')) {
    const url = new URL(src);
    url.searchParams.set('w', String(width));
    url.searchParams.set('q', String(quality ?? 75));
    url.searchParams.set('auto', 'format');
    return url.toString();
  }

  // Fichier local : le paramètre w permet à Next de distinguer les tailles
  return `${src}${src.includes('?') ? '&' : '?'}w=${width}`;
}
