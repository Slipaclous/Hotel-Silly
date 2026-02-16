import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding...');

  // Créer un utilisateur admin
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.create({
    data: {
      email: 'admin@hotel-silly.com',
      password: hashedPassword,
      name: 'Administrateur',
    },
  });
  console.log('✅ Utilisateur admin créé (email: admin@hotel-silly.com, mot de passe: admin123)');

  // Créer la section Hero
  await prisma.hero.create({
    data: {
      badge: 'Ouverture 2025 - Luxe & Confort',
      title: "L'Hôtel de Silly",
      subtitle: 'Bienvenue à',
      description:
        "Découvrez une expérience hôtelière exceptionnelle au cœur de la Belgique, où élégance, confort et service personnalisé se rencontrent pour créer des souvenirs inoubliables.",
      location: 'Silly, Belgique - Région Wallonne',
      imageUrl:
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    },
  });
  console.log('✅ Section Hero créée');

  // Créer la section About
  await prisma.about.create({
    data: {
      title: 'Une Expérience Unique',
      description:
        "Notre hôtel de luxe va ouvrir ses portes au printemps 2025 dans le charmant village de Silly, au cœur de la Belgique. Chaque détail a été pensé pour offrir une expérience inoubliable dans un cadre d'exception.",
      keyPoint1Title: 'Emplacement idéal',
      keyPoint1Text:
        'Au cœur de Silly, village pittoresque de la Région Wallonne, à proximité de Bruxelles et des principales attractions belges.',
      keyPoint2Title: 'Service personnalisé',
      keyPoint2Text:
        "Notre équipe dédiée s'engage à anticiper vos besoins et à rendre votre séjour exceptionnel.",
      keyPoint3Title: 'Équipements de luxe',
      keyPoint3Text:
        'Chambres et suites équipées des dernières technologies et du confort le plus raffiné.',
      openingYear: '2025',
      imageUrl:
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
  });
  console.log('✅ Section About créée');

  // Créer les features
  const features = [
    {
      icon: 'Award',
      title: 'Excellence',
      description: "Reconnu pour notre service d'exception et notre attention aux détails",
      order: 1,
    },
    {
      icon: 'Heart',
      title: 'Hospitalité',
      description: 'Accueil chaleureux et personnalisé pour chaque client',
      order: 2,
    },
    {
      icon: 'Shield',
      title: 'Sécurité',
      description: 'Environnement sécurisé et protocoles sanitaires rigoureux',
      order: 3,
    },
    {
      icon: 'Star',
      title: 'Luxe',
      description: 'Équipements haut de gamme et décoration raffinée',
      order: 4,
    },
  ];

  for (const feature of features) {
    await prisma.feature.create({ data: feature });
  }
  console.log('✅ Features créées');

  // Créer les chambres
  const rooms = [
    {
      name: 'Suite Présidentielle',
      description: 'Notre suite la plus prestigieuse avec vue panoramique sur Silly',
      price: 'À partir de 1200€',
      capacity: '2-4 personnes',
      rating: 5,
      imageUrl:
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['Vue panoramique', 'Balcon privé', 'Spa privé', 'Butler 24h/24'],
      order: 1,
    },
    {
      name: 'Chambre Deluxe',
      description: 'Élégance et confort dans un cadre raffiné',
      price: 'À partir de 450€',
      capacity: '2 personnes',
      rating: 5,
      imageUrl:
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['Vue jardin', 'Salle de bain marbre', 'Room service', 'WiFi premium'],
      order: 2,
    },
    {
      name: 'Suite Familiale',
      description: 'Espace généreux pour des séjours en famille inoubliables',
      price: 'À partir de 650€',
      capacity: '4-6 personnes',
      rating: 5,
      imageUrl:
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['2 chambres', 'Salon privé', 'Cuisine équipée', 'Terrasse'],
      order: 3,
    },
  ];

  for (const room of rooms) {
    await prisma.room.create({ data: room });
  }
  console.log('✅ Chambres créées');

  // Créer les témoignages
  const testimonials = [
    {
      name: 'Marie Dubois',
      location: 'Paris, France',
      rating: 5,
      text: "Un séjour exceptionnel ! L'attention aux détails et le service personnalisé ont dépassé toutes nos attentes. Nous reviendrons certainement.",
      avatarUrl:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      order: 1,
    },
    {
      name: 'Thomas Müller',
      location: 'Berlin, Allemagne',
      rating: 5,
      text: 'La suite présidentielle est tout simplement magnifique. Vue imprenable sur Silly et service impeccable. Un hôtel de luxe authentique.',
      avatarUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      order: 2,
    },
    {
      name: 'Sarah Johnson',
      location: 'Londres, Royaume-Uni',
      rating: 5,
      text: "Parfait pour notre voyage de noces. L'équipe a tout fait pour rendre notre séjour inoubliable. Les chambres sont sublimes.",
      avatarUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      order: 3,
    },
    {
      name: 'Luca Rossi',
      location: 'Milan, Italie',
      rating: 5,
      text: "Un hôtel qui mérite ses 5 étoiles. Le restaurant gastronomique est exceptionnel et l'emplacement est idéal pour découvrir la Belgique.",
      avatarUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      order: 4,
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({ data: testimonial });
  }
  console.log('✅ Témoignages créés');

  // Créer les images de la galerie
  const galleryImages = [
    {
      url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'Chambres',
      title: 'Suite Présidentielle',
      order: 1,
    },
    {
      url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'Chambres',
      title: 'Chambre Deluxe',
      order: 2,
    },
    {
      url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'Chambres',
      title: 'Suite Familiale',
      order: 3,
    },
    {
      url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'Extérieur',
      title: 'Vue extérieure',
      order: 4,
    },
    {
      url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'Intérieur',
      title: 'Hall d\'entrée',
      order: 5,
    },
    {
      url: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'Restaurant',
      title: 'Restaurant gastronomique',
      order: 6,
    },
    {
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'Spa',
      title: 'Espace bien-être',
      order: 7,
    },
    {
      url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'Extérieur',
      title: 'Jardin',
      order: 8,
    },
    {
      url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'Restaurant',
      title: 'Salle à manger',
      order: 9,
    },
    {
      url: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'Chambres',
      title: 'Salle de bain de luxe',
      order: 10,
    },
    {
      url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'Spa',
      title: 'Piscine intérieure',
      order: 11,
    },
    {
      url: 'https://images.unsplash.com/photo-1483721310020-33cc3974373b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'Intérieur',
      title: 'Bar lounge',
      order: 12,
    },
  ];

  for (const image of galleryImages) {
    await prisma.galleryImage.create({ data: image });
  }
  console.log('✅ Images de la galerie créées');

  // Créer les événements
  const events = [
    {
      title: 'Mariages',
      description: 'Organisez votre jour le plus spécial dans notre cadre d\'exception. Nos salles élégantes peuvent accueillir jusqu\'à 200 invités.',
      icon: 'Heart',
      imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f29da9b56c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      capacity: 'Jusqu\'à 200 personnes',
      duration: 'Journée complète',
      order: 1,
    },
    {
      title: 'Séminaires & Conférences',
      description: 'Espaces modernes et équipés pour vos réunions d\'affaires et événements professionnels avec tous les équipements nécessaires.',
      icon: 'Microphone',
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      capacity: '10 à 150 personnes',
      duration: 'À la journée ou demi-journée',
      order: 2,
    },
    {
      title: 'Dîners d\'Affaires',
      description: 'Restaurant gastronomique pouvant accueillir vos événements professionnels avec un menu sur mesure.',
      icon: 'Utensils',
      imageUrl: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      capacity: '20 à 100 personnes',
      duration: 'Soirée',
      order: 3,
    },
    {
      title: 'Anniversaires',
      description: 'Célébrez vos anniversaires et occasions spéciales dans une ambiance chaleureuse et raffinée.',
      icon: 'Calendar',
      imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      capacity: '10 à 80 personnes',
      duration: 'Soirée',
      order: 4,
    },
  ];

  for (const event of events) {
    await prisma.event.create({ data: event });
  }
  console.log('✅ Événements créés');

  // Créer les page heroes - UNIQUEMENT LA GALERIE EST TRADUITE
  const pageHeros = [
    {
      page: 'carte-cadeau',
      title: 'Carte-Cadeau Villa Dolce',
      subtitle: 'Offrez une expérience inoubliable',
      imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      page: 'seminaires',
      title: 'Réunions & Séminaires',
      subtitle: 'Un espace professionnel et élégant',
      imageUrl: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      page: 'galerie',
      title: 'Galerie Photo',
      titleEn: 'Photo Gallery',
      titleNl: 'Fotogalerij',
      subtitle: 'Découvrez les espaces et l\'ambiance unique de notre hôtel',
      subtitleEn: 'Discover the unique spaces and atmosphere of our hotel',
      subtitleNl: 'Ontdek de unieke ruimtes en sfeer van ons hotel',
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    },
  ];

  for (const pageHero of pageHeros) {
    await prisma.pageHero.create({ data: pageHero });
  }
  console.log('✅ Page heroes créés');

  console.log('🎉 Seeding terminé avec succès !');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


