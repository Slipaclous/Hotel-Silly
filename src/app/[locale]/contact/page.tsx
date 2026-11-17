import ContactContent from '@/components/ContactContent';
import { prisma } from '@/lib/prisma';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';

// Active le cache statique avec revalidation toutes les heures
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, page: 'contact', path: '/contact' });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const pageHero = await prisma.pageHero.findFirst({
    where: { page: 'contact' },
  });

  return (
    <main className="min-h-screen bg-blanc">
      <ContactContent pageHero={pageHero} />
    </main>
  );
}
