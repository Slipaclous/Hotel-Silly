'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
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

interface SeminarPageData {
    introTitle: string;
    introTitleEn?: string | null;
    introTitleNl?: string | null;
    introDesc: string;
    introDescEn?: string | null;
    introDescNl?: string | null;
    imageUrl: string;
}

interface SeminarFeatureData {
    id: number;
    title: string;
    titleEn?: string | null;
    titleNl?: string | null;
    description: string;
    descriptionEn?: string | null;
    descriptionNl?: string | null;
    icon: string;
    type: string;
    order: number;
}

interface SeminarPackageData {
    id: number;
    title: string;
    titleEn?: string | null;
    titleNl?: string | null;
    description: string;
    descriptionEn?: string | null;
    descriptionNl?: string | null;
    price?: string | null;
    details: string[];
    detailsEn: string[];
    detailsNl: string[];
    isRecommended: boolean;
    order: number;
}

interface SeminairesContentProps {
    pageHero: PageHero | null;
    initialData?: SeminarPageData | null;
    initialFeatures?: SeminarFeatureData[];
    initialPackages?: SeminarPackageData[];
}

export default function SeminairesContent({ pageHero, initialData, initialFeatures, initialPackages }: SeminairesContentProps) {
    const locale = useLocale();
    const t = useTranslations('seminars');

    const getLocalized = (fr: string, en?: string | null, nl?: string | null) => {
        if (locale === 'nl') return nl || fr;
        if (locale === 'en') return en || fr;
        return fr;
    };

    const icons = { Users, Wifi, Monitor, Coffee, Clock, CheckCircle };

    const renderedFeatures = (initialFeatures && initialFeatures.length > 0)
        ? initialFeatures.filter(f => f.type === 'atout').map(f => ({
            icon: (icons as any)[f.icon] || CheckCircle,
            title: getLocalized(f.title, f.titleEn, f.titleNl),
            description: getLocalized(f.description, f.descriptionEn, f.descriptionNl)
        }))
        : [
            { icon: Users, title: t('features.capacity'), description: t('features.capacityDesc') },
            { icon: Monitor, title: t('features.projection'), description: t('features.projectionDesc') },
            { icon: Wifi, title: t('features.wifi'), description: t('features.wifiDesc') },
            { icon: Coffee, title: t('features.coffee'), description: t('features.coffeeDesc') }
        ];

    const checkpoints = (initialFeatures && initialFeatures.length > 0)
        ? initialFeatures.filter(f => f.type === 'checkpoint').map(f => ({
            title: getLocalized(f.title, f.titleEn, f.titleNl),
            description: getLocalized(f.description, f.descriptionEn, f.descriptionNl)
        }))
        : [
            { title: t('checkPoints.flexibility'), description: t('checkPoints.flexibilityDesc') },
            { title: t('checkPoints.equipment'), description: t('checkPoints.equipmentDesc') },
            { title: t('checkPoints.setting'), description: t('checkPoints.settingDesc') }
        ];

    return (
        <>
            {/* Hero Section */}
            <section id="hero" data-nav-section={pageHero ? (locale === 'en' ? (pageHero.titleEn || pageHero.title) : locale === 'nl' ? (pageHero.titleNl || pageHero.title) : pageHero.title) : t('heroTitle')} data-nav-is-dark="true" className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-[#2c3840]">
                {/* Image de fond */}
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

                {/* Decorative Pattern */}
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #C6ad7a 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

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
                    <div id="space" data-nav-section={initialData ? getLocalized(initialData.introTitle, initialData.introTitleEn, initialData.introTitleNl) : t('spaceTitle')} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                        <div>
                            <div className="w-12 h-px bg-[#C6ad7a] mb-6"></div>

                            <h2 className="font-display text-4xl sm:text-5xl font-medium text-[#2c3840] mb-6">
                                {initialData ? getLocalized(initialData.introTitle, initialData.introTitleEn, initialData.introTitleNl) : t('spaceTitle')}
                            </h2>

                            <p className="font-body text-lg text-[#2c3840]/70 mb-8 leading-relaxed">
                                {initialData ? getLocalized(initialData.introDesc, initialData.introDescEn, initialData.introDescNl) : t('spaceDesc')}
                            </p>

                            <div className="space-y-6">
                                {checkpoints.map((cp, i) => (
                                    <div key={i} className="flex items-start space-x-3 group">
                                        <CheckCircle className="w-6 h-6 text-[#C6ad7a] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                        <div>
                                            <h3 className="font-body text-base font-medium text-[#2c3840] mb-1">
                                                {cp.title}
                                            </h3>
                                            <p className="font-body text-sm text-[#2c3840]/60">
                                                {cp.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="relative h-[500px] overflow-hidden shadow-elegant">
                                <div
                                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
                                    style={{
                                        backgroundImage: `url('${initialData?.imageUrl || 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}')`
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div
                        id="features"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24"
                    >
                        {renderedFeatures.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div key={index} className="text-center group">
                                    <div className="w-16 h-16 border border-[#2c3840]/20 flex items-center justify-center mx-auto mb-6 group-hover:border-[#C6ad7a] group-hover:bg-[#C6ad7a]/5 transition-all duration-300">
                                        <Icon className="w-7 h-7 text-[#C6ad7a] group-hover:rotate-6 transition-transform" />
                                    </div>
                                    <h3 className="font-display text-xl font-medium text-[#2c3840] mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="font-body text-sm text-[#2c3840]/70 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Pricing Options */}
                    <div id="pricing" className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
                        {(initialPackages && initialPackages.length > 0) ? (
                            initialPackages.map((pkg) => (
                                <div key={pkg.id} className={`bg-white p-10 shadow-elegant relative border transition-all duration-500 ${pkg.isRecommended ? 'border-[#C6ad7a] border-2 ring-1 ring-[#C6ad7a]' : 'border-[#2c3840]/10'}`}>
                                    {pkg.isRecommended && (
                                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#C6ad7a] text-white px-4 py-1 font-body text-xs font-medium uppercase tracking-wider">
                                            {t('pricing.recommended')}
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="font-display text-3xl font-medium text-[#2c3840]">
                                            {getLocalized(pkg.title, pkg.titleEn, pkg.titleNl)}
                                        </h3>
                                        <Clock className="w-8 h-8 text-[#C6ad7a]" />
                                    </div>

                                    <p className="font-body text-sm text-[#2c3840]/60 mb-8">
                                        {getLocalized(pkg.description, pkg.descriptionEn, pkg.descriptionNl)}
                                    </p>

                                    <div className="space-y-4 mb-8">
                                        {((locale === 'en' ? (pkg.detailsEn.length > 0 ? pkg.detailsEn : pkg.details) : locale === 'nl' ? (pkg.detailsNl.length > 0 ? pkg.detailsNl : pkg.details) : pkg.details)).map((detail, i) => (
                                            <div key={i} className="flex items-center space-x-3">
                                                <div className="w-1.5 h-1.5 bg-[#C6ad7a] rounded-full"></div>
                                                <span className="font-body text-sm text-[#2c3840]/80">{detail}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Link
                                            href="/contact"
                                            className={`inline-block w-full text-center px-8 py-5 font-body text-xs font-bold uppercase tracking-widest transition-all duration-500 shadow-md hover:shadow-xl border ${pkg.isRecommended
                                                ? 'bg-[#C6ad7a] text-white hover:bg-[#2c3840] border-[#C6ad7a] hover:border-[#2c3840]'
                                                : 'bg-[#2c3840] text-white hover:bg-[#C6ad7a] border-[#2c3840] hover:border-[#C6ad7a]'
                                                }`}
                                        >
                                            {t('pricing.cta')}
                                        </Link>
                                    </motion.div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center col-span-full py-20 text-[#2c3840]/40 font-body text-sm italic">
                                Aucun forfait séminaire disponible pour le moment.
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}


