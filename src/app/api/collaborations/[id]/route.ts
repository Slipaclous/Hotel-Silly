import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const data = await request.json();

    const collaboration = await prisma.collaboration.update({
      where: { id: parseInt(id) },
      data: {
        name: data.name,
        description: data.description,
        descriptionEn: data.descriptionEn,
        descriptionNl: data.descriptionNl,
        phone: data.phone,
        website: data.website,
        imageUrl: data.imageUrl,
        order: data.order,
      },
    });

    revalidatePath('/collaborations');
    return NextResponse.json(collaboration);
  } catch (error) {
    console.error('Erreur PATCH collaboration:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de la collaboration' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    await prisma.collaboration.delete({
      where: { id: parseInt(id) },
    });

    revalidatePath('/collaborations');
    return NextResponse.json({ message: 'Collaboration supprimée avec succès' });
  } catch (error) {
    console.error('Erreur DELETE collaboration:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de la collaboration' },
      { status: 500 }
    );
  }
}
