"use client";

import React, { useEffect } from "react";
import mermaid from "mermaid"

interface BlogContentViewerProps {
    htmlContent: string;
}

export default function BlogContentViewer({ htmlContent }: BlogContentViewerProps) {
    useEffect(() => {
        // Mermaid ayarlarını yap ve render et
        mermaid.initialize({
            startOnLoad: true,
            theme: "neutral",
            securityLevel: "loose",
            fontFamily: "inherit",
        });

        // İçerik değiştikçe veya sayfa yüklendiğinde mermaid'i tetikle
        mermaid.contentLoaded();
    }, [htmlContent]);

    return (
        <div
            className="prose prose-lg max-w-none 
                prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-headings:scroll-mt-24
                prose-h1:text-5xl prose-h2:text-3xl prose-h2:border-b-4 prose-h2:border-black prose-h2:pb-2
                prose-h3:text-xl prose-h3:border-b-2 prose-h3:border-black prose-h3:pb-1
                prose-p:font-medium prose-p:text-gray-800
                prose-strong:font-black prose-strong:text-black
                prose-code:bg-yellow-100 prose-code:px-1 prose-code:py-0.5 prose-code:border prose-code:border-black
                prose-pre:bg-black prose-pre:text-teal-400 prose-pre:border-4 prose-pre:border-black prose-pre:rounded-none prose-pre:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                prose-blockquote:border-l-8 prose-blockquote:border-black prose-blockquote:bg-gray-50 prose-blockquote:p-6 prose-blockquote:italic
                prose-img:border-4 prose-img:border-black prose-img:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                prose-ul:list-square prose-ol:list-decimal font-medium
                prose-table:border-4 prose-table:border-black prose-table:my-8
                prose-th:border-2 prose-th:border-black prose-th:bg-yellow-400 prose-th:p-4 prose-th:uppercase prose-th:font-black
                prose-td:border-2 prose-td:border-black prose-td:p-4 prose-td:font-medium"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    );
}
