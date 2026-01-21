import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EvenementsContent from '@/components/EvenementsContent';
import { prisma } from '@/lib/prisma';

export default async function EvenementsPage() {
  // Récupération des données sur le serveur (SSR)
  const [events, pageHero] = await Promise.all([
    prisma.event.findMany({ orderBy: { order: 'asc' } }),
    prisma.pageHero.findFirst({ where: { page: 'evenements' } })
  ]);

  return (
    <main className="min-h-screen bg-blanc">
      <Header />
      <EvenementsContent events={events} pageHero={pageHero} />
      <Footer />
    </main>
  );
}
