import Link from "next/link";
import { properties } from "@/config/property";
import SectionHeading from "@/components/ui/SectionHeading";

export default function FuturePropertiesTeaser() {
  const upcoming = properties.filter((p) => p.comingSoon);

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        <SectionHeading script="More stays" title="Coming Soon" sub="The Odyssey map keeps growing." />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {upcoming.map((p) => (
            <Link
              key={p.id}
              href="/properties/"
              className="group rounded-3xl bg-po-cream p-6 flex flex-col gap-2 hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <span className="self-start text-[11px] font-bold bg-po-yellow text-po-ink px-2.5 py-1 rounded-full">
                {p.tag ?? "Coming Soon"}
              </span>
              <h3 className="font-display font-extrabold text-xl text-po-ink mt-2">
                {p.name === "Project Odyssey" ? `Odyssey ${p.city}` : p.name}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3">{p.description}</p>
              <span className="mt-2 text-sm font-bold text-po-pink group-hover:underline">Learn more →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
