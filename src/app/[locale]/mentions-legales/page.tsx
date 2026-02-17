import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function MentionsLegales() {
    const t = useTranslations('footer');

    return (
        <div className="min-h-screen bg-white pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="font-display text-4xl lg:text-5xl text-noir mb-12 border-b border-noir/10 pb-8">
                        {t('legal')}
                    </h1>

                    <div className="prose prose-slate max-w-none font-body text-noir/70 space-y-8">
                        <section>
                            <h2 className="text-xl font-display text-noir mb-4 uppercase tracking-wider">1. ÉDITION DU SITE</h2>
                            <p>
                                Le présent site est édité par l'Hôtel Villa Dolce Silly, dont le siège social est situé à :<br />
                                PLACE COMMUNALE 9, 7830 Silly, Belgique.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-display text-noir mb-4 uppercase tracking-wider">2. RESPONSABLE DE LA PUBLICATION</h2>
                            <p>
                                Directeur de la publication : Direction Villa Dolce Silly.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-display text-noir mb-4 uppercase tracking-wider">3. HÉBERGEMENT</h2>
                            <p>
                                Le site est hébergé par Vercel Inc., situé au 340 S Lemon Ave #1192 Walnut, CA 91789, USA.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-display text-noir mb-4 uppercase tracking-wider">4. PROPRIÉTÉ INTELLECTUELLE</h2>
                            <p>
                                L'ensemble de ce site relève de la législation belge et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
