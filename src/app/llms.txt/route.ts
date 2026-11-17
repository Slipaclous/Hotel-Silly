import { prisma } from '@/lib/prisma';
import { SITE_URL } from '@/lib/seo';
import { HOTEL, getHotelData, pick } from '@/lib/hotel-info';

// Fichier llms.txt (https://llmstxt.org) : résumé factuel du site pour les assistants IA.
// Généré depuis le back-office, régénéré au plus toutes les heures.
export const revalidate = 3600;

const clean = (s: string | null | undefined) =>
    (s ?? '').replace(/<[^>]+>/g, ' ').replace(/[ \t]+/g, ' ').replace(/\s*\n\s*/g, ' ').trim();

export async function GET() {
    const { hero, about, rooms } = await getHotelData();
    const events = await prisma.event
        .findMany({ orderBy: { order: 'asc' }, select: { title: true, titleEn: true, titleNl: true } })
        .catch(() => []);

    const en = 'en';
    const a = HOTEL.address;
    const lines: string[] = [];
    const push = (...l: string[]) => lines.push(...l);

    push(
        `# ${HOTEL.name}`,
        '',
        `> ${HOTEL.name} is a boutique hotel (guesthouse) in Silly, Wallonia, Belgium, near Enghien, Brussels and Mons. ` +
        `Address: ${a.streetAddress}, ${a.postalCode} ${a.addressLocality}, Belgium. Phone: ${HOTEL.telephone}. ` +
        `Website available in French, English and Dutch.`,
        '',
        '## Key facts',
        '',
    );
    const checkIn = clean(pick(hero, 'checkIn', en));
    const checkOut = clean(pick(hero, 'checkOut', en));
    const breakfast = clean(pick(hero, 'breakfast', en));
    if (checkIn) push(`- ${checkIn}`);
    if (checkOut) push(`- ${checkOut}`);
    if (breakfast) push(`- ${breakfast}`);
    push(
        `- Number of rooms: ${rooms.length}`,
        `- Pets allowed: ${rooms.some((r) => r.petsAllowed) ? 'yes (some rooms)' : 'no'}`,
        '- Free WiFi, air conditioning, private parking with EV charging station, covered bike storage',
        `- Online booking: ${HOTEL.bookingUrl}`,
        `- Location on Google Maps: ${HOTEL.mapUrl}`,
        '',
        '## Rooms',
        '',
    );
    for (const r of rooms) {
        const details = [
            clean(pick(r, 'price', en)),
            clean(pick(r, 'capacity', en)),
            clean(pick(r, 'surface', en)),
            clean(pick(r, 'bedding', en)),
            clean(pick(r, 'bathroom', en)),
        ].filter(Boolean);
        push(`- **${clean(pick(r, 'name', en))}**: ${details.join(' · ')}`);
        if (r.price3Persons) push(`  - Extra guest / children: ${clean(r.price3Persons)}`);
        const booking = pick(r, 'bookingUrl', en);
        if (booking) push(`  - Book: ${booking}`);
    }

    const access = [
        ['By car', pick(about, 'byCar', en)],
        ['By train', pick(about, 'byTrain', en)],
        ['By bus', pick(about, 'byBus', en)],
    ].filter(([, v]) => v);
    if (access.length) {
        push('', '## Getting there', '');
        for (const [k, v] of access) push(`- ${k}: ${clean(v)}`);
    }

    const activities = (about?.activities ?? []).map((x) => x.trim()).filter(Boolean);
    if (activities.length) {
        push('', '## Nearby', '');
        for (const act of activities) push(`- ${act}`);
    }

    if (events.length) {
        push('', '## Packages and events', '');
        for (const e of events) push(`- ${clean(pick(e, 'title', en))}`);
    }

    push(
        '',
        '## Pages',
        '',
        `- [Home](${SITE_URL}/en): overview of the hotel`,
        `- [Rooms & Suites](${SITE_URL}/en/chambres): rooms, prices, amenities`,
        `- [Packages](${SITE_URL}/en/evenements): stays, brunches and events`,
        `- [Seminars](${SITE_URL}/en/seminaires): business meetings and seminars`,
        `- [Gift card](${SITE_URL}/en/carte-cadeau): gift vouchers`,
        `- [About](${SITE_URL}/en/a-propos): story, access and surroundings`,
        `- [Gallery](${SITE_URL}/en/galerie): photos`,
        `- [Contact](${SITE_URL}/en/contact): contact form and directions`,
        '',
        '## Optional',
        '',
        `- [Version française](${SITE_URL}/fr)`,
        `- [Nederlandse versie](${SITE_URL}/nl)`,
        `- [Terms and conditions](${SITE_URL}/en/cgv)`,
        '',
    );

    return new Response(lines.join('\n'), {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
}
