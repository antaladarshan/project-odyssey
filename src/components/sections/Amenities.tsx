import Image from "next/image";
import {
  Wifi, Wind, Droplets, Lock, Blinds, Lamp, Plug, UtensilsCrossed, Sofa, ShieldCheck, WashingMachine, MapPin,
  type LucideIcon,
} from "lucide-react";
import { amenityGrid } from "@/config/home";
import SectionHeading from "@/components/ui/SectionHeading";

// Matching lucide icons (our own set). Swap for custom SVGs here if you have them.
const icons: Record<string, LucideIcon> = {
  Wifi, Wind, Droplets, Lock, Blinds, Lamp, Plug, UtensilsCrossed, Sofa, ShieldCheck, WashingMachine, MapPin,
};

export default function Amenities() {
  return (
    <section id="amenities" className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        <SectionHeading
          align="left"
          title="Our Hostel Amenities & Facilities"
          sub="Comfort matters, especially when you are away from home. Project Odyssey gives you all the essentials you'd expect from a modern, affordable stay, including:"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-10">
          {amenityGrid.map((a) => {
            const Icon = icons[a.icon];
            return (
              <div key={a.label} className="flex flex-col items-center gap-3 text-center group">
                {a.image ? (
                  <Image
                    src={a.image}
                    alt={a.label}
                    width={96}
                    height={96}
                    className="h-24 w-24 object-contain group-hover:-translate-y-1.5 transition-transform duration-300"
                  />
                ) : (
                  <span className="grid place-items-center h-24 w-24">
                    <span className="grid place-items-center w-16 h-16 rounded-2xl bg-[#f1ebe2] text-[#6b6358] group-hover:-translate-y-1.5 transition-transform duration-300">
                      <Icon size={30} strokeWidth={1.6} />
                    </span>
                  </span>
                )}
                <span className="text-xs sm:text-sm text-gray-600 font-medium leading-tight">{a.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
