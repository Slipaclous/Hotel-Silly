import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Récupérer toutes les chambres
export async function GET() {
  try {
    const rooms = await prisma.room.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(rooms);
  } catch (error) {
    console.error('Erreur GET rooms:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des données' },
      { status: 500 }
    );
  }
}

// POST - Créer une nouvelle chambre
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const room = await prisma.room.create({ data });
    return NextResponse.json(room, { status: 201 });
  } catch (error) {
    console.error('Erreur POST room:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création' },
      { status: 500 }
    );
  }
}


