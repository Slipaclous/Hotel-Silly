'use client';

import { motion } from 'framer-motion';
import { Award, Heart, Shield, Star, MapPin, Clock, Users } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface AboutData {
    title: string;
    description: string;
    keyPoint1Title: string;
    keyPoint1Text: string;
    keyPoint2Title: string;
    keyPoint2Text: string;
    keyPoint3Title: string;
    keyPoint3Text: string;
    openingYear: string;
    imageUrl: string;
}

interface Feature {
    icon: string;
    title: string;
    description: string;
}

interface PageHero {
    page: string;
    title: string;
    subtitle: string;
    imageUrl: string;
}

const iconMap: Record<string, LucideIcon> = {
    'Award': Award,
    'Heart': Heart,
    'Shield': Shield,
    'Star': Star,
};

interface AboutContentProps {
    aboutData: AboutData | null;
    features: Feature[];
    pageHero: PageHero | null;
}

export default function AboutContent({ aboutData, features, pageHero }: AboutContentProps) {
    const data = aboutData || {
        title: 'Une Expérience Unique',
        description: "Notre hôtel de luxe va ouvrir ses portes au printemps 2025 dans le charmant village de Silly, au cœur de la Belgique. Chaque détail a été pensé pour offrir une expérience inoubliable dans un cadre d'exception.",
        keyPoint1Title: 'Emplacement idéal',
        keyPoint1Text: 'Au cœur de Silly, village pittoresque de la Région Wallonne, à proximité de Bruxelles et des principales attractions belges.',
        keyPoint2Title: 'Service personnalisé',
        keyPoint2Text: "Notre équipe dédiée s'engage à anticiper vos besoins et à rendre votre séjour exceptionnel.",
        keyPoint3Title: 'Équipements de luxe',
        keyPoint3Text: 'Chambres et suites équipées des dernières technologies et du confort le plus raffiné.',
        openingYear: '2025',
        imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    };

    return (
        <>
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-[#2c3840]">
                <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <div className="w-12 h-px bg-[#C6ad7a] mx-auto mb-6"></div>
                        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium mb-6 text-[#C6ad7a]">
                            {pageHero?.title || "À Propos de l'Hôtel"}
                        </h1>
                        <p className="font-body text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                            {pageHero?.subtitle || "Découvrez l'histoire et l'identité de notre hôtel de luxe"}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contenu Principal */}
            <section className="py-24 bg-blanc">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                        {/* Contenu */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            viewport={{ once: true }}
                        >
                            <div className="w-12 h-px bg-or mb-6"></div>

                            <h2 className="font-display text-4xl sm:text-5xl font-medium text-noir mb-6">
                                {data.title}
                            </h2>

                            <p className="font-body text-lg text-noir/70 mb-10 leading-relaxed">
                                {data.description}
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="w-1 h-1 bg-or rounded-full mt-3 flex-shrink-0"></div>
                                    <p className="font-body text-base text-noir/80">
                                        <strong className="font-medium text-noir">{data.keyPoint1Title}</strong> — {data.keyPoint1Text}
                                    </p>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="w-1 h-1 bg-or rounded-full mt-3 flex-shrink-0"></div>
                                    <p className="font-body text-base text-noir/80">
                                        <strong className="font-medium text-noir">{data.keyPoint2Title}</strong> — {data.keyPoint2Text}
                                    </p>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="w-1 h-1 bg-or rounded-full mt-3 flex-shrink-0"></div>
                                    <p className="font-body text-base text-noir/80">
                                        <strong className="font-medium text-noir">{data.keyPoint3Title}</strong> — {data.keyPoint3Text}
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="relative h-[500px] overflow-hidden">
                                <div
                                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                    style={{
                                        backgroundImage: `url('${data.imageUrl}')`
                                    }}
                                />

                                {/* Badge année */}
                                <div className="absolute bottom-8 left-8 bg-blanc shadow-elegant p-6 border border-noir/10">
                                    <div className="font-display text-4xl font-medium text-noir mb-1">{data.openingYear}</div>
                                    <div className="font-body text-xs uppercase tracking-widest text-noir/60">Année d&apos;Ouverture</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Grille de caractéristiques */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24"
                    >
                        {features.map((feature) => {
                            const IconComponent = iconMap[feature.icon] || Award;
                            return (
                                <div key={feature.title} className="text-center">
                                    <div className="w-16 h-16 border border-noir/20 flex items-center justify-center mx-auto mb-6 hover:border-or transition-colors duration-300">
                                        <IconComponent className="w-7 h-7 text-or" />
                                    </div>
                                    <h3 className="font-display text-xl font-medium text-noir mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="font-body text-sm text-noir/70 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </motion.div>

                    {/* Section Accès & Activités */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="mb-24"
                    >
                        <div className="text-center mb-16">
                            <div className="w-12 h-px bg-or mx-auto mb-6"></div>
                            <h2 className="font-display text-4xl sm:text-5xl font-medium text-noir mb-6">
                                Accès & Activités
                            </h2>
                            <p className="font-body text-lg text-noir/70 max-w-2xl mx-auto leading-relaxed">
                                Découvrez comment nous rejoindre et les nombreuses activités à proximité
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                            {/* Accès à l'hôtel */}
                            <div className="bg-blanc border border-noir/10 p-8">
                                <h3 className="font-display text-2xl font-medium text-noir mb-6 flex items-center">
                                    <MapPin className="w-6 h-6 text-[var(--color-or)] mr-3" />
                                    Comment nous rejoindre
                                </h3>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-body text-base font-medium text-noir mb-3 flex items-center">
                                            <div className="w-2 h-2 bg-[var(--color-or)] rounded-full mr-3"></div>
                                            En train
                                        </h4>
                                        <p className="font-body text-sm text-noir/70 ml-5 leading-relaxed">
                                            <strong>Gare SNCB Silly</strong> - À 2 km de l&apos;hôtel<br />
                                            • À pied : 20-30 minutes<br />
                                            • À vélo : 10 minutes
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-body text-base font-medium text-noir mb-3 flex items-center">
                                            <div className="w-2 h-2 bg-[var(--color-or)] rounded-full mr-3"></div>
                                            En voiture
                                        </h4>
                                        <p className="font-body text-sm text-noir/70 ml-5 leading-relaxed">
                                            Accès facile par autoroute<br />
                                            Parking privé disponible
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-body text-base font-medium text-noir mb-3 flex items-center">
                                            <div className="w-2 h-2 bg-[var(--color-or)] rounded-full mr-3"></div>
                                            En bus
                                        </h4>
                                        <p className="font-body text-sm text-noir/70 ml-5 leading-relaxed">
                                            Arrêt de bus <strong>&quot;Silly centre&quot;</strong> à proximité
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Activités à proximité */}
                            <div className="bg-[var(--color-blanc-200)] p-8">
                                <h3 className="font-display text-2xl font-medium text-noir mb-6 flex items-center">
                                    <Star className="w-6 h-6 text-[var(--color-or)] mr-3" />
                                    À proximité
                                </h3>

                                <div className="grid grid-cols-1 gap-3">
                                    {[
                                        'Bois de Silly (promenades)',
                                        'Circuit des fées de Silly',
                                        'Parc d\'Enghien',
                                        'Pairi Daiza',
                                        'Visite de la brasserie de Silly',
                                        'Airport de Charleroi/BXL',
                                        'SHAPE',
                                        'Golf d\'Enghien',
                                        'Shopping Bastion et Grand Prez'
                                    ].map((activity, index) => (
                                        <div key={index} className="flex items-start space-x-3">
                                            <div className="w-1.5 h-1.5 bg-[var(--color-or)] rounded-full mt-2 flex-shrink-0"></div>
                                            <span className="font-body text-sm text-noir/80">{activity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Section Valeurs */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="bg-blanc-200 p-8"
                        >
                            <div className="w-12 h-12 bg-noir flex items-center justify-center mb-6">
                                <MapPin className="w-6 h-6 text-blanc" />
                            </div>
                            <h3 className="font-display text-2xl font-medium text-noir mb-4">
                                Notre Emplacement
                            </h3>
                            <p className="font-body text-sm text-noir/70 leading-relaxed">
                                Situé au cœur de Silly, village pittoresque de la Région Wallonne,
                                notre hôtel vous offre un accès privilégié aux principales attractions belges
                                tout en préservant le calme et la sérénité d&apos;un cadre exceptionnel.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                            viewport={{ once: true }}
                            className="bg-blanc-200 p-8"
                        >
                            <div className="w-12 h-12 bg-noir flex items-center justify-center mb-6">
                                <Clock className="w-6 h-6 text-blanc" />
                            </div>
                            <h3 className="font-display text-2xl font-medium text-noir mb-4">
                                Notre Histoire
                            </h3>
                            <p className="font-body text-sm text-noir/70 leading-relaxed">
                                Fondé en {data.openingYear}, notre hôtel allie tradition et modernité
                                pour offrir une expérience unique où chaque détail a été pensé
                                pour votre confort et votre bien-être.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                            viewport={{ once: true }}
                            className="bg-blanc-200 p-8"
                        >
                            <div className="w-12 h-12 bg-noir flex items-center justify-center mb-6">
                                <Users className="w-6 h-6 text-blanc" />
                            </div>
                            <h3 className="font-display text-2xl font-medium text-noir mb-4">
                                Notre Engagement
                            </h3>
                            <p className="font-body text-sm text-noir/70 leading-relaxed">
                                Notre équipe dédiée s&apos;engage à anticiper vos besoins et à rendre
                                votre séjour exceptionnel. Nous mettons un point d&apos;honneur à offrir
                                un service personnalisé de qualité supérieure.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}
