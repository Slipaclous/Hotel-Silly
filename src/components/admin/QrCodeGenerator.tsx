'use client';

import { useState } from 'react';
import { QrCode, Link as LinkIcon, Download, Copy, Check, RefreshCw, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminWrapper from './AdminWrapper';

export default function QrCodeGenerator() {
    const [url, setUrl] = useState('https://');
    const [copied, setCopied] = useState(false);
    const [generating, setGenerating] = useState(false);

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(url || ' ')}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        // Direct opening in new tab as bypass for CORS fetch issues
        window.open(qrUrl, '_blank');
    };

    return (
        <AdminWrapper
            title="Générateur de QR Code"
            description="Créez des QR codes personnalisés pour vos supports de communication."
        >
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    {/* Formulaire */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white/80 backdrop-blur-xl p-8 rounded-[32px] border border-noir/5 shadow-xl space-y-6"
                    >
                        <div className="space-y-4">
                            <label className="text-[10px] font-bold text-noir/40 uppercase tracking-[0.2em] ml-1 flex items-center">
                                <LinkIcon className="w-3 h-3 mr-2" />
                                URL de destination
                            </label>
                            <div className="relative group">
                                <input
                                    type="url"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="Ex: https://google.com"
                                    className="w-full bg-noir/[0.02] border border-noir/10 text-noir px-6 py-4 rounded-2xl focus:ring-2 focus:ring-or/10 focus:border-or/40 outline-none transition-all duration-300 font-medium"
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex space-x-2">
                                    <button
                                        onClick={() => setUrl('https://')}
                                        className="p-2 text-noir/20 hover:text-or transition-colors"
                                        title="Réinitialiser"
                                    >
                                        <RefreshCw className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <p className="text-[10px] text-noir/30 italic ml-1">
                                Entrez l'adresse internet vers laquelle le QR code doit pointer.
                            </p>
                        </div>

                        <div className="pt-4 flex flex-wrap gap-3">
                            <button
                                onClick={handleCopy}
                                className="flex-1 min-w-[140px] flex items-center justify-center space-x-2 px-6 py-4 bg-noir text-white rounded-2xl hover:bg-noir/80 transition-all font-bold text-[11px] uppercase tracking-widest"
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-4 h-4" />
                                        <span>Copié !</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4" />
                                        <span>Copier l'URL</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>

                    {/* Aperçu QR Code */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col items-center space-y-6"
                    >
                        <div className="relative group p-4 bg-white rounded-[40px] shadow-2xl border border-noir/5 group">
                            {/* Decorative frames */}
                            <div className="absolute -inset-2 bg-gradient-to-br from-or/20 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                            <div className="relative bg-white p-6 rounded-[32px] overflow-hidden border border-noir/5">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={qrUrl}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                        className="w-64 h-64 bg-white flex items-center justify-center"
                                    >
                                        <img
                                            src={qrUrl}
                                            alt="QR Code Preview"
                                            className="w-full h-full object-contain"
                                            onLoad={() => setGenerating(false)}
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Corner Accents */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-or/20 rounded-tl-[40px]" />
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-or/20 rounded-br-[40px]" />
                        </div>

                        <div className="flex flex-col items-center space-y-4 w-full">
                            <button
                                onClick={handleDownload}
                                className="w-full flex items-center justify-center space-x-3 px-8 py-5 bg-gradient-to-r from-or to-[#C6ad7a] text-white rounded-2xl hover:shadow-[0_20px_40px_rgba(198,173,122,0.3)] transition-all font-bold text-[11px] uppercase tracking-[0.2em]"
                            >
                                <Download className="w-4 h-4" />
                                <span>Ouvrir en Haute Résolution (pour clic droit {'>'} Enregistrer)</span>
                            </button>

                            <div className="flex items-center space-x-2 text-[10px] text-noir/30 font-bold uppercase tracking-widest">
                                <Wand2 className="w-3 h-3" />
                                <span>Prêt pour l'impression</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Information Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-or/5 border border-or/10 p-8 rounded-[32px]"
                >
                    <div className="flex items-start space-x-6">
                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center border border-or/20 shadow-sm shrink-0">
                            <QrCode className="w-6 h-6 text-or" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-sm font-bold text-noir uppercase tracking-wider">Conseil d'utilisation</h3>
                            <p className="text-sm text-noir/60 leading-relaxed font-body">
                                Les QR codes sont parfaits pour vos cartes de visite, menus de restaurant, ou affiches.
                                Assurez-vous de toujours tester le code avec votre téléphone avant de lancer une impression en série.
                                Pour une lecture optimale, gardez un contraste élevé entre le code et l'arrière-plan.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AdminWrapper>
    );
}
