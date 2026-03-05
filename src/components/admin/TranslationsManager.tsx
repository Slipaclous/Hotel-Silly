'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Save, Check, Home, Bed, Image as ImageIcon, Calendar, GraduationCap, Gift, Phone, Info, Loader2, CheckCircle2, Circle, Search, X, Menu, Layout } from 'lucide-react';
import AdminWrapper from './AdminWrapper';

type TranslatableModel =
    | 'Hero' | 'About' | 'Feature' | 'Room' | 'Testimonial' | 'Event'
    | 'PageHero' | 'GalleryImage' | 'RoomService' | 'HomeRoomSection'
    | 'GiftCardPage' | 'GiftCardPackage' | 'SeminarPage' | 'SeminarFeature' | 'SeminarPackage';

interface TranslationRow {
    id: number;
    model: TranslatableModel;
    field: string;
    itemName: string;
    groupLabel?: string;
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
    const [activePage, setActivePage] = useState('accueil');
    const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
    const [showOnlyIncomplete, setShowOnlyIncomplete] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
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
                { name: 'GalleryImage', url: '/api/gallery' },
                { name: 'RoomService', url: '/api/room-services' },
                { name: 'HomeRoomSection', url: '/api/home-room-section' },
                { name: 'GiftCardPage', url: '/api/gift-card-page' },
                { name: 'GiftCardPackage', url: '/api/gift-card-packages' },
                { name: 'SeminarPage', url: '/api/seminar-page' },
                { name: 'SeminarFeature', url: '/api/seminar-features' },
                { name: 'SeminarPackage', url: '/api/seminar-packages' }
            ];

            const results = await Promise.all(
                endpoints.map(async (e) => {
                    try {
                        const res = await fetch(e.url);
                        const data = await res.json();
                        return { name: e.name, data: Array.isArray(data) ? data : (data ? [data] : []) };
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
                        'Hero': ['badge', 'title', 'subtitle', 'description', 'location', 'footerDescription'],
                        'About': ['title', 'description', 'keyPoint1Title', 'keyPoint1Text', 'keyPoint2Title', 'keyPoint2Text', 'keyPoint3Title', 'keyPoint3Text', 'value1Title', 'value1Desc', 'value2Title', 'value2Desc', 'value3Title', 'value3Desc', 'lastSectionTitle', 'lastSectionDescription', 'accessTitle', 'accessSubtitle', 'byCar', 'byTrain', 'byBus'],
                        'Feature': ['title', 'description'],
                        'Room': ['name', 'description', 'price', 'capacity', 'surface', 'bedding', 'bathroom'],
                        'Testimonial': ['location', 'text'],
                        'Event': ['title', 'description', 'capacity', 'duration'],
                        'PageHero': ['title', 'subtitle'],
                        'GalleryImage': ['title'],
                        'RoomService': ['title', 'description'],
                        'HomeRoomSection': ['title', 'titleItalic', 'description', 'ctaText'],
                        'GiftCardPage': ['introTitle', 'introDesc', 'badgeText1', 'badgeText2'],
                        'GiftCardPackage': ['title', 'description', 'price'],
                        'SeminarPage': ['introTitle', 'introDesc'],
                        'SeminarFeature': ['title', 'description'],
                        'SeminarPackage': ['title', 'description', 'price']
                    };

                    const fields = fieldMap[res.name as TranslatableModel] || [];

                    let itemName = '';
                    let groupLabel = '';

                    if (res.name === 'PageHero') {
                        const pageNames: Record<string, string> = {
                            'accueil': 'Accueil',
                            'chambres': 'Chambres',
                            'galerie': 'Galerie',
                            'evenements': 'Événements',
                            'seminaires': 'Séminaires',
                            'carte-cadeau': 'Carte Cadeau',
                            'contact': 'Contact',
                            'a-propos': 'À Propos'
                        };
                        itemName = pageNames[item.page] || item.page;
                        groupLabel = 'En-tête de page (Hero)';
                    } else if (res.name === 'Room') {
                        itemName = item.name || `Chambre #${item.id}`;
                        groupLabel = 'Chambre';
                    } else if (res.name === 'Event') {
                        itemName = item.title || `Événement #${item.id}`;
                        groupLabel = 'Événement';
                    } else if (res.name === 'Testimonial') {
                        itemName = `Témoignage de ${item.name}` || `Témoignage #${item.id}`;
                        groupLabel = 'Témoignage';
                    } else if (res.name === 'Feature') {
                        itemName = item.title || `Atout #${item.id}`;
                        groupLabel = 'Atout';
                    } else if (res.name === 'GalleryImage') {
                        itemName = item.title || `Image #${item.id}`;
                        groupLabel = 'Image Galerie';
                    } else if (res.name === 'RoomService') {
                        itemName = item.title || `Service #${item.id}`;
                        groupLabel = 'Service Inclus';
                    } else if (res.name === 'HomeRoomSection') {
                        itemName = 'Section Chambres (Home)';
                        groupLabel = 'Section Home';
                    } else if (res.name === 'GiftCardPackage') {
                        itemName = item.title || `Forfait Cadeau #${item.id}`;
                        groupLabel = 'Forfait';
                    } else if (res.name === 'SeminarFeature') {
                        itemName = item.title || `Caractéristique #${item.id}`;
                        groupLabel = 'Point fort';
                    } else if (res.name === 'SeminarPackage') {
                        itemName = item.title || `Forfait Séminaire #${item.id}`;
                        groupLabel = 'Forfait';
                    } else if (res.name === 'About') {
                        itemName = 'Contenu À Propos';
                        groupLabel = 'Corps de page';
                    } else if (res.name === 'Hero') {
                        itemName = 'Hero Principal';
                        groupLabel = 'En-tête';
                    } else if (res.name === 'GiftCardPage') {
                        itemName = 'Introduction Cadeaux';
                        groupLabel = 'Contenu';
                    } else if (res.name === 'SeminarPage') {
                        itemName = 'Introduction Séminaires';
                        groupLabel = 'Contenu';
                    } else {
                        itemName = res.name;
                    }

                    fields.forEach(field => {
                        rows.push({
                            id: item.id,
                            model: res.name as TranslatableModel,
                            field,
                            itemName,
                            groupLabel,
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

    const handleUpdate = (model: TranslatableModel, id: number, field: string, lang: 'fr' | 'en' | 'nl', value: string) => {
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
                'GalleryImage': `/api/gallery/${row.id}`,
                'RoomService': `/api/room-services/${row.id}`,
                'HomeRoomSection': `/api/home-room-section`,
                'GiftCardPage': `/api/gift-card-page`,
                'GiftCardPackage': `/api/gift-card-packages/${row.id}`,
                'SeminarPage': `/api/seminar-page`,
                'SeminarFeature': `/api/seminar-features/${row.id}`,
                'SeminarPackage': `/api/seminar-packages/${row.id}`
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
                [row.field]: row.fr,
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
            pageName: 'Navigation',
            pageKey: 'navigation',
            icon: Menu,
            rows: translations.filter(t => t.model === 'PageHero')
        },
        {
            pageName: 'Pied de page',
            pageKey: 'footer',
            icon: Layout,
            rows: translations.filter(t => t.model === 'Hero' && t.field === 'footerDescription')
        },
        {
            pageName: "Page d'accueil",
            pageKey: 'accueil',
            icon: Home,
            rows: [
                ...translations.filter(t => t.model === 'Hero' && t.field !== 'footerDescription'),
                ...translations.filter(t => t.model === 'Feature'),
                ...translations.filter(t => t.model === 'HomeRoomSection'),
                ...translations.filter(t => t.model === 'Testimonial')
            ]
        },
        {
            pageName: 'Chambres',
            pageKey: 'chambres',
            icon: Bed,
            rows: [
                ...translations.filter(t => t.model === 'Room'),
                ...translations.filter(t => t.model === 'RoomService')
            ]
        },
        {
            pageName: 'Événements',
            pageKey: 'evenements',
            icon: Calendar,
            rows: [
                ...translations.filter(t => t.model === 'Event')
            ]
        },
        {
            pageName: 'Galerie',
            pageKey: 'galerie',
            icon: ImageIcon,
            rows: [
                ...translations.filter(t => t.model === 'GalleryImage')
            ]
        },
        {
            pageName: 'Séminaires',
            pageKey: 'seminaires',
            icon: GraduationCap,
            rows: [
                ...translations.filter(t => t.model === 'SeminarPage'),
                ...translations.filter(t => t.model === 'SeminarFeature'),
                ...translations.filter(t => t.model === 'SeminarPackage')
            ]
        },
        {
            pageName: 'Carte-Cadeau',
            pageKey: 'carte-cadeau',
            icon: Gift,
            rows: [
                ...translations.filter(t => t.model === 'GiftCardPage'),
                ...translations.filter(t => t.model === 'GiftCardPackage')
            ]
        },
        {
            pageName: 'À Propos',
            pageKey: 'a-propos',
            icon: Info,
            rows: [
                ...translations.filter(t => t.model === 'About')
            ]
        },
        {
            pageName: 'Contact',
            pageKey: 'contact',
            icon: Phone,
            rows: [] // Les contenus de contact sont seulement dans PageHero (titre/sous-titre), maintenant dans Navigation
        }
    ].filter(p => p.rows.length > 0 || p.pageKey === 'navigation');

    const currentPageData = pages.find(p => p.pageKey === activePage) || pages[0] || {
        pageName: 'Aucune page',
        pageKey: 'none',
        icon: Info,
        rows: []
    };

    // Apply incomplete and search filters
    const filteredRows = currentPageData.rows
        .filter(r => !showOnlyIncomplete || (!r.fr || !r.en || !r.nl))
        .filter(r => {
            if (!searchQuery) return true;
            const query = searchQuery.toLowerCase();
            return (
                r.itemName?.toLowerCase().includes(query) ||
                r.field?.toLowerCase().includes(query) ||
                r.fr?.toLowerCase().includes(query) ||
                r.en?.toLowerCase().includes(query) ||
                r.nl?.toLowerCase().includes(query) ||
                r.groupLabel?.toLowerCase().includes(query)
            );
        });

    const fieldLabels: Record<string, string> = {
        'badge': 'Badge',
        'title': 'Titre',
        'subtitle': 'Sous-titre',
        'description': 'Description',
        'location': 'Localisation',
        'name': 'Nom',
        'price': 'Texte "À partir de" / Prix',
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
        'value1Title': 'Titre Bloc 1 (Valeurs)',
        'value1Desc': 'Texte Bloc 1 (Valeurs)',
        'value2Title': 'Titre Bloc 2 (Valeurs)',
        'value2Desc': 'Texte Bloc 2 (Valeurs)',
        'value3Title': 'Titre Bloc 3 (Valeurs)',
        'value3Desc': 'Texte Bloc 3 (Valeurs)',
        'lastSectionTitle': 'Dernière Section - Titre',
        'lastSectionDescription': 'Dernière Section - Texte',
        'footerDescription': 'Description Footer',
        'titleItalic': 'Titre Italique',
        'ctaText': 'Bouton (CTA)',
        'introTitle': 'Titre Introduction',
        'introDesc': 'Texte Introduction',
        'badgeText1': 'Badge Ligne 1',
        'badgeText2': 'Badge Ligne 2',
        'accessTitle': 'Accès - Titre',
        'accessSubtitle': 'Accès - Sous-titre',
        'byCar': 'Accès - Par voiture',
        'byTrain': 'Accès - Par train',
        'byBus': 'Accès - Par bus',
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
    const completedCount = currentPageData.rows.filter(r => r.fr && r.en && r.nl).length;
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
                            const pageCompleted = page.rows.filter(r => r.fr && r.en && r.nl).length;
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
                        <div className="flex items-center space-x-4 flex-1 mr-8">
                            {/* Progress bar */}
                            <div className="flex items-center space-x-3 min-w-[140px]">
                                <div className="w-24 h-2 bg-noir/5 rounded-full overflow-hidden border border-noir/[0.03]">
                                    <div
                                        className="h-full bg-gradient-to-r from-or to-emerald-500 transition-all duration-1000"
                                        style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
                                    />
                                </div>
                                <span className="text-xs font-bold text-noir/40 whitespace-nowrap tracking-tight">
                                    {completedCount} / {totalCount}
                                </span>
                            </div>

                            {/* Search bar */}
                            <div className="relative flex-1 max-w-sm group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-noir/20 group-focus-within:text-or transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Rechercher une traduction..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-10 py-2 bg-noir/[0.02] border border-noir/10 rounded-lg text-xs outline-none focus:ring-2 focus:ring-or/10 focus:border-or/40 focus:bg-white transition-all"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-noir/5 rounded-full text-noir/40 hover:text-noir"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                )}
                            </div>

                            {/* Filter Buttons */}
                            <div className="flex items-center bg-noir/[0.02] p-1 rounded-lg border border-noir/10 shrink-0">
                                <button
                                    onClick={() => setShowOnlyIncomplete(false)}
                                    className={`px-3 py-1.5 rounded text-[11px] font-bold uppercase tracking-wider transition-all ${!showOnlyIncomplete
                                        ? 'bg-white text-noir shadow-sm border border-noir/5'
                                        : 'text-noir/40 hover:text-noir'
                                        }`}
                                >
                                    Tout
                                </button>
                                <button
                                    onClick={() => setShowOnlyIncomplete(true)}
                                    className={`px-3 py-1.5 rounded text-[11px] font-bold uppercase tracking-wider transition-all ${showOnlyIncomplete
                                        ? 'bg-white text-or shadow-sm border border-noir/5'
                                        : 'text-noir/40 hover:text-noir'
                                        }`}
                                >
                                    À traduire ({totalCount - completedCount})
                                </button>
                            </div>

                            {dirtyCount > 0 && (
                                <div className="flex items-center space-x-2 px-3 py-1.5 bg-orange-50 text-orange-600 rounded-lg border border-orange-100 animate-pulse">
                                    <Circle className="w-2 h-2 fill-current" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">{dirtyCount} en attente</span>
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
                                const isComplete = row.fr && row.en && row.nl;

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
                                            {(row.groupLabel || (row.itemName !== currentPageData.pageName)) && (
                                                <p className="text-[10px] text-noir/40 pl-6 uppercase tracking-wider font-bold">
                                                    {row.groupLabel ? `${row.groupLabel} • ${row.itemName}` : row.itemName}
                                                </p>
                                            )}
                                        </div>

                                        {/* French */}
                                        <div className="col-span-3">
                                            <textarea
                                                value={row.fr}
                                                onChange={(e) => handleUpdate(row.model, row.id, row.field, 'fr', e.target.value)}
                                                placeholder="Traduction française..."
                                                rows={2}
                                                className="w-full bg-white border border-noir/10 text-xs text-noir p-3 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all resize-none placeholder:text-noir/20"
                                            />
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
