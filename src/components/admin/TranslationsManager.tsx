'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Save, Check, Home, Bed, Image as ImageIcon, Calendar, GraduationCap, Gift, Phone, Info, Loader2, CheckCircle2, Circle } from 'lucide-react';
import AdminWrapper from './AdminWrapper';

type TranslatableModel = 'Hero' | 'About' | 'Feature' | 'Room' | 'Testimonial' | 'Event' | 'PageHero' | 'GalleryImage';

interface TranslationRow {
    id: number;
    model: TranslatableModel;
    field: string;
    itemName: string;
    fr: string;
    en: string;
    nl: string;
    isDirty?: boolean;
}

interface PageData {
    pageName: string;
    pageKey: string;
    icon: any;
    rows: TranslationRow[];
}

export default function TranslationsManager() {
    const [translations, setTranslations] = useState<TranslationRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState<Set<string>>(new Set());
    const [message, setMessage] = useState('');
    const [activePage, setActivePage] = useState('galerie');
    const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
    const [showOnlyIncomplete, setShowOnlyIncomplete] = useState(false);
    const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);

    const fetchTranslations = useCallback(async () => {
        setLoading(true);
        try {
            const endpoints = [
                { name: 'Hero', url: '/api/hero' },
                { name: 'About', url: '/api/about' },
                { name: 'Feature', url: '/api/features' },
                { name: 'Room', url: '/api/rooms' },
                { name: 'Testimonial', url: '/api/testimonials' },
                { name: 'Event', url: '/api/events' },
                { name: 'PageHero', url: '/api/page-hero' },
                { name: 'GalleryImage', url: '/api/gallery' }
            ];

            const results = await Promise.all(
                endpoints.map(async (e) => {
                    try {
                        const res = await fetch(e.url);
                        const data = await res.json();
                        return { name: e.name, data: Array.isArray(data) ? data : [data] };
                    } catch (err) {
                        console.error(`Error fetching ${e.name}:`, err);
                        return { name: e.name, data: [] };
                    }
                })
            );

            const rows: TranslationRow[] = [];

            results.forEach((res) => {
                res.data.forEach((item: any) => {
                    if (!item) return;

                    const fieldMap: Record<string, string[]> = {
                        'Hero': ['badge', 'title', 'subtitle', 'description', 'location'],
                        'About': ['title', 'description', 'keyPoint1Title', 'keyPoint1Text', 'keyPoint2Title', 'keyPoint2Text', 'keyPoint3Title', 'keyPoint3Text'],
                        'Feature': ['title', 'description'],
                        'Room': ['name', 'description', 'capacity', 'surface', 'bedding', 'bathroom'],
                        'Testimonial': ['location', 'text'],
                        'Event': ['title', 'description', 'capacity', 'duration'],
                        'PageHero': ['title', 'subtitle'],
                        'GalleryImage': ['title', 'category']
                    };

                    const fields = fieldMap[res.name as TranslatableModel] || [];

                    let itemName = '';
                    if (res.name === 'PageHero') {
                        itemName = item.page || `Hero #${item.id}`;
                    } else if (res.name === 'Room') {
                        itemName = item.name || `Chambre #${item.id}`;
                    } else if (res.name === 'Event') {
                        itemName = item.title || `Événement #${item.id}`;
                    } else if (res.name === 'Testimonial') {
                        itemName = item.name || `Témoignage #${item.id}`;
                    } else if (res.name === 'Feature') {
                        itemName = item.title || `Caractéristique #${item.id}`;
                    } else if (res.name === 'GalleryImage') {
                        itemName = item.title || `Image #${item.id}`;
                    } else {
                        itemName = res.name;
                    }

                    fields.forEach(field => {
                        rows.push({
                            id: item.id,
                            model: res.name as TranslatableModel,
                            field,
                            itemName,
                            fr: item[field] || '',
                            en: item[`${field}En`] || '',
                            nl: item[`${field}Nl`] || '',
                            isDirty: false
                        });
                    });
                });
            });

            setTranslations(rows);
        } catch (error) {
            console.error('Error:', error);
            setMessage('❌ Erreur lors du chargement');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTranslations();
    }, [fetchTranslations]);

    const handleUpdate = (model: TranslatableModel, id: number, field: string, lang: 'en' | 'nl', value: string) => {
        const newTranslations = translations.map(t => {
            if (t.model === model && t.id === id && t.field === field) {
                return { ...t, [lang]: value, isDirty: true };
            }
            return t;
        });
        setTranslations(newTranslations);

        // Auto-save after 2 seconds of inactivity
        if (autoSaveEnabled) {
            if (autoSaveTimerRef.current) {
                clearTimeout(autoSaveTimerRef.current);
            }
            autoSaveTimerRef.current = setTimeout(() => {
                const row = newTranslations.find(t => t.model === model && t.id === id && t.field === field);
                if (row) {
                    saveRow(row);
                }
            }, 2000);
        }
    };

    const saveRow = async (row: TranslationRow) => {
        const rowKey = `${row.model}-${row.id}-${row.field}`;
        setSaving(prev => new Set(prev).add(rowKey));

        try {
            const endpointMap: Record<string, string> = {
                'Hero': `/api/hero`,
                'About': `/api/about`,
                'Feature': `/api/features/${row.id}`,
                'Room': `/api/rooms/${row.id}`,
                'Testimonial': `/api/testimonials/${row.id}`,
                'Event': `/api/events/${row.id}`,
                'PageHero': `/api/page-hero`,
                'GalleryImage': `/api/gallery/${row.id}`
            };

            const url = endpointMap[row.model];
            const resFetch = await fetch(url);
            const currentData = await resFetch.json();

            let payload;
            if (row.model === 'PageHero') {
                payload = currentData.find((p: any) => p.id === row.id);
            } else if (Array.isArray(currentData)) {
                payload = currentData.find((i: any) => i.id === row.id);
            } else {
                payload = currentData;
            }

            if (!payload) throw new Error('Item not found');

            const updateData = {
                ...payload,
                [`${row.field}En`]: row.en,
                [`${row.field}Nl`]: row.nl,
            };

            const finalUrl = row.model === 'PageHero'
                ? `/api/page-hero/${payload.page}`
                : url;

            const response = await fetch(finalUrl, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateData),
            });

            if (response.ok) {
                // Mark as not dirty
                setTranslations(prev => prev.map(t =>
                    t.model === row.model && t.id === row.id && t.field === row.field
                        ? { ...t, isDirty: false }
                        : t
                ));
            } else {
                throw new Error('Save failed');
            }
        } catch (error) {
            console.error('Error saving:', error);
            setMessage('❌ Erreur lors de l\'enregistrement');
        } finally {
            setSaving(prev => {
                const newSet = new Set(prev);
                newSet.delete(rowKey);
                return newSet;
            });
        }
    };

    const saveAllDirty = async () => {
        const dirtyRows = currentPageData.rows.filter(r => r.isDirty);
        if (dirtyRows.length === 0) {
            setMessage('✅ Aucune modification à enregistrer');
            setTimeout(() => setMessage(''), 2000);
            return;
        }

        setMessage(`💾 Enregistrement de ${dirtyRows.length} traduction${dirtyRows.length > 1 ? 's' : ''}...`);

        for (const row of dirtyRows) {
            await saveRow(row);
        }

        setMessage(`✅ ${dirtyRows.length} traduction${dirtyRows.length > 1 ? 's enregistrées' : ' enregistrée'}`);
        setTimeout(() => setMessage(''), 3000);
    };

    // Organize by pages
    const pages: PageData[] = [
        {
            pageName: 'Galerie',
            pageKey: 'galerie',
            icon: ImageIcon,
            rows: [
                ...translations.filter(t => t.model === 'PageHero' && t.itemName.includes('galerie')),
                ...translations.filter(t => t.model === 'GalleryImage')
            ]
        },
        {
            pageName: 'Chambres',
            pageKey: 'chambres',
            icon: Bed,
            rows: [
                ...translations.filter(t => t.model === 'PageHero' && t.itemName.includes('chambres')),
                ...translations.filter(t => t.model === 'Room')
            ]
        },
        {
            pageName: 'Événements',
            pageKey: 'evenements',
            icon: Calendar,
            rows: [
                ...translations.filter(t => t.model === 'PageHero' && t.itemName.includes('evenements')),
                ...translations.filter(t => t.model === 'Event')
            ]
        },
        {
            pageName: 'Accueil',
            pageKey: 'accueil',
            icon: Home,
            rows: [
                ...translations.filter(t => t.model === 'Hero'),
                ...translations.filter(t => t.model === 'About'),
                ...translations.filter(t => t.model === 'Feature'),
                ...translations.filter(t => t.model === 'Testimonial')
            ]
        },
        {
            pageName: 'Séminaires',
            pageKey: 'seminaires',
            icon: GraduationCap,
            rows: translations.filter(t => t.model === 'PageHero' && t.itemName.includes('seminaires'))
        },
        {
            pageName: 'Carte-Cadeau',
            pageKey: 'carte-cadeau',
            icon: Gift,
            rows: translations.filter(t => t.model === 'PageHero' && t.itemName.includes('carte-cadeau'))
        },
        {
            pageName: 'Contact',
            pageKey: 'contact',
            icon: Phone,
            rows: translations.filter(t => t.model === 'PageHero' && t.itemName.includes('contact'))
        },
        {
            pageName: 'À Propos',
            pageKey: 'a-propos',
            icon: Info,
            rows: translations.filter(t => t.model === 'PageHero' && t.itemName.includes('a-propos'))
        }
    ].filter(p => p.rows.length > 0);

    const currentPageData = pages.find(p => p.pageKey === activePage) || pages[0] || {
        pageName: 'Aucune page',
        pageKey: 'none',
        icon: Info,
        rows: []
    };

    // Apply incomplete filter
    const filteredRows = showOnlyIncomplete
        ? currentPageData.rows.filter(r => !r.en || !r.nl)
        : currentPageData.rows;

    const fieldLabels: Record<string, string> = {
        'badge': 'Badge',
        'title': 'Titre',
        'subtitle': 'Sous-titre',
        'description': 'Description',
        'location': 'Localisation',
        'name': 'Nom',
        'capacity': 'Capacité',
        'surface': 'Surface',
        'bedding': 'Literie',
        'bathroom': 'Salle de bain',
        'text': 'Texte',
        'duration': 'Durée',
        'category': 'Catégorie',
        'keyPoint1Title': 'Point Clé 1 - Titre',
        'keyPoint1Text': 'Point Clé 1 - Texte',
        'keyPoint2Title': 'Point Clé 2 - Titre',
        'keyPoint2Text': 'Point Clé 2 - Texte',
        'keyPoint3Title': 'Point Clé 3 - Titre',
        'keyPoint3Text': 'Point Clé 3 - Texte',
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-20">
                <div className="flex flex-col items-center space-y-4">
                    <Loader2 className="w-8 h-8 text-or animate-spin" />
                    <p className="text-sm text-noir/40">Chargement des traductions...</p>
                </div>
            </div>
        );
    }

    const dirtyCount = currentPageData.rows.filter(r => r.isDirty).length;
    const completedCount = currentPageData.rows.filter(r => r.en && r.nl).length;
    const totalCount = currentPageData.rows.length;

    return (
        <AdminWrapper
            title="Traductions Rapides"
            description="Interface optimisée pour traduire rapidement votre site."
            message={message}
        >
            <div className="space-y-6 pb-20">
                {/* Page Tabs */}
                <div className="bg-white rounded-xl border border-noir/10 p-2">
                    <div className="flex items-center gap-2 overflow-x-auto">
                        {pages.map((page) => {
                            const Icon = page.icon;
                            const isActive = activePage === page.pageKey;
                            const pageCompleted = page.rows.filter(r => r.en && r.nl).length;
                            const pageTotal = page.rows.length;
                            const progress = pageTotal > 0 ? (pageCompleted / pageTotal) * 100 : 0;

                            return (
                                <button
                                    key={page.pageKey}
                                    onClick={() => setActivePage(page.pageKey)}
                                    className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all whitespace-nowrap ${isActive
                                        ? 'bg-or text-white shadow-lg shadow-or/20'
                                        : 'bg-noir/[0.02] text-noir/60 hover:bg-noir/[0.05] hover:text-noir'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span className="text-sm font-medium">{page.pageName}</span>
                                    <span className={`text-xs ${isActive ? 'text-white/80' : 'text-noir/40'}`}>
                                        {Math.round(progress)}%
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Stats & Actions Bar */}
                <div className="bg-white rounded-xl border border-noir/10 p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-2">
                                <div className="w-32 h-2 bg-noir/5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-or to-emerald-500 transition-all"
                                        style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
                                    />
                                </div>
                                <span className="text-sm font-medium text-noir/60">
                                    {completedCount}/{totalCount}
                                </span>
                            </div>

                            {/* Filter Buttons */}
                            <div className="flex items-center bg-noir/[0.02] p-1 rounded-lg border border-noir/10">
                                <button
                                    onClick={() => setShowOnlyIncomplete(false)}
                                    className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${!showOnlyIncomplete
                                        ? 'bg-white text-noir shadow-sm'
                                        : 'text-noir/40 hover:text-noir'
                                        }`}
                                >
                                    Tout
                                </button>
                                <button
                                    onClick={() => setShowOnlyIncomplete(true)}
                                    className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${showOnlyIncomplete
                                        ? 'bg-white text-or shadow-sm'
                                        : 'text-noir/40 hover:text-noir'
                                        }`}
                                >
                                    À traduire ({totalCount - completedCount})
                                </button>
                            </div>

                            {dirtyCount > 0 && (
                                <div className="flex items-center space-x-2 px-3 py-1.5 bg-orange-50 text-orange-600 rounded-lg">
                                    <Circle className="w-3 h-3 fill-current" />
                                    <span className="text-xs font-medium">{dirtyCount} modification{dirtyCount > 1 ? 's' : ''} non enregistrée{dirtyCount > 1 ? 's' : ''}</span>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center space-x-3">
                            <label className="flex items-center space-x-2 text-sm text-noir/60 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={autoSaveEnabled}
                                    onChange={(e) => setAutoSaveEnabled(e.target.checked)}
                                    className="w-4 h-4 rounded border-noir/20 text-or focus:ring-or/20"
                                />
                                <span>Auto-save</span>
                            </label>

                            {dirtyCount > 0 && (
                                <button
                                    onClick={saveAllDirty}
                                    className="flex items-center space-x-2 px-4 py-2 bg-or text-white rounded-lg hover:bg-noir transition-all shadow-lg shadow-or/20"
                                >
                                    <Save className="w-4 h-4" />
                                    <span className="text-sm font-medium">Tout enregistrer</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Translation Table */}
                <div className="bg-white rounded-xl border border-noir/10 overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 bg-noir/[0.02] border-b border-noir/5 px-6 py-4 sticky top-0 z-10">
                        <div className="col-span-3 text-xs font-bold uppercase tracking-wider text-noir/40">
                            Champ
                        </div>
                        <div className="col-span-3 text-xs font-bold uppercase tracking-wider text-noir/40">
                            🇫🇷 Français
                        </div>
                        <div className="col-span-3 text-xs font-bold uppercase tracking-wider text-noir/40">
                            🇬🇧 English
                        </div>
                        <div className="col-span-3 text-xs font-bold uppercase tracking-wider text-noir/40">
                            🇳🇱 Nederlands
                        </div>
                    </div>

                    {/* Table Rows */}
                    <div className="divide-y divide-noir/5">
                        {filteredRows.length === 0 ? (
                            <div className="p-20 text-center">
                                <p className="text-noir/40 text-sm">
                                    {showOnlyIncomplete
                                        ? '🎉 Toutes les traductions sont complètes pour cette page !'
                                        : 'Aucune traduction pour cette page.'}
                                </p>
                            </div>
                        ) : (
                            filteredRows.map((row) => {
                                const rowKey = `${row.model}-${row.id}-${row.field}`;
                                const isSaving = saving.has(rowKey);
                                const isComplete = row.en && row.nl;

                                return (
                                    <div
                                        key={rowKey}
                                        className={`grid grid-cols-12 gap-4 px-6 py-4 items-start hover:bg-noir/[0.01] transition-colors ${row.isDirty ? 'bg-orange-50/50' : ''
                                            }`}
                                    >
                                        {/* Field Label */}
                                        <div className="col-span-3 space-y-1 pt-2">
                                            <div className="flex items-center space-x-2">
                                                {isSaving ? (
                                                    <Loader2 className="w-4 h-4 text-or animate-spin" />
                                                ) : isComplete ? (
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                ) : (
                                                    <Circle className="w-4 h-4 text-noir/20" />
                                                )}
                                                <span className="text-sm font-medium text-noir">
                                                    {fieldLabels[row.field] || row.field}
                                                </span>
                                            </div>
                                            {row.itemName !== currentPageData.pageName && (
                                                <p className="text-xs text-noir/40 pl-6">{row.itemName}</p>
                                            )}
                                        </div>

                                        {/* French (Read-only) */}
                                        <div className="col-span-3">
                                            <div className="p-3 bg-noir/[0.02] rounded-lg border border-noir/5 min-h-[60px]">
                                                <p className="text-xs text-noir leading-relaxed">{row.fr}</p>
                                            </div>
                                        </div>

                                        {/* English */}
                                        <div className="col-span-3">
                                            <textarea
                                                value={row.en}
                                                onChange={(e) => handleUpdate(row.model, row.id, row.field, 'en', e.target.value)}
                                                placeholder="English translation..."
                                                rows={2}
                                                className="w-full bg-white border border-noir/10 text-xs text-noir p-3 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none placeholder:text-noir/20"
                                            />
                                        </div>

                                        {/* Dutch */}
                                        <div className="col-span-3">
                                            <textarea
                                                value={row.nl}
                                                onChange={(e) => handleUpdate(row.model, row.id, row.field, 'nl', e.target.value)}
                                                placeholder="Nederlandse vertaling..."
                                                rows={2}
                                                className="w-full bg-white border border-noir/10 text-xs text-noir p-3 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all resize-none placeholder:text-noir/20"
                                            />
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </AdminWrapper>
    );
}
