import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function GET() {
    try {
        const page = await (prisma as any).giftCardPage.findFirst();
        return NextResponse.json(page);
    } catch (error) {
        console.error('Erreur GET gift-card-page:', error);
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const data = await request.json();
        const page = await (prisma as any).giftCardPage.findFirst();

        let result;
        if (!page) {
            result = await (prisma as any).giftCardPage.create({ data });
        } else {
            result = await (prisma as any).giftCardPage.update({
                where: { id: page.id },
                data,
            });
        }

        revalidatePath('/[locale]/carte-cadeau', 'page');
        return NextResponse.json(result);
    } catch (error) {
        console.error('Erreur PUT gift-card-page:', error);
        return NextResponse.json({ error: 'Erreur lors de la mise à jour' }, { status: 500 });
    }
}
