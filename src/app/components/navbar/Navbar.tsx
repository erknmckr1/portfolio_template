"use client";
import React, { useState } from "react";
import { useTranslation } from "@/app/lib/hooks/useTranslation";
import {
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  ArrowLeft,
  ArrowRight,
  Home,
  User,
  Settings,
  Users,
  Newspaper,
  Mail,
  Menu,
  X,
  Globe,
} from "lucide-react";
import { toggleSidebar } from "@/app/lib/redux/slices/sidebar.slice";
import { setChangeLanguage } from "@/app/lib/redux/slices/language.slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/lib/redux/store";

function Navbar() {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: RootState) => state.sidebar);
  const { language } = useSelector((state: RootState) => state.language);
  const { t } = useTranslation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleChangeStatusNavbar = () => dispatch(toggleSidebar());
  const handleToggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  //  Language toggle handler
  const handleToggleLanguage = () => {
    const newLang = language === "en" ? "tr" : "en";
    dispatch(setChangeLanguage(newLang));
  };

  return (
    <>
      {/* === DESKTOP SIDEBAR === */}
      <aside
        className={`hidden fixed left-0 top-0 h-full border-r-[6px] border-black bg-white lg:flex flex-col justify-between py-26 transition-all duration-500 ease-in-out ${
          isOpen ? "w-[400px] px-8" : "w-[100px] px-0 py-0"
        }`}
      >
        {/* Toggle Button */}
        <button
          onClick={handleChangeStatusNavbar}
          className="absolute top-4 right-4 bg-black text-white p-2 hover:opacity-80 transition"
        >
          {isOpen ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-16">
          {isOpen && (
            <h1
              className="text-6xl text-black font-black tracking-tight"
              style={{ fontFamily: "Oswald, sans-serif" }}
            >
              <span className="inline-block border-b-[6px] border-black pb-1">
                {t("navbar.logo")}
              </span>
            </h1>
          )}
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-y-1 mt-10 space-y-0 flex-1">
          {[
            { name: t("navbar.home"), icon: Home, href: "#hero", active: true },
            { name: t("navbar.biography"), icon: User, href: "#biography" },
            { name: t("navbar.portfolio"), href: "#portfolio", icon: Settings },
            { name: t("navbar.services"), icon: Users, href: "#services" },
            { name: t("navbar.blog"), icon: Newspaper, href: "#blog" },
            { name: t("navbar.contact"), icon: Mail, href: "#contact" },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              className={`px-6 py-3 gap-x-4 text-center flex items-center text-xl font-bold tracking-wide transition-all duration-200 ${
                item.active
                  ? "bg-black text-white"
                  : "text-black hover:bg-black hover:text-white"
              }`}
            >
              <item.icon size={22} />
              {isOpen && <span>{item.name}</span>}
            </a>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="flex flex-col items-center space-y-6">
          <div className="w-full border-t-[5px] border-black" />

          {/* 🌐 Language Toggle */}
          {isOpen && (
            <button
              onClick={handleToggleLanguage}
              className="flex items-center gap-2 border-2 border-black px-4 py-2 font-semibold uppercase text-black hover:bg-black hover:text-white transition-all duration-300"
            >
              <Globe size={18} />
              {language === "en" ? "EN" : "TR"}
            </button>
          )}

          {isOpen && (
            <>
              <div className="flex justify-center space-x-3 pt-10">
                {[Twitter, Facebook, Instagram, Youtube].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="w-14 h-14 border-3 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all duration-200 cursor-pointer group"
                  >
                    <Icon
                      size={24}
                      strokeWidth={2}
                      className="text-black group-hover:text-white"
                    />
                  </a>
                ))}
              </div>
              <div className="text-center text-sm text-black leading-tight mt-4">
                <p>© 2025 Rewall Template</p>
                <p>Created by Frenify</p>
              </div>
            </>
          )}
        </div>
      </aside>

      {/* === MOBILE NAVBAR === */}
      <aside className="lg:hidden fixed top-0 left-0 w-full bg-black z-50 shadow-lg">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <h1
            className="text-2xl font-extrabold tracking-widest text-white"
            style={{ fontFamily: "Oswald, sans-serif" }}
          >
            <span className="border-b-4 border-white pb-1">
              {t("navbar.logo")}
            </span>
          </h1>

          <div className="flex items-center gap-4">
            {/*  Language Toggle */}
            <button
              onClick={handleToggleLanguage}
              className="flex items-center justify-center w-10 h-10 border-2 border-white rounded-full text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              <Globe size={18} />
              <span className="ml-1 text-sm font-semibold">
                {language === "en" ? "EN" : "TR"}
              </span>
            </button>

            {/* Menu Button */}
            <button
              onClick={handleToggleMobileMenu}
              className="text-white hover:opacity-80 transition"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>

        {/* Dropdown Menu */}
        <nav
          className={`absolute left-0 w-full flex flex-col gap-y-3 py-4 bg-white text-black shadow-xl overflow-hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-[800px] opacity-100 pointer-events-auto"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          {[
            { name: t("navbar.home"), icon: Home, href: "#hero", active: true },
            { name: t("navbar.biography"), icon: User, href: "#biography" },
            { name: t("navbar.portfolio"), href: "#portfolio", icon: Settings },
            { name: t("navbar.services"), icon: Users, href: "#services" },
            { name: t("navbar.blog"), icon: Newspaper, href: "#blog" },
            { name: t("navbar.contact"), icon: Mail, href: "#contact" },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-x-4 px-6 py-2 text-lg font-semibold transition-all duration-200 ${
                item.active
                  ? "bg-black text-white"
                  : "hover:bg-black hover:text-white"
              }`}
            >
              <item.icon size={22} />
              <span>{item.name}</span>
            </a>
          ))}

          {/* Socials */}
          <div className="flex justify-center space-x-4 border-t border-black pt-4 mt-4">
            {[Twitter, Facebook, Instagram, Youtube].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                aria-label="social"
                className="w-10 h-10 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all duration-200"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
}

export default Navbar;
