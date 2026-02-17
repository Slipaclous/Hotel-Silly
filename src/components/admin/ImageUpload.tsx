'use client';

import { useState, useRef } from 'react';
import { Upload, X, ImageIcon, Loader2, Plus, Image as ImageIconLucide } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = 'Image' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file) return;

    setUploading(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      if (response.ok) {
        const data = await response.json();
        onChange(data.url);
      } else {
        const error = await response.json();
        alert(error.error || 'Erreur lors de l\'upload de l\'image');
      }
    } catch (error) {
      console.error('Erreur upload:', error);
      alert('Erreur lors de l\'upload de l\'image');
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const clearImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange('');
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center space-x-2">
          <ImageIconLucide className="w-3.5 h-3.5" />
          <span>{label}</span>
        </label>
        {value && (
          <button
            onClick={clearImage}
            className="text-[10px] font-bold text-rose-500 hover:text-rose-600 uppercase tracking-widest transition-colors"
          >
            Supprimer
          </button>
        )}
      </div>

      {!value ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative aspect-[16/10] rounded-2xl border-2 border-dashed transition-all duration-500 cursor-pointer flex flex-col items-center justify-center group overflow-hidden ${dragActive
            ? 'border-or bg-or/5 ring-4 ring-or/5'
            : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-or/40 hover:shadow-xl hover:shadow-slate-200/50'
            }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            className="hidden"
          />

          <div className="relative z-10 flex flex-col items-center space-y-4">
            <div className={`p-4 rounded-2xl bg-white shadow-sm border border-slate-100 transition-all duration-500 ${dragActive ? 'scale-110 rotate-6 text-or' : 'group-hover:scale-110 group-hover:-rotate-3 text-slate-400'}`}>
              {uploading ? (
                <Loader2 className="w-6 h-6 animate-spin text-or" />
              ) : (
                <Plus className="w-6 h-6 group-hover:text-or transition-colors" />
              )}
            </div>

            <div className="text-center px-6">
              <p className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">
                {uploading ? 'Traitement en cours...' : 'Ajouter un visuel'}
              </p>
              <p className="text-[10px] text-slate-400 mt-1 font-medium uppercase tracking-tight">
                Glissez-déposez ou cliquez ici
              </p>
            </div>
          </div>

          {/* Decorative background element */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-or/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      ) : (
        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-slate-200 shadow-sm group bg-slate-100 ring-1 ring-slate-200">
          <Image
            src={value.startsWith('data:') ? value : value.startsWith('/') ? value : `/${value}`}
            alt="Upload preview"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />

          <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center space-x-3 backdrop-blur-[4px]">
            <button
              onClick={() => inputRef.current?.click()}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white text-slate-900 hover:bg-or hover:text-white transition-all duration-300 shadow-xl font-bold text-[10px] uppercase tracking-widest active:scale-95"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Changer</span>
            </button>
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            className="hidden"
          />

          {uploading && (
            <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center space-y-3 backdrop-blur-sm">
              <Loader2 className="w-8 h-8 text-or animate-spin" />
              <span className="text-[10px] font-bold text-or uppercase tracking-[0.2em]">Envoi...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


