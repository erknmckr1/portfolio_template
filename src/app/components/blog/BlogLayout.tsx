// components/blog/BlogLayout.tsx
"use client";

import React from "react";

type BlogLayoutProps = {
  title: string;
  description?: string;
  date: string;
  readingTime?: string;
  views?: number;
  children: React.ReactNode;
};

export function BlogLayout({
  title,
  description,
  date,
  readingTime,
  views,
  children,
}: BlogLayoutProps) {
  return (
    <div className="w-full flex justify-center">
      {/* Ana container */}
      <div className="w-full max-w-[1200px] px-6 mt-16 flex gap-10">
        {/* SOL: (ileride TOC için kullanacağız) */}
        <aside className="hidden lg:block w-[220px]">
          {/* Şimdilik boş, sonra dolduracağız */}
        </aside>

        {/* ORTA: Ana içerik */}
        <main className="flex-1 max-w-[720px]">
          {/* Başlık & meta */}
          <header className="mb-10 border-b border-black/10 pb-6">
            <p className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-3">
              Blog Yazısı
            </p>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-3">
              {title}
            </h1>

            {description && (
              <p className="text-gray-600 text-base md:text-lg max-w-[620px]">
                {description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-4">
              <span>{date}</span>
              {readingTime && (
                <>
                  <span>•</span>
                  <span>{readingTime}</span>
                </>
              )}
              {views !== undefined && (
                <>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    <span>👁️</span>
                    <span>{views.toLocaleString("tr-TR")}</span>
                  </span>
                </>
              )}
            </div>
          </header>

          {/* İçerik */}
          <article className="prose prose-lg max-w-none prose-headings:font-semibold prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded-sm prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200">
            {children}
          </article>
        </main>

        {/* SAĞ: Meta alan (ileride paylaşım / tags vs.) */}
        <aside className="hidden xl:block w-[180px] text-sm text-gray-500 pt-2">
          {/* Şimdilik çok basit bırakıyoruz */}
          <div className="border-l border-black/10 pl-4 space-y-4 sticky top-24">
            <div>
              <p className="font-semibold mb-1 text-black">Hakkında</p>
              <p>
                Intersection Observer, modern web’de görünürlük takibi için
                kullandığımız performanslı bir API.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
