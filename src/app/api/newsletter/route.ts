import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json(
                { error: 'Email requis' },
                { status: 400 }
            );
        }

        // Validation basique de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Email invalide' },
                { status: 400 }
            );
        }

        // Vérifier si l'email existe déjà
        const existing = await prisma.newsletterSubscriber.findUnique({
            where: { email }
        });

        if (existing) {
            return NextResponse.json(
                { message: 'Déjà inscrit' },
                { status: 200 }
            );
        }

        // Enregistrer dans la base de données
        await prisma.newsletterSubscriber.create({
            data: { email }
        });

        return NextResponse.json(
            { message: 'Inscription réussie', email },
            { status: 200 }
        );
    } catch (error) {
        console.error('Erreur inscription newsletter:', error);
        return NextResponse.json(
            { error: 'Erreur serveur' },
            { status: 500 }
        );
    }
}
