'use client';

import { useState, useEffect } from 'react';
import ImageUpload from './ImageUpload';
import AdminWrapper from './AdminWrapper';
import { History, Award, Sparkles } from 'lucide-react';

export default function AboutEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    keyPoint1Title: '',
    keyPoint1Text: '',
    keyPoint2Title: '',
    keyPoint2Text: '',
    keyPoint3Title: '',
    keyPoint3Text: '',
    openingYear: '',
    imageUrl: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/about');
      const data = await response.json();
      if (data) {
        setFormData({
          title: data.title || '',
          description: data.description || '',
          keyPoint1Title: data.keyPoint1Title || '',
          keyPoint1Text: data.keyPoint1Text || '',
          keyPoint2Title: data.keyPoint2Title || '',
          keyPoint2Text: data.keyPoint2Text || '',
          keyPoint3Title: data.keyPoint3Title || '',
          keyPoint3Text: data.keyPoint3Text || '',
          openingYear: data.openingYear || '',
          imageUrl: data.imageUrl || '',
        });
      }
    } catch (error) {
      console.error('Erreur:', error);
      setMessage('Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/about', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('✅ Mise à jour réussie !');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('❌ Erreur lors de la sauvegarde');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setMessage('❌ Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const inputClasses = "w-full bg-noir/[0.03] border border-noir/10 rounded-xl px-4 py-3 text-noir focus:border-or/50 focus:ring-1 focus:ring-or/50 outline-none transition-all duration-300 font-body text-sm placeholder:text-noir/20 mt-1.5";
  const labelClasses = "text-xs font-body font-bold text-noir/40 uppercase tracking-widest ml-1";

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-or"></div>
      </div>
    );
  }

  return (
    <AdminWrapper
      title="Histoire & Valeurs"
      description="Racontez l'histoire de l'Hôtel de Silly et mettez en avant ce qui rend votre établissement unique."
      onSave={handleSubmit}
      saving={saving}
      message={message}
      previewUrl="/#about"
    >
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div>
              <label className={labelClasses}>Titre de la section</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="ex: Un Héritage de Prestige"
                className={inputClasses}
              />
            </div>

            <div>
              <label className={labelClasses}>Récit historique (Description)</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                placeholder="Partagez l'âme de l'hôtel..."
                className={`${inputClasses} resize-none`}
              />
            </div>

            <div>
              <label className={labelClasses}>Année d&apos;ouverture / Fondation</label>
              <div className="relative group">
                <History className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-noir/20 group-focus-within:text-or transition-colors" />
                <input
                  type="text"
                  name="openingYear"
                  value={formData.openingYear}
                  onChange={handleChange}
                  placeholder="ex: 1892"
                  className={`${inputClasses} pl-12`}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <ImageUpload
              value={formData.imageUrl}
              onChange={(url) => setFormData({ ...formData, imageUrl: url })}
              label="Visuel représentatif"
            />
          </div>
        </div>

        <div className="pt-6 border-t border-noir/5">
          <h3 className="text-sm font-body font-bold text-noir/20 uppercase tracking-[0.3em] mb-8">Points d&apos;Excellence</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Point 1 */}
            <div className="bg-white border border-noir/5 p-6 rounded-2xl space-y-4 hover:border-or/20 transition-all shadow-sm">
              <div className="flex items-center space-x-3 text-or font-bold">
                < Award className="w-5 h-5" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-noir/30">Point Clé 1</span>
              </div>
              <input
                type="text"
                name="keyPoint1Title"
                value={formData.keyPoint1Title}
                onChange={handleChange}
                placeholder="Titre court"
                className={inputClasses}
              />
              <textarea
                name="keyPoint1Text"
                value={formData.keyPoint1Text}
                onChange={handleChange}
                placeholder="Quelques mots..."
                rows={2}
                className={`${inputClasses} resize-none`}
              />
            </div>

            {/* Point 2 */}
            <div className="bg-white border border-noir/5 p-6 rounded-2xl space-y-4 hover:border-or/20 transition-all shadow-sm">
              <div className="flex items-center space-x-3 text-or font-bold">
                <Sparkles className="w-5 h-5" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-noir/30">Point Clé 2</span>
              </div>
              <input
                type="text"
                name="keyPoint2Title"
                value={formData.keyPoint2Title}
                onChange={handleChange}
                placeholder="Titre court"
                className={inputClasses}
              />
              <textarea
                name="keyPoint2Text"
                value={formData.keyPoint2Text}
                onChange={handleChange}
                placeholder="Quelques mots..."
                rows={2}
                className={`${inputClasses} resize-none`}
              />
            </div>

            {/* Point 3 */}
            <div className="bg-white border border-noir/5 p-6 rounded-2xl space-y-4 hover:border-or/20 transition-all shadow-sm">
              <div className="flex items-center space-x-3 text-or font-bold">
                <History className="w-5 h-5" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-noir/30">Point Clé 3</span>
              </div>
              <input
                type="text"
                name="keyPoint3Title"
                value={formData.keyPoint3Title}
                onChange={handleChange}
                placeholder="Titre court"
                className={inputClasses}
              />
              <textarea
                name="keyPoint3Text"
                value={formData.keyPoint3Text}
                onChange={handleChange}
                placeholder="Quelques mots..."
                rows={2}
                className={`${inputClasses} resize-none`}
              />
            </div>
          </div>
        </div>
      </form>
    </AdminWrapper>
  );
}

