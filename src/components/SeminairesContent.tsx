'use client';

import { motion } from 'framer-motion';
import { Users, Wifi, Monitor, Coffee, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';

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

interface SeminairesContentProps {
    pageHero: PageHero | null;
}

export default function SeminairesContent({ pageHero }: SeminairesContentProps) {
    const locale = useLocale();
    const t = useTranslations('seminars');

    const getLocalized = (fr: string, en?: string | null, nl?: string | null) => {
        if (locale === 'nl') return nl || fr;
        if (locale === 'en') return en || fr;
        return fr;
    };

    const features = [
        { icon: Users, title: t('features.capacity'), description: t('features.capacityDesc') },
        { icon: Monitor, title: t('features.projection'), description: t('features.projectionDesc') },
        { icon: Wifi, title: t('features.wifi'), description: t('features.wifiDesc') },
        { icon: Coffee, title: t('features.coffee'), description: t('features.coffeeDesc') }
    ];

    const coffeeCornerItems = [
        t('coffee.items.0'),
        t('coffee.items.1'),
        t('coffee.items.2'),
        t('coffee.items.3'),
        t('coffee.items.4')
    ];

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

            {/* Main Content */}
            <section className="py-24 bg-blanc">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Introduction */}
                    <div id="space" data-nav-section={t('spaceTitle')} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                        <div>
                            <div className="w-12 h-px bg-or mb-6"></div>

                            <h2 className="font-display text-4xl sm:text-5xl font-medium text-noir mb-6">
                                {t('spaceTitle')}
                            </h2>

                            <p className="font-body text-lg text-noir/70 mb-8 leading-relaxed">
                                {t('spaceDesc')}
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="w-6 h-6 text-or flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-body text-base font-medium text-noir mb-1">
                                            {t('checkPoints.flexibility')}
                                        </h3>
                                        <p className="font-body text-sm text-noir/60">
                                            {t('checkPoints.flexibilityDesc')}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="w-6 h-6 text-or flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-body text-base font-medium text-noir mb-1">
                                            {t('checkPoints.equipment')}
                                        </h3>
                                        <p className="font-body text-sm text-noir/60">
                                            {t('checkPoints.equipmentDesc')}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="w-6 h-6 text-or flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-body text-base font-medium text-noir mb-1">
                                            {t('checkPoints.setting')}
                                        </h3>
                                        <p className="font-body text-sm text-noir/60">
                                            {t('checkPoints.settingDesc')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
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
                        data-nav-section={t('features.capacity')}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24"
                    >
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div key={index} className="text-center">
                                    <div className="w-16 h-16 border border-noir/20 flex items-center justify-center mx-auto mb-6 hover:border-or transition-colors duration-300">
                                        <Icon className="w-7 h-7 text-or" />
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
                    <div id="pricing" data-nav-section={t('pricing.halfDay')} className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
                        {/* Demi-journée */}
                        <div className="bg-blanc border border-noir/10 p-10 shadow-elegant">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-display text-3xl font-medium text-noir">
                                    {t('pricing.halfDay')}
                                </h3>
                                <Clock className="w-8 h-8 text-or" />
                            </div>

                            <p className="font-body text-sm text-noir/60 mb-8">
                                {t('pricing.halfDayDesc')}
                            </p>

                            <div className="space-y-4 mb-8">
                                {[0, 1, 2].map((i) => (
                                    <div key={i} className="flex items-center space-x-3">
                                        <div className="w-1.5 h-1.5 bg-or rounded-full"></div>
                                        <span className="font-body text-sm text-noir/80">{t(`pricing.details.${i}`)}</span>
                                    </div>
                                ))}
                            </div>

                            <Link
                                href="/contact"
                                className="inline-block w-full text-center bg-noir text-white px-8 py-4 font-body text-sm font-medium hover:bg-or hover:text-white transition-all duration-300"
                            >
                                {t('pricing.cta')}
                            </Link>
                        </div>

                        {/* Journée complète */}
                        <div className="bg-blanc border-2 border-or p-10 shadow-elegant relative">
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-or text-white px-4 py-1 font-body text-xs font-medium uppercase tracking-wider">
                                {t('pricing.recommended')}
                            </div>

                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-display text-3xl font-medium text-noir">
                                    {t('pricing.fullDay')}
                                </h3>
                                <Clock className="w-8 h-8 text-or" />
                            </div>

                            <p className="font-body text-sm text-noir/60 mb-8">
                                {t('pricing.fullDayDesc')}
                            </p>

                            <div className="space-y-4 mb-8">
                                {[0, 1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center space-x-3">
                                        <div className="w-1.5 h-1.5 bg-or rounded-full"></div>
                                        <span className="font-body text-sm text-noir/80">{t(`pricing.details.${i}`)}</span>
                                    </div>
                                ))}
                            </div>

                            <Link
                                href="/contact"
                                className="inline-block w-full text-center bg-or text-white px-8 py-4 font-body text-sm font-medium hover:bg-noir hover:text-white transition-all duration-300"
                            >
                                {t('pricing.cta')}
                            </Link>
                        </div>
                    </div>

                    {/* Coffee Corner Section */}
                    <div id="coffee" data-nav-section={t('coffee.title')} className="bg-blanc-200 p-12">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center justify-center mb-8">
                                <Coffee className="w-12 h-12 text-or" />
                            </div>

                            <h2 className="font-display text-3xl font-medium text-noir text-center mb-6">
                                {t('coffee.title')}
                            </h2>

                            <p className="font-body text-base text-noir/70 text-center mb-10 leading-relaxed max-w-2xl mx-auto">
                                {t('coffee.desc')}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {coffeeCornerItems.map((item, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <CheckCircle className="w-5 h-5 text-or flex-shrink-0" />
                                        <span className="font-body text-sm text-noir/80">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="text-center mt-10">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center space-x-2 bg-noir text-white px-8 py-4 font-body text-sm font-medium hover:bg-or hover:text-white transition-all duration-300"
                                >
                                    <span>{t('coffee.cta')}</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
