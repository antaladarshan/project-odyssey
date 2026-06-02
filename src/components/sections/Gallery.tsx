"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { labels } from "@/config/labels";

// TODO: replace with real photos when Darshan supplies them
const galleryPlaceholders = [
  { id: 1, label: "Common Area", gradient: "from-azure-core/40 to-odyssey-blue/20" },
  { id: 2, label: "The Explorer Room", gradient: "from-odyssey-blue/30 to-sky-tint/10" },
  { id: 3, label: "The Navigator Room", gradient: "from-mascot-glow/20 to-azure-deep/30" },
  { id: 4, label: "Shared Kitchen", gradient: "from-sky-tint/20 to-odyssey-blue/20" },
  { id: 5, label: "The Voyager Room", gradient: "from-azure-core/30 to-ink/60" },
  { id: 6, label: "Neighborhood View", gradient: "from-odyssey-blue/20 to-mascot-glow/10" },
];

export default function Gallery() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  function prev() {
    setLightboxIdx((i) => (i !== null ? (i - 1 + galleryPlaceholders.length) % galleryPlaceholders.length : 0));
  }
  function next() {
    setLightboxIdx((i) => (i !== null ? (i + 1) % galleryPlaceholders.length : 0));
  }

  return (
    <>
      <section id="gallery" className="py-24 px-4 sm:px-6 bg-ink">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 flex flex-col gap-3">
            <p className="text-xs tracking-[0.3em] uppercase text-odyssey-blue font-semibold">
              A Glimpse Inside
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-ice">
              {labels.gallery.heading}
            </h2>
            <p className="text-sky-tint/70 text-sm">
              Real photos coming soon — these are placeholders until property assets are supplied.
            </p>
          </div>

          {/* Masonry-ish grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {galleryPlaceholders.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setLightboxIdx(idx)}
                className={`group relative overflow-hidden rounded-2xl aspect-[4/3] bg-gradient-to-br ${item.gradient} hover:ring-2 hover:ring-odyssey-blue/50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-odyssey-blue`}
                aria-label={`View ${item.label}`}
              >
                <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-sm font-medium">{item.label}</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-odyssey-blue/20 font-display font-extrabold text-5xl select-none">
                  {item.id}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxIdx(null)}
        >
          <div
            className="relative w-full max-w-3xl aspect-[4/3] rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`w-full h-full bg-gradient-to-br ${galleryPlaceholders[lightboxIdx].gradient} flex items-center justify-center`}
            >
              <span className="text-white/30 font-display font-extrabold text-8xl">
                {galleryPlaceholders[lightboxIdx].id}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 text-white font-medium text-sm bg-black/50 px-3 py-1.5 rounded-full">
              {galleryPlaceholders[lightboxIdx].label}
            </div>
          </div>

          {/* Controls */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
          <button
            onClick={() => setLightboxIdx(null)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {/* Index indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {galleryPlaceholders.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${i === lightboxIdx ? "bg-odyssey-blue" : "bg-white/30"}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
