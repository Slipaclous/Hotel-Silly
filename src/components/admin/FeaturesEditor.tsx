'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Award, Heart, Shield, Star, Coffee, Wifi, MapPin } from 'lucide-react';
import AdminWrapper from './AdminWrapper';

interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
  order: number;
}

const iconOptions = [
  { value: 'Award', label: 'Excellence', Icon: Award },
  { value: 'Heart', label: 'Hospitalité', Icon: Heart },
  { value: 'Shield', label: 'Sécurité', Icon: Shield },
  { value: 'Star', label: 'Luxe', Icon: Star },
  { value: 'Coffee', label: 'Service', Icon: Coffee },
  { value: 'Wifi', label: 'Connectivité', Icon: Wifi },
  { value: 'MapPin', label: 'Situation', Icon: MapPin },
];

export default function FeaturesEditor() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    try {
      const response = await fetch('/api/features');
      const data = await response.json();
      setFeatures(data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet atout ?')) return;

    try {
      const response = await fetch(`/api/features/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('✅ Atout supprimé avec succès');
        fetchFeatures();
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

  const getIcon = (iconName: string) => {
    const iconOption = iconOptions.find(opt => opt.value === iconName);
    return iconOption ? iconOption.Icon : Award;
  };

  return (
    <AdminWrapper
      title="Atouts de l'Établissement"
      description="Mettez en avant les services et les qualités qui font la renommée de l'Hôtel de Silly."
      message={message}
      previewUrl="/#features"
    >
      <div className="space-y-8">
        <div className="flex justify-end">
          {!isAdding && !editingFeature && (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center space-x-2 bg-white border border-noir/5 hover:border-or/50 hover:bg-or/5 text-noir px-6 py-3 rounded-xl transition-all duration-300 group shadow-sm"
            >
              <Plus className="w-5 h-5 text-or group-hover:scale-110 transition-transform" />
              <span className="font-body font-bold text-sm">Nouvel atout</span>
            </button>
          )}
        </div>

        {(isAdding || editingFeature) && (
          <div className="animate-slide-in-top">
            <FeatureForm
              feature={editingFeature || undefined}
              onCancel={() => {
                setIsAdding(false);
                setEditingFeature(null);
              }}
              onSuccess={() => {
                setIsAdding(false);
                setEditingFeature(null);
                fetchFeatures();
                setMessage(editingFeature ? '✅ Atout mis à jour' : '✅ Nouvel atout ajouté');
                setTimeout(() => setMessage(''), 3000);
              }}
            />
          </div>
        )}

        {!isAdding && !editingFeature && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.length === 0 ? (
              <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
                < Award className="w-12 h-12 text-white/10 mx-auto mb-4" />
                <p className="text-white/40 font-body">Aucun atout n&apos;a été ajouté.</p>
              </div>
            ) : (
              features.map((feature) => {
                const Icon = getIcon(feature.icon);
                return (
                  <div
                    key={feature.id}
                    className="group relative bg-white border border-noir/5 rounded-2xl p-6 hover:border-or/30 transition-all duration-500 hover:shadow-xl shadow-sm"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-12 h-12 bg-or/10 rounded-xl flex items-center justify-center border border-or/20 group-hover:border-or/50 transition-colors">
                        <Icon className="w-6 h-6 text-or" />
                      </div>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => setEditingFeature(feature)}
                          className="p-2 text-noir/20 hover:text-or hover:bg-or/10 rounded-lg transition-all"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(feature.id)}
                          className="p-2 text-noir/20 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-lg font-display text-noir mb-2">{feature.title}</h3>
                    <p className="text-sm font-body text-noir/40 leading-relaxed mb-6 h-10 line-clamp-2">
                      {feature.description}
                    </p>

                    <div className="pt-4 border-t border-noir/5 flex justify-between items-center">
                      <span className="text-[10px] font-body text-noir/20 uppercase tracking-widest bg-noir/[0.02] px-2 py-1 rounded">Atout #{feature.order}</span>
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

function FeatureForm({ feature, onCancel, onSuccess }: {
  feature?: Feature;
  onCancel: () => void;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    icon: feature?.icon || 'Award',
    title: feature?.title || '',
    description: feature?.description || '',
    order: feature?.order || 1,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = feature ? `/api/features/${feature.id}` : '/api/features';
      const method = feature ? 'PUT' : 'POST';

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
          {feature ? 'Éditer l&apos;atout' : 'Ajouter un nouvel atout'}
        </h3>
        <button onClick={onCancel} className="p-2 text-noir/20 hover:text-noir transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClasses}>Icône représentative</label>
            <div className="grid grid-cols-4 gap-3 mt-2">
              {iconOptions.map((option) => {
                const Icon = option.Icon;
                const isSelected = formData.icon === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, icon: option.value })}
                    className={`p-4 rounded-xl border transition-all flex flex-col items-center justify-center space-y-2 ${isSelected
                      ? 'bg-or text-white border-or shadow-lg scale-105'
                      : 'bg-white border-noir/5 text-noir/20 hover:border-or/30 hover:text-noir/60 shadow-sm'
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <label className={labelClasses}>Titre de l&apos;atout</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                placeholder="ex: Gastronomie Étoilée"
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
        </div>

        <div>
          <label className={labelClasses}>Description des services</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            rows={4}
            className={`${inputClasses} resize-none`}
            placeholder="Détaillez cet atout prestigieux..."
          />
        </div>

        <div className="flex items-center space-x-4 pt-6 border-t border-noir/5">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-or text-white font-body font-bold py-4 rounded-xl hover:shadow-[0_10px_30px_rgba(198,173,122,0.3)] transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            <Save className="w-5 h-5" />
            <span>{saving ? 'Enregistrement...' : 'Enregistrer cet atout'}</span>
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




