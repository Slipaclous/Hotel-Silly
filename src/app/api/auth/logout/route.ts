import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json(
        { message: 'Déconnexion réussie' },
        { status: 200 }
    );

    // Supprimer le cookie de session
    response.cookies.set({
        name: 'admin_session',
        value: '',
        httpOnly: true,
        expires: new Date(0),
        path: '/',
    });

    return response;
}
