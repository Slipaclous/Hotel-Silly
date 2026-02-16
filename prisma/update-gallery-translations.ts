import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌍 Mise à jour des traductions pour la galerie...');

    try {
        // Mettre à jour le PageHero de la galerie avec les traductions
        const galleryHero = await prisma.pageHero.findUnique({
            where: { page: 'galerie' },
        });

        if (galleryHero) {
            await prisma.pageHero.update({
                where: { page: 'galerie' },
                data: {
                    titleEn: 'Photo Gallery',
                    titleNl: 'Fotogalerij',
                    subtitleEn: 'Discover the unique spaces and atmosphere of our hotel',
                    subtitleNl: 'Ontdek de unieke ruimtes en sfeer van ons hotel',
                },
            });
            console.log('✅ PageHero de la galerie mis à jour avec les traductions');
        } else {
            // Si le PageHero n'existe pas, le créer
            await prisma.pageHero.create({
                data: {
                    page: 'galerie',
                    title: 'Galerie Photo',
                    titleEn: 'Photo Gallery',
                    titleNl: 'Fotogalerij',
                    subtitle: 'Découvrez les espaces et l\'ambiance unique de notre hôtel',
                    subtitleEn: 'Discover the unique spaces and atmosphere of our hotel',
                    subtitleNl: 'Ontdek de unieke ruimtes en sfeer van ons hotel',
                    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                },
            });
            console.log('✅ PageHero de la galerie créé avec les traductions');
        }

        console.log('🎉 Mise à jour terminée avec succès !');
    } catch (error) {
        console.error('❌ Erreur lors de la mise à jour:', error);
        throw error;
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
