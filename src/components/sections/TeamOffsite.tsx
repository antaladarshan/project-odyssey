import Image from "next/image";
import { offsite } from "@/config/home";
import { buildWhatsAppLink } from "@/lib/requestToBook";
import MountainPattern from "@/components/ui/MountainPattern";

export default function TeamOffsite() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#ff2e63] to-[#e11d48]">
      <MountainPattern />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-10 items-center">
        <div className="flex flex-col gap-8">
          <h2 className="font-display font-bold text-white text-3xl sm:text-5xl leading-tight">{offsite.title}</h2>
          <a
            href={buildWhatsAppLink({ room: "Team offsite / group stay enquiry" })}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start bg-white text-po-ink hover:bg-po-yellow font-bold px-10 py-4 rounded-2xl transition-colors"
          >
            {offsite.cta}
          </a>
        </div>
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-4 border-white shadow-xl rotate-2">
          <Image src={offsite.image} alt="Group stay at Project Odyssey" fill quality={90} sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
