import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    const collaborations = await prisma.collaboration.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(collaborations);
  } catch (error) {
    console.error('Erreur GET collaborations:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des collaborations' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const collaboration = await prisma.collaboration.create({
      data: {
        name: data.name,
        description: data.description,
        descriptionEn: data.descriptionEn,
        descriptionNl: data.descriptionNl,
        phone: data.phone,
        website: data.website,
        imageUrl: data.imageUrl,
        order: data.order || 0,
      },
    });

    revalidatePath('/collaborations');
    return NextResponse.json(collaboration, { status: 201 });
  } catch (error) {
    console.error('Erreur POST collaboration:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de la collaboration' },
      { status: 500 }
    );
  }
}
