'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Calendar, Users, MapPin, Clock, Utensils, Mic, Heart, LucideIcon } from 'lucide-react';
import ImageUpload from './ImageUpload';
import AdminWrapper from './AdminWrapper';
import Image from 'next/image';

interface Event {
  id: number;
  title: string;
  description: string;
  icon: string;
  imageUrl: string;
  capacity: string;
  duration: string;
  countDownDate?: string | null; // Use a distinct name for the optional date field if needed, but 'date' matches schema
  date?: string | null;
  order: number;
}

const iconMap: { [key: string]: LucideIcon } = {
  Calendar,
  Users,
  MapPin,
  Clock,
  Utensils,
  Mic,
  Heart,
};

export default function EventsEditor() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) return;

    try {
      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('✅ Événement supprimé avec succès');
        fetchEvents();
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
      title="Vie Locale & Régionale"
      description="Promouvez les activités, festivals et événements incontournables de la région de Silly."
      message={message}
      previewUrl="/evenements"
    >
      <div className="space-y-8">
        <div className="flex justify-end">
          {!isAdding && !editingEvent && (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center space-x-2 bg-white border border-noir/5 hover:border-or/50 hover:bg-or/5 text-noir px-6 py-3 rounded-xl transition-all duration-300 group shadow-sm"
            >
              <Plus className="w-5 h-5 text-or group-hover:scale-110 transition-transform" />
              <span className="font-body font-bold text-sm">Ajouter une activité</span>
            </button>
          )}
        </div>

        {(isAdding || editingEvent) && (
          <div className="animate-slide-in-top">
            <EventForm
              event={editingEvent || undefined}
              onCancel={() => {
                setIsAdding(false);
                setEditingEvent(null);
              }}
              onSuccess={() => {
                setIsAdding(false);
                setEditingEvent(null);
                fetchEvents();
                setMessage(editingEvent ? '✅ Événement mis à jour' : '✅ Nouvel événement ajouté');
                setTimeout(() => setMessage(''), 3000);
              }}
            />
          </div>
        )}

        {!isAdding && !editingEvent && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.length === 0 ? (
              <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
                <Calendar className="w-12 h-12 text-white/10 mx-auto mb-4" />
                <p className="text-white/40 font-body">Aucun événement n&apos;est programmé.</p>
              </div>
            ) : (
              events.map((event) => {
                const IconComponent = iconMap[event.icon] || Calendar;
                return (
                  <div
                    key={event.id}
                    className="group relative bg-white border border-noir/5 rounded-2xl overflow-hidden hover:border-or/30 transition-all duration-500 shadow-sm hover:shadow-xl"
                  >
                    <div className="aspect-[21/9] relative overflow-hidden">
                      <Image
                        src={event.imageUrl || '/placeholder-event.jpg'}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-noir/60 via-noir/20 to-transparent" />
                      <div className="absolute top-4 right-4 flex space-x-2">
                        <button
                          onClick={() => setEditingEvent(event)}
                          className="p-2.5 bg-white/90 backdrop-blur-md rounded-xl text-noir hover:bg-or hover:text-white transition-all duration-300 shadow-lg"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="p-2.5 bg-white/90 backdrop-blur-md rounded-xl text-noir hover:bg-red-500 hover:text-white transition-all duration-300 shadow-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="absolute bottom-4 left-6 flex items-center space-x-3">
                        <div className="p-2.5 bg-or rounded-xl text-noir">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-display text-white">{event.title}</h3>
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-sm font-body text-noir/50 line-clamp-2 mb-6 h-10 italic">
                        &quot;{event.description}&quot;
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-noir/5">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1.5 text-noir/30 text-xs font-body">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{event.capacity}</span>
                          </div>
                          <div className="flex items-center space-x-1.5 text-noir/30 text-xs font-body border-l border-noir/10 pl-4">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{event.duration}</span>
                          </div>
                        </div>
                        <div className="text-[10px] font-body text-noir/20 uppercase tracking-[0.2em] bg-noir/[0.02] px-2 py-1 rounded">
                          Ordre {event.order}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </AdminWrapper>
  );
}

function EventForm({ event, onCancel, onSuccess }: {
  event?: Event;
  onCancel: () => void;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    title: event?.title || '',
    description: event?.description || '',
    icon: event?.icon || 'Calendar',
    imageUrl: event?.imageUrl || '',
    capacity: event?.capacity || '',
    duration: event?.duration || '',
    date: event?.date ? new Date(event.date).toISOString().slice(0, 16) : '', // Format for datetime-local
    order: event?.order || 1,
  });
  const [saving, setSaving] = useState(false);

  const icons = [
    { value: 'Calendar', label: 'Calendrier', icon: Calendar },
    { value: 'Users', label: 'Groupes', icon: Users },
    { value: 'MapPin', label: 'Lieu', icon: MapPin },
    { value: 'Clock', label: 'Temps', icon: Clock },
    { value: 'Utensils', label: 'Gastronomie', icon: Utensils },
    { value: 'Mic', label: 'Conférence', icon: Mic },
    { value: 'Heart', label: 'Mariage', icon: Heart },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = event ? `/api/events/${event.id}` : '/api/events';
      const method = event ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          date: formData.date ? new Date(formData.date).toISOString() : null
        }),
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
      <div className="absolute top-0 right-0 w-32 h-32 bg-or/5 rounded-full blur-3xl" />

      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-display text-noir">
          {event ? 'Modifier l&apos;activité' : 'Nouvelle découverte régionale'}
        </h3>
        <button onClick={onCancel} className="p-2 text-noir/20 hover:text-noir transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <label className={labelClasses}>Nom de l&apos;activité / événement</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                placeholder="ex: Marché artisanal de Silly"
                className={inputClasses}
              />
            </div>

            <div>
              <label className={labelClasses}>Description courte</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={6}
                className={`${inputClasses} resize-y min-h-[150px]`}
                placeholder="Présentez l'événement. Les retours à la ligne seront conservés sur le site."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Icône</label>
                <div className="relative">
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    required
                    className={`${inputClasses} appearance-none cursor-pointer`}
                  >
                    {icons.map((icon) => (
                      <option key={icon.value} value={icon.value} className="bg-white text-noir">{icon.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className={labelClasses}>Ordre</label>
                <input
                  type="number"
                  min="1"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  className={inputClasses}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <ImageUpload
              value={formData.imageUrl}
              onChange={(url) => setFormData({ ...formData, imageUrl: url })}
              label="Visuel de présentation"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClasses}>Lieu ou Distance</label>
            <input
              type="text"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
              required
              placeholder="Ex: Centre de Silly (5 min)"
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>Date ou Période</label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              required
              placeholder="Ex: Tous les dimanches matin"
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>Date précise (Optionnel)</label>
            <input
              type="datetime-local"
              value={formData.date || ''}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className={inputClasses}
            />
            <p className="text-[10px] text-noir/40 mt-1 ml-1 font-body">
              Pour le tri (Passés / À venir)
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4 pt-6 border-t border-noir/5">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-or text-white font-body font-bold py-4 rounded-xl hover:shadow-[0_10px_30px_rgba(198,173,122,0.3)] transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            <Save className="w-5 h-5" />
            <span>{saving ? 'Enregistrement...' : 'Enregistrer l&apos;activité'}</span>
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

