"use client";
import React from "react";
import TitleArea from "../TitleArea";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslation } from "@/app/lib/hooks/useTranslation";
import { BlogPost } from "@/app/lib/supabase-posts";
function BlogWrapper({ blog }: { blog: BlogPost[] }) {
  const { t } = useTranslation();

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


  return (
    <div id="blog" className="max-w-7xl mx-auto py-24 px-4">
      {/* Başlık alanı */}
      <TitleArea title={t("blog.title")} description={t("blog.description")} />

      {/* Blog kart alanı */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="pt-20 space-y-10"
      >
        {blog.map((item) => (
          <motion.div
            variants={cardVariants}
            key={item.slug}
            className="flex  items-start gap-6 lg:gap-16"
          >
            {/* Görsel */}
            <div className="relative w-full lg:w-1/2 overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-gray-100">
              <img
                src={item.image_url || "/pic.avif"}
                alt={item.title}
                width={600}
                height={400}
                className="w-full h-[200px] lg:h-[420px] object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Metin içeriği */}
            <div className="flex flex-col justify-center space-y-6 lg:w-1/2">
              <h3

                className="sm:text-2xl lg:text-3xl font-semibold leading-snug text-black hover:text-yellow-500 transition-colors duration-300 cursor-pointer underline underline-offset-2"
                style={{ fontFamily: "serif" }}
              >
                {item.title}
              </h3>

              <p className="text-gray-500 font-black uppercase tracking-widest text-sm">
                {new Date(item.created_at).toLocaleDateString("tr-TR")}
              </p>

              <Link href={`/blog/${item.slug}`} className="lg:px-8 lg:py-3 text-sm p-2 lg:text-lg  bg-yellow-400 hover:bg-yellow-500 text-black font-semibold uppercase tracking-wide transition-colors duration-300 shadow-md w-fit">
                {t("blog.button")}
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.section>
    </div>
  );
}

export default BlogWrapper;
