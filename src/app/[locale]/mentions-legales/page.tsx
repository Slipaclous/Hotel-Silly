'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function MentionsLegales() {
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
                        {t('legal')}
                    </h1>
                    <p className="font-body text-white/60 uppercase tracking-widest text-xs">Villa Dolce Silly — Excellence & Tradition</p>
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
                    {/* Identification */}
                    <section>
                        <div className="flex items-center space-x-4 mb-8">
                            <span className="text-[#C6ad7a] font-display text-2xl italic">01.</span>
                            <h2 className="text-xl font-display text-noir uppercase tracking-widest border-b border-[#C6ad7a]/20 pb-2 flex-grow">
                                Identification de l'entreprise
                            </h2>
                        </div>
                        <div className="pl-12 space-y-3 text-noir/70 leading-relaxed">
                            <p className="font-medium text-noir">VILLA DOLCE SRL</p>
                            <p>PLACE COMMUNALE 9, 7830 Silly, Belgique</p>
                            <p>Numéro d’entreprise : <span className="text-noir">1001.521.832 (BCE)</span></p>
                            <p>TVA : <span className="text-noir">BE 1001.521.832</span></p>
                            <p>
                                Email : <a href="mailto:info@dolcehotel-silly.com" className="text-[#C6ad7a] hover:underline transition-colors">info@dolcehotel-silly.com</a>
                            </p>
                            <p>Téléphone : <span className="text-noir">+32 470 13 73 13</span></p>
                        </div>
                    </section>

                    {/* Hébergement */}
                    <section>
                        <div className="flex items-center space-x-4 mb-8">
                            <span className="text-[#C6ad7a] font-display text-2xl italic">02.</span>
                            <h2 className="text-xl font-display text-noir uppercase tracking-widest border-b border-[#C6ad7a]/20 pb-2 flex-grow">
                                Hébergement
                            </h2>
                        </div>
                        <div className="pl-12 text-noir/70 leading-relaxed">
                            <p className="mb-2"><span className="text-noir font-medium">Hébergeur :</span> Vercel Inc.</p>
                            <p className="mb-2"><span className="text-noir font-medium">Adresse :</span> 340 S Lemon Ave #1192 Walnut, CA 91789, USA</p>
                            <p><span className="text-noir font-medium">Contact :</span> https://vercel.com</p>
                        </div>
                    </section>

                    {/* Responsabilité */}
                    <section>
                        <div className="flex items-center space-x-4 mb-8">
                            <span className="text-[#C6ad7a] font-display text-2xl italic">03.</span>
                            <h2 className="text-xl font-display text-noir uppercase tracking-widest border-b border-[#C6ad7a]/20 pb-2 flex-grow">
                                Responsabilité
                            </h2>
                        </div>
                        <div className="pl-12 space-y-4 text-noir/70 leading-relaxed text-sm">
                            <p>
                                Les informations publiées sur le Site Internet (<span className="text-noir">https://villa-dolce.be</span>) ainsi que leur présentation et leurs caractéristiques sont fournies à titre purement informatif et n’ont aucun caractère contractuel.
                            </p>
                            <p>
                                Ces informations ne constituent en aucun cas une déclaration, une garantie ou un engagement quelconque de la <span className="text-noir">SRL VILLA DOLCE</span> concernant un produit ou un service. En conséquence, la SRL VILLA DOLCE décline toute responsabilité, expresse ou implicite, quant à l’exactitude, la complétude, la fiabilité ou l’adéquation des informations à un usage particulier.
                            </p>
                            <p>
                                La SRL VILLA DOLCE s’efforce, dans la mesure de ses moyens, d’assurer l’exactitude et la mise à jour des informations diffusées sur le Site. Toutefois, elle ne garantit en aucune manière que les informations soient exactes, complètes, pertinentes ou constamment à jour.
                            </p>
                            <p>
                                La SRL VILLA DOLCE se réserve le droit de modifier, corriger ou supprimer, à tout moment et sans préavis, tout ou partie du contenu du Site. En tout état de cause, la SRL VILLA DOLCE ne saurait être tenue responsable des éventuelles erreurs ou omissions figurant sur le Site et invite l’Utilisateur à la contacter directement pour toute information complémentaire ou confirmation.
                            </p>
                        </div>
                    </section>

                    {/* Propriété Intellectuelle */}
                    <section>
                        <div className="flex items-center space-x-4 mb-8">
                            <span className="text-[#C6ad7a] font-display text-2xl italic">04.</span>
                            <h2 className="text-xl font-display text-noir uppercase tracking-widest border-b border-[#C6ad7a]/20 pb-2 flex-grow">
                                Propriété intellectuelle
                            </h2>
                        </div>
                        <div className="pl-12 space-y-4 text-noir/70 leading-relaxed text-sm">
                            <p>
                                Le Site ainsi que l’ensemble des éléments qui le composent, notamment les textes, arborescences, logiciels, animations, photographies, illustrations, images, logos, marques, dessins et modèles, ainsi que les éléments logiciels utilisés en relation avec le Site (ci-après le « Contenu »), sont susceptibles de contenir des informations confidentielles et sont protégés par les dispositions relatives à la propriété intellectuelle ou par toute autre législation applicable.
                            </p>
                            <p>
                                Sauf mention contraire, les droits de propriété intellectuelle afférents au Contenu sont la propriété exclusive de la <span className="text-noir font-medium">SRL VILLA DOLCE</span>. Aucune licence ni aucun autre droit, autre que celui de consulter le Site pour un usage strictement personnel et privé, n’est concédé à l’Utilisateur.
                            </p>
                            <p>
                                Toute reproduction, représentation, modification, publication, transmission ou dénaturation, totale ou partielle, du Contenu, par quelque procédé que ce soit et sur quelque support que ce soit, est strictement interdite sans l’autorisation préalable et écrite de la SRL VILLA DOLCE.
                            </p>
                            <p>
                                L’Utilisateur s’interdit notamment de copier, modifier, créer des œuvres dérivées, assembler, décompiler, céder, sous-licencier ou transférer, de quelque manière que ce soit, tout élément du Contenu ou du Site.
                            </p>
                            <p>
                                Tout lien simple ou hypertexte vers le Site est strictement interdit sans l’accord écrit et préalable de la SRL VILLA DOLCE. La société se réserve le droit d’exiger la suppression de tout lien non autorisé, à première demande.
                            </p>
                        </div>
                    </section>

                    {/* Crédits */}
                    <section>
                        <div className="flex items-center space-x-4 mb-8">
                            <span className="text-[#C6ad7a] font-display text-2xl italic">05.</span>
                            <h2 className="text-xl font-display text-noir uppercase tracking-widest border-b border-[#C6ad7a]/20 pb-2 flex-grow">
                                Crédits
                            </h2>
                        </div>
                        <div className="pl-12 text-noir/70 leading-relaxed">
                            <p><span className="text-noir font-medium">Crédit Photo :</span> Julien D’Hondt (@dhtproduction12)</p>
                            <p><span className="text-noir font-medium">Conception & Design :</span> Gauthier Minor</p>
                        </div>
                    </section>
                </motion.div>
            </div>
        </main>
    );
}
