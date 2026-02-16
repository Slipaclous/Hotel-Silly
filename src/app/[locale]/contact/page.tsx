import ContactContent from '@/components/ContactContent';
import { prisma } from '@/lib/prisma';

// Active le cache statique avec revalidation toutes les heures
export const revalidate = 3600;

export default async function ContactPage() {
  const pageHero = await prisma.pageHero.findFirst({
    where: { page: 'contact' },
  });

  return (
    <main className="min-h-screen bg-blanc">
      <ContactContent pageHero={pageHero} />
    </main>
  );
}
