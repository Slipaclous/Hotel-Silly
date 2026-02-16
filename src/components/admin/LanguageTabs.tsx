'use client';

type Locale = 'fr' | 'en' | 'nl';

interface LanguageTabsProps {
    currentLocale: Locale;
    onChange: (locale: Locale) => void;
}

export default function LanguageTabs({ currentLocale, onChange }: LanguageTabsProps) {
    const languages: { code: Locale; label: string; flag: string }[] = [
        { code: 'fr', label: 'Français', flag: '🇫🇷' },
        { code: 'en', label: 'English', flag: '🇬🇧' },
        { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
    ];

    return (
        <div className="flex bg-noir/[0.03] p-1 rounded-xl border border-noir/10 mb-8 w-fit">
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    type="button"
                    onClick={() => onChange(lang.code)}
                    className={`flex items-center space-x-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${currentLocale === lang.code
                            ? 'bg-white text-noir shadow-sm ring-1 ring-noir/5 translate-y-[-1px]'
                            : 'text-noir/40 hover:text-noir/60 hover:bg-white/50'
                        }`}
                >
                    <span className="text-base">{lang.flag}</span>
                    <span>{lang.label}</span>
                </button>
            ))}
        </div>
    );
}
