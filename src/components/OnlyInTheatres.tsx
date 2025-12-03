"use client";

import React, { useState } from "react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";

// MOVIE DATA
const MOVIES = [
  { id: 1, title: "De De Pyaar De 2", cert: "UA13+", language: "Hindi", image: "/movies/d1.jpg", tags: ["New Releases"] },
  { id: 2, title: "Tere Ishk Mein", cert: "UA16+", language: "Hindi", image: "/movies/d2.jpg", tags: ["New Releases"] },
  { id: 3, title: "Mastiii 4", cert: "A", language: "Hindi", image: "/movies/d3.jpg", tags: ["New Releases", "3D"] },
  { id: 4, title: "120 Bahadur", cert: "UA13+", language: "Hindi", image: "/movies/d4.jpg", tags: ["New Releases"] },
  { id: 5, title: "Haq", cert: "UA13+", language: "Hindi", image: "/movies/d5.jpg", tags: ["Re-Releases"] },
  { id: 6, title: "Thamma", cert: "UA16+", language: "Hindi", image: "/movies/d1.jpg", tags: ["New Releases"] },
  { id: 7, title: "Skyfall", cert: "UA13+", language: "English", image: "/movies/d2.jpg", tags: ["Re-Releases"] },
  { id: 8, title: "Avatar: The Way of Water", cert: "UA13+", language: "English", image: "/movies/d3.jpg", tags: ["3D", "4DX", "IMAX"] },
  { id: 9, title: "Pushpa 2", cert: "UA16+", language: "Hindi", image: "/movies/d4.jpg", tags: ["New Releases"] },
  { id: 10, title: "Spider-Man: No Way Home", cert: "UA13+", language: "English", image: "/movies/d5.jpg", tags: ["Re-Releases", "3D"] },
];


// FILTER OPTIONS
const GENRES = ["Action", "Adventure", "Animation", "Anime", "Comedy", "Crime", "Devotional", "Drama", "Family", "Fantasy"];
const LANGUAGES = ["Hindi", "English", "Tamil", "Telugu"];
const FORMATS = ["2D", "3D", "4DX", "IMAX"];

// QUICK FILTER PILLS
const QUICK_FILTERS = [
  { label: "Hindi", type: "language", value: "Hindi" },
  { label: "English", type: "language", value: "English" },
  { label: "New Releases", type: "tag", value: "New Releases" },
  { label: "Re-Releases", type: "tag", value: "Re-Releases" },
  { label: "4DX", type: "tag", value: "4DX" },
  { label: "IMAX 3D", type: "tag", value: "IMAX" },
];

