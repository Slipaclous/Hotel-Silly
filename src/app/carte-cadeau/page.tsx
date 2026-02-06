'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Gift, Heart, Star, Check } from 'lucide-react';
import Link from 'next/link';

export default function CartesCadeauxPage() {
    const benefits = [
        'Valable pour une nuitée ou un petit déjeuner',
        'Utilisable à tout moment',
        'Cadeau original et mémorable',
        'Carte personnalisable',
        'Validité d\'un an',
        'Transfert possible'
    ];

    return (
        <main className="min-h-screen bg-blanc">
            <Header />

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mt-[120px]">
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url('https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
                        }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-noir/60 via-noir/40 to-transparent"></div>
                </div>

                <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <div className="flex items-center justify-center mb-6">
                            <Gift className="w-12 h-12 text-[var(--color-or)]" />
                        </div>
                        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium mb-6">
                            Carte-Cadeau Villa Dolce
                        </h1>
                        <p className="font-body text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                            Offrez une expérience inoubliable dans notre magnifique hôtel
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-24 bg-blanc">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                        {/* Image */}
                        <div className="relative">
                            <div className="relative h-[500px] overflow-hidden shadow-elegant">
                                <div
                                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                    style={{
                                        backgroundImage: `url('https://images.unsplash.com/photo-1513885535751-8b9238bd345a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
                                    }}
                                />

                                {/* Badge décoratif */}
                                <div className="absolute top-8 right-8 bg-[var(--color-or)] text-white p-6 shadow-elegant">
                                    <Heart className="w-8 h-8 mb-2" />
                                    <div className="font-display text-sm font-medium">Cadeau</div>
                                    <div className="font-display text-sm font-medium">Parfait</div>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div>
                            <div className="w-12 h-px bg-or mb-6"></div>

                            <h2 className="font-display text-4xl sm:text-5xl font-medium text-noir mb-6">
                                Le Cadeau Parfait
                            </h2>

                            <p className="font-body text-lg text-noir/70 mb-8 leading-relaxed">
                                À la recherche d'un cadeau original ? La carte-cadeau VILLA DOLCE est le cadeau
                                parfait ! Avec cela, le destinataire peut profiter à tout moment d'une nuitée,
                                ou d'un petit déjeuner dans notre magnifique hôtel.
                            </p>

                            {/* Benefits List */}
                            <div className="space-y-4 mb-10">
                                {benefits.map((benefit, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start space-x-3"
                                    >
                                        <div className="w-6 h-6 border border-[var(--color-or)] flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Check className="w-4 h-4 text-[var(--color-or)]" />
                                        </div>
                                        <span className="font-body text-base text-noir/80">{benefit}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <Link
                                href="/contact"
                                className="inline-flex items-center space-x-3 bg-noir text-blanc px-8 py-4 font-body text-sm font-medium hover:bg-[var(--color-or)] transition-all duration-300 shadow-elegant group"
                            >
                                <Gift className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                                <span>Commander la Carte</span>
                            </Link>
                        </div>
                    </div>

                    {/* Gift Card Options */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Option 1 */}
                        <div className="bg-blanc border border-noir/10 p-8 card-hover text-center">
                            <div className="w-16 h-16 border-2 border-[var(--color-or)] flex items-center justify-center mx-auto mb-6">
                                <Star className="w-8 h-8 text-[var(--color-or)]" />
                            </div>
                            <h3 className="font-display text-2xl font-medium text-noir mb-3">
                                Petit Déjeuner
                            </h3>
                            <p className="font-body text-sm text-noir/60 mb-6 leading-relaxed">
                                Offrez un petit déjeuner gourmand dans notre établissement
                            </p>
                            <div className="font-display text-3xl font-medium text-[var(--color-or)] mb-6">
                                À partir de 25€
                            </div>
                            <Link
                                href="/contact"
                                className="inline-block w-full bg-noir text-blanc px-6 py-3 font-body text-sm font-medium hover:bg-[var(--color-or)] transition-colors duration-300"
                            >
                                Commander
                            </Link>
                        </div>

                        {/* Option 2 */}
                        <div className="bg-blanc border-2 border-[var(--color-or)] p-8 card-hover text-center relative">
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[var(--color-or)] text-white px-4 py-1 font-body text-xs font-medium uppercase tracking-wider">
                                Populaire
                            </div>
                            <div className="w-16 h-16 bg-[var(--color-or)] flex items-center justify-center mx-auto mb-6">
                                <Star className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="font-display text-2xl font-medium text-noir mb-3">
                                Une Nuitée
                            </h3>
                            <p className="font-body text-sm text-noir/60 mb-6 leading-relaxed">
                                Une nuit inoubliable dans l'une de nos chambres de luxe
                            </p>
                            <div className="font-display text-3xl font-medium text-[var(--color-or)] mb-6">
                                À partir de 150€
                            </div>
                            <Link
                                href="/contact"
                                className="inline-block w-full bg-[var(--color-or)] text-blanc px-6 py-3 font-body text-sm font-medium hover:bg-noir transition-colors duration-300"
                            >
                                Commander
                            </Link>
                        </div>

                        {/* Option 3 */}
                        <div className="bg-blanc border border-noir/10 p-8 card-hover text-center">
                            <div className="w-16 h-16 border-2 border-[var(--color-or)] flex items-center justify-center mx-auto mb-6">
                                <Heart className="w-8 h-8 text-[var(--color-or)]" />
                            </div>
                            <h3 className="font-display text-2xl font-medium text-noir mb-3">
                                Séjour Complet
                            </h3>
                            <p className="font-body text-sm text-noir/60 mb-6 leading-relaxed">
                                Un séjour tout compris avec petit déjeuner inclus
                            </p>
                            <div className="font-display text-3xl font-medium text-[var(--color-or)] mb-6">
                                À partir de 300€
                            </div>
                            <Link
                                href="/contact"
                                className="inline-block w-full bg-noir text-blanc px-6 py-3 font-body text-sm font-medium hover:bg-[var(--color-or)] transition-colors duration-300"
                            >
                                Commander
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
