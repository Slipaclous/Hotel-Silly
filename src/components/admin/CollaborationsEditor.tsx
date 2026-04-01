'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Link, Phone, Globe, Image as ImageIcon, Type, Layout, Info, GripVertical, PlusCircle, MinusCircle } from 'lucide-react';
import AdminWrapper from './AdminWrapper';
import ImageUpload from './ImageUpload';
import LanguageTabs from './LanguageTabs';

interface Collaboration {
  id: number;
  name: string;
  description: string[];
  descriptionEn: string[];
  descriptionNl: string[];
  phone: string | null;
  website: string | null;
  imageUrl: string;
  order: number;
}

type Locale = 'fr' | 'en' | 'nl';

export default function CollaborationsEditor() {
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCollaboration, setEditingCollaboration] = useState<Collaboration | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCollaborations();
  }, []);

  const fetchCollaborations = async () => {
    try {
      const response = await fetch('/api/collaborations');
      const data = await response.json();
      if (Array.isArray(data)) {
        setCollaborations(data);
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette collaboration ?')) return;

    try {
      const response = await fetch(`/api/collaborations/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('✅ Collaboration supprimée avec succès');
        fetchCollaborations();
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
      title="Partenaires & Collaborations"
      description="Gérez les collaborations et les partenaires de l'établissement."
      message={message}
      previewUrl="/collaborations"
    >
      <div className="space-y-12">
        <div className="flex justify-between items-center pb-8 border-b border-slate-100">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-display uppercase tracking-tight">Collaborations</h3>
              <p className="text-[11px] text-slate-500 font-medium tracking-[0.2em] uppercase mt-1">{collaborations.length} Partenaires</p>
            </div>
          </div>
          {!isAdding && !editingCollaboration && (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center space-x-3 bg-or hover:bg-slate-900 text-white px-8 py-3.5 rounded-2xl transition-all duration-500 shadow-xl shadow-or/20 font-bold text-[11px] uppercase tracking-[0.2em] active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Nouveau Partenaire</span>
            </button>
          )}
        </div>

        {(isAdding || editingCollaboration) && (
          <div className="animate-fade-in translate-y-[-12px]">
            <CollaborationForm
              collaboration={editingCollaboration || undefined}
              onCancel={() => {
                setIsAdding(false);
                setEditingCollaboration(null);
              }}
              onSuccess={() => {
                setIsAdding(false);
                setEditingCollaboration(null);
                fetchCollaborations();
                setMessage(editingCollaboration ? '✅ Collaboration mise à jour' : '✅ Nouveau partenaire ajouté');
                setTimeout(() => setMessage(''), 3000);
              }}
            />
          </div>
        )}

        {!isAdding && !editingCollaboration && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
            {collaborations.length === 0 ? (
              <div className="col-span-full py-32 text-center border-2 border-dashed border-slate-100 rounded-[40px] bg-slate-50/30">
                <Globe className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[11px]">Aucun partenaire configuré</p>
              </div>
            ) : (
              collaborations.map((collab) => (
                <div
                  key={collab.id}
                  className="group relative bg-white rounded-[40px] p-6 border border-slate-100 transition-all duration-700 hover:shadow-2xl hover:shadow-slate-200/50 flex flex-col h-full"
                >
                  <div className="relative aspect-video rounded-3xl overflow-hidden mb-6 bg-slate-100 group-hover:shadow-lg transition-all duration-500">
                    <img
                      src={collab.imageUrl}
                      alt={collab.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button
                        onClick={() => setEditingCollaboration(collab)}
                        className="w-10 h-10 bg-white/90 backdrop-blur-md hover:bg-white text-slate-400 hover:text-slate-900 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg active:scale-90"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(collab.id)}
                        className="w-10 h-10 bg-white/90 backdrop-blur-md hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg active:scale-90"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 font-display mb-3 group-hover:text-or transition-colors uppercase tracking-tight">{collab.name}</h3>
                  
                  <div className="space-y-2 mb-6 flex-1">
                    {collab.description.slice(0, 3).map((point, index) => (
                      <div key={index} className="flex items-start space-x-2 text-sm text-slate-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-or mt-1.5 flex-shrink-0" />
                        <span className="line-clamp-2">{point}</span>
                      </div>
                    ))}
                    {collab.description.length > 3 && (
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-4">+{collab.description.length - 3} autres points...</p>
                    )}
                  </div>

                  <div className="pt-6 border-t border-slate-50 flex flex-wrap gap-2 mt-auto">
                    {collab.phone && (
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl flex items-center space-x-1.5 uppercase tracking-wider">
                        <Phone className="w-3 h-3" />
                        <span>{collab.phone}</span>
                      </span>
                    )}
                    {collab.website && (
                      <span className="text-[10px] font-bold text-or bg-or/5 px-3 py-1.5 rounded-xl flex items-center space-x-1.5 uppercase tracking-wider">
                        <Link className="w-3 h-3" />
                        <span>Site Web</span>
                      </span>
                    )}
                    <span className="ml-auto text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-xl">#{collab.order}</span>
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

function CollaborationForm({ collaboration, onCancel, onSuccess }: {
  collaboration?: Collaboration;
  onCancel: () => void;
  onSuccess: () => void;
}) {
  const [activeLocale, setActiveLocale] = useState<Locale>('fr');
  const [formData, setFormData] = useState({
    name: collaboration?.name || '',
    description: collaboration?.description || [''],
    descriptionEn: collaboration?.descriptionEn || [''],
    descriptionNl: collaboration?.descriptionNl || [''],
    phone: collaboration?.phone || '',
    website: collaboration?.website || '',
    imageUrl: collaboration?.imageUrl || '',
    order: collaboration?.order || 0,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = collaboration ? `/api/collaborations/${collaboration.id}` : '/api/collaborations';
      const method = collaboration ? 'PATCH' : 'POST';

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

  const updatePoints = (locale: Locale, points: string[]) => {
    const key = locale === 'fr' ? 'description' : locale === 'en' ? 'descriptionEn' : 'descriptionNl';
    setFormData({ ...formData, [key]: points });
  };

  const addPoint = (locale: Locale) => {
    const key = locale === 'fr' ? 'description' : locale === 'en' ? 'descriptionEn' : 'descriptionNl';
    const currentPoints = formData[key];
    updatePoints(locale, [...currentPoints, '']);
  };

  const removePoint = (locale: Locale, index: number) => {
    const key = locale === 'fr' ? 'description' : locale === 'en' ? 'descriptionEn' : 'descriptionNl';
    const currentPoints = formData[key];
    if (currentPoints.length <= 1) {
      updatePoints(locale, ['']);
      return;
    }
    const newPoints = currentPoints.filter((_, i) => i !== index);
    updatePoints(locale, newPoints);
  };

  const handlePointChange = (locale: Locale, index: number, value: string) => {
    const key = locale === 'fr' ? 'description' : locale === 'en' ? 'descriptionEn' : 'descriptionNl';
    const newPoints = [...formData[key]];
    newPoints[index] = value;
    updatePoints(locale, newPoints);
  };

  const inputClasses = "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:bg-white focus:border-or focus:ring-4 focus:ring-or/5 outline-none transition-all duration-300 text-sm placeholder:text-slate-400 font-medium";
  const labelClasses = "flex items-center space-x-2 text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em] mb-2 ml-1";

  const getPointsForLocale = (locale: Locale) => {
    return locale === 'fr' ? formData.description : locale === 'en' ? formData.descriptionEn : formData.descriptionNl;
  };

  return (
    <div className="bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden mb-12">
      <div className="p-10 border-b border-slate-50 flex items-center justify-between bg-slate-50/20">
        <div className="flex items-center space-x-6">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-display">
              {collaboration ? 'Édition du Partenaire' : 'Nouveau Partenaire'}
            </h3>
            <p className="text-[11px] text-slate-500 font-medium tracking-[0.2em] mt-1 uppercase">Configuration Collaboration</p>
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
              <label className={labelClasses}><Type className="w-3.5 h-3.5" /><span>Nom de la Collaboration / Entreprise</span></label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="ex: Brasserie de Silly"
                className={inputClasses}
              />
            </div>

            <div className="bg-slate-50/50 p-8 rounded-[32px] border border-slate-100/50">
              <div className="flex items-center justify-between mb-8">
                <label className={labelClasses}><Info className="w-3.5 h-3.5" /><span>Points de description</span></label>
                <LanguageTabs currentLocale={activeLocale} onChange={setActiveLocale} />
              </div>

              <div className="space-y-4">
                {getPointsForLocale(activeLocale).map((point, index) => (
                  <div key={index} className="flex items-center space-x-3 group/item animate-fade-in">
                    <div className="flex-shrink-0 w-8 h-10 flex items-center justify-center text-slate-300">
                      <GripVertical className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={point}
                      onChange={(e) => handlePointChange(activeLocale, index, e.target.value)}
                      placeholder={`Point n°${index + 1}...`}
                      className={inputClasses}
                    />
                    <button
                      type="button"
                      onClick={() => removePoint(activeLocale, index)}
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all opacity-0 group-hover/item:opacity-100"
                    >
                      <MinusCircle className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={() => addPoint(activeLocale)}
                  className="flex items-center space-x-3 w-full p-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:text-or hover:border-or/50 hover:bg-or/5 transition-all duration-500 text-[11px] font-bold uppercase tracking-widest mt-6"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>Ajouter un point en {activeLocale.toUpperCase()}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-1 rounded-2xl">
                <label className={labelClasses}><Phone className="w-3.5 h-3.5" /><span>Téléphone</span></label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="ex: +32 12 34 56 78"
                  className={inputClasses}
                />
              </div>
              <div className="bg-white p-1 rounded-2xl">
                <label className={labelClasses}><Globe className="w-3.5 h-3.5" /><span>Site Internet</span></label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="ex: https://www.partenaire.be"
                  className={inputClasses}
                />
              </div>
            </div>
            
            <div className="bg-white p-1 rounded-2xl">
              <label className={labelClasses}><Layout className="w-3.5 h-3.5" /><span>Ordre d&apos;Apparition</span></label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                className={inputClasses}
              />
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-slate-50 p-10 rounded-[40px] border border-slate-100">
              <label className={labelClasses}><ImageIcon className="w-3.5 h-3.5" /><span>Image de Présentation</span></label>
              <div className="mt-6">
                <ImageUpload
                  value={formData.imageUrl}
                  onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                />
              </div>
              <p className="mt-8 text-[11px] text-slate-400 font-medium italic leading-relaxed text-center">
                Une photo de haute qualité qui représente au mieux le collaborateur.
              </p>
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
            disabled={saving || !formData.imageUrl || !formData.name}
            className="px-12 py-5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-or transition-all duration-500 disabled:opacity-50 flex items-center space-x-3 shadow-xl hover:shadow-or/40 active:scale-95"
          >
            {saving ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Save className="w-5 h-5" />}
            <span className="uppercase tracking-[0.2em] text-[11px] font-bold">{saving ? 'Enregistrement...' : 'Enregistrer'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
