import CarteCadeauContent from '@/components/CarteCadeauContent';
import { prisma } from '@/lib/prisma';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

// Active le cache statique avec revalidation toutes les heures
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, page: 'giftCard', path: '/carte-cadeau' });
}

export default async function CarteCadeauPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
    // Récupération sécurisée des données sur le serveur (SSR)
    const [pageHero, giftCardPage, giftCardPackages] = await Promise.all([
        prisma.pageHero.findFirst({
            where: { page: 'carte-cadeau' },
        }),
        (prisma as any).giftCardPage?.findFirst() || null,
        (prisma as any).giftCardPackage?.findMany({
            orderBy: { order: 'asc' },
        }) || [],
    ]);

    return (
        <main className="min-h-screen bg-blanc">
          <BreadcrumbJsonLd locale={locale} page="giftCard" path="/carte-cadeau" />
            <CarteCadeauContent
                pageHero={pageHero}
                initialData={giftCardPage}
                initialPackages={giftCardPackages}
            />
        </main>
    );
}
