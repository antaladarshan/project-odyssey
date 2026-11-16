import Image from "next/image";
import type { ExpandItem } from "@/config/home";

/**
 * Row of photo cards. On desktop the hovered (or keyboard-focused) card smoothly
 * grows while its neighbours shrink. On mobile the cards simply stack.
 */
export default function HoverExpandRow({ items }: { items: ExpandItem[] }) {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {items.map((it) => (
        <div
          key={it.label}
          tabIndex={0}
          className="group relative min-w-0 overflow-hidden rounded-3xl h-64 sm:h-80 lg:h-[26rem] lg:flex-1 lg:hover:flex-[2.4] lg:focus-visible:flex-[2.4] transition-[flex-grow] duration-500 ease-out outline-none focus-visible:ring-4 focus-visible:ring-po-pink/50 shadow-md"
        >
          <Image
            src={it.image}
            alt={it.label}
            fill
            quality={90}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-focus-visible:scale-105"
          />
          <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors duration-500" />
          <span
            className="absolute inset-0 flex items-center justify-center px-6 text-center font-condensed uppercase text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-wide"
            style={{ textShadow: "0 2px 14px rgba(0,0,0,0.55)" }}
          >
            {it.label}
          </span>
        </div>
      ))}
    </div>
  );
}
