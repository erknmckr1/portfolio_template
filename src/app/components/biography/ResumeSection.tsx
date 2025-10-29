"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/app/lib/hooks/useTranslation";
function ResumeSection() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<
    "experience" | "education" | "skills"
  >("experience");

  type ExperianceData = {
    company: string;
    period: string;
    title: string;
    description: string;
  };

  type EducationData = {
    school:string;
    period:string;
    title:string;
    description:string;
  }

   const skillsData = t<{ skill: string; percent: number }[]>(
    "resume.skills.items"
  );
  const experienceData = t<ExperianceData[]>("resume.experience");
  const educationData = t<EducationData[]>("resume.education")

  /*
  ! ? "text-black after:content-[''] after:absolute after:w-full  after:h-0.5 after:bg-black after:-bottom-1 after:left-0"
  Eğer bu tab aktifse, bu butonun sonuna (::after) görünmez bir içerik (content: '') ekle,
  ve bu pseudo-element’e (::after) bir genişlik, yükseklik, renk, pozisyon ver.”
  */

  return (
    <section className="w-full max-w-3xl mx-auto px-4 pt-16 text-black">
      {/* Tabs */}
      <div className="flex justify-center items-center gap-8 mb-12 border-b border-gray-300 pb-4">
        {["experience", "education", "skills"].map((tab) => (
          <button
            key={tab}
            onClick={() =>
              setActiveTab(tab as "experience" | "education" | "skills")
            }
            className={`uppercase font-bold text-lg tracking-wider relative transition-all duration-300 ease-in-out 
              ${
                activeTab === tab
                  ? "text-black after:content-[''] after:absolute after:w-full  after:h-0.5 after:bg-black after:-bottom-1 after:left-0"
                  : "text-gray-500 hover:text-black"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {/* Tab Content */}
      <div className="transition-all duration-500">
        <AnimatePresence mode="wait">
          {/* EXPERIENCE */}
          {activeTab === "experience" && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="space-y-10"
            >
              {experienceData.map((item, i) => (
                <div
                  key={i}
                  className="bg-gray-200 px-12 py-14 border border-gray-200"
                >
                  <p className="text-sm uppercase font-semibold tracking-wide text-black mb-1">
                    {item.company}{" "}
                    <span className="text-gray-600">({item.period})</span>
                  </p>
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              ))}
            </motion.div>
          )}

          {/* EDUCATION */}
          {activeTab === "education" && (
            <motion.div
              key="education"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="space-y-10"
            >
              {educationData.map((item, i) => (
                <div
                  key={i}
                  className="bg-gray-200 px-12 py-14 border border-gray-200"
                >
                  <p className="text-sm uppercase font-semibold tracking-wide text-gray-600 mb-1">
                    {item.school}{" "}
                    <span className="text-black">({item.period})</span>
                  </p>
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              ))}
            </motion.div>
          )}

          {/* SKILLS */}
          {activeTab === "skills" && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="space-y-8"
            >
              {skillsData.map((item, i) => (
                <div key={i} className="border-2 border-black p-3">
                  <div className="flex justify-between items-center font-semibold mb-2">
                    <span>{item.skill}</span>
                    <span>{item.percent}%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-5 relative">
                    <motion.div
                      className="bg-[#075A70] h-5 absolute top-0 left-0"
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percent}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-center text-gray-800 pt-8 leading-relaxed"
              >
               {t("resume.summary")}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default ResumeSection;
