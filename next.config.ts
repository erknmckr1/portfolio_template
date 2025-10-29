import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",  // Next.js siteyi tamamen statik HTML olarak dışa aktarır.
  images: {
    unoptimized: true,  // <Image> bileşenleri optimize edilmeden direkt render edilir.
  },
};

export default nextConfig;
