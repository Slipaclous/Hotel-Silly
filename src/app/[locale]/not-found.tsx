import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function NotFound() {
    const t = useTranslations('common');

    return (
        <div className="min-h-screen bg-blanc flex items-center justify-center px-4">
            <div className="text-center max-w-xl">
                <div className="w-16 h-px bg-or mx-auto mb-8"></div>
                <h1 className="font-display text-8xl md:text-9xl text-noir/10 mb-8 select-none">404</h1>
                <h2 className="font-display text-3xl md:text-4xl text-noir mb-6">
                    {t('notFoundTitle') || 'Page introuvable'}
                </h2>
                <p className="font-body text-lg text-noir/60 mb-10 leading-relaxed">
                    {t('notFoundDesc') || "Désolé, la page que vous recherchez semble avoir pris des vacances. Revenez à l'accueil pour explorer notre hôtel."}
                </p>
                <Link
                    href="/"
                    className="inline-block font-body text-xs font-bold uppercase tracking-widest px-12 py-5 bg-[#2c3840] text-white hover:bg-[#C6ad7a] transition-all duration-500 shadow-lg hover:shadow-2xl border border-[#2c3840] hover:border-[#C6ad7a]"
                >
                    {t('backToHome') || "Retour à l'accueil"}
                </Link>
            </div>
        </div>
    );
}
