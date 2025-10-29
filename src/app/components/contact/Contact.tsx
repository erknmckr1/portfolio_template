"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/app/lib/hooks/useTranslation";
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
function Contact() {
  const {t} = useTranslation();
  return (
    <section
      id="contact"
      className="max-w-7xl mx-auto py-20 flex flex-col justify-center items-center px-4"
    >
      {/* Başlık */}
      <div className="relative max-w-3xl mx-auto text-center ">
        <motion.h1
          variants={textVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-[3rem] lg:text-[4.5rem] font-black leading-[0.95] tracking-tight text-black"
          style={{ fontFamily: "serif" }}
        >
         {t("contact.title")}
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
          {t("contact.description")}
        </motion.p>
      </div>
      {/* contact form */}
      <form className="w-full max-w-2xl mx-auto mt-10 space-y-6">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
          {/* Name */}
          <div className="relative group">
            <input
              type="text"
              id="name"
              className="w-full border border-gray-400 bg-transparent px-4 pt-6 pb-2 text-base text-black outline-none focus:border-yellow-400 transition-all duration-300"
            />
            <span
              className="absolute left-4 top-4 text-gray-500 text-sm transition-all duration-300 
            group-focus-within:-translate-y-3 group-focus-within:text-xs group-focus-within:text-yellow-500
            pointer-events-none bg-white px-1"
            >
             {t("contact.form.name")}
            </span>
          </div>

          {/* Email */}
          <div className="relative group">
            <input
              type="email"
              id="email"
              className="w-full border border-gray-400 bg-transparent px-4 pt-6 pb-2 text-base text-black outline-none focus:border-yellow-400 transition-all duration-300"
            />
            <span
              className="absolute left-4 top-4 text-gray-500 text-sm transition-all duration-300 
            group-focus-within:-translate-y-3 group-focus-within:text-xs group-focus-within:text-yellow-500
            pointer-events-none bg-white px-1"
            >
             {t("contact.form.email")}
            </span>
          </div>
        </div>

        {/* Phone */}
        <div className="relative group">
          <input
            type="text"
            id="phone"
            className="w-full border border-gray-400 bg-transparent px-4 pt-6 pb-2 text-base text-black outline-none focus:border-yellow-400 transition-all duration-300"
          />
          <span
            className="absolute left-4 top-4 text-gray-500 text-sm transition-all duration-300 
          group-focus-within:-translate-y-3 group-focus-within:text-xs group-focus-within:text-yellow-500
          pointer-events-none bg-white px-1"
          >
            {t("contact.form.phone")}
          </span>
        </div>

        {/* Message */}
        <div className="relative group">
          <textarea
            id="message"
            rows={4}
            className="w-full border border-gray-400 bg-transparent px-4 pt-6 pb-2 text-base text-black outline-none focus:border-yellow-400 transition-all duration-300 resize-none"
          />
          <span
            className="absolute left-4 top-4 text-gray-500 text-sm transition-all duration-300 
          group-focus-within:-translate-y-3 group-focus-within:text-xs group-focus-within:text-yellow-500
          pointer-events-none bg-white px-1"
          >
             {t("contact.form.message")}
          </span>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 py-4 font-semibold uppercase tracking-wide transition-colors duration-300"
        >
           {t("contact.form.button")}
        </button>
      </form>
      {/* address */}
      <div className=" text-center space-y-6 py-10 uppercase">
        <div className="space-y-2">
          <p className="text-gray-600 text-xs"> {t("contact.addressSection.addressLabel")}</p>
          <p className="text-xl text-black font-semibold">{t("contact.addressSection.addressValue")}</p>
        </div>
        <div className="space-y-2">
          <p className="text-xs uppercase text-gray-600">{t("contact.addressSection.phoneLabel")}</p>
          <p className="text-xl font-semibold uppercase text-black">
           {t("contact.addressSection.phoneValue")}
          </p>
        </div>
        <p className="lowercase relative after:content-[''] after:h-0.5 after:bg-yellow-400 after:w-full after:absolute after:bottom-0 after:left-0 after:hover:bg-green-400 transition-all duration-500 ">
          {t("contact.addressSection.email")}
        </p>
      </div>
    </section>
  );
}

export default Contact;
