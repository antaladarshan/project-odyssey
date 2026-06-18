import { MapPin, Train, UtensilsCrossed, Landmark, Trees } from "lucide-react";
import { neighborhoodHighlights, property } from "@/config/property";
import { labels } from "@/config/labels";

const typeIcons: Record<string, React.ReactNode> = {
  transport: <Train size={16} />,
  food: <UtensilsCrossed size={16} />,
  attraction: <Landmark size={16} />,
  neighbourhood: <Trees size={16} />,
};

export default function PortsOfCall() {
  const mapEmbedUrl = `https://maps.google.com/maps?q=${property.lat},${property.lng}&z=16&output=embed`;

  return (
    <section id="neighborhood" className="py-14 sm:py-24 px-4 sm:px-6 bg-abyss">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14 flex flex-col gap-3">
          <p className="text-xs tracking-[0.3em] uppercase text-odyssey-blue font-semibold">
            Where You Are
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ice">
            {labels.neighborhood.heading}
          </h2>
          <p className="text-sky-tint/70 max-w-lg mx-auto">{labels.neighborhood.sub}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Map */}
          <div className="rounded-2xl overflow-hidden border border-white/8 aspect-[4/3]">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Project Odyssey location map"
            />
          </div>

          {/* Highlights */}
          <div className="flex flex-col gap-4">
            <p className="flex items-center gap-2 text-sm text-sky-tint font-medium">
              <MapPin size={14} className="text-odyssey-blue" />
              {property.address ?? `${property.city}, India`}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              {neighborhoodHighlights.map((h) => (
                <div
                  key={h.name}
                  className="flex items-start gap-3 p-4 rounded-xl bg-ink border border-white/8 hover:border-odyssey-blue/30 transition-colors"
                >
                  <span className="mt-0.5 text-odyssey-blue shrink-0">
                    {typeIcons[h.type] ?? <MapPin size={16} />}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ice">{h.name}</p>
                    <p className="text-xs text-odyssey-blue mt-0.5">{h.distance}</p>
                    <p className="text-xs text-sky-tint/70 mt-1">{h.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
