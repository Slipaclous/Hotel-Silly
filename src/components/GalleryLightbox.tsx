'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

interface GalleryLightboxProps {
    images: string[];
    isOpen: boolean;
    onClose: () => void;
    roomName: string;
}

export default function GalleryLightbox({ images, isOpen, onClose, roomName }: GalleryLightboxProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevious = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-noir/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-10"
                onClick={onClose}
            >
                {/* Header */}
                <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between text-white z-10">
                    <div className="flex flex-col">
                        <h3 className="font-display text-xl">{roomName}</h3>
                        <p className="font-body text-[10px] uppercase tracking-[0.3em] text-or mt-1">
                            Galerie Exclusive • {currentIndex + 1} / {images.length}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/10"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Main Image Container */}
                <div className="relative w-full max-w-6xl aspect-[16/10] md:aspect-video flex items-center justify-center">
                    <button
                        onClick={handlePrevious}
                        className="absolute left-4 md:-left-16 p-4 bg-white/5 hover:bg-or hover:text-noir rounded-full transition-all border border-white/10 group z-10"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full relative"
                    >
                        <Image
                            src={images[currentIndex].startsWith('/') ? images[currentIndex] : `/${images[currentIndex]}`}
                            alt={`${roomName} view ${currentIndex + 1}`}
                            fill
                            className="object-contain"
                            priority
                        />
                    </motion.div>

                    <button
                        onClick={handleNext}
                        className="absolute right-4 md:-right-16 p-4 bg-white/5 hover:bg-or hover:text-noir rounded-full transition-all border border-white/10 group z-10"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                {/* Thumbnails */}
                <div className="mt-8 flex items-center space-x-3 overflow-x-auto max-w-full px-4 pb-4 no-scrollbar">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrentIndex(idx);
                            }}
                            className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${currentIndex === idx ? 'border-or scale-110' : 'border-transparent opacity-40 hover:opacity-100'
                                }`}
                        >
                            <Image
                                src={img.startsWith('/') ? img : `/${img}`}
                                alt="thumb"
                                fill
                                className="object-cover"
                                sizes="80px"
                            />
                        </button>
                    ))}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
