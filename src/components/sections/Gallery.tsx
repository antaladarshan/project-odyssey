import Image from "next/image";
import { galleryTiles } from "@/config/home";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Gallery() {
  return (
    <section id="gallery" className="py-16 sm:py-24 px-4 sm:px-6 bg-po-cream">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <SectionHeading
          script="Take a"
          title="Look Around"
          sub="Bunks with curtains, lockers under every bed, and a vibe you'll want to come back to."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {galleryTiles.map((t) => (
            <div key={t.label} className="group relative aspect-[3/4] rounded-3xl overflow-hidden shadow-md">
              <Image
                src={t.image}
                alt={t.label}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <span className="absolute inset-x-0 bottom-6 text-center font-condensed uppercase text-white text-3xl sm:text-4xl tracking-wide"
                style={{ textShadow: "2px 2px 0 #f43f5e" }}>
                {t.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
