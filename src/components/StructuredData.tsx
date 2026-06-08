export default function StructuredData() {
    const hotelData = {
        "@context": "https://schema.org",
        "@type": "Hotel",
        "name": "Villa Dolce",
        "description": "Hôtel d'exception au cœur de Silly, Belgique, à proximité d'Enghien. Élégance et raffinement pour un séjour inoubliable.",
        "image": "https://www.villadolce-hotel.com/images/logo.png",
        "keywords": "hotel, silly, enghien, hebergement, belgique, wallonie",
        "areaServed": [
            {
                "@type": "City",
                "name": "Silly"
            },
            {
                "@type": "City",
                "name": "Enghien"
            }
        ],
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Place Communale 9",
            "addressLocality": "Silly",
            "postalCode": "7830",
            "addressCountry": "BE"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 50.6483,
            "longitude": 3.9189
        },
        "url": "https://www.villadolce-hotel.com",
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

    const websiteData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Villa Dolce",
        "url": "https://www.villadolce-hotel.com",
        "logo": "https://www.villadolce-hotel.com/images/logo-simple.png"
    };

    const organizationData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Villa Dolce",
        "url": "https://www.villadolce-hotel.com",
        "logo": "https://www.villadolce-hotel.com/images/logo-simple.png",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+32 470 13 73 13",
            "contactType": "customer service"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelData) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
            />
        </>
    );
}

