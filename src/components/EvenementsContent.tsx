'use client';

import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Users, MapPin, Clock, ArrowRight, Utensils, Heart } from 'lucide-react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import Image from 'next/image';

interface Event {
    id: number;
    title: string;
    description: string;
    icon: string;
    imageUrl: string;
    capacity: string;
    duration: string;
    order: number;
}

interface PageHero {
    page: string;
    title: string;
    subtitle: string;
    imageUrl: string;
}

const iconMap: Record<string, LucideIcon> = {
    'Calendar': CalendarIcon,
    'Users': Users,
    'MapPin': MapPin,
    'Clock': Clock,
    'Utensils': Utensils,
    'Heart': Heart,
};

const services = [
    {
        icon: Utensils,
        title: 'Marchés & Saveurs',
        description: 'Produits locaux et artisanat au cœur du village'
    },
    {
        icon: Heart,
        title: 'Patrimoine Vivant',
        description: 'Églises, châteaux et joyaux de l&apos;architecture'
    },
    {
        icon: MapPin,
        title: 'Sentiers de Randonnée',
        description: 'Des kilomètres de nature préservée à explorer'
    },
    {
        icon: CalendarIcon,
        title: 'Agenda Culturel',
        description: 'Festivals et festivités tout au long de l&apos;année'
    }
];

export default function EvenementsContent({ events, pageHero }: { events: Event[], pageHero: PageHero | null }) {
    return (
        <>
            {/* Hero Section */}
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
                            {pageHero?.title || 'Vie Locale & Découvertes'}
                        </h1>
                        <p className="font-body text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                            {pageHero?.subtitle || 'Explorez Silly et ses environs : un patrimoine riche, une nature généreuse et des événements authentiques.'}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Introduction */}
            <section className="py-24 bg-blanc">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <div className="w-12 h-px bg-or mx-auto mb-6"></div>
                        <h2 className="font-display text-4xl sm:text-5xl font-medium text-noir mb-6">
                            Silly, Terre de Partage et de Culture
                        </h2>
                        <p className="font-body text-lg text-noir/70 leading-relaxed">
                            Séjourner à la Villa Dolce, c&apos;est s&apos;offrir une immersion dans une région dynamique.
                            Marchés artisanaux, festivals saisonniers ou balades bucoliques, découvrez notre sélection
                            des moments forts et des lieux incontournables à proximité.
                        </p>
                    </motion.div>

                    {/* Grille Événements */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
                        {events.map((event, index) => {
                            const IconComponent = iconMap[event.icon] || CalendarIcon;
                            return (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="bg-blanc border border-noir/10 overflow-hidden card-hover group"
                                >
                                    {/* Image */}
                                    <div className="relative h-64 overflow-hidden">
                                        <Image
                                            src={event.imageUrl}
                                            alt={event.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />

                                        {/* Icône */}
                                        <div className="absolute top-6 left-6 bg-blanc p-3 shadow-elegant">
                                            <IconComponent className="w-6 h-6 text-or" />
                                        </div>
                                    </div>

                                    {/* Contenu */}
                                    <div className="p-8">
                                        <h3 className="font-display text-2xl font-medium text-noir mb-3">
                                            {event.title}
                                        </h3>
                                        <p className="font-body text-sm text-noir/70 mb-6 leading-relaxed whitespace-pre-wrap">
                                            {event.description}
                                        </p>

                                        {/* Infos */}
                                        <div className="space-y-3 mb-8 pb-6 border-b border-noir/10">
                                            <div className="flex items-center space-x-3 text-noir/60">
                                                <MapPin className="w-4 h-4" />
                                                <span className="font-body text-sm">{event.capacity}</span>
                                            </div>
                                            <div className="flex items-center space-x-3 text-noir/60">
                                                <CalendarIcon className="w-4 h-4" />
                                                <span className="font-body text-sm">{event.duration}</span>
                                            </div>
                                        </div>

                                        {/* Bouton CTA */}
                                        <Link
                                            href="/contact"
                                            className="group/btn w-full border border-noir text-noir hover:bg-noir hover:text-blanc py-3 font-body text-sm transition-all duration-300 flex items-center justify-center space-x-2"
                                        >
                                            <span>En savoir plus</span>
                                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                                        </Link>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Section Services */}
            <section className="py-24 bg-blanc-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="w-12 h-px bg-or mx-auto mb-6"></div>
                        <h2 className="font-display text-4xl sm:text-5xl font-medium text-noir mb-6">
                            Curiosités de Silly
                        </h2>
                        <p className="font-body text-lg text-noir/70 max-w-3xl mx-auto leading-relaxed">
                            Quelques suggestions pour enrichir votre séjour parmi nous
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 border border-noir/20 flex items-center justify-center mx-auto mb-6 hover:border-or transition-colors duration-300">
                                    <service.icon className="w-7 h-7 text-or" />
                                </div>
                                <h3 className="font-display text-xl font-medium text-noir mb-3">
                                    {service.title}
                                </h3>
                                <p className="font-body text-sm text-noir/70 leading-relaxed">
                                    {service.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Contact */}
            <section className="py-24 bg-noir text-blanc">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        <div className="w-12 h-px bg-or mx-auto mb-6"></div>
                        <h2 className="font-display text-4xl sm:text-5xl font-medium mb-6">
                            Besoin de conseils pour votre séjour ?
                        </h2>
                        <p className="font-body text-lg text-blanc/80 mb-8 max-w-2xl mx-auto leading-relaxed">
                            Notre conciergerie est à votre disposition pour vous guider vers les meilleures
                            adresses et activités de la région selon vos envies.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center space-x-2 bg-blanc text-noir px-8 py-3 font-body text-sm hover:bg-or hover:text-blanc transition-all duration-300"
                        >
                            <span>Demander conseil</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
