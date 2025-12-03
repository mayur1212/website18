"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const MOVIES = [
  {
    id: 1,
    title: "120 Bahadur",
    certificate: "UA13+",
    genre: "Action, Historical +1 more",
    cta: "Book now",
    poster: "/movies/d3.jpg",
  },
  {
    id: 2,
    title: "Random Movie 2",
    certificate: "U/A",
    genre: "Drama",
    cta: "Book now",
    poster: "/movies/d1.jpg",
  },
  {
    id: 3,
    title: "Mastiii 4",
    certificate: "A",
    genre: "Comedy",
    cta: "Book now",
    poster: "/movies/d2.jpg",
  },
];

export default function FeaturedCarousel() {
  const [current, setCurrent] = useState(0);
  const total = MOVIES.length;
  const item = MOVIES[current];

  const next = () => setCurrent((p) => (p + 1) % total);
  const prev = () => setCurrent((p) => (p - 1 + total) % total);

  const metaText = `${item.certificate} | ${item.genre}`;
  const bgImage = item.poster;

  // AUTO SLIDE (5 sec)
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((p) => (p + 1) % total);
    }, 5000);

    return () => clearInterval(id);
  }, [total]);

  return (
    <>
      {/* ==================== MOBILE + TABLET ==================== */}
      <section className="relative w-full py-8 px-4 md:py-10 lg:hidden overflow-hidden">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0">
          <Image
            src={bgImage}
            alt={item.title}
            fill
            priority
            className="h-full w-full object-cover scale-110 blur-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-white/40 to-white" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-3xl">
          <h2 className="text-lg font-semibold text-white drop-shadow sm:text-xl">
            In the spotlight
          </h2>

          <article className="mt-4 overflow-hidden rounded-[24px] bg-white/95 shadow-[0_18px_40px_rgba(15,23,42,0.4)] backdrop-blur">
            <div className="relative h-[200px] sm:h-[220px] md:h-[240px] w-full">
              <Image
                src={item.poster}
                alt={item.title}
                fill
                priority
                className="object-cover"
              />
            </div>

            <div className="px-4 pb-4 pt-3 sm:pb-5">
              <h3 className="text-base font-semibold text-zinc-900 sm:text-lg">
                {item.title}
              </h3>
              <p className="mt-1 text-xs font-medium text-zinc-500 sm:text-sm">
                {item.certificate}
              </p>
            </div>
          </article>

          {/* Dots */}
          <div className="mt-4 flex justify-center gap-2">
            {MOVIES.map((movie, index) => {
              const active = index === current;

              return (
                <button
                  key={movie.id}
                  onClick={() => setCurrent(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    active ? "w-7 bg-white" : "w-2 bg-white/50"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== DESKTOP VERSION ==================== */}
      <section className="relative hidden min-h-[520px] items-center overflow-hidden px-8 py-10 md:px-16 lg:flex">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0">
          <Image
            src={bgImage}
            alt={item.title}
            fill
            priority
            className="h-full w-full object-cover scale-110 blur-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white" />
        </div>

        {/* LEFT ARROW – sectionच्या थोडं आत */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-24 top-1/2 z-20 -translate-y-1/2 flex items-center justify-center text-2xl font-semibold text-zinc-900 hover:scale-110 transition-transform"
        >
          ‹
        </button>

        {/* RIGHT ARROW – दुसऱ्या बाजूला */}
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-24 top-1/2 z-20 -translate-y-1/2 flex items-center justify-center text-2xl font-semibold text-zinc-900 hover:scale-110 transition-transform"
        >
          ›
        </button>

        {/* CONTENT (CENTERED) */}
        <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between gap-10 px-4">
          {/* LEFT TEXT */}
          <div className="flex flex-1 flex-col gap-6 md:max-w-lg">
            <h1 className="text-[34px] font-semibold tracking-tight text-zinc-900 md:text-[44px]">
              {item.title}
            </h1>

            <p className="text-[20px] font-medium text-zinc-800">
              {metaText}
            </p>

            <button className="mt-2 inline-flex w-[180px] items-center justify-center rounded-full bg-black px-8 py-3 text-[16px] font-semibold text-white shadow-md transition hover:bg-zinc-900">
              {item.cta}
            </button>
          </div>

          {/* RIGHT POSTER IMAGE */}
          <div className="flex flex-1 items-center justify-end">
            <div className="relative h-[360px] w-[240px] overflow-hidden rounded-[32px] bg-black shadow-[0_28px_60px_rgba(0,0,0,0.35)] md:h-[420px] md:w-[270px] lg:h-[460px] lg:w-[300px]">
              <Image
                src={item.poster}
                alt={item.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* DOTS */}
        <div className="relative z-10 absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3">
          {MOVIES.map((movie, index) => {
            const active = index === current;

            return (
              <button
                key={movie.id}
                onClick={() => setCurrent(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2 rounded-full transition-all ${
                  active ? "w-7 bg-black" : "w-2 bg-zinc-300"
                }`}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}
