'use client';

import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Star, Heart, Edit2, X } from 'lucide-react';
import ImageUpload from './ImageUpload';
import AdminWrapper from './AdminWrapper';
import LanguageTabs from './LanguageTabs';

type Locale = 'fr' | 'en' | 'nl';

interface Package {
    id: number;
    title: string;
    titleEn?: string;
    titleNl?: string;
    description: string;
    descriptionEn?: string;
    descriptionNl?: string;
    price: string;
    priceEn?: string;
    priceNl?: string;
    icon: string;
    isPopular: boolean;
    order: number;
}

export default function GiftCardEditor() {
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
        badgeText1: '',
        badgeText1En: '',
        badgeText1Nl: '',
        badgeText2: '',
        badgeText2En: '',
        badgeText2Nl: '',
        benefits: [] as string[],
        benefitsEn: [] as string[],
        benefitsNl: [] as string[],
    });

    const [packages, setPackages] = useState<Package[]>([]);
    const [editingPackage, setEditingPackage] = useState<Partial<Package> | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [pageRes, pkgsRes] = await Promise.all([
                fetch('/api/gift-card-page'),
                fetch('/api/gift-card-packages'),
            ]);
            const pData = await pageRes.json();
            const pkgs = await pkgsRes.json();

            if (pData) setPageData(pData);
            if (pkgs) setPackages(pkgs);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageSave = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/gift-card-page', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pageData),
            });
            if (res.ok) setMessage('✅ Page enregistrée');
        } catch (error) {
            setMessage('❌ Erreur');
        } finally {
            setSaving(false);
            setTimeout(() => setMessage(''), 3000);
        }
    };

    const handlePackageSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingPackage) return;

        try {
            const method = editingPackage.id ? 'PUT' : 'POST';
            const url = editingPackage.id ? `/api/gift-card-packages/${editingPackage.id}` : '/api/gift-card-packages';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingPackage),
            });

            if (res.ok) {
                setEditingPackage(null);
                fetchData();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeletePackage = async (id: number) => {
        if (!confirm('Supprimer ce forfait ?')) return;
        try {
            await fetch(`/api/gift-card-packages/${id}`, { method: 'DELETE' });
            fetchData();
        } catch (error) {
            console.error(error);
        }
    };

    const getFieldName = (base: string) => {
        if (activeLocale === 'fr') return base;
        return `${base}${activeLocale.charAt(0).toUpperCase()}${activeLocale.slice(1)}`;
    };

    if (loading) return <div className="p-20 text-center">Chargement...</div>;

    const inputClasses = "w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-or outline-none mt-1";
    const labelClasses = "text-xs font-bold text-gray-500 uppercase tracking-widest";

    return (
        <AdminWrapper
            title="Page Carte Cadeau"
            description="Gérez le contenu et les offres de cartes cadeaux."
            message={message}
            onSave={handlePageSave}
            saving={saving}
        >
            <LanguageTabs currentLocale={activeLocale} onChange={setActiveLocale} />

            <div className="space-y-12 mt-8">
                {/* Intro Section */}
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
                            <div>
                                <label className={labelClasses}>Badge Ligne 1 ({activeLocale})</label>
                                <input
                                    className={inputClasses}
                                    value={(pageData as any)[getFieldName('badgeText1')] || ''}
                                    onChange={(e) => setPageData({ ...pageData, [getFieldName('badgeText1')]: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className={labelClasses}>Badge Ligne 2 ({activeLocale})</label>
                                <input
                                    className={inputClasses}
                                    value={(pageData as any)[getFieldName('badgeText2')] || ''}
                                    onChange={(e) => setPageData({ ...pageData, [getFieldName('badgeText2')]: e.target.value })}
                                />
                            </div>
                        </div>
                        <div>
                            <label className={labelClasses}>Description ({activeLocale})</label>
                            <textarea
                                className={`${inputClasses} h-32`}
                                value={(pageData as any)[getFieldName('introDesc')] || ''}
                                onChange={(e) => setPageData({ ...pageData, [getFieldName('introDesc')]: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="mt-6">
                        <ImageUpload
                            label="Image d'illustration"
                            value={pageData.imageUrl}
                            onChange={(url) => setPageData({ ...pageData, imageUrl: url })}
                        />
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold mb-6">Avantages (Liste)</h3>
                    <div className="space-y-3">
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                            <div key={i}>
                                <label className={labelClasses}>Avantage {i + 1} ({activeLocale})</label>
                                <input
                                    className={inputClasses}
                                    value={(pageData as any)[getFieldName('benefits')]?.[i] || ''}
                                    onChange={(e) => {
                                        const newArr = [...((pageData as any)[getFieldName('benefits')] || [])];
                                        newArr[i] = e.target.value;
                                        setPageData({ ...pageData, [getFieldName('benefits')]: newArr });
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Packages Section */}
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold">Forfaits</h3>
                        <button
                            onClick={() => setEditingPackage({ title: '', description: '', price: '', icon: 'Star', order: packages.length + 1 })}
                            className="bg-or text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm font-bold"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Ajouter un forfait</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {packages.map((pkg) => (
                            <div key={pkg.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative group">
                                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => setEditingPackage(pkg)} className="p-2 bg-gray-50 rounded-lg hover:text-or"><Edit2 className="w-4 h-4" /></button>
                                    <button onClick={() => handleDeletePackage(pkg.id)} className="p-2 bg-gray-50 rounded-lg hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                                </div>
                                <div className="w-12 h-12 border border-or flex items-center justify-center mb-4">
                                    {pkg.icon === 'Star' ? <Star className="w-6 h-6 text-or" /> : <Heart className="w-6 h-6 text-or" />}
                                </div>
                                <h4 className="font-bold text-lg mb-2">{(pkg as any)[getFieldName('title')] || pkg.title}</h4>
                                <p className="text-sm text-gray-500 line-clamp-3 mb-4">{(pkg as any)[getFieldName('description')] || pkg.description}</p>
                                <div className="text-or font-bold">{(pkg as any)[getFieldName('price')] || pkg.price}</div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Package Modal */}
            {editingPackage && (
                <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b flex justify-between items-center">
                            <h3 className="text-xl font-bold">{editingPackage.id ? 'Modifier' : 'Ajouter'} un forfait</h3>
                            <button onClick={() => setEditingPackage(null)}><X className="w-6 h-6" /></button>
                        </div>
                        <form onSubmit={handlePackageSave} className="p-6 space-y-6">
                            <LanguageTabs currentLocale={activeLocale} onChange={setActiveLocale} />
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className={labelClasses}>Titre ({activeLocale})</label>
                                    <input
                                        required
                                        className={inputClasses}
                                        value={(editingPackage as any)[getFieldName('title')] || ''}
                                        onChange={(e) => setEditingPackage({ ...editingPackage, [getFieldName('title')]: e.target.value })}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className={labelClasses}>Description ({activeLocale})</label>
                                    <textarea
                                        required
                                        className={`${inputClasses} h-24`}
                                        value={(editingPackage as any)[getFieldName('description')] || ''}
                                        onChange={(e) => setEditingPackage({ ...editingPackage, [getFieldName('description')]: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className={labelClasses}>Prix ({activeLocale})</label>
                                    <input
                                        required
                                        className={inputClasses}
                                        placeholder="ex: 150€"
                                        value={(editingPackage as any)[getFieldName('price')] || ''}
                                        onChange={(e) => setEditingPackage({ ...editingPackage, [getFieldName('price')]: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className={labelClasses}>Icône</label>
                                    <select
                                        className={inputClasses}
                                        value={editingPackage.icon}
                                        onChange={(e) => setEditingPackage({ ...editingPackage, icon: e.target.value })}
                                    >
                                        <option value="Star">Étoile</option>
                                        <option value="Heart">Cœur</option>
                                    </select>
                                </div>
                                <div className="flex items-center space-x-2 pt-4">
                                    <input
                                        type="checkbox"
                                        id="popular"
                                        checked={editingPackage.isPopular}
                                        onChange={(e) => setEditingPackage({ ...editingPackage, isPopular: e.target.checked })}
                                    />
                                    <label htmlFor="popular" className="text-sm font-medium">Mettre en avant (Badge Populaire)</label>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-4 pt-6 border-t">
                                <button type="button" onClick={() => setEditingPackage(null)} className="px-6 py-2 border rounded-lg">Annuler</button>
                                <button type="submit" className="px-6 py-2 bg-or text-white rounded-lg font-bold">Enregistrer</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminWrapper>
    );
}
