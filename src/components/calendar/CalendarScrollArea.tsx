"use client";

import { useRef, useState, type ReactNode, type PointerEvent } from "react";

const DRAG_THRESHOLD_PX = 4;

// Click-and-drag horizontal panning, for plain-mouse users who don't have a
// trackpad's native two-finger horizontal scroll. Vertical wheel/scrollbar
// scrolling (needed for the sticky date header — see CalendarGrid.tsx)
// keeps working exactly as before; this only adds a second, purely
// horizontal interaction on top.
export function CalendarScrollArea({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ startX: number; scrollLeft: number; moved: boolean } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "touch" || !ref.current) return; // touch already scrolls natively
    drag.current = { startX: e.clientX, scrollLeft: ref.current.scrollLeft, moved: false };
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (!drag.current || !ref.current) return;
    const dx = e.clientX - drag.current.startX;
    if (!drag.current.moved) {
      if (Math.abs(dx) < DRAG_THRESHOLD_PX) return; // let plain clicks (e.g. a booking bar) through untouched
      drag.current.moved = true;
      setIsDragging(true);
    }
    e.preventDefault(); // stop native text/image drag-selection once panning
    ref.current.scrollLeft = drag.current.scrollLeft - dx;
  }

  function endDrag() {
    drag.current = null;
    setIsDragging(false);
  }

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      className={`max-h-[70vh] select-none overflow-auto overscroll-x-contain rounded-xl border border-ink-navy/10 bg-surface-white shadow-card ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      {children}
    </div>
  );
}
