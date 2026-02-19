'use client';

import { useState, useRef } from 'react';
import { X, Loader2, Plus, Images } from 'lucide-react';
import Image from 'next/image';

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
        let hasError = false;

        try {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const uploadFormData = new FormData();
                uploadFormData.append('file', file);

                try {
                    const response = await fetch('/api/upload', {
                        method: 'POST',
                        body: uploadFormData,
                    });

                    if (response.ok) {
                        const data = await response.json();
                        newUrls.push(data.url);
                        // On met à jour au fur et à mesure pour éviter de tout perdre si ça coupe
                        onChange([...newUrls]);
                    } else {
                        const errorData = await response.json();
                        console.error(`Erreur upload fichier ${file.name}:`, errorData);
                        hasError = true;
                    }
                } catch (err) {
                    console.error(`Erreur réseau pour ${file.name}:`, err);
                    hasError = true;
                }
            }

            if (hasError) {
                alert('Certaines images n\'ont pas pu être envoyées. Vérifiez votre connexion ou la taille des fichiers (max 5Mo).');
            }
        } finally {
            setUploading(false);
            // On reset l'input pour permettre de re-sélectionner le même fichier si besoin
            if (inputRef.current) inputRef.current.value = '';
        }
    };

    const removeImage = (index: number) => {
        const newUrls = values.filter((_, i) => i !== index);
        onChange(newUrls);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center space-x-2">
                    <Images className="w-3.5 h-3.5" />
                    <span>{label}</span>
                </label>
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-[0.1em]">{values.length} visuels</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {values.map((url, index) => (
                    <div key={index} className="relative aspect-square rounded-2xl overflow-hidden border border-slate-200 shadow-sm group bg-slate-50 transition-all duration-500 hover:shadow-xl hover:shadow-slate-200/50">
                        <Image
                            src={url.startsWith('http') ? url : url.startsWith('/') ? url : `/${url}`}
                            alt={`Gallery image ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]" />
                        <button
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 w-8 h-8 bg-rose-500 text-white rounded-xl opacity-0 translate-y-[-8px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg flex items-center justify-center hover:bg-rose-600 active:scale-90"
                            title="Retirer"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}

                <button
                    onClick={() => inputRef.current?.click()}
                    disabled={uploading}
                    className="relative aspect-square rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-white hover:border-or/40 transition-all duration-500 flex flex-col items-center justify-center group active:scale-95"
                    type="button"
                >
                    {uploading ? (
                        <div className="flex flex-col items-center space-y-2">
                            <Loader2 className="w-6 h-6 text-or animate-spin" />
                            <span className="text-[9px] font-bold text-or uppercase tracking-widest">Envoi...</span>
                        </div>
                    ) : (
                        <>
                            <div className="p-3 rounded-2xl bg-white border border-slate-100 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-sm group-hover:shadow-lg group-hover:text-or">
                                <Plus className="w-5 h-5 text-slate-400 group-hover:text-or" />
                            </div>
                            <span className="mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-900 transition-colors">Ajouter</span>
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
