import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Récupérer le hero d'une page spécifique
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ page: string }> }
) {
  try {
    const { page } = await params;
    const decodedPage = decodeURIComponent(page);
    const pageHero = await prisma.pageHero.findUnique({
      where: { page: decodedPage },
    });

    if (!pageHero) {
      return NextResponse.json(null);
    }

    return NextResponse.json(pageHero);
  } catch (error) {
    console.error('Erreur GET page-hero:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des données' },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour le hero d'une page
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ page: string }> }
) {
  try {
    const { page } = await params;
    const decodedPage = decodeURIComponent(page);
    const data = await request.json();

    const pageHero = await prisma.pageHero.upsert({
      where: { page: decodedPage },
      update: data,
      create: {
        page: decodedPage,
        ...data,
      },
    });

    return NextResponse.json(pageHero);
  } catch (error) {
    console.error('Erreur PUT page-hero:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour' },
      { status: 500 }
    );
  }
}


