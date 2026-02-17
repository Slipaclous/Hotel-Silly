'use client';

import { useState, useEffect, useCallback } from 'react';
import { Save, Sparkles, Type, Info, Image as ImageIcon, Layout } from 'lucide-react';
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

  const inputClasses = "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:bg-white focus:border-or focus:ring-4 focus:ring-or/5 outline-none transition-all duration-300 text-sm placeholder:text-slate-400 font-medium";
  const labelClasses = "flex items-center space-x-2 text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em] mb-2 ml-1";

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
      title={`Bannière : ${pageLabel}`}
      description="Définissez l&apos;impact visuel inaugural de vos visiteurs."
      onSave={handleSubmit}
      saving={saving}
      message={message}
      previewUrl={page === 'accueil' ? '/' : `/${page}`}
    >
      <div className="bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden mb-12 animate-fade-in">
        <div className="p-10 border-b border-slate-50 flex items-center justify-between bg-slate-50/20">
          <div className="flex items-center space-x-6">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg">
              <Layout className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-display uppercase tracking-tight">Configuration Hero</h3>
              <p className="text-[11px] text-slate-500 font-medium tracking-[0.2em] mt-1 uppercase">Secteur : {pageLabel}</p>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center space-x-3 bg-or hover:bg-slate-900 text-white px-8 py-3.5 rounded-2xl transition-all duration-500 shadow-xl shadow-or/20 font-bold text-[11px] uppercase tracking-[0.2em] disabled:opacity-50"
          >
            {saving ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{saving ? 'Synchronisation...' : 'Enregistrer les modifications'}</span>
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="p-12 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7 space-y-10">
              <div className="bg-white p-1 rounded-2xl">
                <label className={labelClasses}><Type className="w-3.5 h-3.5" /><span>Titre Impactant</span></label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="ex: Vivez l'Exception de Silly"
                  className={inputClasses}
                />
              </div>

              <div className="bg-white p-1 rounded-2xl">
                <label className={labelClasses}><Info className="w-3.5 h-3.5" /><span>Message d&apos;accueil</span></label>
                <textarea
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  rows={6}
                  required
                  placeholder="Une courte phrase pour captiver l'audience dès les premières secondes..."
                  className={`${inputClasses} resize-none leading-relaxed`}
                />
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-4 ml-1 flex items-center space-x-2">
                  <Sparkles className="w-3 h-3 text-or" />
                  <span>Sera affiché directement sous le titre principal</span>
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white p-1 rounded-2xl h-full">
                <ImageUpload
                  value={formData.imageUrl}
                  onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                  label="Visuel de fond (Full HD)"
                />
                <div className="mt-8 p-6 bg-slate-50 rounded-3xl border border-slate-100 italic text-slate-400 text-xs">
                  <div className="flex items-center space-x-3 mb-3 text-slate-900 not-italic">
                    <ImageIcon className="w-4 h-4 text-or" />
                    <span className="font-bold uppercase tracking-widest text-[10px]">Recommandation technique</span>
                  </div>
                  Privilégiez des images aux tons apaisants et une résolution de 1920x1080px pour une netteté optimale sur tous les supports.
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AdminWrapper>
  );
}
