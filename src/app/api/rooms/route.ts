import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// GET - Récupérer toutes les chambres avec leurs images
export async function GET() {
  try {
    const rooms = await prisma.room.findMany({
      orderBy: { order: 'asc' },
      include: { images: { orderBy: { order: 'asc' } } }
    });
    return NextResponse.json(rooms);
  } catch (error) {
    console.error('Erreur GET rooms:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des données' },
      { status: 500 }
    );
  }
}

// POST - Créer une nouvelle chambre
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { galleryImages, ...roomData } = data;

    const room = await prisma.room.create({
      data: {
        ...roomData,
        images: {
          create: galleryImages?.map((url: string, index: number) => ({
            url,
            category: 'Chambres',
            title: roomData.name,
            order: index
          })) || []
        }
      },
      include: { images: true }
    });

    // Invalider le cache pour les pages concernées
    revalidatePath('/');
    revalidatePath('/chambres');

    return NextResponse.json(room, { status: 201 });
  } catch (error) {
    console.error('Erreur POST room:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création' },
      { status: 500 }
    );
  }
}


