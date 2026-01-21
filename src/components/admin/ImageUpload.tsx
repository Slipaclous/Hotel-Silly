'use client';

import { useState, useRef } from 'react';
import { Upload, X, ImageIcon, Loader2 } from 'lucide-react';

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
    onChange('');
  };

  return (
    <div className="space-y-3">
      <label className="text-xs font-body font-bold text-noir/40 uppercase tracking-widest ml-1">
        {label}
      </label>

      {!value ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative aspect-video rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer flex flex-col items-center justify-center space-y-4 group overflow-hidden ${dragActive
            ? 'border-or bg-or/5 shadow-inner'
            : 'border-noir/10 bg-noir/[0.02] hover:bg-noir/[0.04] hover:border-or/30 shadow-sm'
            }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            className="hidden"
          />

          <div className="p-4 rounded-full bg-white border border-noir/5 group-hover:scale-110 group-hover:bg-or transition-all duration-500 shadow-sm">
            {uploading ? (
              <Loader2 className="w-8 h-8 text-or animate-spin" />
            ) : (
              <Upload className="w-8 h-8 text-noir/20 group-hover:text-white transition-colors" />
            )}
          </div>

          <div className="text-center px-6">
            <p className="text-sm font-body text-noir/60 group-hover:text-noir transition-colors font-medium">
              {uploading ? 'Téléchargement...' : 'Cliquez ou glissez une image ici'}
            </p>
            <p className="text-[10px] font-body text-noir/30 uppercase tracking-tighter mt-1">
              JPG, PNG ou WEBP jusqu&apos;à 10MB
            </p>
          </div>
        </div>
      ) : (
        <div className="relative aspect-video rounded-2xl overflow-hidden border border-noir/5 shadow-md group">
          <img
            src={value.startsWith('data:') ? value : value.startsWith('/') ? value : `/${value}`}
            alt="Upload preview"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
            <button
              onClick={() => inputRef.current?.click()}
              className="p-3 rounded-full bg-white text-noir hover:scale-110 transition-transform"
              title="Modifier"
            >
              <ImageIcon className="w-5 h-5" />
            </button>
            <button
              onClick={clearImage}
              className="p-3 rounded-full bg-red-500 text-white hover:scale-110 transition-transform"
              title="Supprimer"
            >
              <X className="w-5 h-5" />
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
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <Loader2 className="w-10 h-10 text-or animate-spin" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}


