import { HOTEL, absoluteUrl, cleanText, pick } from '@/lib/hotel-info';
import { localizedUrl, SITE_URL } from '@/lib/seo';

type EventRow = {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    date: Date | null;
    bookingUrl?: string | null;
    [key: string]: unknown;
};

/** Premier prix en euros trouvé dans un texte ("55 € par adulte" -> 55). */
function firstEuroPrice(text: string): number | undefined {
    const m = text.match(/(\d+(?:[.,]\d{1,2})?)\s*€|€\s*(\d+(?:[.,]\d{1,2})?)/);
    const v = m?.[1] ?? m?.[2];
    return v ? Number(v.replace(',', '.')) : undefined;
}

/**
 * Données structurées schema.org/Event pour les événements datés à venir
 * (brunchs…) : éligibles aux résultats « Événements » de Google.
 * Les formules permanentes (sans date) ne sont pas des événements.
 */
export default function EventsJsonLd({ events, locale }: { events: EventRow[]; locale: string }) {
    const pageUrl = localizedUrl(locale, '/evenements');
    const dated = events.filter((e) => e.date);
    if (dated.length === 0) return null;

    const data = dated.map((e) => {
        const description = cleanText(pick(e, 'description', locale)).replace(/\n+/g, ' ');
        const price = firstEuroPrice(description);
        const bookingUrl = pick(e, 'bookingUrl', locale);
        return {
            '@context': 'https://schema.org',
            '@type': 'Event',
            name: pick(e, 'title', locale),
            description: description.slice(0, 500),
            startDate: e.date!.toISOString(),
            eventStatus: 'https://schema.org/EventScheduled',
            eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
            image: absoluteUrl(e.imageUrl),
            url: pageUrl,
            location: {
                '@type': 'Place',
                name: HOTEL.name,
                address: { '@type': 'PostalAddress', ...HOTEL.address },
                geo: { '@type': 'GeoCoordinates', ...HOTEL.geo },
            },
            organizer: { '@type': 'Organization', name: HOTEL.name, url: SITE_URL },
            ...(price
                ? {
                    offers: {
                        '@type': 'Offer',
                        price,
                        priceCurrency: 'EUR',
                        url: bookingUrl || pageUrl,
                        availability: 'https://schema.org/InStock',
                    },
                }
                : {}),
        };
    });

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
        />
    );
}
