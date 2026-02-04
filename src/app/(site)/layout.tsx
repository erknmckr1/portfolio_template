import type { Metadata } from "next";
import "../globals.css";
import { ReduxProvider } from "../lib/redux/ReduxProvider";
import ClientLayout from "../lib/redux/ClientLayout";
import Navbar from "../components/navbar/Navbar";
import ScrollToTop from "../components/ScrollToTop";
export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personel Website",
};

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <Navbar />
      {/* Sağ içerik alanı */}
      <ClientLayout>{children}</ClientLayout>
      <ScrollToTop />
    </ReduxProvider>
  );
}
