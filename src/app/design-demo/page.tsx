'use client';

import {
    LuxuryDivider,
    PremiumBadge,
    SectionTitle,
    GlassCard,
    LuxuryButton,
    DecorativePattern,
    Ornament,
    StatusBadge
} from '@/components/LuxuryComponents';

export default function DesignSystemDemo() {
    return (
        <main className="min-h-screen bg-ivoire-100">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center bg-gradient-noir overflow-hidden">
                <DecorativePattern variant="dots" />
                <Ornament position="top-right" size="lg" />
                <Ornament position="bottom-left" size="md" />

                <div className="relative z-10 text-center px-4">
                    <PremiumBadge className="mb-8 animate-fade-in-down">
                        Système de Design Premium
                    </PremiumBadge>

                    <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-ivoire-100 mb-6 animate-fade-in-up">
                        Hôtel de Silly
                    </h1>

                    <p className="font-body text-lg md:text-xl text-ivoire-200 max-w-2xl mx-auto mb-8 animate-fade-in-up delay-200">
                        Découvrez notre système de design ultra-raffiné, conçu pour offrir une expérience visuelle exceptionnelle.
                    </p>

                    <LuxuryDivider className="animate-fade-in delay-400" />

                    <div className="flex flex-wrap gap-4 justify-center mt-12 animate-fade-in-up delay-600">
                        <LuxuryButton variant="primary" size="lg">
                            Bouton Primary
                        </LuxuryButton>
                        <LuxuryButton variant="secondary" size="lg">
                            Bouton Secondary
                        </LuxuryButton>
                        <LuxuryButton variant="outline" size="lg">
                            Bouton Outline
                        </LuxuryButton>
                    </div>
                </div>
            </section>

            {/* Palette de Couleurs */}
            <section className="py-24 relative">
                <DecorativePattern variant="lines" />

                <div className="container mx-auto px-4 relative z-10">
                    <SectionTitle
                        title="Palette de Couleurs"
                        subtitle="Luxe & Raffinement"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Or Champagne */}
                        <GlassCard>
                            <h3 className="font-heading text-2xl font-bold text-noir-900 mb-4">Or Champagne</h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-lg bg-champagne-500 shadow-gold"></div>
                                    <div>
                                        <p className="font-sans text-sm font-semibold">champagne-500</p>
                                        <p className="font-mono text-xs text-noir-600">#d4b886</p>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                        {/* Noir Profond */}
                        <GlassCard>
                            <h3 className="font-heading text-2xl font-bold text-noir-900 mb-4">Noir Profond</h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-lg bg-noir-900 shadow-luxury"></div>
                                    <div>
                                        <p className="font-sans text-sm font-semibold">noir-900</p>
                                        <p className="font-mono text-xs text-noir-600">#1a1a1a</p>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                        {/* Ivoire */}
                        <GlassCard>
                            <h3 className="font-heading text-2xl font-bold text-noir-900 mb-4">Ivoire</h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-lg bg-ivoire-500 border border-champagne-200"></div>
                                    <div>
                                        <p className="font-sans text-sm font-semibold">ivoire-500</p>
                                        <p className="font-mono text-xs text-noir-600">#fef0c7</p>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </section>

            {/* Typographie */}
            <section className="py-24 bg-gradient-to-b from-ivoire-100 to-champagne-50 relative">
                <div className="container mx-auto px-4">
                    <SectionTitle
                        title="Typographie"
                        subtitle="Élégance & Lisibilité"
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <GlassCard>
                            <h3 className="font-heading text-xl font-bold text-noir-900 mb-6">Polices Display</h3>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-xs text-champagne-700 uppercase tracking-luxury mb-2">Cormorant Garamond</p>
                                    <p className="font-display text-4xl text-noir-900">Élégance Classique</p>
                                </div>
                                <div>
                                    <p className="text-xs text-champagne-700 uppercase tracking-luxury mb-2">Cinzel</p>
                                    <p className="font-heading text-3xl text-noir-900">Sophistication</p>
                                </div>
                                <div>
                                    <p className="text-xs text-champagne-700 uppercase tracking-luxury mb-2">Great Vibes</p>
                                    <p className="font-cursive text-4xl text-champagne-700">Signature</p>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard>
                            <h3 className="font-heading text-xl font-bold text-noir-900 mb-6">Polices de Texte</h3>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-xs text-champagne-700 uppercase tracking-luxury mb-2">Montserrat</p>
                                    <p className="font-sans text-lg text-noir-900">Navigation & Boutons</p>
                                </div>
                                <div>
                                    <p className="text-xs text-champagne-700 uppercase tracking-luxury mb-2">Inter</p>
                                    <p className="font-body text-base text-noir-700 leading-relaxed-plus">
                                        Corps de texte optimisé pour la lisibilité et le confort de lecture sur tous les écrans.
                                    </p>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </section>

            {/* Composants */}
            <section className="py-24 relative">
                <DecorativePattern variant="default" />

                <div className="container mx-auto px-4 relative z-10">
                    <SectionTitle
                        title="Composants Premium"
                        subtitle="Bibliothèque UI"
                    />

                    <div className="space-y-12">
                        {/* Badges */}
                        <div>
                            <h3 className="font-heading text-2xl font-bold text-noir-900 mb-6">Badges</h3>
                            <div className="flex flex-wrap gap-4">
                                <PremiumBadge>Premium Badge</PremiumBadge>
                                <StatusBadge variant="new">Nouveau</StatusBadge>
                                <StatusBadge variant="popular">Populaire</StatusBadge>
                                <StatusBadge variant="exclusive">Exclusif</StatusBadge>
                            </div>
                        </div>

                        {/* Boutons */}
                        <div>
                            <h3 className="font-heading text-2xl font-bold text-noir-900 mb-6">Boutons</h3>
                            <div className="flex flex-wrap gap-4">
                                <LuxuryButton variant="primary" size="sm">Small</LuxuryButton>
                                <LuxuryButton variant="primary" size="md">Medium</LuxuryButton>
                                <LuxuryButton variant="primary" size="lg">Large</LuxuryButton>
                            </div>
                            <div className="flex flex-wrap gap-4 mt-4">
                                <LuxuryButton variant="secondary" size="md">Secondary</LuxuryButton>
                                <LuxuryButton variant="outline" size="md">Outline</LuxuryButton>
                            </div>
                        </div>

                        {/* Dividers */}
                        <div>
                            <h3 className="font-heading text-2xl font-bold text-noir-900 mb-6">Dividers</h3>
                            <LuxuryDivider />
                        </div>

                        {/* Cards */}
                        <div>
                            <h3 className="font-heading text-2xl font-bold text-noir-900 mb-6">Cards</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <GlassCard>
                                    <h4 className="font-heading text-xl font-bold text-noir-900 mb-3">Glass Card</h4>
                                    <p className="font-body text-noir-700">
                                        Carte avec effet glassmorphism premium et hover élégant.
                                    </p>
                                </GlassCard>
                                <GlassCard>
                                    <h4 className="font-heading text-xl font-bold text-noir-900 mb-3">Hover Effect</h4>
                                    <p className="font-body text-noir-700">
                                        Passez la souris pour voir l&apos;animation de scale et shadow.
                                    </p>
                                </GlassCard>
                                <GlassCard hover={false}>
                                    <h4 className="font-heading text-xl font-bold text-noir-900 mb-3">Sans Hover</h4>
                                    <p className="font-body text-noir-700">
                                        Cette carte n&apos;a pas d&apos;effet hover activé.
                                    </p>
                                </GlassCard>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Animations */}
            <section className="py-24 bg-gradient-noir relative overflow-hidden">
                <Ornament position="top-left" size="lg" />
                <Ornament position="bottom-right" size="lg" />

                <div className="container mx-auto px-4 relative z-10">
                    <SectionTitle
                        title="Animations"
                        subtitle="Fluidité & Élégance"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="glass-dark p-8 rounded-luxury animate-fade-in">
                            <p className="text-ivoire-100 font-sans text-center">Fade In</p>
                        </div>
                        <div className="glass-dark p-8 rounded-luxury animate-fade-in-up">
                            <p className="text-ivoire-100 font-sans text-center">Fade In Up</p>
                        </div>
                        <div className="glass-dark p-8 rounded-luxury animate-slide-in-left">
                            <p className="text-ivoire-100 font-sans text-center">Slide Left</p>
                        </div>
                        <div className="glass-dark p-8 rounded-luxury animate-scale-in">
                            <p className="text-ivoire-100 font-sans text-center">Scale In</p>
                        </div>
                    </div>

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="glass-dark p-8 rounded-luxury animate-float">
                            <p className="text-ivoire-100 font-sans text-center">Float</p>
                        </div>
                        <div className="glass-dark p-8 rounded-luxury animate-glow">
                            <p className="text-ivoire-100 font-sans text-center">Glow</p>
                        </div>
                        <div className="glass-dark p-8 rounded-luxury shimmer-effect">
                            <p className="text-ivoire-100 font-sans text-center">Shimmer</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <section className="py-12 bg-noir-950">
                <div className="container mx-auto px-4 text-center">
                    <p className="font-body text-ivoire-200 text-sm">
                        Système de Design Premium - Hôtel de Silly © 2025
                    </p>
                    <LuxuryDivider className="mt-6" />
                </div>
            </section>
        </main>
    );
}
