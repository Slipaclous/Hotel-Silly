import SeminairesContent from '@/components/SeminairesContent';
import { prisma } from '@/lib/prisma';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

// Active le cache statique avec revalidation toutes les heures
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, page: 'seminars', path: '/seminaires' });
}

export default async function SeminairesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
    // Récupération sécurisée des données sur le serveur (SSR)
    const [pageHero, seminarPage, seminarFeatures, seminarPackages] = await Promise.all([
        prisma.pageHero.findFirst({
            where: { page: 'seminaires' },
        }),
        (prisma as any).seminarPage?.findFirst() || null,
        (prisma as any).seminarFeature?.findMany({
            orderBy: { order: 'asc' },
        }) || [],
        (prisma as any).seminarPackage?.findMany({
            orderBy: { order: 'asc' },
        }) || [],
    ]);

    return (
        <main className="min-h-screen bg-blanc">
          <BreadcrumbJsonLd locale={locale} page="seminars" path="/seminaires" />
            <SeminairesContent
                pageHero={pageHero}
                initialData={seminarPage}
                initialFeatures={seminarFeatures}
                initialPackages={seminarPackages}
            />
        </main>
    );
}
