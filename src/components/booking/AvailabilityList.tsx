"use client";

import Image from "next/image";
import { Wifi, Wind, Droplets, Lock, Lamp, Minus, Plus, BedDouble, Users } from "lucide-react";
import { rooms, type Room } from "@/config/property";
import { calcRoomPricing, ODYSSEY_PRICING_CONFIG } from "@/lib/pricing";
import type { RoomTypeAvailability } from "@/app/api/availability/route";

const fmt = (n: number) => n.toLocaleString("en-IN");

function fmtShortDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

const amenityIcons: Record<string, React.ReactNode> = {
  "Wi-Fi": <Wifi size={13} />,
  AC: <Wind size={13} />,
  "Hot Water": <Droplets size={13} />,
  "Privacy Curtain": <span className="text-[11px] font-bold">≡</span>,
  "Reading Light": <Lamp size={13} />,
  Locker: <Lock size={13} />,
};

export interface SelectedRoom {
  roomId: string;
  qty: number;
}

interface Props {
  nights: number;
  selected: SelectedRoom[];
  onChange: (selected: SelectedRoom[]) => void;
  /** Live counts from /api/availability, keyed by room_types.name. Falls back
   *  to each room's static `bedsAvailable` while loading or on fetch failure. */
  liveAvailability?: Record<string, RoomTypeAvailability> | null;
}

