"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/app/lib/supabase/client";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { Project } from "@/app/lib/supabase-posts";
import ConfirmDialog from "../ConfirmDialog";
import NotificationModal from "../NotificationModal";

interface ProjectListProps {
    onEdit: (project: Project) => void;
}

export default function ProjectList({ onEdit }: ProjectListProps) {
    const supabase = createClient();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [showConfirm, setShowConfirm] = useState(false);
    const [project, setProject] = useState<Project | null>(null);
    const [notification, setNotification] = useState<{
        show: boolean;
        message: string;
        type: "success" | "error" | "warning" | "info";
    }>({ show: false, message: "", type: "info" });
    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("projects")
            .select("*")
            .order("display_order", { ascending: true });

        if (!error && data) {
            setProjects(data);
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        const { error } = await supabase.from("projects").delete().eq("id", id);

        if (error) {
            setNotification({
                show: true,
                message: `Silme hatası: ${error.message}`,
                type: "error",
            });
        } else {
            setNotification({
                show: true,
                message: "Proje başarıyla silindi!",
                type: "success",
            });
            fetchProjects();
        }
    };

    const handlePreDelete = (id: string) => {
        const projectToDelete = projects.find((p) => p.id === id);
        if (projectToDelete) {
            setProject(projectToDelete);
            setShowConfirm(true);
        }
    };

    const togglePublish = async (project: Project) => {
        const { error } = await supabase
            .from("projects")
            .update({ is_published: !project.is_published })
            .eq("id", project.id);

        if (error) {
            alert("Güncelleme hatası: " + error.message);
        } else {
            fetchProjects();
        }
    };

    if (loading) {
        return (
            <div className="text-center py-12">
                <p className="text-xl font-black uppercase animate-pulse">Yükleniyor...</p>
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <div className="text-center py-12 border-4 border-black bg-gray-100">
                <p className="text-xl font-black uppercase">Henüz proje eklenmemiş</p>
                <p className="text-gray-500 mt-2">Yeni proje eklemek için yukarıdaki butonu kullanın</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {projects.map((project) => (
                <div
                    key={project.id}
                    className="border-4 border-black bg-white p-2 sm:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                    <div className="flex flex-col md:flex-row sm:gap-6 gap-2">
                        {/* Image */}
                        <div className="w-full md:w-48 h-32 border-2 border-black overflow-hidden shrink-0">
                            <img
                                src={project.image_url}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h3 className="text-2xl font-black uppercase tracking-tighter">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-600 font-bold">{project.subtitle}</p>
                                </div>
                                <div className="flex gap-2">
                                    <span className={`px-3 py-1 text-xs font-bold uppercase border-2 border-black ${project.is_published ? "bg-green-400" : "bg-gray-300"
                                        }`}>
                                        {project.is_published ? "Yayında" : "Taslak"}
                                    </span>
                                </div>
                            </div>

                            <p className="text-gray-700 mb-3 line-clamp-2">{project.description}</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-2 py-1 bg-blue-500 text-white text-xs font-bold uppercase">
                                    {project.type}
                                </span>
                                <span className="px-2 py-1 bg-yellow-400 text-black text-xs font-bold uppercase">
                                    {project.status}
                                </span>
                                {project.tech.slice(0, 3).map((tech, i) => (
                                    <span key={i} className="px-2 py-1 bg-gray-200 border border-black text-xs font-bold">
                                        {tech}
                                    </span>
                                ))}
                                {project.tech.length > 3 && (
                                    <span className="px-2 py-1 bg-gray-100 text-xs font-bold">
                                        +{project.tech.length - 3}
                                    </span>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 pt-3 border-t-2 border-black">
                                <button
                                    onClick={() => onEdit(project)}
                                    className="px-4 py-2 bg-black text-white font-bold uppercase text-sm hover:bg-yellow-400 hover:text-black transition-colors flex items-center gap-2"
                                >
                                    <Pencil size={16} /> Düzenle
                                </button>
                                <button
                                    onClick={() => togglePublish(project)}
                                    className="px-4 py-2 bg-white border-2 border-black font-bold uppercase text-sm hover:bg-gray-100 transition-colors flex items-center gap-2"
                                >
                                    {project.is_published ? <EyeOff size={16} /> : <Eye size={16} />}
                                    {project.is_published ? "Gizle" : "Yayınla"}
                                </button>
                                <button
                                    onClick={() => handlePreDelete(project.id)}
                                    className="px-4 py-2 bg-red-600 text-white font-bold uppercase text-sm hover:bg-red-700 transition-colors flex items-center gap-2"
                                >
                                    <Trash2 size={16} /> Sil
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Confirm Dialog */}
            {showConfirm && project && (
                <ConfirmDialog
                    title="Projeyi Sil"
                    message={`"${project.title}" projesini silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`}
                    onConfirm={() => {
                        handleDelete(project.id);
                        setShowConfirm(false);
                    }}
                    onCancel={() => setShowConfirm(false)}
                    confirmText="Sil"
                    cancelText="İptal"
                    type="danger"
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
        </div>
    );
}
