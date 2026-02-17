'use client';

import { useState, ReactNode } from 'react';
import { Save, Eye, Info, Layout, Monitor, Tablet, Smartphone, ExternalLink, Settings, Bell, Sparkles } from 'lucide-react';

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
        <div className="font-body min-h-screen transition-all duration-500">
            {/* Ambient background effects - more refined for beige bg */}
            <div className="fixed top-0 right-0 w-[50vw] h-[50vh] bg-or/3 blur-[120px] rounded-full pointer-events-none -z-10" />
            <div className="fixed bottom-0 left-72 w-[40vw] h-[40vh] bg-slate-900/2 blur-[100px] rounded-full pointer-events-none -z-10" />

            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-[#e8e5dd] px-10 py-5 mb-12 flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                <div className="flex items-center space-x-6">
                    <div className="relative">
                        <div className="h-12 w-[2px] bg-gradient-to-b from-or/0 via-or to-or/0 rounded-full" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-or shadow-[0_0_10px_rgba(198,173,122,0.8)]" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 font-display tracking-tight leading-none uppercase">{title}</h2>
                        {description && (
                            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.15em] mt-2">{description}</p>
                        )}
                    </div>
                </div>

                <div className="flex items-center space-x-8">
                    {previewUrl && (
                        <div className="flex items-center bg-slate-900/5 p-1 rounded-2xl border border-slate-900/5">
                            <button
                                onClick={() => setView('editor')}
                                className={`px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 flex items-center space-x-2 ${view === 'editor' ? 'bg-white text-slate-900 shadow-xl shadow-slate-200/50' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                <Layout className="w-3.5 h-3.5" />
                                <span>ÉDITION</span>
                            </button>
                            <button
                                onClick={() => setView('preview')}
                                className={`px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 flex items-center space-x-2 ${view === 'preview' ? 'bg-white text-slate-900 shadow-xl shadow-slate-200/50' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                <Eye className="w-3.5 h-3.5" />
                                <span>APERÇU</span>
                            </button>
                        </div>
                    )}

                    <div className="h-8 w-[1px] bg-[#e8e5dd]" />

                    <div className="flex items-center space-x-4">
                        <button className="w-11 h-11 rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-white transition-all duration-300 border border-transparent hover:border-[#e8e5dd] relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-or border-2 border-white" />
                        </button>
                        {onSave && (
                            <button
                                onClick={onSave}
                                disabled={saving}
                                className="bg-slate-900 hover:bg-or text-white px-8 py-3 rounded-2xl flex items-center space-x-3 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-slate-900/20 active:scale-95"
                            >
                                {saving ? (
                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <Save className="w-4 h-4" />
                                )}
                                <span>{saving ? 'MISSION EN COURS...' : 'SYNCHRONISER'}</span>
                            </button>
                        )}
                    </div>
                </div>
            </header>

            {/* Content Area */}
            <main className="px-10 w-full max-w-[1700px] mx-auto">
                {/* Status Message */}
                {message && (
                    <div className={`mb-12 p-5 rounded-[32px] border flex items-center space-x-6 animate-slide-in-top backdrop-blur-md ${message.includes('✅')
                        ? 'bg-emerald-50/80 border-emerald-100 text-emerald-900 shadow-xl shadow-emerald-900/5'
                        : 'bg-rose-50/80 border-rose-100 text-rose-900 shadow-xl shadow-rose-900/5'
                        }`}>
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner ${message.includes('✅') ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                            {message.includes('✅') ? <Sparkles className="w-5 h-5" /> : <Info className="w-5 h-5" />}
                        </div>
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-[0.2em] opacity-40 mb-0.5">Notification Système</p>
                            <span className="font-bold text-sm">{message}</span>
                        </div>
                    </div>
                )}

                {view === 'editor' ? (
                    <div className="animate-fade-in">
                        {children}
                    </div>
                ) : (
                    <div className="flex flex-col h-[calc(100vh-220px)] animate-fade-in">
                        {/* Device Toolbar */}
                        <div className="bg-slate-900 text-white p-4 rounded-t-[40px] flex justify-center space-x-8 border-b border-white/5">
                            <button onClick={() => setDevice('desktop')} className={`flex items-center space-x-3 px-5 py-2 rounded-2xl transition-all duration-500 ${device === 'desktop' ? 'text-or bg-white/10 shadow-inner' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                                <Monitor className="w-4 h-4" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Poste Fixe</span>
                            </button>
                            <button onClick={() => setDevice('tablet')} className={`flex items-center space-x-3 px-5 py-2 rounded-2xl transition-all duration-500 ${device === 'tablet' ? 'text-or bg-white/10 shadow-inner' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                                <Tablet className="w-4 h-4" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Tablette</span>
                            </button>
                            <button onClick={() => setDevice('mobile')} className={`flex items-center space-x-3 px-5 py-2 rounded-2xl transition-all duration-500 ${device === 'mobile' ? 'text-or bg-white/10 shadow-inner' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                                <Smartphone className="w-4 h-4" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Mobile</span>
                            </button>
                            <div className="w-[1px] h-4 bg-white/10 self-center mx-2" />
                            <a
                                href={previewUrl}
                                target="_blank"
                                className="flex items-center space-x-3 px-5 py-2 rounded-2xl text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-500"
                                rel="noreferrer"
                            >
                                <ExternalLink className="w-4 h-4" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Live</span>
                            </a>
                        </div>

                        {/* Preview Frame */}
                        <div className="flex-1 bg-white border-x border-b border-[#e8e5dd] rounded-b-[40px] flex justify-center p-16 overflow-auto bg-grain/5 shadow-2xl">
                            <div className={`bg-white shadow-[0_40px_100px_rgba(0,0,0,0.15)] transition-all duration-700 ease-in-out ${deviceWidths[device]} h-full rounded-3xl overflow-hidden ring-1 ring-black/5`}>
                                <iframe
                                    src={previewUrl}
                                    className="w-full h-full border-none"
                                    title="Aperçu mobile"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
