import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// GET - Récupérer tous les services de chambre
export async function GET() {
    try {
        const services = await prisma.roomService.findMany({
            orderBy: { order: 'asc' },
        });
        return NextResponse.json(services);
    } catch (error) {
        console.error('Erreur GET room-services:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la récupération des données' },
            { status: 500 }
        );
    }
}

// POST - Créer un nouveau service
export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const service = await prisma.roomService.create({ data });

        // Invalider le cache de la page chambres
        revalidatePath('/chambres');

        return NextResponse.json(service, { status: 201 });
    } catch (error) {
        console.error('Erreur POST room-service:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la création' },
            { status: 500 }
        );
    }
}
