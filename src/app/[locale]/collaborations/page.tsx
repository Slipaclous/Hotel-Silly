import CollaborationsContent from '@/components/CollaborationsContent';
import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  
  return {
    title: `Collaborations - ${t('title')}`,
    description: t('description'),
  };
}

export default async function CollaborationsPage() {
  // Récupération des données sur le serveur (SSR)
  const [collaborations, pageHero] = await Promise.all([
    prisma.collaboration.findMany({ orderBy: { order: 'asc' } }),
    prisma.pageHero.findFirst({ where: { page: 'collaborations' } })
  ]);

  return (
    <main className="min-h-screen bg-white">
      <CollaborationsContent collaborations={collaborations} pageHero={pageHero} />
    </main>
  );
}
