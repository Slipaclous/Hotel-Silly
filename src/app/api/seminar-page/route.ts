import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function GET() {
    try {
        const page = await (prisma as any).seminarPage?.findFirst();
        return NextResponse.json(page || null);
    } catch (error) {
        console.error('Erreur GET seminar-page:', error);
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const data = await request.json();
        const model = (prisma as any).seminarPage;
        if (!model) throw new Error('Modèle SeminarPage non disponible');

        const page = await model.findFirst();

        let result;
        if (!page) {
            result = await model.create({ data });
        } else {
            result = await model.update({
                where: { id: page.id },
                data,
            });
        }

        revalidatePath('/[locale]/seminaires', 'page');
        return NextResponse.json(result);
    } catch (error) {
        console.error('Erreur PUT seminar-page:', error);
        return NextResponse.json({ error: 'Erreur lors de la mise à jour' }, { status: 500 });
    }
}
