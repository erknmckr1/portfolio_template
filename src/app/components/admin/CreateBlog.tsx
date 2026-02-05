"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@/app/lib/supabase/client";
import { motion } from "framer-motion";
import TiptapEditor from "@/app/components/admin/TiptapEditor";
import ImageUpload from "@/app/components/admin/ImageUpload";

const textVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" as const },
    },
};

interface CreateBlogProps {
    editingBlog?: any;
    onCancel?: () => void;
}

export default function CreateBlog({ editingBlog, onCancel }: CreateBlogProps) {
    const supabase = createClient();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    const [formData, setFormData] = useState({
        title: editingBlog?.title || "",
        slug: editingBlog?.slug || "",
        excerpt: editingBlog?.excerpt || "",
        content: editingBlog?.content || "",
        category: editingBlog?.category || "",
        tags: editingBlog?.tags ? (Array.isArray(editingBlog.tags) ? editingBlog.tags.join(", ") : editingBlog.tags) : "",
        image_url: editingBlog?.image_url || "",
    });

    // Verileri senkronize et (Düzenleme modu için)
    useEffect(() => {
        if (editingBlog) {
            setFormData({
                title: editingBlog.title || "",
                slug: editingBlog.slug || "",
                excerpt: editingBlog.excerpt || "",
                content: editingBlog.content || "",
                category: editingBlog.category || "",
                tags: editingBlog.tags ? (Array.isArray(editingBlog.tags) ? editingBlog.tags.join(", ") : editingBlog.tags) : "",
                image_url: editingBlog.image_url || "",
            });
        }
    }, [editingBlog]);

    // Otomatik Slug Oluşturma
    useEffect(() => {
        if (editingBlog) return; // Düzenleme modunda otomatik slug değiştirme (SEO için tehlikeli)

        const generatedSlug = formData.title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "");

        setFormData((prev) => ({ ...prev, slug: generatedSlug }));
    }, [formData.title, editingBlog]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleContentChange = (content: string) => {
        setFormData((prev) => ({ ...prev, content }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });

        try {
            // User ID alma (session'dan)
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) throw new Error("Oturum açılamadı.");

            if (editingBlog) {
                const { error } = await supabase
                    .from("blogs")
                    .update({
                        ...formData,
                        tags: formData.tags.split(",").map((tag: string) => tag.trim()),
                        updated_at: new Date().toISOString(),
                    })
                    .eq("id", editingBlog.id);

                if (error) throw error;
                setMessage({ type: "success", text: "Blog başarıyla güncellendi!" });
            } else {
                const { error } = await supabase.from("blogs").insert([
                    {
                        ...formData,
                        tags: formData.tags.split(",").map((tag: string) => tag.trim()),
                        author_id: user.id,
                        is_published: true,
                    },
                ]);

                if (error) throw error;
                setMessage({ type: "success", text: "Blog başarıyla oluşturuldu!" });
            }

            // Başarılı işlemden 1.5 saniye sonra listeye dön
            setTimeout(() => {
                if (onCancel) onCancel();
            }, 1500);
            setFormData({
                title: "",
                slug: "",
                excerpt: "",
                content: "",
                category: "",
                tags: "",
                image_url: "",
            });
        } catch (error: any) {
            setMessage({ type: "error", text: error.message || "Bir hata oluştu." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            variants={textVariants}
            initial="hidden"
            animate="show"
            className="w-full bg-white border-4 border-black p-4 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
        >
            <h2 className="text-3xl font-black mb-8 uppercase tracking-tighter" style={{ fontFamily: "serif" }}>
                {editingBlog ? "Blog Yazısını Düzenle" : "Yeni Blog Yazısı"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Başlık */}
                <div className="space-y-2">
                    <label htmlFor="title" className="block font-bold uppercase text-sm">Başlık</label>
                    <input
                        id="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Blog Başlığı..."
                        className="w-full border-2 border-black p-3 outline-none focus:bg-teal-50 transition-colors"
                    />
                </div>

                {/* Slug (Salt Okunur) */}
                <div className="space-y-2">
                    <label htmlFor="slug" className="block font-bold uppercase text-sm">URL (Slug)</label>
                    <input
                        id="slug"
                        readOnly
                        value={formData.slug}
                        className="w-full border-2 border-black p-3 bg-gray-100 italic font-mono text-sm"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Kategori */}
                    <div className="space-y-2">
                        <label htmlFor="category" className="block font-bold uppercase text-sm">Kategori</label>
                        <input
                            id="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="Örn: Yazılım"
                            className="w-full border-2 border-black p-3 outline-none focus:bg-teal-50"
                        />
                    </div>
                    {/* Etiketler */}
                    <div className="space-y-2">
                        <label htmlFor="tags" className="block font-bold uppercase text-sm">Etiketler (Virgülle ayır)</label>
                        <input
                            id="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            placeholder="react, nextjs, tailwind"
                            className="w-full border-2 border-black p-3 outline-none focus:bg-teal-50"
                        />
                    </div>
                </div>

                {/* Görsel Yükleme */}
                <div className="space-y-2">
                    <label className="block font-bold uppercase text-sm">Blog Görseli</label>
                    <ImageUpload
                        currentImageUrl={formData.image_url}
                        onUploadSuccess={(url: string) => setFormData(prev => ({ ...prev, image_url: url }))}
                    />
                </div>

                {/* Özet */}
                <div className="space-y-2">
                    <label htmlFor="excerpt" className="block font-bold uppercase text-sm">Kısa Özet</label>
                    <textarea
                        id="excerpt"
                        rows={2}
                        value={formData.excerpt}
                        onChange={handleChange}
                        className="w-full border-2 border-black p-3 outline-none focus:bg-teal-50 resize-none"
                    />
                </div>

                {/* İçerik */}
                <div className="space-y-2">
                    <label htmlFor="content" className="block font-bold uppercase text-sm">Blog İçeriği</label>
                    <TiptapEditor
                        content={formData.content}
                        onChange={handleContentChange}
                    />
                </div>

                {/* Mesaj */}
                {message.text && (
                    <div className={`p-4 font-bold border-2 border-black ${message.type === "success" ? "bg-green-200" : "bg-red-200"}`}>
                        {message.type === "success" ? "  " : " "} {message.text}
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 py-5 font-black uppercase tracking-widest border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100 transition-all active:shadow-none active:translate-x-1 active:translate-y-1"
                        >
                            İptal
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`py-5 font-black uppercase tracking-widest border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-none active:translate-x-1 active:translate-y-1 ${onCancel ? "flex-2" : "w-full"
                            } ${loading ? "bg-gray-200" : "bg-yellow-400 hover:bg-yellow-500"}`}
                    >
                        {loading ? "Kaydediliyor..." : editingBlog ? "Değişiklikleri Kaydet" : "Blog Yazısını Yayınla"}
                    </button>
                </div>
            </form>
        </motion.div>
    );
}
