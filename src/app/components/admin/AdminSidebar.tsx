"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/app/lib/supabase/client";
import {
    LayoutDashboard,
    FileText,
    FolderKanban,
    Settings,
    LogOut
} from "lucide-react";

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();
    const [activeHash, setActiveHash] = useState("#hero");

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
        <aside
            className={`hidden lg:flex  fixed left-0 top-0 h-full border-r-4 border-black bg-white flex-col justify-between py-10 transition-all duration-500 z-50 overflow-hidden  w-[300px] px-8
                }`}
        >

            {/* Logo */}
            <div className="flex justify-center mb-16">

                <h1 className="text-5xl font-black text-black tracking-tight">
                    ADMIN <span className="text-secondary">PANEL</span>
                </h1>

            </div>

            {/* Navigation List */}
            <nav className="flex flex-col gap-y-1 mt-10 flex-1">
                {links.map((item, i) => (
                    <a
                        key={i}
                        href={item.href}
                        className={`px-6 py-3 gap-x-4 flex items-center text-lg font-bold tracking-wide transition-all ${activeHash === item.href
                            ? "bg-secondary text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                            : "text-black hover:bg-secondary hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:text-black"
                            }`}
                    >
                        <item.icon size={22} className="shrink-0" />
                        <span className="truncate">{item.name}</span>
                    </a>
                ))}
            </nav>
        </aside>
    );
}
