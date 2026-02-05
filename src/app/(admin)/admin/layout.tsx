"use client";

import React, { useState } from "react";
import AdminSidebar from "@/app/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-gray-50 flex text-black">
            <AdminSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

            <main className={`p-4 flex-1 min-w-0 transition-all duration-500 ease-in-out ${isSidebarOpen ? "lg:ml-[300px]" : "lg:ml-[90px]"
                } pt-20 lg:pt-4`}>
                {children}
            </main>
        </div>
    );
}
