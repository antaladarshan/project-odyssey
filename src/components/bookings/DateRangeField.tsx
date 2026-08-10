"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { addDays, formatShortDate, parseISODate, toISODate } from "@/lib/dates";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

const DURATION_PRESETS = [
  { label: "1 Month", months: 1 },
  { label: "2 Months", months: 2 },
  { label: "3 Months", months: 3 },
  { label: "4 Months", months: 4 },
  { label: "6 Months", months: 6 },
  { label: "1 Year", months: 12 },
];

export interface DateRangeFieldProps {
  checkinDate: string;
  checkoutDate: string;
  error?: string;
  /** Fired whenever the (possibly still-incomplete) selection changes — lets
   *  a parent mirror the dates for its own purposes (e.g. a live availability
   *  check) without becoming the source of truth for the submitted form
   *  fields, which stay owned by this component's hidden inputs. */
  onDatesChange?: (checkIn: string, checkOut: string) => void;
}

export function DateRangeField({ checkinDate, checkoutDate, error, onDatesChange }: DateRangeFieldProps) {
  const [checkIn, setCheckIn] = useState(checkinDate);
  const [checkOut, setCheckOut] = useState(checkoutDate);
  const [open, setOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(startOfMonth(parseISODate(checkinDate)));

  const nights =
    checkIn && checkOut
      ? Math.round((parseISODate(checkOut).getTime() - parseISODate(checkIn).getTime()) / 86_400_000)
      : 0;

  const firstOfMonth = startOfMonth(viewMonth);
  const gridStart = addDays(firstOfMonth, -firstOfMonth.getDay());
  const cells = Array.from({ length: 42 }, (_, i) => addDays(gridStart, i));

  function handleDayClick(iso: string) {
    if (!checkIn || checkOut) {
      setCheckIn(iso);
      setCheckOut("");
      onDatesChange?.(iso, "");
    } else if (iso > checkIn) {
      setCheckOut(iso);
      onDatesChange?.(checkIn, iso);
    } else {
      setCheckIn(iso);
      setCheckOut("");
      onDatesChange?.(iso, "");
    }
  }

  // Jump straight to "checkout = checkin + N months" — much faster than
  // clicking "next month" repeatedly to extend a stay by a year, say.
  function applyDurationPreset(months: number) {
    if (!checkIn) return;
    const newCheckOut = toISODate(addMonths(parseISODate(checkIn), months));
    setCheckOut(newCheckOut);
    setViewMonth(startOfMonth(parseISODate(newCheckOut)));
    onDatesChange?.(checkIn, newCheckOut);
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-ink-navy">Dates</span>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center justify-between gap-2 rounded-lg border bg-surface-white px-3 py-2.5 text-left text-sm text-charcoal transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-bronze ${
          open ? "border-bronze ring-2 ring-bronze/30" : "border-ink-navy/15"
        }`}
      >
        <span>
          {checkIn ? formatShortDate(checkIn) : "Check-in"}
          <span className="mx-2 text-charcoal/40">→</span>
          {checkOut ? formatShortDate(checkOut) : "Check-out"}
        </span>
        <Calendar size={15} className="shrink-0 text-charcoal/50" />
      </button>

      <input type="hidden" name="checkin_date" value={checkIn} />
      <input type="hidden" name="checkout_date" value={checkOut} />

      {error && <p className="text-sm text-oxide">{error}</p>}

      {open && (
        <div className="mt-1 rounded-2xl border border-ink-navy/10 bg-surface-white p-4 shadow-card">
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))}
              aria-label="Previous month"
              className="rounded-lg p-1.5 text-bronze transition-colors hover:bg-ink-navy/5"
            >
              <ChevronLeft size={18} />
            </button>
            <p className="font-serif text-sm font-semibold text-ink-navy">
              {MONTHS[viewMonth.getMonth()]} {viewMonth.getFullYear()}
            </p>
            <button
              type="button"
              onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))}
              aria-label="Next month"
              className="rounded-lg p-1.5 text-bronze transition-colors hover:bg-ink-navy/5"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="mb-1 grid grid-cols-7">
            {WEEKDAYS.map((w, i) => (
              <div key={i} className="py-1 text-center text-[11px] font-semibold text-charcoal/45">
                {w}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {cells.map((d) => {
              const iso = toISODate(d);
              const inMonth = d.getMonth() === viewMonth.getMonth();
              const isStart = iso === checkIn;
              const isEnd = iso === checkOut;
              const inRange = Boolean(checkIn && checkOut && iso > checkIn && iso < checkOut);

              let pill = "";
              if (inRange) pill = "bg-bronze/15";
              else if (isStart && checkOut) pill = "bg-bronze/15 rounded-l-full";
              else if (isEnd && checkIn) pill = "bg-bronze/15 rounded-r-full";

              return (
                <div key={iso} className={`relative flex h-9 items-center justify-center ${pill}`}>
                  <button
                    type="button"
                    onClick={() => handleDayClick(iso)}
                    className={[
                      "relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-[13px] transition-colors",
                      inMonth ? "text-charcoal" : "text-charcoal/30",
                      isStart || isEnd
                        ? "bg-bronze font-semibold !text-surface-white"
                        : "hover:bg-ink-navy/5",
                    ].join(" ")}
                  >
                    {d.getDate()}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-3 border-t border-ink-navy/10 pt-3">
            <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-charcoal/45">
              Set check-out from check-in
            </p>
            <div className="flex flex-wrap gap-1.5">
              {DURATION_PRESETS.map((p) => {
                const active =
                  Boolean(checkIn) && checkOut === toISODate(addMonths(parseISODate(checkIn), p.months));
                return (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => applyDurationPreset(p.months)}
                    className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                      active
                        ? "border-bronze/40 bg-bronze/15 text-bronze"
                        : "border-ink-navy/15 text-charcoal/70 hover:border-bronze/40 hover:text-bronze"
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3 border-t border-ink-navy/10 pt-3">
            <p className="text-xs text-charcoal/60">
              {checkIn && checkOut && checkOut > checkIn
                ? `${nights} night${nights !== 1 ? "s" : ""}`
                : "Pick check-in, then check-out"}
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              disabled={!checkIn || !checkOut || checkOut <= checkIn}
              className="rounded-lg bg-bronze px-4 py-1.5 text-sm font-medium text-surface-white shadow-soft disabled:pointer-events-none disabled:opacity-40"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
