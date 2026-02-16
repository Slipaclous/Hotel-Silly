'use client';

import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Users, MapPin, Clock, ArrowRight, Utensils, Heart } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { LucideIcon } from 'lucide-react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

interface Event {
    id: number;
    title: string;
    titleEn?: string | null;
    titleNl?: string | null;
    description: string;
    descriptionEn?: string | null;
    descriptionNl?: string | null;
    icon: string;
    imageUrl: string;
    capacity: string;
    duration: string;
    date?: string | Date | null;
    order: number;
}

interface PageHero {
    page: string;
    title: string;
    titleEn?: string | null;
    titleNl?: string | null;
    subtitle: string;
    subtitleEn?: string | null;
    subtitleNl?: string | null;
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

export default function EvenementsContent({ events, pageHero }: { events: Event[], pageHero: PageHero | null }) {
    const locale = useLocale();
    const t = useTranslations('eventsPage');

    const getLocalized = (fr: string, en?: string | null, nl?: string | null) => {
        if (locale === 'nl') return nl || fr;
        if (locale === 'en') return en || fr;
        return fr;
    };

    const services = [
        {
            icon: Utensils,
            title: t('curiosities.market.title'),
            description: t('curiosities.market.desc')
        },
        {
            icon: Heart,
            title: t('curiosities.heritage.title'),
            description: t('curiosities.heritage.desc')
        },
        {
            icon: MapPin,
            title: t('curiosities.trails.title'),
            description: t('curiosities.trails.desc')
        },
        {
            icon: CalendarIcon,
            title: t('curiosities.agenda.title'),
            description: t('curiosities.agenda.desc')
        }
    ];

    return (
        <>
            {/* Hero Section */}
            <section id="hero" data-nav-section={pageHero ? (locale === 'en' ? (pageHero.titleEn || pageHero.title) : locale === 'nl' ? (pageHero.titleNl || pageHero.title) : pageHero.title) : t('heroTitle')} data-nav-is-dark="true" className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-[#2c3840]">
                <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <div className="w-12 h-px bg-[#C6ad7a] mx-auto mb-6"></div>
                        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium mb-6 text-[#C6ad7a]">
                            {pageHero ? (locale === 'en' ? (pageHero.titleEn || pageHero.title) : locale === 'nl' ? (pageHero.titleNl || pageHero.title) : pageHero.title) : t('heroTitle')}
                        </h1>
                        <p className="font-body text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                            {pageHero ? (locale === 'en' ? (pageHero.subtitleEn || pageHero.subtitle) : locale === 'nl' ? (pageHero.subtitleNl || pageHero.subtitle) : pageHero.subtitle) : t('heroSubtitle')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Introduction */}
            <section id="agenda" data-nav-section={t('upcomingTitle')} className="py-24 bg-blanc">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="w-12 h-px bg-or mx-auto mb-6"></div>
                        <h2 className="font-display text-4xl sm:text-5xl font-medium text-noir mb-6">
                            {t('introTitle')}
                        </h2>
                        <p className="font-body text-lg text-noir/70 leading-relaxed">
                            {t('introDesc')}
                        </p>
                    </div>

                    {/* Grille Événements À Venir */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
                        {events.filter(e => !e.date || new Date(e.date) >= new Date()).map((event, index) => {
                            const IconComponent = iconMap[event.icon] || CalendarIcon;
                            return (
                                <EventCard key={event.id} event={event} IconComponent={IconComponent} index={index} getLocalized={getLocalized} />
                            );
                        })}
                    </div>

                    {/* Section Événements Passés (si existants) */}
                    {events.some(e => e.date && new Date(e.date) < new Date()) && (
                        <div className="mt-24 pt-24 border-t border-noir/10">
                            <div className="text-center mb-16">
                                <h3 className="font-display text-3xl font-medium text-noir/60 mb-4">
                                    {t('pastTitle')}
                                </h3>
                                <p className="font-body text-noir/50">
                                    {t('pastSubtitle')}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 opacity-75 grayscale hover:grayscale-0 transition-all duration-500">
                                {events.filter(e => e.date && new Date(e.date) < new Date()).map((event, index) => {
                                    const IconComponent = iconMap[event.icon] || CalendarIcon;
                                    return (
                                        <EventCard key={event.id} event={event} IconComponent={IconComponent} index={index} compact getLocalized={getLocalized} />
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Section Services */}
            <section id="curiosities" data-nav-section={t('curiositiesTitle')} className="py-24 bg-blanc-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="w-12 h-px bg-or mx-auto mb-6"></div>
                        <h2 className="font-display text-4xl sm:text-5xl font-medium text-noir mb-6">
                            {t('curiositiesTitle')}
                        </h2>
                        <p className="font-body text-lg text-noir/70 max-w-3xl mx-auto leading-relaxed">
                            {t('curiositiesSubtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {services.map((service, index) => (
                            <div
                                key={service.title}
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
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Contact */}
            <section className="py-24 bg-noir text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div>
                        <div className="w-12 h-px bg-or mx-auto mb-6"></div>
                        <h2 className="font-display text-4xl sm:text-5xl font-medium mb-6">
                            {t('ctaTitle')}
                        </h2>
                        <p className="font-body text-lg text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
                            {t('ctaDesc')}
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center space-x-2 bg-white text-noir px-8 py-3 font-body text-sm hover:bg-or hover:text-white transition-all duration-300"
                        >
                            <span>{t('ctaButton')}</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

function EventCard({
    event,
    IconComponent,
    index,
    compact = false,
    getLocalized
}: {
    event: Event,
    IconComponent: LucideIcon,
    index: number,
    compact?: boolean,
    getLocalized: (fr: string, en?: string | null, nl?: string | null) => string
}) {
    const t = useTranslations('eventsPage');
    const locale = useLocale();

    return (
        <div className={`bg-white border border-noir/10 overflow-hidden card-hover group ${compact ? 'text-sm' : ''}`}>
            {/* Image */}
            <div className={`relative ${compact ? 'h-48' : 'h-64'} overflow-hidden`}>
                <Image
                    src={event.imageUrl}
                    alt={getLocalized(event.title, event.titleEn, event.titleNl)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Icône */}
                <div className={`absolute top-6 left-6 bg-white ${compact ? 'p-2' : 'p-3'} shadow-elegant`}>
                    <IconComponent className={`${compact ? 'w-4 h-4' : 'w-6 h-6'} text-or`} />
                </div>
            </div>

            {/* Contenu */}
            <div className={`${compact ? 'p-6' : 'p-8'}`}>
                <h3 className={`font-display ${compact ? 'text-lg' : 'text-2xl'} font-medium text-noir mb-3`}>
                    {getLocalized(event.title, event.titleEn, event.titleNl)}
                </h3>
                <p className={`font-body ${compact ? 'text-xs' : 'text-sm'} text-noir/70 mb-6 leading-relaxed whitespace-pre-wrap`}>
                    {getLocalized(event.description, event.descriptionEn, event.descriptionNl)}
                </p>

                {/* Infos */}
                <div className={`space-y-3 mb-8 pb-6 border-b border-noir/10`}>
                    <div className="flex items-center space-x-3 text-noir/60">
                        <MapPin className="w-4 h-4" />
                        <span className="font-body text-sm">{event.capacity}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-noir/60">
                        <CalendarIcon className="w-4 h-4" />
                        <span className="font-body text-sm">{event.duration}</span>
                    </div>
                    {event.date && (
                        <div className="flex items-center space-x-3 text-noir/40 italic">
                            <Clock className="w-3 h-3" />
                            <span className="font-body text-xs">
                                {new Date(event.date).toLocaleDateString(locale === 'fr' ? 'fr-FR' : (locale === 'nl' ? 'nl-BE' : 'en-GB'), {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </span>
                        </div>
                    )}
                </div>

                {/* Bouton CTA */}
                {!compact && (
                    <Link
                        href="/contact"
                        className="group/btn w-full border border-noir text-noir hover:bg-noir hover:text-white py-3 font-body text-sm transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                        <span>{t('learnMore')}</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Link>
                )}
            </div>
        </div>
    );
}
