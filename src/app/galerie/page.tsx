import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GalerieContent from '@/components/GalerieContent';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

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
      <Header />
      <GalerieContent
        initialImages={images}
        pageHero={pageHero}
      />
      <Footer />
    </main>
  );
}
