import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Récupérer toutes les images de la galerie
export async function GET() {
  try {
    const images = await prisma.galleryImage.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(images);
  } catch (error) {
    console.error('Erreur GET gallery:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des données' },
      { status: 500 }
    );
  }
}

// POST - Créer une nouvelle image
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const image = await prisma.galleryImage.create({ data });
    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    console.error('Erreur POST gallery:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création' },
      { status: 500 }
    );
  }
}


