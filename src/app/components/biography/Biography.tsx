"use client";
import React from "react";
import DownloadCV from "./Download";
import ResumeSection from "./ResumeSection";
import { motion } from "framer-motion";
import { useTranslation } from "@/app/lib/hooks/useTranslation";
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, filter: "blur(6px)" },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

// 🪄 Başlık & Açıklama animasyonları (sadece opacity + translate)
const textVariants = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

function Biography() {
const {t} = useTranslation()
type InfoItem = { label: string; value: string };
const infoData = t<InfoItem[]>("biography.infoData");

  return (
    <section id="biography" className="min-h-screen max-w-6xl mx-auto py-24 px-4">
      {/* Başlık */}
      <div className="text-center mb-16">
        <motion.h1
          variants={textVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-5xl lg:text-7xl font-black tracking-tight"
          style={{ fontFamily: "serif" }}
        >
         {t("biography.title")}
        </motion.h1>

        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.15 }}
          className="w-52 h-2 bg-black mx-auto my-6"
        />

        <motion.p
          variants={textVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.25 }}
          className="text-base lg:text-lg text-gray-800 max-w-3xl mx-auto leading-relaxed"
        >
         {t("biography.description")}
        </motion.p>
      </div>

      {/* Kartlar */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="flex flex-wrap justify-center gap-6 py-6 lg:py-12"
      >
        {infoData.map((item, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            className="border-4 border-black px-6 py-3 min-w-[250px] text-lg bg-gray-50 text-black font-medium hover:bg-black hover:text-white transition-all duration-500"
          >
            <span>{item.label}: </span>
            <span className="font-bold">{item.value}</span>
          </motion.div>
        ))}
      </motion.div>

      <DownloadCV />
      <ResumeSection />
    </section>
  );
}

export default Biography;
