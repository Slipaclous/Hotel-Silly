import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// GET - Récupérer tous les témoignages
export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Erreur GET testimonials:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des données' },
      { status: 500 }
    );
  }
}

// POST - Créer un nouveau témoignage
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const testimonial = await prisma.testimonial.create({ data });

    // Invalider le cache de la page d'accueil
    revalidatePath('/');

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error('Erreur POST testimonial:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création' },
      { status: 500 }
    );
  }
}


