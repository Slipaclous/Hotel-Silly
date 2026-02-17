'use client';

type Locale = 'fr' | 'en' | 'nl';

interface LanguageTabsProps {
    currentLocale: Locale;
    onChange: (locale: Locale) => void;
}

export default function LanguageTabs({ currentLocale, onChange }: LanguageTabsProps) {
    const languages: { code: Locale; label: string; flag: string }[] = [
        { code: 'fr', label: 'Français', flag: '🇫🇷' },
        { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
        { code: 'en', label: 'English', flag: '🇬🇧' },
    ];

    return (
        <div className="flex bg-slate-100/50 backdrop-blur-sm p-1.5 rounded-2xl border border-slate-200/60 mb-10 w-fit shadow-inner">
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    type="button"
                    onClick={() => onChange(lang.code)}
                    className={`flex items-center space-x-2.5 px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-500 relative ${currentLocale === lang.code
                        ? 'bg-white text-slate-900 shadow-[0_4px_12px_rgba(0,0,0,0.08)] ring-1 ring-slate-200 active:scale-95'
                        : 'text-slate-400 hover:text-slate-600 hover:bg-slate-200/50'
                        }`}
                >
                    <span className="text-lg filter grayscale-[0.2]">{lang.flag}</span>
                    <span className="relative z-10">{lang.label}</span>
                    {currentLocale === lang.code && (
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-or rounded-full" />
                    )}
                </button>
            ))}
        </div>
    );
}
