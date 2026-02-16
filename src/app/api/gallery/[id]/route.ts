import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// PUT - Mettre à jour une image
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const imageId = parseInt(id);
    const data = await request.json();
    const image = await prisma.galleryImage.update({
      where: { id: imageId },
      data,
    });

    // Invalider le cache des pages concernées
    revalidatePath('/galerie');
    revalidatePath('/chambres');
    revalidatePath('/');

    return NextResponse.json(image);
  } catch (error) {
    console.error('Erreur PUT gallery:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour' },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer une image
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const imageId = parseInt(id);
    await prisma.galleryImage.delete({
      where: { id: imageId },
    });

    // Invalider le cache des pages concernées
    revalidatePath('/galerie');
    revalidatePath('/chambres');
    revalidatePath('/');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur DELETE gallery:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression' },
      { status: 500 }
    );
  }
}


