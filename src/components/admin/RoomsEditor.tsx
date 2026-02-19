'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Bed, Users, Star, Images, ArrowRight, Layout, Euro, Maximize2, Bath, Dog, Link2, Sparkles } from 'lucide-react';
import Image from 'next/image';
import ImageUpload from './ImageUpload';
import MultiImageUpload from './MultiImageUpload';
import AdminWrapper from './AdminWrapper';
import LanguageTabs from './LanguageTabs';

type Locale = 'fr' | 'en' | 'nl';

interface GalleryImage {
  id: number;
  url: string;
}

interface Room {
  id: number;
  name: string;
  nameEn?: string;
  nameNl?: string;
  description: string;
  descriptionEn?: string;
  descriptionNl?: string;
  price: string;
  priceEn?: string;
  priceNl?: string;
  capacity: string;
  capacityEn?: string;
  capacityNl?: string;
  rating: number;
  imageUrl: string;
  images?: GalleryImage[];
  features: string[];
  order: number;
  surface?: string;
  surfaceEn?: string;
  surfaceNl?: string;
  bedding?: string;
  beddingEn?: string;
  beddingNl?: string;
  bathroom?: string;
  bathroomEn?: string;
  bathroomNl?: string;
  price1Person?: string;
  price2Persons?: string;
  price3Persons?: string;
  petsAllowed?: boolean;
  bookingUrl?: string;
  bookingUrlEn?: string;
  bookingUrlNl?: string;
}

