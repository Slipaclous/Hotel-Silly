"use client";
import { Star, Wifi, Coffee, Car, Calendar as CalendarIcon, Images, Maximize2 } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';

const RoomDetailsModal = dynamic(() => import('./RoomDetailsModal'));

interface GalleryImage {
    id: number;
    url: string;
}

interface Room {
    id: number;
    name: string;
    nameEn?: string | null;
    nameNl?: string | null;
    description: string;
    descriptionEn?: string | null;
    descriptionNl?: string | null;
    price: string;
    capacity: string;
    capacityEn?: string | null;
    capacityNl?: string | null;
    rating: number;
    imageUrl: string;
    images?: GalleryImage[];
    features: string[];

    // Nouveaux champs
    surface?: string | null;
    bedding?: string | null;
    beddingEn?: string | null;
    beddingNl?: string | null;
    bathroom?: string | null;
    price1Person?: string | null;
    price2Persons?: string | null;
    price3Persons?: string | null;
    petsAllowed?: boolean | null;
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

export default function ChambresContent({ rooms, pageHero }: { rooms: Room[], pageHero: PageHero | null }) {
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const locale = useLocale();
    const t = useTranslations('rooms');
    const c = useTranslations('common');
    const n = useTranslations('nav');

    const getLocalized = (fr: string, en?: string | null, nl?: string | null) => {
        if (locale === 'nl') return nl || fr;
        if (locale === 'en') return en || fr;
        return fr;
    };

    return (
        <>
            <RoomDetailsModal
                room={selectedRoom}
                isOpen={!!selectedRoom}
                onClose={() => setSelectedRoom(null)}
            />

            {/* Hero Section - Full Height & Immersive */}
            <section id="hero" data-nav-section={pageHero ? (locale === 'en' ? (pageHero.titleEn || pageHero.title) : locale === 'nl' ? (pageHero.titleNl || pageHero.title) : pageHero.title) : t('welcome')} data-nav-is-dark="true" className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-[#2c3840]">
                {/* Image de fond */}
                {pageHero?.imageUrl && (
                    <>
                        <Image
                            src={pageHero.imageUrl}
                            alt={`${pageHero?.title || t('welcome')} - Hôtel de Luxe Silly`}
                            fill
                            className="object-cover"
                            priority
                            sizes="100vw"
                        />
                        {/* Overlay noir plus prononcé */}
                        <div className="absolute inset-0 bg-black/35"></div>
                    </>
                )}

                {/* Decorative Pattern - Optional/Subtle */}
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #C6ad7a 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

                <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <div className="w-12 h-px bg-[#C6ad7a] mx-auto mb-6"></div>
                        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium mb-6 text-[#C6ad7a]">
                            {pageHero ? (locale === 'en' ? (pageHero.titleEn || pageHero.title) : locale === 'nl' ? (pageHero.titleNl || pageHero.title) : pageHero.title) : t('title')}
                        </h1>
                        <p className="font-body text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                            {pageHero ? (locale === 'en' ? (pageHero.subtitleEn || pageHero.subtitle) : locale === 'nl' ? (pageHero.subtitleNl || pageHero.subtitle) : pageHero.subtitle) : t('subtitle')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Rooms Section - Alternating Layout */}
            <section className="py-24 lg:py-32 bg-blanc overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
                    {rooms.map((room, index) => {
                        const roomName = getLocalized(room.name, room.nameEn, room.nameNl);
                        return (
                            <div
                                key={room.id}
                                className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-start ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                                id={`room-${room.id}`}
                            >
                                {/* Image Side */}
                                <div className="w-full lg:w-1/2 relative group sticky top-32">
                                    <div
                                        className="relative h-[400px] lg:h-[600px] overflow-hidden shadow-elegant-lg cursor-pointer group"
                                        onClick={() => setSelectedRoom(room)}
                                    >
                                        <Image
                                            src={room.imageUrl}
                                            alt={`${roomName} - Villa Dolce Silly`}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                        />

                                        {/* View Details overlay button */}
                                        <div className="absolute inset-0 bg-noir/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                            <div className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-body text-xs font-bold uppercase tracking-widest flex items-center space-x-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                <Maximize2 className="w-4 h-4" />
                                                <span>{t('viewDetails')}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Decorative elements */}
                                    <div className={`absolute -bottom-6 -z-10 w-2/3 h-2/3 border border-or/30 ${index % 2 === 0 ? '-left-6' : '-right-6'}`}></div>
                                </div>

                                {/* Content Side */}
                                <div className="w-full lg:w-1/2">
                                    <div className="mb-4 flex items-center space-x-2">
                                        <div className="flex text-or">
                                            {[...Array(room.rating)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-current" />
                                            ))}
                                        </div>
                                        <span className="text-noir/40 font-body text-sm">|</span>
                                        <span className="text-noir/60 font-body text-sm">{getLocalized(room.capacity, room.capacityEn, room.capacityNl)}</span>
                                        {room.petsAllowed && (
                                            <>
                                                <span className="text-noir/40 font-body text-sm">|</span>
                                                <span className="text-noir/60 font-body text-sm">{t('pets')}</span>
                                            </>
                                        )}
                                    </div>

                                    <h2 className="font-display text-4xl lg:text-5xl font-medium text-noir mb-4">
                                        {roomName}
                                    </h2>

                                    <div className="flex items-baseline space-x-2 mb-6">
                                        <span className="font-display text-3xl text-or uppercase">{room.price}</span>
                                        <span className="font-body text-sm text-noir/40">/ {c('perNight')}</span>
                                    </div>

                                    <p className="font-body text-lg text-noir/70 mb-10 leading-relaxed font-light line-clamp-3">
                                        {getLocalized(room.description, room.descriptionEn, room.descriptionNl)}
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-6 mt-8">
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="flex-1"
                                        >
                                            {getLocalized(room.bookingUrl || '', room.bookingUrlEn, room.bookingUrlNl) ? (
                                                <a
                                                    href={getLocalized(room.bookingUrl || '', room.bookingUrlEn, room.bookingUrlNl) || '#'}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block w-full bg-[#2c3840] text-white px-8 py-5 font-body text-xs font-bold uppercase tracking-widest hover:bg-[#C6ad7a] transition-all duration-500 text-center shadow-lg hover:shadow-xl border border-[#2c3840] hover:border-[#C6ad7a]"
                                                >
                                                    {c('bookStay')}
                                                </a>
                                            ) : (
                                                <Link
                                                    href={`/contact?room=${room.id}&subject=reservation`}
                                                    className="block w-full bg-[#2c3840] text-white px-8 py-5 font-body text-xs font-bold uppercase tracking-widest hover:bg-[#C6ad7a] transition-all duration-500 text-center shadow-lg hover:shadow-xl border border-[#2c3840] hover:border-[#C6ad7a]"
                                                >
                                                    {c('bookStay')}
                                                </Link>
                                            )}
                                        </motion.div>

                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="flex-1"
                                        >
                                            <button
                                                onClick={() => setSelectedRoom(room)}
                                                className="w-full border border-[#2c3840] text-[#2c3840] px-8 py-5 font-body text-xs font-bold uppercase tracking-widest hover:bg-[#2c3840] hover:text-white transition-all duration-500 flex items-center justify-center space-x-3 shadow-md hover:shadow-lg"
                                            >
                                                <Maximize2 className="w-4 h-4" />
                                                <span>{t('viewDetails')}</span>
                                            </button>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Services Highlight */}
            <section id="services" data-nav-section={n('services')} className="py-24 bg-neutre-clair">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="font-body text-xs text-or tracking-[0.2em] uppercase block mb-4">{c('comfort')}</span>
                        <h3 className="font-display text-4xl text-noir">{c('includedServices')}</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { icon: Wifi, title: t('wifi'), desc: t('wifiDesc') },
                            { icon: Coffee, title: t('breakfast'), desc: t('breakfastDesc') },
                            { icon: Car, title: t('parking'), desc: t('parkingDesc') },
                            { icon: CalendarIcon, title: t('concierge'), desc: t('conciergeDesc') },
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-8 border border-noir/5 text-center group hover:border-or/30 transition-colors duration-300">
                                <item.icon className="w-8 h-8 text-noir mx-auto mb-6 group-hover:text-or transition-colors duration-300" />
                                <h4 className="font-display text-xl mb-2">{item.title}</h4>
                                <p className="font-body text-sm text-noir/60">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div id="footer" data-nav-section="Infos" data-nav-is-dark="true"></div>
            </section>
        </>
    );
}
