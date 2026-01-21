import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Récupérer tous les hero des pages
export async function GET() {
  try {
    const pageHeroes = await prisma.pageHero.findMany({
      orderBy: { page: 'asc' },
    });
    return NextResponse.json(pageHeroes);
  } catch (error) {
    console.error('Erreur GET page-hero:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des données' },
      { status: 500 }
    );
  }
}

// POST - Créer un nouveau hero de page
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const pageHero = await prisma.pageHero.create({ data });
    return NextResponse.json(pageHero, { status: 201 });
  } catch (error) {
    console.error('Erreur POST page-hero:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création' },
      { status: 500 }
    );
  }
}


