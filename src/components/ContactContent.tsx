'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import { useState } from 'react';
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

interface ContactContentProps {
    pageHero: PageHero | null;
}

export default function ContactContent({ pageHero }: ContactContentProps) {
    const locale = useLocale();
    const t = useTranslations('contact');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                const errorMsg = data.details ? `${data.error} (${data.details})` : (data.error || 'Une erreur est survenue');
                throw new Error(errorMsg);
            }

            setSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });

            // On cache le message de succès après 5 secondes
            setTimeout(() => {
                setSubmitted(false);
            }, 5000);

        } catch (err: any) {
            console.error('Erreur client:', err);
            const errorMessage = err.message || 'Une erreur est survenue lors de l\'envoi du message.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const heroTitle = (locale === 'en' ? pageHero?.titleEn : locale === 'nl' ? pageHero?.titleNl : pageHero?.title) || t('heroTitle');
    const heroSubtitle = (locale === 'en' ? pageHero?.subtitleEn : locale === 'nl' ? pageHero?.subtitleNl : pageHero?.subtitle) || t('heroSubtitle');

    return (
        <>
            {/* Hero Section - Compact & Elegant */}
            <section id="hero" data-nav-section={pageHero ? (locale === 'en' ? (pageHero.titleEn || pageHero.title) : locale === 'nl' ? (pageHero.titleNl || pageHero.title) : pageHero.title) : heroTitle} data-nav-is-dark="true" className="relative h-[40vh] flex items-end justify-center pb-12 overflow-hidden bg-[#2c3840]">
                {/* Image de fond */}
                {pageHero?.imageUrl && (
                    <>
                        <Image
                            src={pageHero.imageUrl}
                            alt={heroTitle}
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

                <div className="relative z-10 text-center text-white pt-24 lg:pt-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="font-display text-5xl lg:text-7xl font-medium mb-4 text-[#C6ad7a]">{heroTitle}</h1>
                        <p className="font-body text-white/80 text-lg font-light tracking-wide">{heroSubtitle}</p>
                    </motion.div>
                </div>
            </section>

            <section id="form" data-nav-section={t('formTitle')} className="relative z-20 -mt-8 mb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row shadow-2xl bg-white">

                    {/* Left Side: Contact Info (Dark) */}
                    <div className="lg:w-2/5 bg-[#2c3840] text-white p-12 lg:p-16 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-or/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                        <div className="relative z-10 space-y-12 text-white">
                            <div>
                                <h3 className="font-display text-2xl mb-2 text-[#C6ad7a]">{t('infoTitle')}</h3>
                                <p className="font-body text-sm text-white/70 mb-8">{t('infoSubtitle')}</p>

                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <MapPin className="w-5 h-5 text-[#C6ad7a] mt-1" />
                                        <div>
                                            <p className="font-display text-lg text-white">{t('address')}</p>
                                            <p className="font-body text-sm text-white/70 leading-relaxed">
                                                PLACE COMMUNALE 9<br />
                                                7830 Silly, Belgique
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <Phone className="w-5 h-5 text-[#C6ad7a] mt-1" />
                                        <div>
                                            <p className="font-display text-lg text-white">{t('phone')}</p>
                                            <a href="tel:+32212345678" className="font-body text-sm text-white/70 hover:text-[#C6ad7a] transition-colors">
                                                +32 (0)2 123 45 67
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <Mail className="w-5 h-5 text-[#C6ad7a] mt-1" />
                                        <div>
                                            <p className="font-display text-lg text-white">{t('email')}</p>
                                            <a href="mailto:info@hoteldesilly.be" className="font-body text-sm text-white/70 hover:text-[#C6ad7a] transition-colors">
                                                info@dolcehotel-silly.com
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-white/10 pt-8">
                                <div className="flex items-start space-x-4">
                                    <Clock className="w-5 h-5 text-[#C6ad7a] mt-1" />
                                    <div>
                                        <h3 className="font-display text-xl mb-4 text-white">{t('hoursTitle')}</h3>
                                        <ul className="space-y-4 font-body text-sm text-white/70">
                                            <li>
                                                <p className="leading-relaxed max-w-xs">{t('hotelHours')}</p>
                                            </li>
                                            <li>
                                                <p className="font-display text-lg text-white mb-1">{t('breakfastLabel')}</p>
                                                <p className="leading-relaxed">{t('breakfastHours')}</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form (Light) */}
                    <div className="lg:w-3/5 bg-white p-12 lg:p-16">
                        <h2 className="font-display text-3xl sm:text-4xl text-[#2c3840] mb-8">{t('formTitle')}</h2>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-red-50 border border-red-200 text-red-600 p-4 mb-6 rounded-sm text-sm"
                            >
                                {error}
                            </motion.div>
                        )}

                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-or/10 border border-or/30 p-8 text-center"
                            >
                                <h3 className="font-display text-2xl text-[#2c3840] mb-2">{t('successTitle')}</h3>
                                <p className="font-body text-[#2c3840]/70">{t('successMessage')}</p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-6 text-sm underline hover:text-or text-[#2c3840]"
                                >
                                    {t('sendAnother')}
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-[#2c3840]/60">{t('nameLabel')}</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full border-b border-gray-400 py-3 text-gray-900 font-body bg-transparent focus:outline-none focus:border-or transition-colors placeholder:text-gray-400"
                                            placeholder={t('namePlaceholder')}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-[#2c3840]/60">{t('emailLabel')}</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full border-b border-gray-400 py-3 text-gray-900 font-body bg-transparent focus:outline-none focus:border-or transition-colors placeholder:text-gray-400"
                                            placeholder={t('emailPlaceholder')}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-xs font-bold uppercase tracking-widest text-[#2c3840]/60">{t('subjectLabel')}</label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full border-b border-gray-400 py-3 text-gray-900 font-body bg-transparent focus:outline-none focus:border-or transition-colors appearance-none cursor-pointer"
                                    >
                                        <option value="" className="bg-white text-gray-900">{t('subjectPlaceholder')}</option>
                                        <option value="reservation" className="bg-white text-gray-900">{t('subjects.reservation')}</option>
                                        <option value="event" className="bg-white text-gray-900">{t('subjects.event')}</option>
                                        <option value="question" className="bg-white text-gray-900">{t('subjects.question')}</option>
                                        <option value="other" className="bg-white text-gray-900">{t('subjects.other')}</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-[#2c3840]/60">{t('messageLabel')}</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={4}
                                        className="w-full border-b border-gray-400 py-3 text-gray-900 font-body bg-transparent focus:outline-none focus:border-or transition-colors resize-none placeholder:text-gray-400"
                                        placeholder={t('messagePlaceholder')}
                                    />
                                </div>

                                <div className="pt-4">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        disabled={loading}
                                        className="w-full md:w-auto bg-[#2c3840] text-white px-10 py-5 font-body text-xs font-bold uppercase tracking-widest hover:bg-[#C6ad7a] transition-all duration-500 flex items-center justify-center space-x-3 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl border border-[#2c3840] hover:border-[#C6ad7a]"
                                    >
                                        <span>{loading ? t('submitting') : t('submit')}</span>
                                        {!loading && <ArrowRight className="w-5 h-5" />}
                                    </motion.button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            <div id="footer" data-nav-section="Infos" data-nav-is-dark="true"></div>
        </>
    );
}
