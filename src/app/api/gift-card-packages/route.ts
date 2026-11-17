import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidateSite } from '@/lib/revalidate';

export async function GET() {
    try {
        const packages = await (prisma as any).giftCardPackage.findMany({
            orderBy: { order: 'asc' },
        });
        return NextResponse.json(packages);
    } catch (error) {
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const pkg = await (prisma as any).giftCardPackage.create({ data });
        revalidateSite();
        return NextResponse.json(pkg);
    } catch (error) {
        return NextResponse.json({ error: 'Erreur lors de la création' }, { status: 500 });
    }
}
