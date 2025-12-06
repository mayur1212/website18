"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const ARTISTS = [
  { id: 1, name: "A. R. Rahman", image: "/movies/a1.jpg" },
  { id: 2, name: "Sunidhi Chauhan", image: "/movies/a2.jpg" },
  { id: 3, name: "Masoom Sharma", image: "/movies/a3.jpg" },
  { id: 4, name: "Satinder Sartaaj", image: "/movies/a4.jpg" },
  { id: 5, name: "Jubin Nautiyal", image: "/movies/a5.jpg" },
  { id: 6, name: "Aditya Rikhari", image: "/movies/a6.jpg" },
  { id: 7, name: "Badshah", image: "/movies/a7.jpg" },
  { id: 8, name: "Diljit Dosanjh", image: "/movies/a8.jpg" },
];

const CARD_SIZE = 180; // card width in px
const GAP = 40; // gap in px
const TOTAL_WIDTH = CARD_SIZE + GAP;

export default function ArtistsInYourDistrict() {
  const [index, setIndex] = useState(0);
  const extended = [...ARTISTS, ...ARTISTS]; // for smooth infinite feel
  const autoRef = useRef<number | null>(null);

  // scroll ref for touch devices / fallback
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const next = () => setIndex((i) => (i + 1) % ARTISTS.length);
  const prev = () =>
    setIndex((i) => (i === 0 ? ARTISTS.length - 1 : i - 1));

  // Auto-advance every 3s
  useEffect(() => {
    if (autoRef.current) window.clearInterval(autoRef.current);
    autoRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % ARTISTS.length);
    }, 3000);

    return () => {
      if (autoRef.current) {
        window.clearInterval(autoRef.current);
        autoRef.current = null;
      }
    };
  }, []);

  // Keep scrollRef in sync on small screens (when user wants to scroll manually)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // If viewport is narrow, scroll to make the "index" visible
    if (window.innerWidth < 720) {
      const targetLeft = index * (CARD_SIZE + 24); // smaller gap for responsive layout
      el.scrollTo({ left: targetLeft, behavior: "smooth" });
    }
  }, [index]);

  // Pause auto on hover (desktop)
  const handleMouseEnter = () => {
    if (autoRef.current) {
      window.clearInterval(autoRef.current);
      autoRef.current = null;
    }
  };
  const handleMouseLeave = () => {
    if (!autoRef.current) {
      autoRef.current = window.setInterval(() => {
        setIndex((i) => (i + 1) % ARTISTS.length);
      }, 3000);
    }
  };

  return (
    <section className="py-14 bg-white select-none">
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-zinc-900">
            Artists in your District
          </h2>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={prev}
              aria-label="Previous"
              className="h-12 w-12 rounded-full bg-white flex items-center justify-center hover:bg-zinc-100 transition"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" stroke="#333" strokeWidth="2" fill="none">
                <path d="M15 18l-6-6 6-6" strokeLinejoin="round" strokeLinecap="round" />
              </svg>
            </button>

            <button
              onClick={next}
              aria-label="Next"
              className="h-12 w-12 rounded-full bg-white flex items-center justify-center hover:bg-zinc-100 transition"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" stroke="#333" strokeWidth="2" fill="none">
                <path d="M9 18l6-6-6-6" strokeLinejoin="round" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop: centered motion carousel */}
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative hidden md:block"
        >
          <div className="overflow-hidden">
            <motion.div
              className="flex items-center"
              animate={{ x: -index * TOTAL_WIDTH }}
              transition={{ type: "spring", stiffness: 70, damping: 20 }}
              style={{ willChange: "transform" }}
            >
              {extended.map((artist, i) => {
                const centerIndex = index % ARTISTS.length;
                const isCenter = i % ARTISTS.length === centerIndex;

                return (
                  <div
                    key={i}
                    className="flex flex-col items-center"
                    style={{ width: CARD_SIZE, marginRight: GAP }}
                  >
                    <div className="relative h-44 w-44 rounded-full overflow-hidden bg-white">
                      <Image
                        src={artist.image}
                        alt={artist.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <p
                      className={`mt-4 text-lg font-semibold text-zinc-800 whitespace-nowrap ${isCenter ? "scale-105" : "scale-100"}`}
                    >
                      {artist.name}
                    </p>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Mobile / touch: smooth horizontal scroll */}
        <div className="md:hidden relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 no-scrollbar"
          >
            {ARTISTS.map((artist) => (
              <div key={artist.id} className="flex flex-col items-center flex-shrink-0 px-1">
                <div className="relative h-36 w-36 rounded-full overflow-hidden shadow-md">
                  <Image src={artist.image} alt={artist.name} fill className="object-cover" />
                </div>
                <p className="mt-3 text-base font-medium text-zinc-900">
                  {artist.name}
                </p>
              </div>
            ))}

            {/* padding spacer to allow last card to center nicely */}
            <div style={{ width: 24 }} />
          </div>

          {/* mobile next button (overlay) */}
          <button
            onClick={() => scrollRef.current?.scrollBy({ left: 220, behavior: "smooth" })}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-zinc-100"
            aria-label="Scroll next"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
