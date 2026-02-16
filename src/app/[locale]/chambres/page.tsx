import ChambresContent from '@/components/ChambresContent';
import { prisma } from '@/lib/prisma';

export default async function ChambresPage() {
  // Récupération des données sur le serveur (SSR)
  const [rooms, pageHero] = await Promise.all([
    prisma.room.findMany({
      orderBy: { order: 'asc' },
      include: { images: { orderBy: { order: 'asc' } } }
    }),
    prisma.pageHero.findFirst({ where: { page: 'chambres' } })
  ]);

  return (
    <main className="min-h-screen bg-blanc">
      <ChambresContent rooms={rooms} pageHero={pageHero} />
    </main>
  );
}
