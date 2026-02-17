import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const subscribers = await prisma.newsletterSubscriber.findMany({
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(subscribers);
    } catch (error) {
        console.error('Erreur récupération abonnés:', error);
        return NextResponse.json(
            { error: 'Erreur serveur' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json(
                { error: 'ID requis' },
                { status: 400 }
            );
        }

        await prisma.newsletterSubscriber.delete({
            where: { id }
        });

        return NextResponse.json({ message: 'Abonné supprimé' });
    } catch (error) {
        console.error('Erreur suppression abonné:', error);
        return NextResponse.json(
            { error: 'Erreur serveur' },
            { status: 500 }
        );
    }
}
