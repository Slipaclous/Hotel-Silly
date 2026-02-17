'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Image as ImageIcon, Filter, Sparkles, Layout, Type, Layers } from 'lucide-react';
import ImageUpload from './ImageUpload';
import AdminWrapper from './AdminWrapper';
import Image from 'next/image';

interface GalleryImage {
  id: number;
  url: string;
  category: string;
  title: string;
  order: number;
}

export default function GalleryEditor() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes');
  const [message, setMessage] = useState('');

  const categories = ['Toutes', 'Chambres', 'Restaurant', 'Spa', 'Intérieur', 'Extérieur'];

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch('/api/gallery');
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) return;

    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('✅ Image supprimée avec succès');
        fetchImages();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Erreur:', error);
      setMessage('❌ Erreur lors de la suppression');
    }
  };

  const filteredImages = selectedCategory === 'Toutes'
    ? images
    : images.filter(img => img.category === selectedCategory);

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
      title="Galerie Photographique"
      description="Sublimez votre établissement à travers une collection de visuels haute définition."
      message={message}
      previewUrl="/galerie"
    >
      <div className="space-y-12">
        {/* Gallery Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b border-slate-100">
          <div className="flex items-center space-x-2 overflow-x-auto pb-4 lg:pb-0 custom-scrollbar scrollbar-hide">
            <div className="bg-slate-100 p-2 rounded-xl text-slate-400 mr-2">
              <Filter className="w-4 h-4" />
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-500 whitespace-nowrap uppercase tracking-widest ${selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xl shadow-slate-200 ring-2 ring-slate-900 ring-offset-2'
                  : 'bg-white text-slate-400 hover:text-slate-900 border border-slate-100 hover:border-slate-300'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {!isAdding && !editingImage && (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center justify-center space-x-3 bg-or hover:bg-slate-900 text-white px-8 py-3.5 rounded-2xl transition-all duration-500 shadow-xl shadow-or/20 font-bold text-[11px] uppercase tracking-[0.2em] active:scale-95 whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>Nouveau Visuel</span>
            </button>
          )}
        </div>

        {/* Form Container */}
        {(isAdding || editingImage) && (
          <div className="animate-fade-in translate-y-[-12px]">
            <GalleryImageForm
              image={editingImage || undefined}
              onCancel={() => {
                setIsAdding(false);
                setEditingImage(null);
              }}
              onSuccess={() => {
                setIsAdding(false);
                setEditingImage(null);
                fetchImages();
                setMessage(editingImage ? '✅ Visuel mis à jour' : '✅ Nouveau visuel ajouté');
                setTimeout(() => setMessage(''), 3000);
              }}
            />
          </div>
        )}

        {/* Images Grid */}
        {!isAdding && !editingImage && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 pb-20">
            {filteredImages.length === 0 ? (
              <div className="col-span-full py-32 text-center border-2 border-dashed border-slate-100 rounded-[40px] bg-slate-50/30">
                <ImageIcon className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[11px]">Aucun média répertorié</p>
              </div>
            ) : (
              filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm transition-all duration-700 hover:shadow-2xl hover:shadow-slate-200/50 flex flex-col"
                >
                  <div className="aspect-square relative overflow-hidden bg-slate-100">
                    <Image
                      src={image.url}
                      alt={image.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    {/* Floating Controls */}
                    <div className="absolute top-4 right-4 flex flex-col space-y-2 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                      <button
                        onClick={() => setEditingImage(image)}
                        className="w-10 h-10 bg-white/95 backdrop-blur-md rounded-xl text-slate-700 hover:text-or shadow-xl flex items-center justify-center transition-all duration-300 active:scale-90"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(image.id)}
                        className="w-10 h-10 bg-rose-500/90 backdrop-blur-md rounded-xl text-white hover:bg-rose-600 shadow-xl flex items-center justify-center transition-all duration-300 active:scale-90"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-slate-900/40 backdrop-blur-md border border-white/10 text-[9px] text-white font-extrabold uppercase tracking-widest rounded-lg shadow-lg">
                        {image.category}
                      </span>
                    </div>

                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 p-6 flex items-end">
                      <p className="text-[10px] text-white/70 font-bold uppercase tracking-widest">Ordre d&apos;affichage : {image.order}</p>
                    </div>
                  </div>

                  <div className="p-5 flex items-center justify-between mt-auto">
                    <h3 className="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-or transition-colors uppercase tracking-tight">{image.title}</h3>
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

function GalleryImageForm({ image, onCancel, onSuccess }: {
  image?: GalleryImage;
  onCancel: () => void;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    url: image?.url || '',
    category: image?.category || 'Chambres',
    title: image?.title || '',
    order: image?.order || 1,
  });
  const [saving, setSaving] = useState(false);

  const categories = ['Chambres', 'Restaurant', 'Spa', 'Intérieur', 'Extérieur'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.url) {
      alert('Veuillez sélectionner une image');
      return;
    }

    setSaving(true);

    try {
      const url = image ? `/api/gallery/${image.id}` : '/api/gallery';
      const method = image ? 'PUT' : 'POST';

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
    <div className="bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden group mb-12">
      <div className="p-10 border-b border-slate-50 flex items-center justify-between bg-slate-50/20">
        <div className="flex items-center space-x-6">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-display">
              {image ? 'Configuration Visuelle' : 'Nouvelle Acquisition'}
            </h3>
            <p className="text-[11px] text-slate-500 font-medium tracking-[0.2em] mt-1 uppercase">Éditeur de Galerie</p>
          </div>
        </div>
        <button onClick={onCancel} className="w-10 h-10 rounded-xl border border-slate-100 flex items-center justify-center text-slate-300 hover:text-slate-900 transition-all">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="order-2 md:order-1 flex flex-col justify-center">
            <ImageUpload
              value={formData.url}
              onChange={(url) => setFormData({ ...formData, url })}
              label="Sélection du Visuel"
            />
          </div>

          <div className="space-y-8 order-1 md:order-2">
            <div className="bg-white p-1 rounded-2xl">
              <label className={labelClasses}><Type className="w-3.5 h-3.5" /><span>Titre du média</span></label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                placeholder="ex: Lumière d'automne sur la façade"
                className={inputClasses}
              />
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="bg-white p-1 rounded-2xl">
                <label className={labelClasses}><Layers className="w-3.5 h-3.5" /><span>Segment</span></label>
                <div className="relative">
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    className={`${inputClasses} appearance-none cursor-pointer pr-10`}
                  >
                    {categories.filter(c => c !== 'Toutes').map((cat) => (
                      <option key={cat} value={cat} className="bg-white text-slate-900">{cat}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <Filter className="w-3 h-3" />
                  </div>
                </div>
              </div>
              <div className="bg-white p-1 rounded-2xl">
                <label className={labelClasses}><Layout className="w-3.5 h-3.5" /><span>Position</span></label>
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
        </div>

        <div className="flex items-center space-x-6 pt-10 border-t border-slate-50">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-slate-900 text-white font-bold h-16 rounded-2xl hover:bg-or hover:shadow-2xl hover:shadow-or/30 transition-all duration-500 disabled:opacity-50 flex items-center justify-center space-x-3 active:scale-[0.98]"
          >
            {saving ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Save className="w-5 h-5" />}
            <span className="uppercase tracking-[0.2em] text-[11px]">{saving ? 'Enregistrement secret...' : 'Publier dans la galerie'}</span>
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-10 h-16 rounded-2xl bg-slate-50 text-slate-400 hover:text-slate-900 font-bold uppercase tracking-widest text-[11px] transition-all"
          >
            Sortir
          </button>
        </div>
      </form>
    </div>
  );
}

