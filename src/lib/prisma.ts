import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Neon met la base en veille après quelques minutes d'inactivité ; le réveil prend
 * quelques secondes, plus que les 5 s d'attente par défaut de Prisma (erreur P1001
 * pendant les builds). On allonge les délais si l'URL ne les fixe pas déjà.
 */
function databaseUrl(): string | undefined {
  const raw = process.env.DATABASE_URL;
  if (!raw) return undefined;
  try {
    const url = new URL(raw);
    if (!url.searchParams.has('connect_timeout')) url.searchParams.set('connect_timeout', '30');
    if (!url.searchParams.has('pool_timeout')) url.searchParams.set('pool_timeout', '30');
    return url.toString();
  } catch {
    return raw;
  }
}

const url = databaseUrl();

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient(url ? { datasources: { db: { url } } } : undefined);

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
