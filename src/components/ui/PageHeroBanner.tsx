import Image from "next/image";
import type { ReactNode } from "react";

/** Two-column page hero: big headline + text + buttons on the left, rounded photo on the right. */
export default function PageHeroBanner({
  title,
  accent,
  text,
  image,
  children,
}: {
  title: string;
  accent: string;
  text: string;
  image: string;
  children?: ReactNode;
}) {
  return (
    <section className="px-4 sm:px-6 pt-10 sm:pt-14 pb-14 sm:pb-20 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col gap-5">
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-po-ink leading-tight">
            {title} <span className="text-po-pink">{accent}</span>
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-md">{text}</p>
          {children && <div className="flex flex-wrap gap-3 mt-1">{children}</div>}
        </div>
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
          <Image src={image} alt="" fill priority quality={90} sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
