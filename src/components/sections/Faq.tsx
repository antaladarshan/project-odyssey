"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { faqs } from "@/config/property";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 sm:py-24 px-4 sm:px-6 bg-po-cream">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10">
        <SectionHeading
          align="left"
          script="Frequently asked"
          title="Questions"
          sub="Answers to common questions about our stay, booking and prices."
        />

        <div className="flex flex-col divide-y divide-gray-200 bg-white rounded-3xl px-6 shadow-sm">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left"
                aria-expanded={open === i}
                aria-controls={`faq-${i}`}
              >
                <span className="text-sm sm:text-base font-semibold text-po-ink">{faq.q}</span>
                <Plus
                  size={20}
                  className={`shrink-0 text-po-pink transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}
                />
              </button>
              <div
                id={`faq-${i}`}
                role="region"
                className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <p className="pb-5 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
