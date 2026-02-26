'use client';

import { useState, useEffect } from 'react';
import ImageUpload from './ImageUpload';
import AdminWrapper from './AdminWrapper';
import LanguageTabs from './LanguageTabs';

type Locale = 'fr' | 'en' | 'nl';

export default function HeroEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeLocale, setActiveLocale] = useState<Locale>('fr');

  const [formData, setFormData] = useState({
    badge: '',
    badgeEn: '',
    badgeNl: '',
    title: '',
    titleEn: '',
    titleNl: '',
    subtitle: '',
    subtitleEn: '',
    subtitleNl: '',
    description: '',
    descriptionEn: '',
    descriptionNl: '',
    location: '',
    locationEn: '',
    locationNl: '',
    imageUrl: '',
    footerDescription: '',
    footerDescriptionEn: '',
    footerDescriptionNl: '',
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
          badgeEn: data.badgeEn || '',
          badgeNl: data.badgeNl || '',
          title: data.title || '',
          titleEn: data.titleEn || '',
          titleNl: data.titleNl || '',
          subtitle: data.subtitle || '',
          subtitleEn: data.subtitleEn || '',
          subtitleNl: data.subtitleNl || '',
          description: data.description || '',
          descriptionEn: data.descriptionEn || '',
          descriptionNl: data.descriptionNl || '',
          location: data.location || '',
          locationEn: data.locationEn || '',
          locationNl: data.locationNl || '',
          imageUrl: data.imageUrl || '',
          footerDescription: data.footerDescription || '',
          footerDescriptionEn: data.footerDescriptionEn || '',
          footerDescriptionNl: data.footerDescriptionNl || '',
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

  // Helper to get localized field names
  const getFieldName = (base: string) => {
    if (activeLocale === 'fr') return base;
    return `${base}${activeLocale.charAt(0).toUpperCase()}${activeLocale.slice(1)}`;
  };

  return (
    <AdminWrapper
      title="Section Hero"
      description="Modifiez l'accroche principale de votre site web. C'est la première chose que vos visiteurs verront."
      onSave={handleSubmit}
      saving={saving}
      message={message}
      previewUrl="/"
    >
      <LanguageTabs currentLocale={activeLocale} onChange={setActiveLocale} />

      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className={labelClasses}>Badge ({activeLocale.toUpperCase()})</label>
              <input
                type="text"
                name={getFieldName('badge')}
                value={(formData as any)[getFieldName('badge')]}
                onChange={handleChange}
                placeholder="ex: Ouverture 2025"
                className={inputClasses}
              />
            </div>

            <div>
              <label className={labelClasses}>Sous-titre ({activeLocale.toUpperCase()})</label>
              <input
                type="text"
                name={getFieldName('subtitle')}
                value={(formData as any)[getFieldName('subtitle')]}
                onChange={handleChange}
                placeholder="ex: Bienvenue à"
                className={inputClasses}
              />
            </div>

            <div>
              <label className={labelClasses}>Titre Principal ({activeLocale.toUpperCase()})</label>
              <input
                type="text"
                name={getFieldName('title')}
                value={(formData as any)[getFieldName('title')]}
                onChange={handleChange}
                placeholder="ex: L'Hôtel de Silly"
                className={inputClasses}
              />
            </div>

            <div>
              <label className={labelClasses}>Localisation ({activeLocale.toUpperCase()})</label>
              <input
                type="text"
                name={getFieldName('location')}
                value={(formData as any)[getFieldName('location')]}
                onChange={handleChange}
                placeholder="ex: Silly, Belgique"
                className={inputClasses}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className={labelClasses}>Description ({activeLocale.toUpperCase()})</label>
              <textarea
                name={getFieldName('description')}
                value={(formData as any)[getFieldName('description')]}
                onChange={handleChange}
                rows={4}
                placeholder="Décrivez brièvement l'expérience proposée..."
                className={`${inputClasses} resize-none`}
              />
            </div>

            <div>
              <label className={labelClasses}>Description Footer ({activeLocale.toUpperCase()})</label>
              <textarea
                name={getFieldName('footerDescription')}
                value={(formData as any)[getFieldName('footerDescription')]}
                onChange={handleChange}
                rows={3}
                placeholder="Texte court sous le logo du pied de page..."
                className={`${inputClasses} resize-none`}
              />
            </div>

            {/* L'image est commune à toutes les langues */}
            <div className="pt-4 border-t border-noir/5">
              <label className={labelClasses}>Visuels (Communs)</label>
              <div className="mt-4">
                <ImageUpload
                  value={formData.imageUrl}
                  onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                  label="Image de fond (Hero)"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </AdminWrapper>
  );
}


