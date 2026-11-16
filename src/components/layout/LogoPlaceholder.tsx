"use client";

import Image from "next/image";

interface LogoPlaceholderProps {
  size?: "xs" | "sm" | "nav" | "md" | "lg";
  /** Kept for backwards compatibility — the official logo already contains the wordmark. */
  showWordmark?: boolean;
  className?: string;
}

// Official logo (public/brand/logo.png) is 2702×536 — never recolor or redraw it.
const RATIO = 2702 / 536;
const heights = { xs: 30, sm: 36, nav: 40, md: 44, lg: 60 } as const;

export default function LogoPlaceholder({
  size = "md",
  className = "",
}: LogoPlaceholderProps) {
  const h = heights[size];
  const w = Math.round(h * RATIO);

  return (
    <div className={`select-none inline-flex ${className}`}>
      <Image
        src="/brand/logo.png"
        alt="Project Odyssey"
        width={w}
        height={h}
        priority
        className="object-contain"
        style={{ height: h, width: "auto" }}
      />
    </div>
  );
}
