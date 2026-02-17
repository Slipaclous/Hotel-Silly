'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
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
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const getLocalized = (fr: string, en?: string | null, nl?: string | null) => {
        if (locale === 'nl') return nl || fr;
        if (locale === 'en') return en || fr;
        return fr;
    };

    const filteredImages = selectedCategory === 'Toutes'
        ? initialImages
        : initialImages.filter(img => img.category === selectedCategory);

    const handlePrevious = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex - 1 + filteredImages.length) % filteredImages.length);
        }
    }, [selectedIndex, filteredImages.length]);

    const handleNext = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex + 1) % filteredImages.length);
        }
    }, [selectedIndex, filteredImages.length]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedIndex === null) return;
            if (e.key === 'ArrowLeft') handlePrevious();
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'Escape') setSelectedIndex(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex, handlePrevious, handleNext]);

    const activeImage = selectedIndex !== null ? filteredImages[selectedIndex] : null;

    return (
        <div className="font-body overflow-x-hidden">
            {/* Hero Section */}
            <section id="hero" data-nav-section={pageHero ? (locale === 'en' ? (pageHero.titleEn || pageHero.title) : locale === 'nl' ? (pageHero.titleNl || pageHero.title) : pageHero.title) : t('heroTitle')} data-nav-is-dark="true" className="relative h-[65vh] flex items-center justify-center overflow-hidden bg-[#2c3840]">
                {/* Background Image */}
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

                {/* Decorative Pattern overlay */}
                <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #C6ad7a 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

                <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: 60 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="h-px bg-or mx-auto mb-8"
                        />
                        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-medium mb-8 text-or tracking-tight">
                            {pageHero ? (locale === 'en' ? (pageHero.titleEn || pageHero.title) : locale === 'nl' ? (pageHero.titleNl || pageHero.title) : pageHero.title) : t('heroTitle')}
                        </h1>
                        <p className="font-body text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
                            {pageHero ? (locale === 'en' ? (pageHero.subtitleEn || pageHero.subtitle) : locale === 'nl' ? (pageHero.subtitleNl || pageHero.subtitle) : pageHero.subtitle) : t('heroSubtitle')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Section Filtres - Sticky on scroll? */}
            <section id="filters" className="py-16 bg-blanc border-b border-noir/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                        {categories.map((category, idx) => (
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * idx }}
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`group relative px-8 py-4 text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-500 overflow-hidden ${selectedCategory === category.id
                                    ? 'text-white'
                                    : 'text-noir/60 hover:text-noir'
                                    }`}
                            >
                                <span className="relative z-10">{category.label}</span>
                                {selectedCategory === category.id ? (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-or shadow-lg ring-1 ring-or/20 rounded-xl"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-noir/0 group-hover:bg-noir/[0.03] rounded-xl transition-colors" />
                                )}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Grille Galerie */}
            <section id="grid" data-nav-section={t('heroTitle')} className="py-24 bg-blanc-100/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {filteredImages.length === 0 ? (
                        <div className="text-center py-32 bg-white/50 rounded-3xl border border-noir/5">
                            <div className="font-display text-2xl text-noir/40 italic">{t('noImages')}</div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <AnimatePresence mode='popLayout'>
                                {filteredImages.map((image, index) => {
                                    const title = getLocalized(image.title, image.titleEn, image.titleNl);
                                    const category = getLocalized(image.category, image.categoryEn, image.categoryNl);
                                    return (
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                            key={image.id}
                                            className="group relative cursor-pointer aspect-[4/5] overflow-hidden rounded-[40px] shadow-elegant hover:shadow-elegant-lg transition-all duration-700 bg-white"
                                            onClick={() => setSelectedIndex(index)}
                                        >
                                            <div className="absolute inset-x-8 mt-8 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                                                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-3xl flex justify-between items-center text-white">
                                                    <div>
                                                        <p className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-80">{category}</p>
                                                        <h4 className="font-display text-lg font-medium">{title}</h4>
                                                    </div>
                                                    <div className="w-10 h-10 rounded-2xl bg-or flex items-center justify-center shadow-lg">
                                                        <Maximize2 className="w-4 h-4 text-white" />
                                                    </div>
                                                </div>
                                            </div>

                                            <Image
                                                src={image.url}
                                                alt={`${title} - Galerie Villa Dolce Silly`}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-noir/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </section>

            <div id="footer" data-nav-section="Infos" data-nav-is-dark="true"></div>

            {/* Modal Lightbox */}
            <AnimatePresence>
                {activeImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-noir/98 backdrop-blur-sm px-4 sm:px-10 py-10"
                        onClick={() => setSelectedIndex(null)}
                    >
                        {/* Close button */}
                        <motion.button
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute top-10 right-10 z-[110] w-14 h-14 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-white transition-colors duration-300"
                            onClick={() => setSelectedIndex(null)}
                        >
                            <X className="w-6 h-6" />
                        </motion.button>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 30 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="relative w-full h-full max-w-7xl flex flex-col items-center justify-center gap-8"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Navigation Buttons - Rapprochés de l'image */}
                            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between items-center pointer-events-none z-[110] px-4 sm:px-12">
                                <motion.button
                                    whileHover={{ scale: 1.1, x: -5 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-16 h-16 sm:w-20 sm:h-20 bg-white/15 backdrop-blur-md border border-white/30 hover:bg-white hover:text-noir rounded-full flex items-center justify-center text-white transition-all duration-500 pointer-events-auto shadow-2xl"
                                    onClick={handlePrevious}
                                >
                                    <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.1, x: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-16 h-16 sm:w-20 sm:h-20 bg-white/15 backdrop-blur-md border border-white/30 hover:bg-white hover:text-noir rounded-full flex items-center justify-center text-white transition-all duration-500 pointer-events-auto shadow-2xl"
                                    onClick={handleNext}
                                >
                                    <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10" />
                                </motion.button>
                            </div>

                            <div className="relative w-full h-[70vh] rounded-[40px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
                                <AnimatePresence mode='wait'>
                                    <motion.div
                                        key={activeImage.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.4 }}
                                        className="w-full h-full"
                                    >
                                        <Image
                                            src={activeImage.url}
                                            alt={`${getLocalized(activeImage.title, activeImage.titleEn, activeImage.titleNl)} - Villa Dolce Silly`}
                                            fill
                                            className="object-contain"
                                            priority
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            <div className="text-center text-white max-w-2xl px-6">
                                <motion.p
                                    key={`cat-${activeImage.id}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.6 }}
                                    className="text-[10px] font-bold uppercase tracking-[0.3em] mb-3 text-or"
                                >
                                    {getLocalized(activeImage.category, activeImage.categoryEn, activeImage.categoryNl)}
                                </motion.p>
                                <motion.h3
                                    key={`title-${activeImage.id}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="font-display text-3xl sm:text-4xl font-medium tracking-tight"
                                >
                                    {getLocalized(activeImage.title, activeImage.titleEn, activeImage.titleNl)}
                                </motion.h3>
                                <div className="mt-8 flex items-center justify-center space-x-6">
                                    <div className="h-[2px] w-8 bg-white/20 rounded-full" />
                                    <span className="text-[10px] font-bold text-white/40 tracking-[0.5em]">
                                        {selectedIndex !== null ? (selectedIndex + 1).toString().padStart(2, '0') : '00'} / {filteredImages.length.toString().padStart(2, '0')}
                                    </span>
                                    <div className="h-[2px] w-8 bg-white/20 rounded-full" />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
