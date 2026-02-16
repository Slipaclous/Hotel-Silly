import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// GET - Récupérer les données About
export async function GET() {
  try {
    const about = await prisma.about.findFirst();
    return NextResponse.json(about);
  } catch (error) {
    console.error('Erreur GET about:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des données' },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour les données About
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const about = await prisma.about.findFirst();

    let result;
    if (!about) {
      result = await prisma.about.create({ data });
    } else {
      result = await prisma.about.update({
        where: { id: about.id },
        data,
      });
    }

    // Invalider le cache des pages concernées
    revalidatePath('/');
    revalidatePath('/a-propos');

    return NextResponse.json(result);
  } catch (error) {
    console.error('Erreur PUT about:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour' },
      { status: 500 }
    );
  }
}


