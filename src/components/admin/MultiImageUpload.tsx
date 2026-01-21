'use client';

import { useState, useRef } from 'react';
import { Upload, X, ImageIcon, Loader2, Plus } from 'lucide-react';

interface MultiImageUploadProps {
    values: string[];
    onChange: (urls: string[]) => void;
    label?: string;
}

export default function MultiImageUpload({ values, onChange, label = 'Galerie d\'images' }: MultiImageUploadProps) {
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
            <label className="text-xs font-body font-bold text-noir/40 uppercase tracking-widest ml-1">
                {label}
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {values.map((url, index) => (
                    <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-noir/5 shadow-sm group">
                        <img
                            src={url.startsWith('/') ? url : `/${url}`}
                            alt={`Gallery image ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <button
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </div>
                ))}

                <button
                    onClick={() => inputRef.current?.click()}
                    disabled={uploading}
                    className="relative aspect-square rounded-xl border-2 border-dashed border-noir/10 bg-noir/[0.02] hover:bg-noir/[0.04] hover:border-or/30 transition-all flex flex-col items-center justify-center space-y-2 group"
                    type="button"
                >
                    {uploading ? (
                        <Loader2 className="w-6 h-6 text-or animate-spin" />
                    ) : (
                        <>
                            <div className="p-2 rounded-full bg-white border border-noir/5 group-hover:bg-or group-hover:text-white transition-all">
                                <Plus className="w-5 h-5 text-noir/20 group-hover:text-white" />
                            </div>
                            <span className="text-[10px] font-body text-noir/40 uppercase tracking-widest">Ajouter</span>
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
