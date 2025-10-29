import React from "react";
import { motion } from "framer-motion";
type TitleProp = {
  title: string;
  description: string;
};
function TitleArea({ description, title }: TitleProp) {
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
  return (
    <div className="relative max-w-3xl mx-auto text-center ">
      <motion.h1
        variants={textVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="text-[3rem] lg:text-[4.5rem] font-black leading-[0.95] tracking-tight text-black"
        style={{ fontFamily: "serif" }}
      >
       {title}
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
        {description}
      </motion.p>
    </div>
  );
}

export default TitleArea;
