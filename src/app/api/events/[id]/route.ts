import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// PUT - Mettre à jour un événement
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const eventId = parseInt(id);
    const data = await request.json();
    const event = await prisma.event.update({
      where: { id: eventId },
      data,
    });

    // Invalider le cache de la page événements
    revalidatePath('/evenements');

    return NextResponse.json(event);
  } catch (error) {
    console.error('Erreur PUT event:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour' },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un événement
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const eventId = parseInt(id);
    await prisma.event.delete({
      where: { id: eventId },
    });

    // Invalider le cache de la page événements
    revalidatePath('/evenements');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur DELETE event:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression' },
      { status: 500 }
    );
  }
}


