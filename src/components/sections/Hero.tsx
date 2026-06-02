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
    if (!prefersReducedMotion()) {
      setCanUse3D(supportsWebGL());
    }
  }, []);

  // Pointer parallax on mascot (disabled with prefers-reduced-motion)
  useEffect(() => {
    if (!mounted || prefersReducedMotion()) return;
    const el = mascotRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = ((e.clientX - cx) / cx) * 12;
      const dy = ((e.clientY - cy) / cy) * 8;
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
      {/* R3F 3D backdrop — lazy, never blocks first paint */}
      {canUse3D && (
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
      )}

      {/* Static backdrop — shown when no WebGL or prefers-reduced-motion */}
      {!canUse3D && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-abyss via-ink/80 to-abyss pointer-events-none" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-odyssey-blue/10 rounded-full blur-[120px] pointer-events-none" />
          {/* Static star field */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
            {Array.from({ length: 40 }, (_, i) => (
              <div
                key={i}
                className="absolute w-px h-px bg-sky-tint/40 rounded-full"
                style={{
                  top: `${(i * 37 + 13) % 100}%`,
                  left: `${(i * 61 + 7) % 100}%`,
                  opacity: 0.2 + ((i * 0.15) % 0.6),
                  transform: `scale(${1 + (i % 3)})`,
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Gradient overlay over the canvas */}
      <div className="absolute inset-0 bg-gradient-to-b from-abyss/40 via-transparent to-abyss/80 pointer-events-none z-10" />

      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center gap-8 pt-24 pb-32">
        {/* Mascot with parallax + float */}
        <div
          ref={mascotRef}
          className="relative transition-transform duration-200 ease-out animate-[float_4s_ease-in-out_infinite]"
          style={{ willChange: "transform" }}
        >
          <Image
            src="/brand/mascot-rear.png"
            alt="Project Odyssey backpacker mascot"
            width={240}
            height={240}
            className="object-contain select-none"
            priority
          />
          {/* Radial vignette — hides white PNG background, gives natural dark-glow look */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, transparent 36%, #06080C 72%)",
            }}
            aria-hidden
          />
          {/* Blue bloom behind mascot */}
          <div
            className="absolute inset-0 -z-10 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(88,176,224,0.18) 0%, transparent 70%)",
            }}
            aria-hidden
          />
        </div>

        {/* Eyebrow */}
        <p className="text-xs tracking-[0.3em] font-medium text-odyssey-blue uppercase">
          {labels.hero.sub}
        </p>

        {/* Heading */}
        <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] text-ice">
          Begin Your{" "}
          <span className="gradient-text">Odyssey</span>
        </h1>

        {/* Sub-headline */}
        <p className="text-lg sm:text-xl text-sky-tint max-w-xl leading-relaxed">
          A backpacker hostel in Ahmedabad — bunk beds, privacy curtains, personal lockers. Book
          direct. No OTA markup. No middleman.
        </p>

        {/* Booking widget */}
        <BookingWidget className="w-full max-w-2xl mt-2" />

        {/* Scroll cue */}
        <a
          href="#intro"
          aria-label="Scroll down"
          className="flex flex-col items-center gap-1.5 text-xs text-sky-tint/60 hover:text-odyssey-blue transition-colors mt-4 animate-bounce"
        >
          <span className="tracking-widest uppercase text-[0.65rem]">{labels.hero.scrollCue}</span>
          <ChevronDown size={16} />
        </a>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
      `}</style>
    </section>
  );
}
