'use client';

import { useState, useEffect } from 'react';
import {
    Bed,
    Image as ImageIcon,
    Calendar,
    Star,
    ArrowUpRight,
    TrendingUp,
    ShieldCheck,
    BarChart3,
    ExternalLink,
    Zap
} from 'lucide-react';

export default function DashboardOverview() {
    const [stats, setStats] = useState({
        rooms: 0,
        testimonials: 0,
        gallery: 0,
        events: 0,
    });
    const [recentActivities, setRecentActivities] = useState<any[]>([]);
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
                    ...(rooms.slice(0, 1).map((r: any) => ({ section: 'Chambres', action: `Dernière modif : ${r.title}`, icon: Bed }))),
                    ...(testimonials.slice(0, 1).map((t: any) => ({ section: 'Témoignages', action: `Dernier avis : ${t.name}`, icon: Star }))),
                    ...(gallery.slice(0, 1).map((g: any) => ({ section: 'Galerie', action: `Dernier ajout : ${g.category}`, icon: ImageIcon }))),
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
        { label: 'Chambres', value: stats.rooms, icon: Bed, color: 'text-blue-400', bg: 'bg-blue-400/10' },
        { label: 'Témoignages', value: stats.testimonials, icon: Star, color: 'text-or', bg: 'bg-or/10' },
        { label: 'Galerie Photos', value: stats.gallery, icon: ImageIcon, color: 'text-purple-400', bg: 'bg-purple-400/10' },
        { label: 'Découvertes', value: stats.events, icon: Calendar, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-or"></div>
            </div>
        );
    }

    return (
        <div className="space-y-12 animate-fade-in pb-10">
            {/* Header Pro */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-display text-noir mb-1 tracking-tight italic">Portfolio Manager</h2>
                    <p className="text-noir/30 font-body text-[10px] font-bold uppercase tracking-[0.4em] ml-1">Système de Direction Opérationnelle</p>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest font-body">Portail Actif</span>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {statCards.map((stat, index) => (
                    <div
                        key={index}
                        className="group relative p-8 rounded-[2.5rem] bg-white border border-noir/5 hover:border-or/30 transition-all duration-700 hover:shadow-2xl shadow-sm overflow-hidden"
                    >
                        <div className="absolute bottom-0 right-0 w-24 h-24 bg-or/5 rounded-full translate-y-12 translate-x-12 blur-2xl group-hover:bg-or/10 transition-colors" />

                        <div className="flex items-start justify-between mb-8 relative z-10">
                            <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="flex items-center text-emerald-500 space-x-1">
                                    <TrendingUp className="w-3 h-3" />
                                    <span className="text-[10px] font-bold font-body uppercase tracking-tighter">Actif</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10">
                            <p className="text-5xl font-display text-noir mb-2 leading-none tracking-tighter">{stat.value}</p>
                            <p className="text-[10px] font-body text-noir/60 uppercase tracking-[0.2em] font-bold border-l border-or/50 pl-3 ml-1 mt-3">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Activités & Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Dernières Activités */}
                <div className="lg:col-span-2 rounded-[2.5rem] bg-white border border-noir/5 p-10 shadow-sm relative overflow-hidden">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-2xl font-display text-noir tracking-tight">Activités Récentes</h3>
                            <p className="text-[10px] font-body text-noir/40 uppercase tracking-widest mt-1">Dernières modifications sur le site</p>
                        </div>
                        <div className="p-3 bg-noir/[0.02] rounded-2xl border border-noir/5">
                            <BarChart3 className="w-5 h-5 text-or" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        {recentActivities.map((activity, i) => (
                            <div key={i} className="flex items-center justify-between p-5 rounded-[1.5rem] bg-noir/[0.01] hover:bg-white hover:shadow-xl hover:shadow-noir/5 transition-all duration-500 border border-transparent hover:border-noir/5 group">
                                <div className="flex items-center space-x-5">
                                    <div className="w-12 h-12 rounded-2xl bg-white shadow-lg flex items-center justify-center text-or group-hover:bg-noir group-hover:text-white transition-all duration-500">
                                        <activity.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-3 mb-1">
                                            <span className="text-[8px] font-bold text-or uppercase tracking-[0.2em] border border-or/20 px-2 py-0.5 rounded">
                                                {activity.section}
                                            </span>
                                        </div>
                                        <h4 className="text-md font-display text-noir group-hover:translate-x-1 transition-transform">{activity.action}</h4>
                                    </div>
                                </div>
                                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                                    <ShieldCheck className="w-4 h-4" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Utilities */}
                <div className="flex flex-col gap-8">
                    <div className="p-10 rounded-[2.5rem] bg-[#2c3840] text-white shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-or/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <h3 className="text-xl font-display mb-4 relative z-10 italic">Villa Dolce en direct</h3>
                        <p className="text-white/60 text-xs font-body mb-8 relative z-10 leading-relaxed">
                            Vérifiez le rendu de vos modifications sur l'interface publique.
                        </p>
                        <a
                            href="/"
                            target="_blank"
                            className="flex items-center justify-between p-4 rounded-xl bg-white/10 hover:bg-white text-white hover:text-noir transition-all group/btn border border-white/5 shadow-lg"
                        >
                            <span className="text-[10px] font-bold uppercase tracking-widest leading-none">Visiter le site</span>
                            <ExternalLink className="w-4 h-4 group-hover/btn:rotate-45 transition-transform" />
                        </a>
                    </div>

                    <div className="p-10 rounded-[2.5rem] bg-white border border-noir/5 shadow-sm">
                        <div className="w-10 h-10 rounded-xl bg-or/10 flex items-center justify-center mb-6">
                            <Zap className="w-5 h-5 text-or" />
                        </div>
                        <h3 className="text-lg font-display text-noir mb-2">Conseil Expert</h3>
                        <p className="text-noir/40 font-body text-[11px] leading-relaxed italic">
                            Un site mis à jour régulièrement est mieux référencé. Pensez à renouveler vos visuels.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
