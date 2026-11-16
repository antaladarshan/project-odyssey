"use client";

import { useState } from "react";
import Image from "next/image";
import { whyUsTabs } from "@/config/home";
import SectionHeading from "@/components/ui/SectionHeading";

export default function WhyUs() {
  const [active, setActive] = useState(whyUsTabs[0].id);
  const tab = whyUsTabs.find((t) => t.id === active) ?? whyUsTabs[0];

  return (
    <section id="why-us" className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        <SectionHeading script="Glad you asked" title="Why Project Odyssey?" sub="Pick what describes your trip and see why it fits." />

        <div className="flex flex-wrap justify-center gap-2" role="tablist">
          {whyUsTabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={t.id === active}
              onClick={() => setActive(t.id)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-colors ${
                t.id === active
                  ? "bg-po-pink text-white border-po-pink"
                  : "bg-white text-po-ink border-gray-300 hover:border-po-pink hover:text-po-pink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {tab.cards.map((c) => (
            <div key={c.title} className="group relative aspect-[4/5] rounded-3xl overflow-hidden shadow-md">
              <Image src={c.image} alt={c.title} fill sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <h3 className="font-display font-bold text-lg leading-tight">{c.title}</h3>
                <p className="text-sm text-white/85 mt-1">{c.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
