'use client';

import Image from 'next/image';

interface Slide {
    src: string;
    alt: string;
}

interface ImageSlidesProps {
    slides: Slide[];
    index: number;
    sizes: string;
    /** Classes appliquées à chaque image (ex: object-cover / object-contain) */
    imageClassName?: string;
    /** Nombre de photos préchargées de chaque côté de la photo courante */
    preload?: number;
}

/**
 * Visionneuse sans attente : la photo courante et ses voisines sont montées
 * en même temps (superposées). Changer de photo = fondu enchaîné CSS vers une
 * image déjà téléchargée, au lieu de démonter / recharger l'image.
 */
export default function ImageSlides({ slides, index, sizes, imageClassName = 'object-cover', preload = 1 }: ImageSlidesProps) {
    const n = slides.length;
    if (n === 0) return null;

    // Indices montés : courant + voisins (navigation circulaire)
    const mounted = new Set<number>();
    for (let d = -preload; d <= preload; d++) {
        mounted.add(((index + d) % n + n) % n);
    }

    return (
        <>
            {[...mounted].map((i) => {
                const active = i === index;
                return (
                    <div
                        key={slides[i].src}
                        className={`absolute inset-0 transition-opacity duration-300 ease-out ${active ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                        aria-hidden={!active}
                    >
                        <Image
                            src={slides[i].src}
                            alt={active ? slides[i].alt : ''}
                            fill
                            sizes={sizes}
                            className={imageClassName}
                            // Voisines chargées tout de suite, pas au scroll
                            loading="eager"
                            fetchPriority={active ? 'high' : 'low'}
                        />
                    </div>
                );
            })}
        </>
    );
}
