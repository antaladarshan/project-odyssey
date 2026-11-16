import Link from "next/link";
import { BedDouble, Users } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const options = [
  { icon: <BedDouble size={26} />, title: "Project Odyssey", sub: "Satellite, Ahmedabad — beds from ₹700 / night", href: "/property/project-odyssey-ahmedabad/", cta: "Book →" },
  { icon: <Users size={26} />, title: "Project Odyssey 2.0", sub: "Our next stay — coming soon", href: "/properties/", cta: "Learn more →" },
];

export default function TripPicker() {
  return (
    <section className="py-16 px-4 sm:px-6 bg-po-cream">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <SectionHeading script="Which one's" title="your trip?" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {options.map((o) => (
            <Link
              key={o.title}
              href={o.href}
              className="group flex items-center gap-4 bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <span className="grid place-items-center w-14 h-14 rounded-full bg-po-pink text-white shrink-0">{o.icon}</span>
              <div className="flex-1">
                <p className="font-display font-bold text-lg text-po-ink">{o.title}</p>
                <p className="text-sm text-gray-600">{o.sub}</p>
              </div>
              <span className="text-po-pink font-bold text-sm group-hover:translate-x-1 transition-transform whitespace-nowrap">{o.cta}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
