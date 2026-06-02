import { Compass } from "lucide-react";
import { labels } from "@/config/labels";

const futureDestinations = [
  { city: "Goa", status: "Coming Soon" },
  { city: "Rishikesh", status: "Coming Soon" },
  { city: "Manali", status: "On the Map" },
];

export default function FuturePropertiesTeaser() {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 bg-ink">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
        <div className="p-3 rounded-full bg-azure-core/10 border border-azure-core/20">
          <Compass size={24} className="text-odyssey-blue" />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-xs tracking-[0.3em] uppercase text-odyssey-blue font-semibold">
            Next Destinations
          </p>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-ice">
            {labels.futureProperties.heading}
          </h2>
          <p className="text-sky-tint text-base max-w-md mx-auto">
            {labels.futureProperties.sub}
          </p>
        </div>

        {/* Destination pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-2">
          {futureDestinations.map((d) => (
            <div
              key={d.city}
              className="flex items-center gap-2 bg-white/3 border border-white/8 rounded-full px-5 py-2.5"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-odyssey-blue animate-pulse" />
              <span className="text-sm font-medium text-sky-tint">{d.city}</span>
              <span className="text-[10px] text-sky-tint/40">{d.status}</span>
            </div>
          ))}
        </div>

        <p className="text-xs text-sky-tint/40 mt-2">
          Bookmark projectodyssey.in — the map grows.
        </p>
      </div>
    </section>
  );
}
