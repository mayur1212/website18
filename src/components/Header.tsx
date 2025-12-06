"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "@/assets/logored.png";
import ProfileLoginModal from "@/components/ProfileLogin";
import ProfileDrawer from "@/components/ProfileDrawer";
import LocationModal from "@/components/LocationModal";

const NAV_ITEMS = [
  { label: "For you", href: "/" },
  { label: "Dining", href: "/dining" },
  { label: "Events", href: "/events" },
  { label: "Movies", href: "/movies" },
  { label: "Activities", href: "/Activities" },
  { label: "Play", href: "/play" },
  { label: "Stores", href: "/stores" },
];

// Small icon helper - only used in mobile compact nav
function NavIcon({ label, active }: { label: string; active: boolean }) {
  const base = `h-5 w-5 ${active ? "text-black" : "text-zinc-800"}`;

  switch (label) {
    case "For you":
      return (
        <svg viewBox="0 0 24 24" className={base} fill="none">
          <path d="M7 4l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 6l.5 1 .9.5-.9.5L16 9l-.5-1-.9-.5.9-.5L16 6z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15 14l1.2 2.5L19 18l-2.8 1.5L15 22l-1.2-2.5L11 18l2.8-1.5L15 14z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "Dining":
      return (
        <svg viewBox="0 0 24 24" className={base} fill="none">
          <path d="M7 3v8M9 3v8M7 7h2M17 3v9m-3-6h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "Events":
      return (
        <svg viewBox="0 0 24 24" className={base} fill="none">
          <path d="M5 7l9-4 3 13-4-3-3 4L5 7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="10" cy="9" r="1" fill="currentColor" />
        </svg>
      );
    case "Movies":
      return (
        <svg viewBox="0 0 24 24" className={base} fill="none">
          <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 6v2M12 6v2M16 6v2M8 16v2M12 16v2M16 16v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "Activities":
      return (
        <svg viewBox="0 0 24 24" className={base} fill="none">
          <path d="M12 4v2.2M12 17.8V20M6.3 6.3l1.6 1.6M16.1 16.1l1.6 1.6M4 12h2.2M17.8 12H20M6.3 17.7l1.6-1.6M16.1 7.9l1.6-1.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={base} fill="none">
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
  }
}

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState<"EN" | "AR">("EN");

  // login/drawer/modal states (used)
  const [openLogin, setOpenLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  // location modal state
  const [openLocation, setOpenLocation] = useState(false);
  const [location, setLocation] = useState<{ city: string; country: string }>({ city: "Gurugram", country: "India" });

  useEffect(() => {
    // persist login state if available
    const saved = typeof window !== "undefined" ? localStorage.getItem("logged_in") : null;
    if (saved === "true") setIsLoggedIn(true);

    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isItemActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleLoginSuccess = () => {
    if (typeof window !== "undefined") localStorage.setItem("logged_in", "true");
    setIsLoggedIn(true);
    setOpenDrawer(true);
    setOpenLogin(false);
  };

  return (
    <header className="w-full border-b border-zinc-100 bg-white">
      {/* ===== MOBILE / TABLET ===== */}
      <div className="md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpenLocation(true)}
              className="flex items-center gap-2 rounded-full px-2 py-1 transition hover:bg-zinc-50"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-purple-400/70 bg-purple-50">
                <svg className="h-3.5 w-3.5 text-purple-500" viewBox="0 0 24 24" fill="none">
                  <path d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10z" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="12" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </span>

              <span className="flex flex-col leading-tight text-left">
                <span className="text-sm font-semibold text-zinc-900">{location.city}</span>
                <span className="text-xs text-zinc-500">{location.country}</span>
              </span>
            </button>

            <div className="flex items-center rounded-full border border-zinc-200 bg-zinc-50 text-[11px] font-semibold text-zinc-700 shadow-sm ml-2">
              {(["EN", "AR"] as const).map((code) => {
                const isActive = language === code;
                return (
                  <button
                    key={code}
                    onClick={() => setLanguage(code)}
                    className={[ "px-2.5 py-1 transition-all", isActive ? "rounded-full bg-[#9810fa] text-white shadow-md" : "text-zinc-700 hover:text-[#9810fa]" ].join(" ")}
                  >
                    {code}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => (isLoggedIn ? setOpenDrawer(true) : setOpenLogin(true))}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white font-semibold shadow-sm"
          >
            U
          </button>
        </div>

        {/* sticky search + icon nav */}
        <div className={`sticky top-0 z-30 border-t border-b border-zinc-100 bg-white/95 backdrop-blur ${isScrolled ? "shadow-sm" : ""}`}>
          <div className="flex flex-col gap-3 px-4 py-3">
            <button className="flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-2 text-left text-sm text-zinc-500 shadow-sm">
              <svg className="h-4 w-4 text-purple-600" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="5.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="m15.5 15.5 3.5 3.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span>Search for events, movies and restaurants</span>
            </button>

            <nav className="mt-1 flex gap-2 overflow-x-auto pb-1 text-sm font-medium no-scrollbar">
              {NAV_ITEMS.map(({ label, href }) => {
                const active = isItemActive(href);
                return (
                  <Link
                    key={label}
                    href={href}
                    className={[
                      "flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-1.5 transition-all duration-300",
                      active ? "bg-purple-600 text-white shadow-md scale-105" : "text-zinc-900 hover:bg-purple-100 hover:text-purple-700 hover:shadow-sm hover:scale-105",
                      label === "For you" && !active ? "hover:bg-transparent hover:text-purple-700 hover:shadow-none hover:scale-100" : "",
                    ].join(" ")}
                  >
                    {!isScrolled && <NavIcon label={label} active={active} />}
                    <span className="text-sm">{label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* ===== DESKTOP ===== */}
      <div className="hidden w-full items-center justify-between px-8 py-1.5 md:flex">
        <div className="flex items-center gap-7">
          <Link href="/" className="cursor-pointer">
            <Image src={Logo} alt="Logo" width={110} height={32} className="object-contain" />
          </Link>

          <span className="h-8 w-px bg-zinc-200" />

          <button onClick={() => setOpenLocation(true)} className="flex items-center gap-3 px-3 py-2 border border-zinc-200 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-50 border border-purple-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5a3 3 0 100 6 3 3 0 000-6z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 10.5c0 5.25-6 10-6 10s-6-4.75-6-10a6 6 0 1112 0z" />
              </svg>
            </span>

            <span className="flex flex-col leading-tight">
              <span className="text-[15px] font-semibold text-black">{location.city}</span>
              <span className="text-[12px] text-zinc-500 -mt-0.5">{location.country}</span>
            </span>

            <svg className="h-4 w-4 text-zinc-500 ml-2" viewBox="0 0 20 20" fill="none">
              <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className="hidden items-center gap-4 text-sm font-medium text-zinc-700 md:flex">
          {NAV_ITEMS.map(({ label, href }) => {
            const active = isItemActive(href);
            return (
              <Link
                key={label}
                href={href}
                className={[
                  "rounded-full px-4 py-1.5 transition-all duration-300",
                  active ? "bg-purple-600 text-white shadow-md scale-105" : "text-zinc-900 hover:bg-purple-100 hover:text-purple-700 hover:shadow-sm hover:scale-105",
                  label === "For you" && !active ? "hover:bg-transparent hover:text-purple-700 hover:shadow-none hover:scale-100" : "",
                ].join(" ")}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-transparent bg-white shadow-sm transition hover:border-purple-300 hover:bg-purple-50">
            <svg className="h-5 w-5 text-purple-600" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="5.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="m15.5 15.5 3.5 3.5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>

          <div className="flex items-center rounded-full border border-zinc-200 bg-zinc-50 text-xs font-semibold text-zinc-700 shadow-sm">
            {(["EN", "AR"] as const).map((code) => {
              const isActive = language === code;
              return (
                <button key={code} onClick={() => setLanguage(code)} className={[ "px-3 py-1.5 transition-all", isActive ? "rounded-full bg-[#9810fa] text-white shadow-md" : "text-zinc-700 hover:text-[#9810fa]" ].join(" ")}>
                  {code}
                </button>
              );
            })}
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white shadow-sm cursor-pointer">
            U
          </div>
        </div>
      </div>

      {/* Modals & Drawers (kept in DOM to avoid missing component warnings) */}
      <ProfileLoginModal open={openLogin} onClose={() => setOpenLogin(false)} onSuccess={handleLoginSuccess} />
      <ProfileDrawer open={openDrawer} onClose={() => setOpenDrawer(false)} />
      <LocationModal open={openLocation} onClose={() => setOpenLocation(false)} onSelect={(loc) => setLocation({ city: loc.city, country: loc.country })} />
    </header>
  );
}
