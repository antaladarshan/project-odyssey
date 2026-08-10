"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Users, ArrowRight, Sparkles } from "lucide-react";
import { labels } from "@/config/labels";
import { calcBedTotal, nightsBetween, effectiveNightly } from "@/lib/pricing";
import { useLivePricing, FALLBACK_BASE_RATE } from "@/lib/useLivePricing";
import DateRangePicker from "@/components/booking/DateRangePicker";

const fmt = (n: number) => n.toLocaleString("en-IN");
const POPOVER_W = 340;
const POPOVER_H = 470; // estimate used before the popover has measured its real height

function fmtDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export default function BookingWidget({ className = "" }: { className?: string }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [beds, setBeds] = useState(1);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: POPOVER_W });
  const router = useRouter();

  const triggerRef = useRef<HTMLButtonElement>(null);
  const popRef = useRef<HTMLDivElement>(null);

  const livePricing = useLivePricing();
  const baseRates = Object.values(livePricing.basePriceByRoomTypeId);
  const baseRate = baseRates.length > 0 ? Math.min(...baseRates) : FALLBACK_BASE_RATE;

  const today = new Date().toISOString().split("T")[0];
  const nights = nightsBetween(checkIn, checkOut);
  const perNight = nights > 0 ? effectiveNightly(nights, livePricing.config, baseRate) : baseRate;
  const pricing = nights > 0 ? calcBedTotal(nights, beds, livePricing.config, baseRate, checkIn) : null;

  useEffect(() => setMounted(true), []);

  // Position the portal popover, flipping above the trigger when there isn't
  // enough room below, and clamping into the viewport as a last resort.
  useLayoutEffect(() => {
    if (!open) return;
    function place() {
      const t = triggerRef.current?.getBoundingClientRect();
      if (!t) return;
      const popH = popRef.current?.offsetHeight || POPOVER_H;
      const width = Math.min(POPOVER_W, window.innerWidth - 16);
      const left = Math.max(8, Math.min(t.left, window.innerWidth - width - 8));
      const spaceBelow = window.innerHeight - t.bottom;
      const spaceAbove = t.top;
      let top: number;
      if (spaceBelow >= popH + 12) top = t.bottom + 8; // open downward
      else if (spaceAbove >= popH + 12) top = t.top - popH - 8; // flip upward
      else top = Math.max(8, window.innerHeight - popH - 8); // clamp into view
      setCoords({ top, left, width });
    }
    place();
    const raf = requestAnimationFrame(place); // re-measure with real height
    window.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
    };
  }, [open]);

  // Close on outside-click (trigger or popover) or Escape.
  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      const target = e.target as Node;
      if (triggerRef.current?.contains(target)) return;
      if (popRef.current?.contains(target)) return;
      setOpen(false);
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
      className={`relative z-30 bg-ink/85 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col gap-3 shadow-2xl ${className}`}
    >
      <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
        {/* Date range trigger (popover rendered via portal below) */}
        <div className="flex-1 min-w-0">
          <label className="flex items-center gap-1 text-xs text-sky-tint font-medium mb-1.5">
            <Calendar size={11} /> Check In — Check Out
          </label>
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            className={`${inputCls} flex items-center justify-between text-left ${
              open ? "border-odyssey-blue ring-1 ring-odyssey-blue/30" : ""
            }`}
          >
            {checkIn && checkOut ? (
              <span className="truncate">
                <span className="text-ice">{fmtDate(checkIn)}</span>
                <span className="text-sky-tint/50 mx-2">→</span>
                <span className="text-ice">{fmtDate(checkOut)}</span>
              </span>
            ) : (
              <span className="text-sky-tint/50">Add dates</span>
            )}
            <Calendar size={14} className="text-sky-tint shrink-0 ml-2" />
          </button>
        </div>

        {/* Beds */}
        <div className="w-full sm:w-28 min-w-0">
          <label className="flex items-center gap-1 text-xs text-sky-tint font-medium mb-1.5">
            <Users size={11} /> Beds
          </label>
          <select value={beds} onChange={(e) => setBeds(Number(e.target.value))} className={inputCls}>
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
          className="flex items-center justify-center gap-2 bg-odyssey-blue hover:bg-azure-deep text-white font-semibold px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap h-[42px] w-full sm:w-auto"
        >
          <span className="hidden sm:inline">{labels.booking.checkAvailability}</span>
          <span className="sm:hidden">Check Availability</span>
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
            <Sparkles size={10} /> 7 nights → ₹{fmt(effectiveNightly(7, livePricing.config, baseRate))}/night
          </span>
          <span className="flex items-center gap-1.5 text-[11px] bg-odyssey-blue/10 border border-odyssey-blue/20 text-odyssey-blue px-2.5 py-1 rounded-full font-medium">
            <Sparkles size={10} /> Monthly → ₹{fmt(effectiveNightly(27, livePricing.config, baseRate))}/night
          </span>
        </div>
      )}

      {/* Calendar popover — portaled to <body> so the hero's overflow-hidden can't clip it */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                ref={popRef}
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                style={{
                  position: "fixed",
                  top: coords.top,
                  left: coords.left,
                  width: coords.width,
                  maxHeight: "calc(100dvh - 16px)",
                  overflowY: "auto",
                  zIndex: 60,
                }}
                className="origin-top"
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
          </AnimatePresence>,
          document.body,
        )}
    </form>
  );
}
