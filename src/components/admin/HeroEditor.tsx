'use client';

import { useState, useEffect } from 'react';
import ImageUpload from './ImageUpload';
import AdminWrapper from './AdminWrapper';

export default function HeroEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    badge: '',
    title: '',
    subtitle: '',
    description: '',
    location: '',
    imageUrl: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/hero');
      const data = await response.json();
      if (data) {
        setFormData({
          badge: data.badge || '',
          title: data.title || '',
          subtitle: data.subtitle || '',
          description: data.description || '',
          location: data.location || '',
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
      const response = await fetch('/api/hero', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('✅ Sauvegardé avec succès !');
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
      title="Section Hero"
      description="Modifiez l'accroche principale de votre site web. C'est la première chose que vos visiteurs verront."
      onSave={handleSubmit}
      saving={saving}
      message={message}
      previewUrl="/"
    >
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className={labelClasses}>Badge</label>
              <input
                type="text"
                name="badge"
                value={formData.badge}
                onChange={handleChange}
                placeholder="ex: Ouverture 2025"
                className={inputClasses}
              />
            </div>

            <div>
              <label className={labelClasses}>Sous-titre</label>
              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                placeholder="ex: Bienvenue à"
                className={inputClasses}
              />
            </div>

            <div>
              <label className={labelClasses}>Titre Principal</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="ex: L'Hôtel de Silly"
                className={inputClasses}
              />
            </div>

            <div>
              <label className={labelClasses}>Localisation</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="ex: Silly, Belgique"
                className={inputClasses}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className={labelClasses}>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Décrivez brièvement l'expérience proposée..."
                className={`${inputClasses} resize-none`}
              />
            </div>

            <ImageUpload
              value={formData.imageUrl}
              onChange={(url) => setFormData({ ...formData, imageUrl: url })}
              label="Image de fond (Hero)"
            />
          </div>
        </div>
      </form>
    </AdminWrapper>
  );
}


