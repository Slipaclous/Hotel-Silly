'use client';

import { useState, ReactNode } from 'react';
import { Save, Eye, Info, Layout, Monitor, Tablet, Smartphone, ExternalLink } from 'lucide-react';

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
        <div className="font-body min-h-screen bg-gray-50 pb-20 pl-64">
            {/* Header Section */}
            <div className="bg-white border-b border-gray-200 px-8 py-6 mb-8 sticky top-0 z-40 flex items-center justify-between shadow-sm">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 font-display">{title}</h2>
                    {description && (
                        <p className="text-sm text-gray-500 mt-1">{description}</p>
                    )}
                </div>

                <div className="flex items-center space-x-3">
                    {previewUrl && (
                        <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
                            <button
                                onClick={() => setView('editor')}
                                className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${view === 'editor' ? 'bg-white text-gray-900 shadow-sm ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-900'}`}
                            >
                                <div className="flex items-center space-x-2">
                                    <Layout className="w-3.5 h-3.5" />
                                    <span>Éditeur</span>
                                </div>
                            </button>
                            <button
                                onClick={() => setView('preview')}
                                className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${view === 'preview' ? 'bg-white text-gray-900 shadow-sm ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-900'}`}
                            >
                                <div className="flex items-center space-x-2">
                                    <Eye className="w-3.5 h-3.5" />
                                    <span>Aperçu</span>
                                </div>
                            </button>
                            <a
                                href={previewUrl}
                                target="_blank"
                                className="px-3 flex items-center text-gray-400 hover:text-gray-600 border-l border-gray-200 ml-1 pl-2"
                                title="Ouvrir dans un nouvel onglet"
                            >
                                <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    )}

                    {onSave && (
                        <button
                            onClick={onSave}
                            disabled={saving}
                            className="bg-or hover:bg-black text-white px-6 py-2.5 rounded-lg flex items-center space-x-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm shadow-sm"
                        >
                            <Save className={`w-4 h-4 ${saving ? 'animate-spin' : ''}`} />
                            <span>{saving ? 'Enregistrement...' : 'Enregistrer'}</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Content Area */}
            <div className="px-8 max-w-7xl mx-auto">
                {/* Status Message */}
                {message && (
                    <div className={`mb-6 p-4 rounded-lg border flex items-center space-x-3 animate-fade-in ${message.includes('✅')
                        ? 'bg-green-50 border-green-200 text-green-700'
                        : 'bg-red-50 border-red-200 text-red-700'
                        }`}>
                        <Info className="w-5 h-5 shrink-0" />
                        <span className="font-medium text-sm">{message}</span>
                    </div>
                )}

                {view === 'editor' ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-8">
                            {children}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col h-[calc(100vh-200px)]">
                        {/* Device Toolbar */}
                        <div className="bg-gray-800 text-white p-2 rounded-t-xl flex justify-center space-x-4">
                            <button onClick={() => setDevice('desktop')} className={`p-2 rounded hover:bg-white/10 ${device === 'desktop' ? 'text-or bg-white/10' : 'text-gray-400'}`}>
                                <Monitor className="w-5 h-5" />
                            </button>
                            <button onClick={() => setDevice('tablet')} className={`p-2 rounded hover:bg-white/10 ${device === 'tablet' ? 'text-or bg-white/10' : 'text-gray-400'}`}>
                                <Tablet className="w-5 h-5" />
                            </button>
                            <button onClick={() => setDevice('mobile')} className={`p-2 rounded hover:bg-white/10 ${device === 'mobile' ? 'text-or bg-white/10' : 'text-gray-400'}`}>
                                <Smartphone className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Preview Frame */}
                        <div className="flex-1 bg-gray-100 border-x border-b border-gray-200 rounded-b-xl flex justify-center p-8 overflow-auto">
                            <div className={`bg-white shadow-2xl transition-all duration-300 ${deviceWidths[device]} h-full`}>
                                <iframe
                                    src={previewUrl}
                                    className="w-full h-full border-none"
                                    title="Aperçu mobile"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
