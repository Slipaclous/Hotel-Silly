'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function PolitiqueConfidentialite() {
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
                        {t('privacy')}
                    </h1>
                    <p className="font-body text-white/60 uppercase tracking-widest text-xs">Protection & Confidentialité</p>
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
                    {/* Responsable du traitement */}
                    <section>
                        <div className="flex items-center space-x-4 mb-8">
                            <span className="text-[#C6ad7a] font-display text-2xl italic">01.</span>
                            <h2 className="text-xl font-display text-noir uppercase tracking-widest border-b border-[#C6ad7a]/20 pb-2 flex-grow">
                                Responsable du traitement
                            </h2>
                        </div>
                        <div className="pl-12 space-y-3 text-noir/70 leading-relaxed">
                            <p>Les données personnelles collectées sur le Site sont traitées par :</p>
                            <p className="font-medium text-noir">SRL VILLA DOLCE</p>
                            <p>PLACE COMMUNALE 9, 7830 Silly, Belgique</p>
                            <p>
                                Email : <a href="mailto:info@dolcehotel-silly.com" className="text-[#C6ad7a] hover:underline">info@dolcehotel-silly.com</a>
                            </p>
                            <p>Téléphone : <span className="text-noir">+32 470 13 73 13</span></p>
                        </div>
                    </section>

                    {/* Données collectées */}
                    <section>
                        <div className="flex items-center space-x-4 mb-8">
                            <span className="text-[#C6ad7a] font-display text-2xl italic">02.</span>
                            <h2 className="text-xl font-display text-noir uppercase tracking-widest border-b border-[#C6ad7a]/20 pb-2 flex-grow">
                                Données collectées
                            </h2>
                        </div>
                        <div className="pl-12 text-noir/70 leading-relaxed space-y-4">
                            <p>Nous pouvons collecter les informations suivantes :</p>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                <li className="flex items-center space-x-2">
                                    <div className="w-1.5 h-1.5 bg-[#C6ad7a] rounded-full"></div>
                                    <span>Nom et prénom</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <div className="w-1.5 h-1.5 bg-[#C6ad7a] rounded-full"></div>
                                    <span>Adresse email</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <div className="w-1.5 h-1.5 bg-[#C6ad7a] rounded-full"></div>
                                    <span>Numéro de téléphone</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <div className="w-1.5 h-1.5 bg-[#C6ad7a] rounded-full"></div>
                                    <span>Données de réservation</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <div className="w-1.5 h-1.5 bg-[#C6ad7a] rounded-full"></div>
                                    <span>Adresse IP</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <div className="w-1.5 h-1.5 bg-[#C6ad7a] rounded-full"></div>
                                    <span>Données de navigation</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Finalités */}
                    <section>
                        <div className="flex items-center space-x-4 mb-8">
                            <span className="text-[#C6ad7a] font-display text-2xl italic">03.</span>
                            <h2 className="text-xl font-display text-noir uppercase tracking-widest border-b border-[#C6ad7a]/20 pb-2 flex-grow">
                                Finalités du traitement
                            </h2>
                        </div>
                        <div className="pl-12 text-noir/70 leading-relaxed space-y-4">
                            <p>Les données sont collectées afin de :</p>
                            <ul className="space-y-2 text-sm italic">
                                <li>— Gérer les réservations et les séjours</li>
                                <li>— Répondre aux demandes via le formulaire de contact</li>
                                <li>— Envoyer des communications marketing (si consentement préalable)</li>
                                <li>— Respecter nos obligations légales et réglementaires</li>
                                <li>— Améliorer l’expérience utilisateur sur le Site</li>
                            </ul>
                        </div>
                    </section>

                    {/* Base légale */}
                    <section>
                        <div className="flex items-center space-x-4 mb-8">
                            <span className="text-[#C6ad7a] font-display text-2xl italic">04.</span>
                            <h2 className="text-xl font-display text-noir uppercase tracking-widest border-b border-[#C6ad7a]/20 pb-2 flex-grow">
                                Base légale
                            </h2>
                        </div>
                        <div className="pl-12 text-noir/70 leading-relaxed">
                            <p>Les traitements reposent selon les cas sur : l’exécution d’un contrat, votre consentement, notre intérêt légitime ou le respect d’une obligation légale.</p>
                        </div>
                    </section>

                    {/* Droits des utilisateurs */}
                    <section>
                        <div className="flex items-center space-x-4 mb-8">
                            <span className="text-[#C6ad7a] font-display text-2xl italic">05.</span>
                            <h2 className="text-xl font-display text-noir uppercase tracking-widest border-b border-[#C6ad7a]/20 pb-2 flex-grow">
                                Vos droits (RGPD)
                            </h2>
                        </div>
                        <div className="pl-12 text-noir/70 leading-relaxed space-y-4 text-sm">
                            <p>
                                Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants : accès, rectification, effacement, limitation, opposition et portabilité.
                            </p>
                            <p>
                                Toute demande peut être adressée à : <a href="mailto:info@dolcehotel-silly.com" className="text-[#C6ad7a] hover:underline">info@dolcehotel-silly.com</a>.
                            </p>
                            <p className="pt-4 border-t border-gray-100">
                                Vous avez également le droit d’introduire une réclamation auprès de l'Autorité de Protection des Données :<br />
                                <span className="text-noir">Rue de la Presse 35, 1000 Bruxelles</span> — <a href="https://www.autoriteprotectiondonnees.be" target="_blank" className="text-[#C6ad7a] hover:underline">www.autoriteprotectiondonnees.be</a>
                            </p>
                        </div>
                    </section>

                    {/* Cookies Section */}
                    <section className="bg-gray-50 p-8 md:p-12">
                        <div className="flex items-center space-x-4 mb-8">
                            <h2 className="text-2xl font-display text-noir uppercase tracking-widest italic">
                                Politique relative aux cookies
                            </h2>
                        </div>
                        <div className="space-y-6 text-noir/70 leading-relaxed text-sm">
                            <p>
                                Le Site utilise des cookies afin d’améliorer l’expérience utilisateur et d’analyser la fréquentation.
                            </p>
                            <div className="space-y-4">
                                <p className="font-medium text-noir">Types de cookies utilisés :</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Cookies strictement nécessaires au fonctionnement du Site</li>
                                    <li>Cookies analytiques (fréquentation et performance)</li>
                                    <li>Cookies marketing (le cas échéant)</li>
                                </ul>
                            </div>
                            <p>
                                Lors de sa première visite, l’utilisateur peut accepter ou refuser les cookies non essentiels via le bandeau prévu à cet effet. Vous pouvez à tout moment modifier vos préférences via les paramètres de votre navigateur ou en cliquant sur le bouton de gestion des cookies en bas de page.
                            </p>
                        </div>
                    </section>
                </motion.div>
            </div>
        </main>
    );
}
