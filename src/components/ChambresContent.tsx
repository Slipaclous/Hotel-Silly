"use client";
import { Star, Users, ArrowRight, Wifi, Coffee, Car, Calendar as CalendarIcon, Images, Maximize2 } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';

const GalleryLightbox = dynamic(() => import('./GalleryLightbox'));

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
    const [selectedRoomGallery, setSelectedRoomGallery] = useState<{ images: string[], name: string } | null>(null);
    const locale = useLocale();
    const t = useTranslations('rooms');
    const c = useTranslations('common');

    const getLocalized = (fr: string, en?: string | null, nl?: string | null) => {
        if (locale === 'nl') return nl || fr;
        if (locale === 'en') return en || fr;
        return fr;
    };

    return (
        <>
            <GalleryLightbox
                images={selectedRoomGallery?.images || []}
                isOpen={!!selectedRoomGallery}
                onClose={() => setSelectedRoomGallery(null)}
                roomName={selectedRoomGallery?.name || ''}
            />

            {/* Hero Section - Full Height & Immersive */}
            <section id="hero" data-nav-section={pageHero ? (locale === 'en' ? (pageHero.titleEn || pageHero.title) : locale === 'nl' ? (pageHero.titleNl || pageHero.title) : pageHero.title) : t('welcome')} data-nav-is-dark="true" className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-[#2c3840]">
                {/* Image de fond */}
                {pageHero?.imageUrl && (
                    <>
                        <Image
                            src={pageHero.imageUrl}
                            alt={pageHero ? (locale === 'en' ? (pageHero.titleEn || pageHero.title) : locale === 'nl' ? (pageHero.titleNl || pageHero.title) : pageHero.title) : t('welcome')}
                            fill
                            className="object-cover"
                            priority
                            sizes="100vw"
                        />
                        {/* Overlay sombre pour la lisibilité */}
                        <div className="absolute inset-0 bg-noir/40"></div>
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
                                    <div className="relative h-[400px] lg:h-[600px] overflow-hidden shadow-elegant-lg">
                                        <Image
                                            src={room.imageUrl}
                                            alt={roomName}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                        />

                                        {/* Gallery overlay button */}
                                        {room.images && room.images.length > 0 && (
                                            <div className="absolute bottom-8 right-8 z-10">
                                                <button
                                                    onClick={() => setSelectedRoomGallery({
                                                        images: [room.imageUrl, ...(room.images?.map(img => img.url) || [])],
                                                        name: roomName
                                                    })}
                                                    className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-6 py-3 rounded-full font-body text-xs font-bold uppercase tracking-widest flex items-center space-x-3 hover:bg-white hover:text-noir transition-all duration-300 transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0"
                                                >
                                                    <Images className="w-4 h-4" />
                                                    <span>{t('gallery')} ({room.images.length + 1})</span>
                                                </button>
                                            </div>
                                        )}
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

                                    <h2 className="font-display text-4xl lg:text-5xl font-medium text-noir mb-6">
                                        {roomName}
                                    </h2>

                                    {/* Technical Specs Grid */}
                                    <div className="grid grid-cols-3 gap-4 mb-8 border-b border-noir/10 pb-6">
                                        {room.surface && (
                                            <div>
                                                <span className="block text-xs font-body text-noir/40 uppercase tracking-widest mb-1">{t('surface')}</span>
                                                <span className="block font-display text-lg text-noir">{room.surface}</span>
                                            </div>
                                        )}
                                        {room.bedding && (
                                            <div className="col-span-2">
                                                <span className="block text-xs font-body text-noir/40 uppercase tracking-widest mb-1">{t('bedding')}</span>
                                                <span className="block font-display text-lg text-noir">{getLocalized(room.bedding, room.beddingEn, room.beddingNl)}</span>
                                            </div>
                                        )}
                                    </div>

                                    <p className="font-body text-lg text-noir/70 mb-8 leading-relaxed font-light">
                                        {getLocalized(room.description, room.descriptionEn, room.descriptionNl)}
                                    </p>

                                    {/* Features Grid */}
                                    <div className="grid grid-cols-2 gap-y-3 gap-x-8 mb-8">
                                        {room.features.slice(0, 8).map((feature, idx) => (
                                            <div key={idx} className="flex items-center space-x-3">
                                                <div className="w-1.5 h-1.5 bg-or rounded-full"></div>
                                                <span className="font-body text-sm text-noir/80">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Pricing Breakdown */}
                                    <div className="bg-gray-50 p-6 rounded-lg mb-8">
                                        <h3 className="font-display text-lg text-noir mb-4">{t('pricingTitle')}</h3>
                                        <div className="space-y-2">
                                            {room.price1Person && (
                                                <div className="flex justify-between items-center bg-white p-3 rounded border border-gray-100">
                                                    <span className="font-body text-sm text-noir/70">1 {t('person')}</span>
                                                    <span className="font-display text-lg text-or">{room.price1Person}</span>
                                                </div>
                                            )}
                                            {room.price2Persons && (
                                                <div className="flex justify-between items-center bg-white p-3 rounded border border-gray-100">
                                                    <span className="font-body text-sm text-noir/70">2 {t('persons')}</span>
                                                    <span className="font-display text-lg text-or">{room.price2Persons}</span>
                                                </div>
                                            )}
                                            {room.price3Persons && (
                                                <div className="flex justify-between items-center bg-white p-3 rounded border border-gray-100">
                                                    <span className="font-body text-sm text-noir/70">3+ {t('persons')}</span>
                                                    <span className="font-display text-lg text-or">{room.price3Persons}</span>
                                                </div>
                                            )}
                                            <div className="text-xs text-noir/40 mt-2 font-body italic text-center">
                                                {room.petsAllowed ? t('petSupplement') : ''}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Link
                                            href={`/contact?room=${room.id}&subject=reservation`}
                                            className="bg-noir text-blanc px-8 py-4 font-body text-sm uppercase tracking-widest hover:bg-or transition-colors duration-300 text-center"
                                        >
                                            {c('bookStay')}
                                        </Link>

                                        {room.images && room.images.length > 0 && (
                                            <button
                                                onClick={() => setSelectedRoomGallery({
                                                    images: [room.imageUrl, ...(room.images?.map(img => img.url) || [])],
                                                    name: roomName
                                                })}
                                                className="border border-noir text-noir px-8 py-4 font-body text-sm uppercase tracking-widest hover:bg-noir hover:text-blanc transition-all duration-300 flex items-center justify-center space-x-2"
                                            >
                                                <Maximize2 className="w-4 h-4" />
                                                <span>{c('seePhotos')}</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Services Highlight */}
            <section id="services" data-nav-section={c('nav.services')} className="py-24 bg-neutre-clair">
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
