"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { reviews } from "@/config/property";

export default function Reviews() {
  const [idx, setIdx] = useState(0);

  const prev = useCallback(() => setIdx((i) => (i - 1 + reviews.length) % reviews.length), []);
  const next = useCallback(() => setIdx((i) => (i + 1) % reviews.length), []);

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next]);

  const r = reviews[idx];

  return (
    <section id="reviews" className="py-16 sm:py-24 px-4 sm:px-6 bg-po-cream">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Polaroid */}
        <div className="mx-auto bg-white p-3 pb-10 shadow-xl rotate-[-4deg] max-w-xs w-full">
          <div className="relative aspect-square">
            <Image src="/gallery/room-1a.webp" alt="Guests' favourite room at Project Odyssey" fill sizes="320px" className="object-cover" />
          </div>
          <p className="headline-script !text-2xl text-center mt-3">Loved by travellers</p>
        </div>

        {/* Quote */}
        <div className="flex flex-col gap-5">
          <div className="flex gap-1">
            {[...Array(r.rating)].map((_, i) => (
              <Star key={i} size={18} fill="currentColor" className="text-po-yellow" />
            ))}
          </div>
          <blockquote className="text-lg sm:text-xl text-po-ink leading-relaxed font-medium min-h-[8rem]">
            &ldquo;{r.text}&rdquo;
          </blockquote>
          <p className="text-sm">
            <span className="font-bold text-po-ink">{r.name}</span>
            <span className="text-gray-500"> · {r.location}</span>
          </p>
          <div className="flex items-center gap-3">
            <button onClick={prev} aria-label="Previous review"
              className="p-2 rounded-full border border-gray-300 hover:border-po-pink hover:text-po-pink transition-colors">
              <ChevronLeft size={18} />
            </button>
            <button onClick={next} aria-label="Next review"
              className="p-2 rounded-full border border-gray-300 hover:border-po-pink hover:text-po-pink transition-colors">
              <ChevronRight size={18} />
            </button>
            <div className="flex gap-2 ml-2">
              {reviews.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)} aria-label={`Review ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition-colors ${i === idx ? "bg-po-pink" : "bg-gray-300"}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
