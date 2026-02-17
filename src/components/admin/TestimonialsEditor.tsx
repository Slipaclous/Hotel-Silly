'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Quote, Star, User, Sparkles, MapPin, Type, Layout, MessagesSquare } from 'lucide-react';
import ImageUpload from './ImageUpload';
import AdminWrapper from './AdminWrapper';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatarUrl: string;
  order: number;
}

export default function TestimonialsEditor() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials');
      const data = await response.json();
      setTestimonials(data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce témoignage ?')) return;

    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('✅ Témoignage supprimé avec succès');
        fetchTestimonials();
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
      title="Témoignages Clients"
      description="Gérez la voix de vos hôtes. Cultivez votre e-réputation avec élégance."
      message={message}
      previewUrl="/#testimonials"
    >
      <div className="space-y-12">
        {/* Header Actions */}
        <div className="flex justify-between items-center pb-8 border-b border-slate-100">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg">
              <MessagesSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-display">Paroles d&apos;Hôtes</h3>
              <p className="text-[11px] text-slate-500 font-medium tracking-[0.2em] uppercase mt-1">{testimonials.length} Avis certifiés</p>
            </div>
          </div>
          {!isAdding && !editingTestimonial && (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center space-x-3 bg-or hover:bg-slate-900 text-white px-8 py-3.5 rounded-2xl transition-all duration-500 shadow-xl shadow-or/20 font-bold text-[11px] uppercase tracking-[0.2em] active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Nouveau Témoignage</span>
            </button>
          )}
        </div>

        {/* Form Container */}
        {(isAdding || editingTestimonial) && (
          <div className="animate-fade-in translate-y-[-12px]">
            <TestimonialForm
              testimonial={editingTestimonial || undefined}
              onCancel={() => {
                setIsAdding(false);
                setEditingTestimonial(null);
              }}
              onSuccess={() => {
                setIsAdding(false);
                setEditingTestimonial(null);
                fetchTestimonials();
                setMessage(editingTestimonial ? '✅ Avis mis à jour' : '✅ Nouvel avis ajouté');
                setTimeout(() => setMessage(''), 3000);
              }}
            />
          </div>
        )}

        {/* Testimonials List */}
        {!isAdding && !editingTestimonial && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pb-20">
            {testimonials.length === 0 ? (
              <div className="col-span-full py-32 text-center border-2 border-dashed border-slate-100 rounded-[40px] bg-slate-50/30">
                <Quote className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[11px]">Aucun avis répertorié</p>
              </div>
            ) : (
              testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="group relative bg-white rounded-[40px] p-10 border border-slate-100 transition-all duration-700 hover:shadow-2xl hover:shadow-slate-200/50 flex flex-col h-full"
                >
                  <Quote className="absolute top-10 right-10 w-16 h-16 text-slate-50 group-hover:text-or/5 transition-colors duration-700" />

                  <div className="flex items-center space-x-6 mb-8 relative z-10">
                    <div className="relative">
                      <div
                        className="w-20 h-20 rounded-3xl bg-cover bg-center ring-4 ring-slate-50 overflow-hidden shadow-lg transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url(${testimonial.avatarUrl || '/placeholder-avatar.jpg'})` }}
                      />
                      {!testimonial.avatarUrl && (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 rounded-3xl">
                          <User className="w-8 h-8 text-slate-300" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 font-display group-hover:text-or transition-colors uppercase tracking-tight">{testimonial.name}</h3>
                      <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                        <MapPin className="w-3 h-3" />
                        <span>{testimonial.location}</span>
                      </div>
                      <div className="flex items-center mt-3 space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3.5 h-3.5 ${star <= testimonial.rating ? 'text-or fill-or' : 'text-slate-100'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-base text-slate-500 leading-relaxed italic mb-10 relative z-10 flex-1">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  <div className="flex items-center justify-between pt-8 border-t border-slate-50 mt-auto">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-xl">Ordre #{testimonial.order}</span>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => setEditingTestimonial(testimonial)}
                        className="w-11 h-11 bg-slate-50 hover:bg-slate-900 text-slate-400 hover:text-white rounded-2xl transition-all duration-300 flex items-center justify-center active:scale-90"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(testimonial.id)}
                        className="w-11 h-11 bg-slate-50 hover:bg-rose-500 text-slate-400 hover:text-white rounded-2xl transition-all duration-300 flex items-center justify-center active:scale-90"
                      >
                        <Trash2 className="w-4 h-4" />
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

function TestimonialForm({ testimonial, onCancel, onSuccess }: {
  testimonial?: Testimonial;
  onCancel: () => void;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    name: testimonial?.name || '',
    location: testimonial?.location || '',
    rating: testimonial?.rating || 5,
    text: testimonial?.text || '',
    avatarUrl: testimonial?.avatarUrl || '',
    order: testimonial?.order || 1,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = testimonial ? `/api/testimonials/${testimonial.id}` : '/api/testimonials';
      const method = testimonial ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
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
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-display">
              {testimonial ? 'Archivage de Satisfaction' : 'Nouveau Témoignage'}
            </h3>
            <p className="text-[11px] text-slate-500 font-medium tracking-[0.2em] mt-1 uppercase">Éditeur d&apos;Avis</p>
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
              <label className={labelClasses}><Type className="w-3.5 h-3.5" /><span>Identité du Client</span></label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="ex: Madame Marie de Silly"
                className={inputClasses}
              />
            </div>

            <div className="bg-white p-1 rounded-2xl">
              <label className={labelClasses}><MessagesSquare className="w-3.5 h-3.5" /><span>Retour d&apos;expérience</span></label>
              <textarea
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                required
                rows={6}
                className={`${inputClasses} resize-none italic leading-relaxed`}
                placeholder="Rédigez le témoignage reçu ici..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-1 rounded-2xl">
                <label className={labelClasses}><MapPin className="w-3.5 h-3.5" /><span>Lieu / Origine</span></label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                  placeholder="ex: Bruxelles, Belgique"
                  className={inputClasses}
                />
              </div>
              <div className="bg-white p-1 rounded-2xl">
                <label className={labelClasses}><Layout className="w-3.5 h-3.5" /><span>Position d&apos;Ordre</span></label>
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

          <div className="lg:col-span-4 space-y-10">
            <div className="bg-white p-1 rounded-2xl">
              <ImageUpload
                value={formData.avatarUrl}
                onChange={(url) => setFormData({ ...formData, avatarUrl: url })}
                label="Portrait Profil"
              />
            </div>

            <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100">
              <label className={labelClasses}><Star className="w-3.5 h-3.5" /><span>Notation Étoilée</span></label>
              <div className="flex bg-white border border-slate-200 rounded-2xl p-3 justify-around mt-4 shadow-sm">
                {[1, 2, 3, 4, 5].map(star => (
                  <button key={star} type="button" onClick={() => setFormData({ ...formData, rating: star })} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${formData.rating >= star ? 'text-or' : 'text-slate-100 hover:text-or/50'}`}>
                    <Star className={`w-5 h-5 ${formData.rating >= star ? 'fill-or' : ''}`} />
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center mt-4">Expérience {formData.rating}/5</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-12 border-t border-slate-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-10 py-5 rounded-2xl text-slate-400 hover:text-slate-900 font-bold uppercase tracking-widest text-[11px] transition-all"
          >
            Annuler
          </button>

          <button
            type="submit"
            disabled={saving}
            className="px-12 py-5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-or transition-all duration-500 disabled:opacity-50 flex items-center space-x-3 shadow-xl hover:shadow-or/40 active:scale-95"
          >
            {saving ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Save className="w-5 h-5" />}
            <span className="uppercase tracking-[0.2em] text-[11px]">{saving ? 'Enregistrement secret...' : 'Publier le Témoignage'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}


