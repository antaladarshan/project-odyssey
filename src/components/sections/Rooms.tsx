"use client";

import { Wifi, Wind, Droplets, Monitor, Coffee, UtensilsCrossed, Users, Star } from "lucide-react";
import Card from "@/components/ui/Card";
import { rooms } from "@/config/property";
import { labels } from "@/config/labels";
import { buildWhatsAppLink } from "@/lib/requestToBook";

const iconMap: Record<string, React.ReactNode> = {
  "Wi-Fi": <Wifi size={13} />,
  AC: <Wind size={13} />,
  "Hot Water": <Droplets size={13} />,
  "Work Desk": <Monitor size={13} />,
  Coffee: <Coffee size={13} />,
  Kitchen: <UtensilsCrossed size={13} />,
};

function getIcon(amenity: string) {
  return iconMap[amenity] ?? <Star size={13} />;
}

export default function Rooms() {
  return (
    <section id="rooms" className="py-24 px-4 sm:px-6 bg-ink">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 flex flex-col gap-3">
          <p className="text-xs tracking-[0.3em] uppercase text-odyssey-blue font-semibold">
            {labels.rooms.sub}
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-ice">
            {labels.rooms.heading}
          </h2>
        </div>

        {/* Room cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rooms.map((room) => {
            const bookHref = buildWhatsAppLink({ room: room.name });
            return (
              <Card key={room.id} tilt className="group flex flex-col">
                {/* Image placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-azure-core/30 to-odyssey-blue/10 flex items-center justify-center overflow-hidden">
                  {room.badge && (
                    <span className="absolute top-3 right-3 bg-odyssey-blue text-white text-[10px] font-bold tracking-wide px-2.5 py-1 rounded-full z-10">
                      {room.badge}
                    </span>
                  )}
                  <div className="text-odyssey-blue/20 font-display font-extrabold text-6xl select-none group-hover:scale-110 transition-transform duration-500">
                    {room.name.split(" ")[1]?.[0] ?? room.name[0]}
                  </div>
                  {/* TODO: replace with next/image when real photos are provided */}
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3 p-5 flex-1">
                  <h3 className="font-display font-bold text-lg text-ice">{room.name}</h3>

                  <div className="flex items-center gap-2 text-xs text-sky-tint">
                    <Users size={13} />
                    <span>Sleeps {room.capacity}</span>
                    <span className="mx-1 opacity-30">·</span>
                    <span className="capitalize">{room.type.replace("_", " ")}</span>
                  </div>

                  <p className="text-sm text-sky-tint/80 leading-relaxed flex-1">{room.description}</p>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-1.5">
                    {room.amenities.slice(0, 4).map((a) => (
                      <span
                        key={a}
                        className="flex items-center gap-1 text-[11px] bg-white/5 border border-white/8 text-sky-tint px-2 py-1 rounded-full"
                      >
                        {getIcon(a)}
                        {a}
                      </span>
                    ))}
                    {room.amenities.length > 4 && (
                      <span className="text-[11px] text-sky-tint/60 px-2 py-1">
                        +{room.amenities.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/8 mt-1">
                    <div>
                      <span className="font-display font-bold text-xl text-ice">
                        ₹{room.basePricePerNight.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs text-sky-tint/60">/night</span>
                    </div>
                    <a
                      href={bookHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-odyssey-blue hover:bg-azure-deep text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors"
                    >
                      {labels.rooms.bookCta}
                    </a>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
