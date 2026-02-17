import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function PolitiqueConfidentialite() {
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
                        {t('privacy')}
                    </h1>

                    <div className="prose prose-slate max-w-none font-body text-noir/70 space-y-8">
                        <section>
                            <h2 className="text-xl font-display text-noir mb-4 uppercase tracking-wider">INTRODUCTION</h2>
                            <p>
                                La protection de vos données personnelles est une priorité pour Villa Dolce Silly. Cette politique de confidentialité vous informe sur la manière dont nous collectons et traitons vos données.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-display text-noir mb-4 uppercase tracking-wider">DONNÉES COLLECTÉES</h2>
                            <p>
                                Nous collectons les données que vous nous fournissez via nos formulaires de contact et de réservation (nom, email, téléphone, détails de réservation).
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-display text-noir mb-4 uppercase tracking-wider">UTILISATION DES DONNÉES</h2>
                            <p>
                                Vos données sont uniquement utilisées pour gérer vos réservations, répondre à vos demandes et vous informer sur nos services (si vous avez souscrit à notre newsletter).
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-display text-noir mb-4 uppercase tracking-wider">VOS DROITS</h2>
                            <p>
                                Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Vous pouvez nous contacter à tout moment pour exercer ces droits.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
