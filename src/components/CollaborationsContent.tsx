'use client';

import { motion } from 'framer-motion';
import { Phone, Globe, ArrowRight, CheckCircle2, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

interface Collaboration {
    id: number;
    name: string;
    description: string[];
    descriptionEn: string[];
    descriptionNl: string[];
    phone: string | null;
    website: string | null;
    imageUrl: string;
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

export default function CollaborationsContent({ collaborations, pageHero }: { collaborations: Collaboration[], pageHero: PageHero | null }) {
    const locale = useLocale();
    const t = useTranslations('collaborations');

    const getLocalizedDescription = (collab: Collaboration) => {
        if (locale === 'nl') return collab.descriptionNl.length > 0 && collab.descriptionNl[0] !== '' ? collab.descriptionNl : collab.description;
        if (locale === 'en') return collab.descriptionEn.length > 0 && collab.descriptionEn[0] !== '' ? collab.descriptionEn : collab.description;
        return collab.description;
    };

    return (
        <>
            {/* Hero Section */}
            <section id="hero" data-nav-section={pageHero ? (locale === 'en' ? (pageHero.titleEn || pageHero.title) : locale === 'nl' ? (pageHero.titleNl || pageHero.title) : pageHero.title) : t('heroTitle')} data-nav-is-dark="true" className="relative h-[65vh] flex items-center justify-center overflow-hidden bg-[#1a252b] pt-20 lg:pt-32">
                {pageHero?.imageUrl ? (
                    <>
                        <Image
                            src={pageHero.imageUrl}
                            alt={pageHero ? (locale === 'en' ? (pageHero.titleEn || pageHero.title) : locale === 'nl' ? (pageHero.titleNl || pageHero.title) : pageHero.title) : t('heroTitle')}
                            fill
                            className="object-cover opacity-60"
                            priority
                            sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent"></div>
                    </>
                ) : (
                   <div className="absolute inset-0 bg-[#1a252b]" />
                )}

                {/* Decorative Elements */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #C6ad7a 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

                <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="w-16 h-0.5 bg-[#C6ad7a] mx-auto mb-10 shadow-[0_0_15px_rgba(198,173,122,0.5)]"></div>
                        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-medium mb-8 text-[#C6ad7a] drop-shadow-2xl">
                            {pageHero ? (locale === 'en' ? (pageHero.titleEn || pageHero.title) : locale === 'nl' ? (pageHero.titleNl || pageHero.title) : pageHero.title) : t('heroTitle')}
                        </h1>
                        <p className="font-body text-xl sm:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed font-light tracking-wide">
                            {pageHero ? (locale === 'en' ? (pageHero.subtitleEn || pageHero.subtitle) : locale === 'nl' ? (pageHero.subtitleNl || pageHero.subtitle) : pageHero.subtitle) : t('heroSubtitle')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Introduction Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-or/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto"
                    >
                        <div className="inline-flex items-center space-x-3 mb-6 bg-or/10 px-4 py-2 rounded-full border border-or/20 shadow-sm">
                            <Sparkles className="w-4 h-4 text-or" />
                            <span className="text-[10px] font-bold text-or uppercase tracking-[0.2em]">{t('introTitle')}</span>
                        </div>
                        <p className="font-body text-lg sm:text-xl text-slate-600 leading-relaxed italic font-light">
                            "{t('introDesc')}"
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Collaborations Grid */}
            <section className="pb-32 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {collaborations.length === 0 ? (
                        <div className="text-center py-24 bg-slate-50/50 rounded-[40px] border border-dashed border-slate-200">
                             <Globe className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                             <p className="text-slate-400 font-bold uppercase tracking-widest text-[11px]">{t('noCollaborations')}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-16 lg:gap-24">
                            {collaborations.map((collab, index) => (
                                <CollaborationCard key={collab.id} collab={collab} index={index} points={getLocalizedDescription(collab)} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Footer Decorative Section */}
            <section className="py-24 bg-[#f7f5ef] relative overflow-hidden group">
                {/* Geometric accents */}
                <div className="absolute top-0 right-0 w-96 h-96 border border-or/10 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute bottom-0 left-0 w-64 h-64 border border-or/5 rounded-full -translate-x-1/3 translate-y-1/3" />
                
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <Heart className="w-10 h-10 text-or/40 mx-auto mb-8 animate-pulse" />
                    <h2 className="font-display text-3xl sm:text-4xl font-medium text-slate-900 mb-6 drop-shadow-sm uppercase tracking-tight">
                        L&apos;Excellence se partage
                    </h2>
                    <div className="w-12 h-px bg-or mx-auto mb-8"></div>
                </div>
            </section>
        </>
    );
}

function CollaborationCard({ collab, index, points }: { collab: Collaboration, index: number, points: string[] }) {
    const t = useTranslations('collaborations');
    
    // Logic for button: website has priority, then phone.
    const buttonLink = collab.website || (collab.phone ? `tel:${collab.phone}` : null);
    const buttonLabel = collab.website ? t('visitWebsite') : t('call');
    const ButtonIcon = collab.website ? Globe : Phone;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.21, 0.45, 0.32, 0.9] }}
            className="flex flex-col group h-full"
        >
            <div className="relative aspect-[4/3] rounded-[48px] overflow-hidden mb-10 shadow-2xl shadow-slate-200/50 group-hover:shadow-or/10 transition-shadow duration-700">
                <Image
                    src={collab.imageUrl}
                    alt={collab.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>

            <div className="flex flex-col flex-1 px-4 lg:px-8">
                <div className="flex items-center space-x-4 mb-6">
                    <div className="h-px flex-1 bg-slate-100" />
                    <span className="text-[10px] font-bold text-or uppercase tracking-[0.3em] font-body bg-or/5 px-4 py-1.5 rounded-full border border-or/10 shadow-sm">
                        Partenaire d&apos;exception
                    </span>
                    <div className="h-px flex-1 bg-slate-100" />
                </div>

                <h3 className="font-display text-3xl sm:text-4xl font-medium text-slate-900 mb-8 group-hover:text-or transition-colors duration-500 tracking-tight text-center">
                    {collab.name}
                </h3>

                <div className="space-y-6 mb-12 flex-1">
                    {points.filter(p => p.trim() !== '').map((point, i) => (
                        <div key={i} className="flex items-start space-x-6 group/point">
                            <div className="relative flex-shrink-0 mt-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-or group-hover/point:scale-150 transition-transform duration-300" />
                                <div className="absolute inset-0 bg-or/40 blur-[4px] rounded-full scale-150 group-hover/point:scale-[2] transition-transform duration-300" />
                            </div>
                            <p className="font-body text-base text-slate-500 leading-relaxed font-light">
                                {point}
                            </p>
                        </div>
                    ))}
                </div>

                {buttonLink && (
                    <motion.div
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-4"
                    >
                        <a
                            href={buttonLink}
                            target={collab.website ? "_blank" : undefined}
                            rel={collab.website ? "noopener noreferrer" : undefined}
                            className="flex items-center justify-center space-x-4 w-full bg-slate-900 text-white px-10 py-6 rounded-3xl font-body text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-or transition-all duration-700 shadow-xl shadow-slate-200 group-hover:shadow-or/20 relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <ButtonIcon className="w-4 h-4 text-or group-hover:text-white transition-colors duration-500" />
                            <span>{buttonLabel}</span>
                            <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-700" />
                        </a>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}