function RoomCard({
  room,
  displayName,
  nights,
  qty,
  bedsAvailable,
  nextFreeDate,
  onQtyChange,
}: {
  room: Room;
  displayName: string;
  nights: number;
  qty: number;
  bedsAvailable: number;
  nextFreeDate: string | null;
  onQtyChange: (delta: number) => void;
}) {
  const { perNight, pctOff, roomCharges } = calcRoomPricing(nights, Math.max(qty, 1), room.basePricePerBedPerNight, ODYSSEY_PRICING_CONFIG);
  const soldOut = bedsAvailable === 0;
  const maxQty = Math.min(room.beds, bedsAvailable);

  return (
    <div
      className={`rounded-2xl border bg-ink overflow-hidden flex flex-col sm:flex-row transition-all ${
        soldOut
          ? "border-white/8 opacity-70"
          : "border-white/8 hover:border-odyssey-blue/40 shadow-sm hover:shadow-odyssey-blue/10 hover:shadow-md"
      }`}
    >
      {/* Room image */}
      <div className="relative w-full sm:w-48 h-44 sm:h-auto shrink-0 overflow-hidden bg-abyss">
        <Image
          src={room.images[0]}
          alt={displayName}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 192px"
        />
        {room.badge && (
          <span className="absolute top-2 left-2 bg-odyssey-blue text-white text-[10px] font-bold tracking-wide px-2.5 py-1 rounded-full">
            {room.badge}
          </span>
        )}
        {soldOut && (
          <div className="absolute inset-0 bg-abyss/70 flex items-center justify-center">
            <span className="bg-ink text-coral font-bold text-sm px-4 py-1.5 rounded-full border border-coral/30">
              SOLD OUT
            </span>
          </div>
        )}
      </div>

      {/* Room details */}
      <div className="flex-1 p-4 flex flex-col gap-3">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h3 className="font-display font-bold text-lg text-ice">{displayName}</h3>
            <div className="flex items-center gap-2 text-xs text-sky-tint mt-0.5">
              <span className="flex items-center gap-1">
                <Users size={11} /> {room.capacity} Guests
              </span>
              <span className="opacity-40">·</span>
              <span className="flex items-center gap-1">
                <BedDouble size={11} /> {room.beds}-Bed {room.bedType}
              </span>
              {room.sqft && (
                <>
                  <span className="opacity-40">·</span>
                  <span>{room.sqft} sq ft</span>
                </>
              )}
            </div>
          </div>

          {/* Pricing */}
          {!soldOut && nights > 0 && (
            <div className="text-right shrink-0">
              {pctOff > 0 && (
                <div className="flex items-center justify-end gap-2 mb-0.5">
                  <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
                    {pctOff}% OFF
                  </span>
                  <span className="text-xs text-sky-tint line-through">₹{fmt(room.basePricePerBedPerNight)}</span>
                </div>
              )}
              <p className="text-2xl font-display font-bold text-ice">₹{fmt(perNight)}</p>
              <p className="text-xs text-sky-tint">{nights} night{nights > 1 ? "s" : ""}</p>
              {qty > 0 && (
                <p className="text-xs font-semibold text-odyssey-blue mt-0.5">
                  Total: ₹{fmt(roomCharges)}
                </p>
              )}
            </div>
          )}

          {/* rack rate when no dates selected */}
          {!soldOut && nights === 0 && (
            <div className="text-right shrink-0">
              <p className="text-2xl font-display font-bold text-ice">₹{room.basePricePerBedPerNight}</p>
              <p className="text-xs text-sky-tint">per night</p>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-sky-tint/90 leading-relaxed">{room.description}</p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1.5">
          {room.amenities.map((a) => (
            <span
              key={a}
              className="flex items-center gap-1 text-[11px] bg-white/5 border border-white/10 text-sky-tint px-2 py-0.5 rounded-full"
            >
              {amenityIcons[a] ?? <Wifi size={11} />} {a}
            </span>
          ))}
        </div>

        {/* Availability + CTA row */}
        <div className="flex items-center justify-between gap-3 pt-1 border-t border-white/8 flex-wrap">
          {!soldOut ? (
            <span className="text-sm font-bold text-green-400">
              {bedsAvailable} BEDS AVAILABLE
            </span>
          ) : (
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-bold text-coral">SOLD OUT</span>
              {nextFreeDate && (
                <span className="text-xs text-sky-tint">Next available {fmtShortDate(nextFreeDate)}</span>
              )}
            </div>
          )}

          {!soldOut && (
            <div className="flex items-center gap-3">
              {qty === 0 ? (
                <button
                  onClick={() => onQtyChange(1)}
                  className="bg-odyssey-blue hover:bg-azure-deep text-white font-semibold text-sm px-5 py-2 rounded-xl transition-colors"
                >
                  Add bed
                </button>
              ) : (
                <div className="flex items-center gap-2 bg-white/5 rounded-xl border border-white/10 px-1">
                  <button
                    onClick={() => onQtyChange(-1)}
                    className="p-2 text-ice hover:text-coral transition-colors"
                    aria-label="Remove bed"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-ice font-bold text-sm w-5 text-center">{qty}</span>
                  <button
                    onClick={() => onQtyChange(1)}
                    disabled={qty >= maxQty}
                    className="p-2 text-ice hover:text-odyssey-blue transition-colors disabled:opacity-30"
                    aria-label="Add bed"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AvailabilityList({ nights, selected, onChange, liveAvailability }: Props) {
  function getQty(roomId: string) {
    return selected.find((s) => s.roomId === roomId)?.qty ?? 0;
  }

  function getAvailability(room: Room): RoomTypeAvailability {
    return (
      liveAvailability?.[room.roomTypeId] ?? {
        name: room.name,
        available: room.bedsAvailable,
        nextFreeDate: null,
      }
    );
  }

  function handleQtyChange(room: Room, delta: number) {
    const current = getQty(room.id);
    const next = Math.max(0, Math.min(current + delta, getAvailability(room).available));
    if (next === 0) {
      onChange(selected.filter((s) => s.roomId !== room.id));
    } else {
      const exists = selected.find((s) => s.roomId === room.id);
      if (exists) {
        onChange(selected.map((s) => (s.roomId === room.id ? { ...s, qty: next } : s)));
      } else {
        onChange([...selected, { roomId: room.id, qty: next }]);
      }
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {rooms.map((room) => {
        const { name: displayName, available, nextFreeDate } = getAvailability(room);
        return (
          <RoomCard
            key={room.id}
            room={room}
            displayName={displayName}
            nights={nights}
            qty={getQty(room.id)}
            bedsAvailable={available}
            nextFreeDate={nextFreeDate}
            onQtyChange={(delta) => handleQtyChange(room, delta)}
          />
        );
      })}
    </div>
  );
}
