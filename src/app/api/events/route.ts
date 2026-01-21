import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Récupérer tous les événements
export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(events);
  } catch (error) {
    console.error('Erreur GET events:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des données' },
      { status: 500 }
    );
  }
}

// POST - Créer un nouvel événement
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const event = await prisma.event.create({ data });
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error('Erreur POST event:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création' },
      { status: 500 }
    );
  }
}


