import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function CGV() {
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
                        {t('terms')}
                    </h1>

                    <div className="prose prose-slate max-w-none font-body text-noir/70 space-y-8">
                        <section>
                            <h2 className="text-xl font-display text-noir mb-4 uppercase tracking-wider">OBJET</h2>
                            <p>
                                Les présentes Conditions Générales de Vente régissent les réservations effectuées auprès de l'établissement Villa Dolce Silly.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-display text-noir mb-4 uppercase tracking-wider">RÉSERVATIONS</h2>
                            <p>
                                Toute réservation est considérée comme ferme après confirmation par l'établissement. Un acompte peut être demandé selon la période et le type de séjour.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-display text-noir mb-4 uppercase tracking-wider">ANNULATION</h2>
                            <p>
                                Les conditions d'annulation varient selon le tarif choisi. En cas d'annulation tardive ou de non-présentation, des frais peuvent être appliqués.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-display text-noir mb-4 uppercase tracking-wider">PRIX ET PAIEMENT</h2>
                            <p>
                                Les prix sont indiqués en Euros et incluent la TVA. La taxe de séjour est en supplément. Le paiement s'effectue sur place ou via notre plateforme sécurisée.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
