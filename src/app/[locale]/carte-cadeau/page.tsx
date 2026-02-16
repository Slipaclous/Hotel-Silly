import CarteCadeauContent from '@/components/CarteCadeauContent';
import { prisma } from '@/lib/prisma';

// Active le cache statique avec revalidation toutes les heures
export const revalidate = 3600;

export default async function CarteCadeauPage() {
    // Récupération des données sur le serveur (SSR)
    const [pageHero, giftCardPage, giftCardPackages] = await Promise.all([
        prisma.pageHero.findFirst({
            where: { page: 'carte-cadeau' },
        }),
        (prisma as any).giftCardPage.findFirst(),
        (prisma as any).giftCardPackage.findMany({
            orderBy: { order: 'asc' },
        }),
    ]);

    return (
        <main className="min-h-screen bg-blanc">
            <CarteCadeauContent
                pageHero={pageHero}
                initialData={giftCardPage}
                initialPackages={giftCardPackages}
            />
        </main>
    );
}
