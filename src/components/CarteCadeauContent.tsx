'use client';

import { motion } from 'framer-motion';
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

interface CarteCadeauContentProps {
    pageHero: PageHero | null;
}

export default function CarteCadeauContent({ pageHero }: CarteCadeauContentProps) {
    const locale = useLocale();
    const t = useTranslations('giftCard');

    const getLocalized = (fr: string, en?: string | null, nl?: string | null) => {
        if (locale === 'nl') return nl || fr;
        if (locale === 'en') return en || fr;
        return fr;
    };

    const benefits = [
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
                    <div id="intro" data-nav-section={t('introTitle')} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
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
                                <div className="absolute top-8 right-8 bg-or text-white p-6 shadow-elegant">
                                    <Heart className="w-8 h-8 mb-2" />
                                    <div className="font-display text-sm font-medium">{t('badge.gift')}</div>
                                    <div className="font-display text-sm font-medium">{t('badge.perfect')}</div>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div>
                            <div className="w-12 h-px bg-or mb-6"></div>

                            <h2 className="font-display text-4xl sm:text-5xl font-medium text-noir mb-6">
                                {t('introTitle')}
                            </h2>

                            <p className="font-body text-lg text-noir/70 mb-8 leading-relaxed">
                                {t('introDesc')}
                            </p>

                            {/* Benefits List */}
                            <div className="space-y-4 mb-10">
                                {benefits.map((benefit, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start space-x-3"
                                    >
                                        <div className="w-6 h-6 border border-or flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Check className="w-4 h-4 text-or" />
                                        </div>
                                        <span className="font-body text-base text-noir/80">{benefit}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <Link
                                href="/contact"
                                className="inline-flex items-center space-x-3 bg-noir text-white px-8 py-4 font-body text-sm font-medium hover:bg-or hover:text-white transition-all duration-300 shadow-elegant group"
                            >
                                <Gift className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                                <span>{t('ctaMain')}</span>
                            </Link>
                        </div>
                    </div>

                    {/* Gift Card Options */}
                    <div id="options" data-nav-section={t('optionsTitle')} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Option 1 */}
                        <div className="bg-blanc border border-noir/10 p-8 card-hover text-center">
                            <div className="w-16 h-16 border-2 border-or flex items-center justify-center mx-auto mb-6">
                                <Star className="w-8 h-8 text-or" />
                            </div>
                            <h3 className="font-display text-2xl font-medium text-noir mb-3">
                                {t('package1.title')}
                            </h3>
                            <p className="font-body text-sm text-noir/60 mb-6 leading-relaxed">
                                {t('package1.desc')}
                            </p>
                            <div className="font-display text-3xl font-medium text-or mb-6">
                                {t('package1.price')}
                            </div>
                            <Link
                                href="/contact"
                                className="inline-block w-full bg-noir text-white px-6 py-3 font-body text-sm font-medium hover:bg-or transition-colors duration-300"
                            >
                                {t('ctaOrder')}
                            </Link>
                        </div>

                        {/* Option 2 */}
                        <div className="bg-blanc border-2 border-or p-8 card-hover text-center relative">
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-or text-white px-4 py-1 font-body text-xs font-medium uppercase tracking-wider">
                                {t('badge.popular')}
                            </div>
                            <div className="w-16 h-16 bg-or flex items-center justify-center mx-auto mb-6">
                                <Star className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="font-display text-2xl font-medium text-noir mb-3">
                                {t('package2.title')}
                            </h3>
                            <p className="font-body text-sm text-noir/60 mb-6 leading-relaxed">
                                {t('package2.desc')}
                            </p>
                            <div className="font-display text-3xl font-medium text-or mb-6">
                                {t('package2.price')}
                            </div>
                            <Link
                                href="/contact"
                                className="inline-block w-full bg-or text-white px-6 py-3 font-body text-sm font-medium hover:bg-noir transition-colors duration-300"
                            >
                                {t('ctaOrder')}
                            </Link>
                        </div>

                        {/* Option 3 */}
                        <div className="bg-blanc border border-noir/10 p-8 card-hover text-center">
                            <div className="w-16 h-16 border-2 border-or flex items-center justify-center mx-auto mb-6">
                                <Heart className="w-8 h-8 text-or" />
                            </div>
                            <h3 className="font-display text-2xl font-medium text-noir mb-3">
                                {t('package3.title')}
                            </h3>
                            <p className="font-body text-sm text-noir/60 mb-6 leading-relaxed">
                                {t('package3.desc')}
                            </p>
                            <div className="font-display text-3xl font-medium text-or mb-6">
                                {t('package3.price')}
                            </div>
                            <Link
                                href="/contact"
                                className="inline-block w-full bg-noir text-white px-6 py-3 font-body text-sm font-medium hover:bg-or transition-colors duration-300"
                            >
                                {t('ctaOrder')}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
