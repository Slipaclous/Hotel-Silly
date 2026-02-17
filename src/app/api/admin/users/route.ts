import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// Récupérer tous les utilisateurs
export async function GET() {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
            },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(users);
    } catch (error) {
        console.error('Erreur récupération utilisateurs:', error);
        return NextResponse.json(
            { error: 'Erreur serveur' },
            { status: 500 }
        );
    }
}

// Créer un utilisateur
export async function POST(request: NextRequest) {
    try {
        const { name, email, password } = await request.json();

        if (!name || !email || !password) {
            return NextResponse.json(
                { error: 'Tous les champs sont requis' },
                { status: 400 }
            );
        }

        // Vérifier si l'email existe déjà
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'Cet email est déjà utilisé' },
                { status: 400 }
            );
        }

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
            select: {
                id: true,
                email: true,
                name: true,
            }
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error('Erreur création utilisateur:', error);
        return NextResponse.json(
            { error: 'Erreur serveur' },
            { status: 500 }
        );
    }
}

// Modifier un utilisateur
export async function PUT(request: NextRequest) {
    try {
        const { id, name, email, password } = await request.json();

        if (!id || !name || !email) {
            return NextResponse.json(
                { error: 'ID, nom et email requis' },
                { status: 400 }
            );
        }

        const data: any = {
            name,
            email,
        };

        // Si un nouveau mot de passe est fourni, le hacher
        if (password) {
            data.password = await bcrypt.hash(password, 10);
        }

        const user = await prisma.user.update({
            where: { id: parseInt(id) },
            data,
            select: {
                id: true,
                email: true,
                name: true,
            }
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error('Erreur modification utilisateur:', error);
        return NextResponse.json(
            { error: 'Erreur serveur' },
            { status: 500 }
        );
    }
}

// Supprimer un utilisateur
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'ID requis' },
                { status: 400 }
            );
        }

        // Empecher la suppression du dernier admin? Facultatif mais recommandé
        const count = await prisma.user.count();
        if (count <= 1) {
            return NextResponse.json(
                { error: 'Impossible de supprimer le dernier administrateur' },
                { status: 400 }
            );
        }

        await prisma.user.delete({
            where: { id: parseInt(id) }
        });

        return NextResponse.json({ message: 'Utilisateur supprimé' });
    } catch (error) {
        console.error('Erreur suppression utilisateur:', error);
        return NextResponse.json(
            { error: 'Erreur serveur' },
            { status: 500 }
        );
    }
}
