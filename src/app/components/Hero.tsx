"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "../lib/hooks/useTranslation";
// 👆 senin dosya yapına göre path değişebilir

function Hero() {
  const { t } = useTranslation();

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 40 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" as const },
    },
  };

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  // 🪄 Harf animasyonu
  const wordContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };

  const charItem = {
    hidden: { opacity: 0, y: -40, rotateX: 90 },
    show: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  // 🔸 JSON'dan gelen title'ı harf harf bölüyoruz
  const renderWord = (word: string) => (
    <motion.span variants={wordContainer} className="block overflow-hidden" key={word}>
      {word.split("").map((char, i) => (
        <motion.span key={i} variants={charItem} className="inline-block mr-0.5">
          {char}
        </motion.span>
      ))}
    </motion.span>
  );

  return (
    <section
      id="hero"
      className="min-h-screen mt-[72px] lg:mt-0 flex items-center justify-center bg-white px-4 lg:px-16 overflow-hidden"
    >
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/*  Sol Görsel */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="relative w-full max-w-[600px] mx-auto lg:mx-0 mt-8 lg:mt-0"
        >
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.4 }}
            className="absolute -left-8 top-[15%] w-[660px] h-[70%] bg-teal-600 z-0"
          ></motion.div>

          <div className="relative bg-white border border-black shadow-xl">
            <div className="bg-white border-12 p-6 border-black">
              <motion.img
                src={t("hero.image")} // 🔹 artık JSON’dan
                alt={t("hero.alt")}
                className="w-full h-[400px] lg:h-[600px] object-cover"
                variants={imageVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Sağ Bilgi Alanı */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="space-y-4 lg:space-y-6 max-w-xl px-4 lg:px-0"
        >
          <h1
            className="text-[3rem] lg:text-[4.5rem] font-black leading-[0.95] tracking-tight"
            style={{ fontFamily: "serif" }}
          >
            {renderWord(t("hero.title1"))}
            <motion.span variants={textVariants} className="block mt-1">
              {t("hero.title2")}
            </motion.span>
          </h1>

          <motion.div
            variants={textVariants}
            transition={{ delay: 0.4 }}
            className="w-1/2 h-4 lg:h-6 bg-black mt-4 lg:mt-6 mb-6 lg:mb-8"
          ></motion.div>

          <motion.p
            variants={textVariants}
            transition={{ delay: 0.5 }}
            className="text-base lg:text-lg leading-relaxed text-gray-800"
          >
            {t("hero.description")}
          </motion.p>

          <motion.div
            variants={textVariants}
            transition={{ delay: 0.6 }}
            className="pt-6 lg:pt-8"
          >
            <p className="text-3xl lg:text-4xl" style={{ fontFamily: "Brush Script MT, cursive" }}>
              {t("hero.signature")}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
