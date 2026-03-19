import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const item = await prisma.feature.findUnique({
      where: { id: parseInt(id) },
    });
    if (!item) return NextResponse.json({ error: 'Pas trouvé' }, { status: 404 });
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// PUT - Mettre à jour une feature
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const { id: _, createdAt: __, updatedAt: ___, ...updateData } = data;
    const feature = await prisma.feature.update({
      where: { id: parseInt(id) },
      data: updateData,
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


