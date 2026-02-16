const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function translateAll() {
    console.log('--- STARTING AUTOMATIC TRANSLATIONS ---');

    // HERO
    await prisma.hero.update({
        where: { id: 1 },
        data: {
            badgeEn: "Villa Dolce - Hotel ★★★",
            badgeNl: "Villa Dolce - Hotel ★★★",
            subtitleEn: "Welcome to",
            subtitleNl: "Welkom bij",
            descriptionEn: "Welcome to La Villa Dolce! Your hotel in the heart of Silly, where charm, comfort, and the sweet life meet.",
            descriptionNl: "Welkom bij La Villa Dolce! Uw hotel in het hart van Silly, waar charme, comfort en levensvreugde samenkomen.",
            locationEn: "Silly, Belgium - Walloon Region",
            locationNl: "Opzullik (Silly), België - Waals Gewest"
        }
    });
    console.log('Hero updated');

    // ABOUT
    await prisma.about.update({
        where: { id: 1 },
        data: {
            titleEn: "A Unique Experience",
            titleNl: "Een Unieke Ervaring",
            descriptionEn: "Located in the center of the beautiful village of Silly, Villa Dolce invites you to a break of sweetness and escape. Here, every detail has been thought of for your comfort and well-being to offer you an unforgettable stay, between relaxation, elegance and the art of living.",
            descriptionNl: "Gelegen in het centrum van het prachtige dorp Opzullik (Silly), nodigt Villa Dolce u uit voor een pauze van tederheid en ontsnapping. Hier is aan elk detail gedacht voor uw comfort en welzijn om u een onvergetelijk verblijf te bieden, tussen ontspanning, elegantie en levenskunst.",
            keyPoint1TitleEn: "Ideal location",
            keyPoint1TitleNl: "Ideale locatie",
            keyPoint1TextEn: "Located near major roads, our hotel is the perfect starting point!",
            keyPoint1TextNl: "Dicht bij de hoofdwegen, ons hotel is het perfecte vertrekpunt!",
            keyPoint2TitleEn: "Personalized service",
            keyPoint2TitleNl: "Gepersonaliseerde service",
            keyPoint2TextEn: "Our dedicated team is committed to anticipating your needs and making your stay exceptional.",
            keyPoint2TextNl: "Ons toegewijde team zet zich in om op uw behoeften te anticiperen en uw verblijf uitzonderlijk te maken.",
            keyPoint3TitleEn: "Luxury amenities",
            keyPoint3TitleNl: "Luxe voorzieningen",
            keyPoint3TextEn: "Rooms with modern equipment, integrated into a warm atmosphere.",
            keyPoint3TextNl: "Kamers met moderne apparatuur, geïntegreerd in een warme sfeer."
        }
    });
    console.log('About updated');

    // FEATURES
    const features = [
        { id: 2, tEn: "Connectivity", dEn: "Autonomous access to the hotel thanks to our modern connectivity system.", tNl: "Connectiviteit", dNl: "Zelfstandige toegang tot het hotel dankzij ons moderne connectiviteitssysteem." },
        { id: 3, tEn: "Hospitality", dEn: "Authentic hospitality with a sense of detail.", tNl: "Gastvrijheid", dNl: "Authentieke gastvrijheid met oog voor detail." },
        { id: 4, tEn: "Luxury", dEn: "Each space is designed to provide comfort, sweetness and serenity.", tNl: "Luxe", dNl: "Elke ruimte is ontworpen om comfort, zachtheid en rust te bieden." },
        { id: 5, tEn: "Quality Breakfast", dEn: "A friendly and gourmet moment, with carefully selected products.", tNl: "Kwaliteitsontbijt", dNl: "Een gezellig en gastronomisch moment, met zorgvuldig geselecteerde producten." }
    ];

    for (const f of features) {
        await prisma.feature.update({
            where: { id: f.id },
            data: { titleEn: f.tEn, descriptionEn: f.dEn, titleNl: f.tNl, descriptionNl: f.dNl }
        });
    }
    console.log('Features updated');

    // ROOMS
    await prisma.room.update({
        where: { id: 2 },
        data: {
            nameEn: "Deluxe Double Room",
            nameNl: "Deluxe Tweepersoonskamer",
            descriptionEn: "180/200 bed - two 90/200 beds\n\n1 person - €140\n2 people - €150",
            descriptionNl: "bed 180/200 - 2 bedden 90/200\n\n1 persoon - €140\n2 personen - €150",
            capacityEn: "2 people",
            capacityNl: "2 personen"
        }
    });
    await prisma.room.update({
        where: { id: 3 },
        data: {
            nameEn: "Family Room",
            nameNl: "Familiekamer",
            descriptionEn: "180/200 bed - two 90/200 beds\n\n3 people - €140\n4 people - €150",
            descriptionNl: "Bed 180/200 - 2 bedden 90/200\n\n3 personen - €140\n4 personen - €150",
            capacityEn: "4-6 people",
            capacityNl: "4-6 personen"
        }
    });
    await prisma.room.update({
        where: { id: 1 },
        data: {
            nameNl: "Premium Tweepersoonskamer",
            descriptionNl: "Bed 160/200 - 2 bedden 80/200\nBed 180/200 - 2 bedden 90/200\n\n1 persoon - € 130\n2 personen - € 140",
            capacityNl: "2 personen"
        }
    });
    console.log('Rooms updated');

    // TESTIMONIALS
    const testimonials = [
        { id: 1, lEn: "Paris, France", tEn: "An exceptional stay! The attention to detail and personalized service exceeded all our expectations. We will definitely be back.", lNl: "Parijs, Frankrijk", tNl: "Een uitzonderlijk verblijf! De aandacht voor detail en de persoonlijke service overtroffen al onze verwachtingen. We komen zeker terug." },
        { id: 2, lEn: "Berlin, Germany", tEn: "The presidential suite is simply magnificent. Breathtaking view of Silly and impeccable service. An authentic luxury hotel.", lNl: "Berlijn, Duitsland", tNl: "De presidentiële suite is gewoonweg prachtig. Adembenemend uitzicht over Opzullik (Silly) en onberispelijke service. Een authentiek luxe hotel." },
        { id: 3, lEn: "London, UK", tEn: "Perfect for our honeymoon. The team did everything to make our stay unforgettable. The rooms are sublime.", lNl: "Londen, VK", tNl: "Perfect voor onze huwelijksreis. Het team heeft er alles aan gedaan om ons verblijf onvergetelijk te maken. De kamers zijn prachtig." },
        { id: 4, lEn: "Milan, Italy", tEn: "A hotel that deserves its 5 stars. The gastronomic restaurant is exceptional and the location is ideal for discovering Belgium.", lNl: "Milaan, Italië", tNl: "Een hotel dat zijn 5 sterren verdient. Het gastronomische restaurant is uitzonderlijk en de locatie is ideaal om België te ontdekken." }
    ];

    for (const t of testimonials) {
        await prisma.testimonial.update({
            where: { id: t.id },
            data: { locationEn: t.lEn, textEn: t.tEn, locationNl: t.lNl, textNl: t.tNl }
        });
    }
    console.log('Testimonials updated');

    console.log('--- ALL TRANSLATIONS COMPLETED ---');
}

translateAll()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
