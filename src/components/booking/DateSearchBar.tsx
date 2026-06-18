"use client";

import { useState } from "react";
import { Calendar, Users, Search } from "lucide-react";

export interface DateSearch {
  checkIn: string;
  checkOut: string;
  guests: number;
}

interface Props {
  onSearch: (search: DateSearch) => void;
  initial?: Partial<DateSearch>;
}

export default function DateSearchBar({ onSearch, initial = {} }: Props) {
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const [checkIn, setCheckIn] = useState(initial.checkIn ?? today);
  const [checkOut, setCheckOut] = useState(initial.checkOut ?? tomorrow);
  const [guests, setGuests] = useState(initial.guests ?? 1);

  const inputBase =
    "w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-ice placeholder:text-sky-tint/40 focus:outline-none focus:border-odyssey-blue focus:ring-1 focus:ring-odyssey-blue/30 transition-all";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!checkIn || !checkOut) return;
    onSearch({ checkIn, checkOut, guests });
  }

  return (
    <form onSubmit={handleSubmit}
      className="bg-ink border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row gap-3 items-end">
      {/* Check In */}
      <div className="flex-1 min-w-0">
        <label className="flex items-center gap-1.5 text-xs font-medium text-sky-tint mb-1.5">
          <Calendar size={11} /> Check In
        </label>
        <input type="date" value={checkIn} min={today}
          onChange={(e) => {
            setCheckIn(e.target.value);
            if (checkOut && e.target.value >= checkOut) {
              setCheckOut(new Date(new Date(e.target.value).getTime() + 86400000).toISOString().split("T")[0]);
            }
          }}
          className={inputBase} required />
      </div>

      {/* Check Out */}
      <div className="flex-1 min-w-0">
        <label className="flex items-center gap-1.5 text-xs font-medium text-sky-tint mb-1.5">
          <Calendar size={11} /> Check Out
        </label>
        <input type="date" value={checkOut} min={checkIn || tomorrow}
          onChange={(e) => setCheckOut(e.target.value)}
          className={inputBase} required />
      </div>

      {/* Guests */}
      <div className="w-full sm:w-32">
        <label className="flex items-center gap-1.5 text-xs font-medium text-sky-tint mb-1.5">
          <Users size={11} /> Beds
        </label>
        <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className={inputBase}>
          {[1,2,3,4,5,6].map((n) => (
            <option key={n} value={n} className="bg-ink">{n} {n === 1 ? "Bed" : "Beds"}</option>
          ))}
        </select>
      </div>

      <button type="submit"
        className="flex items-center justify-center gap-2 bg-odyssey-blue hover:bg-azure-deep text-white font-semibold px-6 py-2.5 rounded-xl transition-colors whitespace-nowrap h-[42px] w-full sm:w-auto">
        <Search size={15} /> Search
      </button>
    </form>
  );
}
