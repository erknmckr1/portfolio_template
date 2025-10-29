import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "./lib/redux/ReduxProvider";
import ClientLayout from "./lib/redux/ClientLayout";
import Navbar from "./components/navbar/Navbar";
export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personel Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen overflow-x-hidden w-screen flex-1 ">
        <ReduxProvider>
          <Navbar />
          {/* Sağ içerik alanı */}
          <ClientLayout>{children}</ClientLayout>
        </ReduxProvider>
      </body>
    </html>
  );
}
