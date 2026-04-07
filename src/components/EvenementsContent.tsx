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
    bookingUrl?: string | null;
    bookingUrlEn?: string | null;
    bookingUrlNl?: string | null;
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
            <section id="hero" data-nav-section={pageHero ? (locale === 'en' ? (pageHero.titleEn || pageHero.title) : locale === 'nl' ? (pageHero.titleNl || pageHero.title) : pageHero.title) : t('heroTitle')} data-nav-is-dark="true" className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-[#2c3840] pt-20 lg:pt-32">
                {/* Image de fond */}
                {pageHero?.imageUrl && (
                    <>
                        <Image
                            src={pageHero.imageUrl}
                            alt={pageHero ? (locale === 'en' ? (pageHero.titleEn || pageHero.title) : locale === 'nl' ? (pageHero.titleNl || pageHero.title) : pageHero.title) : t('heroTitle')}
                            fill
                            className="object-cover"
                            priority
                            sizes="100vw"
                        />
                        {/* Overlay noir léger pour la lisibilité */}
                        <div className="absolute inset-0 bg-black/35"></div>
                    </>
                )}

                {/* Decorative Pattern */}
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #C6ad7a 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

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

            {/* Introduction avec Grille Staggered */}
            <section id="agenda" data-nav-section={t('upcomingTitle')} className="py-24 md:py-32 bg-blanc">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Grille Formules Staggered */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 lg:gap-y-32">
                        {events.filter(e => !e.date || new Date(e.date) >= new Date()).map((event, index) => {
                            const IconComponent = iconMap[event.icon] || CalendarIcon;
                            const isEven = index % 2 !== 0;
                            return (
                                <div key={event.id} className={`${isEven ? 'md:mt-32' : ''}`}>
                                    <EventCard event={event} IconComponent={IconComponent} index={index} getLocalized={getLocalized} />
                                </div>
                            );
                        })}
                    </div>

                    {/* Section Formules Passées */}
                    {events.some(e => e.date && new Date(e.date) < new Date()) && (
                        <div className="mt-48 pt-32 border-t border-noir/10">
                            <div className="text-center mb-16">
                                <span className="text-[10px] uppercase tracking-[0.3em] text-or font-bold mb-4 block">Archives</span>
                                <h3 className="font-display text-4xl font-medium text-noir mb-4 uppercase">
                                    {t('pastTitle')}
                                </h3>
                                <p className="font-body text-noir/50">
                                    {t('pastSubtitle')}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 opacity-80 grayscale hover:grayscale-0 transition-all duration-700">
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

            {/* Section Services / Curiosités */}
            <section id="curiosities" data-nav-section={t('curiositiesTitle')} className="py-24 md:py-32 bg-blanc-200">
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
                        {services.map((service) => (
                            <div key={service.title} className="text-center">
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

            {/* CTA Contact Final */}
            <section className="py-24 md:py-32 bg-[#f7f5ef] text-[#2c3840]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div>
                        <div className="w-12 h-px bg-[#C6ad7a] mx-auto mb-6"></div>
                        <h2 className="font-display text-4xl sm:text-5xl font-medium mb-6">
                            {t('ctaTitle')}
                        </h2>
                        <p className="font-body text-lg text-[#2c3840]/70 mb-10 max-w-2xl mx-auto leading-relaxed">
                            {t('ctaDesc')}
                        </p>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-block"
                        >
                            <Link
                                href="/contact"
                                className="inline-flex items-center space-x-4 bg-[#2c3840] text-white px-12 py-6 font-body text-sm font-bold tracking-[0.2em] uppercase hover:bg-or transition-all duration-700 shadow-xl hover:shadow-or/30 group"
                            >
                                <span>{t('ctaButton')}</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-700" />
                            </Link>
                        </motion.div>
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
    const tCommon = useTranslations('common');
    const locale = useLocale();

    const title = getLocalized(event.title, event.titleEn, event.titleNl);
    const description = getLocalized(event.description, event.descriptionEn, event.descriptionNl);
    const lines = description.split('\n').filter(l => l.trim() !== '');

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
            className={`group bg-blanc relative w-full ${compact ? '' : 'p-2 md:p-4'}`}
        >
            {/* Double Border Decorative Effect */}
            {!compact && (
                <div className="absolute inset-0 border border-noir/5 -m-1 pointer-events-none transition-transform duration-1000 group-hover:scale-[1.01]"></div>
            )}

            <div className={`relative w-full bg-white border border-noir/10 overflow-hidden flex flex-col h-full ${compact ? 'rounded-none' : 'rounded-none shadow-sm group-hover:shadow-2xl transition-all duration-1000'}`}>
                {/* Image Section */}
                <div className={`relative ${compact ? 'h-56' : 'h-64 lg:h-[380px]'} overflow-hidden`}>
                    {event.imageUrl && (
                        <Image
                            src={event.imageUrl}
                            alt={`${title} - Villa Dolce`}
                            fill
                            className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    )}
                    {/* Badge Durée */}
                    {!compact && (
                        <div className="absolute top-0 right-0 bg-[#2c3840] text-white px-8 py-3 text-[10px] font-bold uppercase tracking-[0.3em] z-10 transition-colors group-hover:bg-or">
                            {event.duration}
                        </div>
                    )}
                </div>

                    {/* Content Section */}
                    <div className={`flex-1 flex flex-col items-center text-center w-full ${compact ? 'p-8' : 'p-6 lg:p-10'}`}>
                        {/* Catégorie / Capacité */}
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-or mb-6">
                            {event.capacity}
                        </span>

                        <h3 className={`font-display font-medium text-noir uppercase tracking-tight mb-8 ${compact ? 'text-xl' : 'text-2xl lg:text-4xl lg:leading-tight'}`}>
                            {title}
                        </h3>

                        {!compact && (
                            <>
                                <div className="w-16 h-px bg-or/30 mb-6" />
                                
                                <div 
                                    className="rich-text-content w-full max-w-full break-words space-y-4 mb-8 text-sm lg:text-base font-body text-noir/70 tracking-wide leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: description }}
                                />
                            </>
                        )}

                        {compact && (
                            <div 
                                className="text-xs text-noir/60 line-clamp-3 mb-8 font-body italic overflow-hidden"
                                dangerouslySetInnerHTML={{ __html: description }}
                            />
                        )}

                    {/* Footer Date (si présent) */}
                    {!compact && event.date && (
                        <div className="mt-auto mb-6 text-[10px] text-noir/30 uppercase tracking-[0.2em] font-bold">
                            {new Date(event.date).toLocaleDateString(locale === 'fr' ? 'fr-FR' : (locale === 'nl' ? 'nl-BE' : 'en-GB'), {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </div>
                    )}

                    {/* CTA Button Rectangular Full-Width */}
                    {!compact && (
                        <div className="w-full mt-auto">
                            {(() => {
                                const bookingUrl = getLocalized(event.bookingUrl || '', event.bookingUrlEn, event.bookingUrlNl);
                                const href = bookingUrl || "/contact";
                                const isExternal = href.startsWith('http');
                                const buttonText = bookingUrl ? tCommon('book') : t('learnMore');
                                const buttonContent = (
                                    <span className="uppercase tracking-[0.3em] text-[11px] font-bold">{buttonText}</span>
                                );
                                const className = "block w-full py-4 bg-[#2c3840] text-white hover:bg-or transition-all duration-700 shadow-lg hover:shadow-or/20 active:scale-[0.99] transform-gpu";

                                if (isExternal) {
                                    return (
                                        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
                                            {buttonContent}
                                        </a>
                                    );
                                }

                                return (
                                    <Link href={href as any} className={className}>
                                        {buttonContent}
                                    </Link>
                                );
                            })()}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
