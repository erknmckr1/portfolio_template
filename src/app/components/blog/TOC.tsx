"use client";

import React, { useEffect, useState } from "react";
import { Heading } from "@/app/lib/utils/toc";

interface TOCProps {
    headings: Heading[];
}

export default function TOC({ headings }: TOCProps) {
    const [activeId, setActiveId] = useState("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "0% 0% -80% 0%" }
        );

        headings.forEach((heading) => {
            const element = document.getElementById(heading.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [headings]);

    // Aktif başlık değiştikçe TOC listesini otomatik kaydır (Sadece iç konteynırı kaydırır)
    useEffect(() => {
        if (activeId) {
            const activeLink = document.querySelector(`a[href="#${activeId}"]`) as HTMLElement;
            const container = document.querySelector('.custom-scrollbar') as HTMLElement;

            if (activeLink && container) {
                // Linkin konteynır içindeki göreceli konumunu hesapla
                const relativeTop = activeLink.offsetTop;
                const containerHeight = container.offsetHeight;
                const linkHeight = activeLink.offsetHeight;

                container.scrollTo({
                    top: relativeTop - (containerHeight / 2) + (linkHeight / 2),
                    behavior: "smooth",
                });
            }
        }
    }, [activeId]);

    if (headings.length === 0) return null;

    return (
        <nav className="hidden xl:block sticky top-24 w-64 ml-20 shrink-0 max-h-[calc(100vh-120px)] flex flex-col">
            <div className="border-4 border-black p-6 bg-yellow-400 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col min-h-0">
                <h3 className="text-xl font-black uppercase tracking-tighter mb-4 border-b-4 border-black pb-2 shrink-0">
                    İçindekiler
                </h3>
                <ul className="space-y-3 overflow-y-auto pr-2 custom-scrollbar">
                    {headings.map((heading) => (
                        <li
                            key={heading.id}
                            style={{ marginLeft: `${(heading.level - 1) * 16}px` }}
                        >
                            <a
                                href={`#${heading.id}`}
                                className={`text-sm font-black uppercase tracking-widest transition-all inline-block ${activeId === heading.id
                                    ? "text-black underline underline-offset-4 decoration-4 translate-x-2"
                                    : "text-gray-800 opacity-60 hover:opacity-100 hover:translate-x-1"
                                    }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById(heading.id)?.scrollIntoView({
                                        behavior: "smooth",
                                    });
                                }}
                            >
                                {heading.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
