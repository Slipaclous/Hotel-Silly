'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function CGV() {
    const t = useTranslations('footer');

    return (
        <main className="min-h-screen bg-white">
            {/* Header Section */}
            <div className="bg-[#2c3840] pt-40 pb-24 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="w-12 h-px bg-[#C6ad7a] mx-auto mb-6"></div>
                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-4 italic">
                        {t('terms')}
                    </h1>
                    <p className="font-body text-white/60 uppercase tracking-widest text-xs">Conditions Générales de Réservation</p>
                </motion.div>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-32">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-20 font-body"
                >
                    <p className="text-noir/70 leading-relaxed italic text-center max-w-2xl mx-auto">
                        Les présentes conditions régissent les réservations effectuées auprès de la <span className="text-noir font-medium">SRL VILLA DOLCE</span>.
                    </p>

                    {/* Réservations */}
                    <section>
                        <div className="flex items-center space-x-4 mb-8">
                            <span className="text-[#C6ad7a] font-display text-2xl italic">01.</span>
                            <h2 className="text-xl font-display text-noir uppercase tracking-widest border-b border-[#C6ad7a]/20 pb-2 flex-grow">
                                Réservations
                            </h2>
                        </div>
                        <div className="pl-12 text-noir/70 leading-relaxed space-y-2">
                            <p>Toute réservation devient ferme après :</p>
                            <ul className="space-y-2 list-none">
                                <li className="flex items-center space-x-3">
                                    <div className="w-1.5 h-1.5 bg-[#C6ad7a] rounded-full"></div>
                                    <span>Confirmation écrite de l'établissement</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <div className="w-1.5 h-1.5 bg-[#C6ad7a] rounded-full"></div>
                                    <span>Paiement de la totalité de la prestation</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Paiement */}
                    <section>
                        <div className="flex items-center space-x-4 mb-8">
                            <span className="text-[#C6ad7a] font-display text-2xl italic">02.</span>
                            <h2 className="text-xl font-display text-noir uppercase tracking-widest border-b border-[#C6ad7a]/20 pb-2 flex-grow">
                                Paiement
                            </h2>
                        </div>
                        <div className="pl-12 text-noir/70 leading-relaxed">
                            <p>Le solde de la réservation doit être intégralement réglé au plus tard avant l’arrivée du client.</p>
                        </div>
                    </section>

                    {/* Annulation */}
                    <section>
                        <div className="flex items-center space-x-4 mb-8">
                            <span className="text-[#C6ad7a] font-display text-2xl italic">03.</span>
                            <h2 className="text-xl font-display text-noir uppercase tracking-widest border-b border-[#C6ad7a]/20 pb-2 flex-grow">
                                Annulation
                            </h2>
                        </div>
                        <div className="pl-12 text-noir/70 leading-relaxed space-y-6">
                            <p>En cas d'annulation par le client, les conditions suivantes s'appliquent :</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 border border-gray-100 bg-gray-50/50">
                                    <p className="text-[#C6ad7a] font-display text-lg mb-2">Plus de 24h avant l'arrivée</p>
                                    <p className="text-sm">Remboursement de <span className="text-noir font-bold">100 %</span> du montant versé.</p>
                                </div>
                                <div className="p-6 border border-gray-100 bg-gray-50/50">
                                    <p className="text-[#C6ad7a] font-display text-lg mb-2">Moins de 24h avant l'arrivée</p>
                                    <p className="text-sm">La <span className="text-noir font-bold">totalité</span> du montant est conservée par l'établissement.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Responsabilité */}
                    <section>
                        <div className="flex items-center space-x-4 mb-8">
                            <span className="text-[#C6ad7a] font-display text-2xl italic">04.</span>
                            <h2 className="text-xl font-display text-noir uppercase tracking-widest border-b border-[#C6ad7a]/20 pb-2 flex-grow">
                                Responsabilité du client
                            </h2>
                        </div>
                        <div className="pl-12 text-noir/70 leading-relaxed">
                            <p>Le client est personnellement responsable de tous les dommages, dégradations ou actes de vandalisme qui pourraient survenir de son fait ou du fait des personnes l'accompagnant durant la location.</p>
                        </div>
                    </section>

                    {/* Force majeure */}
                    <section>
                        <div className="flex items-center space-x-4 mb-8">
                            <span className="text-[#C6ad7a] font-display text-2xl italic">05.</span>
                            <h2 className="text-xl font-display text-noir uppercase tracking-widest border-b border-[#C6ad7a]/20 pb-2 flex-grow">
                                Force majeure
                            </h2>
                        </div>
                        <div className="pl-12 text-noir/70 leading-relaxed">
                            <p>La <span className="text-noir font-medium">SRL VILLA DOLCE</span> ne pourra être tenue responsable de l’inexécution ou de la mauvaise exécution de ses obligations en cas d’événement imprévisible, irrésistible et indépendant de sa volonté (force majeure).</p>
                        </div>
                    </section>

                    {/* Juridiction */}
                    <section>
                        <div className="flex items-center space-x-4 mb-8">
                            <span className="text-[#C6ad7a] font-display text-2xl italic">06.</span>
                            <h2 className="text-xl font-display text-noir uppercase tracking-widest border-b border-[#C6ad7a]/20 pb-2 flex-grow">
                                Droit applicable et Litiges
                            </h2>
                        </div>
                        <div className="pl-12 text-noir/70 leading-relaxed space-y-4 text-sm">
                            <p>Les présentes conditions sont régies par le droit belge.</p>
                            <p>
                                Tout litige relatif à leur interprétation ou exécution relève de la compétence exclusive des tribunaux de l’arrondissement du siège social de la <span className="text-noir font-medium">SRL VILLA DOLCE</span>.
                            </p>
                        </div>
                    </section>
                </motion.div>
            </div>
        </main>
    );
}
