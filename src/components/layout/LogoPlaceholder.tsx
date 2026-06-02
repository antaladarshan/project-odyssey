"use client";

import Image from "next/image";
import { siteConfig } from "@/config/site";

interface LogoPlaceholderProps {
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
  className?: string;
}

const sizes = {
  sm: { mascot: 28, text: "text-sm" },
  md: { mascot: 36, text: "text-base" },
  lg: { mascot: 48, text: "text-xl" },
};

export default function LogoPlaceholder({
  variant = "dark",
  size = "md",
  showWordmark = true,
  className = "",
}: LogoPlaceholderProps) {
  const s = sizes[size];
  const textColor = variant === "dark" ? "text-ice" : "text-ink";

  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      <Image
        src="/brand/mascot-rear-sm.png"
        alt="Project Odyssey mascot"
        width={s.mascot}
        height={s.mascot}
        className="mascot-glow-sm object-contain"
        priority
      />
      {showWordmark && (
        <div className={`font-display font-bold leading-none ${s.text} ${textColor}`}>
          <span className="tracking-widest text-[0.6em] font-light opacity-70">PROJECT</span>
          <br />
          <span className="tracking-tight gradient-text">ODYSSEY</span>
        </div>
      )}
    </div>
  );
}
