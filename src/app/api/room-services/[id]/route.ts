import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// PUT - Mettre à jour un service
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        const id = parseInt(resolvedParams.id);
        const data = await request.json();

        const service = await prisma.roomService.update({
            where: { id },
            data: {
                icon: data.icon,
                title: data.title,
                titleEn: data.titleEn,
                titleNl: data.titleNl,
                description: data.description,
                descriptionEn: data.descriptionEn,
                descriptionNl: data.descriptionNl,
                order: data.order,
            },
        });

        revalidatePath('/chambres');
        return NextResponse.json(service);
    } catch (error) {
        console.error('Erreur PUT room-service:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la mise à jour' },
            { status: 500 }
        );
    }
}

// DELETE - Supprimer un service
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        const id = parseInt(resolvedParams.id);
        await prisma.roomService.delete({
            where: { id },
        });

        revalidatePath('/chambres');
        return NextResponse.json({ message: 'Supprimé avec succès' });
    } catch (error) {
        console.error('Erreur DELETE room-service:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la suppression' },
            { status: 500 }
        );
    }
}
