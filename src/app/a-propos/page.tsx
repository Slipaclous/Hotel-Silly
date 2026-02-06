import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutContent from '@/components/AboutContent';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

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
      <Header />
      <AboutContent
        aboutData={aboutData as any}
        features={features as any}
        pageHero={pageHero as any}
      />
      <Footer />
    </main>
  );
}