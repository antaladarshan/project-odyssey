import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { labels } from "@/config/labels";

export default function ReturningGuest() {
  return (
    <section className="py-10 px-4 sm:px-6 bg-white">
      <div className="max-w-4xl mx-auto rounded-3xl bg-po-cream px-6 py-8 flex flex-col sm:flex-row items-center gap-5 justify-between text-center sm:text-left">
        <div className="flex items-center gap-4">
          <span className="grid place-items-center w-12 h-12 rounded-full bg-white text-po-pink shrink-0">
            <RotateCcw size={20} />
          </span>
          <div>
            <h2 className="font-display font-bold text-xl text-po-ink">{labels.returningGuest.heading}</h2>
            <p className="text-sm text-gray-600">{labels.returningGuest.sub}</p>
          </div>
        </div>
        <div className="flex gap-3 shrink-0">
          <Link href="/account" className="bg-po-pink hover:bg-po-pink-dark text-white font-bold px-6 py-2.5 rounded-full transition-colors text-sm">
            {labels.returningGuest.cta}
          </Link>
          <Link href="/login" className="border border-gray-300 hover:border-po-pink hover:text-po-pink font-semibold px-6 py-2.5 rounded-full transition-colors text-sm">
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}
