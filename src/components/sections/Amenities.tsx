import {
  Wifi, UtensilsCrossed, Wind, Droplets, Lamp, WashingMachine, Coffee, ShieldCheck, MapPin, Lock,
} from "lucide-react";
import { amenities } from "@/config/property";
import SectionHeading from "@/components/ui/SectionHeading";

const iconComponents: Record<string, React.ReactNode> = {
  Wifi: <Wifi size={30} strokeWidth={1.5} />,
  UtensilsCrossed: <UtensilsCrossed size={30} strokeWidth={1.5} />,
  Wind: <Wind size={30} strokeWidth={1.5} />,
  Droplets: <Droplets size={30} strokeWidth={1.5} />,
  Lamp: <Lamp size={30} strokeWidth={1.5} />,
  Lock: <Lock size={30} strokeWidth={1.5} />,
  WashingMachine: <WashingMachine size={30} strokeWidth={1.5} />,
  Coffee: <Coffee size={30} strokeWidth={1.5} />,
  ShieldCheck: <ShieldCheck size={30} strokeWidth={1.5} />,
  MapPin: <MapPin size={30} strokeWidth={1.5} />,
};

export default function Amenities() {
  return (
    <section id="amenities" className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        <SectionHeading
          script="Our"
          title="Amenities & Facilities"
          sub="Comfort matters when you're away from home. Here's everything included."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-8">
          {amenities.map((a) => (
            <div key={a.label} className="flex flex-col items-center gap-3 text-center group">
              <span className="grid place-items-center w-16 h-16 rounded-full bg-po-cream text-po-pink group-hover:bg-po-pink group-hover:text-white group-hover:-translate-y-1 transition-all">
                {iconComponents[a.icon] ?? <Wifi size={30} strokeWidth={1.5} />}
              </span>
              <span className="text-xs sm:text-sm text-po-ink font-semibold leading-tight">{a.label}</span>
            </div>
          ))}
        </div>

        <div className="p-5 rounded-2xl bg-po-yellow/25 text-center">
          <p className="text-sm text-po-ink">
            Every bed includes:{" "}
            <span className="font-bold">Privacy curtain · Reading light · Power socket · Personal locker</span>
          </p>
        </div>
      </div>
    </section>
  );
}
