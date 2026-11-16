import Image from "next/image";
import MountainPattern from "@/components/ui/MountainPattern";

/** Pink rounded CTA card with mountain pattern and a photo on the right. */
export default function CtaBand({
  title,
  text,
  buttonLabel,
  href,
  image,
}: {
  title: string;
  text?: string;
  buttonLabel: string;
  href: string;
  image: string;
}) {
  return (
    <section className="px-4 sm:px-6 py-14 sm:py-20 bg-white">
      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1.4fr_1fr] rounded-3xl overflow-hidden bg-gradient-to-r from-[#ff2e63] to-[#e11d48]">
        <MountainPattern />
        <div className="relative p-8 sm:p-12 flex flex-col gap-5 justify-center">
          <h2 className="font-display font-bold text-white text-3xl sm:text-4xl leading-tight">{title}</h2>
          {text && <p className="text-white/90 max-w-md">{text}</p>}
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start bg-white text-po-pink hover:bg-po-yellow hover:text-po-ink font-bold px-8 py-3 rounded-xl transition-colors"
          >
            {buttonLabel}
          </a>
        </div>
        <div className="relative min-h-[220px]">
          <Image src={image} alt="" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
