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
      <div className="absolute left-1/2 top-0 w-px h-16 bg-gradient-to-b from-odyssey-blue/60 to-transparent" />

      <div className="max-w-3xl mx-auto text-center flex flex-col gap-6">
        <p className="text-xs tracking-[0.3em] uppercase text-odyssey-blue font-semibold">
          The Story
        </p>
        <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-ice leading-tight">
          Not just a bed.{" "}
          <span className="gradient-text">An experience worth coming back to.</span>
        </h2>
        <p className="text-sky-tint text-lg leading-relaxed">
          Project Odyssey is a backpacker hostel in Ahmedabad that gets the details right — bunk beds
          with privacy curtains, a shared kitchen that actually works, fast Wi-Fi, personal lockers on
          every bed. No OTA markup, no middleman. Just book direct and arrive.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mt-4 text-sm text-sky-tint">
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-display font-bold gradient-text">3</span>
            <span className="opacity-70">Dorm Rooms</span>
          </div>
          <div className="w-px bg-white/10 self-stretch" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-display font-bold gradient-text">14</span>
            <span className="opacity-70">Total Beds</span>
          </div>
          <div className="w-px bg-white/10 self-stretch" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-display font-bold gradient-text">₹700</span>
            <span className="opacity-70">Per Bed / Night</span>
          </div>
        </div>
      </div>
    </section>
  );
}
