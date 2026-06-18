"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Users, Search } from "lucide-react";
import DateRangePicker from "./DateRangePicker";

export interface DateSearch {
  checkIn: string;
  checkOut: string;
  guests: number;
}

interface Props {
  onSearch: (search: DateSearch) => void;
  initial?: Partial<DateSearch>;
}

function fmt(iso: string): string {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export default function DateSearchBar({ onSearch, initial = {} }: Props) {
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const [checkIn, setCheckIn] = useState(initial.checkIn ?? today);
  const [checkOut, setCheckOut] = useState(initial.checkOut ?? tomorrow);
  const [guests, setGuests] = useState(initial.guests ?? 1);
  const [open, setOpen] = useState(false);

  const pickerRef = useRef<HTMLDivElement>(null);

  // Close popover on outside-click or Escape
  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const inputBase =
    "w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-ice placeholder:text-sky-tint/40 focus:outline-none focus:border-odyssey-blue focus:ring-1 focus:ring-odyssey-blue/30 transition-all";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!checkIn || !checkOut) return;
    onSearch({ checkIn, checkOut, guests });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-ink border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row gap-3 items-end"
    >
      {/* Date range trigger + popover */}
      <div className="w-full sm:flex-1 min-w-0 relative" ref={pickerRef}>
        <label className="flex items-center gap-1.5 text-xs font-medium text-sky-tint mb-1.5">
          <Calendar size={11} /> Check In — Check Out
        </label>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={`${inputBase} flex items-center justify-between text-left ${
            open ? "border-odyssey-blue ring-1 ring-odyssey-blue/30" : ""
          }`}
        >
          <span className="truncate">
            <span className="text-ice">{fmt(checkIn)}</span>
            <span className="text-sky-tint/50 mx-2">→</span>
            <span className="text-ice">{fmt(checkOut)}</span>
          </span>
          <Calendar size={14} className="text-sky-tint shrink-0 ml-2" />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute z-50 mt-2 left-0 right-0 sm:right-auto origin-top"
            >
              <DateRangePicker
                value={{ checkIn, checkOut }}
                minDate={today}
                onApply={({ checkIn: ci, checkOut: co }) => {
                  setCheckIn(ci);
                  setCheckOut(co);
                }}
                onClose={() => setOpen(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Guests */}
      <div className="w-full sm:w-32">
        <label className="flex items-center gap-1.5 text-xs font-medium text-sky-tint mb-1.5">
          <Users size={11} /> Beds
        </label>
        <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className={inputBase}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n} className="bg-ink">
              {n} {n === 1 ? "Bed" : "Beds"}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="flex items-center justify-center gap-2 bg-odyssey-blue hover:bg-azure-deep text-white font-semibold px-6 py-2.5 rounded-xl transition-colors whitespace-nowrap h-[42px] w-full sm:w-auto"
      >
        <Search size={15} /> Search
      </button>
    </form>
  );
}
