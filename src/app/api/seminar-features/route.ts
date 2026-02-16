import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function GET() {
    try {
        const features = await (prisma as any).seminarFeature.findMany({
            orderBy: { order: 'asc' },
        });
        return NextResponse.json(features);
    } catch (error) {
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const result = await (prisma as any).seminarFeature.create({ data });
        revalidatePath('/[locale]/seminaires', 'page');
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: 'Erreur lors de la création' }, { status: 500 });
    }
}
