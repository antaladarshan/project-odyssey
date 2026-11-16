"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { User, UserRound, Users, Heart, Baby, Laptop, ChevronRight, ChevronLeft } from "lucide-react";
import { personas } from "@/config/home";
import SectionHeading from "@/components/ui/SectionHeading";

const icons = { User, UserRound, Users, Heart, Baby, Laptop };

export default function WhyUs() {
  const [active, setActive] = useState(personas[0].id);
  const scroller = useRef<HTMLDivElement>(null);
  const persona = personas.find((p) => p.id === active) ?? personas[0];

  function scrollBy(dir: 1 | -1) {
    scroller.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  }

  return (
    <section id="why-us" className="bg-white">
      <div className="px-4 sm:px-6 pt-4 pb-12 sm:pb-16">
        <SectionHeading script="Glad you asked" title="Why Project Odyssey is more than just a Hostel" />
      </div>

      <div className="bg-po-cream px-4 sm:px-6 py-10 sm:py-12">
        <div className="max-w-6xl mx-auto flex flex-col gap-6">
          <div>
            <h3 className="font-display font-bold text-xl text-po-ink">Thinking why Project Odyssey for your trip?</h3>
            <p className="text-sm text-gray-500 mt-1">See what our guests experience during their stay.</p>
          </div>

          <div className="flex flex-wrap gap-3" role="tablist">
            {personas.map((p) => {
              const Icon = icons[p.icon];
              const on = p.id === active;
              return (
                <button
                  key={p.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(p.id)}
                  className={`flex items-center gap-2.5 pl-1.5 pr-5 py-1.5 rounded-full bg-white text-sm font-semibold transition-all ${
                    on ? "ring-2 ring-po-pink text-po-ink shadow-sm" : "text-gray-600 hover:text-po-ink hover:shadow-sm"
                  }`}
                >
                  <span className={`grid place-items-center w-9 h-9 rounded-full ${on ? "bg-po-pink text-white" : "bg-po-cream text-po-pink"}`}>
                    <Icon size={18} />
                  </span>
                  {p.label}
                </button>
              );
            })}
          </div>

          <div className="relative">
            <div
              ref={scroller}
              key={persona.id}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {persona.cards.map((c) => (
                <div
                  key={c.title}
                  tabIndex={0}
                  className="group relative shrink-0 snap-start w-[260px] sm:w-[300px] aspect-[3/4] rounded-3xl overflow-hidden shadow-md outline-none focus-visible:ring-4 focus-visible:ring-po-pink/50"
                >
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    quality={90}
                    sizes="300px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 group-focus-visible:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity duration-500" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <h4 className="font-display font-bold text-lg leading-tight">{c.title}</h4>
                    {/* description slides in on hover / focus */}
                    <p className="text-sm text-white/90 leading-snug max-h-0 opacity-0 translate-y-2 overflow-hidden transition-all duration-500 ease-out group-hover:max-h-32 group-hover:opacity-100 group-hover:translate-y-0 group-hover:mt-2 group-focus-visible:max-h-32 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:mt-2">
                      {c.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollBy(-1)}
              aria-label="Scroll left"
              className="hidden sm:grid absolute -left-5 top-1/2 -translate-y-1/2 w-11 h-11 place-items-center rounded-full bg-white shadow-lg text-po-ink hover:text-po-pink"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Scroll right"
              className="hidden sm:grid absolute -right-5 top-1/2 -translate-y-1/2 w-11 h-11 place-items-center rounded-full bg-white shadow-lg text-po-ink hover:text-po-pink"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
