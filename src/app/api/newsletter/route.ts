import { NextRequest, NextResponse } from 'next/server';

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

        // TODO: Intégrer avec un service d'emailing (Mailchimp, SendGrid, etc.)
        // Pour l'instant, on simule un succès
        console.log('Nouvelle inscription newsletter:', email);

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
