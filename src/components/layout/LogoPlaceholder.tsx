"use client";

import Image from "next/image";

interface LogoPlaceholderProps {
  size?: "xs" | "sm" | "md" | "lg";
  /** Kept for backwards compatibility — the official logo already contains the wordmark. */
  showWordmark?: boolean;
  /** Turn off the looping playful animation. */
  still?: boolean;
  className?: string;
}

// Official logo (public/brand/logo.png) is 2702×536 — never recolor or redraw it.
const RATIO = 2702 / 536;
const heights = { xs: 30, sm: 36, md: 44, lg: 60 } as const;

export default function LogoPlaceholder({
  size = "md",
  still = false,
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
        className={`object-contain ${still ? "" : "logo-playful"}`}
        style={{ height: h, width: "auto" }}
      />
    </div>
  );
}
