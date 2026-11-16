import Link from "next/link";
import { PartyPopper, Handshake } from "lucide-react";
import { hostPartnerCards } from "@/config/home";

const icons = { PartyPopper, Handshake };

export default function HostPartnerCards() {
  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {hostPartnerCards.map((c) => {
          const Icon = icons[c.icon];
          return (
            <div
              key={c.href}
              className="flex items-center justify-between gap-4 rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col gap-3 min-w-0">
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-po-ink leading-tight">
                  {c.title} <span className="text-po-pink">{c.accent}</span> {c.rest}
                </h3>
                <p className="text-sm text-gray-600">{c.text}</p>
                <Link href={c.href} className="mt-1 text-sm font-bold text-po-ink underline underline-offset-4 hover:text-po-pink w-fit">
                  {c.cta}
                </Link>
              </div>
              <span className="hidden sm:grid shrink-0 place-items-center w-28 h-28 rounded-full bg-po-pink/10 text-po-pink">
                <Icon size={52} strokeWidth={1.4} />
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
