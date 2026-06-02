"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { reviews } from "@/config/property";
import { labels } from "@/config/labels";

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
    <section id="reviews" className="py-24 px-4 sm:px-6 bg-ink">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14 flex flex-col gap-3">
          <p className="text-xs tracking-[0.3em] uppercase text-odyssey-blue font-semibold">
            Trusted by Travelers
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ice">
            {labels.reviews.heading}
          </h2>
        </div>

        <div className="relative flex flex-col items-center gap-6">
          {/* Stars */}
          <div className="flex gap-1">
            {[...Array(r.rating)].map((_, i) => (
              <Star key={i} size={18} fill="currentColor" className="text-odyssey-blue" />
            ))}
          </div>

          {/* Quote */}
          <blockquote className="text-lg sm:text-xl text-ice text-center leading-relaxed font-medium max-w-xl transition-all duration-500">
            &ldquo;{r.text}&rdquo;
          </blockquote>

          {/* Attribution */}
          <div className="flex flex-col items-center gap-1 text-sm text-sky-tint">
            <span className="font-semibold text-ice">{r.name}</span>
            <span className="opacity-60">{r.location}</span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 mt-2">
            <button
              onClick={prev}
              aria-label="Previous review"
              className="p-2 rounded-full border border-white/10 hover:border-odyssey-blue text-sky-tint hover:text-odyssey-blue transition-colors"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`Review ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === idx ? "bg-odyssey-blue" : "bg-white/20"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next review"
              className="p-2 rounded-full border border-white/10 hover:border-odyssey-blue text-sky-tint hover:text-odyssey-blue transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
