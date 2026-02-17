'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Gift, Heart, Star, Check } from 'lucide-react';
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

interface GiftCardPageData {
    introTitle: string;
    introTitleEn?: string | null;
    introTitleNl?: string | null;
    introDesc: string;
    introDescEn?: string | null;
    introDescNl?: string | null;
    imageUrl: string;
    badgeText1: string;
    badgeText1En?: string | null;
    badgeText1Nl?: string | null;
    badgeText2: string;
    badgeText2En?: string | null;
    badgeText2Nl?: string | null;
    benefits: string[];
    benefitsEn: string[];
    benefitsNl: string[];
}

interface GiftCardPackageData {
    id: number;
    title: string;
    titleEn?: string | null;
    titleNl?: string | null;
    description: string;
    descriptionEn?: string | null;
    descriptionNl?: string | null;
    price: string;
    priceEn?: string | null;
    priceNl?: string | null;
    icon: string;
    isPopular: boolean;
}

interface CarteCadeauContentProps {
    pageHero: PageHero | null;
    initialData?: GiftCardPageData | null;
    initialPackages?: GiftCardPackageData[];
}

export default function CarteCadeauContent({ pageHero, initialData, initialPackages }: CarteCadeauContentProps) {
    const locale = useLocale();
    const t = useTranslations('giftCard');

    const getLocalized = (fr: string, en?: string | null, nl?: string | null) => {
        if (locale === 'nl') return nl || fr;
        if (locale === 'en') return en || fr;
        return fr;
    };

    const benefits = initialData ?
        (locale === 'en' ? (initialData.benefitsEn.length > 0 ? initialData.benefitsEn : initialData.benefits) :
            locale === 'nl' ? (initialData.benefitsNl.length > 0 ? initialData.benefitsNl : initialData.benefits) :
                initialData.benefits) :
        [
            t('benefits.stay'),
            t('benefits.anytime'),
            t('benefits.original'),
            t('benefits.custom'),
            t('benefits.validity'),
            t('benefits.transfer')
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
                    <div id="intro" data-nav-section={initialData ? getLocalized(initialData.introTitle, initialData.introTitleEn, initialData.introTitleNl) : t('introTitle')} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                        {/* Image */}
                        <div className="relative">
                            <div className="relative h-[500px] overflow-hidden shadow-elegant">
                                <div
                                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
                                    style={{
                                        backgroundImage: `url('${initialData?.imageUrl || 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}')`
                                    }}
                                />

                                {/* Badge décoratif */}
                                <div className="absolute top-8 right-8 bg-[#C6ad7a] text-white p-6 shadow-elegant z-10">
                                    <Heart className="w-8 h-8 mb-2" />
                                    <div className="font-display text-sm font-medium">
                                        {initialData ? getLocalized(initialData.badgeText1, initialData.badgeText1En, initialData.badgeText1Nl) : t('badge.gift')}
                                    </div>
                                    <div className="font-display text-sm font-medium">
                                        {initialData ? getLocalized(initialData.badgeText2, initialData.badgeText2En, initialData.badgeText2Nl) : t('badge.perfect')}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div>
                            <div className="w-12 h-px bg-[#C6ad7a] mb-6"></div>

                            <h2 className="font-display text-4xl sm:text-5xl font-medium text-[#2c3840] mb-6">
                                {initialData ? getLocalized(initialData.introTitle, initialData.introTitleEn, initialData.introTitleNl) : t('introTitle')}
                            </h2>

                            <p className="font-body text-lg text-[#2c3840]/70 mb-8 leading-relaxed">
                                {initialData ? getLocalized(initialData.introDesc, initialData.introDescEn, initialData.introDescNl) : t('introDesc')}
                            </p>

                            {/* Benefits List */}
                            <div className="space-y-4 mb-10">
                                {benefits.map((benefit, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start space-x-3"
                                    >
                                        <div className="w-6 h-6 border border-[#C6ad7a] flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Check className="w-4 h-4 text-[#C6ad7a]" />
                                        </div>
                                        <span className="font-body text-base text-[#2c3840]/80">{benefit}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-block"
                            >
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center space-x-3 bg-[#2c3840] text-white px-10 py-5 font-body text-sm font-medium hover:bg-[#C6ad7a] transition-all duration-500 shadow-lg hover:shadow-xl border border-[#2c3840] hover:border-[#C6ad7a] group"
                                >
                                    <Gift className="w-5 h-5 group-hover:rotate-12 transition-transform duration-500" />
                                    <span className="tracking-widest uppercase">{t('ctaMain')}</span>
                                </Link>
                            </motion.div>
                        </div>
                    </div>

                    {/* Gift Card Options */}
                    <div id="options" data-nav-section={t('optionsTitle')} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {(initialPackages && initialPackages.length > 0) ? (
                            initialPackages.map((pkg) => (
                                <div
                                    key={pkg.id}
                                    className={`bg-white p-8 card-hover text-center relative border transition-all duration-500 ${pkg.isPopular ? 'border-[#C6ad7a] border-2 shadow-xl' : 'border-[#2c3840]/10 shadow-sm'}`}
                                >
                                    {pkg.isPopular && (
                                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#C6ad7a] text-white px-4 py-1 font-body text-xs font-medium uppercase tracking-wider">
                                            {t('badge.popular')}
                                        </div>
                                    )}
                                    <div className={`w-16 h-16 flex items-center justify-center mx-auto mb-6 transition-colors duration-500 ${pkg.isPopular ? 'bg-[#C6ad7a]' : 'border-2 border-[#C6ad7a]'}`}>
                                        {pkg.icon === 'Star' ? (
                                            <Star className={`w-8 h-8 ${pkg.isPopular ? 'text-white' : 'text-[#C6ad7a]'}`} />
                                        ) : (
                                            <Heart className={`w-8 h-8 ${pkg.isPopular ? 'text-white' : 'text-[#C6ad7a]'}`} />
                                        )}
                                    </div>
                                    <h3 className="font-display text-2xl font-medium text-[#2c3840] mb-3">
                                        {getLocalized(pkg.title, pkg.titleEn, pkg.titleNl)}
                                    </h3>
                                    <p className="font-body text-sm text-[#2c3840]/60 mb-6 leading-relaxed">
                                        {getLocalized(pkg.description, pkg.descriptionEn, pkg.descriptionNl)}
                                    </p>
                                    <div className="font-display text-3xl font-medium text-[#C6ad7a] mb-6">
                                        {getLocalized(pkg.price, pkg.priceEn, pkg.priceNl)}
                                    </div>
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Link
                                            href="/contact"
                                            className={`inline-block w-full px-6 py-4 font-body text-xs font-bold uppercase tracking-widest transition-all duration-500 shadow-md hover:shadow-lg text-center border ${pkg.isPopular
                                                ? 'bg-[#C6ad7a] text-white hover:bg-[#2c3840] border-[#C6ad7a] hover:border-[#2c3840]'
                                                : 'bg-[#2c3840] text-white hover:bg-[#C6ad7a] border-[#2c3840] hover:border-[#C6ad7a]'
                                                }`}
                                        >
                                            {t('ctaOrder')}
                                        </Link>
                                    </motion.div>
                                </div>
                            ))
                        ) : (
                            // Fallback items (previous hardcoded items) if no dynamic data
                            <>
                                {/* Rest of the previous hardcoded items can stay as fallback or just empty */}
                                <div className="text-center col-span-full py-20 text-[#2c3840]/40 font-body text-sm italic">
                                    Aucun forfait disponible pour le moment.
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
