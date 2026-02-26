'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Award, Heart, Shield, Star, MapPin, Clock, Users } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

interface AboutData {
    title: string;
    titleEn?: string | null;
    titleNl?: string | null;
    description: string;
    descriptionEn?: string | null;
    descriptionNl?: string | null;
    keyPoint1Title: string;
    keyPoint1TitleEn?: string | null;
    keyPoint1TitleNl?: string | null;
    keyPoint1Text: string;
    keyPoint1TextEn?: string | null;
    keyPoint1TextNl?: string | null;
    keyPoint2Title: string;
    keyPoint2TitleEn?: string | null;
    keyPoint2TitleNl?: string | null;
    keyPoint2Text: string;
    keyPoint2TextEn?: string | null;
    keyPoint2TextNl?: string | null;
    keyPoint3Title: string;
    keyPoint3TitleEn?: string | null;
    keyPoint3TitleNl?: string | null;
    keyPoint3Text: string;
    keyPoint3TextEn?: string | null;
    keyPoint3TextNl?: string | null;
    openingYear: string;
    imageUrl: string;
    accessTitle?: string | null;
    accessTitleEn?: string | null;
    accessTitleNl?: string | null;
    accessSubtitle?: string | null;
    accessSubtitleEn?: string | null;
    accessSubtitleNl?: string | null;
    byTrain?: string | null;
    byTrainEn?: string | null;
    byTrainNl?: string | null;
    byCar?: string | null;
    byCarEn?: string | null;
    byCarNl?: string | null;
    byBus?: string | null;
    byBusEn?: string | null;
    byBusNl?: string | null;
    activities?: string[];
    activitiesEn?: string[];
    activitiesNl?: string[];
    lastSectionTitle?: string | null;
    lastSectionTitleEn?: string | null;
    lastSectionTitleNl?: string | null;
    lastSectionDescription?: string | null;
    lastSectionDescriptionEn?: string | null;
    lastSectionDescriptionNl?: string | null;
    value1Title?: string | null;
    value1TitleEn?: string | null;
    value1TitleNl?: string | null;
    value1Desc?: string | null;
    value1DescEn?: string | null;
    value1DescNl?: string | null;
    value2Title?: string | null;
    value2TitleEn?: string | null;
    value2TitleNl?: string | null;
    value2Desc?: string | null;
    value2DescEn?: string | null;
    value2DescNl?: string | null;
    value3Title?: string | null;
    value3TitleEn?: string | null;
    value3TitleNl?: string | null;
    value3Desc?: string | null;
    value3DescEn?: string | null;
    value3DescNl?: string | null;
}

