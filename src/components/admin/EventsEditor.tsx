'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Calendar, Users, MapPin, Clock, Utensils, Mic, Heart, LucideIcon, Sparkles, Layout, Type, Layers, Info } from 'lucide-react';
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
  countDownDate?: string | null;
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
        <div className="relative">
          <div className="w-10 h-10 rounded-full border-2 border-slate-100 animate-pulse" />
          <div className="absolute inset-0 w-10 h-10 rounded-full border-t-2 border-or animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <AdminWrapper
      title="Vie Locale & Régionale"
      description="Partagez l&apos;âme de la région en programmant les événements incontournables."
      message={message}
      previewUrl="/evenements"
    >
      <div className="space-y-12">
        {/* Header Actions */}
        <div className="flex justify-between items-center pb-8 border-b border-slate-100">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-display">Événements Programés</h3>
              <p className="text-[11px] text-slate-500 font-medium tracking-widest uppercase mt-1">{events.length} Activités au catalogue</p>
            </div>
          </div>
          {!isAdding && !editingEvent && (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center space-x-3 bg-or hover:bg-slate-900 text-white px-8 py-3.5 rounded-2xl transition-all duration-500 shadow-xl shadow-or/20 font-bold text-[11px] uppercase tracking-[0.2em] active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter une Date</span>
            </button>
          )}
        </div>

        {/* Form Container */}
        {(isAdding || editingEvent) && (
          <div className="animate-fade-in translate-y-[-12px]">
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

        {/* Events Grid */}
        {!isAdding && !editingEvent && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pb-20">
            {events.length === 0 ? (
              <div className="col-span-full py-32 text-center border-2 border-dashed border-slate-100 rounded-[40px] bg-slate-50/30">
                <Calendar className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[11px]">Aucun événement répertorié</p>
              </div>
            ) : (
              events.map((event) => {
                const IconComponent = iconMap[event.icon] || Calendar;
                return (
                  <div
                    key={event.id}
                    className="group flex flex-col sm:flex-row bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm transition-all duration-700 hover:shadow-2xl hover:shadow-slate-200/40"
                  >
                    <div className="sm:w-2/5 relative aspect-video sm:aspect-auto overflow-hidden bg-slate-100">
                      <Image
                        src={event.imageUrl || '/placeholder-event.jpg'}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 20vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 to-transparent sm:hidden" />

                      {/* Category/Icon Tag */}
                      <div className="absolute top-4 left-4 p-3 bg-white shadow-xl rounded-2xl text-or">
                        <IconComponent className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="sm:w-3/5 p-8 flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                        <div className="pr-4">
                          <h3 className="text-xl font-bold text-slate-900 font-display group-hover:text-or transition-colors uppercase tracking-tight">{event.title}</h3>
                          <div className="flex items-center space-x-2 mt-1.5 overflow-hidden">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded">ID#{event.id}</span>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Ordre {event.order}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setEditingEvent(event)}
                            className="w-10 h-10 bg-slate-50 hover:bg-slate-900 text-slate-400 hover:text-white rounded-xl transition-all duration-300 flex items-center justify-center active:scale-90"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(event.id)}
                            className="w-10 h-10 bg-slate-50 hover:bg-rose-500 text-slate-400 hover:text-white rounded-xl transition-all duration-300 flex items-center justify-center active:scale-90"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <p className="text-sm text-slate-500 line-clamp-2 mb-8 italic flex-1">
                        &quot;{event.description}&quot;
                      </p>

                      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-50 mt-auto">
                        <div className="flex items-center space-x-3 text-slate-600">
                          <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                            <MapPin className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-[11px] font-bold uppercase tracking-widest truncate">{event.capacity}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-slate-600">
                          <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                            <Clock className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-[11px] font-bold uppercase tracking-widest truncate">{event.duration}</span>
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
    date: event?.date ? new Date(event.date).toISOString().slice(0, 16) : '',
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

  const inputClasses = "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:bg-white focus:border-or focus:ring-4 focus:ring-or/5 outline-none transition-all duration-300 text-sm placeholder:text-slate-400 font-medium";
  const labelClasses = "flex items-center space-x-2 text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em] mb-2 ml-1";

  return (
    <div className="bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden mb-12">
      <div className="p-10 border-b border-slate-50 flex items-center justify-between bg-slate-50/20">
        <div className="flex items-center space-x-6">
          <div className="w-12 h-12 rounded-2xl bg-or text-white flex items-center justify-center shadow-lg">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-display">
              {event ? 'Mise à Jour Événement' : 'Création Expérience'}
            </h3>
            <p className="text-[11px] text-slate-500 font-medium tracking-[0.2em] mt-1 uppercase">Éditeur Vie Régionale</p>
          </div>
        </div>
        <button onClick={onCancel} className="w-10 h-10 rounded-xl border border-slate-100 flex items-center justify-center text-slate-300 hover:text-slate-900 transition-all">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-12 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-1 rounded-2xl">
              <label className={labelClasses}><Type className="w-3.5 h-3.5" /><span>Titre de l&apos;événement</span></label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                placeholder="ex: Festival des Fleurs de Silly"
                className={inputClasses}
              />
            </div>

            <div className="bg-white p-1 rounded-2xl">
              <label className={labelClasses}><Info className="w-3.5 h-3.5" /><span>Présentation narrative</span></label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={6}
                className={`${inputClasses} resize-none leading-relaxed`}
                placeholder="Racontez l'histoire et les détails de ce rendez-vous..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-1 rounded-2xl">
                <label className={labelClasses}><Layers className="w-3.5 h-3.5" /><span>Type / Icône</span></label>
                <div className="relative">
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    required
                    className={`${inputClasses} appearance-none cursor-pointer pr-10`}
                  >
                    {icons.map((icon) => (
                      <option key={icon.value} value={icon.value} className="bg-white text-slate-900">{icon.label}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <Layers className="w-3 h-3" />
                  </div>
                </div>
              </div>
              <div className="bg-white p-1 rounded-2xl md:col-span-2">
                <label className={labelClasses}><Layout className="w-3.5 h-3.5" /><span>Disposition</span></label>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    min="1"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className={inputClasses}
                  />
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest whitespace-nowrap">Priorité sur la grille</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-1 rounded-2xl">
              <ImageUpload
                value={formData.imageUrl}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                label="Atmosphère Visuelle"
              />
            </div>

            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-6">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-or" />
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Données Temporelles</h4>
              </div>
              <div>
                <label className={labelClasses}>Lieu / Accessibilité</label>
                <input type="text" value={formData.capacity} onChange={(e) => setFormData({ ...formData, capacity: e.target.value })} required placeholder="Ex: Place du village" className={inputClasses} />
              </div>
              <div>
                <label className={labelClasses}>Récurrence / Date</label>
                <input type="text" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} required placeholder="Ex: Tous les ans" className={inputClasses} />
              </div>
              <div>
                <label className={labelClasses}>Date technique tri</label>
                <input type="datetime-local" value={formData.date || ''} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className={inputClasses} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-12 border-t border-slate-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-10 py-5 rounded-2xl text-slate-400 hover:text-slate-900 font-bold uppercase tracking-widest text-[11px] transition-all"
          >
            Abandonner
          </button>

          <button
            type="submit"
            disabled={saving}
            className="px-12 py-5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-or transition-all duration-500 disabled:opacity-50 flex items-center space-x-3 shadow-xl hover:shadow-or/40 active:scale-95"
          >
            {saving ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Save className="w-5 h-5" />}
            <span className="uppercase tracking-[0.2em] text-[11px]">{saving ? 'Publication...' : 'Enregistrer les Détails'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