export default function RoomsEditor() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState('');
  const [activeLocale, setActiveLocale] = useState<Locale>('fr');

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await fetch('/api/rooms');
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette chambre ?')) return;

    try {
      const response = await fetch(`/api/rooms/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('✅ Chambre supprimée avec succès');
        fetchRooms();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Erreur:', error);
      setMessage('❌ Erreur lors de la suppression');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <div className="relative">
          <div className="w-10 h-10 rounded-full border-2 border-slate-100 animate-pulse" />
          <div className="absolute inset-0 w-10 h-10 rounded-full border-t-2 border-or animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <AdminWrapper
      title="Catalogue des Chambres"
      description="Configurez l'offre hébergement avec finesse et précision."
      message={message}
      previewUrl="/chambres"
    >
      <div className="space-y-10">
        {/* Header Actions */}
        <div className="flex justify-between items-center pb-6 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-lg`}>
              {isAdding || editingRoom ? <Edit2 className="w-5 h-5" /> : <Bed className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-display">
                {isAdding ? 'Ajouter une chambre' : editingRoom ? `Modifier : ${editingRoom.name}` : 'Inventaire Actuel'}
              </h3>
              <p className="text-[12px] text-slate-500 font-medium tracking-wide italic">
                {isAdding || editingRoom ? 'Édition détaillée des prestations' : `${rooms.length} chambres configurées`}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {!isAdding && !editingRoom && (
              <button
                onClick={() => setIsAdding(true)}
                className="flex items-center space-x-2 bg-or hover:bg-slate-900 text-white px-6 py-2.5 rounded-xl transition-all duration-300 shadow-lg shadow-or/20 font-bold text-sm uppercase tracking-widest active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Nouveauté</span>
              </button>
            )}
            {(isAdding || editingRoom) && (
              <button
                onClick={() => { setIsAdding(false); setEditingRoom(null); }}
                className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-600 px-6 py-2.5 rounded-xl transition-all duration-300 font-bold text-sm uppercase tracking-widest"
              >
                <X className="w-4 h-4" />
                <span>Sortir</span>
              </button>
            )}
          </div>
        </div>

        {/* Form Container */}
        {(isAdding || editingRoom) && (
          <div className="animate-fade-in">
            <RoomForm
              room={editingRoom || undefined}
              activeLocale={activeLocale}
              onLocaleChange={setActiveLocale}
              onCancel={() => {
                setIsAdding(false);
                setEditingRoom(null);
              }}
              onSuccess={() => {
                setIsAdding(false);
                setEditingRoom(null);
                fetchRooms();
                setMessage(editingRoom ? '✅ Chambre mise à jour' : '✅ Nouvelle chambre ajoutée');
                setTimeout(() => setMessage(''), 3000);
              }}
            />
          </div>
        )}

        {/* Rooms Grid */}
        {!isAdding && !editingRoom && (
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8 pb-10">
            {rooms.length === 0 ? (
              <div className="col-span-full py-24 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Bed className="w-8 h-8 text-slate-300" />
                </div>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-[11px]">Aucun enregistrement</p>
                <button onClick={() => setIsAdding(true)} className="mt-4 text-or font-bold underline hover:text-slate-900 transition-colors">Créer la première chambre</button>
              </div>
            ) : (
              rooms.map((room) => (
                <div
                  key={room.id}
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 flex flex-col h-full"
                >
                  <div className="aspect-[16/10] relative overflow-hidden bg-slate-100">
                    <Image
                      src={room.imageUrl || '/placeholder-room.jpg'}
                      alt={room.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />

                    {/* Floating Controls */}
                    <div className="absolute top-4 right-4 flex space-x-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                      <button
                        onClick={() => setEditingRoom(room)}
                        className="w-10 h-10 bg-white/95 backdrop-blur-md rounded-xl text-slate-700 hover:text-or shadow-xl flex items-center justify-center transition-all duration-300 active:scale-90"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(room.id)}
                        className="w-10 h-10 bg-rose-500/90 backdrop-blur-md rounded-xl text-white hover:bg-rose-600 shadow-xl flex items-center justify-center transition-all duration-300 active:scale-90"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-xl text-white text-[10px] font-bold flex items-center space-x-2 border border-white/10 uppercase tracking-widest">
                      <Images className="w-3.5 h-3.5" />
                      <span>{room.images?.length || 0} Media</span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-slate-900 font-display line-clamp-1 group-hover:text-or transition-colors">
                          {activeLocale === 'fr' ? room.name : (activeLocale === 'en' ? (room.nameEn || room.name) : (room.nameNl || room.name))}
                        </h4>
                        <div className="flex items-center space-x-1.5 mt-1">
                          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Chambre N°{room.order}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-200" />
                          <span className="text-[10px] text-slate-400 font-medium italic">Synchronisé</span>
                        </div>
                      </div>
                      <div className="flex items-center bg-or/10 px-2.5 py-1 rounded-lg text-xs font-bold text-or ring-1 ring-or/20">
                        <Star className="w-3.5 h-3.5 text-or mr-1.5 fill-or" />
                        {room.rating}.0
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-auto">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Tarif de base</span>
                        <div className="text-xl font-bold text-slate-900">
                          {activeLocale === 'fr' ? room.price : (activeLocale === 'en' ? (room.priceEn || room.price) : (room.priceNl || room.price))}
                        </div>
                      </div>
                      <button
                        onClick={() => setEditingRoom(room)}
                        className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-or group-hover:text-white group-hover:border-or transition-all duration-300"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </AdminWrapper>
  );
}

function RoomForm({ room, activeLocale, onLocaleChange, onCancel, onSuccess }: {
  room?: Room;
  activeLocale: Locale;
  onLocaleChange: (locale: Locale) => void;
  onCancel: () => void;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    name: room?.name || '',
    nameEn: room?.nameEn || '',
    nameNl: room?.nameNl || '',
    description: room?.description || '',
    descriptionEn: room?.descriptionEn || '',
    descriptionNl: room?.descriptionNl || '',
    price: room?.price || '',
    priceEn: room?.priceEn || '',
    priceNl: room?.priceNl || '',
    capacity: room?.capacity || '',
    capacityEn: room?.capacityEn || '',
    capacityNl: room?.capacityNl || '',
    surface: room?.surface || '',
    surfaceEn: room?.surfaceEn || '',
    surfaceNl: room?.surfaceNl || '',
    bedding: room?.bedding || '',
    beddingEn: room?.beddingEn || '',
    beddingNl: room?.beddingNl || '',
    bathroom: room?.bathroom || '',
    bathroomEn: room?.bathroomEn || '',
    bathroomNl: room?.bathroomNl || '',
    price1Person: room?.price1Person || '',
    price2Persons: room?.price2Persons || '',
    price3Persons: room?.price3Persons || '',
    petsAllowed: room?.petsAllowed ?? true,
    rating: room?.rating || 5,
    imageUrl: room?.imageUrl || '',
    galleryImages: room?.images?.map(img => img.url) || [] as string[],
    features: room?.features?.join(', ') || '',
    order: room?.order || 1,
    bookingUrl: room?.bookingUrl || '',
    bookingUrlEn: room?.bookingUrlEn || '',
    bookingUrlNl: room?.bookingUrlNl || '',
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const data = {
      ...formData,
      features: formData.features.split(',').map(f => f.trim()).filter(f => f),
    };

    try {
      const url = room ? `/api/rooms/${room.id}` : '/api/rooms';
      const method = room ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        onSuccess();
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getFieldName = (base: string) => {
    if (activeLocale === 'fr') return base;
    return `${base}${activeLocale.charAt(0).toUpperCase()}${activeLocale.slice(1)}`;
  };

  const inputClasses = "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:bg-white focus:border-or focus:ring-4 focus:ring-or/5 outline-none transition-all duration-300 text-sm placeholder:text-slate-400 font-medium";
  const labelClasses = "flex items-center space-x-2 text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em] mb-2 ml-1";

  return (
    <div className="bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden mb-20 animate-fade-in translate-y-[-24px]">
      <div className="p-10 border-b border-slate-50 bg-slate-50/30 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-or to-or/80 text-white flex items-center justify-center shadow-lg shadow-or/20">
            <Sparkles className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 font-display">
              {room ? 'Édition Prestation' : 'Nouvelle Unité'}
            </h3>
            <p className="text-[12px] text-slate-500 font-medium uppercase tracking-[0.2em] mt-1">
              Configuration {activeLocale.toUpperCase()}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <LanguageTabs currentLocale={activeLocale} onChange={onLocaleChange} />
          <button onClick={onCancel} className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all shadow-sm active:scale-95">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-12 space-y-16">
        {/* IDENTITÉ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-or" />
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.3em]">Identité Visuelle & Textuelle</h4>
            </div>

            <div className="bg-white p-1 rounded-2xl">
              <label className={labelClasses}>Nom de l&apos;unité ({activeLocale.toUpperCase()})</label>
              <input
                type="text"
                name={getFieldName('name')}
                value={(formData as any)[getFieldName('name')]}
                onChange={handleChange}
                required={activeLocale === 'fr'}
                placeholder="ex: Suite Royale avec Vue"
                className={inputClasses}
              />
            </div>

            <div className="bg-white p-1 rounded-2xl">
              <label className={labelClasses}>Présentation détaillée ({activeLocale.toUpperCase()})</label>
              <textarea
                name={getFieldName('description')}
                value={(formData as any)[getFieldName('description')]}
                onChange={handleChange}
                required={activeLocale === 'fr'}
                rows={6}
                className={`${inputClasses} resize-none leading-relaxed`}
                placeholder="Décrivez l'expérience, le confort et l'atmosphère..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="bg-white p-1 rounded-2xl">
                <label className={labelClasses}>Texte du Prix ({activeLocale.toUpperCase()})</label>
                <input
                  type="text"
                  name={getFieldName('price')}
                  value={(formData as any)[getFieldName('price')]}
                  onChange={handleChange}
                  required={activeLocale === 'fr'}
                  placeholder="ex: À PARTIR DE 140€"
                  className={inputClasses}
                />
                <p className="text-[10px] text-slate-400 mt-2 italic font-medium">Texte affiché sur la carte (ex: &quot;À PARTIR DE 140€&quot;).</p>
              </div>
              <div className="bg-white p-1 rounded-2xl">
                <label className={labelClasses}>Capacité affichée ({activeLocale.toUpperCase()})</label>
                <input
                  type="text"
                  name={getFieldName('capacity')}
                  value={(formData as any)[getFieldName('capacity')]}
                  onChange={handleChange}
                  required={activeLocale === 'fr'}
                  placeholder="ex: 2 personnes"
                  className={inputClasses}
                />
                <p className="text-[10px] text-slate-400 mt-2 italic font-medium">Texte affiché (ex: &quot;2 personnes&quot; ou &quot;Jusqu&apos;à 4 pers.&quot;).</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.3em]">Image d&apos;appel</h4>
            </div>
            <ImageUpload
              value={formData.imageUrl}
              onChange={(url) => setFormData({ ...formData, imageUrl: url })}
              label="Visuel Principal"
            />
          </div>
        </div>

        {/* SPÉCIFICATIONS */}
        <div className="space-y-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <Layout className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 font-display">Spécifications Techniques</h4>
              <p className="text-[11px] text-slate-500 font-medium">Les attributs concrets de la chambre.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-slate-50 p-2 rounded-2xl border border-slate-100">
              <label className={labelClasses}><Maximize2 className="w-3.5 h-3.5" /><span>Surface</span></label>
              <input
                type="text"
                name={getFieldName('surface')}
                value={(formData as any)[getFieldName('surface')]}
                onChange={handleChange}
                placeholder="ex: 45m²"
                className={inputClasses}
              />
            </div>
            <div className="bg-slate-50 p-2 rounded-2xl border border-slate-100">
              <label className={labelClasses}><Bed className="w-3.5 h-3.5" /><span>Literie</span></label>
              <input
                type="text"
                name={getFieldName('bedding')}
                value={(formData as any)[getFieldName('bedding')]}
                onChange={handleChange}
                placeholder="ex: King Size"
                className={inputClasses}
              />
            </div>
            <div className="bg-slate-50 p-2 rounded-2xl border border-slate-100">
              <label className={labelClasses}><Bath className="w-3.5 h-3.5" /><span>Salle de bain</span></label>
              <input
                type="text"
                name={getFieldName('bathroom')}
                value={(formData as any)[getFieldName('bathroom')]}
                onChange={handleChange}
                placeholder="ex: Baignoire"
                className={inputClasses}
              />
            </div>
            <div className="bg-slate-50 p-2 rounded-2xl border border-slate-100 flex flex-col justify-center px-4">
              <div className="flex items-center justify-between">
                <label htmlFor="petsAllowed" className="text-[11px] font-bold text-slate-500 uppercase">Animaux</label>
                <div
                  onClick={() => setFormData({ ...formData, petsAllowed: !formData.petsAllowed })}
                  className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-500 ${formData.petsAllowed ? 'bg-emerald-500' : 'bg-slate-300'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-500 transform ${formData.petsAllowed ? 'translate-x-6' : 'translate-x-0'}`} />
                </div>
              </div>
              <span className="text-[10px] text-slate-400 font-medium mt-1">{formData.petsAllowed ? 'Acceptés' : 'Refusés'}</span>
            </div>
          </div>
        </div>

        {/* TARIFS & CAPACITÉ */}
        <div className="space-y-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Euro className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 font-display">Tarification & Capacité</h4>
              <p className="text-[11px] text-slate-500 font-medium">Gérez la structure des prix et le type d&apos;occupation.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="bg-emerald-50/20 p-8 rounded-[32px] border border-emerald-100/50 space-y-8 lg:col-span-4">
              <div>
                <label className={labelClasses}>Détail indicatif des tarifs (Commun)</label>
                <p className="text-[10px] text-slate-400 mb-6 italic font-medium">Ces tarifs sont affichés uniquement dans le détail de la chambre (Popup).</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-[10px] font-bold text-emerald-600/60 uppercase mb-2 block ml-1">Pour 1 pers.</label>
                    <input type="text" value={formData.price1Person} onChange={(e) => setFormData({ ...formData, price1Person: e.target.value })} placeholder="80€" className={inputClasses} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-emerald-600/60 uppercase mb-2 block ml-1">Pour 2 pers.</label>
                    <input type="text" value={formData.price2Persons} onChange={(e) => setFormData({ ...formData, price2Persons: e.target.value })} placeholder="120€" className={inputClasses} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-emerald-600/60 uppercase mb-2 block ml-1">Pour 3+ pers.</label>
                    <input type="text" value={formData.price3Persons} onChange={(e) => setFormData({ ...formData, price3Persons: e.target.value })} placeholder="160€" className={inputClasses} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SERVICES & RÉSERVATION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Link2 className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 font-display">Réservation Directe</h4>
            </div>
            <div className="bg-blue-50/20 p-8 rounded-3xl border border-blue-100/50">
              <label className={labelClasses}>Lien Moteur de Réservation ({activeLocale.toUpperCase()})</label>
              <input
                type="url"
                name={getFieldName('bookingUrl')}
                value={(formData as any)[getFieldName('bookingUrl')]}
                onChange={handleChange}
                placeholder="https://hotels.stardek.com/..."
                className={inputClasses}
              />
              <div className="mt-4 flex items-center space-x-2 text-blue-600">
                <Sparkles className="w-3.5 h-3.5" />
                <p className="text-[10px] font-bold uppercase tracking-wider italic leading-relaxed">
                  Redirection prioritaire pour la langue {activeLocale}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center text-xs">
                <Layout className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 font-display">Composants d&apos;Affichage</h4>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className={labelClasses}>Priorité d&apos;Ordre</label>
                <input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })} className={inputClasses} />
              </div>
              <div>
                <label className={labelClasses}>Note Étoilée</label>
                <div className="flex bg-slate-50 border border-slate-200 rounded-xl p-1.5 justify-around">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button key={star} type="button" onClick={() => setFormData({ ...formData, rating: star })} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${formData.rating >= star ? 'text-or' : 'text-slate-300 hover:text-or/50'}`}>
                      <Star className={`w-4 h-4 ${formData.rating >= star ? 'fill-or' : ''}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <label className={labelClasses}>Équipements (virgules)</label>
              <input type="text" value={formData.features} onChange={(e) => setFormData({ ...formData, features: e.target.value })} placeholder="WiFi, Climatisation, Minibar..." className={inputClasses} />
            </div>
          </div>
        </div>

        {/* GALERIE PHOTOS */}
        <div className="space-y-8 pt-8 border-t border-slate-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Images className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 font-display">Galerie Médias</h4>
              <p className="text-[11px] text-slate-500 font-medium italic">Photos illustratrices de l&apos;unité d&apos;hébergement.</p>
            </div>
          </div>

          <MultiImageUpload
            values={formData.galleryImages}
            onChange={(urls) => setFormData({ ...formData, galleryImages: urls })}
            label="Collection d'images (Commun)"
          />
        </div>

        {/* FOOTER ACTIONS */}
        <div className="flex items-center justify-between pt-12 border-t border-slate-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-8 py-3.5 rounded-2xl text-slate-400 hover:text-slate-900 font-bold uppercase tracking-widest text-[11px] transition-all"
          >
            Annuler l&apos;édition
          </button>

          <button
            type="submit"
            disabled={saving}
            className="px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-or transition-all duration-500 disabled:opacity-50 flex items-center space-x-3 shadow-xl hover:shadow-or/40 active:scale-95"
          >
            {saving ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            <span className="uppercase tracking-[0.2em] text-[11px]">{saving ? 'Sauvegarde...' : 'Publier les modifications'}</span>
          </button>
        </div>
      </form >
    </div >
  );
}


