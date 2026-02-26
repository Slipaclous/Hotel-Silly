'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Star, Bed, Maximize, User, Check, PawPrint, Info } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

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
    surface?: string | null;
    bedding?: string | null;
    beddingEn?: string | null;
    beddingNl?: string | null;
    bathroom?: string | null;
    bathroomEn?: string | null;
    bathroomNl?: string | null;
    price1Person?: string | null;
    price2Persons?: string | null;
    price3Persons?: string | null;
    petsAllowed?: boolean | null;
    bookingUrl?: string | null;
    bookingUrlEn?: string | null;
    bookingUrlNl?: string | null;
}

interface RoomDetailsModalProps {
    room: Room | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function RoomDetailsModal({ room, isOpen, onClose }: RoomDetailsModalProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const locale = useLocale();
    const t = useTranslations('rooms');
    const c = useTranslations('common');

    // Reset index when room changes
    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(0);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, room]);

    if (!isOpen || !room) return null;

    const allImages = [room.imageUrl, ...(room.images?.map(img => img.url) || [])];

    const handlePrevious = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
    };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
    };

    const getLocalized = (fr: string, en?: string | null, nl?: string | null) => {
        if (locale === 'nl') return nl || fr;
        if (locale === 'en') return en || fr;
        return fr;
    };

    const roomName = getLocalized(room.name, room.nameEn, room.nameNl);

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-noir/70 backdrop-blur-md"
                />

                {/* Modal Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row z-10"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button Mobile */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white lg:text-noir lg:bg-gray-100 lg:hover:bg-gray-200 lg:hidden"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Image Section (Left/Top) */}
                    <div className="w-full lg:w-[60%] h-[300px] sm:h-[400px] lg:h-auto relative bg-noir flex flex-col shrink-0">
                        <div className="relative flex-1 overflow-hidden group">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={allImages[currentIndex]}
                                        alt={`${roomName} - Photo ${currentIndex + 1}`}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Gallery Navigation Overlay */}
                            {allImages.length > 1 && (
                                <>
                                    <button
                                        onClick={handlePrevious}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-all opacity-0 group-hover:opacity-100"
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-all opacity-0 group-hover:opacity-100"
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                </>
                            )}

                            {/* Image Counter Overlay */}
                            <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                                {currentIndex + 1} / {allImages.length}
                            </div>
                        </div>

                        {/* Thumbnails (Only visible if > 1 image) */}
                        {allImages.length > 1 && (
                            <div className="h-24 bg-noir/10 flex items-center space-x-2 px-4 py-3 overflow-x-auto no-scrollbar border-t border-white/10">
                                {allImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentIndex(idx)}
                                        className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${currentIndex === idx ? 'border-or scale-105' : 'border-transparent opacity-50 hover:opacity-100'
                                            }`}
                                    >
                                        <Image
                                            src={img}
                                            alt="Thumbnail"
                                            fill
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Content Section (Right/Bottom) */}
                    <div className="w-full lg:w-[40%] flex flex-col flex-1 min-h-0 bg-white overflow-y-auto custom-scrollbar relative">
                        {/* Close Button Desktop */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-20 p-2 text-noir/40 hover:text-noir hover:bg-noir/5 rounded-full transition-all hidden lg:block"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="p-8 lg:p-10">
                            {/* Scroll indicator for mobile (subtle) */}
                            <div className="lg:hidden absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none animate-bounce opacity-40">
                                <ChevronRight className="w-5 h-5 rotate-90 text-or" />
                            </div>
                            {/* Stars & Category */}
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="flex text-or">
                                    {[...Array(room.rating)].map((_, i) => (
                                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                                    ))}
                                </div>
                                <span className="text-noir/40 font-body text-xs">|</span>
                                <span className="text-or font-body text-[10px] font-bold uppercase tracking-wider">{t('exclusiveStay')}</span>
                            </div>

                            <h2 className="font-display text-3xl text-noir mb-6 leading-tight">
                                {roomName}
                            </h2>

                            {/* Specs highlight grid */}
                            <div className="grid grid-cols-2 gap-6 mb-8 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                <div className="flex items-start space-x-3">
                                    <Maximize className="w-5 h-5 text-or shrink-0 mt-0.5" />
                                    <div>
                                        <span className="block text-[10px] font-body text-noir/40 uppercase tracking-widest">{t('surface')}</span>
                                        <span className="block font-display text-sm text-noir">{room.surface || 'N/A'}</span>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <User className="w-5 h-5 text-or shrink-0 mt-0.5" />
                                    <div>
                                        <span className="block text-[10px] font-body text-noir/40 uppercase tracking-widest">{t('capacity')}</span>
                                        <span className="block font-display text-sm text-noir">{getLocalized(room.capacity, room.capacityEn, room.capacityNl)}</span>
                                    </div>
                                </div>
                                <div className="col-span-2 flex items-start space-x-3">
                                    <Bed className="w-5 h-5 text-or shrink-0 mt-0.5" />
                                    <div>
                                        <span className="block text-[10px] font-body text-noir/40 uppercase tracking-widest">{t('bedding')}</span>
                                        <span className="block font-display text-sm text-noir">{getLocalized(room.bedding || 'Non spécifié', room.beddingEn, room.beddingNl)}</span>
                                    </div>
                                </div>
                                {room.petsAllowed && (
                                    <div className="col-span-2 flex items-center space-x-3 text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg -mx-2">
                                        <PawPrint className="w-4 h-4" />
                                        <span className="text-xs font-body font-medium">{t('pets')}</span>
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            <div className="mb-10">
                                <h3 className="font-display text-lg text-noir mb-4 flex items-center">
                                    <Info className="w-4 h-4 mr-2 text-or" />
                                    {t('description')}
                                </h3>
                                <p className="font-body text-sm text-noir/70 leading-relaxed font-light">
                                    {getLocalized(room.description, room.descriptionEn, room.descriptionNl)}
                                </p>
                            </div>

                            {/* Features */}
                            <div className="mb-10">
                                <h3 className="font-display text-lg text-noir mb-4">{t('amenities')}</h3>
                                <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                                    {room.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center space-x-2">
                                            <div className="w-4 h-4 rounded-full bg-or/10 flex items-center justify-center shrink-0">
                                                <Check className="w-2.5 h-2.5 text-or" />
                                            </div>
                                            <span className="text-xs font-body text-noir/70">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Pricing (Mini Table) */}
                            {(room.price1Person || room.price2Persons || room.price3Persons) && (
                                <div className="mb-10 border-t border-gray-100 pt-8">
                                    <h3 className="font-display text-lg text-noir mb-4">{t('pricingTitle')}</h3>
                                    <div className="space-y-2">
                                        {room.price1Person && (
                                            <div className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded-lg">
                                                <span className="text-xs font-body text-noir/60">1 {t('person')}</span>
                                                <span className="font-display text-md text-or">{room.price1Person}</span>
                                            </div>
                                        )}
                                        {room.price2Persons && (
                                            <div className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded-lg">
                                                <span className="text-xs font-body text-noir/60">2 {t('persons')}</span>
                                                <span className="font-display text-md text-or">{room.price2Persons}</span>
                                            </div>
                                        )}
                                        {room.price3Persons && (
                                            <div className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded-lg">
                                                <span className="text-xs font-body text-noir/60">3+ {t('persons')}</span>
                                                <span className="font-display text-md text-or">{room.price3Persons}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* CTA Section (Stick to bottom on mobile? No, part of scroll is fine) */}
                            <div className="mt-auto pt-8 border-t border-gray-100">
                                <div className="flex flex-col gap-4">
                                    {getLocalized(room.bookingUrl || '', room.bookingUrlEn, room.bookingUrlNl) ? (
                                        <a
                                            href={getLocalized(room.bookingUrl || '', room.bookingUrlEn, room.bookingUrlNl) || '#'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full bg-[#2c3840] text-white px-8 py-5 font-body text-xs font-bold uppercase tracking-widest hover:bg-[#C6ad7a] transition-all duration-500 text-center shadow-lg rounded-xl"
                                        >
                                            {c('bookStay')}
                                        </a>
                                    ) : (
                                        <a
                                            href={`/contact?room=${room.id}&subject=reservation`}
                                            className="w-full bg-[#2c3840] text-white px-8 py-5 font-body text-xs font-bold uppercase tracking-widest hover:bg-[#C6ad7a] transition-all duration-500 text-center shadow-lg rounded-xl"
                                        >
                                            {c('bookStay')}
                                        </a>
                                    )}
                                    <p className="text-[10px] text-center text-noir/40 font-body italic">
                                        {t('reservationDisclaimer')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
