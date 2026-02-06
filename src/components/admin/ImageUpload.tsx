'use client';

import { useState, useRef } from 'react';
import { Upload, X, ImageIcon, Loader2 } from 'lucide-react';
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
    onChange('');
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide ml-0.5">
        {label}
      </label>

      {!value ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative aspect-video rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer flex flex-col items-center justify-center space-y-3 group overflow-hidden ${dragActive
            ? 'border-or bg-orange-50'
            : 'border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-300'
            }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            className="hidden"
          />

          <div className="p-3 rounded-full bg-white border border-gray-200 group-hover:scale-110 transition-transform duration-300 shadow-sm">
            {uploading ? (
              <Loader2 className="w-5 h-5 text-or animate-spin" />
            ) : (
              <Upload className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
            )}
          </div>

          <div className="text-center px-4">
            <p className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
              {uploading ? 'Téléchargement...' : 'Cliquez ou glissez une image'}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              JPG, PNG, WEBP (max 10MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 shadow-sm group bg-gray-100">
          <Image
            src={value.startsWith('data:') ? value : value.startsWith('/') ? value : `/${value}`}
            alt="Upload preview"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-3 backdrop-blur-[2px]">
            <button
              onClick={() => inputRef.current?.click()}
              className="p-2 rounded-lg bg-white text-gray-700 hover:text-blue-600 transition-colors shadow-lg"
              title="Remplacer"
            >
              <ImageIcon className="w-4 h-4" />
            </button>
            <button
              onClick={clearImage}
              className="p-2 rounded-lg bg-white text-gray-700 hover:text-red-600 transition-colors shadow-lg"
              title="Supprimer"
            >
              <X className="w-4 h-4" />
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
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-or animate-spin" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}


