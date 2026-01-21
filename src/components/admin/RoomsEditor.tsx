'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Bed, Users, Star, Images } from 'lucide-react';
import Image from 'next/image';
import ImageUpload from './ImageUpload';
import MultiImageUpload from './MultiImageUpload';
import AdminWrapper from './AdminWrapper';

interface GalleryImage {
  id: number;
  url: string;
}

interface Room {
  id: number;
  name: string;
  description: string;
  price: string;
  capacity: string;
  rating: number;
  imageUrl: string;
  images?: GalleryImage[];
  features: string[];
  order: number;
}

export default function RoomsEditor() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState('');

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
      title="Catalogue des Chambres"
      description="Gérez les suites et chambres de l'hôtel. Présentez vos plus beaux atouts."
      message={message}
      previewUrl="/chambres"
    >
      <div className="space-y-8">
        {/* Header Actions */}
        <div className="flex justify-end">
          {!isAdding && !editingRoom && (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center space-x-2 bg-white border border-noir/5 hover:border-or/50 hover:bg-or/5 text-noir px-6 py-3 rounded-xl transition-all duration-300 group shadow-sm"
            >
              <Plus className="w-5 h-5 text-or group-hover:scale-110 transition-transform" />
              <span className="font-body font-bold text-sm">Ajouter une suite</span>
            </button>
          )}
        </div>

        {/* Form Container */}
        {(isAdding || editingRoom) && (
          <div className="animate-slide-in-top">
            <RoomForm
              room={editingRoom || undefined}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rooms.length === 0 ? (
              <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
                <Bed className="w-12 h-12 text-white/10 mx-auto mb-4" />
                <p className="text-white/40 font-body">Aucune chambre pour le moment.</p>
              </div>
            ) : (
              rooms.map((room) => (
                <div
                  key={room.id}
                  className="group relative bg-white border border-noir/5 rounded-2xl overflow-hidden hover:border-or/30 transition-all duration-500 shadow-sm hover:shadow-xl"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={room.imageUrl || '/placeholder-room.jpg'}
                      alt={room.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-noir/40 via-transparent to-transparent opacity-60" />
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button
                        onClick={() => setEditingRoom(room)}
                        className="p-2.5 bg-white/90 backdrop-blur-md rounded-xl text-noir hover:bg-or hover:text-white transition-all duration-300 shadow-lg"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(room.id)}
                        className="p-2.5 bg-white/90 backdrop-blur-md rounded-xl text-noir hover:bg-red-500 hover:text-white transition-all duration-300 shadow-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {room.images && room.images.length > 0 && (
                      <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-noir/60 backdrop-blur-md rounded-lg text-white text-[10px] font-body flex items-center space-x-2">
                        <Images className="w-3.5 h-3.5 text-or" />
                        <span>{room.images.length} photos</span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-display text-noir">{room.name}</h3>
                      <div className="flex items-center text-or font-bold">
                        <Star className="w-3 h-3 fill-or mr-1" />
                        <span className="text-xs">{room.rating}/5</span>
                      </div>
                    </div>

                    <p className="text-sm text-noir/50 font-body line-clamp-2 mb-6">
                      {room.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-noir/5">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1.5 text-noir/30 text-xs font-body">
                          <Users className="w-3.5 h-3.5" />
                          <span>{room.capacity}</span>
                        </div>
                        <div className="flex items-center space-x-1.5 text-or text-xs font-bold font-body">
                          <span>{room.price}</span>
                        </div>
                      </div>
                      <div className="text-[10px] font-body text-noir/20 uppercase tracking-widest bg-noir/[0.03] px-2 py-1 rounded-md">
                        Ordre: {room.order}
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

function RoomForm({ room, onCancel, onSuccess }: {
  room?: Room;
  onCancel: () => void;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    name: room?.name || '',
    description: room?.description || '',
    price: room?.price || '',
    capacity: room?.capacity || '',
    rating: room?.rating || 5,
    imageUrl: room?.imageUrl || '',
    galleryImages: room?.images?.map(img => img.url) || [] as string[],
    features: room?.features?.join(', ') || '',
    order: room?.order || 1,
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

  const inputClasses = "w-full bg-noir/[0.03] border border-noir/10 rounded-xl px-4 py-3 text-noir focus:border-or/50 focus:ring-1 focus:ring-or/50 outline-none transition-all duration-300 font-body text-sm placeholder:text-noir/20 mt-1.5";
  const labelClasses = "text-xs font-body font-bold text-noir/40 uppercase tracking-widest ml-1";

  return (
    <div className="bg-blanc-100/50 rounded-3xl p-8 border border-noir/5 relative overflow-hidden group shadow-inner">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-or" />

      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-display text-noir">
          {room ? 'Éditer la suite' : 'Nouvelle suite de luxe'}
        </h3>
        <button onClick={onCancel} className="p-2 text-noir/20 hover:text-noir transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClasses}>Nom de la chambre</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="ex: Suite Présidentielle"
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>Prix par nuit</label>
            <input
              type="text"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
              placeholder="ex: À partir de 850€"
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label className={labelClasses}>Description détaillée</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            rows={6}
            className={`${inputClasses} resize-y min-h-[150px]`}
            placeholder="Décrivez les atouts majeurs de cette chambre. Les retours à la ligne seront conservés sur le site."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className={labelClasses}>Capacité</label>
            <input
              type="text"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
              required
              placeholder="ex: 2 Adultes"
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>Classement (1-5)</label>
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
            <label className={labelClasses}>Ordre d&apos;affichage</label>
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
          <label className={labelClasses}>Équipements (séparés par des virgules)</label>
          <input
            type="text"
            value={formData.features}
            onChange={(e) => setFormData({ ...formData, features: e.target.value })}
            placeholder="Vue mer, Balcon, WiFi, Climatisation, Mini-bar..."
            className={inputClasses}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <ImageUpload
            value={formData.imageUrl}
            onChange={(url) => setFormData({ ...formData, imageUrl: url })}
            label="Image de couverture (Principale)"
          />
          <MultiImageUpload
            values={formData.galleryImages}
            onChange={(urls) => setFormData({ ...formData, galleryImages: urls })}
            label="Galerie photos de la suite"
          />
        </div>

        <div className="flex items-center space-x-4 pt-6">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-or text-white font-body font-bold py-4 rounded-xl hover:shadow-[0_10px_30px_rgba(198,173,122,0.3)] transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            <Save className="w-5 h-5" />
            <span>{saving ? 'Enregistrement...' : 'Enregistrer les modifications'}</span>
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-8 py-4 rounded-xl bg-noir/[0.05] text-noir/60 hover:bg-noir/10 font-body font-bold transition-all"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}


