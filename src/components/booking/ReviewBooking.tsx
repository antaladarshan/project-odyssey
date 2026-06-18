"use client";

import { useState } from "react";
import { Tag, ArrowLeft } from "lucide-react";
import { rooms } from "@/config/property";
import { calcRoomPricing, calcBilling, WORKATION_MIN_NIGHTS, ODYSSEY_PRICING_CONFIG } from "@/lib/pricing";
import { buildWhatsAppLink } from "@/lib/requestToBook";
import type { SelectedRoom } from "./AvailabilityList";

const fmt = (n: number) => n.toLocaleString("en-IN");

interface Props {
  checkIn: string;
  checkOut: string;
  nights: number;
  selected: SelectedRoom[];
  workation: boolean;
  onWorkationToggle: (v: boolean) => void;
  onBack: () => void;
}

export default function ReviewBooking({
  checkIn,
  checkOut,
  nights,
  selected,
  workation,
  onWorkationToggle,
  onBack,
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consented, setConsented] = useState(false);

  const lineItems = selected
    .map((s) => {
      const room = rooms.find((r) => r.id === s.roomId);
      if (!room) return null;
      const { perNight, pctOff, roomCharges } = calcRoomPricing(nights, s.qty, room.basePricePerBedPerNight, ODYSSEY_PRICING_CONFIG);
      return { room, qty: s.qty, perNight, pctOff, roomCharges };
    })
    .filter(Boolean) as Array<{
    room: (typeof rooms)[0];
    qty: number;
    perNight: number;
    pctOff: number;
    roomCharges: number;
  }>;

  const totalRoomCharges = lineItems.reduce((sum, l) => sum + l.roomCharges, 0);
  const billing = calcBilling({ roomCharges: totalRoomCharges, nights, workation, config: ODYSSEY_PRICING_CONFIG });

  function fmtDate(d: string) {
    return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  }

  function handleBook(e: React.FormEvent) {
    e.preventDefault();
    const roomSummary = lineItems
      .map((l) => `${l.room.name} ×${l.qty} (₹${fmt(l.perNight)}/night × ${nights}n = ₹${fmt(l.roomCharges)})`)
      .join(", ");

    const href = buildWhatsAppLink({
      checkIn,
      checkOut,
      guestName: name,
      guests: selected.reduce((s, r) => s + r.qty, 0),
      room: roomSummary,
      extraNote: [
        workation && billing.workationEligible
          ? `WORKATION discount: −₹${fmt(billing.workationDiscount)}`
          : "",
        `Total: ₹${fmt(billing.totalPrice)}`,
        phone ? `Phone: ${phone}` : "",
        email ? `Email: ${email}` : "",
      ]
        .filter(Boolean)
        .join(" | "),
    });
    window.open(href, "_blank", "noopener,noreferrer");
  }

  const inputCls =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-ice placeholder:text-sky-tint/40 focus:outline-none focus:border-odyssey-blue focus:ring-2 focus:ring-odyssey-blue/20 transition-all";

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
      {/* Left — guest form */}
      <form onSubmit={handleBook} className="flex flex-col gap-6">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-sky-tint hover:text-ice transition-colors w-fit"
        >
          <ArrowLeft size={15} /> Back
        </button>

        <h2 className="font-display font-bold text-2xl text-ice">Review your booking</h2>

        {/* Guest details */}
        <div className="bg-ink border border-white/10 rounded-2xl p-5 flex flex-col gap-4">
          <h3 className="font-semibold text-ice">Guest details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-sky-tint uppercase tracking-wider mb-1.5 block">
                First name
              </label>
              <input
                className={inputCls}
                placeholder="First name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-sky-tint uppercase tracking-wider mb-1.5 block">
                Last name
              </label>
              <input className={inputCls} placeholder="Last name" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-sky-tint uppercase tracking-wider mb-1.5 block">
                Email
              </label>
              <input
                type="email"
                className={inputCls}
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="text-[11px] text-sky-tint mt-1">Confirmation will be sent here</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-sky-tint uppercase tracking-wider mb-1.5 block">
                Phone number
              </label>
              <input
                type="tel"
                className={inputCls}
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={consented}
              onChange={(e) => setConsented(e.target.checked)}
              className="mt-0.5 accent-odyssey-blue"
              required
            />
            <p className="text-xs text-sky-tint leading-relaxed">
              I consent to the collection of my personal data and confirm that{" "}
              <strong className="text-ice">all guests are above 18 years old</strong>.
            </p>
          </label>
        </div>

        {/* Coupon codes */}
        <div className="bg-ink border border-white/10 rounded-2xl p-5 flex flex-col gap-4">
          <h3 className="font-semibold text-ice flex items-center gap-2">
            <Tag size={15} className="text-odyssey-blue" /> Available coupons
          </h3>

          <label
            className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
              billing.workationEligible
                ? workation
                  ? "border-odyssey-blue bg-odyssey-blue/10"
                  : "border-white/10 hover:border-odyssey-blue/40"
                : "border-white/8 opacity-50 cursor-not-allowed"
            }`}
          >
            <input
              type="radio"
              name="coupon"
              checked={workation}
              onChange={() => billing.workationEligible && onWorkationToggle(!workation)}
              className="mt-0.5 accent-odyssey-blue"
              disabled={!billing.workationEligible}
            />
            <div>
              <p className="text-sm font-bold text-ice">WORKATION</p>
              <p className="text-xs text-green-400 font-semibold">Flat 15% off on workation plans</p>
              {!billing.workationEligible && (
                <p className="text-xs text-coral mt-0.5">
                  Coupon is valid for minimum {WORKATION_MIN_NIGHTS} nights
                </p>
              )}
            </div>
          </label>

          {workation && billing.workationEligible && (
            <p className="text-xs text-green-400 font-semibold flex items-center gap-1">
              ✓ Coupon applied
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-odyssey-blue hover:bg-azure-deep text-white font-bold py-4 rounded-xl text-base transition-colors"
        >
          Continue to WhatsApp →
        </button>
      </form>

      {/* Right — sticky summary */}
      <div className="bg-ink border border-white/10 rounded-2xl overflow-hidden shadow-xl sticky top-24">
        <div className="bg-abyss px-5 py-4 border-b border-white/8">
          <p className="text-xs font-bold tracking-widest uppercase text-sky-tint">Summary</p>
        </div>
        <div className="p-5 flex flex-col gap-3 text-sm">
          {/* Dates */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-sky-tint uppercase tracking-wider">Check In</p>
              <p className="font-bold text-ice">{fmtDate(checkIn)}</p>
            </div>
            <span className="bg-odyssey-blue/20 text-odyssey-blue text-xs font-bold px-3 py-1 rounded-full border border-odyssey-blue/30">
              {nights} Night{nights > 1 ? "s" : ""}
            </span>
            <div className="text-right">
              <p className="text-xs text-sky-tint uppercase tracking-wider">Check Out</p>
              <p className="font-bold text-ice">{fmtDate(checkOut)}</p>
            </div>
          </div>

          {/* Room lines */}
          {lineItems.map(({ room, qty, perNight, pctOff, roomCharges }) => (
            <div key={room.id} className="border-t border-white/10 pt-3">
              <div className="flex justify-between">
                <p className="font-semibold text-ice">{room.name}</p>
                <p className="text-xs text-sky-tint line-through">
                  ₹{fmt(room.basePricePerBedPerNight * nights * qty)}
                </p>
              </div>
              <div className="flex justify-between text-xs text-sky-tint">
                <span>₹{fmt(perNight)}/night × {qty} {qty === 1 ? "Bed" : "Beds"}</span>
                <span className="text-green-400 font-semibold">{pctOff}% off ₹{fmt(roomCharges)}</span>
              </div>
            </div>
          ))}

          <div className="border-t border-white/10 pt-3 flex flex-col gap-2">
            <div className="flex justify-between text-sky-tint">
              <span>Room charges</span>
              <span>₹{fmt(billing.roomCharges)}</span>
            </div>
            {billing.workationDiscount > 0 && (
              <div className="flex justify-between text-green-400 font-semibold">
                <span>Coupon (WORKATION)</span>
                <span>−₹{fmt(billing.workationDiscount)}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-white/10 pt-2 mt-1">
              <span className="font-bold text-ice text-base">Total price</span>
              <span className="font-bold text-odyssey-blue text-xl">₹{fmt(billing.totalPrice)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
