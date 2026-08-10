"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Wifi, Wind, Droplets, Lock, Lamp, Coffee, UtensilsCrossed,
  ShieldCheck, WashingMachine, MapPin, Clock, Users, ChevronDown, ChevronUp,
} from "lucide-react";
import { type PropertyConfig } from "@/config/property";
import { rooms, amenities, neighborhoodHighlights } from "@/config/property";
import { siteConfig } from "@/config/site";
import { nightsBetween } from "@/lib/pricing";
import DateSearchBar, { type DateSearch } from "./DateSearchBar";
import AvailabilityList, { type SelectedRoom } from "./AvailabilityList";
import BookingSummary from "./BookingSummary";
import ReviewBooking from "./ReviewBooking";
import type { RoomTypeAvailability } from "@/app/api/availability/route";

const amenityIconMap: Record<string, React.ReactNode> = {
  Wifi: <Wifi size={18} />,
  Wind: <Wind size={18} />,
  Droplets: <Droplets size={18} />,
  Lock: <Lock size={18} />,
  Lamp: <Lamp size={18} />,
  Coffee: <Coffee size={18} />,
  UtensilsCrossed: <UtensilsCrossed size={18} />,
  ShieldCheck: <ShieldCheck size={18} />,
  WashingMachine: <WashingMachine size={18} />,
  MapPin: <MapPin size={18} />,
};

interface Props {
  property: PropertyConfig;
}

