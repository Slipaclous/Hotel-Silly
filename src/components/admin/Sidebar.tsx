'use client';

import { Home, Info, Bed, Image as ImageIcon, Calendar, ChevronRight, LogOut, LayoutDashboard, Globe, Gift, Users, Mail, Sparkles } from 'lucide-react';
import Image from 'next/image';

interface SidebarProps {
    activePage: string | null;
    activeSection: string;
    onPageChange: (page: string, section: string) => void;
    onSectionChange: (section: string) => void;
    onLogout: () => void;
    adminName: string;
}

export default function Sidebar({
    activePage,
    activeSection,
    onPageChange,
    onSectionChange,
    onLogout,
    adminName,
}: SidebarProps) {
    const menuItems = [
        {
            id: 'dashboard',
            label: 'Tableau de bord',
            icon: LayoutDashboard,
            section: 'overview',
        },
        {
            id: 'accueil',
            label: "Page d'accueil",
            icon: Home,
            section: 'hero',
            subItems: [
                { id: 'hero', label: 'Section Hero' },
                { id: 'about', label: 'Section À Propos' },
                { id: 'features', label: 'Atouts' },
                { id: 'rooms', label: 'Chambres' },
                { id: 'testimonials', label: 'Témoignages' },
            ],
        },
        {
            id: 'chambres',
            label: 'Page Chambres',
            icon: Bed,
            section: 'hero-chambres',
            subItems: [
                { id: 'hero-chambres', label: 'Hero' },
                { id: 'rooms', label: 'Catalogue' },
            ],
        },
        {
            id: 'a-propos',
            label: 'Page À Propos',
            icon: Info,
            section: 'hero-a-propos',
            subItems: [
                { id: 'hero-a-propos', label: 'Hero' },
                { id: 'about', label: 'Contenu' },
                { id: 'features', label: 'Valeurs' },
            ],
        },
        {
            id: 'galerie',
            label: 'Page Galerie',
            icon: ImageIcon,
            section: 'hero-galerie',
            subItems: [
                { id: 'hero-galerie', label: 'Hero' },
                { id: 'gallery', label: 'Photos' },
            ],
        },
        {
            id: 'evenements',
            label: 'Événements',
            icon: Calendar,
            section: 'hero-evenements',
            subItems: [
                { id: 'hero-evenements', label: 'Hero' },
                { id: 'events', label: 'Découvertes' },
            ],
        },
        {
            id: 'carte-cadeau',
            label: 'Carte Cadeau',
            icon: Gift,
            section: 'hero-carte-cadeau',
            subItems: [
                { id: 'hero-carte-cadeau', label: 'Hero' },
            ],
        },
        {
            id: 'seminaires',
            label: 'Séminaires',
            icon: Users,
            section: 'hero-seminaires',
            subItems: [
                { id: 'hero-seminaires', label: 'Hero' },
            ],
        },
        {
            id: 'translations',
            label: 'Traductions',
            icon: Globe,
            section: 'global-translations',
        },
        {
            id: 'newsletter',
            label: 'Newsletter',
            icon: Mail,
            section: 'newsletter',
        },
    ];

    return (
        <aside className="w-72 h-screen bg-[#1e293b] text-white flex flex-col fixed left-0 top-0 z-50 shadow-2xl font-body border-r border-white/5 overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[30%] bg-or/5 blur-[100px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[30%] bg-or/5 blur-[100px] rounded-full" />
            </div>

            {/* Brand Section */}
            <div className="relative p-8 mb-4">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="relative h-12 w-12 rounded-xl bg-gradient-to-br from-or/20 to-or/10 border border-or/20 flex items-center justify-center shadow-lg shadow-or/5">
                        <Sparkles className="w-6 h-6 text-or" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold font-display tracking-tight text-white">Villa Dolce</h1>
                        <div className="flex items-center space-x-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] leading-none">
                                Management
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="relative flex-1 overflow-y-auto px-4 custom-scrollbar space-y-1 pb-8">
                <p className="px-4 text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-4">Navigation Principale</p>

                {menuItems.map((item) => (
                    <div key={item.id} className="group/item">
                        <button
                            onClick={() => onPageChange(item.id, item.section)}
                            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 group ${activePage === item.id
                                ? 'bg-white/10 text-white shadow-sm border border-white/10'
                                : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <div className="flex items-center space-x-3.5">
                                <div className={`p-2 rounded-lg transition-colors duration-300 ${activePage === item.id ? 'bg-or text-white' : 'bg-slate-800 text-slate-500 group-hover:text-white'}`}>
                                    <item.icon className="w-4.5 h-4.5" />
                                </div>
                                <span className={`font-semibold text-[13px] tracking-wide transition-colors duration-300 ${activePage === item.id ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
                                    {item.label}
                                </span>
                            </div>
                            {item.subItems && (
                                <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${activePage === item.id ? 'rotate-90 text-or' : 'text-slate-600 group-hover:text-slate-400'}`} />
                            )}
                        </button>

                        {/* Sub Items */}
                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${item.subItems && activePage === item.id ? 'max-h-96 opacity-100 mt-2 mb-4' : 'max-h-0 opacity-0'}`}>
                            <div className="ml-[27px] pl-6 border-l border-white/5 space-y-1">
                                {item.subItems?.map((sub) => (
                                    <button
                                        key={sub.id}
                                        onClick={() => onSectionChange(sub.id)}
                                        className={`w-full text-left px-4 py-2.5 rounded-lg text-[12px] font-medium transition-all duration-200 relative group/sub ${activeSection === sub.id
                                            ? 'text-or bg-or/5'
                                            : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                                            }`}
                                    >
                                        {activeSection === sub.id && (
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-or shadow-[0_0_8px_rgba(198,173,122,0.6)]" />
                                        )}
                                        {sub.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </nav>

            {/* User Profile Area */}
            <div className="relative p-6 mt-auto">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-or to-or/80 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-or/20">
                                {adminName.charAt(0)}
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#1e293b] rounded-full" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-bold text-white truncate leading-tight">{adminName}</p>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Administrateur</p>
                        </div>
                    </div>

                    <button
                        onClick={onLogout}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-800/50 text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 text-[11px] font-bold uppercase tracking-wider border border-white/5 hover:border-red-500/20"
                    >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Quitter l&apos;espace</span>
                    </button>
                </div>
            </div>
        </aside>
    );
}
