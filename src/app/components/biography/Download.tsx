import React from "react";
import { useSelector } from "react-redux";
import { Download } from "lucide-react";
import { RootState } from "@/app/lib/redux/store";
import Link from "next/link";
function DownloadCV() {
  const { language } = useSelector((state: RootState) => state.language);
  const cvFile =
    language === "tr"
      ? "/cv/Erkan_Mustafa_Cakir_Frontend_CV.pdf"
      : "/cv/Erkan_Mustafa_Cakir_Frontend_CV_EN.pdf";

  return (
    <section className="flex flex-col items-center justify-center py-16 lg:py-30 bg-white text-black relative overflow-hidden">
      {/* Üst Dekoratif Çizgiler */}
      <div className="flex flex-col items-center space-y-2 mb-10">
        <div className="flex space-x-2">
          <div className="w-0.5 h-6 bg-black -rotate-1"></div>
          <div className="w-0.5 h-10 bg-black"></div>
          <div className="w-0.5 h-6 bg-black -rotate-[-10deg]"></div>
        </div>
      </div>

      {/* Ana Buton */}
      <div
        className="group relative overflow-hidden px-16 py-14 rounded-lg bg-linear-to-br from-[#066a80] to-[#044653]000
  text-white shadow-[0_10px_20px_rgba(0,0,0,0.25)]
  transition-all duration-500 "
      >
        <Link
          href={cvFile}
          download
          className="flex flex-col items-center justify-center"
        >
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent_70%)] transition-all duration-500 group-hover:opacity-50" />
          <Download
            size={48}
            className="z-10 mb-4 transition-transform duration-300 group-hover:scale-110"
          />
          <span className="z-10 text-lg font-bold tracking-[0.05em] transition-all duration-300 group-hover:text-white">
            DOWNLOAD CV
          </span>
          <div className="absolute inset-0 backdrop-blur-[1px] bg-white/5 pointer-events-none rounded-lg"></div>
        </Link>
      </div>

      {/* Alt Dekoratif Çizgiler */}
      <div className="flex flex-col items-center space-y-2 mt-10">
        <div className="flex space-x-2">
          <div className="w-0.5 h-6 bg-black rotate-1"></div>
          <div className="w-0.5 h-10 bg-black"></div>
          <div className="w-0.5 h-6 bg-black rotate-[-10deg]"></div>
        </div>
      </div>

      {/* Hafif Arka Plan Efekti */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#0c738a]/10 rounded-full blur-3xl"></div>
    </section>
  );
}

export default DownloadCV;
