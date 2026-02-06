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

  const inputClasses = "w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:border-or focus:ring-1 focus:ring-or outline-none transition-all duration-200 text-sm placeholder:text-gray-400 mt-1.5";
  const labelClasses = "text-xs font-semibold text-gray-500 uppercase tracking-wide ml-0.5";

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
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <h3 className="text-lg font-bold text-gray-900">Information Principales</h3>
          </div>
          <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
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
                  className={`${inputClasses} resize-y min-h-[150px]`}
                />
              </div>

              <div>
                <label className={labelClasses}>Année d&apos;ouverture</label>
                <div className="relative">
                  <History className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="openingYear"
                    value={formData.openingYear}
                    onChange={handleChange}
                    placeholder="ex: 1892"
                    className={`${inputClasses} pl-10`}
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
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <h3 className="text-lg font-bold text-gray-900">Points d&apos;Excellence</h3>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Point 1 */}
            <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl space-y-4 hover:border-gray-300 transition-all">
              <div className="flex items-center space-x-2 text-or font-bold mb-2">
                < Award className="w-5 h-5" />
                <span className="text-xs uppercase tracking-wider text-gray-500">Point Clé 1</span>
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
                placeholder="Description courte..."
                rows={3}
                className={`${inputClasses} resize-none`}
              />
            </div>

            {/* Point 2 */}
            <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl space-y-4 hover:border-gray-300 transition-all">
              <div className="flex items-center space-x-2 text-or font-bold mb-2">
                <Sparkles className="w-5 h-5" />
                <span className="text-xs uppercase tracking-wider text-gray-500">Point Clé 2</span>
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
                placeholder="Description courte..."
                rows={3}
                className={`${inputClasses} resize-none`}
              />
            </div>

            {/* Point 3 */}
            <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl space-y-4 hover:border-gray-300 transition-all">
              <div className="flex items-center space-x-2 text-or font-bold mb-2">
                <History className="w-5 h-5" />
                <span className="text-xs uppercase tracking-wider text-gray-500">Point Clé 3</span>
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
                placeholder="Description courte..."
                rows={3}
                className={`${inputClasses} resize-none`}
              />
            </div>
          </div>
        </div>
      </form>
    </AdminWrapper>
  );
}

