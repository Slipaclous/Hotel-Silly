export default function StructuredData() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Hotel",
        "name": "Hôtel de Silly - Villa Dolce",
        "description": "Hôtel de luxe et raffinement au cœur de Silly, Belgique.",
        "image": "https://hotel-silly.vercel.app/images/logo.png",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Place Communale 9",
            "addressLocality": "Silly",
            "postalCode": "7830",
            "addressCountry": "BE"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 50.6483, // Coordonnées approximatives de Silly
            "longitude": 3.9189
        },
        "url": "https://hotel-silly.vercel.app",
        "telephone": "+32 470 13 73 13",
        "priceRange": "$$$",
        "amenityFeature": [
            {
                "@type": "LocationFeatureSpecification",
                "name": "WiFi gratuit",
                "value": true
            },
            {
                "@type": "LocationFeatureSpecification",
                "name": "Parking privé",
                "value": true
            },
            {
                "@type": "LocationFeatureSpecification",
                "name": "Petit-déjeuner local",
                "value": true
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}
