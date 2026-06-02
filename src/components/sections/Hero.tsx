"use client";

import { useEffect, useRef, useState, lazy, Suspense } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import BookingWidget from "@/components/ui/BookingWidget";
import { labels } from "@/config/labels";
import { supportsWebGL, prefersReducedMotion } from "@/lib/capabilities";

const HeroCanvas = lazy(() => import("@/components/three/HeroCanvas"));

export default function Hero() {
  const mascotRef = useRef<HTMLDivElement>(null);
  const [canUse3D, setCanUse3D] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!prefersReducedMotion()) setCanUse3D(supportsWebGL());
  }, []);

  // Pointer parallax on mascot
  useEffect(() => {
    if (!mounted || prefersReducedMotion()) return;
    const el = mascotRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = ((e.clientX - cx) / cx) * 10;
      const dy = ((e.clientY - cy) / cy) * 6;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    };
    const onLeave = () => { el.style.transform = ""; };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [mounted]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-abyss"
    >
      {/* R3F 3D backdrop */}
      {canUse3D && (
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
      )}

      {/* Static star field fallback */}
      {!canUse3D && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-odyssey-blue/8 rounded-full blur-[100px]" />
          {Array.from({ length: 40 }, (_, i) => (
            <div key={i} className="absolute w-px h-px bg-sky-tint/40 rounded-full"
              style={{ top: `${(i * 37 + 13) % 100}%`, left: `${(i * 61 + 7) % 100}%`, opacity: 0.2 + ((i * 0.15) % 0.6), transform: `scale(${1 + (i % 3)})` }} />
          ))}
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-abyss/30 via-transparent to-abyss/80 pointer-events-none z-10" />

      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center gap-6 sm:gap-8 pt-20 sm:pt-24 pb-28 sm:pb-32">

        {/* Mascot — transparent PNG, naturally floats on dark bg */}
        <div
          ref={mascotRef}
          className="transition-transform duration-200 ease-out animate-[float_4s_ease-in-out_infinite]"
          style={{ willChange: "transform" }}
        >
          <Image
            src="/brand/mascot.png"
            alt="Project Odyssey backpacker mascot"
            width={180}
            height={180}
            className="object-contain select-none drop-shadow-[0_0_32px_rgba(88,176,224,0.5)]"
            sizes="(max-width: 640px) 140px, 180px"
            priority
          />
        </div>

        {/* Eyebrow */}
        <p className="text-[10px] sm:text-xs tracking-[0.3em] font-medium text-odyssey-blue uppercase">
          {labels.hero.sub}
        </p>

        {/* Heading */}
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] text-ice">
          Begin Your{" "}
          <span className="gradient-text">Odyssey</span>
        </h1>

        {/* Sub-headline */}
        <p className="text-base sm:text-xl text-sky-tint max-w-sm sm:max-w-xl leading-relaxed px-2">
          A backpacker hostel in Ahmedabad — bunk beds with privacy curtains, personal lockers.
          Book direct. No OTA markup.
        </p>

        {/* Booking widget */}
        <BookingWidget className="w-full max-w-2xl mt-1" />

        {/* Scroll cue */}
        <a
          href="#intro"
          aria-label="Scroll down"
          className="flex flex-col items-center gap-1.5 text-xs text-sky-tint/50 hover:text-odyssey-blue transition-colors mt-2 animate-bounce"
        >
          <span className="tracking-widest uppercase text-[0.6rem] hidden sm:block">{labels.hero.scrollCue}</span>
          <ChevronDown size={16} />
        </a>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </section>
  );
}
