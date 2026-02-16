import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

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

    let result;
    if (!hero) {
      // Créer si n'existe pas
      result = await prisma.hero.create({ data });
    } else {
      // Mettre à jour
      result = await prisma.hero.update({
        where: { id: hero.id },
        data,
      });
    }

    // Invalider le cache de la page d'accueil
    revalidatePath('/');

    return NextResponse.json(result);
  } catch (error) {
    console.error('Erreur PUT hero:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour' },
      { status: 500 }
    );
  }
}


