'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Image as ImageIcon, Filter } from 'lucide-react';
import ImageUpload from './ImageUpload';
import AdminWrapper from './AdminWrapper';

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
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-or"></div>
      </div>
    );
  }

  return (
    <AdminWrapper
      title="Galerie Photographique"
      description="Gérez les visuels qui subliment votre établissement. Organisez-les par catégories."
      message={message}
      previewUrl="/galerie"
    >
      <div className="space-y-8">
        {/* Gallery Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 custom-scrollbar">
            <Filter className="w-4 h-4 text-noir/20 mr-2 flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-body font-bold transition-all duration-300 whitespace-nowrap ${selectedCategory === cat
                  ? 'bg-or text-white shadow-md'
                  : 'bg-noir/[0.03] text-noir/40 hover:bg-noir/10 hover:text-noir border border-noir/5'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {!isAdding && !editingImage && (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center justify-center space-x-2 bg-white border border-noir/5 hover:border-or/50 hover:bg-or/5 text-noir px-6 py-3 rounded-xl transition-all duration-300 group shadow-sm"
            >
              <Plus className="w-5 h-5 text-or group-hover:scale-110 transition-transform" />
              <span className="font-body font-bold text-sm">Ajouter un visuel</span>
            </button>
          )}
        </div>

        {/* Form Overlay-like */}
        {(isAdding || editingImage) && (
          <div className="animate-slide-in-top">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.length === 0 ? (
              <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
                <ImageIcon className="w-12 h-12 text-white/10 mx-auto mb-4" />
                <p className="text-white/40 font-body">Aucune image dans cette catégorie.</p>
              </div>
            ) : (
              filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="group relative bg-white border border-noir/5 rounded-2xl overflow-hidden hover:border-or/30 transition-all duration-500 shadow-sm hover:shadow-xl"
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      <button
                        onClick={() => setEditingImage(image)}
                        className="flex items-center space-x-2 px-4 py-2 bg-white text-noir rounded-xl text-xs font-bold font-body hover:bg-or transition-colors w-32 justify-center"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Modifier</span>
                      </button>
                      <button
                        onClick={() => handleDelete(image.id)}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-xl text-xs font-bold font-body hover:bg-red-600 transition-colors w-32 justify-center"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Supprimer</span>
                      </button>
                    </div>

                    <div className="absolute top-3 left-3 flex space-x-2 translate-y-[-10px] group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-md border border-noir/10 text-[10px] text-or font-bold font-body uppercase tracking-wider rounded-lg shadow-lg">
                        {image.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex items-center justify-between">
                    <div className="min-w-0 pr-2">
                      <h3 className="text-sm font-display text-noir truncate">{image.title}</h3>
                      <p className="text-[10px] text-noir/30 font-body uppercase mt-1">Ordre {image.order}</p>
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

  const inputClasses = "w-full bg-noir/[0.03] border border-noir/10 rounded-xl px-4 py-3 text-noir focus:border-or/50 focus:ring-1 focus:ring-or/50 outline-none transition-all duration-300 font-body text-sm placeholder:text-noir/20 mt-1.5";
  const labelClasses = "text-xs font-body font-bold text-noir/40 uppercase tracking-widest ml-1";

  return (
    <div className="bg-blanc-100/50 rounded-3xl p-8 border border-noir/5 relative overflow-hidden group shadow-inner">
      <div className="absolute top-0 right-0 w-24 h-24 bg-or/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-display text-noir">
          {image ? 'Modifier le visuel' : 'Ajouter un nouveau visuel'}
        </h3>
        <button onClick={onCancel} className="p-2 text-noir/20 hover:text-noir transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="order-2 md:order-1">
            <ImageUpload
              value={formData.url}
              onChange={(url) => setFormData({ ...formData, url })}
              label="Sélectionner l'image"
            />
          </div>

          <div className="space-y-6 order-1 md:order-2">
            <div>
              <label className={labelClasses}>Titre de l&apos;image</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                placeholder="ex: Vue sur les jardins de Silly"
                className={inputClasses}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Catégorie</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  className={`${inputClasses} appearance-none cursor-pointer`}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-white text-noir">{cat}</option>
                  ))}
                </select>
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
        </div>

        <div className="flex items-center space-x-4 pt-4 border-t border-noir/5">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-or text-white font-body font-bold py-4 rounded-xl hover:shadow-[0_10px_30px_rgba(198,173,122,0.3)] transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            <Save className="w-5 h-5" />
            <span>{saving ? 'Sauvegarde...' : 'Publier dans la galerie'}</span>
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

