import GalerieContent from '@/components/GalerieContent';
import { prisma } from '@/lib/prisma';

// Active le cache statique avec revalidation toutes les heures
export const revalidate = 3600;

export default async function GaleriePage() {
  // Récupération des données sur le serveur (SSR)
  const [images, pageHero] = await Promise.all([
    prisma.galleryImage.findMany({
      orderBy: { order: 'asc' },
    }),
    prisma.pageHero.findFirst({
      where: { page: 'galerie' },
    })
  ]);

  return (
    <main className="min-h-screen bg-blanc">
      <GalerieContent
        initialImages={images}
        pageHero={pageHero}
      />
    </main>
  );
}
