"use client";

import { useRef, useState } from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
}

export default function Card({ children, className = "", tilt = false }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!tilt) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    setTransform(`perspective(800px) rotateX(${y}deg) rotateY(${x}deg) scale(1.02)`);
  }

  function handleMouseLeave() {
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)");
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: "transform 0.2s ease" }}
      className={`rounded-2xl bg-ink border border-white/8 overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}
