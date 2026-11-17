import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { pathnames } from './pathnames';

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ['fr', 'en', 'nl'],

    // Used when no locale matches
    defaultLocale: 'fr',

    // Custom prefix strategy (optional)
    localePrefix: 'always',

    // Adresses traduites (SEO) : voir src/i18n/pathnames.ts
    pathnames,
});

export type AppPathname = keyof typeof routing.pathnames;

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing);
