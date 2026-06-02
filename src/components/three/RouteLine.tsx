"use client";

import { useEffect, useRef } from "react";

// Static SVG route line — shown when JS/WebGL is not available or prefers-reduced-motion
// GSAP ScrollTrigger in SmoothScrollProvider animates the dashoffset for the live version
export default function RouteLine() {
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;

    const total = el.getTotalLength();
    el.style.strokeDasharray = `${total}`;
    el.style.strokeDashoffset = `${total}`;

    let gsap: typeof import("gsap").gsap;
    let ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;

    (async () => {
      try {
        const g = await import("gsap");
        const st = await import("gsap/ScrollTrigger");
        gsap = g.gsap;
        ScrollTrigger = st.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        gsap.to(el, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });
      } catch {
        // GSAP failed — just show the line statically
        if (el) el.style.strokeDashoffset = "0";
      }
    })();

    return () => {
      ScrollTrigger?.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <svg
      className="fixed left-1/2 top-0 -translate-x-1/2 w-px pointer-events-none z-20 opacity-40"
      style={{ height: "100vh" }}
      aria-hidden
    >
      <path
        ref={lineRef}
        d="M 0.5 0 L 0.5 1000"
        stroke="url(#routeGrad)"
        strokeWidth="1"
        fill="none"
      />
      <defs>
        <linearGradient id="routeGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#48a0c8" stopOpacity="0" />
          <stop offset="20%" stopColor="#58b0e0" stopOpacity="0.8" />
          <stop offset="80%" stopColor="#3078b8" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#1060c0" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
