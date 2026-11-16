"use client";

import Image from "next/image";
import Link from "next/link";
import { effectiveNightly } from "@/lib/pricing";
import { useLivePricing, FALLBACK_BASE_RATE } from "@/lib/useLivePricing";
import SectionHeading from "@/components/ui/SectionHeading";
import { photo } from "@/config/photos";

const fmt = (n: number) => n.toLocaleString("en-IN");

export default function LongStays() {
  const live = useLivePricing();
  const rates = Object.values(live.basePriceByRoomTypeId);
  const base = rates.length > 0 ? Math.min(...rates) : FALLBACK_BASE_RATE;

  const cards = [
    { title: "Workation", blurb: "Work remotely from a bed with a light, Wi-Fi and AC.", nights: 7, label: "7+ nights", image: photo.bunkLadder },
    { title: "Monthly stay", blurb: "No lock-in drama — the longer you stay, the less you pay.", nights: 27, label: "27+ nights", image: photo.livingSofa },
  ];

  return (
    <section id="long-stays" className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        <SectionHeading script="Staying longer?" title="Long Stays & Workation" sub="Nightly rates drop automatically as you add nights." />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cards.map((c) => (
            <Link
              key={c.title}
              href="/property/project-odyssey-ahmedabad/"
              className="group rounded-t-[10rem] rounded-b-3xl overflow-hidden bg-po-cream shadow-md hover:shadow-xl transition-shadow flex flex-col"
            >
              <div className="relative h-64">
                <Image src={c.image} alt={c.title} fill quality={90} sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <span className="absolute top-4 left-1/2 -translate-x-1/2 bg-po-yellow text-po-ink text-xs font-bold px-3 py-1 rounded-full">
                  From ₹{fmt(effectiveNightly(c.nights, live.config, base))} / night
                </span>
              </div>
              <div className="p-6 text-center flex flex-col gap-1">
                <h3 className="font-display font-extrabold text-2xl text-po-ink">{c.title}</h3>
                <p className="text-xs font-bold text-po-pink uppercase tracking-wider">{c.label}</p>
                <p className="text-sm text-gray-600 mt-1">{c.blurb}</p>
                <span className="mt-3 inline-block mx-auto bg-po-pink group-hover:bg-po-pink-dark text-white text-sm font-bold px-6 py-2 rounded-full transition-colors">
                  Explore now
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