interface Feature {
    icon: string;
    title: string;
    titleEn?: string | null;
    titleNl?: string | null;
    description: string;
    descriptionEn?: string | null;
    descriptionNl?: string | null;
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

const iconMap: Record<string, LucideIcon> = {
    'Award': Award,
    'Heart': Heart,
    'Shield': Shield,
    'Star': Star,
};

interface AboutContentProps {
    aboutData: AboutData | null;
    features: Feature[];
    pageHero: PageHero | null;
}

export default function AboutContent({ aboutData, features, pageHero }: AboutContentProps) {
    const locale = useLocale();
    const t = useTranslations('about');
    const c = useTranslations('common');

    const getLocalized = (fr: string, en?: string | null, nl?: string | null) => {
        if (locale === 'nl') return nl || fr;
        if (locale === 'en') return en || fr;
        return fr;
    };

    const data = aboutData || {
        title: 'Une Expérience Unique',
        description: "Notre hôtel de luxe va ouvrir ses portes au printemps 2025 dans le charmant village de Silly, au cœur de la Belgique. Chaque détail a été pensé pour offrir une expérience inoubliable dans un cadre d'exception.",
        keyPoint1Title: 'Emplacement idéal',
        keyPoint1Text: 'Au cœur de Silly, village pittoresque de la Région Wallonne, à proximité de Bruxelles et des principales attractions belges.',
        keyPoint2Title: 'Service personnalisé',
        keyPoint2Text: "Notre équipe dédiée s'engage à anticiper vos besoins et à rendre votre séjour exceptionnel.",
        keyPoint3Title: 'Équipements de luxe',
        keyPoint3Text: 'Chambres et suites équipées des dernières technologies et du confort le plus raffiné.',
        openingYear: '2025',
        imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    };

    const title = getLocalized(data.title, data.titleEn, data.titleNl);
    const description = getLocalized(data.description, data.descriptionEn, data.descriptionNl);
    const kp1Title = getLocalized(data.keyPoint1Title, data.keyPoint1TitleEn, data.keyPoint1TitleNl);
    const kp1Text = getLocalized(data.keyPoint1Text, data.keyPoint1TextEn, data.keyPoint1TextNl);
    const kp2Title = getLocalized(data.keyPoint2Title, data.keyPoint2TitleEn, data.keyPoint2TitleNl);
    const kp2Text = getLocalized(data.keyPoint2Text, data.keyPoint2TextEn, data.keyPoint2TextNl);
    const kp3Title = getLocalized(data.keyPoint3Title, data.keyPoint3TitleEn, data.keyPoint3TitleNl);
    const kp3Text = getLocalized(data.keyPoint3Text, data.keyPoint3TextEn, data.keyPoint3TextNl);

    // Nouvelles données dynamiques pour l'accès
    const accessTitle = getLocalized(data.accessTitle || '', data.accessTitleEn, data.accessTitleNl) || t('accessTitle');
    const accessSubtitle = getLocalized(data.accessSubtitle || '', data.accessSubtitleEn, data.accessSubtitleNl) || t('accessDesc');
    const byTrain = getLocalized(data.byTrain || '', data.byTrainEn, data.byTrainNl) || t('byTrainDesc');
    const byCar = getLocalized(data.byCar || '', data.byCarEn, data.byCarNl) || t('byCarDesc');
    const byBus = getLocalized(data.byBus || '', data.byBusEn, data.byBusNl) || t('byBusDesc');

    // Nouvelles données dynamiques pour les activités
    const activitiesData = locale === 'nl' ? data.activitiesNl : locale === 'en' ? data.activitiesEn : data.activities;
    const activities = activitiesData && activitiesData.length > 0 ? activitiesData : [0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => t(`activities.${i}`));

    // Nouvelles données dynamiques pour la dernière section (3 blocs)
    const value1Title = getLocalized(data.value1Title || '', data.value1TitleEn, data.value1TitleNl) || t('locationTitle');
    const value1Desc = getLocalized(data.value1Desc || '', data.value1DescEn, data.value1DescNl) || t('locationDesc');

    const value2Title = getLocalized(data.value2Title || '', data.value2TitleEn, data.value2TitleNl) || t('historyTitle');
    const value2Desc = getLocalized(data.value2Desc || '', data.value2DescEn, data.value2DescNl) || t('historyDesc', { year: data.openingYear });

    const value3Title = getLocalized(data.value3Title || '', data.value3TitleEn, data.value3TitleNl) || getLocalized(data.lastSectionTitle || '', data.lastSectionTitleEn, data.lastSectionTitleNl) || t('engagementTitle');
    const value3Desc = getLocalized(data.value3Desc || '', data.value3DescEn, data.value3DescNl) || getLocalized(data.lastSectionDescription || '', data.lastSectionDescriptionEn, data.lastSectionDescriptionNl) || t('engagementDesc');

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
                        {/* Overlay noir plus prononcé */}
                        <div className="absolute inset-0 bg-black/30"></div>
                    </>
                )}

                {/* Decorative Pattern */}
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #C6ad7a 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

                <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pt-24 lg:pt-32 mt-auto lg:mt-0">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <div className="w-12 h-px bg-[#C6ad7a] mx-auto mb-6"></div>
                        <h1 className="font-display text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-medium mb-6 text-[#C6ad7a]">
                            {pageHero ? (locale === 'en' ? (pageHero.titleEn || pageHero.title) : locale === 'nl' ? (pageHero.titleNl || pageHero.title) : pageHero.title) : t('heroTitle')}
                        </h1>
                        <p className="font-body text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                            {pageHero ? (locale === 'en' ? (pageHero.subtitleEn || pageHero.subtitle) : locale === 'nl' ? (pageHero.subtitleNl || pageHero.subtitle) : pageHero.subtitle) : t('heroSubtitle')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contenu Principal */}
            <section id="overview" data-nav-section={t('discovery')} className="py-24 bg-blanc">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                        {/* Contenu */}
                        <div>
                            <div className="w-12 h-px bg-or mb-6"></div>

                            <h2 className="font-display text-4xl sm:text-5xl font-medium text-noir mb-6">
                                {title}
                            </h2>

                            <p className="font-body text-lg text-noir/70 mb-10 leading-relaxed">
                                {description}
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="w-1 h-1 bg-or rounded-full mt-3 flex-shrink-0"></div>
                                    <p className="font-body text-base text-noir/80">
                                        <strong className="font-medium text-noir">{kp1Title}</strong> — {kp1Text}
                                    </p>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="w-1 h-1 bg-or rounded-full mt-3 flex-shrink-0"></div>
                                    <p className="font-body text-base text-noir/80">
                                        <strong className="font-medium text-noir">{kp2Title}</strong> — {kp2Text}
                                    </p>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="w-1 h-1 bg-or rounded-full mt-3 flex-shrink-0"></div>
                                    <p className="font-body text-base text-noir/80">
                                        <strong className="font-medium text-noir">{kp3Title}</strong> — {kp3Text}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="relative">
                            <div className="relative h-[500px] overflow-hidden">
                                <div
                                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                    style={{
                                        backgroundImage: `url('${data.imageUrl}')`
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Grille de caractéristiques */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
                        {features.map((feature) => {
                            const IconComponent = iconMap[feature.icon] || Award;
                            const fTitle = getLocalized(feature.title, feature.titleEn, feature.titleNl);
                            const fDesc = getLocalized(feature.description, feature.descriptionEn, feature.descriptionNl);
                            return (
                                <div key={fTitle} className="text-center">
                                    <div className="w-16 h-16 border border-noir/20 flex items-center justify-center mx-auto mb-6 hover:border-or transition-colors duration-300">
                                        <IconComponent className="w-7 h-7 text-or" />
                                    </div>
                                    <h3 className="font-display text-xl font-medium text-noir mb-3">
                                        {fTitle}
                                    </h3>
                                    <p className="font-body text-sm text-noir/70 leading-relaxed">
                                        {fDesc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Section Accès & Activités */}
                    <div id="access" data-nav-section={accessTitle} className="mb-24">
                        <div>
                            <div className="text-center mb-16">
                                <div className="w-12 h-px bg-or mx-auto mb-6"></div>
                                <h2 className="font-display text-4xl sm:text-5xl font-medium text-noir mb-6">
                                    {accessTitle}
                                </h2>
                                <p className="font-body text-lg text-noir/70 max-w-2xl mx-auto leading-relaxed">
                                    {accessSubtitle}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                                {/* Accès à l'hôtel */}
                                <div className="bg-blanc border border-noir/10 p-8">
                                    <h3 className="font-display text-2xl font-medium text-noir mb-6 flex items-center">
                                        <MapPin className="w-6 h-6 text-[var(--color-or)] mr-3" />
                                        {t('howToReach')}
                                    </h3>

                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="font-body text-base font-medium text-noir mb-3 flex items-center">
                                                <div className="w-2 h-2 bg-[var(--color-or)] rounded-full mr-3"></div>
                                                {t('byTrain')}
                                            </h4>
                                            <p className="font-body text-sm text-noir/70 ml-5 leading-relaxed whitespace-pre-wrap">
                                                {byTrain}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="font-body text-base font-medium text-noir mb-3 flex items-center">
                                                <div className="w-2 h-2 bg-[var(--color-or)] rounded-full mr-3"></div>
                                                {t('byCar')}
                                            </h4>
                                            <p className="font-body text-sm text-noir/70 ml-5 leading-relaxed whitespace-pre-wrap">
                                                {byCar}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="font-body text-base font-medium text-noir mb-3 flex items-center">
                                                <div className="w-2 h-2 bg-[var(--color-or)] rounded-full mr-3"></div>
                                                {t('byBus')}
                                            </h4>
                                            <p className="font-body text-sm text-noir/70 ml-5 leading-relaxed whitespace-pre-wrap">
                                                {byBus}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Activités à proximité */}
                                <div className="bg-[var(--color-blanc-200)] p-8">
                                    <h3 className="font-display text-2xl font-medium text-noir mb-6 flex items-center">
                                        <Star className="w-6 h-6 text-[var(--color-or)] mr-3" />
                                        {t('nearby')}
                                    </h3>

                                    <div className="grid grid-cols-1 gap-3">
                                        {activities.map((activity, i) => (
                                            <div key={i} className="flex items-start space-x-3">
                                                <div className="w-1.5 h-1.5 bg-or rounded-full mt-2 flex-shrink-0"></div>
                                                <span className="font-body text-sm text-noir/80">{activity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Carte Google Maps */}
                    <div className="mb-24">
                        <div className="relative w-full h-[450px] bg-blanc-200 border border-noir/10 overflow-hidden group">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2535.3986708465492!2d3.92135!3d50.6375333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c24f6f2648fb47%3A0x696b92f7dcce7c68!2sPl.%20Communale%209%2C%207830%20Silly!5e0!3m2!1sfr!2sbe!4v1714138138138!5m2!1sfr!2sbe"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Localisation Hôtel de Silly"
                                className="grayscale contrast-[1.1] opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                            ></iframe>
                            <div className="absolute inset-0 pointer-events-none border-[1px] border-noir/5"></div>
                        </div>
                    </div>

                    {/* Section Valeurs */}
                    <div id="values" data-nav-section={t('values')} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-blanc-200 p-8">
                            <div className="w-12 h-12 bg-noir flex items-center justify-center mb-6">
                                <MapPin className="w-6 h-6 text-blanc" />
                            </div>
                            <h3 className="font-display text-2xl font-medium text-noir mb-4">
                                {value1Title}
                            </h3>
                            <p className="font-body text-sm text-noir/70 leading-relaxed">
                                {value1Desc}
                            </p>
                        </div>

                        <div className="bg-blanc-200 p-8">
                            <div className="w-12 h-12 bg-noir flex items-center justify-center mb-6">
                                <Clock className="w-6 h-6 text-blanc" />
                            </div>
                            <h3 className="font-display text-2xl font-medium text-noir mb-4">
                                {value2Title}
                            </h3>
                            <p className="font-body text-sm text-noir/70 leading-relaxed">
                                {value2Desc}
                            </p>
                        </div>

                        <div className="bg-blanc-200 p-8">
                            <div className="w-12 h-12 bg-noir flex items-center justify-center mb-6">
                                <Users className="w-6 h-6 text-blanc" />
                            </div>
                            <h3 className="font-display text-2xl font-medium text-noir mb-4">
                                {value3Title}
                            </h3>
                            <p className="font-body text-sm text-noir/70 leading-relaxed">
                                {value3Desc}
                            </p>
                        </div>
                    </div>
                    <div id="footer" data-nav-section="Infos" data-nav-is-dark="true"></div>
                </div>
            </section>
        </>
    );
}
