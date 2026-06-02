"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { labels } from "@/config/labels";

const galleryItems = [
  { id: 1, src: "/gallery/room-3a.webp", label: "6-Bed Dormitory — The Voyager", aspect: "landscape" },
  { id: 2, src: "/gallery/room-1a.webp", label: "4-Bed Dorm — The Navigator", aspect: "landscape" },
  { id: 3, src: "/gallery/room-2a.webp", label: "4-Bed Dorm — The Explorer", aspect: "landscape" },
  // Placeholder slots for photos Darshan will supply — comment/remove once real photos added
  { id: 4, src: null, label: "Common Area", aspect: "landscape", placeholder: "from-azure-core/40 to-odyssey-blue/20" },
  { id: 5, src: null, label: "Shared Kitchen", aspect: "landscape", placeholder: "from-odyssey-blue/30 to-sky-tint/10" },
  { id: 6, src: null, label: "Building Exterior", aspect: "landscape", placeholder: "from-mascot-glow/20 to-azure-deep/30" },
];

export default function Gallery() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  function prev() {
    setLightboxIdx((i) => (i !== null ? (i - 1 + galleryItems.length) % galleryItems.length : 0));
  }
  function next() {
    setLightboxIdx((i) => (i !== null ? (i + 1) % galleryItems.length : 0));
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
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {galleryItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setLightboxIdx(idx)}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] hover:ring-2 hover:ring-odyssey-blue/50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-odyssey-blue"
                aria-label={`View ${item.label}`}
              >
                {item.src ? (
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 400px"
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${item.placeholder} flex items-center justify-center`}>
                    <span className="text-odyssey-blue/20 font-display font-extrabold text-5xl select-none">
                      {item.id}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 flex items-end p-3 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs font-medium">{item.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxIdx(null)}
        >
          <div
            className="relative w-full max-w-4xl aspect-[4/3] rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {galleryItems[lightboxIdx].src ? (
              <Image
                src={galleryItems[lightboxIdx].src!}
                alt={galleryItems[lightboxIdx].label}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 900px"
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${galleryItems[lightboxIdx].placeholder}`} />
            )}
            <div className="absolute bottom-4 left-4 text-white font-medium text-sm bg-black/60 px-4 py-2 rounded-full">
              {galleryItems[lightboxIdx].label}
            </div>
          </div>

          <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-3 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors" aria-label="Previous">
            <ChevronLeft size={20} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors" aria-label="Next">
            <ChevronRight size={20} />
          </button>
          <button onClick={() => setLightboxIdx(null)} className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors" aria-label="Close">
            <X size={20} />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {galleryItems.map((_, i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === lightboxIdx ? "bg-odyssey-blue" : "bg-white/30"}`} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
