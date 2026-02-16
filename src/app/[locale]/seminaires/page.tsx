import SeminairesContent from '@/components/SeminairesContent';
import { prisma } from '@/lib/prisma';

// Active le cache statique avec revalidation toutes les heures
export const revalidate = 3600;

export default async function SeminairesPage() {
    // Récupération des données sur le serveur (SSR)
    const pageHero = await prisma.pageHero.findFirst({
        where: { page: 'seminaires' },
    });

    return (
        <main className="min-h-screen bg-blanc">
            <SeminairesContent pageHero={pageHero} />
        </main>
    );
}
