'use client';

import { useState, useEffect } from 'react';
import {
    Bed,
    Image as ImageIcon,
    Calendar,
    Star,
    TrendingUp,
    ShieldCheck,
    BarChart3,
    ExternalLink,
    Zap,
    LucideIcon,
    ArrowUpRight,
    Clock
} from 'lucide-react';

interface RecentActivity {
    section: string;
    action: string;
    icon: LucideIcon;
}

export default function DashboardOverview() {
    const [stats, setStats] = useState({
        rooms: 0,
        testimonials: 0,
        gallery: 0,
        events: 0,
    });
    const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [rooms, testimonials, gallery, events] = await Promise.all([
                    fetch('/api/rooms').then(res => res.json()),
                    fetch('/api/testimonials').then(res => res.json()),
                    fetch('/api/gallery').then(res => res.json()),
                    fetch('/api/events').then(res => res.json()),
                ]);

                setStats({
                    rooms: rooms.length || 0,
                    testimonials: testimonials.length || 0,
                    gallery: gallery.length || 0,
                    events: events.length || 0,
                });

                const activities = [
                    ...(rooms.slice(0, 1).map((r: { title?: string; name?: string }) => ({ section: 'Chambres', action: `Dernière modif : ${r.title || r.name}`, icon: Bed }))),
                    ...(testimonials.slice(0, 1).map((t: { name: string }) => ({ section: 'Témoignages', action: `Dernier avis : ${t.name}`, icon: Star }))),
                    ...(gallery.slice(0, 1).map((g: { category: string }) => ({ section: 'Galerie', action: `Dernier ajout : ${g.category}`, icon: ImageIcon }))),
                ];
                setRecentActivities(activities);

            } catch (error) {
                console.error('Erreur dashboard:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const statCards = [
        { label: 'Chambres', value: stats.rooms, icon: Bed, color: 'text-blue-500', bg: 'bg-blue-500/10', trend: '+2 ce mois' },
        { label: 'Avis Clients', value: stats.testimonials, icon: Star, color: 'text-or', bg: 'bg-or/10', trend: '4.9/5 moy.' },
        { label: 'Médiathèque', value: stats.gallery, icon: ImageIcon, color: 'text-purple-500', bg: 'bg-purple-500/10', trend: '85 photos' },
        { label: 'Événements', value: stats.events, icon: Calendar, color: 'text-emerald-500', bg: 'bg-emerald-500/10', trend: 'À venir' },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[50vh]">
                <div className="relative">
                    <div className="w-12 h-12 rounded-full border-2 border-slate-100 animate-pulse" />
                    <div className="absolute inset-0 w-12 h-12 rounded-full border-t-2 border-or animate-spin" />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-10 animate-fade-in">
            {/* Elegant Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-slate-100">
                <div>
                    <span className="text-[10px] font-bold text-or uppercase tracking-[0.2em]">Vue Globale</span>
                    <h2 className="text-4xl font-bold text-slate-900 font-display mt-1">Tableau de bord</h2>
                    <p className="text-slate-500 text-sm mt-2 flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        Données synchronisées en temps réel
                    </p>
                </div>
                <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Serveur Opérationnel</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <div
                        key={index}
                        className="group bg-white p-7 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 relative overflow-hidden active:scale-[0.98]"
                    >
                        {/* Hover Decoration */}
                        <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full ${stat.bg} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                        <div className="flex items-start justify-between mb-6 relative z-10">
                            <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                                <stat.icon className={`w-7 h-7 ${stat.color}`} />
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="flex items-center text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                                    <TrendingUp className="w-3 h-3 mr-1" />
                                    EN LIGNE
                                </span>
                            </div>
                        </div>
                        <div className="relative z-10">
                            <p className="text-4xl font-bold text-slate-900 font-display tracking-tight">{stat.value}</p>
                            <div className="flex items-center justify-between mt-1">
                                <p className="text-sm text-slate-500 font-semibold">{stat.label}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.trend}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity Timeline */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                <BarChart3 className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 font-display">Flux d&apos;activité</h3>
                        </div>
                        <button className="text-[11px] font-bold text-or hover:text-slate-900 transition-colors uppercase tracking-[0.1em]">Tout voir</button>
                    </div>

                    <div className="p-4 flex-1">
                        <div className="space-y-2">
                            {recentActivities.map((activity, i) => (
                                <div key={i} className="group flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all duration-300 border border-transparent hover:border-slate-100">
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${i === 0 ? 'bg-or/10 text-or' : 'bg-slate-100 text-slate-400'
                                            }`}>
                                            <activity.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                                                    {activity.section}
                                                </span>
                                                <span className="w-1 h-1 rounded-full bg-slate-200" />
                                                <span className="text-[10px] text-slate-400 font-medium italic">Il y a quelques instants</span>
                                            </div>
                                            <p className="text-sm font-bold text-slate-800 mt-0.5">{activity.action}</p>
                                        </div>
                                    </div>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 rounded-lg bg-white shadow-sm border border-slate-100 text-slate-400 hover:text-or">
                                            <ArrowUpRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Side Utilities */}
                <div className="flex flex-col gap-8">
                    {/* Live Preview Card */}
                    <div className="group p-8 rounded-3xl bg-slate-900 text-white shadow-2xl relative overflow-hidden min-h-[240px] flex flex-col justify-between">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-or/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-or/30 transition-colors duration-700" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2" />

                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center mb-6">
                                <ExternalLink className="w-6 h-6 text-or" />
                            </div>
                            <h3 className="text-2xl font-bold font-display leading-tight">Accès Direct<br />Site Public</h3>
                            <p className="text-white/50 text-xs mt-3 font-medium">
                                Visualisez instantanément les changements apportés à votre plateforme.
                            </p>
                        </div>

                        <a
                            href="/"
                            target="_blank"
                            className="relative z-10 mt-8 flex items-center justify-center w-full py-4 rounded-xl bg-or text-white hover:bg-white hover:text-slate-900 transition-all duration-300 font-bold text-xs uppercase tracking-widest shadow-lg shadow-or/20 active:scale-95"
                        >
                            <span>Visiter maintenant</span>
                            <ArrowUpRight className="w-4 h-4 ml-2" />
                        </a>
                    </div>

                    {/* Pro Tip Card */}
                    <div className="p-8 rounded-3xl bg-or/5 border border-or/20 shadow-sm relative overflow-hidden group">
                        <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-or/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-or text-white flex items-center justify-center shadow-md">
                                <Zap className="w-4 h-4" />
                            </div>
                            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-[0.2em]">Conseil Pro</h3>
                        </div>
                        <p className="text-slate-600 text-[13px] leading-relaxed font-medium relative z-10">
                            L&apos;ajout régulier de nouveaux témoignages clients renforce la confiance des visiteurs et booste naturellement votre référencement.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
