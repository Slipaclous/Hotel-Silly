import SeminairesContent from '@/components/SeminairesContent';
import { prisma } from '@/lib/prisma';

// Active le cache statique avec revalidation toutes les heures
export const revalidate = 3600;

export default async function SeminairesPage() {
    // Récupération des données sur le serveur (SSR)
    const [pageHero, seminarPage, seminarFeatures, seminarPackages] = await Promise.all([
        prisma.pageHero.findFirst({
            where: { page: 'seminaires' },
        }),
        (prisma as any).seminarPage.findFirst(),
        (prisma as any).seminarFeature.findMany({
            orderBy: { order: 'asc' },
        }),
        (prisma as any).seminarPackage.findMany({
            orderBy: { order: 'asc' },
        }),
    ]);

    return (
        <main className="min-h-screen bg-blanc">
            <SeminairesContent
                pageHero={pageHero}
                initialData={seminarPage}
                initialFeatures={seminarFeatures}
                initialPackages={seminarPackages}
            />
        </main>
    );
}
