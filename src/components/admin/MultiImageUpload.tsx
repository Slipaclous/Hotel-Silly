'use client';

import { useState, useRef } from 'react';
import { X, Loader2, Plus } from 'lucide-react';
import Image from 'next/image';

interface MultiImageUploadProps {
    values: string[];
    onChange: (urls: string[]) => void;
    label?: string;
}

export default function MultiImageUpload({ values, onChange, label = 'Galerie d&apos;images' }: MultiImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFiles = async (files: FileList) => {
        if (!files || files.length === 0) return;

        setUploading(true);
        const newUrls = [...values];

        try {
            for (let i = 0; i < files.length; i++) {
                const uploadFormData = new FormData();
                uploadFormData.append('file', files[i]);

                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: uploadFormData,
                });

                if (response.ok) {
                    const data = await response.json();
                    newUrls.push(data.url);
                }
            }
            onChange(newUrls);
        } catch (error) {
            console.error('Erreur upload:', error);
            alert('Erreur lors de l\'upload de certaines images');
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (index: number) => {
        const newUrls = values.filter((_, i) => i !== index);
        onChange(newUrls);
    };

    return (
        <div className="space-y-4">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide ml-0.5">
                {label}
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {values.map((url, index) => (
                    <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 shadow-sm group bg-gray-100">
                        <Image
                            src={url.startsWith('/') ? url : `/${url}`}
                            alt={`Gallery image ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                        <button
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 p-1.5 bg-white text-gray-400 hover:text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-sm hover:shadow-md transform scale-90 group-hover:scale-100"
                            title="Supprimer"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </div>
                ))}

                <button
                    onClick={() => inputRef.current?.click()}
                    disabled={uploading}
                    className="relative aspect-square rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-300 transition-all flex flex-col items-center justify-center space-y-2 group"
                    type="button"
                >
                    {uploading ? (
                        <Loader2 className="w-6 h-6 text-or animate-spin" />
                    ) : (
                        <>
                            <div className="p-2 rounded-full bg-white border border-gray-200 group-hover:scale-110 transition-transform shadow-sm">
                                <Plus className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                            </div>
                            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide group-hover:text-gray-600">Ajouter</span>
                        </>
                    )}
                </button>
            </div>

            <input
                ref={inputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
                className="hidden"
            />
        </div>
    );
}
