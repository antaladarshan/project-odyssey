"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { studioSlots } from "@/config/studio";
import { buildStudioWhatsAppLink } from "@/lib/requestToBook";
import { inr, type StudioQuote } from "@/lib/studioPricing";

const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const iso = (y: number, m: number, d: number) =>
  `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

export default function StudioSlotPicker({
  quote,
  type,
  people,
}: {
  quote: StudioQuote;
  type: string;
  people: number;
}) {
  const today = useMemo(() => {
    const t = new Date();
    return new Date(t.getFullYear(), t.getMonth(), t.getDate());
  }, []);
  const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);

  const first = new Date(view.y, view.m, 1);
  const offset = (first.getDay() + 6) % 7; // Monday-first
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array<null>(offset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  const atCurrentMonth = view.y === today.getFullYear() && view.m === today.getMonth();
  const monthLabel = first.toLocaleDateString("en-IN", { month: "long", year: "numeric" });

  const shift = (delta: number) => {
    const d = new Date(view.y, view.m + delta, 1);
    setView({ y: d.getFullYear(), m: d.getMonth() });
  };

  const href = buildStudioWhatsAppLink({
    date: date ?? undefined,
    time: time ?? undefined,
    hours: quote.hours,
    type,
    people,
    total: quote.total,
    advance: quote.advance,
  });
  const ready = !!date && !!time;

  return (
    <section id="book" className="px-4 sm:px-6 py-16 sm:py-20 bg-white scroll-mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col gap-5">
          <h2 className="flex flex-col leading-none">
            <span className="headline-script text-3xl sm:text-4xl">Pick a date. Pick a slot.</span>
            <span className="font-display font-extrabold text-3xl sm:text-5xl text-po-pink -mt-0.5">
              We&apos;ll do the rest.
            </span>
          </h2>
          <p className="text-gray-600 max-w-md">
            Choose your day and start time. We&apos;ll confirm on WhatsApp, and a 50% advance ({inr(quote.advance)}
            {" "}for {quote.hours} hr{quote.hours > 1 ? "s" : ""}) locks it in.
          </p>
          <a
            href={ready ? href : undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!ready}
            className={`self-start inline-flex items-center gap-2 font-bold px-8 py-3 rounded-full transition-colors ${
              ready
                ? "bg-po-pink hover:bg-po-pink-dark text-white"
                : "bg-gray-200 text-gray-500 pointer-events-none"
            }`}
          >
            <MessageCircle size={18} /> {ready ? "Book on WhatsApp" : "Select a date and time"}
          </a>
        </div>

        <div className="rounded-3xl bg-po-cream p-5 sm:p-7 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => shift(-1)}
              disabled={atCurrentMonth}
              aria-label="Previous month"
              className="p-2 rounded-full hover:bg-white disabled:opacity-30"
            >
              <ChevronLeft size={18} />
            </button>
            <p className="font-display font-bold text-po-ink">{monthLabel}</p>
            <button
              type="button"
              onClick={() => shift(1)}
              aria-label="Next month"
              className="p-2 rounded-full hover:bg-white"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-gray-400 mb-1">
            {DAYS.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((d, i) => {
              if (d === null) return <span key={`b${i}`} />;
              const v = iso(view.y, view.m, d);
              const past = new Date(view.y, view.m, d) < today;
              const sel = v === date;
              return (
                <button
                  key={v}
                  type="button"
                  disabled={past}
                  onClick={() => setDate(v)}
                  aria-pressed={sel}
                  className={`aspect-square rounded-full text-sm font-semibold transition-colors ${
                    sel
                      ? "bg-po-pink text-white"
                      : past
                        ? "text-gray-300"
                        : "text-po-ink hover:bg-white"
                  }`}
                >
                  {d}
                </button>
              );
            })}
          </div>

          <p className="mt-5 mb-2 text-xs font-bold tracking-widest uppercase text-po-pink">Start time</p>
          <div className="flex flex-wrap gap-2">
            {studioSlots.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setTime(s)}
                aria-pressed={time === s}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                  time === s
                    ? "bg-po-pink border-po-pink text-white"
                    : "bg-white border-gray-200 text-po-ink hover:border-po-pink"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
