'use client';

import { Star, Users, ArrowRight, Wifi, Coffee, Car, Calendar as CalendarIcon, Images, Maximize2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const GalleryLightbox = dynamic(() => import('./GalleryLightbox'));

interface GalleryImage {
    id: number;
    url: string;
}

interface Room {
    id: number;
    name: string;
    description: string;
    price: string;
    capacity: string;
    rating: number;
    imageUrl: string;
    images?: GalleryImage[];
    features: string[];
}

interface PageHero {
    page: string;
    title: string;
    subtitle: string;
    imageUrl: string;
}

import { motion } from 'framer-motion';

export default function ChambresContent({ rooms, pageHero }: { rooms: Room[], pageHero: PageHero | null }) {
    const [selectedRoomGallery, setSelectedRoomGallery] = useState<{ images: string[], name: string } | null>(null);

    return (
        <>
            <GalleryLightbox
                images={selectedRoomGallery?.images || []}
                isOpen={!!selectedRoomGallery}
                onClose={() => setSelectedRoomGallery(null)}
                roomName={selectedRoomGallery?.name || ''}
            />

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mt-[120px]">
                <div className="absolute inset-0">
                    {pageHero?.imageUrl && (
                        <Image
                            src={pageHero.imageUrl}
                            alt={pageHero.title}
                            fill
                            priority
                            className="object-cover"
                            sizes="100vw"
                        />
                    )}
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>

                <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <div className="w-12 h-px bg-or mx-auto mb-6"></div>
                        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium mb-6">
                            {pageHero?.title || 'Chambres & Suites'}
                        </h1>
                        <p className="font-body text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                            {pageHero?.subtitle || 'Découvrez nos chambres et suites d\'exception, conçues pour offrir le summum du confort et de l\'élégance.'}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Rooms Section */}
            <section className="py-24 bg-blanc">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {rooms.map((room, index) => (
                            <motion.div
                                key={room.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-blanc border border-noir/10 overflow-hidden card-hover group"
                            >
                                {/* Image */}
                                <div className="relative h-72 overflow-hidden">
                                    <Image
                                        src={room.imageUrl}
                                        alt={room.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />

                                    {/* Overlay Galerie si présente */}
                                    {room.images && room.images.length > 0 && (
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                            <button
                                                onClick={() => setSelectedRoomGallery({
                                                    images: [room.imageUrl, ...(room.images?.map(img => img.url) || [])],
                                                    name: room.name
                                                })}
                                                className="bg-white/90 backdrop-blur-md text-noir px-6 py-3 rounded-full font-body text-[10px] font-bold uppercase tracking-widest flex items-center space-x-2 hover:bg-or hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500"
                                            >
                                                <Maximize2 className="w-4 h-4" />
                                                <span>Explorer la galerie</span>
                                            </button>
                                        </div>
                                    )}

                                    {/* Badge prix */}
                                    <div className="absolute top-6 right-6 bg-blanc border border-noir/10 text-noir px-4 py-2 text-sm font-body shadow-elegant">
                                        {room.price}
                                    </div>

                                    {/* Note & Count */}
                                    <div className="absolute bottom-6 left-6 flex items-center justify-between w-[calc(100%-3rem)]">
                                        <div className="flex items-center space-x-1">
                                            {[...Array(room.rating)].map((_, i) => (
                                                <Star key={i} className="w-3.5 h-3.5 text-or fill-current" />
                                            ))}
                                        </div>
                                        {room.images && room.images.length > 0 && (
                                            <div className="flex items-center space-x-2 text-white/80 bg-noir/40 backdrop-blur-sm px-2 py-1 rounded text-[10px]">
                                                <Images className="w-3 h-3" />
                                                <span>{room.images.length + 1}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Contenu */}
                                <div className="p-8">
                                    <h3 className="font-display text-2xl font-medium text-noir mb-3">
                                        {room.name}
                                    </h3>

                                    <p className="font-body text-sm text-noir/70 mb-6 leading-relaxed whitespace-pre-wrap">
                                        {room.description}
                                    </p>

                                    {/* Capacité */}
                                    <div className="flex items-center space-x-2 text-noir/60 mb-6 pb-6 border-b border-noir/10">
                                        <Users className="w-4 h-4" />
                                        <span className="font-body text-sm">{room.capacity}</span>
                                    </div>

                                    {/* Caractéristiques */}
                                    <div className="space-y-3 mb-8">
                                        {room.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center space-x-3">
                                                <div className="w-1 h-1 bg-or rounded-full"></div>
                                                <span className="font-body text-sm text-noir/70">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Bouton CTA */}
                                    <Link
                                        href={`/contact?room=${room.id}`}
                                        className="group/btn w-full border border-noir text-noir hover:bg-noir hover:text-blanc py-3 font-body text-sm transition-all duration-300 flex items-center justify-center space-x-2"
                                    >
                                        <span>Réserver maintenant</span>
                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
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
                            Services & Équipements
                        </h2>
                        <p className="font-body text-lg text-noir/70 max-w-3xl mx-auto leading-relaxed">
                            Profitez de nos équipements de luxe et de nos services personnalisés
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            { icon: Wifi, title: 'WiFi Premium', description: 'Connexion haut débit dans toutes les chambres' },
                            { icon: Coffee, title: 'Room Service', description: 'Service 24h/24 pour votre confort' },
                            { icon: Car, title: 'Parking Privé', description: 'Parking sécurisé gratuit' },
                            { icon: CalendarIcon, title: 'Réservation', description: 'Annulation gratuite jusqu\'à 48h avant' },
                        ].map((service, index) => (
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
        </>
    );
}
