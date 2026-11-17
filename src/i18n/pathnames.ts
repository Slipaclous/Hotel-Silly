// Fichier sans dépendance : importé par routing.ts et par next.config.ts (redirections).
// Adresses traduites (SEO) : la clé est le chemin interne (dossier dans src/app/[locale]),
// la valeur l'adresse publique par langue. Le middleware réécrit /en/rooms -> /en/chambres
// et redirige les anciennes adresses (/en/chambres -> /en/rooms).
// Pages légales : rédigées en français uniquement, adresse identique partout.
export const pathnames = {
    '/': '/',
    '/chambres': { fr: '/chambres', en: '/rooms', nl: '/kamers' },
    '/a-propos': { fr: '/a-propos', en: '/about', nl: '/over-ons' },
    '/galerie': { fr: '/galerie', en: '/gallery', nl: '/galerij' },
    '/evenements': { fr: '/evenements', en: '/packages', nl: '/formules' },
    '/seminaires': { fr: '/seminaires', en: '/seminars', nl: '/seminaries' },
    '/carte-cadeau': { fr: '/carte-cadeau', en: '/gift-card', nl: '/cadeaubon' },
    '/contact': '/contact',
    '/collaborations': { fr: '/collaborations', en: '/partners', nl: '/partners' },
    '/cgv': '/cgv',
    '/mentions-legales': '/mentions-legales',
    '/politique-confidentialite': '/politique-confidentialite',
    '/admin': '/admin',
    '/admin/dashboard': '/admin/dashboard',
    '/design-demo': '/design-demo',
} as const;
