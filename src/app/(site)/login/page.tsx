"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/app/lib/hooks/useTranslation";
import Link from "next/link";
import { createClient } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";

const textVariants = {
    hidden: { opacity: 0, y: 25 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: "easeOut" as const },
    },
};

export default function LoginPage() {
    const { t } = useTranslation();
    const supabase = createClient();
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
        "idle"
    );
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        const { error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
        });

        if (error) {
            console.error("Auth error:", error.message);
            setStatus("error");
            setErrorMessage(t("login.authError"));
        } else {
            setStatus("success");
            router.push("/admin");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    return (
        <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center px-4 py-20">
            {/* === Header === */}
            <div className="relative max-w-3xl mx-auto text-center mb-12">
                <motion.h1
                    variants={textVariants}
                    initial="hidden"
                    animate="show"
                    className="text-[3rem] lg:text-[4.5rem] font-black leading-[0.95] tracking-tight text-black"
                    style={{ fontFamily: "serif" }}
                >
                    {t("login.title")}
                </motion.h1>

                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-40 h-2 bg-teal-600 mx-auto my-6 origin-center"
                />

                <motion.p
                    variants={textVariants}
                    initial="hidden"
                    animate="show"
                    transition={{ delay: 0.3 }}
                    className="text-gray-600 text-lg text-center max-w-md mx-auto"
                >
                    {t("login.description")}
                </motion.p>
            </div>

            {/* === Login Form === */}
            <motion.form
                variants={textVariants}
                initial="hidden"
                animate="show"
                transition={{ delay: 0.4 }}
                onSubmit={handleSubmit}
                className="w-full max-w-md space-y-6 bg-white p-8 border border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
                {/* Email */}
                <div className="relative group">
                    <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder=" "
                        className="w-full border border-gray-400 bg-transparent px-4 pt-6 pb-2 text-base text-black outline-none focus:border-teal-600 transition-all duration-300 peer"
                    />
                    <label
                        htmlFor="email"
                        className="absolute left-4 top-4 text-gray-500 text-sm transition-all duration-300 
            peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
            peer-focus:top-1 peer-focus:text-xs peer-focus:text-teal-600
            [:not(:placeholder-shown)]:top-1 [:not(:placeholder-shown)]:text-xs
            pointer-events-none bg-white px-1"
                    >
                        {t("login.email")}
                    </label>
                </div>

                {/* Password */}
                <div className="relative group">
                    <input
                        type="password"
                        id="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        placeholder=" "
                        className="w-full border border-gray-400 bg-transparent px-4 pt-6 pb-2 text-base text-black outline-none focus:border-teal-600 transition-all duration-300 peer"
                    />
                    <label
                        htmlFor="password"
                        className="absolute left-4 top-4 text-gray-500 text-sm transition-all duration-300 
            peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
            peer-focus:top-1 peer-focus:text-xs peer-focus:text-teal-600
            [:not(:placeholder-shown)]:top-1 [:not(:placeholder-shown)]:text-xs
            pointer-events-none bg-white px-1"
                    >
                        {t("login.password")}
                    </label>
                </div>

                {/* Forgot Password */}
                <div className="flex justify-end">
                    <button
                        type="button"
                        className="text-sm text-gray-600 hover:text-teal-600 transition-colors"
                    >
                        {t("login.forgotPassword")}
                    </button>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={status === "loading"}
                    className={`w-full py-4 font-black uppercase tracking-widest border-2 border-black transition-all duration-300 relative overflow-hidden group ${status === "loading"
                        ? "bg-gray-200 cursor-not-allowed text-gray-500"
                        : "bg-black text-white hover:bg-white hover:text-black"
                        }`}
                >
                    <span className="relative z-10">
                        {status === "loading" ? "..." : t("login.button")}
                    </span>
                </button>

                {/* Back to Home */}
                <div className="text-center pt-4">
                    <Link
                        href="/"
                        className="text-sm font-medium text-gray-500 hover:text-black transition-colors inline-flex items-center gap-2"
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                        {t("login.backToHome")}
                    </Link>
                </div>
            </motion.form>

            {/* Status Messages */}
            {status === "error" && (
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 font-bold mt-6"
                >
                    ❌ {errorMessage}
                </motion.p>
            )}
            {status === "success" && (
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-600 font-bold mt-6"
                >
                    ✅ Giriş Başarılı! Yönlendiriliyorsunuz...
                </motion.p>
            )}
        </div>
    );
}
