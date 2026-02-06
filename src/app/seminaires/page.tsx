import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SeminairesContent from '@/components/SeminairesContent';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function SeminairesPage() {
    // Récupération des données sur le serveur (SSR)
    const pageHero = await prisma.pageHero.findFirst({
        where: { page: 'seminaires' },
    });

    return (
        <main className="min-h-screen bg-blanc">
            <Header />
            <SeminairesContent pageHero={pageHero} />
            <Footer />
        </main>
    );
}
