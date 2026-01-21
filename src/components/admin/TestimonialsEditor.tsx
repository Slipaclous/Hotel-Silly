'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Quote, Star, User } from 'lucide-react';
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
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-or"></div>
      </div>
    );
  }

  return (
    <AdminWrapper
      title="Témoignages Clients"
      description="Gérez les avis de vos hôtes. Les retours positifs sont le reflet de votre excellence."
      message={message}
      previewUrl="/#testimonials"
    >
      <div className="space-y-8">
        <div className="flex justify-end">
          {!isAdding && !editingTestimonial && (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center space-x-2 bg-white border border-noir/5 hover:border-or/50 hover:bg-or/5 text-noir px-6 py-3 rounded-xl transition-all duration-300 group shadow-sm"
            >
              <Plus className="w-5 h-5 text-or group-hover:scale-110 transition-transform" />
              <span className="font-body font-bold text-sm">Nouveau témoignage</span>
            </button>
          )}
        </div>

        {(isAdding || editingTestimonial) && (
          <div className="animate-slide-in-top">
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

        {!isAdding && !editingTestimonial && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.length === 0 ? (
              <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
                <Quote className="w-12 h-12 text-white/10 mx-auto mb-4" />
                <p className="text-white/40 font-body">Aucun avis client pour le moment.</p>
              </div>
            ) : (
              testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="group relative bg-white border border-noir/5 rounded-2xl p-6 hover:border-or/30 transition-all duration-500 hover:shadow-xl shadow-sm"
                >
                  <Quote className="absolute top-6 right-6 w-10 h-10 text-or opacity-5 group-hover:opacity-20 transition-opacity" />

                  <div className="flex items-center space-x-4 mb-6">
                    <div className="relative">
                      <div
                        className="w-16 h-16 rounded-full bg-cover bg-center border-2 border-or/20 group-hover:border-or/50 transition-colors overflow-hidden"
                        style={{ backgroundImage: `url(${testimonial.avatarUrl || '/placeholder-avatar.jpg'})` }}
                      />
                      {!testimonial.avatarUrl && (
                        <div className="absolute inset-0 flex items-center justify-center bg-noir/40 rounded-full">
                          <User className="w-8 h-8 text-white/20" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-display text-noir">{testimonial.name}</h3>
                      <p className="text-xs font-body text-noir/40 uppercase tracking-widest">{testimonial.location}</p>
                      <div className="flex items-center mt-1 space-x-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < testimonial.rating ? 'text-or fill-or' : 'text-noir/10'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm font-body text-noir/60 leading-relaxed italic mb-8 relative z-10">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-noir/5">
                    <span className="text-[10px] font-body text-noir/20 uppercase tracking-tighter bg-noir/[0.02] px-2 py-1 rounded">Ordre {testimonial.order}</span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingTestimonial(testimonial)}
                        className="p-2 text-noir/20 hover:text-or hover:bg-or/10 rounded-lg transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(testimonial.id)}
                        className="p-2 text-noir/20 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
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

  const inputClasses = "w-full bg-noir/[0.03] border border-noir/10 rounded-xl px-4 py-3 text-noir focus:border-or/50 focus:ring-1 focus:ring-or/50 outline-none transition-all duration-300 font-body text-sm placeholder:text-noir/20 mt-1.5";
  const labelClasses = "text-xs font-body font-bold text-noir/40 uppercase tracking-widest ml-1";

  return (
    <div className="bg-blanc-100/50 rounded-3xl p-8 border border-noir/5 relative overflow-hidden group shadow-inner">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-or" />

      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-display text-noir">
          {testimonial ? 'Éditer l&apos;avis client' : 'Enregistrer un nouveau témoignage'}
        </h3>
        <button onClick={onCancel} className="p-2 text-noir/20 hover:text-noir transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <label className={labelClasses}>Nom de l&apos;hôte</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="ex: Jean Dupont"
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Localisation / Provenance</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
                placeholder="ex: Paris, France"
                className={inputClasses}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
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
              value={formData.avatarUrl}
              onChange={(url) => setFormData({ ...formData, avatarUrl: url })}
              label="Photographie de profil (Avatar)"
            />
          </div>
        </div>

        <div>
          <label className={labelClasses}>Le témoignage</label>
          <textarea
            value={formData.text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            required
            rows={5}
            className={`${inputClasses} resize-none italic`}
            placeholder="Quel a été le retour de cet hôte ?"
          />
        </div>

        <div className="flex items-center space-x-4 pt-6 border-t border-noir/5">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-or text-white font-body font-bold py-4 rounded-xl hover:shadow-[0_10px_30px_rgba(198,173,122,0.3)] transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            <Save className="w-5 h-5" />
            <span>{saving ? 'Enregistrement...' : 'Publier le témoignage'}</span>
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


