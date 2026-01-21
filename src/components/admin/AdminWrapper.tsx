'use client';

import { useState, ReactNode } from 'react';
import { Save, Eye, Info, ChevronRight, Layout, Monitor, Tablet, Smartphone, ExternalLink } from 'lucide-react';

interface AdminWrapperProps {
    title: string;
    description?: string;
    children: ReactNode;
    onSave?: () => void;
    saving?: boolean;
    message?: string;
    previewUrl?: string;
}

export default function AdminWrapper({
    title,
    description,
    children,
    onSave,
    saving,
    message,
    previewUrl,
}: AdminWrapperProps) {
    const [view, setView] = useState<'editor' | 'preview'>('editor');
    const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

    const deviceWidths = {
        desktop: 'w-full',
        tablet: 'max-w-[768px]',
        mobile: 'max-w-[375px]'
    };

    return (
        <div className="space-y-6 animate-fade-in font-body pb-20">
            {/* Grain Background Texture */}
            <div className="fixed inset-0 bg-grain pointer-events-none z-0" />

            {/* Breadcrumbs */}
            <div className="relative z-10 flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] text-noir/30 font-bold mb-2">
                <span>Administration</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-or">Éditeur</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-noir/60">{title}</span>
                <div className="ml-auto flex items-center space-x-4">
                    <span className="flex items-center space-x-1.5 text-emerald-500/60">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Système Actif</span>
                    </span>
                </div>
            </div>

            {/* Premium Header - Contrast & Visibilité Renforcés */}
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white border border-noir/15 p-6 lg:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden">
                <div className="flex items-center space-x-6">
                    <div className="w-14 h-14 rounded-2xl bg-noir flex items-center justify-center shadow-xl shrink-0 group">
                        <Layout className="w-6 h-6 text-or transition-transform group-hover:scale-110" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-display text-noir tracking-tight leading-none mb-2">{title}</h2>
                        {description && (
                            <p className="text-noir/50 font-body text-[11px] max-w-lg leading-relaxed italic">
                                {description}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    {previewUrl && (
                        <div className="flex  items-center bg-noir/[0.04] p-1.5 rounded-2xl border border-noir/10">
                            <button
                                onClick={() => setView(view === 'editor' ? 'preview' : 'editor')}
                                className={`px-6 py-3 rounded-xl transition-all flex items-center space-x-3 text-sm font-bold shadow-sm ${view === 'preview'
                                    ? 'bg-or text-white shadow-lg shadow-or/30 hover:bg-or/90'
                                    : 'bg-noir text-black shadow-lg shadow-noir/20 hover:bg-noir/90'
                                    }`}
                            >
                                {view === 'preview' ? <Layout className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                <span className="uppercase tracking-widest text-[10px]">
                                    {view === 'preview' ? 'Retour à l\'édition' : 'Voir le rendu'}
                                </span>
                            </button>
                            <a
                                href={previewUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-xl text-noir/60 hover:text-or hover:bg-white transition-all ml-1 shadow-sm border border-transparent hover:border-noir/5"
                                title="Nouvel onglet"
                            >
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    )}

                    {onSave && (
                        <button
                            onClick={onSave}
                            disabled={saving}
                            className="px-8 py-4 rounded-xl bg-or text-white font-body font-bold flex items-center space-x-3 hover:shadow-[0_15px_30px_rgba(198,173,122,0.3)] transition-all duration-300 disabled:opacity-50 shadow-md active:scale-95 border border-or/20"
                        >
                            <Save className={`w-4 h-4 ${saving ? 'animate-spin' : ''}`} />
                            <span className="uppercase tracking-widest text-[10px]">{saving ? 'Publication...' : 'Enregistrer'}</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Content Area */}
            <div className="relative z-10 min-h-[500px]">
                {view === 'editor' ? (
                    <div className="animate-fade-in max-w-5xl mx-auto lg:mx-0">
                        {/* Status Message */}
                        {message && (
                            <div className={`mb-6 p-4 rounded-xl border shadow-sm ${message.includes('✅')
                                ? 'bg-emerald-50 border-emerald-100 text-emerald-700'
                                : 'bg-red-50 border-red-100 text-red-700'
                                }`}>
                                <div className="flex items-center space-x-3">
                                    <Info className="w-4 h-4 shrink-0" />
                                    <span className="text-xs font-bold">{message}</span>
                                </div>
                            </div>
                        )}

                        <div className="bg-white border border-noir/5 rounded-[2.5rem] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.02)]">
                            <div className="p-8 lg:p-12">
                                {children}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="animate-slide-in-right bg-noir rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-noir/10 ring-1 ring-noir/20 flex flex-col h-[calc(100vh-180px)]">
                        {/* Device Selector - Visibilité Maximale */}
                        <div className="h-16 bg-noir flex items-center justify-between px-8 border-b border-white/10">
                            <div className="flex items-center space-x-6">
                                <span className="text-white/40 text-[9px] font-bold uppercase tracking-[0.2em]">Format d&apos;affichage</span>
                                <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
                                    <button
                                        onClick={() => setDevice('desktop')}
                                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${device === 'desktop' ? 'bg-or text-white shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                                    >
                                        <Monitor className="w-4 h-4 text-black" />
                                        <span className="text-[10px] font-bold text-black uppercase tracking-wider">Desktop</span>
                                    </button>
                                    <button
                                        onClick={() => setDevice('tablet')}
                                        className={`flex items-center space-x-2 px-4 py-2 text-black rounded-lg transition-all ${device === 'tablet' ? 'bg-or text-white shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                                    >
                                        <Tablet className="w-4 text-black h-4" />
                                        <span className="text-[10px] font-bold text-black uppercase tracking-wider">Tablette</span>
                                    </button>
                                    <button
                                        onClick={() => setDevice('mobile')}
                                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${device === 'mobile' ? 'bg-or text-white shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                                    >
                                        <Smartphone className="w-4 h-4 text-black" />
                                        <span className="text-[10px] font-bold text-black uppercase tracking-wider">Mobile</span>
                                    </button>
                                </div>
                            </div>
                            <div className="hidden md:flex items-center space-x-3">
                                <div className="flex items-center space-x-2 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[9px] text-emerald-500 font-bold uppercase tracking-widest">Temps Réel</span>
                                </div>
                            </div>
                        </div>

                        {/* Preview Iframe */}
                        <div className="flex-1 bg-noir/40 flex items-start justify-center overflow-auto custom-scrollbar p-6 lg:p-12">
                            <div className={`transition-all duration-700 h-full bg-white shadow-[0_50px_100px_rgba(0,0,0,0.5)] mx-auto overflow-hidden relative rounded-2xl ${deviceWidths[device]}`}>
                                <iframe
                                    src={previewUrl}
                                    className="w-full h-full border-none min-h-[1000px] pointer-events-auto"
                                    title="Site Preview"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
