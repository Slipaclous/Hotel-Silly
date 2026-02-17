'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Award, Heart, Shield, Star, Coffee, Wifi, MapPin, Sparkles, Type, Layout, Info } from 'lucide-react';
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
        <div className="relative">
          <div className="w-10 h-10 rounded-full border-2 border-slate-100 animate-pulse" />
          <div className="absolute inset-0 w-10 h-10 rounded-full border-t-2 border-or animate-spin" />
        </div>
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
      description="Sublimez les services et les qualités qui font la signature de Silly."
      message={message}
      previewUrl="/#features"
    >
      <div className="space-y-12">
        {/* Header Actions */}
        <div className="flex justify-between items-center pb-8 border-b border-slate-100">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-display uppercase tracking-tight">Signature & Atouts</h3>
              <p className="text-[11px] text-slate-500 font-medium tracking-[0.2em] uppercase mt-1">{features.length} Services répertoriés</p>
            </div>
          </div>
          {!isAdding && !editingFeature && (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center space-x-3 bg-or hover:bg-slate-900 text-white px-8 py-3.5 rounded-2xl transition-all duration-500 shadow-xl shadow-or/20 font-bold text-[11px] uppercase tracking-[0.2em] active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Nouvel Atout</span>
            </button>
          )}
        </div>

        {/* Form Container */}
        {(isAdding || editingFeature) && (
          <div className="animate-fade-in translate-y-[-12px]">
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

        {/* Features List */}
        {!isAdding && !editingFeature && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
            {features.length === 0 ? (
              <div className="col-span-full py-32 text-center border-2 border-dashed border-slate-100 rounded-[40px] bg-slate-50/30">
                <Award className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[11px]">Aucun service configuré</p>
              </div>
            ) : (
              features.map((feature) => {
                const Icon = getIcon(feature.icon);
                return (
                  <div
                    key={feature.id}
                    className="group relative bg-white rounded-[40px] p-8 border border-slate-100 transition-all duration-700 hover:shadow-2xl hover:shadow-slate-200/50 flex flex-col h-full"
                  >
                    <div className="flex items-start justify-between mb-8">
                      <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center transition-all duration-500 group-hover:bg-slate-900 group-hover:scale-110 group-hover:rotate-6 ring-4 ring-slate-50">
                        <Icon className="w-7 h-7 text-or" />
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingFeature(feature)}
                          className="w-10 h-10 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-900 rounded-xl transition-all duration-300 flex items-center justify-center active:scale-90"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(feature.id)}
                          className="w-10 h-10 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-white rounded-xl transition-all duration-300 flex items-center justify-center active:scale-90"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 font-display mb-3 group-hover:text-or transition-colors uppercase tracking-tight">{feature.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-8 flex-1">
                      {feature.description}
                    </p>

                    <div className="pt-6 border-t border-slate-50 flex justify-between items-center mt-auto">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-xl">Priorité #{feature.order}</span>
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
              {feature ? 'Édition d&apos;Atout' : 'Nouvel Atout Prestige'}
            </h3>
            <p className="text-[11px] text-slate-500 font-medium tracking-[0.2em] mt-1 uppercase">Configuration Signature</p>
          </div>
        </div>
        <button onClick={onCancel} className="w-10 h-10 rounded-xl border border-slate-100 flex items-center justify-center text-slate-300 hover:text-slate-900 transition-all">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-12 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-10">
            <div className="bg-white p-1 rounded-2xl">
              <label className={labelClasses}><Type className="w-3.5 h-3.5" /><span>Titre de l&apos;Atout</span></label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                placeholder="ex: Gastronomie Étoilée"
                className={inputClasses}
              />
            </div>

            <div className="bg-white p-1 rounded-2xl">
              <label className={labelClasses}><Info className="w-3.5 h-3.5" /><span>Description Détallée</span></label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={5}
                className={`${inputClasses} resize-none mb-2 leading-relaxed`}
                placeholder="Décrivez ce qui rend ce service exceptionnel..."
              />
            </div>

            <div className="bg-white p-1 rounded-2xl">
              <label className={labelClasses}><Layout className="w-3.5 h-3.5" /><span>Ordre d&apos;Apparition</span></label>
              <input
                type="number"
                min="1"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                className={inputClasses}
              />
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-50 p-10 rounded-[40px] border border-slate-100">
            <label className={labelClasses}><Sparkles className="w-3.5 h-3.5" /><span>Identité Visuelle</span></label>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {iconOptions.map((option) => {
                const Icon = option.Icon;
                const isSelected = formData.icon === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, icon: option.value })}
                    className={`group/icon p-5 rounded-3xl border transition-all duration-500 flex flex-col items-center justify-center space-y-3 ${isSelected
                      ? 'bg-slate-900 text-or border-slate-900 shadow-xl scale-105 rotate-2'
                      : 'bg-white border-slate-100 text-slate-300 hover:border-or/30 hover:text-slate-600 shadow-sm'
                      }`}
                  >
                    <Icon className={`w-6 h-6 transition-transform duration-500 ${isSelected ? 'scale-110' : 'group-hover/icon:scale-110'}`} />
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? 'text-white' : 'text-slate-400'}`}>{option.label}</span>
                  </button>
                );
              })}
            </div>
            <p className="mt-8 text-[11px] text-slate-400 font-medium italic leading-relaxed text-center">
              Choisissez l&apos;icône qui illustre le mieux l&apos;excellence de ce service spécifique.
            </p>
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
            <span className="uppercase tracking-[0.2em] text-[11px] font-bold">{saving ? 'Enregistrement...' : 'Enregistrer cet Atout'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}




