"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/config/property";
import { labels } from "@/config/labels";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-14 sm:py-24 px-4 sm:px-6 bg-abyss">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12 flex flex-col gap-3">
          <p className="text-xs tracking-[0.3em] uppercase text-odyssey-blue font-semibold">
            Got Questions
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ice">
            {labels.faq.heading}
          </h2>
        </div>

        <div className="flex flex-col gap-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/8 bg-ink overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/3 transition-colors"
                aria-expanded={open === i}
                aria-controls={`faq-${i}`}
              >
                <span className="text-sm font-semibold text-ice">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-odyssey-blue transition-transform duration-300 ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                id={`faq-${i}`}
                role="region"
                className={`overflow-hidden transition-all duration-300 ${
                  open === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="px-5 pb-5 text-sm text-sky-tint leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
