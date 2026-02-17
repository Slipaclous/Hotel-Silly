'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X, Settings as SettingsIcon } from 'lucide-react';
import { Link } from '@/i18n/routing';

export default function CookieConsent() {
    const t = useTranslations('cookies');
    const [isVisible, setIsVisible] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [preferences, setPreferences] = useState({
        essential: true,
        analytics: true,
        marketing: false
    });

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            setIsVisible(true);
        } else {
            try {
                const savedPrefs = JSON.parse(consent);
                setPreferences(savedPrefs);
            } catch (e) {
                setIsVisible(true);
            }
        }

        const handleOpenSettings = () => {
            setIsVisible(true);
            setShowSettings(true);
        };

        window.addEventListener('open-cookie-settings', handleOpenSettings);
        return () => window.removeEventListener('open-cookie-settings', handleOpenSettings);
    }, []);

    const handleAcceptAll = () => {
        const allPrefs = { essential: true, analytics: true, marketing: true };
        localStorage.setItem('cookie-consent', JSON.stringify(allPrefs));
        setPreferences(allPrefs);
        setIsVisible(false);
    };

    const handleDeclineAll = () => {
        const minimalPrefs = { essential: true, analytics: false, marketing: false };
        localStorage.setItem('cookie-consent', JSON.stringify(minimalPrefs));
        setPreferences(minimalPrefs);
        setIsVisible(false);
    };

    const handleSavePreferences = () => {
        localStorage.setItem('cookie-consent', JSON.stringify(preferences));
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className="fixed bottom-0 left-0 right-0 z-[2000] p-4 md:p-6 pointer-events-none"
            >
                <div className="max-w-7xl mx-auto pointer-events-auto">
                    <div className="bg-[#2c3840] border border-white/10 shadow-2xl p-6 md:p-8 relative overflow-hidden">
                        {/* Motif de grain subtil en fond */}
                        <div className="absolute inset-0 bg-grain opacity-5 pointer-events-none" />

                        {!showSettings ? (
                            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 max-w-4xl text-center md:text-left">
                                    <div className="flex-shrink-0 w-12 h-12 border border-[#C6ad7a]/30 flex items-center justify-center text-[#C6ad7a]">
                                        <Shield className="w-6 h-6" />
                                    </div>

                                    <div>
                                        <h3 className="font-display text-2xl text-white mb-2 italic">{t('title')}</h3>
                                        <p className="text-white/70 text-sm leading-relaxed font-body">
                                            {t('description')}{' '}
                                            <Link
                                                href="/politique-confidentialite"
                                                className="text-[#C6ad7a] hover:text-white transition-colors underline underline-offset-4"
                                            >
                                                {t('learnMore')}
                                            </Link>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap justify-center gap-4 flex-shrink-0">
                                    <button
                                        onClick={() => setShowSettings(true)}
                                        className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-[#C6ad7a] transition-colors flex items-center gap-2"
                                    >
                                        <SettingsIcon className="w-4 h-4" />
                                        {t('settings')}
                                    </button>
                                    <button
                                        onClick={handleDeclineAll}
                                        className="px-6 py-3 text-xs font-bold uppercase tracking-widest border border-white/20 text-white hover:bg-white/10 transition-all duration-300"
                                    >
                                        {t('decline')}
                                    </button>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleAcceptAll}
                                        className="px-8 py-3 text-xs font-bold uppercase tracking-widest bg-[#C6ad7a] text-white hover:bg-white hover:text-[#2c3840] transition-all duration-500 shadow-lg"
                                    >
                                        {t('acceptAll')}
                                    </motion.button>
                                </div>
                            </div>
                        ) : (
                            <div className="relative z-10 space-y-8">
                                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                    <h3 className="font-display text-3xl text-white italic">{t('settings')}</h3>
                                    <button
                                        onClick={() => setShowSettings(false)}
                                        className="p-2 text-white/50 hover:text-white transition-colors border border-white/10"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="p-6 border border-white/10 bg-white/5 relative group">
                                        <div className="flex justify-between items-start mb-4">
                                            <h4 className="font-display text-xl text-white">{t('essential')}</h4>
                                            <div className="w-8 h-4 bg-[#C6ad7a]/50 relative transition-colors">
                                                <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white" />
                                            </div>
                                        </div>
                                        <p className="text-xs text-white/50 font-body leading-relaxed">{t('essentialDesc')}</p>
                                    </div>

                                    <div
                                        onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                                        className={`p-6 border transition-all duration-300 cursor-pointer group ${preferences.analytics ? 'border-[#C6ad7a] bg-[#C6ad7a]/5' : 'border-white/10 bg-white/5 hover:border-white/30'}`}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <h4 className="font-display text-xl text-white">{t('analytics')}</h4>
                                            <div className={`w-8 h-4 relative transition-colors ${preferences.analytics ? 'bg-[#C6ad7a]' : 'bg-white/10'}`}>
                                                <div className={`absolute top-0.5 w-3 h-3 bg-white transition-all ${preferences.analytics ? 'right-0.5' : 'left-0.5'}`} />
                                            </div>
                                        </div>
                                        <p className="text-xs text-white/50 font-body leading-relaxed">{t('analyticsDesc')}</p>
                                    </div>

                                    <div
                                        onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                                        className={`p-6 border transition-all duration-300 cursor-pointer group ${preferences.marketing ? 'border-[#C6ad7a] bg-[#C6ad7a]/5' : 'border-white/10 bg-white/5 hover:border-white/30'}`}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <h4 className="font-display text-xl text-white">{t('marketing')}</h4>
                                            <div className={`w-8 h-4 relative transition-colors ${preferences.marketing ? 'bg-[#C6ad7a]' : 'bg-white/10'}`}>
                                                <div className={`absolute top-0.5 w-3 h-3 bg-white transition-all ${preferences.marketing ? 'right-0.5' : 'left-0.5'}`} />
                                            </div>
                                        </div>
                                        <p className="text-xs text-white/50 font-body leading-relaxed">{t('marketingDesc')}</p>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4">
                                    <button
                                        onClick={() => setShowSettings(false)}
                                        className="px-8 py-3 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-all underline underline-offset-4"
                                    >
                                        {t('back')}
                                    </button>
                                    <button
                                        onClick={handleSavePreferences}
                                        className="px-10 py-3 text-xs font-bold uppercase tracking-widest bg-[#C6ad7a] text-white hover:bg-white hover:text-[#2c3840] transition-all duration-500 shadow-lg"
                                    >
                                        {t('save')}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
