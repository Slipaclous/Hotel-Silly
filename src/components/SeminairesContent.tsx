'use client';

import { motion } from 'framer-motion';
import { Users, Wifi, Monitor, Coffee, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface PageHero {
    page: string;
    title: string;
    subtitle: string;
    imageUrl: string;
}

interface SeminairesContentProps {
    pageHero: PageHero | null;
}

export default function SeminairesContent({ pageHero }: SeminairesContentProps) {
    const features = [
        { icon: Users, title: 'Jusqu\'à 20 personnes', description: 'Capacité optimale pour vos réunions' },
        { icon: Monitor, title: 'Équipement de projection', description: 'Matériel audiovisuel professionnel' },
        { icon: Wifi, title: 'WiFi haut débit', description: 'Connexion internet performante' },
        { icon: Coffee, title: 'Coffee Corner', description: 'Rafraîchissements disponibles' }
    ];

    const coffeeCornerItems = [
        'Café et thé premium',
        'Eau et soft drinks',
        'Jus de fruits frais',
        'Mini viennoiseries (matinée)',
        'Mignardises (journée)'
    ];

    return (
        <>
            {/* Hero Section */}
            <section id="hero" data-nav-section="Bienvenue" data-nav-is-dark="true" className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-[#2c3840]">
                <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <div className="w-12 h-px bg-[#C6ad7a] mx-auto mb-6"></div>
                        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium mb-6 text-[#C6ad7a]">
                            {pageHero?.title || 'Réunions & Séminaires'}
                        </h1>
                        <p className="font-body text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                            {pageHero?.subtitle || "Un espace professionnel et élégant pour vos événements d'entreprise"}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-24 bg-blanc">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Introduction */}
                    <div id="space" data-nav-section="L'Espace" className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                        <div>
                            <div className="w-12 h-px bg-or mb-6"></div>

                            <h2 className="font-display text-4xl sm:text-5xl font-medium text-noir mb-6">
                                Votre Espace Professionnel
                            </h2>

                            <p className="font-body text-lg text-noir/70 mb-8 leading-relaxed">
                                Possibilité de louer un espace pour vos réunions dans un cadre exceptionnel
                                alliant confort et professionnalisme. Notre salle peut accueillir jusqu&apos;à 20 personnes
                                et dispose de tous les équipements nécessaires pour garantir le succès de vos événements.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="w-6 h-6 text-[var(--color-or)] flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-body text-base font-medium text-noir mb-1">
                                            Forfaits flexibles
                                        </h3>
                                        <p className="font-body text-sm text-noir/60">
                                            Disponible à la journée ou demi-journée selon vos besoins
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="w-6 h-6 text-[var(--color-or)] flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-body text-base font-medium text-noir mb-1">
                                            Équipement complet
                                        </h3>
                                        <p className="font-body text-sm text-noir/60">
                                            Projection, WiFi haut débit et tout le matériel nécessaire
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="w-6 h-6 text-[var(--color-or)] flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-body text-base font-medium text-noir mb-1">
                                            Cadre inspirant
                                        </h3>
                                        <p className="font-body text-sm text-noir/60">
                                            Un environnement propice à la productivité et à la créativité
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            className="relative"
                        >
                            <div className="relative h-[500px] overflow-hidden shadow-elegant">
                                <div
                                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                    style={{
                                        backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div
                        id="features"
                        data-nav-section="Équipements"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24"
                    >
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div key={index} className="text-center">
                                    <div className="w-16 h-16 border border-noir/20 flex items-center justify-center mx-auto mb-6 hover:border-[var(--color-or)] transition-colors duration-300">
                                        <Icon className="w-7 h-7 text-[var(--color-or)]" />
                                    </div>
                                    <h3 className="font-display text-xl font-medium text-noir mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="font-body text-sm text-noir/70 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Pricing Options */}
                    <div id="pricing" data-nav-section="Tarifs" className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
                        {/* Demi-journée */}
                        <div className="bg-blanc border border-noir/10 p-10 shadow-elegant">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-display text-3xl font-medium text-noir">
                                    Demi-Journée
                                </h3>
                                <Clock className="w-8 h-8 text-[var(--color-or)]" />
                            </div>

                            <p className="font-body text-sm text-noir/60 mb-8">
                                Forfait par personne pour une demi-journée de réunion
                            </p>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center space-x-3">
                                    <div className="w-1.5 h-1.5 bg-[var(--color-or)] rounded-full"></div>
                                    <span className="font-body text-sm text-noir/80">Salle équipée (4h)</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-1.5 h-1.5 bg-[var(--color-or)] rounded-full"></div>
                                    <span className="font-body text-sm text-noir/80">Projection & WiFi</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-1.5 h-1.5 bg-[var(--color-or)] rounded-full"></div>
                                    <span className="font-body text-sm text-noir/80">Coffee corner en option</span>
                                </div>
                            </div>

                            <Link
                                href="/contact"
                                className="inline-block w-full text-center bg-noir text-blanc px-8 py-4 font-body text-sm font-medium hover:bg-[var(--color-or)] transition-colors duration-300"
                            >
                                Demander un devis
                            </Link>
                        </div>

                        {/* Journée complète */}
                        <div className="bg-blanc border-2 border-[var(--color-or)] p-10 shadow-elegant relative">
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[var(--color-or)] text-white px-4 py-1 font-body text-xs font-medium uppercase tracking-wider">
                                Recommandé
                            </div>

                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-display text-3xl font-medium text-noir">
                                    Journée Complète
                                </h3>
                                <Clock className="w-8 h-8 text-[var(--color-or)]" />
                            </div>

                            <p className="font-body text-sm text-noir/60 mb-8">
                                Forfait par personne pour une journée complète de réunion
                            </p>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center space-x-3">
                                    <div className="w-1.5 h-1.5 bg-[var(--color-or)] rounded-full"></div>
                                    <span className="font-body text-sm text-noir/80">Salle équipée (8h)</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-1.5 h-1.5 bg-[var(--color-or)] rounded-full"></div>
                                    <span className="font-body text-sm text-noir/80">Projection & WiFi</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-1.5 h-1.5 bg-[var(--color-or)] rounded-full"></div>
                                    <span className="font-body text-sm text-noir/80">Coffee corner en option</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-1.5 h-1.5 bg-[var(--color-or)] rounded-full"></div>
                                    <span className="font-body text-sm text-noir/80">Pause déjeuner possible</span>
                                </div>
                            </div>

                            <Link
                                href="/contact"
                                className="inline-block w-full text-center bg-[var(--color-or)] text-blanc px-8 py-4 font-body text-sm font-medium hover:bg-noir transition-colors duration-300"
                            >
                                Demander un devis
                            </Link>
                        </div>
                    </div>

                    {/* Coffee Corner Section */}
                    <div id="coffee" data-nav-section="Coffee" className="bg-[var(--color-blanc-200)] p-12">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center justify-center mb-8">
                                <Coffee className="w-12 h-12 text-[var(--color-or)]" />
                            </div>

                            <h2 className="font-display text-3xl font-medium text-noir text-center mb-6">
                                Forfait Coffee Corner
                            </h2>

                            <p className="font-body text-base text-noir/70 text-center mb-10 leading-relaxed max-w-2xl mx-auto">
                                Mise à disposition de rafraîchissements pendant votre réunion pour maintenir
                                l&apos;énergie et la concentration de vos équipes.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {coffeeCornerItems.map((item, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <CheckCircle className="w-5 h-5 text-[var(--color-or)] flex-shrink-0" />
                                        <span className="font-body text-sm text-noir/80">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="text-center mt-10">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center space-x-2 bg-noir text-blanc px-8 py-4 font-body text-sm font-medium hover:bg-[var(--color-or)] transition-colors duration-300"
                                >
                                    <span>Réserver votre espace</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div id="footer" data-nav-section="Infos" data-nav-is-dark="true"></div>
                </div>
            </section>
        </>
    );
}
