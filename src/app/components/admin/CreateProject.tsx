"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/app/lib/supabase/client";
import { Save, X, Plus } from "lucide-react";
import { Project } from "@/app/lib/supabase-posts";
import ProjectImageUpload from "@/app/components/admin/ProjectImageUpload";
import NotificationModal from "@/app/components/NotificationModal";
import ConfirmDialog from "@/app/components/ConfirmDialog";

interface CreateProjectProps {
    editingProject: Project | null;
    onCancel: () => void;
    onSuccess?: () => void;
}

export default function CreateProject({ editingProject, onCancel, onSuccess }: CreateProjectProps) {
    const supabase = createClient();
    const [loading, setLoading] = useState(false);
    const [techInput, setTechInput] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [notification, setNotification] = useState<{
        show: boolean;
        message: string;
        type: "success" | "error" | "warning" | "info";
    }>({ show: false, message: "", type: "info" });

    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        description: "",
        image_url: "",
        type: "frontend" as Project["type"],
        status: "development" as Project["status"],
        tech: [] as string[],
        is_published: false,
        display_order: 0,
        live_link: "",
        github_link: "",
    });

    useEffect(() => {
        if (editingProject) {
            setFormData({
                title: editingProject.title,
                subtitle: editingProject.subtitle,
                description: editingProject.description,
                image_url: editingProject.image_url,
                type: editingProject.type,
                status: editingProject.status,
                tech: editingProject.tech || [],
                is_published: editingProject.is_published,
                display_order: editingProject.display_order,
                live_link: editingProject.live_link || "",
                github_link: editingProject.github_link || "",
            });
        }
    }, [editingProject]);

    const uploadImage = async (file: File): Promise<string> => {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from("project_image_bucket")
            .upload(filePath, file);

        if (uploadError) {
            throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
            .from("project_image_bucket")
            .getPublicUrl(filePath);

        return publicUrl;
    };

    const handleSubmit = async () => {
        setLoading(true);

        try {
            let imageUrl = formData.image_url;

            if (selectedFile) {
                imageUrl = await uploadImage(selectedFile);
            }

            if (!imageUrl && !editingProject) {
                setNotification({
                    show: true,
                    message: "Lütfen bir proje görseli seçin!",
                    type: "warning",
                });
                setLoading(false);
                return;
            }

            const projectData = {
                ...formData,
                image_url: imageUrl,
            };

            if (editingProject) {
                const { error } = await supabase
                    .from("projects")
                    .update(projectData)
                    .eq("id", editingProject.id);

                if (error) throw error;
                setNotification({
                    show: true,
                    message: "Proje başarıyla güncellendi!",
                    type: "success",
                });
                setTimeout(() => {
                    onCancel();
                    onSuccess?.();
                }, 1500);
            } else {
                const { error } = await supabase
                    .from("projects")
                    .insert([projectData]);

                if (error) throw error;
                setNotification({
                    show: true,
                    message: "Proje başarıyla eklendi!",
                    type: "success",
                });
                setTimeout(() => {
                    onCancel();
                    onSuccess?.();
                }, 1500);
            }
        } catch (error: any) {
            setNotification({
                show: true,
                message: `Hata: ${error.message}`,
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    const handlePreConfirmCreate = () => {
        setShowConfirm(true);
    };

    const addTech = () => {
        if (techInput.trim() && !formData.tech.includes(techInput.trim())) {
            setFormData({ ...formData, tech: [...formData.tech, techInput.trim()] });
            setTechInput("");
        }
    };

    const removeTech = (tech: string) => {
        setFormData({ ...formData, tech: formData.tech.filter(t => t !== tech) });
    };

    return (
        <form className="space-y-8">
            {/* Title & Subtitle */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-black uppercase tracking-widest mb-2">
                        Proje Başlığı *
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-3 border-4 border-black focus:outline-none focus:ring-4 focus:ring-yellow-400 font-bold"
                        placeholder="Örn: E-Ticaret Platformu"
                    />
                </div>
                <div>
                    <label className="block text-sm font-black uppercase tracking-widest mb-2">
                        Alt Başlık
                    </label>
                    <input
                        type="text"
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        className="w-full px-4 py-3 border-4 border-black focus:outline-none focus:ring-4 focus:ring-yellow-400 font-bold"
                        placeholder="Örn: Modern Web Uygulaması"
                    />
                </div>
            </div>

            {/* Linkler */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-black uppercase tracking-widest mb-2">
                        Canlı Link (Opsiyonel)
                    </label>
                    <input
                        type="url"
                        value={formData.live_link}
                        onChange={(e) => setFormData({ ...formData, live_link: e.target.value })}
                        className="w-full px-4 py-3 border-4 border-black focus:outline-none focus:ring-4 focus:ring-yellow-400 font-bold font-mono"
                        placeholder="https://proje-canli.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-black uppercase tracking-widest mb-2">
                        GitHub Link (Opsiyonel)
                    </label>
                    <input
                        type="url"
                        value={formData.github_link}
                        onChange={(e) => setFormData({ ...formData, github_link: e.target.value })}
                        className="w-full px-4 py-3 border-4 border-black focus:outline-none focus:ring-4 focus:ring-yellow-400 font-bold font-mono"
                        placeholder="https://github.com/kullanici/proje"
                    />
                </div>
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-black uppercase tracking-widest mb-2">
                    Açıklama *
                </label>
                <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 border-4 border-black focus:outline-none focus:ring-4 focus:ring-yellow-400 min-h-[120px] font-bold"
                    placeholder="Proje hakkında detaylı açıklama..."
                />
            </div>

            {/* Image Upload */}
            <div>
                <label className="block text-sm font-black uppercase tracking-widest mb-2">
                    Proje Görseli *
                </label>
                <ProjectImageUpload
                    onFileSelect={(file) => setSelectedFile(file)}
                    currentImageUrl={formData.image_url}
                />
            </div>

            {/* Type & Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-black uppercase tracking-widest mb-2">
                        Proje Tipi *
                    </label>
                    <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value as Project["type"] })}
                        className="w-full px-4 py-3 border-4 border-black focus:outline-none focus:ring-4 focus:ring-yellow-400 font-bold"
                    >
                        <option value="frontend">Frontend</option>
                        <option value="backend">Backend</option>
                        <option value="fullstack">Fullstack</option>
                        <option value="uiux">UI/UX</option>
                        <option value="mobile">Mobile</option>
                        <option value="devops">DevOps</option>
                        <option value="ai">AI</option>
                        <option value="other">Diğer</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-black uppercase tracking-widest mb-2">
                        Durum *
                    </label>
                    <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as Project["status"] })}
                        className="w-full px-4 py-3 border-4 border-black focus:outline-none focus:ring-4 focus:ring-yellow-400 font-bold"
                    >
                        <option value="design">Design</option>
                        <option value="development">Development</option>
                        <option value="branding">Branding</option>
                        <option value="illustration">Illustration</option>
                        <option value="featured">Featured</option>
                        <option value="finished">Finished</option>
                    </select>
                </div>
            </div>

            {/* Technologies */}
            <div>
                <label className="block text-sm font-black uppercase tracking-widest mb-2">
                    Teknolojiler
                </label>
                <div className="flex gap-2 mb-3">
                    <input
                        type="text"
                        value={techInput}
                        onChange={(e) => setTechInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
                        className="flex-1 px-4 py-3 border-4 border-black focus:outline-none focus:ring-4 focus:ring-yellow-400 font-bold"
                        placeholder="Örn: React, Node.js"
                    />
                    <button
                        type="button"
                        onClick={addTech}
                        className="px-6 py-3 bg-black text-white font-bold uppercase border-4 border-black hover:bg-yellow-400 hover:text-black transition-colors flex items-center gap-2"
                    >
                        <Plus size={18} /> Ekle
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {formData.tech.map((tech, i) => (
                        <span
                            key={i}
                            className="px-3 py-1 bg-yellow-400 border-2 border-black font-bold text-sm flex items-center gap-2"
                        >
                            {tech}
                            <button
                                type="button"
                                onClick={() => removeTech(tech)}
                                className="hover:text-red-600"
                            >
                                <X size={14} />
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            {/* Display Order & Published */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-black uppercase tracking-widest mb-2">
                        Sıralama
                    </label>
                    <input
                        type="number"
                        value={formData.display_order}
                        onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-3 border-4 border-black focus:outline-none focus:ring-4 focus:ring-yellow-400 font-bold"
                    />
                </div>
                <div className="flex items-center gap-4 pt-8">
                    <input
                        type="checkbox"
                        id="is_published"
                        checked={formData.is_published}
                        onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                        className="w-6 h-6 border-4 border-black"
                    />
                    <label htmlFor="is_published" className="text-sm font-black uppercase tracking-widest cursor-pointer">
                        Yayınla
                    </label>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-6 border-t-4 border-black">
                <button
                    type="button"
                    onClick={handlePreConfirmCreate}
                    disabled={loading}
                    className="flex-1 px-6 py-4 bg-black text-white font-bold uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    <Save size={20} />
                    {loading ? "Kaydediliyor..." : editingProject ? "Güncelle" : "Kaydet"}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-4 bg-white text-black font-bold uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center gap-2"
                >
                    <X size={20} />
                    İptal
                </button>
            </div>

            {/* Confirm Dialog */}
            {showConfirm && (
                <ConfirmDialog
                    title={editingProject ? "Projeyi Güncelle" : "Yeni Proje Ekle"}
                    message={
                        editingProject
                            ? "Bu projeyi güncellemek istediğinize emin misiniz?"
                            : "Yeni proje eklemek istediğinize emin misiniz?"
                    }
                    onConfirm={() => {
                        setShowConfirm(false);
                        handleSubmit();
                    }}
                    onCancel={() => setShowConfirm(false)}
                    confirmText="Evet"
                    cancelText="Hayır"
                    type="warning"
                />
            )}

            {/* Notification Modal */}
            {notification.show && (
                <NotificationModal
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification({ ...notification, show: false })}
                />
            )}
        </form>
    );
}
