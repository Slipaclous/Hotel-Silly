import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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

    if (!about) {
      const newAbout = await prisma.about.create({ data });
      return NextResponse.json(newAbout);
    }

    const updatedAbout = await prisma.about.update({
      where: { id: about.id },
      data,
    });

    return NextResponse.json(updatedAbout);
  } catch (error) {
    console.error('Erreur PUT about:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour' },
      { status: 500 }
    );
  }
}


