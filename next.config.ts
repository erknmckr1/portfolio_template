import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // Railway gibi ortamlarda Node server olarak çalışması için
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // İstersen bunu belirli domainlerle sınırlandırabilirsin
      },
    ],
  },
};

export default nextConfig;
