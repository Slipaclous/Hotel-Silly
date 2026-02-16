import AboutContent from '@/components/AboutContent';
import { prisma } from '@/lib/prisma';

// Active le cache statique avec revalidation toutes les heures
export const revalidate = 3600;

export default async function AProposPage() {
  // Récupération des données sur le serveur (SSR)
  const [aboutData, features, pageHero] = await Promise.all([
    prisma.about.findFirst(),
    prisma.feature.findMany({
      orderBy: { order: 'asc' },
    }),
    prisma.pageHero.findFirst({
      where: { page: 'a-propos' },
    })
  ]);

  return (
    <main className="min-h-screen bg-blanc">
      <AboutContent
        aboutData={aboutData}
        features={features}
        pageHero={pageHero}
      />
    </main>
  );
}