import { MapPin, Train, UtensilsCrossed, Landmark, Trees } from "lucide-react";
import { neighborhoodHighlights, property } from "@/config/property";
import SectionHeading from "@/components/ui/SectionHeading";

const typeIcons: Record<string, React.ReactNode> = {
  transport: <Train size={16} />,
  food: <UtensilsCrossed size={16} />,
  attraction: <Landmark size={16} />,
  neighbourhood: <Trees size={16} />,
};

export default function PortsOfCall() {
  const mapEmbedUrl = `https://maps.google.com/maps?q=${property.lat},${property.lng}&z=16&output=embed`;

  return (
    <section id="neighborhood" className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <SectionHeading script="Right in the heart of" title="Satellite, Ahmedabad" sub={property.address} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="rounded-3xl overflow-hidden shadow-md aspect-[4/3]">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Project Odyssey location map"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {neighborhoodHighlights.map((h) => (
              <div key={h.name} className="flex items-start gap-3 p-4 rounded-2xl bg-po-cream hover:shadow-md transition-shadow">
                <span className="mt-0.5 grid place-items-center w-9 h-9 rounded-full bg-white text-po-pink shrink-0">
                  {typeIcons[h.type] ?? <MapPin size={16} />}
                </span>
                <div>
                  <p className="text-sm font-bold text-po-ink">{h.name}</p>
                  <span className="inline-block mt-1 text-[11px] font-bold bg-po-yellow text-po-ink px-2 py-0.5 rounded-full">
                    {h.distance}
                  </span>
                  <p className="text-xs text-gray-600 mt-1.5">{h.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
