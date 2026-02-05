"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/app/lib/supabase/client";
import { ArrowRight, ArrowLeft } from "lucide-react";
import {
    LayoutDashboard,
    FileText,
    FolderKanban,
    Settings,
    LogOut
} from "lucide-react";

interface AdminSidebarProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (isOpen: boolean) => void;
}

export default function AdminSidebar({ isSidebarOpen, setIsSidebarOpen }: AdminSidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();
    const [activeHash, setActiveHash] = useState("#hero");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    const links = [
        { name: "Yazılar", href: "/admin", icon: FileText },
        { name: "Projeler", href: "/admin/projects", icon: FolderKanban },
        { name: "Ayarlar", href: "/admin/settings", icon: Settings },
    ];

    useEffect(() => {
        setActiveHash(pathname);
    }, [pathname])

    return (
        <>
            {/* DESKTOP SIDEBAR */}
            <aside
                className={`hidden lg:flex fixed left-0 top-0 h-full border-r-4 border-black bg-white flex-col justify-between py-10 transition-all duration-500 ease-in-out z-50 overflow-hidden ${isSidebarOpen ? "w-[300px]" : "w-[90px]"
                    }`}
            >
                {/* Logo Area */}
                <div className="relative px-6 mb-16 h-12 flex items-center">
                    <div className={`flex items-center transition-all duration-500 ${isSidebarOpen ? "opacity-100" : "opacity-0 invisible translate-x-[-20px]"}`}>
                        <h1 className="text-3xl font-black text-black tracking-tighter whitespace-nowrap">
                            ADMIN <span className="text-secondary">PANEL</span>
                        </h1>
                    </div>

                    {/* Küçük Logo (Sidebar kapalıyken görünen) */}
                    <div className={`absolute left-1/2 -translate-x-1/2 transition-all duration-500 ${!isSidebarOpen ? "opacity-100 uppercase" : "opacity-0 invisible scale-0"}`}>
                        <h1 className="text-4xl font-black text-black">A</h1>
                    </div>

                    {/* Toggle Button */}
                    <button
                        className="absolute -right-1 top-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-black hover:bg-secondary text-white p-2 transition-all duration-300 z-60"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        {isSidebarOpen ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                    </button>
                </div>

                {/* Navigation List */}
                <nav className="flex flex-col gap-y-2 mt-10 flex-1 px-4">
                    {links.map((item, i) => (
                        <a
                            key={i}
                            href={item.href}
                            className={`group relative flex items-center h-12 gap-x-4 font-bold tracking-wide transition-all duration-500 ${activeHash === item.href
                                ? "bg-secondary text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-4"
                                : "text-black hover:bg-secondary hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-4"
                                }`}
                        >
                            <item.icon size={22} className="shrink-0 transition-transform duration-500" />
                            <span className={`transition-all duration-500 whitespace-nowrap overflow-hidden ${isSidebarOpen ? "opacity-100 w-auto ml-0" : "opacity-0 w-0 -ml-4"
                                }`}>
                                {item.name}
                            </span>

                            {/* Tooltip (Sidebar kapalıyken üstüne gelince görünmesi için opsiyonel) */}
                            {!isSidebarOpen && (
                                <div className="absolute left-full ml-6 px-2 py-1 bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                    {item.name}
                                </div>
                            )}
                        </a>
                    ))}
                </nav>

                {/* Logout Button */}
                <div className="px-4">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center h-12 gap-x-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-red-600 text-white px-4 font-bold 0 hover:bg-red-700 transition-all duration-300"
                    >
                        <LogOut size={22} className="shrink-0" />
                        <span className={`transition-all duration-500 whitespace-nowrap overflow-hidden ${isSidebarOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
                            }`}>
                            Çıkış Yap
                        </span>
                    </button>
                </div>
            </aside>

            {/* MOBILE SIDEBAR */}
            <aside className="lg:hidden fixed left-0 top-0 w-full h-16 border-b-4 border-black bg-white z-50">
                <div className="flex justify-between items-center h-full px-6 bg-white z-60 relative">
                    <h1 className="text-2xl font-black text-black tracking-tight uppercase">AP</h1>
                    <button
                        className="shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-black text-white p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
                    </button>
                </div>

                <div className={`absolute left-0 w-full bg-white border-b-4 border-black shadow-2xl transition-all duration-500 ease-in-out ${isMobileMenuOpen ? "top-full opacity-100 visible" : "top-[-500px] opacity-0 invisible"
                    }`}>
                    <nav className="flex flex-col p-4 gap-y-2">
                        {links.map((item, i) => (
                            <a
                                key={i}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`px-6 py-4 gap-x-4 flex items-center text-lg font-bold transition-all ${activeHash === item.href ? "bg-secondary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black" : ""
                                    }`}
                            >
                                <item.icon size={22} />
                                <span>{item.name}</span>
                            </a>
                        ))}
                        <div className="px-4">
                            <button
                                onClick={handleLogout}
                                className="w-full px-6 py-4 gap-x-4 flex items-center text-lg font-bold transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-red-600 text-white  0 hover:bg-red-700 duration-300"
                            >
                                <LogOut size={22} className="shrink-0" />
                                <span>
                                    Çıkış Yap
                                </span>
                            </button>
                        </div>
                    </nav>
                </div>
            </aside>
        </>
    );
}
