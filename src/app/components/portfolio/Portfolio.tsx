"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/app/lib/hooks/useTranslation";
function Portfolio() {
  const { t } = useTranslation();
  type ProjectType =
    | "frontend"
    | "backend"
    | "fullstack"
    | "uiux"
    | "mobile"
    | "devops"
    | "ai"
    | "other";

  //  Type ve Status renkleri
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "design":
        return "bg-pink-500 text-white";
      case "development":
        return "bg-blue-500 text-white";
      case "branding":
        return "bg-yellow-400 text-black";
      case "illustration":
        return "bg-green-500 text-white";
      case "featured":
        return "bg-purple-500 text-white";
      case "finished":
        return "bg-gray-800 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  const getTypeColor = (type: ProjectType): string => {
    switch (type) {
      case "frontend":
        return "bg-blue-500 text-white";
      case "backend":
        return "bg-green-600 text-white";
      case "fullstack":
        return "bg-gradient-to-r from-blue-500 to-green-500 text-white";
      case "uiux":
        return "bg-pink-500 text-white";
      case "mobile":
        return "bg-purple-500 text-white";
      case "devops":
        return "bg-yellow-400 text-black";
      case "ai":
        return "bg-indigo-600 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  //  Varyantlar (GPU dostu)
  const textVariants = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const portfolioItems =
    t<
      {
        title: string;
        subtitle: string;
        image: string;
        type: string;
        status: string;
      }[]
    >("portfolio.projects");

  return (
    <section
      id="portfolio"
      className="max-w-7xl mx-auto py-20 flex flex-col justify-center items-center px-4"
    >
      {/* === Title === */}
      <div className="relative max-w-3xl text-center mb-20">
        <motion.h1
          variants={textVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-[3rem] lg:text-[4.5rem] font-black leading-[0.95] tracking-tight text-black"
          style={{ fontFamily: "serif" }}
        >
          {t("portfolio.title")}
        </motion.h1>

        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.1 }}
          className="w-52 h-1.5 bg-black mx-auto my-6"
        />

        <motion.p
          variants={textVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 text-center max-w-2xl mx-auto"
        >
          {t("portfolio.description")}
        </motion.p>

        <motion.button
          variants={textVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.35 }}
          className="py-4 px-8 uppercase mt-8 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold tracking-wide transition-all duration-500 shadow-md"
        >
          {t("portfolio.button")}
        </motion.button>
      </div>

      {/* === Portfolio Grid === */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="w-full grid grid-cols-1 sm:grid-cols-2 gap-12"
      >
        {portfolioItems.map((item, index) => (
          <motion.div key={index} variants={cardVariants}>
            <div className="group cursor-pointer relative">
              {/* Image */}
              <div className="overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[280px] lg:h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badge */}
                <div
                  className={`absolute uppercase top-4 left-4 px-4 py-1 rounded-md font-semibold text-sm border border-black shadow-md ${getTypeColor(
                    item.type as ProjectType
                  )}`}
                >
                  {item.type}
                </div>
                <div
                  className={`${getStatusColor(
                    item.status
                  )} absolute top-4 right-4 px-4 uppercase py-1 rounded-md font-semibold text-sm border border-black shadow-md`}
                >
                  {item.status}
                </div>
              </div>

              {/* Text */}
              <div className="text-center mt-4 space-y-2">
                <h4 className="relative inline-block font-bold text-xl text-black after:content-[''] after:absolute after:left-0 after:hover:text-yellow-400 after:-bottom-1 after:w-full after:h-0.5 after:bg-black">
                  {item.title}
                </h4>
                <p className="text-gray-600 mt-1 text-sm">{item.subtitle}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default Portfolio;
