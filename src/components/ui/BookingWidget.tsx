"use client";

import { useState } from "react";
import { Calendar, Users, ArrowRight } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/requestToBook";
import { labels } from "@/config/labels";

export default function BookingWidget({ className = "" }: { className?: string }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  function handleBook(e: React.FormEvent) {
    e.preventDefault();
    const href = buildWhatsAppLink({
      checkIn: checkIn || today,
      checkOut: checkOut || tomorrow,
      guests,
    });
    window.open(href, "_blank", "noopener,noreferrer");
  }

  const inputCls =
    "w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-ice placeholder:text-sky-tint/50 focus:outline-none focus:border-odyssey-blue transition-colors";

  return (
    <form
      onSubmit={handleBook}
      className={`bg-ink/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row gap-3 items-end shadow-2xl ${className}`}
    >
      {/* Check In */}
      <div className="flex-1 min-w-0">
        <label className="flex items-center gap-1.5 text-xs text-sky-tint font-medium mb-1.5">
          <Calendar size={12} />
          {labels.booking.checkIn}
        </label>
        <input
          type="date"
          value={checkIn}
          min={today}
          onChange={(e) => setCheckIn(e.target.value)}
          className={inputCls}
          aria-label="Check-in date"
        />
      </div>

      {/* Check Out */}
      <div className="flex-1 min-w-0">
        <label className="flex items-center gap-1.5 text-xs text-sky-tint font-medium mb-1.5">
          <Calendar size={12} />
          {labels.booking.checkOut}
        </label>
        <input
          type="date"
          value={checkOut}
          min={checkIn || tomorrow}
          onChange={(e) => setCheckOut(e.target.value)}
          className={inputCls}
          aria-label="Check-out date"
        />
      </div>

      {/* Guests */}
      <div className="w-28 shrink-0">
        <label className="flex items-center gap-1.5 text-xs text-sky-tint font-medium mb-1.5">
          <Users size={12} />
          {labels.booking.guests}
        </label>
        <select
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className={inputCls}
          aria-label="Number of guests"
        >
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n} className="bg-ink">
              {n} {n === 1 ? "Guest" : "Guests"}
            </option>
          ))}
        </select>
      </div>

      {/* CTA */}
      <button
        type="submit"
        className="shrink-0 flex items-center gap-2 bg-odyssey-blue hover:bg-azure-deep text-white font-semibold px-6 py-3 rounded-xl transition-colors whitespace-nowrap"
      >
        {labels.booking.checkAvailability}
        <ArrowRight size={16} />
      </button>
    </form>
  );
}
