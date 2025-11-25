import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Récupérer les données Hero
export async function GET() {
  try {
    const hero = await prisma.hero.findFirst();
    return NextResponse.json(hero);
  } catch (error) {
    console.error('Erreur GET hero:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des données' },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour les données Hero
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const hero = await prisma.hero.findFirst();

    if (!hero) {
      // Créer si n'existe pas
      const newHero = await prisma.hero.create({ data });
      return NextResponse.json(newHero);
    }

    // Mettre à jour
    const updatedHero = await prisma.hero.update({
      where: { id: hero.id },
      data,
    });

    return NextResponse.json(updatedHero);
  } catch (error) {
    console.error('Erreur PUT hero:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour' },
      { status: 500 }
    );
  }
}


