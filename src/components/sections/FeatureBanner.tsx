import Image from "next/image";
import Link from "next/link";
import { featureBanner as f } from "@/config/home";

export default function FeatureBanner() {
  return (
    <section className="px-4 sm:px-6 pb-16 sm:pb-24 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.2fr] rounded-3xl bg-po-cream overflow-hidden">
        <div className="p-8 sm:p-12 flex flex-col justify-center gap-4">
          <span className="self-start text-xs font-bold bg-po-yellow text-po-ink px-3 py-1 rounded-full">{f.eyebrow}</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-po-ink leading-tight">{f.title}</h2>
          <p className="text-gray-600 max-w-sm">{f.text}</p>
          <Link
            href={f.href}
            className="self-start mt-2 bg-po-indigo hover:opacity-90 text-white font-bold px-7 py-3 rounded-xl transition-opacity"
          >
            {f.cta}
          </Link>
        </div>
        <div className="relative min-h-[260px] md:min-h-[360px]">
          <Image src={f.image} alt={f.title} fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
