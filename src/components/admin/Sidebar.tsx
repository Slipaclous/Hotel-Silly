'use client';

import { Home, Info, Bed, Image, Calendar, ChevronRight, LogOut, LayoutDashboard, User } from 'lucide-react';

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
            icon: Image,
            section: 'hero-galerie',
            subItems: [
                { id: 'hero-galerie', label: 'Hero' },
                { id: 'gallery', label: 'Photos' },
            ],
        },
        {
            id: 'evenements',
            label: 'Vie Régionale',
            icon: Calendar,
            section: 'hero-evenements',
            subItems: [
                { id: 'hero-evenements', label: 'Hero' },
                { id: 'events', label: 'Découvertes' },
            ],
        },
    ];

    return (
        <aside className="w-72 h-screen bg-white border-r border-noir/5 flex flex-col fixed left-0 top-0 z-20 shadow-sm font-body">
            {/* Brand Section */}
            <div className="p-8 lg:p-10 relative">
                <h1 className="text-2xl font-display text-noir tracking-tighter leading-none mb-1">
                    Villa <br />
                    <span className="text-or">Dolce</span>
                </h1>
                <div className="flex items-center space-x-2 mt-4 opacity-70">
                    <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-[8px] font-body text-noir/60 font-medium uppercase tracking-[0.3em]">
                        Direction
                    </p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-4 py-4 custom-scrollbar">
                <div className="space-y-1">
                    {menuItems.map((item) => (
                        <div key={item.id} className="relative">
                            <button
                                onClick={() => onPageChange(item.id, item.section)}
                                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 group ${activePage === item.id
                                    ? 'bg-[#2c3840] text-white shadow-xl shadow-noir/10'
                                    : 'text-noir/40 hover:bg-noir/[0.03] hover:text-noir'
                                    }`}
                            >
                                <div className="flex items-center space-x-4">
                                    <div className={`transition-colors duration-300 ${activePage === item.id ? 'text-or' : 'text-or/60 group-hover:text-or'}`}>
                                        <item.icon className="w-4 h-4" />
                                    </div>
                                    <span className={`font-body text-[12px] font-bold tracking-tight uppercase ${activePage === item.id ? 'text-white' : 'text-noir/60'}`}>
                                        {item.label}
                                    </span>
                                </div>
                                {item.subItems && (
                                    <ChevronRight className={`w-3 h-3 transition-transform duration-300 ${activePage === item.id ? 'rotate-90 opacity-100' : 'opacity-20'}`} />
                                )}
                            </button>

                            {item.subItems && activePage === item.id && (
                                <div className="mt-1 ml-4 border-l border-noir/5 space-y-0.5 py-1 animate-slide-in-left">
                                    {item.subItems.map((sub) => (
                                        <button
                                            key={sub.id}
                                            onClick={() => onSectionChange(sub.id)}
                                            className={`w-full text-left px-7 py-2 text-[10px] font-body font-bold transition-all duration-300 ${activeSection === sub.id
                                                ? 'text-or'
                                                : 'text-noir/30 hover:text-noir'
                                                }`}
                                        >
                                            <span className="uppercase tracking-widest">{sub.label}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </nav>

            {/* User Profile Area */}
            <div className="p-4 ">
                <div className="bg-noir  rounded-2xl p-5 text-white shadow-xl overflow-hidden relative">
                    <div className="flex  items-center space-x-3 mb-4">
                        <div className="w-10 h-10  rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
                            <User className="w-4 h-4 text-or" />
                        </div>
                        <div className="min-w-0 ">
                            <p className="text-xs font-display font-medium text-white truncate">{adminName}</p>
                            <p className="text-[8px] font-body text-white/30 uppercase tracking-widest font-bold">Administrateur</p>
                        </div>
                    </div>

                    <button
                        onClick={onLogout}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg bg-white/5 text-white/60 hover:bg-white hover:text-noir transition-all duration-300 font-bold text-[9px] uppercase tracking-widest"
                    >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Log-out</span>
                    </button>
                </div>
            </div>
        </aside>
    );
}
