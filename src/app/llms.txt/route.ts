import { prisma } from '@/lib/prisma';
import { SITE_URL } from '@/lib/seo';
import { HOTEL, cleanText, getHotelData, pick } from '@/lib/hotel-info';

// Fichier llms.txt (https://llmstxt.org) : résumé factuel du site pour les assistants IA.
// Tout le contenu vient du back-office (anglais si traduit, sinon français),
// régénéré au plus toutes les heures et après chaque modification dans l'admin.
export const revalidate = 3600;

const EN = 'en';

/** Texte traduit en anglais si disponible, nettoyé du HTML, sur une seule ligne. */
const txt = (obj: Record<string, unknown> | null | undefined, field: string) =>
    cleanText(pick(obj, field, EN)).replace(/\n+/g, ' ').trim();

/** Texte multi-lignes indenté sous une puce markdown. */
const block = (text: string, indent = '  ') =>
    text.split('\n').map((l) => l.trim()).filter(Boolean).map((l) => `${indent}${l}`);

export async function GET() {
    const { hero, about, rooms } = await getHotelData();
    const [features, events, seminarPage, seminarFeatures, seminarPackages, giftCardPage, giftCardPackages] =
        await Promise.all([
            prisma.feature.findMany({ orderBy: { order: 'asc' } }),
            prisma.event.findMany({ orderBy: { order: 'asc' } }),
            prisma.seminarPage.findFirst(),
            prisma.seminarFeature.findMany({ orderBy: { order: 'asc' } }),
            prisma.seminarPackage.findMany({ orderBy: { order: 'asc' } }),
            prisma.giftCardPage.findFirst(),
            prisma.giftCardPackage.findMany({ orderBy: { order: 'asc' } }),
        ]);

    // Événements datés déjà passés : exclus (ceux sans date sont permanents)
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const upcomingEvents = events.filter((e) => !e.date || e.date >= startOfToday);

    const a = HOTEL.address;
    const L: string[] = [];
    const push = (...l: string[]) => L.push(...l);
    const section = (title: string) => push('', `## ${title}`, '');

    push(
        `# ${HOTEL.name}`,
        '',
        `> ${HOTEL.name} is a ${HOTEL.starRating}-star boutique hotel in the village centre of Silly (Hainaut, Wallonia, Belgium), ` +
        `about 10 km from Enghien and between Brussels, Mons and Ath. ` +
        `Address: ${a.streetAddress}, ${a.postalCode} ${a.addressLocality}, Belgium. ` +
        `Phone: ${HOTEL.telephone}. Email: ${HOTEL.email}. Website in French, English and Dutch.`,
    );

    const intro = txt(about, 'description');
    if (intro) push('', intro);

    section('Key facts');
    push(`- Category: ${HOTEL.starRating}-star hotel, ${rooms.length} rooms, family-run`);
    for (const field of ['checkIn', 'checkOut', 'breakfast']) {
        const v = txt(hero, field);
        if (v) push(`- ${v}`);
    }
    const access24 = txt(about, 'value2Desc');
    push(
        `- Self check-in / autonomous access${access24 ? `: ${access24}` : ''}`,
        '- Free WiFi, air conditioning in rooms',
        '- Free private parking with EV charging station; covered bike storage',
        `- Pets: ${rooms.some((r) => r.petsAllowed) ? 'allowed in some rooms' : 'not allowed'}`,
        `- Booking: online at ${HOTEL.bookingUrl}, by phone ${HOTEL.telephone} or by email ${HOTEL.email}`,
        `- Google Maps: ${HOTEL.mapUrl}`,
    );
    for (const f of features) {
        const t = txt(f, 'title');
        const d = txt(f, 'description');
        if (t) push(`- ${t}${d ? `: ${d}` : ''}`);
    }

    section('Rooms and prices');
    for (const r of rooms) {
        const details = ['price', 'capacity', 'surface', 'bedding', 'bathroom'].map((k) => txt(r, k)).filter(Boolean);
        push(`- **${txt(r, 'name')}**: ${details.join(' · ')}`);
        const extra = cleanText(r.price3Persons);
        if (extra) push(`  - Extra guest / children: ${extra.replace(/\n+/g, ' ')}`);
        const equip = (r.features ?? []).map((x) => x.trim().replace(/\.$/, '')).filter(Boolean);
        if (equip.length) push(`  - Equipment: ${equip.join(', ')}`);
        const booking = pick(r, 'bookingUrl', EN);
        if (booking) push(`  - Book: ${booking}`);
    }
    push(`- Full details: ${SITE_URL}/en/chambres`);

    if (upcomingEvents.length) {
        section('Packages, brunches and events');
        for (const e of upcomingEvents) {
            const meta = [
                e.date ? e.date.toISOString().slice(0, 10) : '',
                txt(e, 'duration'),
            ].filter(Boolean);
            push(`- **${txt(e, 'title')}**${meta.length ? ` (${meta.join(', ')})` : ''}`);
            push(...block(cleanText(pick(e, 'description', EN))));
            const url = pick(e, 'bookingUrl', EN);
            if (url) push(`  Book: ${url}`);
        }
        push(`- Current offers: ${SITE_URL}/en/evenements`);
    }

    if (seminarPage || seminarPackages.length) {
        section('Meetings and seminars');
        const desc = txt(seminarPage, 'introDesc');
        if (desc) push(desc, '');
        const included = seminarFeatures
            .map((f) => [txt(f, 'title'), txt(f, 'description')].filter(Boolean).join(': '))
            .filter(Boolean);
        if (included.length) push(`- Included: ${included.join('; ')}`);
        for (const p of seminarPackages) {
            const price = txt(p, 'price');
            push(
                `- **${txt(p, 'title')}** (${txt(p, 'description')}${price ? `, ${price}` : ', price on request'})` +
                (p.details.length ? `: ${p.details.map((d) => d.trim()).join(', ')}` : ''),
            );
        }
        push(`- Details and quote request: ${SITE_URL}/en/seminaires`);
    }

    if (giftCardPage || giftCardPackages.length) {
        section('Gift vouchers');
        const desc = txt(giftCardPage, 'introDesc');
        if (desc) push(desc);
        for (const g of giftCardPackages) {
            push(`- **${txt(g, 'title')}**: ${txt(g, 'price')}${txt(g, 'description') ? ` — ${txt(g, 'description')}` : ''}`);
        }
        push(`- ${SITE_URL}/en/carte-cadeau`);
    }

    const access = [
        ['By car', cleanText(pick(about, 'byCar', EN))],
        ['By train', cleanText(pick(about, 'byTrain', EN))],
        ['By bus', cleanText(pick(about, 'byBus', EN))],
    ].filter(([, v]) => v);
    if (access.length) {
        section('Getting there');
        for (const [k, v] of access) {
            push(`- ${k}:`, ...block(v.replace(/•/g, '\n')));
        }
        const location = txt(about, 'value1Desc');
        if (location) push(`- ${location}`);
    }

    const activities = (about?.activities ?? []).map((x) => x.trim()).filter(Boolean);
    if (activities.length) {
        section('Things to do nearby');
        for (const act of activities) push(`- ${act}`);
    }

    const history = cleanText(pick(about, 'historyText', EN));
    if (history) {
        section('About the hotel');
        push(...block(history, ''));
    }

    section('Pages');
    push(
        `- [Home](${SITE_URL}/en): overview of the hotel`,
        `- [Rooms & Suites](${SITE_URL}/en/chambres): rooms, prices, amenities`,
        `- [Packages](${SITE_URL}/en/evenements): stays, brunches and events`,
        `- [Seminars](${SITE_URL}/en/seminaires): business meetings and seminars`,
        `- [Gift card](${SITE_URL}/en/carte-cadeau): gift vouchers`,
        `- [About](${SITE_URL}/en/a-propos): story, access and surroundings`,
        `- [Gallery](${SITE_URL}/en/galerie): photos`,
        `- [Contact](${SITE_URL}/en/contact): contact form and directions`,
    );
    section('Optional');
    push(
        `- [Version française](${SITE_URL}/fr)`,
        `- [Nederlandse versie](${SITE_URL}/nl)`,
        `- [Terms and conditions](${SITE_URL}/en/cgv)`,
        '',
    );

    return new Response(L.join('\n'), {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
}
