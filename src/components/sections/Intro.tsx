"use client";

import { useEffect, useRef } from "react";

export default function Intro() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("opacity-100", "translate-y-0");
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="intro"
      ref={ref}
      className="relative py-28 px-4 sm:px-6 bg-abyss opacity-0 translate-y-8 transition-all duration-700 ease-out"
    >
      {/* Route line stub — GSAP takes over in Phase 3 */}
      <div className="absolute left-1/2 top-0 w-px h-16 bg-gradient-to-b from-odyssey-blue/60 to-transparent" />

      <div className="max-w-3xl mx-auto text-center flex flex-col gap-6">
        <p className="text-xs tracking-[0.3em] uppercase text-odyssey-blue font-semibold">
          The Story
        </p>
        <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-ice leading-tight">
          Not a hotel. Not just a room.{" "}
          <span className="gradient-text">An experience worth coming back to.</span>
        </h2>
        <p className="text-sky-tint text-lg leading-relaxed">
          Project Odyssey started as a flat and became something more. Three thoughtfully designed rooms,
          a shared kitchen that actually works, a common area you&apos;ll want to linger in, and a host
          who treats you like a traveler — not a transaction. Pune as your base. The world as your
          destination.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mt-4 text-sm text-sky-tint">
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-display font-bold gradient-text">3</span>
            <span className="opacity-70">Private Rooms</span>
          </div>
          <div className="w-px bg-white/10 self-stretch" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-display font-bold gradient-text">6</span>
            <span className="opacity-70">Max Guests</span>
          </div>
          <div className="w-px bg-white/10 self-stretch" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-display font-bold gradient-text">1</span>
            <span className="opacity-70">Whole Flat Option</span>
          </div>
        </div>
      </div>
    </section>
  );
}
