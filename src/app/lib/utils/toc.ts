
export interface Heading {
    id: string;
    text: string;
    level: number;
}

export function extractHeadingsAndAddIds(html: string): { modifiedHtml: string; headings: Heading[] } {
    const headings: Heading[] = [];

    // Bu regex h1, h2, h3 etiketlerini bulur.
    const modifiedHtml = html.replace(/<(h[1-3])(.*?)>(.*?)<\/h[1-3]>/gi, (match, tag, attributes, content) => {
        // İçerik boşsa veya sadece html etiketleri varsa temizle
        const text = content.replace(/<[^>]*>?/gm, '').trim();
        if (!text) return match;

        const level = parseInt(tag.substring(1));
        const id = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');

        headings.push({ id, text, level });

        return `<${tag}${attributes} id="${id}">${content}</${tag}>`;
    });

    return { modifiedHtml, headings };
}
