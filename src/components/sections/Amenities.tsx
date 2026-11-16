import Image from "next/image";
import { amenityGrid, amenityExtras } from "@/config/home";
import SectionHeading from "@/components/ui/SectionHeading";

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
          {amenityGrid.map((a) => (
            <div key={a.label} className="flex flex-col items-center gap-3 text-center group">
              <Image
                src={a.image}
                alt={a.label}
                width={96}
                height={96}
                className="h-24 w-24 object-contain group-hover:-translate-y-1.5 transition-transform duration-300"
              />
              <span className="text-xs sm:text-sm text-gray-600 font-medium leading-tight">{a.label}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-600">
          <span className="font-bold text-po-ink">Also included: </span>
          {amenityExtras.join(" · ")}
        </p>
      </div>
    </section>
  );
}
