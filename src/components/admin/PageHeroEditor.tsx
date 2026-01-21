'use client';

import { useState, useEffect, useCallback } from 'react';
import ImageUpload from './ImageUpload';
import AdminWrapper from './AdminWrapper';


interface PageHeroEditorProps {
  page: string;
  pageLabel: string;
}

export default function PageHeroEditor({ page, pageLabel }: PageHeroEditorProps) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    imageUrl: '',
  });

  const fetchPageHero = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/page-hero/${page}`);
      const data = await response.json();
      if (data) {
        setFormData({
          title: data.title || '',
          subtitle: data.subtitle || '',
          imageUrl: data.imageUrl || '',
        });
      } else {
        setFormData({
          title: '',
          subtitle: '',
          imageUrl: '',
        });
      }
    } catch (error) {
      console.error('Erreur:', error);
      setMessage('Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchPageHero();
  }, [fetchPageHero]);

  const handleSubmit = async () => {
    setSaving(true);
    setMessage('');

    try {
      const response = await fetch(`/api/page-hero/${page}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          subtitle: formData.subtitle,
          imageUrl: formData.imageUrl,
        }),
      });

      if (response.ok) {
        setMessage('✅ Bannière mise à jour avec succès');
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
      title={`Bannière : ${pageLabel}`}
      description={`Personnalisez l&apos;accueil visuel de la page ${pageLabel}. Choisissez un titre impactant et un visuel de haute qualité.`}
      onSave={handleSubmit}
      saving={saving}
      message={message}
      previewUrl={page === 'accueil' ? '/' : `/${page}`}
    >
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div>
              <label className={labelClasses}>Titre de la page</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="ex: Nos Chambres & Suites"
                className={inputClasses}
              />
            </div>

            <div>
              <label className={labelClasses}>Sous-titre / Accroche</label>
              <textarea
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                rows={5}
                required
                placeholder="Décrivez l'ambiance de cette page..."
                className={`${inputClasses} resize-none`}
              />
            </div>
          </div>

          <div className="space-y-6">
            <ImageUpload
              value={formData.imageUrl}
              onChange={(url) => setFormData({ ...formData, imageUrl: url })}
              label="Visuel de couverture (Haute Résolution)"
            />
          </div>
        </div>
      </form>
    </AdminWrapper>
  );
}
