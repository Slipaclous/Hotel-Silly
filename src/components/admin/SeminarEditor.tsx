'use client';

import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Edit2, X, Clock, Users, Monitor, Wifi, Coffee, CheckCircle } from 'lucide-react';
import ImageUpload from './ImageUpload';
import AdminWrapper from './AdminWrapper';
import LanguageTabs from './LanguageTabs';

type Locale = 'fr' | 'en' | 'nl';

interface Feature {
    id: number;
    title: string;
    titleEn?: string;
    titleNl?: string;
    description: string;
    descriptionEn?: string;
    descriptionNl?: string;
    icon: string;
    type: string;
    order: number;
}

interface SeminarPackage {
    id: number;
    title: string;
    titleEn?: string;
    titleNl?: string;
    description: string;
    descriptionEn?: string;
    descriptionNl?: string;
    price?: string;
    details: string[];
    detailsEn: string[];
    detailsNl: string[];
    isRecommended: boolean;
    order: number;
}

export default function SeminarEditor() {
    const [activeLocale, setActiveLocale] = useState<Locale>('fr');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    const [pageData, setPageData] = useState({
        introTitle: '',
        introTitleEn: '',
        introTitleNl: '',
        introDesc: '',
        introDescEn: '',
        introDescNl: '',
        imageUrl: '',
    });

    const [features, setFeatures] = useState<Feature[]>([]);
    const [packages, setPackages] = useState<SeminarPackage[]>([]);

    const [editingItem, setEditingItem] = useState<{ type: 'feature' | 'package', data: any } | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [pageRes, featRes, pkgsRes] = await Promise.all([
                fetch('/api/seminar-page'),
                fetch('/api/seminar-features'),
                fetch('/api/seminar-packages'),
            ]);
            setPageData(await pageRes.json() || pageData);
            setFeatures(await featRes.json() || []);
            setPackages(await pkgsRes.json() || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageSave = async () => {
        setSaving(true);
        try {
            await fetch('/api/seminar-page', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pageData),
            });
            setMessage('✅ Page enregistrée');
        } catch (error) {
            setMessage('❌ Erreur');
        } finally {
            setSaving(false);
            setTimeout(() => setMessage(''), 3000);
        }
    };

    const handleSubItemSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingItem) return;

        const { type, data } = editingItem;
        const url = `/api/seminar-${type === 'feature' ? 'features' : 'packages'}${data.id ? `/${data.id}` : ''}`;
        const method = data.id ? 'PUT' : 'POST';

        try {
            await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            setEditingItem(null);
            fetchData();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (type: 'feature' | 'package', id: number) => {
        if (!confirm('Supprimer cet élément ?')) return;
        try {
            await fetch(`/api/seminar-${type === 'feature' ? 'features' : 'packages'}/${id}`, { method: 'DELETE' });
            fetchData();
        } catch (error) {
            console.error(error);
        }
    };

    const getFieldName = (base: string) => {
        if (activeLocale === 'fr') return base;
        return `${base}${activeLocale.charAt(0).toUpperCase()}${activeLocale.slice(1)}`;
    };

    const inputClasses = "w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm mt-1";
    const labelClasses = "text-xs font-bold text-gray-500 uppercase tracking-widest";

    if (loading) return <div className="p-20 text-center">Chargement...</div>;

    const icons = { Users, Wifi, Monitor, Coffee, Clock, CheckCircle };

    return (
        <AdminWrapper
            title="Page Séminaires"
            description="Gérez le contenu, les atouts et les forfaits séminaires."
            message={message}
            onSave={handlePageSave}
            saving={saving}
        >
            <LanguageTabs currentLocale={activeLocale} onChange={setActiveLocale} />

            <div className="space-y-12 mt-8">
                {/* Intro */}
                <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold mb-6">Introduction</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className={labelClasses}>Titre ({activeLocale})</label>
                                <input
                                    className={inputClasses}
                                    value={(pageData as any)[getFieldName('introTitle')] || ''}
                                    onChange={(e) => setPageData({ ...pageData, [getFieldName('introTitle')]: e.target.value })}
                                />
                            </div>
                            <ImageUpload
                                label="Image d'illustration"
                                value={pageData.imageUrl}
                                onChange={(url) => setPageData({ ...pageData, imageUrl: url })}
                            />
                        </div>
                        <div>
                            <label className={labelClasses}>Description ({activeLocale})</label>
                            <textarea
                                className={`${inputClasses} h-40`}
                                value={(pageData as any)[getFieldName('introDesc')] || ''}
                                onChange={(e) => setPageData({ ...pageData, [getFieldName('introDesc')]: e.target.value })}
                            />
                        </div>
                    </div>
                </section>

                {/* Checkpoints */}
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold">Points clés (Checkpoints)</h3>
                        <button
                            onClick={() => setEditingItem({ type: 'feature', data: { title: '', description: '', icon: 'CheckCircle', type: 'checkpoint', order: features.filter(f => f.type === 'checkpoint').length + 1 } })}
                            className="bg-or text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm font-bold"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Ajouter un point clé</span>
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {features.filter(f => f.type === 'checkpoint').map(f => (
                            <div key={f.id} className="bg-white p-6 rounded-xl border border-gray-100 relative group">
                                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => setEditingItem({ type: 'feature', data: f })} className="p-2 hover:text-or"><Edit2 className="w-4 h-4" /></button>
                                    <button onClick={() => handleDelete('feature', f.id)} className="p-2 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                                </div>
                                <h4 className="font-bold mb-1">{(f as any)[getFieldName('title')] || f.title}</h4>
                                <p className="text-sm text-gray-500">{(f as any)[getFieldName('description')] || f.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Atouts */}
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold">Atouts (Grid)</h3>
                        <button
                            onClick={() => setEditingItem({ type: 'feature', data: { title: '', description: '', icon: 'Monitor', type: 'atout', order: features.filter(f => f.type === 'atout').length + 1 } })}
                            className="bg-or text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm font-bold"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Ajouter un atout</span>
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {features.filter(f => f.type === 'atout').map(f => {
                            const IconComp = (icons as any)[f.icon] || CheckCircle;
                            return (
                                <div key={f.id} className="bg-white p-6 rounded-xl border border-gray-100 text-center relative group">
                                    <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => setEditingItem({ type: 'feature', data: f })} className="p-2 hover:text-or"><Edit2 className="w-4 h-4" /></button>
                                        <button onClick={() => handleDelete('feature', f.id)} className="p-2 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                    <IconComp className="w-8 h-8 text-or mx-auto mb-4" />
                                    <h4 className="font-bold mb-2">{(f as any)[getFieldName('title')] || f.title}</h4>
                                    <p className="text-xs text-gray-500">{(f as any)[getFieldName('description')] || f.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Packages */}
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold">Forfaits Séminaires</h3>
                        <button
                            onClick={() => setEditingItem({ type: 'package', data: { title: '', description: '', details: ['', '', ''], isRecommended: false, order: packages.length + 1 } })}
                            className="bg-or text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm font-bold"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Ajouter un forfait</span>
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {packages.map(pkg => (
                            <div key={pkg.id} className={`bg-white p-8 rounded-xl border ${pkg.isRecommended ? 'border-or ring-1 ring-or' : 'border-gray-100'} relative group`}>
                                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => setEditingItem({ type: 'package', data: pkg })} className="p-2 hover:text-or"><Edit2 className="w-4 h-4" /></button>
                                    <button onClick={() => handleDelete('package', pkg.id)} className="p-2 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                                </div>
                                {pkg.isRecommended && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-or text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full">Conseillé</span>}
                                <div className="flex justify-between items-start mb-4">
                                    <h4 className="text-2xl font-bold">{(pkg as any)[getFieldName('title')] || pkg.title}</h4>
                                    <Clock className="w-6 h-6 text-or" />
                                </div>
                                <p className="text-sm text-gray-500 mb-6">{(pkg as any)[getFieldName('description')] || pkg.description}</p>
                                <ul className="space-y-2">
                                    {((pkg as any)[getFieldName('details')] || []).map((d: string, i: number) => (
                                        <li key={i} className="flex items-center space-x-2 text-sm">
                                            <div className="w-1.5 h-1.5 bg-or rounded-full" />
                                            <span>{d}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Item Modal */}
            {editingItem && (
                <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b flex justify-between items-center">
                            <h3 className="text-xl font-bold">Gérer l&apos;élément</h3>
                            <button onClick={() => setEditingItem(null)}><X className="w-6 h-6" /></button>
                        </div>
                        <form onSubmit={handleSubItemSave} className="p-6 space-y-6">
                            <LanguageTabs currentLocale={activeLocale} onChange={setActiveLocale} />

                            {editingItem.type === 'feature' ? (
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <label className={labelClasses}>Titre ({activeLocale})</label>
                                        <input className={inputClasses} value={editingItem.data[getFieldName('title')] || ''} onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, [getFieldName('title')]: e.target.value } })} />
                                    </div>
                                    <div className="col-span-2">
                                        <label className={labelClasses}>Description ({activeLocale})</label>
                                        <textarea className={inputClasses} value={editingItem.data[getFieldName('description')] || ''} onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, [getFieldName('description')]: e.target.value } })} />
                                    </div>
                                    {editingItem.data.type === 'atout' && (
                                        <div>
                                            <label className={labelClasses}>Icône</label>
                                            <select className={inputClasses} value={editingItem.data.icon} onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, icon: e.target.value } })}>
                                                <option value="Users">Utilisateurs</option>
                                                <option value="Wifi">WiFi</option>
                                                <option value="Monitor">Écran/Projection</option>
                                                <option value="Coffee">Café/Pause</option>
                                                <option value="Clock">Horloge</option>
                                            </select>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <label className={labelClasses}>Titre ({activeLocale})</label>
                                        <input className={inputClasses} value={editingItem.data[getFieldName('title')] || ''} onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, [getFieldName('title')]: e.target.value } })} />
                                    </div>
                                    <div className="col-span-2">
                                        <label className={labelClasses}>Description ({activeLocale})</label>
                                        <textarea className={inputClasses} value={editingItem.data[getFieldName('description')] || ''} onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, [getFieldName('description')]: e.target.value } })} />
                                    </div>
                                    <div className="col-span-2 space-y-3">
                                        <label className={labelClasses}>Détails (un par ligne) ({activeLocale})</label>
                                        <textarea
                                            className={inputClasses}
                                            rows={5}
                                            value={(editingItem.data[getFieldName('details')] || []).join('\n')}
                                            onChange={(e) => {
                                                const lines = e.target.value.split('\n');
                                                setEditingItem({ ...editingItem, data: { ...editingItem.data, [getFieldName('details')]: lines } });
                                            }}
                                        />
                                    </div>
                                    <div className="flex items-center space-x-2 pt-4">
                                        <input type="checkbox" id="recom" checked={editingItem.data.isRecommended} onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, isRecommended: e.target.checked } })} />
                                        <label htmlFor="recom" className="text-sm">Mis en avant (Recommandé)</label>
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-end space-x-4 pt-6 border-t">
                                <button type="button" onClick={() => setEditingItem(null)} className="px-6 py-2 border rounded-lg">Annuler</button>
                                <button type="submit" className="px-6 py-2 bg-or text-white rounded-lg font-bold">Enregistrer</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminWrapper>
    );
}
