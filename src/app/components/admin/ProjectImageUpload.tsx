"use client";

import React, { useState } from "react";
import { Upload, X } from "lucide-react";

interface ProjectImageUploadProps {
    onFileSelect: (file: File | null) => void;
    currentImageUrl?: string;
}

export default function ProjectImageUpload({ onFileSelect, currentImageUrl }: ProjectImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(currentImageUrl || null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }

        const file = e.target.files[0];

        // Önizleme oluştur
        const reader = new FileReader();
        reader.onload = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        // File objesini parent'a gönder
        onFileSelect(file);
    };

    const removeImage = () => {
        setPreview(currentImageUrl || null);
        onFileSelect(null);
    };

    return (
        <div className="space-y-4">
            <div className="relative group">
                <div
                    className={`w-full h-64 border-4 border-dashed border-black flex flex-col items-center justify-center bg-gray-50 transition-colors ${!preview ? "hover:bg-teal-50" : ""
                        }`}
                >
                    {preview ? (
                        <div className="relative w-full h-full">
                            <img
                                src={preview}
                                alt="Önizleme"
                                className="w-full h-full object-cover"
                            />
                            <button
                                type="button"
                                onClick={removeImage}
                                className="absolute top-2 right-2 p-2 bg-black text-white hover:bg-red-500 transition-colors border-2 border-white shadow-lg"
                            >
                                <X size={20} />
                            </button>
                            <div className="absolute bottom-2 left-2 bg-yellow-400 border-2 border-black px-3 py-1 font-bold text-xs uppercase">
                                Önizleme - Henüz Yüklenmedi
                            </div>
                        </div>
                    ) : (
                        <label className="cursor-pointer flex flex-col items-center space-y-3 p-6 w-full h-full justify-center">
                            <Upload size={40} />
                            <span className="font-black text-base uppercase tracking-tighter">
                                Proje Görseli Seç
                            </span>
                            <span className="text-xs text-gray-500 font-bold">
                                PNG, JPG veya WEBP (Maks 5MB)
                            </span>
                            <span className="text-xs text-yellow-600 font-bold">
                                Kaydet butonuna basınca yüklenecek
                            </span>
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </label>
                    )}
                </div>
            </div>
        </div>
    );
}
