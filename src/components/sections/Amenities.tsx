import {
  Wifi,
  UtensilsCrossed,
  Wind,
  Droplets,
  Monitor,
  WashingMachine,
  Coffee,
  ShieldCheck,
  MapPin,
  ParkingSquare,
} from "lucide-react";
import { amenities } from "@/config/property";
import { labels } from "@/config/labels";

const iconComponents: Record<string, React.ReactNode> = {
  Wifi: <Wifi size={28} strokeWidth={1.5} />,
  UtensilsCrossed: <UtensilsCrossed size={28} strokeWidth={1.5} />,
  Wind: <Wind size={28} strokeWidth={1.5} />,
  Droplets: <Droplets size={28} strokeWidth={1.5} />,
  Monitor: <Monitor size={28} strokeWidth={1.5} />,
  WashingMachine: <WashingMachine size={28} strokeWidth={1.5} />,
  Coffee: <Coffee size={28} strokeWidth={1.5} />,
  ShieldCheck: <ShieldCheck size={28} strokeWidth={1.5} />,
  MapPin: <MapPin size={28} strokeWidth={1.5} />,
  ParkingSquare: <ParkingSquare size={28} strokeWidth={1.5} />,
};

export default function Amenities() {
  return (
    <section id="amenities" className="py-24 px-4 sm:px-6 bg-abyss">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14 flex flex-col gap-3">
          <p className="text-xs tracking-[0.3em] uppercase text-odyssey-blue font-semibold">
            Everything You Need
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ice">
            {labels.amenities.heading}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {amenities.map((a) => (
            <div
              key={a.label}
              className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-ink border border-white/8 hover:border-odyssey-blue/40 hover:bg-white/3 transition-all text-center group"
            >
              <span className="text-odyssey-blue group-hover:text-mascot-glow transition-colors">
                {iconComponents[a.icon] ?? <Wifi size={28} strokeWidth={1.5} />}
              </span>
              <span className="text-xs text-sky-tint font-medium leading-tight">{a.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