export default function OnlyInTheatres() {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"Genre" | "Language" | "Format">("Genre");

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);

  const [quickFilters, setQuickFilters] = useState<string[]>([]);

  const toggleQuickFilter = (value: string) => {
    setQuickFilters((prev) =>
      prev.includes(value) ? prev.filter((x) => x !== value) : [...prev, value]
    );
  };

  // MAIN FILTER LOGIC
  const filteredMovies = MOVIES.filter((movie) => {
    const quickLangOk =
      quickFilters.filter((f) => LANGUAGES.includes(f)).length === 0 ||
      quickFilters.includes(movie.language);

    const quickTagOk =
      quickFilters.filter((f) => FORMATS.includes(f) || f.includes("Re") || f.includes("New")).length === 0 ||
      quickFilters.some((f) => movie.tags.includes(f));

    const modalLangOk = selectedLanguages.length === 0 || selectedLanguages.includes(movie.language);
    const modalFormatOk = selectedFormats.length === 0 || selectedFormats.some((f) => movie.tags.includes(f));

    return quickLangOk && quickTagOk && modalLangOk && modalFormatOk;
  });

  const clearAllFilters = () => {
    setSelectedGenres([]);
    setSelectedLanguages([]);
    setSelectedFormats([]);
  };

  return (
    <section className="w-full px-4 pt-10 md:px-6 lg:px-16 lg:pt-16">
      <div className="mx-auto max-w-6xl">
        {/* TITLE */}
        <h2 className="mb-6 text-[26px] font-semibold md:text-[32px] lg:text-[36px]">
          Only in Theatres
        </h2>

        {/* QUICK FILTER PILLS */}
        <div className="mb-6 flex flex-wrap gap-3">
          {QUICK_FILTERS.map((f) => (
            <button
              key={f.label}
              onClick={() => toggleQuickFilter(f.value)}
              className={`px-4 py-2 rounded-full text-sm border shadow-sm ${
                quickFilters.includes(f.value)
                  ? "bg-zinc-900 text-white"
                  : "bg-white text-zinc-700 border-zinc-300"
              }`}
            >
              {f.label}
            </button>
          ))}

          <button
            onClick={() => setShowFilterModal(true)}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 shadow-sm"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        {/* MOVIES GRID */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-5">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="cursor-pointer overflow-hidden rounded-[18px] bg-white shadow-[0_8px_22px_rgba(0,0,0,0.12)] transition hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(0,0,0,0.18)]"
            >
              <div className="h-[210px] sm:h-[220px] md:h-[230px] lg:h-[240px]">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="px-3 py-3">
                <h3 className="line-clamp-2 text-[13px] font-semibold md:text-[14px]">
                  {movie.title}
                </h3>
                <p className="mt-1 text-[11px] text-zinc-500 md:text-[12px]">
                  {movie.cert} | {movie.language}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL */}
        {showFilterModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3 py-4 sm:px-4">
            <div className="w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-3xl bg-white shadow-2xl">
              {/* HEADER */}
              <div className="flex items-center justify-between border-b px-5 py-4 md:px-6">
                <div>
                  <h2 className="text-lg font-semibold md:text-xl">Filter by</h2>
                  <p className="mt-1 text-xs text-zinc-500 md:text-sm">
                    Choose language, format and genre to refine movies
                  </p>
                </div>
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-sm font-bold text-zinc-600 hover:bg-zinc-200"
                >
                  ✕
                </button>
              </div>

              {/* BODY */}
              <div className="flex flex-col gap-4 px-5 py-4 md:flex-row md:gap-6 md:px-6 md:py-5">
                {/* LEFT TABS */}
                <div className="md:w-40 md:border-r md:pr-4">
                  <div className="flex gap-2 overflow-x-auto pb-2 md:flex-col md:gap-1 md:overflow-visible md:pb-0">
                    {["Genre", "Language", "Format"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab as typeof activeTab)}
                        className={`whitespace-nowrap rounded-full px-3 py-2 text-xs font-medium md:w-full md:rounded-lg md:text-sm ${
                          activeTab === tab
                            ? "bg-zinc-900 text-white"
                            : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* OPTIONS */}
                <div className="flex-1 max-h-[48vh] md:max-h-[380px] overflow-y-auto pr-1 md:pr-2">
                  {activeTab === "Genre" && (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {GENRES.map((genre) => (
                        <label
                          key={genre}
                          className="flex items-center gap-3 rounded-xl border border-transparent px-1 py-1 hover:border-zinc-200"
                        >
                          <input
                            type="checkbox"
                            checked={selectedGenres.includes(genre)}
                            onChange={() =>
                              setSelectedGenres((prev) =>
                                prev.includes(genre)
                                  ? prev.filter((x) => x !== genre)
                                  : [...prev, genre]
                              )
                            }
                            className="h-4 w-4 rounded border-zinc-400 accent-zinc-900"
                          />
                          <span className="text-sm text-zinc-800">{genre}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {activeTab === "Language" && (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {LANGUAGES.map((lang) => (
                        <label
                          key={lang}
                          className="flex items-center gap-3 rounded-xl border border-transparent px-1 py-1 hover:border-zinc-200"
                        >
                          <input
                            type="checkbox"
                            checked={selectedLanguages.includes(lang)}
                            onChange={() =>
                              setSelectedLanguages((prev) =>
                                prev.includes(lang)
                                  ? prev.filter((x) => x !== lang)
                                  : [...prev, lang]
                              )
                            }
                            className="h-4 w-4 rounded border-zinc-400 accent-zinc-900"
                          />
                          <span className="text-sm text-zinc-800">{lang}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {activeTab === "Format" && (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {FORMATS.map((format) => (
                        <label
                          key={format}
                          className="flex items-center gap-3 rounded-xl border border-transparent px-1 py-1 hover:border-zinc-200"
                        >
                          <input
                            type="checkbox"
                            checked={selectedFormats.includes(format)}
                            onChange={() =>
                              setSelectedFormats((prev) =>
                                prev.includes(format)
                                  ? prev.filter((x) => x !== format)
                                  : [...prev, format]
                              )
                            }
                            className="h-4 w-4 rounded border-zinc-400 accent-zinc-900"
                          />
                          <span className="text-sm text-zinc-800">{format}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* FOOTER */}
              <div className="flex items-center justify-between border-t bg-white px-5 py-4 md:px-6">
                <button
                  onClick={clearAllFilters}
                  className="text-xs font-medium text-zinc-600 underline md:text-sm"
                >
                  Clear all
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => setShowFilterModal(false)}
                    className="rounded-full border border-zinc-300 px-4 py-2 text-xs font-semibold text-zinc-800 hover:bg-zinc-50 md:px-5 md:text-sm"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => setShowFilterModal(false)}
                    className="rounded-full bg-zinc-900 px-4 py-2 text-xs font-semibold text-white hover:bg-black md:px-6 md:text-sm"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
