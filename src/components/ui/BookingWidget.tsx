"use client";

import { useState } from "react";
import { Calendar, Users, ArrowRight, Tag, Sparkles } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/requestToBook";
import { labels } from "@/config/labels";
import { calcBedTotal, nightsBetween, PRICING } from "@/lib/pricing";

const fmt = (n: number) => n.toLocaleString("en-IN");

export default function BookingWidget({ className = "" }: { className?: string }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [beds, setBeds] = useState(1);

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
  const nights = nightsBetween(checkIn, checkOut);
  const pricing = nights > 0 ? calcBedTotal(nights, beds) : null;

  function handleBook(e: React.FormEvent) {
    e.preventDefault();
    const discountNote = pricing?.discountInfo ? ` (${pricing.discountInfo.badge})` : "";
    const href = buildWhatsAppLink({
      checkIn: checkIn || today,
      checkOut: checkOut || tomorrow,
      guests: beds,
      room: `${beds} bed${beds > 1 ? "s" : ""}${discountNote}`,
    });
    window.open(href, "_blank", "noopener,noreferrer");
  }

  const inputCls =
    "w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-ice placeholder:text-sky-tint/40 focus:outline-none focus:border-odyssey-blue transition-colors";

  return (
    <form
      onSubmit={handleBook}
      className={`bg-ink/85 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col gap-3 shadow-2xl ${className}`}
    >
      {/* ── Mobile: 2×2 grid | Desktop: single row ── */}
      <div className="grid grid-cols-2 sm:flex sm:flex-row gap-3 sm:items-end">

        {/* Check In */}
        <div className="min-w-0">
          <label className="flex items-center gap-1 text-xs text-sky-tint font-medium mb-1.5">
            <Calendar size={11} /> {labels.booking.checkIn}
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
        <div className="min-w-0">
          <label className="flex items-center gap-1 text-xs text-sky-tint font-medium mb-1.5">
            <Calendar size={11} /> {labels.booking.checkOut}
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

        {/* Beds */}
        <div className="min-w-0">
          <label className="flex items-center gap-1 text-xs text-sky-tint font-medium mb-1.5">
            <Users size={11} /> Beds
          </label>
          <select
            value={beds}
            onChange={(e) => setBeds(Number(e.target.value))}
            className={inputCls}
            aria-label="Number of beds"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n} className="bg-ink">
                {n} Bed{n > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        {/* CTA */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-odyssey-blue hover:bg-azure-deep text-white font-semibold px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap h-[42px] mt-[22px] sm:mt-0 sm:self-end"
        >
          <span className="hidden sm:inline">{labels.booking.checkAvailability}</span>
          <span className="sm:hidden">Set Sail</span>
          <ArrowRight size={15} />
        </button>
      </div>

      {/* Live pricing panel */}
      {pricing && nights > 0 && (
        <div className="border-t border-white/8 pt-3 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-sky-tint">
              ₹{fmt(PRICING.perBedPerNight)} × {beds} bed{beds > 1 ? "s" : ""} × {nights} night{nights > 1 ? "s" : ""}
            </span>
            <span className="text-sky-tint">₹{fmt(pricing.base)}</span>
          </div>

          {pricing.discountInfo && (
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="flex items-center gap-1.5 text-green-400 font-medium">
                <Tag size={11} />
                {pricing.discountInfo.label} ({pricing.discountInfo.badge})
              </span>
              <span className="text-green-400">−₹{fmt(pricing.discount)}</span>
            </div>
          )}

          <div className="flex items-center justify-between border-t border-white/8 pt-2 mt-0.5">
            <div className="flex items-baseline gap-2">
              <span className="text-ice font-bold text-lg">₹{fmt(pricing.total)}</span>
              {pricing.discountInfo && (
                <span className="text-xs text-sky-tint/40 line-through">₹{fmt(pricing.base)}</span>
              )}
            </div>
            <span className="text-xs text-sky-tint/60">₹{fmt(pricing.perNight)}/bed/night</span>
          </div>
        </div>
      )}

      {/* Discount teasers — shown when no dates yet */}
      {!pricing && (
        <div className="flex gap-2 flex-wrap">
          <span className="flex items-center gap-1.5 text-[11px] bg-green-400/10 border border-green-400/20 text-green-400 px-2.5 py-1 rounded-full font-medium">
            <Sparkles size={10} /> 7 nights → 15% off
          </span>
          <span className="flex items-center gap-1.5 text-[11px] bg-odyssey-blue/10 border border-odyssey-blue/20 text-odyssey-blue px-2.5 py-1 rounded-full font-medium">
            <Sparkles size={10} /> Monthly → 60% off
          </span>
        </div>
      )}
    </form>
  );
}
