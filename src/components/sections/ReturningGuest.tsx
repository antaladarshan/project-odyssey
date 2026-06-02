import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { labels } from "@/config/labels";

export default function ReturningGuest() {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 bg-abyss border-y border-white/5">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-5">
        <div className="p-3 rounded-full bg-odyssey-blue/10 border border-odyssey-blue/20">
          <RotateCcw size={22} className="text-odyssey-blue" />
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-ice">
          {labels.returningGuest.heading}
        </h2>
        <p className="text-sky-tint text-base sm:text-lg">{labels.returningGuest.sub}</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/account"
            className="bg-odyssey-blue hover:bg-azure-deep text-white font-semibold px-8 py-3 rounded-full transition-colors"
          >
            {labels.returningGuest.cta}
          </Link>
          <Link
            href="/login"
            className="border border-white/15 hover:border-odyssey-blue text-sky-tint hover:text-odyssey-blue font-semibold px-8 py-3 rounded-full transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}
