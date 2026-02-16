'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function LanguageSwitcher({ isScrolled, isMenuOpen }: { isScrolled: boolean, isMenuOpen: boolean }) {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: 'fr', label: 'FR', flag: '🇫🇷' },
        { code: 'en', label: 'EN', flag: '🇬🇧' },
        { code: 'nl', label: 'NL', flag: '🇳🇱' },
    ];

    const handleLanguageChange = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale as any });
        setIsOpen(false);
    };

    const currentLang = languages.find(l => l.code === locale);

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border transition-all duration-300 ${(!isScrolled && !isMenuOpen)
                        ? 'border-white/20 text-white hover:bg-white/10'
                        : 'border-noir/10 text-noir hover:bg-noir/5'
                    }`}
            >
                <Globe className="w-3.5 h-3.5 opacity-60" />
                <span className="text-[10px] font-body font-bold tracking-widest uppercase">{currentLang?.label}</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full right-0 pt-2 z-50"
                    >
                        <div className="bg-white shadow-elegant border border-noir/5 py-1.5 w-32 rounded-lg overflow-hidden">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => handleLanguageChange(lang.code)}
                                    className={`w-full flex items-center space-x-3 px-4 py-2.5 text-[11px] font-body transition-colors duration-300 ${locale === lang.code
                                            ? 'bg-noir/[0.03] text-or font-bold'
                                            : 'text-noir hover:bg-noir/[0.02] hover:text-or'
                                        }`}
                                >
                                    <span className="text-sm">{lang.flag}</span>
                                    <span className="tracking-wider">{lang.code.toUpperCase()} — {lang.label === 'FR' ? 'Français' : lang.label === 'EN' ? 'English' : 'Nederlands'}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
