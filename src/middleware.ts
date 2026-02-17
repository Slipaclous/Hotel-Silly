import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './lib/jwt';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Protéger toutes les routes API qui modifient des données (POST, PUT, DELETE)
    // à l'exception des routes d'authentification publique
    const isMutation = ['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method);
    const isPublicApi = pathname.includes('/api/auth/login') || pathname.includes('/api/auth/logout') || (pathname.includes('/api/newsletter') && request.method === 'POST');

    if (pathname.startsWith('/api/') && isMutation && !isPublicApi) {
        const token = request.cookies.get('admin_session')?.value;
        const verified = token ? await verifyToken(token) : null;

        if (!verified) {
            return NextResponse.json(
                { error: 'Accès non autorisé : authentification requise' },
                { status: 401 }
            );
        }
    }

    // Protection explicite de TOUTES les routes sous /api/admin et /api/upload (même en GET)
    if (pathname.includes('/api/admin') || pathname.includes('/api/upload')) {
        const token = request.cookies.get('admin_session')?.value;
        const verified = token ? await verifyToken(token) : null;

        if (!verified) {
            return NextResponse.json(
                { error: 'Accès non autorisé' },
                { status: 401 }
            );
        }
    }

    // Protéger les pages d'administration côté client (ex: /fr/admin/dashboard, /admin/rooms)
    const segments = pathname.split('/');
    const isLocaleSegment = routing.locales.includes(segments[1] as any);
    const adminSegmentIndex = isLocaleSegment ? 2 : 1;
    const isAdminPage = segments[adminSegmentIndex] === 'admin' && segments.length > adminSegmentIndex + 1 && segments[adminSegmentIndex + 1] !== '';

    if (isAdminPage) {
        const token = request.cookies.get('admin_session')?.value;
        const verified = token ? await verifyToken(token) : null;

        if (!verified) {
            // Utiliser la locale du segment ou 'fr' par défaut
            const locale = isLocaleSegment ? segments[1] : 'fr';
            return NextResponse.redirect(new URL(`/${locale}/admin`, request.url));
        }
    }

    // Si c'est une route API, on arrête ici (le middleware intl ne doit pas s'appliquer aux APIs)
    if (pathname.startsWith('/api/')) {
        return NextResponse.next();
    }

    return intlMiddleware(request);
}

export const config = {
    // Match all pathnames except for
    // - Static files (_next, images, etc.)
    // - Internal files (e.g. .ico)
    matcher: ['/((?!_next|_vercel|.*\\..*).*)']
};
