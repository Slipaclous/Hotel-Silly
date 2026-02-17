'use client';

import { useState, useEffect } from 'react';
import ImageUpload from './ImageUpload';
import AdminWrapper from './AdminWrapper';
import LanguageTabs from './LanguageTabs';
import { History, Award, Sparkles, Layout, Type, AlignLeft } from 'lucide-react';

type Locale = 'fr' | 'en' | 'nl';

export default function AboutEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeLocale, setActiveLocale] = useState<Locale>('fr');

  const [formData, setFormData] = useState({
    title: '',
    titleEn: '',
    titleNl: '',
    description: '',
    descriptionEn: '',
    descriptionNl: '',
    keyPoint1Title: '',
    keyPoint1TitleEn: '',
    keyPoint1TitleNl: '',
    keyPoint1Text: '',
    keyPoint1TextEn: '',
    keyPoint1TextNl: '',
    keyPoint2Title: '',
    keyPoint2TitleEn: '',
    keyPoint2TitleNl: '',
    keyPoint2Text: '',
    keyPoint2TextEn: '',
    keyPoint2TextNl: '',
    keyPoint3Title: '',
    keyPoint3TitleEn: '',
    keyPoint3TitleNl: '',
    keyPoint3Text: '',
    keyPoint3TextEn: '',
    keyPoint3TextNl: '',
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
          titleEn: data.titleEn || '',
          titleNl: data.titleNl || '',
          description: data.description || '',
          descriptionEn: data.descriptionEn || '',
          descriptionNl: data.descriptionNl || '',
          keyPoint1Title: data.keyPoint1Title || '',
          keyPoint1TitleEn: data.keyPoint1TitleEn || '',
          keyPoint1TitleNl: data.keyPoint1TitleNl || '',
          keyPoint1Text: data.keyPoint1Text || '',
          keyPoint1TextEn: data.keyPoint1TextEn || '',
          keyPoint1TextNl: data.keyPoint1TextNl || '',
          keyPoint2Title: data.keyPoint2Title || '',
          keyPoint2TitleEn: data.keyPoint2TitleEn || '',
          keyPoint2TitleNl: data.keyPoint2TitleNl || '',
          keyPoint2Text: data.keyPoint2Text || '',
          keyPoint2TextEn: data.keyPoint2TextEn || '',
          keyPoint2TextNl: data.keyPoint2TextNl || '',
          keyPoint3Title: data.keyPoint3Title || '',
          keyPoint3TitleEn: data.keyPoint3TitleEn || '',
          keyPoint3TitleNl: data.keyPoint3TitleNl || '',
          keyPoint3Text: data.keyPoint3Text || '',
          keyPoint3TextEn: data.keyPoint3TextEn || '',
          keyPoint3TextNl: data.keyPoint3TextNl || '',
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

  const getFieldName = (base: string) => {
    if (activeLocale === 'fr') return base;
    return `${base}${activeLocale.charAt(0).toUpperCase()}${activeLocale.slice(1)}`;
  };

  return (
    <AdminWrapper
      title="Histoire & Valeurs"
      description="Racontez l'histoire de l'Hôtel de Silly et mettez en avant ce qui rend votre établissement unique."
      onSave={handleSubmit}
      saving={saving}
      message={message}
      previewUrl="/#about"
    >
      <div className="flex items-center justify-between mb-8">
        <LanguageTabs currentLocale={activeLocale} onChange={setActiveLocale} />
        <div className="bg-or/5 px-4 py-2 rounded-xl border border-or/10 flex items-center space-x-2 text-or">
          <Sparkles className="w-4 h-4" />
          <span className="text-[11px] font-bold uppercase tracking-wider">Édition {activeLocale.toUpperCase()}</span>
        </div>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-12 pb-10">
        {/* Section Principale */}
        <section className="relative">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-lg">
              <Layout className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-display">Informations Principales</h3>
              <p className="text-[12px] text-slate-500 font-medium">Contenu général de la section À Propos.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-white p-1 rounded-2xl">
                <label className={labelClasses}>
                  <Type className="w-3.5 h-3.5" />
                  <span>Titre de la section ({activeLocale.toUpperCase()})</span>
                </label>
                <input
                  type="text"
                  name={getFieldName('title')}
                  value={(formData as any)[getFieldName('title')]}
                  onChange={handleChange}
                  placeholder="ex: Un Héritage de Prestige"
                  className={inputClasses}
                />
              </div>

              <div className="bg-white p-1 rounded-2xl">
                <label className={labelClasses}>
                  <AlignLeft className="w-3.5 h-3.5" />
                  <span>Récit historique ({activeLocale.toUpperCase()})</span>
                </label>
                <textarea
                  name={getFieldName('description')}
                  value={(formData as any)[getFieldName('description')]}
                  onChange={handleChange}
                  rows={8}
                  placeholder="Partagez l'âme de l'hôtel..."
                  className={`${inputClasses} resize-none min-h-[220px] leading-relaxed`}
                />
              </div>

              <div className="bg-white p-1 rounded-2xl">
                <label className={labelClasses}>
                  <History className="w-3.5 h-3.5" />
                  <span>Année d&apos;ouverture (Commun)</span>
                </label>
                <input
                  type="text"
                  name="openingYear"
                  value={formData.openingYear}
                  onChange={handleChange}
                  placeholder="ex: 1892"
                  className={inputClasses}
                />
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <div className="bg-white p-1 rounded-2xl">
                  <ImageUpload
                    value={formData.imageUrl}
                    onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                    label="Visuel représentatif (Commun)"
                  />
                  <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-100 italic text-[11px] text-slate-500 leading-relaxed">
                    Astuce : Choisissez une image haute résolution capturant l&apos;architecture extérieure ou l&apos;ambiance d&apos;accueil de l&apos;hôtel.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Points d'Excellence */}
        <section>
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-10 h-10 rounded-xl bg-or text-white flex items-center justify-center shadow-lg shadow-or/20">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-display">Points d&apos;Excellence</h3>
              <p className="text-[12px] text-slate-500 font-medium">Trois piliers qui définissent votre service d&apos;exception.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((num) => (
              <div key={num} className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 border-t-4 border-t-or/20 hover:border-t-or">
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-10 h-10 rounded-xl bg-or/10 flex items-center justify-center transition-colors duration-500 group-hover:bg-or/20`}>
                    {num === 1 ? <Award className="w-5 h-5 text-or" /> : num === 2 ? <Sparkles className="w-5 h-5 text-or" /> : <History className="w-5 h-5 text-or" />}
                  </div>
                  <span className="text-[10px] font-extrabold text-slate-300 uppercase tracking-widest">Atout N°{num}</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Titre court</label>
                    <input
                      type="text"
                      name={getFieldName(`keyPoint${num}Title`)}
                      value={(formData as any)[getFieldName(`keyPoint${num}Title`)]}
                      onChange={handleChange}
                      placeholder="Titre"
                      className="w-full bg-slate-50 hover:bg-white border border-slate-100 rounded-xl px-4 py-2.5 text-slate-900 focus:bg-white focus:border-or focus:ring-4 focus:ring-or/5 outline-none transition-all duration-300 text-sm font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Description</label>
                    <textarea
                      name={getFieldName(`keyPoint${num}Text`)}
                      value={(formData as any)[getFieldName(`keyPoint${num}Text`)]}
                      onChange={handleChange}
                      placeholder="Court texte explicatif..."
                      rows={4}
                      className="w-full bg-slate-50 hover:bg-white border border-slate-100 rounded-xl px-4 py-3 text-slate-900 focus:bg-white focus:border-or focus:ring-4 focus:ring-or/5 outline-none transition-all duration-300 text-[13px] font-medium leading-relaxed resize-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </form>
    </AdminWrapper>
  );
}

