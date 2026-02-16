import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// GET - Récupérer toutes les features
export async function GET() {
  try {
    const features = await prisma.feature.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(features);
  } catch (error) {
    console.error('Erreur GET features:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des données' },
      { status: 500 }
    );
  }
}

// POST - Créer une nouvelle feature
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const feature = await prisma.feature.create({ data });

    // Invalider le cache des pages concernées
    revalidatePath('/');
    revalidatePath('/a-propos');

    return NextResponse.json(feature, { status: 201 });
  } catch (error) {
    console.error('Erreur POST feature:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création' },
      { status: 500 }
    );
  }
}


