"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Wifi, Wind, Droplets, Lock, Lamp, Coffee, UtensilsCrossed,
  Users, BedDouble, ChevronDown, ChevronUp, Sparkles, Tag,
} from "lucide-react";
import { useState } from "react";
import { rooms } from "@/config/property";
import { labels } from "@/config/labels";
import { buildWhatsAppLink } from "@/lib/requestToBook";
import { getDiscount, effectiveNightly } from "@/lib/pricing";
import { useLivePricing, resolveBasePrice, FALLBACK_BASE_RATE } from "@/lib/useLivePricing";

// Night counts for the tier badges/summary below — mirrors the fixed
// thresholds in useLivePricing.ts (7/14/27), which match the PMS's Pricing
// settings page.
const TIER_NIGHTS = [7, 14, 27] as const;

const fmt = (n: number) => n.toLocaleString("en-IN");

const amenityIcons: Record<string, React.ReactNode> = {
  "Wi-Fi": <Wifi size={14} />,
  AC: <Wind size={14} />,
  "Hot Water": <Droplets size={14} />,
  "Privacy Curtain": <span className="text-[11px] font-bold">≡</span>,
  "Reading Light": <Lamp size={14} />,
  Locker: <Lock size={14} />,
  Coffee: <Coffee size={14} />,
  Kitchen: <UtensilsCrossed size={14} />,
};

function BedIcon({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <BedDouble key={i} size={13} className="text-odyssey-blue" />
      ))}
    </div>
  );
}

// SVG bunk-bed illustration matching the brand theme
function BunkBedSVG({ beds, className = "" }: { beds: number; className?: string }) {
  const pairs = beds === 6 ? 3 : 2;
  const w = pairs === 3 ? 240 : 180;

  return (
    <svg viewBox={`0 0 ${w} 130`} className={className} aria-hidden>
      {Array.from({ length: pairs }).map((_, i) => {
        const x = 12 + i * (w / pairs);
        return (
          <g key={i}>
            {/* Frame vertical */}
            <rect x={x} y={8} width={4} height={112} rx={2} fill="#1060C0" opacity={0.7} />
            <rect x={x + 46} y={8} width={4} height={112} rx={2} fill="#1060C0" opacity={0.7} />
            {/* Top bunk platform */}
            <rect x={x} y={28} width={50} height={6} rx={2} fill="#3078B8" />
            {/* Top mattress */}
            <rect x={x + 2} y={14} width={46} height={14} rx={3} fill="#0A0E14" stroke="#48A0C8" strokeWidth={1} />
            {/* Top pillow */}
            <rect x={x + 4} y={16} width={12} height={8} rx={2} fill="#48A0C8" opacity={0.6} />
            {/* Top curtain */}
            <rect x={x} y={8} width={3} height={22} rx={1} fill="#58B0E0" opacity={0.5} />
            {/* Bottom bunk platform */}
            <rect x={x} y={88} width={50} height={6} rx={2} fill="#3078B8" />
            {/* Bottom mattress */}
            <rect x={x + 2} y={72} width={46} height={16} rx={3} fill="#0A0E14" stroke="#48A0C8" strokeWidth={1} />
            {/* Bottom pillow */}
            <rect x={x + 4} y={74} width={12} height={8} rx={2} fill="#48A0C8" opacity={0.6} />
            {/* Bottom curtain */}
            <rect x={x} y={68} width={3} height={26} rx={1} fill="#58B0E0" opacity={0.5} />
            {/* Ladder */}
            <rect x={x + 44} y={34} width={3} height={40} rx={1} fill="#48A0C8" opacity={0.4} />
            <rect x={x + 40} y={44} width={10} height={2} rx={1} fill="#48A0C8" opacity={0.4} />
            <rect x={x + 40} y={56} width={10} height={2} rx={1} fill="#48A0C8" opacity={0.4} />
            {/* Under-bed storage */}
            <rect x={x + 4} y={96} width={14} height={10} rx={1} fill="#1060C0" opacity={0.5} />
            <rect x={x + 20} y={96} width={14} height={10} rx={1} fill="#1060C0" opacity={0.5} />
            {/* Reading light dot */}
            <circle cx={x + 42} cy={20} r={3} fill="#58B0E0" opacity={0.9} />
            <circle cx={x + 42} cy={78} r={3} fill="#58B0E0" opacity={0.9} />
          </g>
        );
      })}
    </svg>
  );
}

