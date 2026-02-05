"use client";

import React, { useState } from "react";
import CreateBlog from "@/app/components/admin/CreateBlog";
import BlogList from "@/app/components/admin/BlogList";
import { Plus, List as ListIcon } from "lucide-react";

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState<"list" | "create">("list");
    const [editingBlog, setEditingBlog] = useState<any>(null);

    const handleEdit = (blog: any) => {
        setEditingBlog(blog);
        setActiveTab("create");
    };

    const handleCreateNew = () => {
        setEditingBlog(null);
        setActiveTab("create");
    };

    return (
        <div className="max-w-5xl mx-auto px-1">
            {/* Page Title */}
            <div className="mb-8 border-b-8 border-black pb-6">
                <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
                    Yazı Yönetimi
                </h1>
                <p className="text-gray-500 font-bold uppercase tracking-widest mt-2">
                    Blog yazılarını buradan ekleyip düzenleyebilirsiniz.
                </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-4 border-black mb-12 bg-white overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <button
                    onClick={() => setActiveTab("list")}
                    className={`flex-1 py-4 font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all text-sm md:text-base ${activeTab === "list" ? "bg-secondary text-black" : "hover:bg-teal-50"
                        }`}
                >
                    <ListIcon size={18} className="md:w-5 md:h-5" /> Yazı Listesi
                </button>
                <button
                    onClick={handleCreateNew}
                    className={`flex-1 py-4 font-black uppercase tracking-widest flex items-center justify-center gap-2 border-l-4 border-black transition-all text-sm md:text-base ${activeTab === "create" && !editingBlog ? "bg-black text-white" : "hover:bg-teal-50"
                        }`}
                >
                    <Plus size={18} className="md:w-5 md:h-5" /> Yeni Yazı
                </button>
                {editingBlog && activeTab === "create" && (
                    <div className="hidden md:flex flex-1 py-4 font-black uppercase tracking-widest items-center justify-center gap-2 border-l-4 border-black bg-yellow-400">
                        Düzenleniyor...
                    </div>
                )}
            </div>

            {/* Content Area */}
            <div className="bg-white border-4 border-black p-4 md:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8">
                {activeTab === "list" ? (
                    <BlogList onEdit={handleEdit} />
                ) : (
                    <CreateBlog editingBlog={editingBlog} onCancel={() => setActiveTab("list")} />
                )}
            </div>
        </div>
    );
}
