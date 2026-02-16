import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// PUT - Mettre à jour une chambre
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const { galleryImages, ...roomData } = data;

    const room = await prisma.room.update({
      where: { id: parseInt(id) },
      data: {
        ...roomData,
        images: {
          deleteMany: {}, // Supprimer les anciennes images liées
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

    return NextResponse.json(room);
  } catch (error) {
    console.error('Erreur PUT room:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour' },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer une chambre
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.room.delete({
      where: { id: parseInt(id) },
    });

    // Invalider le cache pour les pages concernées
    revalidatePath('/');
    revalidatePath('/chambres');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur DELETE room:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression' },
      { status: 500 }
    );
  }
}