export default function PropertyDetail({ property }: Props) {
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const [search, setSearch] = useState<DateSearch>({ checkIn: today, checkOut: tomorrow, guests: 1 });
  const [searched, setSearched] = useState(true);

  // Carry over the selection made on the homepage hero (passed as URL params),
  // so the guest doesn't have to re-pick the same dates here. Read in an effect
  // (not at render) so the URL is reliably committed after client-side navigation.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const ci = p.get("checkIn");
    const co = p.get("checkOut");
    const g = Number(p.get("guests"));
    if (ci && co) {
      setSearch({ checkIn: ci, checkOut: co, guests: g >= 1 ? g : 1 });
    }
  }, []);
  const [selected, setSelected] = useState<SelectedRoom[]>([]);
  const [workation, setWorkation] = useState(false);
  const [reviewing, setReviewing] = useState(false);
  const [policyOpen, setPolicyOpen] = useState<string | null>(null);
  const [liveAvailability, setLiveAvailability] = useState<Record<string, RoomTypeAvailability> | null>(
    null
  );

  const nights = nightsBetween(search.checkIn, search.checkOut);

  // Pull real bed counts for the selected dates. Falls back to each room's
  // static `bedsAvailable` (see AvailabilityList) while loading or on failure.
  useEffect(() => {
    if (!search.checkIn || !search.checkOut) return;
    const controller = new AbortController();

    fetch(`/api/availability?checkIn=${search.checkIn}&checkOut=${search.checkOut}`, {
      signal: controller.signal,
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setLiveAvailability(data?.availability ?? null))
      .catch(() => setLiveAvailability(null));

    return () => controller.abort();
  }, [search.checkIn, search.checkOut]);

  const availableRoomCount = rooms.filter((r) => {
    const live = liveAvailability?.[r.roomTypeName];
    return (live ? live.available : r.bedsAvailable) > 0;
  }).length;

  function handleSearch(s: DateSearch) {
    setSearch(s);
    setSearched(true);
    setSelected([]);
    setWorkation(false);
    setReviewing(false);
    setTimeout(() => {
      document.getElementById("availability")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  const policies = [
    { title: "General policies", body: "No loud music after 10 PM. Common spaces are shared — keep them clean. Guests are responsible for their own belongings." },
    { title: "Pet policies", body: "We love animals but do not accommodate pets at this time. Guide dogs are welcome with prior notice." },
    { title: "Guest policies", body: "All guests must be 18+. ID proof required at check-in. Visitors are not allowed in dorm rooms." },
  ];

  const heroImages = property.images?.length ? property.images : [property.heroMedia];

  if (reviewing) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
        <ReviewBooking
          checkIn={search.checkIn}
          checkOut={search.checkOut}
          nights={nights}
          selected={selected}
          workation={workation}
          onWorkationToggle={setWorkation}
          onBack={() => setReviewing(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero photo grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 h-72 sm:h-96 overflow-hidden">
        {heroImages.slice(0, 3).map((img, i) => (
          <div
            key={i}
            className={`relative overflow-hidden bg-ink ${i === 0 ? "col-span-2 sm:col-span-2 row-span-2" : ""}`}
          >
            <Image
              src={img}
              alt={`${property.name} photo ${i + 1}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 640px) 50vw, 33vw"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {/* Property title */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-4">
        <p className="text-xs font-bold text-odyssey-blue tracking-widest uppercase mb-1">
          {property.city}, India
        </p>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-ice">
          {property.name}{" "}
          <span className="text-odyssey-blue">{property.city.toUpperCase()}</span>
        </h1>
        <p className="text-sky-tint mt-2 max-w-2xl">{property.description}</p>
        {property.address && (
          <p className="text-xs text-sky-tint/60 mt-1 flex items-center gap-1">
            <MapPin size={11} /> {property.address}
          </p>
        )}
      </div>

      {/* Amenities strip */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 border-t border-white/8">
        <p className="text-xs font-bold text-sky-tint uppercase tracking-widest mb-4">Amenities</p>
        <div className="flex flex-wrap gap-6">
          {amenities.map((a) => (
            <div key={a.label} className="flex flex-col items-center gap-1.5 text-center">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-odyssey-blue">
                {amenityIconMap[a.icon] ?? <Wifi size={18} />}
              </div>
              <p className="text-[11px] text-sky-tint font-medium max-w-[56px] leading-tight">{a.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main 2-col layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
          {/* LEFT */}
          <div className="flex flex-col gap-8">
            {/* Date search bar */}
            <div>
              <p className="text-xs font-bold text-sky-tint uppercase tracking-widest mb-3">Availability</p>
              <DateSearchBar onSearch={handleSearch} initial={search} />
            </div>

            {/* Group booking banner */}
            <div className="flex items-center gap-3 bg-odyssey-blue/10 border border-odyssey-blue/20 rounded-xl px-4 py-3">
              <span className="text-xl">🎉</span>
              <p className="text-sm text-ice">
                <strong>Hurray!</strong> Book for 7 guests or more to get a{" "}
                <strong>group booking discount.</strong>
              </p>
            </div>

            {/* Room availability list */}
            {searched && (
              <div id="availability" className="flex flex-col gap-4">
                <p className="text-xs font-bold text-sky-tint uppercase tracking-widest">
                  {availableRoomCount} rooms available for {nights} night{nights !== 1 ? "s" : ""}
                </p>
                <AvailabilityList
                  nights={nights}
                  selected={selected}
                  onChange={setSelected}
                  liveAvailability={liveAvailability}
                />
              </div>
            )}

            {/* Location */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-bold text-sky-tint uppercase tracking-widest">Location</p>
              <div className="bg-ink border border-white/8 rounded-2xl overflow-hidden">
                <div className="bg-white/5 h-40 flex items-center justify-center">
                  <a
                    href={property.mapsUrl ?? `https://maps.google.com/?q=${property.lat},${property.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-odyssey-blue hover:text-azure-deep font-semibold text-sm"
                  >
                    <MapPin size={16} /> Open in Google Maps
                  </a>
                </div>
                <div className="p-4 flex flex-col gap-2">
                  {neighborhoodHighlights.map((h) => (
                    <div key={h.name} className="flex items-start justify-between gap-4 py-2 border-b border-white/8 last:border-0">
                      <div>
                        <p className="text-sm font-semibold text-ice">{h.name}</p>
                        <p className="text-xs text-sky-tint">{h.description}</p>
                      </div>
                      <span className="text-xs text-odyssey-blue font-semibold shrink-0 bg-odyssey-blue/10 px-2 py-0.5 rounded-full">
                        {h.distance}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Important information */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-bold text-sky-tint uppercase tracking-widest">Important Information</p>
              <div className="bg-ink border border-white/8 rounded-2xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Check In", val: siteConfig.checkIn, icon: <Clock size={14} /> },
                  { label: "Check Out", val: siteConfig.checkOut, icon: <Clock size={14} /> },
                  { label: "Guests", val: "18+ only", icon: <Users size={14} /> },
                  { label: "Support", val: "24h WhatsApp", icon: <ShieldCheck size={14} /> },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center gap-1 text-center p-3 bg-white/5 rounded-xl">
                    <div className="text-odyssey-blue">{item.icon}</div>
                    <p className="text-[11px] text-sky-tint font-semibold uppercase tracking-wider">{item.label}</p>
                    <p className="text-xs font-bold text-ice">{item.val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div className="flex flex-col gap-2">
              <p className="text-xs font-bold text-sky-tint uppercase tracking-widest mb-1">Policies</p>
              {policies.map((p) => (
                <div key={p.title} className="bg-ink border border-white/8 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setPolicyOpen(policyOpen === p.title ? null : p.title)}
                    className="w-full flex items-center justify-between px-4 py-3.5 text-left text-sm font-semibold text-ice hover:bg-white/5 transition-colors"
                  >
                    {p.title}
                    {policyOpen === p.title ? (
                      <ChevronUp size={16} className="text-sky-tint" />
                    ) : (
                      <ChevronDown size={16} className="text-sky-tint" />
                    )}
                  </button>
                  {policyOpen === p.title && (
                    <div className="px-4 pb-4 text-sm text-sky-tint leading-relaxed border-t border-white/8 pt-3">
                      {p.body}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — sticky summary */}
          <div className="hidden lg:block">
            <BookingSummary
              checkIn={search.checkIn}
              checkOut={search.checkOut}
              nights={nights}
              selected={selected}
              workation={workation}
              onWorkationToggle={setWorkation}
              onReview={() => setReviewing(true)}
            />
          </div>
        </div>

        {/* Mobile sticky bottom bar */}
        {selected.length > 0 && (
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-ink border-t border-white/10 px-4 py-3 flex items-center justify-between gap-4 z-50 shadow-lg">
            <div>
              <p className="text-xs text-sky-tint">
                {selected.reduce((s, r) => s + r.qty, 0)} bed{selected.reduce((s, r) => s + r.qty, 0) !== 1 ? "s" : ""} · {nights} night{nights !== 1 ? "s" : ""}
              </p>
            </div>
            <button
              onClick={() => setReviewing(true)}
              className="bg-odyssey-blue hover:bg-azure-deep text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors"
            >
              Review booking
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
