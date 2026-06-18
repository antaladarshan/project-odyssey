"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { siteConfig } from "@/config/site";
import { nightsBetween } from "@/lib/pricing";

// ── Local-date helpers (avoid toISOString UTC drift) ──────────────────────────
function toISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function fromISO(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}
function addDays(s: string, n: number): string {
  const d = fromISO(s);
  d.setDate(d.getDate() + n);
  return toISO(d);
}
function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
/** ISO `a` strictly between `lo` and `hi` (exclusive). */
function isBetween(a: string, lo: string, hi: string): boolean {
  return a > lo && a < hi;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

interface Props {
  value: { checkIn: string; checkOut: string };
  minDate: string;
  onApply: (r: { checkIn: string; checkOut: string }) => void;
  onClose: () => void;
}

export default function DateRangePicker({ value, minDate, onApply, onClose }: Props) {
  const todayISO = toISO(new Date());
  const min = minDate || todayISO;

  const [start, setStart] = useState<string>(value.checkIn || "");
  const [end, setEnd] = useState<string>(value.checkOut || "");
  const [hover, setHover] = useState<string>("");
  const [viewMonth, setViewMonth] = useState<Date>(
    startOfMonth(value.checkIn ? fromISO(value.checkIn) : new Date()),
  );

  const currentMonthStart = startOfMonth(new Date());
  const canGoPrev = viewMonth > currentMonthStart;

  // Build the 6×7 grid for the displayed month
  const firstOfMonth = startOfMonth(viewMonth);
  const leading = firstOfMonth.getDay(); // 0=Sun
  const gridStart = new Date(firstOfMonth);
  gridStart.setDate(gridStart.getDate() - leading);

  const cells: Date[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(gridStart);
    d.setDate(d.getDate() + i);
    cells.push(d);
  }

  // Effective end for range-preview highlight (hover before 2nd click)
  const previewEnd = end || (start && hover && hover > start ? hover : "");

  function handleDayClick(iso: string) {
    if (iso < min) return;
    if (!start || end) {
      // start fresh selection
      setStart(iso);
      setEnd("");
    } else if (iso > start) {
      setEnd(iso);
    } else {
      // clicked on or before start → restart
      setStart(iso);
      setEnd("");
    }
  }

  function applyPreset(checkIn: string, checkOut: string) {
    setStart(checkIn);
    setEnd(checkOut);
    setHover("");
    setViewMonth(startOfMonth(fromISO(checkIn)));
  }

  // ── Presets (tied to discount tiers in pricing.ts) ──────────────────────────
  const nextFriday = (() => {
    const d = fromISO(todayISO);
    const delta = (5 - d.getDay() + 7) % 7 || 7; // next Friday (not today)
    return addDays(todayISO, delta);
  })();
  const presets = [
    { label: "Tonight", ci: todayISO, co: addDays(todayISO, 1) },
    { label: "Weekend", ci: nextFriday, co: addDays(nextFriday, 2) },
    { label: "1 Week", ci: todayISO, co: addDays(todayISO, 7) },
    { label: "1 Month", ci: todayISO, co: addDays(todayISO, 30) },
  ];

  const nights = start && end ? nightsBetween(start, end) : 0;
  const valid = !!start && !!end && end > start;

  return (
    <div className="bg-ink border border-white/10 rounded-2xl shadow-xl p-4 w-full sm:w-[340px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={() => canGoPrev && setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))}
          disabled={!canGoPrev}
          aria-label="Previous month"
          className="p-1.5 rounded-lg text-odyssey-blue hover:bg-white/5 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <p className="font-display font-bold text-ice text-sm">
          {MONTHS[viewMonth.getMonth()]} {viewMonth.getFullYear()}
        </p>
        <button
          type="button"
          onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))}
          aria-label="Next month"
          className="p-1.5 rounded-lg text-odyssey-blue hover:bg-white/5 transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Weekday labels */}
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map((w) => (
          <div key={w} className="text-center text-[11px] font-semibold text-sky-tint/70 py-1">
            {w}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7" onMouseLeave={() => setHover("")}>
        {cells.map((d) => {
          const iso = toISO(d);
          const inMonth = d.getMonth() === viewMonth.getMonth();
          const disabled = iso < min;
          const isStart = iso === start;
          const isEnd = iso === previewEnd;
          const inRange = start && previewEnd && isBetween(iso, start, previewEnd);
          const isToday = iso === todayISO;

          // Background pill segment for the range (sits behind the day circle)
          let pill = "";
          if (inRange) pill = "bg-odyssey-blue/15";
          else if (isStart && previewEnd) pill = "bg-odyssey-blue/15 rounded-l-full";
          else if (isEnd && start) pill = "bg-odyssey-blue/15 rounded-r-full";

          return (
            <div key={iso} className={`relative h-9 flex items-center justify-center ${pill}`}>
              <button
                type="button"
                disabled={disabled}
                onClick={() => handleDayClick(iso)}
                onMouseEnter={() => setHover(iso)}
                className={[
                  "relative z-10 w-8 h-8 flex items-center justify-center text-[13px] rounded-full transition-colors",
                  disabled || !inMonth ? "text-sky-tint/35" : "text-ice",
                  disabled ? "cursor-not-allowed" : "cursor-pointer",
                  isStart || isEnd
                    ? "bg-odyssey-blue !text-white font-bold"
                    : !disabled && inMonth
                      ? "hover:bg-white/10"
                      : "",
                  isToday && !isStart && !isEnd ? "ring-1 ring-odyssey-blue/40" : "",
                ].join(" ")}
              >
                {d.getDate()}
              </button>
            </div>
          );
        })}
      </div>

      {/* Quick presets */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {presets.map((p) => {
          const active = start === p.ci && end === p.co;
          return (
            <button
              key={p.label}
              type="button"
              onClick={() => applyPreset(p.ci, p.co)}
              className={[
                "text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-colors",
                active
                  ? "bg-odyssey-blue/15 text-odyssey-blue border-odyssey-blue/30"
                  : "text-sky-tint border-white/10 hover:border-odyssey-blue/40 hover:text-ice",
              ].join(" ")}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      {/* Fixed times info */}
      <div className="mt-3 flex items-center gap-1.5 text-[11px] text-sky-tint border-t border-white/8 pt-3">
        <Clock size={12} className="text-odyssey-blue shrink-0" />
        <span>
          Check-in <strong className="text-ice/90">{siteConfig.checkIn}</strong> · Check-out{" "}
          <strong className="text-ice/90">{siteConfig.checkOut}</strong>
        </span>
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-xs text-sky-tint">
          {valid ? (
            <span className="font-semibold text-ice">{nights} night{nights !== 1 ? "s" : ""}</span>
          ) : (
            "Select dates"
          )}
        </p>
        <button
          type="button"
          disabled={!valid}
          onClick={() => {
            if (valid) {
              onApply({ checkIn: start, checkOut: end });
              onClose();
            }
          }}
          className="bg-odyssey-blue hover:bg-azure-deep text-white font-bold text-sm px-6 py-2 rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