export default function Rooms() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const livePricing = useLivePricing();

  const baseRates = Object.values(livePricing.basePriceByRoomTypeId);
  const summaryBaseRate = baseRates.length > 0 ? Math.min(...baseRates) : FALLBACK_BASE_RATE;

  const tierBadges = TIER_NIGHTS.map((n) => ({
    minNights: n,
    discount: getDiscount(n, livePricing.config),
  })).filter((t) => t.discount);

  return (
    <section id="rooms" className="py-14 sm:py-24 px-4 sm:px-6 bg-ink">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 flex flex-col gap-3">
          <p className="text-xs tracking-[0.3em] uppercase text-odyssey-blue font-semibold">
            {labels.rooms.sub}
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-ice">
            {labels.rooms.heading}
          </h2>
          <p className="text-sky-tint max-w-lg mx-auto text-sm">
            Every bed has a privacy curtain, reading light, and personal locker. Book by the bed.
          </p>
        </div>

        {/* Room cards */}
        <div className="flex flex-col gap-5">
          {rooms.map((room) => {
            const bookHref = `/property/project-odyssey-ahmedabad/`;
            const isOpen = expanded === room.id;
            const basePrice = resolveBasePrice(
              livePricing.basePriceByRoomTypeId,
              room.roomTypeId,
              room.basePricePerBedPerNight,
            );

            return (
              <div
                key={room.id}
                className="rounded-2xl border border-white/8 bg-abyss overflow-hidden shadow-sm"
              >
                <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[340px_1fr]">
                  {/* Room photo */}
                  <div className="relative h-52 md:h-auto min-h-[200px] bg-gradient-to-br from-azure-core/30 to-odyssey-blue/10 overflow-hidden">
                    <Image
                      src={room.images[0]}
                      alt={room.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 340px"
                    />
                    {room.badge && (
                      <span className="absolute top-3 left-3 bg-odyssey-blue text-white text-[10px] font-bold tracking-wide px-3 py-1 rounded-full z-10">
                        {room.badge}
                      </span>
                    )}
                    {/* Bed count pill */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                      <BedDouble size={13} />
                      {room.beds}-Bed {room.bedType}
                    </div>
                  </div>

                  {/* Room details */}
                  <div className="flex flex-col gap-0 divide-y divide-white/8">
                    {/* Main info */}
                    <div className="p-5 flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                          <h3 className="font-display font-bold text-xl text-ice">{room.name}</h3>
                          <div className="flex items-center gap-3 mt-1 text-xs text-sky-tint">
                            <span className="flex items-center gap-1">
                              <Users size={12} />
                              {room.capacity} Guests max
                            </span>
                            {room.sqft && (
                              <>
                                <span className="opacity-30">·</span>
                                <span>~{room.sqft} sq ft</span>
                              </>
                            )}
                            <span className="opacity-30">·</span>
                            <span className="capitalize">{room.type.replace("_", " ")}</span>
                          </div>
                        </div>
                        {/* Pricing block */}
                        <div className="text-right shrink-0 flex flex-col gap-0.5">
                          <p className="text-2xl font-display font-bold text-ice">
                            ₹{fmt(basePrice)}
                            <span className="text-sm font-normal text-sky-tint ml-1">/ bed / night</span>
                          </p>
                          <p className="text-xs text-sky-tint">
                            or <span className="text-ice font-semibold">₹{fmt(room.wholeRoomPerNight)}</span> for whole room
                          </p>
                        </div>
                      </div>

                      {/* SVG bed illustration */}
                      <div className="flex items-center gap-4">
                        <BunkBedSVG
                          beds={room.beds}
                          className="h-[70px] w-auto opacity-90"
                        />
                        <p className="text-sm text-sky-tint leading-relaxed flex-1">
                          {room.description}
                        </p>
                      </div>

                      {/* Amenity icons */}
                      <div className="flex flex-wrap gap-2">
                        {room.amenities.map((a) => (
                          <span
                            key={a}
                            className="flex items-center gap-1 text-[11px] bg-white/5 border border-white/10 text-sky-tint px-2.5 py-1 rounded-full"
                          >
                            {amenityIcons[a] ?? <Wifi size={12} />}
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Discount badges */}
                    <div className="px-5 pb-3 pt-3 flex flex-wrap gap-2">
                      {tierBadges.map(({ minNights, discount }) => (
                        <span
                          key={minNights}
                          className="flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border bg-palm/10 border-palm/25 text-palm"
                        >
                          <Sparkles size={10} />
                          {minNights}+ nights: <strong>{discount!.badge}</strong>
                        </span>
                      ))}
                      <span className="flex items-center gap-1 text-[11px] text-sky-tint">
                        <Tag size={10} /> Discounts auto-applied on booking
                      </span>
                    </div>

                    {/* Availability / Book row */}
                    <div className="px-5 py-3 flex items-center justify-between gap-3 flex-wrap">
                      <button
                        onClick={() => setExpanded(isOpen ? null : room.id)}
                        className="flex items-center gap-2 text-xs text-sky-tint hover:text-odyssey-blue transition-colors font-medium"
                        aria-expanded={isOpen}
                      >
                        Availability & Details
                        {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>

                      <Link
                        href={bookHref}
                        className="flex items-center gap-2 bg-odyssey-blue hover:bg-azure-deep text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors"
                      >
                        {labels.rooms.bookCta}
                      </Link>
                    </div>

                    {/* Expandable availability note */}
                    {isOpen && (
                      <div className="px-5 pb-4 flex flex-col gap-2 text-sm text-sky-tint bg-white/2">
                        <p className="text-xs font-semibold text-odyssey-blue uppercase tracking-wider mt-2">
                          How to check availability
                        </p>
                        <p>
                          Tap <strong className="text-ice">&quot;Book This Cabin&quot;</strong> to open WhatsApp — tell us your dates and number of beds and we&apos;ll confirm within a few hours.
                        </p>
                        <div className="grid grid-cols-2 gap-3 mt-1 text-xs">
                          <div className="p-3 rounded-lg bg-white/3 border border-white/6">
                            <p className="text-odyssey-blue font-semibold">Check-in</p>
                            <p>11:00 AM</p>
                          </div>
                          <div className="p-3 rounded-lg bg-white/3 border border-white/6">
                            <p className="text-odyssey-blue font-semibold">Check-out</p>
                            <p>10:00 AM</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing tiers summary */}
        <div className="mt-8 rounded-2xl border border-white/8 bg-abyss overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-white/8 flex items-center gap-2">
            <Tag size={15} className="text-odyssey-blue" />
            <span className="text-sm font-semibold text-ice">Pricing & Discounts</span>
            <span className="ml-auto text-xs text-sky-tint">Per night drops every added night</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/8">
            {/* Per bed */}
            <div className="p-5 flex flex-col gap-1">
              <p className="text-xs text-sky-tint uppercase tracking-wider">1 Night</p>
              <p className="text-2xl font-display font-bold text-ice">₹{fmt(summaryBaseRate)}</p>
              <p className="text-xs text-sky-tint">rack rate</p>
            </div>
            {/* 7 nights */}
            <div className="p-5 flex flex-col gap-1">
              <p className="text-xs text-green-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles size={10} /> 7 Nights
              </p>
              <p className="text-2xl font-display font-bold text-green-400">
                ₹{fmt(effectiveNightly(7, livePricing.config, summaryBaseRate))}
                <span className="text-sm font-normal text-sky-tint ml-1">
                  ~{getDiscount(7, livePricing.config)?.pct ?? 0}% off
                </span>
              </p>
              <p className="text-xs text-sky-tint">per bed / night</p>
            </div>
            {/* 14 nights */}
            <div className="p-5 flex flex-col gap-1">
              <p className="text-xs text-odyssey-blue uppercase tracking-wider flex items-center gap-1">
                <Sparkles size={10} /> 14 Nights
              </p>
              <p className="text-2xl font-display font-bold text-odyssey-blue">
                ₹{fmt(effectiveNightly(14, livePricing.config, summaryBaseRate))}
                <span className="text-sm font-normal text-sky-tint ml-1">
                  ~{getDiscount(14, livePricing.config)?.pct ?? 0}% off
                </span>
              </p>
              <p className="text-xs text-sky-tint">per bed / night</p>
            </div>
            {/* Monthly */}
            <div className="p-5 flex flex-col gap-1 bg-odyssey-blue/5">
              <p className="text-xs text-mascot-glow uppercase tracking-wider flex items-center gap-1">
                <Sparkles size={10} /> 27+ Nights
              </p>
              <p className="text-2xl font-display font-bold text-mascot-glow">
                ₹{fmt(effectiveNightly(27, livePricing.config, summaryBaseRate))}
                <span className="text-sm font-normal text-sky-tint ml-1">
                  ~{getDiscount(27, livePricing.config)?.pct ?? 0}% off
                </span>
              </p>
              <p className="text-xs text-sky-tint">+ WORKATION extra 15%</p>
            </div>
          </div>
        </div>

        {/* Group booking note */}
        <div className="mt-6 p-5 rounded-2xl border border-odyssey-blue/20 bg-odyssey-blue/5 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div>
            <p className="text-sm font-semibold text-ice">Traveling with a group?</p>
            <p className="text-xs text-sky-tint mt-0.5">
              Book all beds in a room and you get the whole room to yourselves. Message us to block it.
            </p>
          </div>
          <a
            href={buildWhatsAppLink({ room: "Group booking — full room" })}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-xs font-semibold text-odyssey-blue hover:text-white border border-odyssey-blue/40 hover:bg-odyssey-blue px-5 py-2.5 rounded-full transition-all whitespace-nowrap"
          >
            Block a Room for My Group
          </a>
        </div>
      </div>
    </section>
  );
}
