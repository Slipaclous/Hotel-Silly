import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        const data = await request.json();
        const result = await (prisma as any).giftCardPackage.update({
            where: { id },
            data,
        });
        revalidatePath('/[locale]/carte-cadeau', 'page');
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: 'Erreur lors de la mise à jour' }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        await (prisma as any).giftCardPackage.delete({
            where: { id },
        });
        revalidatePath('/[locale]/carte-cadeau', 'page');
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Erreur lors de la suppression' }, { status: 500 });
    }
}
