"use client";
import { useEffect, useState } from "react";
import React from "react";
import { BlogHeading } from "@/app/lib/get-post";

export default function TOC({ headings }: { headings: BlogHeading[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "0px 0px -70% 0px",
        threshold: 0,
      }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) intersectionObserver.observe(el);
    });

    return () => intersectionObserver.disconnect();
  }, [headings]);

    const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  
  return (
    <aside className="space-y-2 text-sm text-gray-600">
      {headings.map((h) => (
        <button
          key={h.id}
          onClick={() => handleClick(h.id)}
          className={`block text-left text-xs hover:scale-105 cursor-pointer w-full transition ${
            h.level === 2 ? "font-semibold" : "pl-4"
          } ${
            activeId === h.id
              ? "text-black font-bold border-r-2 border-black"
              : "text-gray-600"
          }`}
        >
          {h.text}
        </button>
      ))}
    </aside>
  );
}
