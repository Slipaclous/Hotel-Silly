'use client';

import { useEffect } from 'react';
import { imageUrl } from '@/lib/image-url';
import { DEVICE_SIZES } from '@/lib/image-sizes';

/**
 * Précharge la photo d'en-tête d'une page dès que l'utilisateur survole (ou touche)
 * un lien vers cette page. Au clic, la photo est souvent déjà en cache.
 *
 * Le srcset reproduit exactement celui de <Image sizes="100vw"> (mêmes URL),
 * pour que le navigateur réutilise le fichier préchargé.
 */
export default function HeroImagePreloader({ heroImages }: { heroImages: Record<string, string> }) {
    useEffect(() => {
        const done = new Set<string>();

        const preload = (src: string) => {
            if (done.has(src)) return;
            done.add(src);
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.setAttribute('imagesrcset', DEVICE_SIZES.map((w) => `${imageUrl({ src, width: w })} ${w}w`).join(', '));
            link.setAttribute('imagesizes', '100vw');
            document.head.appendChild(link);
        };

        const onIntent = (e: Event) => {
            const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
            if (!a || a.origin !== window.location.origin) return;
            // /fr/chambres -> /chambres ; /fr -> ''
            const path = a.pathname.replace(/^\/(fr|en|nl)(?=\/|$)/, '').replace(/\/$/, '');
            const src = heroImages[path];
            if (src) preload(src);
        };

        document.addEventListener('pointerover', onIntent, { passive: true });
        document.addEventListener('touchstart', onIntent, { passive: true });
        document.addEventListener('focusin', onIntent);
        return () => {
            document.removeEventListener('pointerover', onIntent);
            document.removeEventListener('touchstart', onIntent);
            document.removeEventListener('focusin', onIntent);
        };
    }, [heroImages]);

    return null;
}
