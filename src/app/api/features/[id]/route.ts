import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// PUT - Mettre à jour une feature
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const feature = await prisma.feature.update({
      where: { id: parseInt(id) },
      data,
    });

    // Invalider le cache des pages concernées
    revalidatePath('/');
    revalidatePath('/a-propos');

    return NextResponse.json(feature);
  } catch (error) {
    console.error('Erreur PUT feature:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour' },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer une feature
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.feature.delete({
      where: { id: parseInt(id) },
    });

    // Invalider le cache des pages concernées
    revalidatePath('/');
    revalidatePath('/a-propos');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur DELETE feature:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression' },
      { status: 500 }
    );
  }
}


