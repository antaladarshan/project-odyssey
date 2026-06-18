"use client";

import { Tag } from "lucide-react";
import { rooms } from "@/config/property";
import { calcRoomPricing, calcBilling, WORKATION_MIN_NIGHTS, ODYSSEY_PRICING_CONFIG } from "@/lib/pricing";
import type { SelectedRoom } from "./AvailabilityList";

const fmt = (n: number) => n.toLocaleString("en-IN");

interface Props {
  checkIn: string;
  checkOut: string;
  nights: number;
  selected: SelectedRoom[];
  workation: boolean;
  onWorkationToggle: (v: boolean) => void;
  onReview: () => void;
}

export default function BookingSummary({
  checkIn,
  checkOut,
  nights,
  selected,
  workation,
  onWorkationToggle,
  onReview,
}: Props) {
  const hasSelection = selected.length > 0 && nights > 0;

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
    if (!d) return "—";
    return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  }

  return (
    <div className="bg-ink border border-white/10 rounded-2xl overflow-hidden shadow-xl sticky top-24">
      {/* Header */}
      <div className="bg-abyss px-5 py-4 border-b border-white/8">
        <p className="text-xs font-bold tracking-widest uppercase text-sky-tint">Summary</p>
      </div>

      <div className="p-5 flex flex-col gap-4">
        {/* Date pill */}
        {checkIn && checkOut && (
          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="text-xs text-sky-tint uppercase tracking-wider font-semibold">Check In</p>
              <p className="font-bold text-ice">{fmtDate(checkIn)}</p>
            </div>
            <div className="bg-odyssey-blue/20 text-odyssey-blue text-xs font-bold px-3 py-1 rounded-full border border-odyssey-blue/30">
              {nights} Night{nights > 1 ? "s" : ""}
            </div>
            <div className="text-right">
              <p className="text-xs text-sky-tint uppercase tracking-wider font-semibold">Check Out</p>
              <p className="font-bold text-ice">{fmtDate(checkOut)}</p>
            </div>
          </div>
        )}

        {!hasSelection && (
          <p className="text-sm text-sky-tint text-center py-6">
            Add a bed to see your summary.
          </p>
        )}

        {hasSelection && (
          <>
            {/* Room line items */}
            <div className="flex flex-col gap-2">
              {lineItems.map(({ room, qty, perNight, pctOff, roomCharges }) => (
                <div key={room.id} className="flex flex-col gap-0.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-ice">{room.name}</p>
                      <p className="text-xs text-sky-tint">
                        ₹{fmt(perNight)}/night × {qty} {qty === 1 ? "Bed" : "Beds"}
                        {pctOff > 0 && (
                          <span className="ml-1 text-green-400 font-semibold">{pctOff}% off</span>
                        )}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-ice shrink-0">₹{fmt(roomCharges)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-3 flex flex-col gap-2 text-sm">
              <div className="flex justify-between text-sky-tint">
                <span>Room charges</span>
                <span>₹{fmt(billing.roomCharges)}</span>
              </div>

              {billing.workationEligible && billing.workationDiscount > 0 && (
                <div className="flex justify-between text-green-400 font-semibold">
                  <span className="flex items-center gap-1">
                    <Tag size={12} /> Coupon (WORKATION)
                  </span>
                  <span>−₹{fmt(billing.workationDiscount)}</span>
                </div>
              )}

              <div className="flex justify-between border-t border-white/10 pt-2 mt-1">
                <span className="font-bold text-ice text-base">Total price</span>
                <span className="font-bold text-odyssey-blue text-lg">₹{fmt(billing.totalPrice)}</span>
              </div>
            </div>

            {/* WORKATION toggle */}
            <div className="border border-dashed border-odyssey-blue/40 rounded-xl p-3 flex flex-col gap-1.5 bg-odyssey-blue/5">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={workation}
                  onChange={(e) => onWorkationToggle(e.target.checked)}
                  disabled={!billing.workationEligible}
                  className="mt-0.5 accent-odyssey-blue"
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
            </div>

            {/* Review booking CTA */}
            <button
              onClick={onReview}
              className="w-full bg-odyssey-blue hover:bg-azure-deep text-white font-bold py-3.5 rounded-xl transition-colors text-sm tracking-wide"
            >
              Review booking →
            </button>
          </>
        )}
      </div>
    </div>
  );
}
