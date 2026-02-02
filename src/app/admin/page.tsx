"use client"
import { createClient } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";
import CreateBlog from "@/app/components/admin/CreateBlog";
import BlogList from "@/app/components/admin/BlogList";
import React, { useEffect, useState } from "react";
import { Plus, List as ListIcon } from "lucide-react";

export default function AdminPage() {
    const supabase = createClient();
    const router = useRouter();
    const [checking, setChecking] = useState(true);
    const [activeTab, setActiveTab] = useState<"list" | "create">("list");
    const [editingBlog, setEditingBlog] = useState<any>(null);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/login");
            } else {
                setChecking(false);
            }
        };
        checkUser();
    }, [supabase, router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    const handleEdit = (blog: any) => {
        setEditingBlog(blog);
        setActiveTab("create");
    };

    const handleCreateNew = () => {
        setEditingBlog(null);
        setActiveTab("create");
    };

    if (checking) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <p className="text-xl font-black uppercase italic">Kontrol ediliyor...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8 border-b-8 border-black pb-6">
                    <h1 className="text-6xl font-black uppercase tracking-tighter" style={{ fontFamily: "serif" }}>
                        Admin
                    </h1>
                    <button
                        onClick={handleLogout}
                        className="px-6 py-2 bg-black text-white font-bold uppercase border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all text-sm"
                    >
                        Çıkış Yap
                    </button>
                </div>

                {/* Sub-Header / Navigation */}
                <div className="flex border-4 border-black mb-12 bg-white overflow-hidden">
                    <button
                        onClick={() => setActiveTab("list")}
                        className={`flex-1 py-4 font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${activeTab === "list" ? "bg-black text-white" : "hover:bg-teal-50"
                            }`}
                    >
                        <ListIcon size={20} /> Yazılar
                    </button>
                    <button
                        onClick={handleCreateNew}
                        className={`flex-1 py-4 font-black uppercase tracking-widest flex items-center justify-center gap-2 border-l-4 border-black transition-all ${activeTab === "create" && !editingBlog ? "bg-black text-white" : "hover:bg-teal-50"
                            }`}
                    >
                        <Plus size={20} /> Yeni Ekle
                    </button>
                    {editingBlog && activeTab === "create" && (
                        <div className="flex-1 py-4 font-black uppercase tracking-widest flex items-center justify-center gap-2 border-l-4 border-black bg-yellow-400">
                            Düzenleniyor...
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="grid grid-cols-1">
                    {activeTab === "list" ? (
                        <BlogList onEdit={handleEdit} />
                    ) : (
                        <CreateBlog editingBlog={editingBlog} onCancel={() => setActiveTab("list")} />
                    )}
                </div>
            </div>
        </div>
    );
}
