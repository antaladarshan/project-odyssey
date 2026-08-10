"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CalendarNavProps {
  prevStart: string;
  todayStart: string;
  nextStart: string;
}

// Plain <Link> navigation here replaces the whole grid with loading.tsx's
// skeleton on every click, then swaps back in — a visible flash that reads as
// slow even when the query itself is fast. Driving router.push() inside a
// transition instead keeps the current grid on screen (just dimmed) until the
// next one is ready, so paging feels instant.
export function CalendarNav({ prevStart, todayStart, nextStart }: CalendarNavProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function go(start: string) {
    startTransition(() => {
      router.push(`/calendar?start=${start}`);
    });
  }

  return (
    <div className={`flex items-center gap-2 transition-opacity ${isPending ? "opacity-50" : ""}`}>
      <button
        type="button"
        onClick={() => go(prevStart)}
        className="rounded-lg border border-ink-navy/15 bg-surface-white p-1.5 text-ink-navy shadow-soft transition-shadow hover:shadow-lift"
        aria-label="Previous 14 days"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        onClick={() => go(todayStart)}
        className="rounded-lg border border-ink-navy/15 bg-surface-white px-3 py-1.5 text-sm font-medium text-ink-navy shadow-soft transition-shadow hover:shadow-lift"
      >
        Today
      </button>
      <button
        type="button"
        onClick={() => go(nextStart)}
        className="rounded-lg border border-ink-navy/15 bg-surface-white p-1.5 text-ink-navy shadow-soft transition-shadow hover:shadow-lift"
        aria-label="Next 14 days"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
