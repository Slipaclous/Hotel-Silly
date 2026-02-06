import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CarteCadeauContent from '@/components/CarteCadeauContent';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function CarteCadeauPage() {
    // Récupération des données sur le serveur (SSR)
    const pageHero = await prisma.pageHero.findFirst({
        where: { page: 'carte-cadeau' },
    });

    return (
        <main className="min-h-screen bg-blanc">
            <Header />
            <CarteCadeauContent pageHero={pageHero} />
            <Footer />
        </main>
    );
}
