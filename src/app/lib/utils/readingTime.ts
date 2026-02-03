export function calculateReadingTime(htmlContent: string): string {
    if (!htmlContent) return "1 dk'dan az";
    // HTML etiketlerini temizle
    const textContent = htmlContent.replace(/<[^>]*>/g, '');

    // Kelime sayısını hesapla
    const wordCount = textContent.trim().split(/\s+/).length;

    // Dakikada okunan kelime sayısı (Ortalama bir insan için)
    const wordsPerMinute = 200;

    // Süreyi hesapla
    const readingTime = Math.ceil(wordCount / wordsPerMinute);

    if (readingTime < 1) {
        return "1 dk'dan az";
    }

    return `${readingTime} dk okuma`;
}
