'use client';

import { Home, Info, Bed, Image as ImageIcon, Calendar, ChevronRight, LogOut, LayoutDashboard, User } from 'lucide-react';
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
        <aside className="w-64 h-screen bg-[#1a202c] text-white flex flex-col fixed left-0 top-0 z-50 shadow-xl font-body">
            {/* Brand Section */}
            <div className="p-6 border-b border-white/10 flex flex-col items-center">
                <div className="relative h-10 w-28 mb-4">
                    <Image
                        src="/images/logo.png"
                        alt="Villa Dolce"
                        fill
                        className="object-contain brightness-0 invert"
                    />
                </div>
                <div className="flex items-center space-x-2 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest leading-none">
                        Admin Panel
                    </p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-3 custom-scrollbar space-y-1">
                <p className="px-4 text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Principal</p>
                {menuItems.map((item) => (
                    <div key={item.id} className="mb-1">
                        <button
                            onClick={() => onPageChange(item.id, item.section)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group ${activePage === item.id
                                ? 'bg-or text-white shadow-lg shadow-or/20'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <div className="flex items-center space-x-3">
                                <item.icon className={`w-5 h-5 ${activePage === item.id ? 'text-white' : 'text-gray-500 group-hover:text-white transition-colors'}`} />
                                <span className="font-medium text-sm tracking-wide">
                                    {item.label}
                                </span>
                            </div>
                            {item.subItems && (
                                <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${activePage === item.id ? 'rotate-90 text-white' : 'text-gray-600'}`} />
                            )}
                        </button>

                        {item.subItems && activePage === item.id && (
                            <div className="mt-1 ml-4 space-y-0.5 border-l border-white/10 pl-2 my-2 animate-slide-in-left">
                                {item.subItems.map((sub) => (
                                    <button
                                        key={sub.id}
                                        onClick={() => onSectionChange(sub.id)}
                                        className={`w-full text-left px-4 py-2 rounded-md text-xs font-medium transition-all duration-200 ${activeSection === sub.id
                                            ? 'text-or bg-or/10 border-r-2 border-or'
                                            : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                                            }`}
                                    >
                                        {sub.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>

            {/* User Profile Area */}
            <div className="p-4 border-t border-white/10 bg-[#151922]">
                <div className="flex items-center space-x-3 mb-4 px-2">
                    <div className="w-8 h-8 rounded-full bg-or text-white flex items-center justify-center font-bold text-xs ring-2 ring-white/10">
                        {adminName.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-white truncate">{adminName}</p>
                        <p className="text-[10px] text-gray-500">Administrateur</p>
                    </div>
                </div>

                <button
                    onClick={onLogout}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-white/5 text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 text-xs font-bold uppercase tracking-wider border border-transparent hover:border-red-500/20"
                >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Déconnexion</span>
                </button>
            </div>
        </aside>
    );
}
