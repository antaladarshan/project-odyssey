"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Users, ArrowRight, Sparkles } from "lucide-react";
import { labels } from "@/config/labels";
import { calcBedTotal, nightsBetween, effectiveNightly } from "@/lib/pricing";

const fmt = (n: number) => n.toLocaleString("en-IN");

export default function BookingWidget({ className = "" }: { className?: string }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [beds, setBeds] = useState(1);
  const router = useRouter();

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
  const nights = nightsBetween(checkIn, checkOut);
  const perNight = nights > 0 ? effectiveNightly(nights) : 700;
  const pricing = nights > 0 ? calcBedTotal(nights, beds) : null;

  function handleBook(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    params.set("guests", String(beds));
    router.push(`/property/project-odyssey-ahmedabad/?${params.toString()}`);
  }

  const inputCls =
    "w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-ice placeholder:text-sky-tint/40 focus:outline-none focus:border-odyssey-blue transition-colors";

  return (
    <form
      onSubmit={handleBook}
      className={`bg-ink/85 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col gap-3 shadow-2xl ${className}`}
    >
      <div className="grid grid-cols-2 sm:flex sm:flex-row gap-3 sm:items-end">
        {/* Check In */}
        <div className="min-w-0">
          <label className="flex items-center gap-1 text-xs text-sky-tint font-medium mb-1.5">
            <Calendar size={11} /> {labels.booking.checkIn}
          </label>
          <input type="date" value={checkIn} min={today}
            onChange={(e) => setCheckIn(e.target.value)} className={inputCls} />
        </div>

        {/* Check Out */}
        <div className="min-w-0">
          <label className="flex items-center gap-1 text-xs text-sky-tint font-medium mb-1.5">
            <Calendar size={11} /> {labels.booking.checkOut}
          </label>
          <input type="date" value={checkOut} min={checkIn || tomorrow}
            onChange={(e) => setCheckOut(e.target.value)} className={inputCls} />
        </div>

        {/* Beds */}
        <div className="min-w-0">
          <label className="flex items-center gap-1 text-xs text-sky-tint font-medium mb-1.5">
            <Users size={11} /> Beds
          </label>
          <select value={beds} onChange={(e) => setBeds(Number(e.target.value))} className={inputCls}>
            {[1,2,3,4,5,6].map((n) => (
              <option key={n} value={n} className="bg-ink">{n} Bed{n > 1 ? "s" : ""}</option>
            ))}
          </select>
        </div>

        {/* CTA */}
        <button type="submit"
          className="flex items-center justify-center gap-2 bg-odyssey-blue hover:bg-azure-deep text-white font-semibold px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap h-[42px] mt-[22px] sm:mt-0 sm:self-end">
          <span className="hidden sm:inline">{labels.booking.checkAvailability}</span>
          <span className="sm:hidden">Check</span>
          <ArrowRight size={15} />
        </button>
      </div>

      {/* Live pricing preview */}
      {pricing && nights > 0 && (
        <div className="border-t border-white/8 pt-3 flex items-center justify-between text-sm">
          <span className="text-sky-tint text-xs">
            ₹{fmt(perNight)} × {beds} bed{beds > 1 ? "s" : ""} × {nights} night{nights > 1 ? "s" : ""}
          </span>
          <div className="flex items-center gap-2">
            {pricing.discountInfo && (
              <span className="text-[11px] font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
                {pricing.discountInfo.badge}
              </span>
            )}
            <span className="font-bold text-ice">₹{fmt(pricing.total)}</span>
          </div>
        </div>
      )}

      {/* Discount teasers */}
      {!pricing && (
        <div className="flex gap-2 flex-wrap">
          <span className="flex items-center gap-1.5 text-[11px] bg-green-400/10 border border-green-400/20 text-green-400 px-2.5 py-1 rounded-full font-medium">
            <Sparkles size={10} /> 7 nights → ₹499/night
          </span>
          <span className="flex items-center gap-1.5 text-[11px] bg-odyssey-blue/10 border border-odyssey-blue/20 text-odyssey-blue px-2.5 py-1 rounded-full font-medium">
            <Sparkles size={10} /> Monthly → ₹299/night
          </span>
        </div>
      )}
    </form>
  );
}
