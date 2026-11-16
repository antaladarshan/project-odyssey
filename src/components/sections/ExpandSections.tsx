import HoverExpandRow from "@/components/ui/HoverExpandRow";
import { socialStays, travelStyle } from "@/config/home";

export function SocialStays() {
  return (
    <section className="px-4 sm:px-6 py-14 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col gap-3 max-w-3xl">
          <h2 className="font-display text-2xl sm:text-3xl text-po-ink">
            <span className="font-extrabold text-po-pink">{socialStays.script}</span>{" "}
            <span className="font-bold">{socialStays.title}</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{socialStays.text}</p>
        </div>
        <HoverExpandRow items={socialStays.items} />
      </div>
    </section>
  );
}

export function TravelStyle() {
  return (
    <section className="px-4 sm:px-6 pb-14 sm:pb-20 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col gap-3 max-w-3xl">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-po-ink">
            Hostels for <span className="text-po-pink">every travel style</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{travelStyle.text}</p>
        </div>
        <HoverExpandRow items={travelStyle.items} />
      </div>
    </section>
  );
}
