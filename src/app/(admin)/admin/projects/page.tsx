"use client";

import React, { useState } from "react";
import CreateProject from "@/app/components/admin/CreateProject";
import ProjectList from "@/app/components/admin/ProjectList";
import { Plus, List as ListIcon } from "lucide-react";
import { Project } from "@/app/lib/supabase-posts";

export default function ProjectsPage() {
    const [activeTab, setActiveTab] = useState<"list" | "create">("list");
    const [editingProject, setEditingProject] = useState<Project | null>(null);

    const handleEdit = (project: Project) => {
        setEditingProject(project);
        setActiveTab("create");
    };

    const handleCreateNew = () => {
        setEditingProject(null);
        setActiveTab("create");
    };

    return (
        <div className="max-w-5xl mx-auto">
            {/* Page Title */}
            <div className="mb-8 border-b-8 border-black pb-6">
                <h1 className="text-5xl font-black uppercase tracking-tighter">
                    Proje Yönetimi
                </h1>
                <p className="text-gray-500 font-bold uppercase tracking-widest mt-2">
                    Projelerinizi buradan ekleyip düzenleyebilirsiniz.
                </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-4 border-black mb-12 bg-white overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <button
                    onClick={() => setActiveTab("list")}
                    className={`flex-1 py-4 font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${activeTab === "list" ? "bg-secondary text-black" : "hover:bg-teal-50"
                        }`}
                >
                    <ListIcon size={20} /> Proje Listesi
                </button>
                <button
                    onClick={handleCreateNew}
                    className={`flex-1 py-4 font-black uppercase tracking-widest flex items-center justify-center gap-2 border-l-4 border-black transition-all ${activeTab === "create" && !editingProject ? "bg-black text-white" : "hover:bg-teal-50"
                        }`}
                >
                    <Plus size={20} /> Yeni Proje Ekle
                </button>
                {editingProject && activeTab === "create" && (
                    <div className="flex-1 py-4 font-black uppercase tracking-widest flex items-center justify-center gap-2 border-l-4 border-black bg-yellow-400">
                        Düzenleniyor...
                    </div>
                )}
            </div>

            {/* Content Area */}
            <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                {activeTab === "list" ? (
                    <ProjectList onEdit={handleEdit} key={Date.now()} />
                ) : (
                    <CreateProject
                        editingProject={editingProject}
                        onCancel={() => setActiveTab("list")}
                        onSuccess={() => setActiveTab("list")}
                    />
                )}
            </div>
        </div>
    );
}