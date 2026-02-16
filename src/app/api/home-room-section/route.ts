import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// GET - Récupérer les données de la section chambres de la page d'accueil
export async function GET() {
    try {
        const section = await (prisma as any).homeRoomSection.findFirst();
        return NextResponse.json(section);
    } catch (error) {
        console.error('Erreur GET home-room-section:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la récupération des données' },
            { status: 500 }
        );
    }
}

// PUT - Mettre à jour les données de la section chambres de la page d'accueil
export async function PUT(request: NextRequest) {
    try {
        const data = await request.json();
        const section = await (prisma as any).homeRoomSection.findFirst();

        let result;
        if (!section) {
            // Créer si n'existe pas
            result = await (prisma as any).homeRoomSection.create({ data });
        } else {
            // Mettre à jour
            result = await (prisma as any).homeRoomSection.update({
                where: { id: section.id },
                data,
            });
        }

        // Invalider le cache de la page d'accueil
        revalidatePath('/');
        revalidatePath('/[locale]', 'layout');

        return NextResponse.json(result);
    } catch (error) {
        console.error('Erreur PUT home-room-section:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la mise à jour' },
            { status: 500 }
        );
    }
}
