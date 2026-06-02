"use client";

import Image from "next/image";

interface LogoPlaceholderProps {
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
  className?: string;
}

const sizes = {
  sm: { mascot: 30, text: "text-sm" },
  md: { mascot: 38, text: "text-base" },
  lg: { mascot: 52, text: "text-xl" },
};

export default function LogoPlaceholder({
  size = "md",
  showWordmark = true,
  className = "",
}: LogoPlaceholderProps) {
  const s = sizes[size];

  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      <Image
        src="/brand/mascot.png"
        alt="Project Odyssey"
        width={s.mascot}
        height={s.mascot}
        className="object-contain drop-shadow-[0_0_8px_rgba(88,176,224,0.45)]"
        priority
      />
      {showWordmark && (
        <div className="font-display font-bold leading-none">
          <span className={`block tracking-[0.25em] font-light opacity-60 text-ice ${size === "sm" ? "text-[8px]" : "text-[10px]"}`}>
            PROJECT
          </span>
          <span className={`block tracking-tight gradient-text ${s.text}`}>
            ODYSSEY
          </span>
        </div>
      )}
    </div>
  );
}
