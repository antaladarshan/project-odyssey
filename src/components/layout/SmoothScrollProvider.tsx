"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/capabilities";

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    let lenis: import("lenis").default | null = null;

    (async () => {
      try {
        const { initLenis } = await import("@/lib/scroll");
        lenis = initLenis();
      } catch {
        // Lenis failed silently — native scroll remains
      }
    })();

    return () => {
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
