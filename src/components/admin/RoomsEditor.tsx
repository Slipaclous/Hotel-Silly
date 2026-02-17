'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Bed, Users, Star, Images } from 'lucide-react';
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
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-or"></div>
      </div>
    );
  }

  return (
    <AdminWrapper
      title="Gestions des Chambres"
      description="Ajoutez et modifiez les chambres et suites de l'hôtel."
      message={message}
      previewUrl="/chambres"
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-900 font-display">
            {isAdding ? 'Ajouter une chambre' : editingRoom ? 'Modifier la chambre' : 'Liste des chambres'}
          </h3>
          {!isAdding && !editingRoom && (
            <div className="flex items-center space-x-4">
              <LanguageTabs currentLocale={activeLocale} onChange={setActiveLocale} />
              <button
                onClick={() => setIsAdding(true)}
                className="flex items-center space-x-2 bg-or hover:bg-black text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-sm font-medium text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter</span>
              </button>
            </div>
          )}
        </div>

        {/* Form Container */}
        {(isAdding || editingRoom) && (
          <div className="animate-slide-in-top">
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {rooms.length === 0 ? (
              <div className="col-span-full py-16 text-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
                <Bed className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium text-sm">Aucune chambre pour le moment.</p>
              </div>
            ) : (
              rooms.map((room) => (
                <div
                  key={room.id}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
                    <Image
                      src={room.imageUrl || '/placeholder-room.jpg'}
                      alt={room.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => setEditingRoom(room)}
                        className="p-2 bg-white rounded-lg text-gray-700 hover:text-or shadow-sm hover:shadow-md transition-all"
                        title="Modifier"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(room.id)}
                        className="p-2 bg-white rounded-lg text-gray-700 hover:text-red-600 shadow-sm hover:shadow-md transition-all"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-md text-white text-[10px] font-medium flex items-center space-x-1.5">
                      <Images className="w-3 h-3" />
                      <span>{room.images?.length || 0}</span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-gray-900 line-clamp-1">
                        {activeLocale === 'fr' ? room.name : (activeLocale === 'en' ? (room.nameEn || room.name) : (room.nameNl || room.name))}
                      </h4>
                      <div className="flex items-center bg-gray-50 px-2 py-1 rounded text-xs font-semibold text-gray-600">
                        <Star className="w-3 h-3 text-or mr-1 fill-or" />
                        {room.rating}
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 line-clamp-2 mb-4 h-10">
                      {activeLocale === 'fr' ? room.description : (activeLocale === 'en' ? (room.descriptionEn || room.description) : (room.descriptionNl || room.description))}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
                      <div className="text-or font-bold text-sm">
                        {room.price}
                      </div>
                      <div className="text-xs text-gray-400 flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {activeLocale === 'fr' ? room.capacity : (activeLocale === 'en' ? (room.capacityEn || room.capacity) : (room.capacityNl || room.capacity))}
                      </div>
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
    capacity: room?.capacity || '',
    capacityEn: room?.capacityEn || '',
    capacityNl: room?.capacityNl || '',

    // Nouveaux champs
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

  const inputClasses = "w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:border-or focus:ring-1 focus:ring-or outline-none transition-all duration-200 text-sm placeholder:text-gray-400 mt-1.5";
  const labelClasses = "text-xs font-semibold text-gray-500 uppercase tracking-wide ml-0.5";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 relative overflow-hidden mb-12">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <div className="flex items-center space-x-6">
          <h3 className="text-xl font-bold text-gray-900 font-display">
            {room ? 'Éditer la chambre' : 'Nouvelle chambre'}
          </h3>
          <div className="translate-y-4">
            <LanguageTabs currentLocale={activeLocale} onChange={onLocaleChange} />
          </div>
        </div>
        <button onClick={onCancel} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className={labelClasses}>Nom de la chambre ({activeLocale.toUpperCase()})</label>
            <input
              type="text"
              name={getFieldName('name')}
              value={(formData as any)[getFieldName('name')]}
              onChange={handleChange}
              required={activeLocale === 'fr'}
              placeholder="ex: Suite Présidentielle"
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>Prix &quot;à partir de&quot; (Commun)</label>
            <input
              type="text"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
              placeholder="ex: 850€"
              className={inputClasses}
            />
          </div>
        </div>

        {/* Spécifications Techniques */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-sm text-gray-900 mb-4 flex items-center uppercase tracking-wide">
            <Bed className="w-4 h-4 mr-2 text-or" />
            Détails techniques ({activeLocale.toUpperCase()})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={labelClasses}>Surface (m²)</label>
              <input
                type="text"
                name={getFieldName('surface')}
                value={(formData as any)[getFieldName('surface')]}
                onChange={handleChange}
                placeholder="ex: 35m²"
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Literie</label>
              <input
                type="text"
                name={getFieldName('bedding')}
                value={(formData as any)[getFieldName('bedding')]}
                onChange={handleChange}
                placeholder="ex: King Size (180x200)"
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Salle de bain</label>
              <input
                type="text"
                name={getFieldName('bathroom')}
                value={(formData as any)[getFieldName('bathroom')]}
                onChange={handleChange}
                placeholder="ex: Douche à l'italienne"
                className={inputClasses}
              />
            </div>
            <div className="md:col-span-3 flex items-center mt-2 px-1">
              <input
                type="checkbox"
                id="petsAllowed"
                checked={formData.petsAllowed}
                onChange={(e) => setFormData({ ...formData, petsAllowed: e.target.checked })}
                className="w-4 h-4 text-or border-gray-300 rounded focus:ring-or cursor-pointer"
              />
              <label htmlFor="petsAllowed" className="ml-2 text-sm text-gray-600 cursor-pointer select-none">
                Animaux de compagnie acceptés (Commun)
              </label>
            </div>
          </div>
        </div>

        {/* Grille Tarifs */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-sm text-gray-900 mb-4 flex items-center uppercase tracking-wide">
            <Star className="w-4 h-4 mr-2 text-or" />
            Grille Tarifaire (Commun)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={labelClasses}>1 Personne</label>
              <input
                type="text"
                value={formData.price1Person}
                onChange={(e) => setFormData({ ...formData, price1Person: e.target.value })}
                placeholder="ex: 150€"
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>2 Personnes</label>
              <input
                type="text"
                value={formData.price2Persons}
                onChange={(e) => setFormData({ ...formData, price2Persons: e.target.value })}
                placeholder="ex: 180€"
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>3+ Personnes</label>
              <input
                type="text"
                value={formData.price3Persons}
                onChange={(e) => setFormData({ ...formData, price3Persons: e.target.value })}
                placeholder="ex: 220€"
                className={inputClasses}
              />
            </div>
          </div>
        </div>

        <div>
          <label className={labelClasses}>Description ({activeLocale.toUpperCase()})</label>
          <textarea
            name={getFieldName('description')}
            value={(formData as any)[getFieldName('description')]}
            onChange={handleChange}
            required={activeLocale === 'fr'}
            rows={5}
            className={`${inputClasses} resize-y min-h-[120px]`}
            placeholder="Description détaillée..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className={labelClasses}>Capacité ({activeLocale.toUpperCase()})</label>
            <input
              type="text"
              name={getFieldName('capacity')}
              value={(formData as any)[getFieldName('capacity')]}
              onChange={handleChange}
              required={activeLocale === 'fr'}
              placeholder="ex: 2 Adultes"
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>Note (Commun)</label>
            <input
              type="number"
              min="1"
              max="5"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
              required
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>Ordre (Commun)</label>
            <input
              type="number"
              min="1"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label className={labelClasses}>Équipements (séparés par des virgules) (Commun)</label>
          <input
            type="text"
            value={formData.features}
            onChange={(e) => setFormData({ ...formData, features: e.target.value })}
            placeholder="Vue mer, Balcon, WiFi, Climatisation..."
            className={inputClasses}
          />
        </div>

        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-8">
          <h4 className="font-bold text-sm text-blue-900 mb-4 flex items-center uppercase tracking-wide">
            <Plus className="w-4 h-4 mr-2 text-blue-600" />
            Lien Stardek (Réservation directe)
          </h4>
          <label className={labelClasses}>URL de réservation ({activeLocale.toUpperCase()})</label>
          <input
            type="url"
            name={getFieldName('bookingUrl')}
            value={(formData as any)[getFieldName('bookingUrl')]}
            onChange={handleChange}
            placeholder="https://hotels.stardek.com/..."
            className={inputClasses}
          />
          <p className="mt-2 text-xs text-blue-600 font-medium italic">
            Si ce lien est renseigné pour la langue actuelle, le bouton &quot;Réserver son séjour&quot; redirigera directement vers ce lien.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-gray-100">
          <ImageUpload
            value={formData.imageUrl}
            onChange={(url) => setFormData({ ...formData, imageUrl: url })}
            label="Image Principale (Commun)"
          />
          <MultiImageUpload
            values={formData.galleryImages}
            onChange={(urls) => setFormData({ ...formData, galleryImages: urls })}
            label="Galerie Photos (Commun)"
          />
        </div>

        <div className="flex items-center space-x-4 pt-6 border-t border-gray-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-all text-sm"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-or text-white font-bold rounded-lg hover:bg-black transition-all duration-200 disabled:opacity-50 flex items-center space-x-2 text-sm ml-auto shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Enregistrement...' : 'Enregistrer'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}


