"use client";

import React, { useState } from "react";
import { createClient } from "@/app/lib/supabase/client";
import { Upload, X, Loader2 } from "lucide-react";

interface ImageUploadProps {
    onUploadSuccess: (url: string) => void;
    currentImageUrl?: string;
}

export default function ImageUpload({ onUploadSuccess, currentImageUrl }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(currentImageUrl || null);
    const [error, setError] = useState<string | null>(null);
    const supabase = createClient();

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setError(null);
            setUploading(true);

            if (!e.target.files || e.target.files.length === 0) {
                throw new Error("Lütfen bir dosya seçin.");
            }

            const file = e.target.files[0];
            const fileExt = file.name.split(".").pop();
            const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            // Görsel önizlemesi oluştur
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);

            // Supabase Storage'a yükle
            const { error: uploadError, data } = await supabase.storage
                .from("blog-images")
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            // Public URL al
            const { data: { publicUrl } } = supabase.storage
                .from("blog-images")
                .getPublicUrl(filePath);

            onUploadSuccess(publicUrl);
        } catch (error: any) {
            setError(error.message || "Görsel yüklenirken bir hata oluştu.");
            setPreview(null);
        } finally {
            setUploading(false);
        }
    };

    const removeImage = () => {
        setPreview(null);
        onUploadSuccess("");
    };

    return (
        <div className="space-y-4">
            <div className="relative group">
                <div
                    className={`w-full h-48 border-4 border-dashed border-black flex flex-col items-center justify-center bg-gray-50 transition-colors ${!preview ? "hover:bg-teal-50" : ""
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
                                className="absolute top-2 right-2 p-1 bg-black text-white hover:bg-red-500 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    ) : (
                        <label className="cursor-pointer flex flex-col items-center space-y-2 p-4">
                            {uploading ? (
                                <Loader2 className="animate-spin" size={32} />
                            ) : (
                                <Upload size={32} />
                            )}
                            <span className="font-bold text-sm uppercase tracking-tighter">
                                {uploading ? "Yükleniyor..." : "Görsel Yükle veya Sürükle"}
                            </span>
                            <span className="text-[10px] text-gray-500 italic">PNG, JPG veya WEBP (Maks 2MB)</span>
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleUpload}
                                disabled={uploading}
                            />
                        </label>
                    )}
                </div>
            </div>

            {error && (
                <p className="text-red-500 text-xs font-bold uppercase italic">{error}</p>
            )}
        </div>
    );
}
