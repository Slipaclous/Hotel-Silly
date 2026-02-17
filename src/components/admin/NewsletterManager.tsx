'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Trash2, Download, Search, UserCheck } from 'lucide-react';

interface Subscriber {
    id: number;
    email: string;
    createdAt: string;
}

export default function NewsletterManager() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const fetchSubscribers = async () => {
        try {
            const response = await fetch('/api/admin/newsletter');
            const data = await response.json();
            if (Array.isArray(data)) {
                setSubscribers(data);
            }
        } catch (error) {
            console.error('Erreur:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cet abonné ?')) return;

        try {
            const response = await fetch('/api/admin/newsletter', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });

            if (response.ok) {
                setSubscribers(subscribers.filter(s => s.id !== id));
            }
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    const exportToCSV = () => {
        const headers = ['Email', 'Date d\'inscription'];
        const csvData = subscribers.map(s => [
            s.email,
            new Date(s.createdAt).toLocaleDateString('fr-FR')
        ]);

        const csvContent = [
            headers.join(','),
            ...csvData.map(e => e.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `abonnés-newsletter-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const filteredSubscribers = subscribers.filter(s =>
        s.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="font-display text-4xl text-noir italic">Newsletter</h2>
                    <p className="text-noir/50 font-body text-sm mt-2">
                        Gérez la liste de vos abonnés à la newsletter ({subscribers.length} abonnés).
                    </p>
                </div>

                <button
                    onClick={exportToCSV}
                    className="flex items-center gap-2 px-6 py-3 bg-[#C6ad7a] text-white text-xs font-bold uppercase tracking-widest hover:bg-noir transition-all duration-300 shadow-lg shadow-[#C6ad7a]/10"
                >
                    <Download className="w-4 h-4" />
                    Exporter CSV
                </button>
            </div>

            <div className="bg-white border border-noir/5 shadow-xl p-8">
                <div className="flex items-center gap-4 mb-8 bg-noir/5 p-4 border border-noir/5">
                    <Search className="w-5 h-5 text-noir/30" />
                    <input
                        type="text"
                        placeholder="Rechercher un email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-transparent border-none focus:ring-0 w-full font-body text-sm"
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left font-body text-sm">
                        <thead>
                            <tr className="border-b border-noir/10">
                                <th className="pb-4 font-bold uppercase tracking-widest text-xs text-noir/40">Email</th>
                                <th className="pb-4 font-bold uppercase tracking-widest text-xs text-noir/40">Date d'inscription</th>
                                <th className="pb-4 font-bold uppercase tracking-widest text-xs text-noir/40 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-noir/5">
                            {loading ? (
                                <tr>
                                    <td colSpan={3} className="py-20 text-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-or mx-auto"></div>
                                    </td>
                                </tr>
                            ) : filteredSubscribers.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="py-20 text-center text-noir/30 italic">
                                        Aucun abonné trouvé.
                                    </td>
                                </tr>
                            ) : (
                                filteredSubscribers.map((subscriber, index) => (
                                    <motion.tr
                                        key={subscriber.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="group hover:bg-noir/[0.02] transition-colors"
                                    >
                                        <td className="py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-or/10 flex items-center justify-center text-or">
                                                    <UserCheck className="w-4 h-4" />
                                                </div>
                                                <span className="font-semibold text-noir">{subscriber.email}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 text-noir/50">
                                            {new Date(subscriber.createdAt).toLocaleDateString('fr-FR', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </td>
                                        <td className="py-4 text-right">
                                            <button
                                                onClick={() => handleDelete(subscriber.id)}
                                                className="p-2 text-noir/30 hover:text-red-500 hover:bg-red-50 transition-all rounded"
                                                title="Supprimer"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
