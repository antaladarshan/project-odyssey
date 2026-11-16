import Image from "next/image";
import Link from "next/link";
import { homeProperties } from "@/config/home";
import SectionHeading from "@/components/ui/SectionHeading";

const fmt = (n: number) => n.toLocaleString("en-IN");

export default function PropertyShowcase() {
  return (
    <section id="stays" className="pb-16 sm:pb-24 px-4 sm:px-6 bg-white">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        <SectionHeading
          script="Our"
          title="Stays"
          sub="Two Project Odyssey stays — one open now, one on the way."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {homeProperties.map((p) => (
            <Link
              key={p.id}
              href={p.href}
              className="group relative block aspect-[4/5] rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <Image
                src={p.image}
                alt={p.name}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className={`object-cover transition-transform duration-700 group-hover:scale-105 ${p.comingSoon ? "saturate-75" : ""}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-black/25" />

              {p.priceFrom && (
                <span className="absolute top-4 left-4 bg-white/95 text-po-ink text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full">
                  From ₹{fmt(p.priceFrom)} / night
                </span>
              )}
              {p.badge && (
                <span
                  className={`absolute top-4 right-4 text-[11px] sm:text-xs font-bold px-3 py-1.5 rounded-full ${
                    p.comingSoon ? "bg-po-yellow text-po-ink" : "bg-po-pink text-white"
                  }`}
                >
                  {p.badge}
                </span>
              )}

              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <h3 className="font-display font-extrabold text-2xl leading-tight">{p.name}</h3>
                <p className="text-sm text-white/85 mt-0.5">{p.place}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-po-yellow group-hover:gap-3 transition-all">
                  {p.comingSoon ? "Learn more" : "Book now"} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
