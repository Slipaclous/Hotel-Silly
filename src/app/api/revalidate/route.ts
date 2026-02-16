import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { secret, paths } = await request.json();

        // Vérifier le secret pour sécuriser l'endpoint
        if (secret !== process.env.REVALIDATION_SECRET) {
            return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
        }

        // Revalider toutes les pages ou des pages spécifiques
        const pathsToRevalidate = paths || [
            '/',
            '/chambres',
            '/galerie',
            '/a-propos',
            '/contact',
            '/evenements',
            '/carte-cadeau',
            '/seminaires',
        ];

        for (const path of pathsToRevalidate) {
            revalidatePath(path);
            revalidatePath(`/en${path}`);
            revalidatePath(`/nl${path}`);
        }

        return NextResponse.json({
            revalidated: true,
            paths: pathsToRevalidate,
            message: 'Cache cleared successfully'
        });
    } catch (err) {
        return NextResponse.json({
            message: 'Error revalidating',
            error: err instanceof Error ? err.message : 'Unknown error'
        }, { status: 500 });
    }
}
