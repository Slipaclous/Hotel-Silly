'use client';

import { motion } from 'framer-motion';
import { ZoomIn, X } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

interface GalleryImage {
    id: number;
    url: string;
    category: string;
    categoryEn?: string | null;
    categoryNl?: string | null;
    title: string;
    titleEn?: string | null;
    titleNl?: string | null;
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

interface GalerieContentProps {
    initialImages: GalleryImage[];
    pageHero: PageHero | null;
}

export default function GalerieContent({ initialImages, pageHero }: GalerieContentProps) {
    const locale = useLocale();
    const t = useTranslations('gallery');

    const categories = [
        { id: 'Toutes', label: t('filterAll') },
        { id: 'Chambres', label: t('filterRooms') },
        { id: 'Restaurant', label: t('filterRestaurant') },
        { id: 'Spa', label: t('filterSpa') },
        { id: 'Intérieur', label: t('filterInterior') },
        { id: 'Extérieur', label: t('filterExterior') }
    ];

    const [selectedCategory, setSelectedCategory] = useState('Toutes');
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

    const getLocalized = (fr: string, en?: string | null, nl?: string | null) => {
        if (locale === 'nl') return nl || fr;
        if (locale === 'en') return en || fr;
        return fr;
    };

    const filteredImages = selectedCategory === 'Toutes'
        ? initialImages
        : initialImages.filter(img => img.category === selectedCategory);

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

            {/* Section Filtres */}
            <section id="filters" className="py-12 bg-blanc-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`font-body text-sm px-6 py-2 transition-all duration-300 ${selectedCategory === category.id
                                    ? 'bg-noir text-blanc'
                                    : 'bg-blanc text-noir border border-noir/20 hover:border-or'
                                    }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Grille Galerie */}
            <section id="grid" data-nav-section={t('heroTitle')} className="py-24 bg-blanc">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {filteredImages.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="font-body text-noir/60">{t('noImages')}</div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredImages.map((image, index) => {
                                const title = getLocalized(image.title, image.titleEn, image.titleNl);
                                const category = getLocalized(image.category, image.categoryEn, image.categoryNl);
                                return (
                                    <div
                                        key={image.id}
                                        className="relative group cursor-pointer overflow-hidden card-hover"
                                        onClick={() => setSelectedImage(image)}
                                    >
                                        <div className="aspect-[4/3] relative overflow-hidden">
                                            <Image
                                                src={image.url}
                                                alt={title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            />
                                        </div>
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300">
                                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="font-body text-xs uppercase tracking-widest mb-1 text-white/70">{category}</div>
                                                <div className="font-display text-lg font-medium">{title}</div>
                                            </div>
                                        </div>
                                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="bg-blanc p-2">
                                                <ZoomIn className="w-5 h-5 text-noir" />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            <div id="footer" data-nav-section="Infos" data-nav-is-dark="true"></div>

            {/* Modal Lightbox */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="relative max-w-6xl w-full max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 z-10 bg-blanc p-2 hover:bg-or transition-colors duration-300"
                        >
                            <X className="w-6 h-6 text-noir" />
                        </button>
                        <div className="relative w-full h-full min-h-[50vh]">
                            <Image
                                src={selectedImage.url}
                                alt={getLocalized(selectedImage.title, selectedImage.titleEn, selectedImage.titleNl)}
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-6 text-white">
                            <div className="font-body text-xs uppercase tracking-widest mb-1 text-white/60">
                                {getLocalized(selectedImage.category, selectedImage.categoryEn, selectedImage.categoryNl)}
                            </div>
                            <div className="font-display text-2xl font-medium">
                                {getLocalized(selectedImage.title, selectedImage.titleEn, selectedImage.titleNl)}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </>
    );
}
