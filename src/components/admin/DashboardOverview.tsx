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
    Zap,
    LucideIcon
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
        <div className="space-y-8 pb-10">
            {/* Header Pro */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 font-display">Vue d&apos;ensemble</h2>
                    <p className="text-gray-500 text-sm mt-1">Bienvenue sur votre espace de gestion.</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-12 h-12 rounded-lg ${stat.bg} flex items-center justify-center`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                Actif
                            </span>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-gray-900 font-display">{stat.value}</p>
                            <p className="text-sm text-gray-500 font-medium mt-1">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Activités & Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Dernières Activités */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-gray-900 font-display">Activités Récentes</h3>
                        <BarChart3 className="w-5 h-5 text-gray-400" />
                    </div>

                    <div className="divide-y divide-gray-100">
                        {recentActivities.map((activity, i) => (
                            <div key={i} className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                        <activity.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-or uppercase tracking-wider mb-0.5 block">
                                            {activity.section}
                                        </span>
                                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                                    </div>
                                </div>
                                <div className="text-gray-300">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Utilities */}
                <div className="flex flex-col gap-6">
                    <div className="p-6 rounded-xl bg-[#2c3840] text-white shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <h3 className="text-lg font-bold mb-2 relative z-10 font-display">Accès Rapide</h3>
                        <p className="text-white/70 text-sm mb-6 relative z-10">
                            Consultez le site en direct pour vérifier vos modifications.
                        </p>
                        <a
                            href="/"
                            target="_blank"
                            className="flex items-center justify-center w-full py-3 rounded-lg bg-white text-[#2c3840] hover:bg-gray-100 transition-colors font-bold text-sm shadow-sm"
                        >
                            <span>Visiter le site</span>
                            <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                    </div>

                    <div className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm">
                        <div className="flex items-center space-x-3 mb-3">
                            <Zap className="w-5 h-5 text-or" />
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Conseil</h3>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Pensez à mettre à jour vos photos de chambres régulièrement pour maximiser les réservations.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
