import { getTranslations } from 'next-intl/server';
import { SITE_URL } from '@/lib/seo';
import { HOTEL, absoluteUrl, getHotelData, parsePrice, parseTime, pick } from '@/lib/hotel-info';

const IN_LANGUAGE: Record<string, string> = { fr: 'fr-BE', en: 'en', nl: 'nl-BE' };

const AMENITIES: Record<string, string[]> = {
    fr: ['WiFi gratuit', 'Parking privé', 'Borne de recharge', 'Climatisation', 'Petit-déjeuner local', 'Local vélos couvert', 'Accès autonome 24h/24', 'Salle de réunion'],
    en: ['Free WiFi', 'Private parking', 'EV charging station', 'Air conditioning', 'Local breakfast', 'Covered bike storage', '24/7 self check-in', 'Meeting room'],
    nl: ['Gratis wifi', 'Privéparking', 'Laadpaal', 'Airconditioning', 'Lokaal ontbijt', 'Overdekte fietsenstalling', 'Zelfstandige toegang 24/7', 'Vergaderzaal'],
};

/** Dernier nombre d'une chaîne ("2-3 personnes" -> 3). */
function lastNumber(text: string): number | undefined {
    const all = text.match(/\d+/g);
    return all ? Number(all[all.length - 1]) : undefined;
}

export default async function StructuredData({ locale }: { locale: string }) {
    const t = await getTranslations({ locale, namespace: 'seo.pages' });
    const { hero, rooms } = await getHotelData();

    const url = `${SITE_URL}/${locale}`;
    const prices = rooms.map((r) => parsePrice(r.price)).filter((p): p is number => p !== undefined);
    const minPrice = prices.length ? Math.min(...prices) : undefined;
    const maxPrice = prices.length ? Math.max(...prices) : undefined;

    const hotelRooms = rooms.map((room) => {
        const price = parsePrice(room.price);
        const surface = parsePrice(pick(room, 'surface', locale));
        const occupancy = lastNumber(pick(room, 'capacity', locale));
        const bed = pick(room, 'bedding', locale);
        return {
            '@type': 'HotelRoom',
            name: pick(room, 'name', locale),
            description: pick(room, 'description', locale).replace(/<[^>]+>/g, '').slice(0, 500) || undefined,
            image: absoluteUrl(room.imageUrl),
            ...(bed ? { bed } : {}),
            ...(surface ? { floorSize: { '@type': 'QuantitativeValue', value: surface, unitCode: 'MTK' } } : {}),
            ...(occupancy ? { occupancy: { '@type': 'QuantitativeValue', maxValue: occupancy } } : {}),
            petsAllowed: room.petsAllowed,
            ...(price
                ? {
                    offers: {
                        '@type': 'Offer',
                        price,
                        priceCurrency: 'EUR',
                        url: pick(room, 'bookingUrl', locale) || HOTEL.bookingUrl,
                        priceSpecification: {
                            '@type': 'UnitPriceSpecification',
                            price,
                            priceCurrency: 'EUR',
                            unitText: 'night',
                        },
                    },
                }
                : {}),
        };
    });

    const hotelData = {
        '@context': 'https://schema.org',
        '@type': 'Hotel',
        '@id': `${SITE_URL}/#hotel`,
        name: HOTEL.name,
        description: t('home.description'),
        url,
        inLanguage: IN_LANGUAGE[locale] ?? 'fr-BE',
        image: [absoluteUrl(hero?.imageUrl), HOTEL.image].filter(Boolean),
        logo: HOTEL.logo,
        telephone: HOTEL.telephone,
        email: HOTEL.email,
        starRating: { '@type': 'Rating', ratingValue: HOTEL.starRating },
        address: { '@type': 'PostalAddress', ...HOTEL.address },
        geo: { '@type': 'GeoCoordinates', ...HOTEL.geo },
        hasMap: HOTEL.mapUrl,
        sameAs: HOTEL.sameAs,
        areaServed: [
            { '@type': 'City', name: 'Silly' },
            { '@type': 'City', name: 'Enghien' },
        ],
        ...(minPrice && maxPrice ? { priceRange: minPrice === maxPrice ? `${minPrice} €` : `${minPrice} € - ${maxPrice} €` } : {}),
        currenciesAccepted: 'EUR',
        ...(parseTime(hero?.checkIn) ? { checkinTime: parseTime(hero?.checkIn) } : {}),
        ...(parseTime(hero?.checkOut) ? { checkoutTime: parseTime(hero?.checkOut) } : {}),
        ...(rooms.length ? { numberOfRooms: rooms.length } : {}),
        petsAllowed: rooms.length > 0 && rooms.some((r) => r.petsAllowed),
        availableLanguage: ['French', 'English', 'Dutch'],
        amenityFeature: (AMENITIES[locale] ?? AMENITIES.fr).map((name) => ({
            '@type': 'LocationFeatureSpecification',
            name,
            value: true,
        })),
        ...(hotelRooms.length ? { containsPlace: hotelRooms } : {}),
        potentialAction: {
            '@type': 'ReserveAction',
            target: HOTEL.bookingUrl,
        },
    };

    const websiteData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: HOTEL.name,
        url: SITE_URL,
        inLanguage: ['fr-BE', 'en', 'nl-BE'],
        publisher: { '@id': `${SITE_URL}/#hotel` },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelData).replace(/</g, "\\u003c") }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData).replace(/</g, "\\u003c") }}
            />
        </>
    );
}
