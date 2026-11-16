import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/requestToBook";

export default function GroupCta() {
  return (
    <section className="bg-po-pink px-4 sm:px-6 py-14 sm:py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <h2 className="font-condensed uppercase text-white text-4xl sm:text-6xl leading-none tracking-wide">
            Travelling as a group?
            <br />
            <span className="text-po-yellow">Take the whole room.</span>
          </h2>
          <p className="mt-4 text-white/90 max-w-xl text-sm sm:text-base">
            Fill all 4 or 6 beds and the room is yours alone — perfect for friends, teams and families.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <a
            href={buildWhatsAppLink({ room: "Group booking — full room" })}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-po-pink hover:bg-po-yellow hover:text-po-ink font-bold px-8 py-3 rounded-full transition-colors text-center"
          >
            Ask on WhatsApp
          </a>
          <Link
            href="/property/project-odyssey-ahmedabad/"
            className="border-2 border-white text-white hover:bg-white hover:text-po-pink font-bold px-8 py-3 rounded-full transition-colors text-center"
          >
            Check rooms
          </Link>
        </div>
      </div>
    </section>
  );
}
