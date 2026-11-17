/**
 * Préchauffe le cache Cloudinary pour toutes les images déjà en base.
 * À lancer une fois (ou après un changement de tailles dans src/lib/image-sizes.ts) :
 *   TS_NODE_COMPILER_OPTIONS='{"module":"CommonJS"}' node --env-file=.env -r ts-node/register scripts/warm-images.ts
 */
import { PrismaClient } from '@prisma/client';
import { warmImage } from '../src/lib/warm-images';

const prisma = new PrismaClient();

async function main() {
    const rows = await Promise.all([
        prisma.hero.findMany({ select: { imageUrl: true } }),
        prisma.about.findMany({ select: { imageUrl: true, historyImageUrl: true } }),
        prisma.room.findMany({ select: { imageUrl: true } }),
        prisma.galleryImage.findMany({ select: { url: true } }),
        prisma.event.findMany({ select: { imageUrl: true } }),
        prisma.pageHero.findMany({ select: { imageUrl: true } }),
        prisma.homeRoomSection.findMany({ select: { imageUrl: true } }),
        prisma.giftCardPage.findMany({ select: { imageUrl: true } }),
        prisma.seminarPage.findMany({ select: { imageUrl: true } }),
        prisma.collaboration.findMany({ select: { imageUrl: true } }),
    ]);
    const urls = [...new Set(
        rows.flat().flatMap((r) => Object.values(r)).filter((u): u is string => typeof u === 'string' && u.includes('res.cloudinary.com')),
    )];
    console.log(`${urls.length} images à préchauffer`);

    // Par lots de 5 images pour ne pas saturer Cloudinary
    for (let i = 0; i < urls.length; i += 5) {
        await Promise.all(urls.slice(i, i + 5).map(warmImage));
        console.log(`${Math.min(i + 5, urls.length)}/${urls.length}`);
    }
    await prisma.$disconnect();
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
