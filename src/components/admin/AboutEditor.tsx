'use client';

import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import ImageUpload from './ImageUpload';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

  if (loading) {
    return <div className="text-gray-600">Chargement...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
        Section À Propos
      </h2>

      {message && (
        <div className={`mb-4 p-4 rounded-lg ${
          message.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Titre
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none text-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none text-gray-900"
          />
        </div>

        {/* Point clé 1 */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-4">Point Clé 1</h3>
          <div className="space-y-3">
            <input
              type="text"
              name="keyPoint1Title"
              value={formData.keyPoint1Title}
              onChange={handleChange}
              placeholder="Titre"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none text-gray-900"
            />
            <textarea
              name="keyPoint1Text"
              value={formData.keyPoint1Text}
              onChange={handleChange}
              placeholder="Texte"
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none text-gray-900"
            />
          </div>
        </div>

        {/* Point clé 2 */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-4">Point Clé 2</h3>
          <div className="space-y-3">
            <input
              type="text"
              name="keyPoint2Title"
              value={formData.keyPoint2Title}
              onChange={handleChange}
              placeholder="Titre"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none text-gray-900"
            />
            <textarea
              name="keyPoint2Text"
              value={formData.keyPoint2Text}
              onChange={handleChange}
              placeholder="Texte"
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none text-gray-900"
            />
          </div>
        </div>

        {/* Point clé 3 */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-4">Point Clé 3</h3>
          <div className="space-y-3">
            <input
              type="text"
              name="keyPoint3Title"
              value={formData.keyPoint3Title}
              onChange={handleChange}
              placeholder="Titre"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none text-gray-900"
            />
            <textarea
              name="keyPoint3Text"
              value={formData.keyPoint3Text}
              onChange={handleChange}
              placeholder="Texte"
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none text-gray-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Année d'Ouverture
          </label>
          <input
            type="text"
            name="openingYear"
            value={formData.openingYear}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none text-gray-900"
          />
        </div>

        <ImageUpload
          value={formData.imageUrl}
          onChange={(url) => setFormData({ ...formData, imageUrl: url })}
          label="Image"
        />

        <button
          type="submit"
          disabled={saving}
          className="flex items-center space-x-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Sauvegarde...' : 'Sauvegarder'}</span>
        </button>
      </form>
    </div>
  );
}

