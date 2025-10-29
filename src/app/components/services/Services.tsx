"use client";
import React from "react";
import ServiceCard from "./ServiceCard";
import { motion } from "framer-motion";
import { useTranslation } from "@/app/lib/hooks/useTranslation";
// 🔹 Parent (kart container) animasyonu
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.3,
    },
  },
};

// 🔹 Kart animasyonları
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

// 🔹 Başlık ve açıklama için sade, GPU-dostu animasyon
const textVariants = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut" as const,
    },
  },
};

function Services() {
  const { t } = useTranslation();
  const servicesData =
    t<
      {
        id: number;
        title: string;
        description: string;
        price: string;
        highlight: string[];
      }[]
    >("services.cards");
  return (
    <section
      id="services"
      className="max-w-7xl mx-auto py-20 flex flex-col justify-center items-center px-4"
    >
      {/* Başlık */}
      <div className="relative max-w-3xl text-center mb-20">
        <motion.h1
          variants={textVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-[3rem] lg:text-[4.5rem] font-black leading-[0.95] tracking-tight text-black"
          style={{ fontFamily: "serif" }}
        >
          {t("services.title")}
        </motion.h1>

        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.1 }}
          className="w-52 h-2 bg-black mx-auto my-6"
        />

        <motion.p
          variants={textVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 text-lg text-center max-w-2xl mx-auto"
        >
          {t("services.description")}
        </motion.p>
      </div>

      {/* Kart Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="space-y-16"
      >
        {servicesData.map((item) => (
          <motion.div key={item.id} variants={cardVariants}>
            <ServiceCard
              id={item.id}
              description={item.description}
              title={item.title}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default Services;
