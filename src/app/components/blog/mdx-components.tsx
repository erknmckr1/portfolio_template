import React from "react";

// Bu dosya MDX tarafından oluşturulan HTML elementlerini
// Tailwind ile özelleştirmenizi sağlar.
// Kısaca: <h1>, <h2>, <p>, <pre>, <code> gibi elementlerin
// nasıl görünmesi gerektiğini burada tanımlıyoruz.

type NodeWithProps = {
  props: {
    children?: React.ReactNode;
  };
};

// MDX -> (bu haritayı kullanarak) -> React bileşenleri
// 1. Yardımcı Fonksiyon: React Children içinden saf metni çıkarır.
function getNodeText(node: React.ReactNode): string {
  // DURUM 1: Eğer gelen şey basit bir yazı veya sayıysa, direkt metne çevir ver.
  if (["string", "number"].includes(typeof node)) return node!.toString();

  // DURUM 2: Eğer gelen şey bir listeyse (yukarıdaki örnek gibi),
  // listenin her elemanı için bu fonksiyonu tekrar çağır (Recursive) ve birleştir.
  if (node instanceof Array) return node.map(getNodeText).join("");

  // DURUM 3: Eğer gelen şey bir HTML etiketiyse (örn: <em>Güzel</em>),
  // etiketin kabuğunu soy, içindeki 'children'a (metne) bak.
  if (typeof node === "object" && node && "props" in node)
    return getNodeText((node as NodeWithProps).props.children);

  // Hiçbiri değilse boş dön.
  return "";
}

// 2. Yardımcı Fonksiyon: Metni ID formatına çevirir (Slugify)
// DİKKAT: Burası get-post.ts içindeki mantıkla BİREBİR AYNI olmalı.
function createSlug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-"); // Sizin regex mantığınız
}

export const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-4xl font-bold tracking-tight mb-3" {...props} />
  ),

  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    // Elementin içindeki metni al
    const text = getNodeText(props.children);
    // ID oluştur
    const slug = createSlug(text);

    return (
      <h2
        id={slug} //
        className="text-2xl font-semibold mt-10 mb-4 scroll-mt-24" // scroll-mt-24: Header altında kalmasın diye
        {...props}
      />
    );
  },

  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = getNodeText(props.children);
    const slug = createSlug(text);

    return (
      <h3
        id={slug}
        className="text-xl font-semibold mt-8 mb-3 scroll-mt-24"
        {...props}
      />
    );
  },

  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-base leading-7 my-4 text-black/90" {...props} />
  ),

  ul: (props: React.HtmlHTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc pl-6 space-y-2 my-4" {...props} />
  ),

  ol: (props: React.HtmlHTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal pl-6 space-y-2 my-4" {...props} />
  ),

  li: (props: React.HtmlHTMLAttributes<HTMLLIElement>) => (
    <li className="text-black/90 leading-7" {...props} />
  ),

  code: (props: React.HtmlHTMLAttributes<HTMLElement>) => (
    <code
      className="rounded bg-red-200 px-1 py-0.5 text-sm font-mono"
      {...props}
    />
  ),

  pre: (props: React.HtmlHTMLAttributes<HTMLPreElement>) => (
    <pre
      className="my-6 overflow-x-auto rounded-lg border border-gray-400 bg-gray-200 p-4 text-sm font-mono leading-relaxed"
      {...props}
    />
  ),
};
