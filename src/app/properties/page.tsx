import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { properties } from "@/config/property";

export const metadata: Metadata = {
  title: "Our Properties",
  description: "Browse Project Odyssey hostels across India. Direct booking, no markup.",
};

export default function PropertiesPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-2">
          <p className="text-xs font-bold text-odyssey-blue tracking-widest uppercase">
            Destinations
          </p>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-ice">
            Find Your Port
          </h1>
          <p className="text-sky-tint max-w-lg">
            Handpicked hostels across India. Direct booking, transparent pricing, no OTA markup.
          </p>
        </div>

        {/* Property grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((prop) => {
            const card = (
              <div
                className={`bg-ink border border-white/10 rounded-2xl overflow-hidden flex flex-col transition-all ${
                  prop.comingSoon
                    ? "opacity-75"
                    : "hover:shadow-lg hover:border-odyssey-blue/30 cursor-pointer"
                }`}
              >
                {/* Image */}
                <div className="relative h-48 bg-abyss overflow-hidden">
                  <Image
                    src={prop.heroMedia}
                    alt={`${prop.name} ${prop.city}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  {prop.comingSoon && (
                    <div className="absolute inset-0 bg-abyss/70 flex items-center justify-center">
                      <span className="bg-ink text-odyssey-blue font-bold text-sm px-4 py-1.5 rounded-full border border-odyssey-blue/40">
                        {prop.tag ?? "Coming Soon"}
                      </span>
                    </div>
                  )}
                  {!prop.comingSoon && (
                    <span className="absolute top-3 left-3 bg-odyssey-blue text-white text-[10px] font-bold tracking-wide px-2.5 py-1 rounded-full">
                      Book Now
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col gap-1.5">
                  <p className="text-xs text-sky-tint flex items-center gap-1">
                    <MapPin size={11} /> {prop.city}, India
                  </p>
                  <h2 className="font-display font-bold text-lg text-ice">{prop.name}</h2>
                  <p className="text-sm text-sky-tint/80 line-clamp-2">{prop.description}</p>
                  {!prop.comingSoon && (
                    <p className="text-xs text-odyssey-blue font-semibold mt-1">
                      From ₹700/bed/night →
                    </p>
                  )}
                </div>
              </div>
            );

            return prop.comingSoon ? (
              <div key={prop.id}>{card}</div>
            ) : (
              <Link href={`/property/${prop.slug}/`} key={prop.id}>
                {card}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
