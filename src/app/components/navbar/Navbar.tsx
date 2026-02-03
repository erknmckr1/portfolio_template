"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/app/lib/hooks/useTranslation";
import {
  Twitter,
  Instagram,
  GithubIcon,
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
  LinkedinIcon,
} from "lucide-react";
import { toggleSidebar } from "@/app/lib/redux/slices/sidebar.slice";
import { setChangeLanguage } from "@/app/lib/redux/slices/language.slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/lib/redux/store";

/* -------------------------------
   Navigation Links (Single Source)
-------------------------------- */
type TranslateFn = (key: string) => string;
const NAV_LINKS = (t: TranslateFn) => [
  { name: t("navbar.home"), icon: Home, href: "/#hero" },
  { name: t("navbar.biography"), icon: User, href: "/#biography" },
  { name: t("navbar.portfolio"), icon: Settings, href: "/#portfolio" },
  { name: t("navbar.services"), icon: Users, href: "/#services" },
  { name: t("navbar.blog"), icon: Newspaper, href: "/#blog" },
  { name: t("navbar.contact"), icon: Mail, href: "/#contact" },
];

function Navbar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: RootState) => state.sidebar);
  const { language } = useSelector((state: RootState) => state.language);
  const { t } = useTranslation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#hero");


  /* -------------------------------
     Sidebar Toggle
  -------------------------------- */
  const handleSidebarToggle = () => dispatch(toggleSidebar());

  /* -------------------------------
     Mobile Menu Toggle
  -------------------------------- */
  const handleMobileToggle = () => setIsMobileMenuOpen((prev) => !prev);

  /* -------------------------------
     Language Toggle
  -------------------------------- */
  const handleToggleLanguage = () => {
    const newLang = language === "en" ? "tr" : "en";
    dispatch(setChangeLanguage(newLang));
    localStorage.setItem("preffereLanguage", newLang);
  };

  /* -------------------------------
     Detect Current Hash Section
  -------------------------------- */
  useEffect(() => {
    const updateHash = () => setActiveHash(window.location.hash || "#hero");
    window.addEventListener("hashchange", updateHash);
    updateHash();
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  /* -------------------------------
     Load Saved Language
  -------------------------------- */
  useEffect(() => {
    const saved = localStorage.getItem("preffereLanguage");
    if (saved && saved !== language) dispatch(setChangeLanguage(saved));
  }, [dispatch, language]);

  if (pathname === "/login" || pathname === "/admin") return null;

  /* -------------------------------
     Social Links
  -------------------------------- */
  const socialLinks = [
    { name: "Github", href: "https://github.com/erknmckr1", icon: GithubIcon },
    {
      name: "Linkedin",
      href: "https://linkedin.com/in/erkan-mustafa-cakır",
      icon: LinkedinIcon,
    },
    { name: "Twitter", href: "https://x.com/erknmckr", icon: Twitter },
    {
      name: "Instagram",
      href: "https://instagram.com/erknmckr1",
      icon: Instagram,
    },
  ];

  return (
    <>
      {/* ===============================
          DESKTOP SIDEBAR
      ================================ */}
      <aside
        className={`hidden lg:flex font-signature fixed left-0 top-0 h-full border-r-4 border-black bg-white flex-col justify-between py-10 transition-all duration-500 z-50 overflow-hidden ${isOpen ? "w-[360px] px-8" : "w-[100px] px-4"
          }`}
      >
        {/* Sidebar Toggle */}
        <button
          onClick={handleSidebarToggle}
          className="absolute top-4 right-4 bg-black text-white p-2 hover:opacity-80 transition"
        >
          {isOpen ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-16">
          {isOpen && (
            <h1 className="text-5xl font-black text-black tracking-tight">
              <span className="border-b-[6px] border-black pb-1">
                {t("navbar.logo")}
              </span>
            </h1>
          )}
        </div>

        {/* Navigation List */}
        <nav className="flex flex-col gap-y-1 mt-10 flex-1">
          {NAV_LINKS(t).map((item, i) => (
            <a
              key={i}
              href={item.href}
              className={`px-6 py-3 gap-x-4 flex items-center text-lg font-bold tracking-wide transition-all ${activeHash === item.href.replace("/", "")
                ? "bg-secondary text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                : "text-black hover:bg-secondary hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:text-black"
                }`}
            >
              <item.icon size={22} className="shrink-0" />
              {isOpen && <span className="truncate">{item.name}</span>}
            </a>
          ))}
        </nav>

        {/* Footer Section */}
        <div className="flex flex-col items-center space-y-6">
          <div className="w-full border-t-[5px] border-black" />

          {/* Language Button */}
          <button
            onClick={handleToggleLanguage}
            className={`flex items-center justify-center border-2 border-black font-semibold uppercase transition-all 
            ${isOpen
                ? "px-4 py-2 text-black hover:bg-black hover:text-white"
                : "w-10 h-10 bg-black text-white"
              }`}
          >
            <Globe size={18} />
            {isOpen && <span className="ml-2">{language.toUpperCase()}</span>}
          </button>

          {/* Social Icons */}
          <div
            className={`flex justify-center ${isOpen ? "space-x-3 pt-10" : "flex-col space-y-3 pt-4"
              }`}
          >
            {socialLinks.map(({ name, href, icon: Icon }) => (
              <a
                key={name}
                href={href}
                aria-label={name}
                className={`border-2 bg-black border-black flex items-center justify-center hover:bg-white hover:text-black transition
                ${isOpen ? "w-14 h-14" : "w-10 h-10"}`}
              >
                <Icon size={isOpen ? 24 : 18} />
              </a>
            ))}
          </div>
        </div>
      </aside>

      {/* ===============================
          MOBILE NAVBAR
      ================================ */}
      <nav className="lg:hidden font-signature fixed top-0 left-0 w-full bg-black z-[100] border-b-4 border-black shadow-lg">
        <div className="flex items-center justify-between px-6 py-4 h-20">
          <h1 className="text-2xl font-black tracking-widest text-white uppercase">
            <span className="border-b-4 border-white pb-1">
              {t("navbar.logo").split('.')[0]}
            </span>
          </h1>

          <div className="flex items-center gap-4">
            <button
              onClick={handleToggleLanguage}
              className="flex items-center justify-center h-10 px-3 text-white border-2 border-white font-bold hover:bg-white hover:text-black transition uppercase text-xs"
            >
              <Globe size={18} />
              <span className="ml-1">
                {language.toUpperCase()}
              </span>
            </button>

            <button
              onClick={handleMobileToggle}
              className="text-white hover:opacity-80 transition"
            >
              {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`absolute left-0 w-full bg-white text-black border-b-4 border-black shadow-2xl transition-all duration-500 overflow-hidden ${isMobileMenuOpen
            ? "max-h-[85vh] opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
            }`}
        >
          <div className="flex flex-col p-6 space-y-2">
            {NAV_LINKS(t).map((item, i) => (
              <a
                key={i}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-x-4 px-6 py-4 text-xl font-black uppercase tracking-tighter border-2 border-transparent transition ${activeHash === item.href.replace("/", "")
                  ? "bg-black text-white border-black"
                  : "hover:border-black"
                  }`}
              >
                <item.icon size={24} />
                {item.name}
              </a>
            ))}

            {/* Socials */}
            <div className="flex justify-center flex-wrap gap-4 border-t-4 border-black pt-8 mt-6">
              {socialLinks.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  className="w-14 h-14 bg-black text-white flex items-center justify-center hover:bg-white hover:text-black hover:border-black border-2 border-transparent transition"
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
