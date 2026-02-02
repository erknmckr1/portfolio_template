"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/app/lib/supabase/client";
import { Edit2, Trash2, Globe, Lock, Calendar, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

interface Blog {
    id: string;
    title: string;
    slug: string;
    created_at: string;
    is_published: boolean;
    category: string;
}

interface BlogListProps {
    onEdit: (blog: any) => void;
}

export default function BlogList({ onEdit }: BlogListProps) {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    const fetchBlogs = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("blogs")
            .select("id, title, slug, created_at, is_published, category")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Hata:", error.message);
        } else {
            setBlogs(data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm("Bu blog yazısını silmek istediğinize emin misiniz?")) {
            const { error } = await supabase.from("blogs").delete().eq("id", id);
            if (error) {
                alert("Silme işlemi sırasında bir hata oluştu: " + error.message);
            } else {
                setBlogs(blogs.filter((blog) => blog.id !== id));
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center p-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-black"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-black uppercase tracking-tighter" style={{ fontFamily: "serif" }}>
                    Blog Yazıların
                </h2>
                <div className="bg-black text-white px-4 py-2 font-bold text-sm">
                    TOPLAM: {blogs.length}
                </div>
            </div>

            {blogs.length === 0 ? (
                <div className="border-4 border-black border-dashed p-12 text-center bg-gray-50">
                    <MessageSquare size={48} className="mx-auto mb-4 text-gray-400" />
                    <p className="font-bold uppercase">Henüz hiç blog yazısı oluşturmadınız.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {blogs.map((blog) => (
                        <motion.div
                            key={blog.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white border-2 border-black p-4 flex flex-col md:flex-row md:items-center justify-between hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all group"
                        >
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-black text-xl group-hover:text-teal-600 transition-colors uppercase leading-tight">
                                        {blog.title}
                                    </h3>
                                    {blog.is_published ? (
                                        <span className="bg-green-200 text-green-800 text-[10px] px-2 py-0.5 border border-green-800 font-bold uppercase flex items-center gap-1">
                                            <Globe size={10} /> Yayında
                                        </span>
                                    ) : (
                                        <span className="bg-gray-200 text-gray-800 text-[10px] px-2 py-0.5 border border-gray-800 font-bold uppercase flex items-center gap-1">
                                            <Lock size={10} /> Taslak
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-gray-500 uppercase">
                                    <span className="flex items-center gap-1">
                                        <Calendar size={14} /> {new Date(blog.created_at).toLocaleDateString("tr-TR")}
                                    </span>
                                    {blog.category && (
                                        <span className="bg-black text-white px-2 py-0.5">
                                            {blog.category}
                                        </span>
                                    )}
                                    <span className="font-mono text-gray-400">/{blog.slug}</span>
                                </div>
                            </div>

                            <div className="flex gap-2 mt-4 md:mt-0">
                                <button
                                    onClick={() => onEdit(blog)}
                                    className="p-2 border-2 border-black hover:bg-yellow-400 transition-colors"
                                    title="Düzenle"
                                >
                                    <Edit2 size={20} />
                                </button>
                                <button
                                    onClick={() => handleDelete(blog.id)}
                                    className="p-2 border-2 border-black hover:bg-red-500 hover:text-white transition-colors"
                                    title="Sil"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
