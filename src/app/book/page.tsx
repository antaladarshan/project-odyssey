import type { Metadata } from "next";
import Link from "next/link";
import BookingWidget from "@/components/ui/BookingWidget";
import { rooms } from "@/config/property";
import { buildWhatsAppLink } from "@/lib/requestToBook";

export const metadata: Metadata = {
  title: "Book Your Stay",
  description: "Book directly at Project Odyssey, Pune. No middleman, no markup.",
};

export default function BookPage() {
  return (
    <div className="min-h-screen bg-abyss pt-24 pb-24 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <p className="text-xs tracking-[0.3em] uppercase text-odyssey-blue font-semibold">Direct Booking</p>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-ice">Set Sail</h1>
          <p className="text-sky-tint">
            Pick your dates and cabin — we&apos;ll confirm via WhatsApp within a few hours.
          </p>
        </div>

        <BookingWidget />

        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-ice">Or choose a specific room:</p>
          <div className="flex flex-col gap-2">
            {rooms.map((room) => {
              const href = buildWhatsAppLink({ room: room.name });
              return (
                <a
                  key={room.id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl bg-ink border border-white/8 hover:border-odyssey-blue transition-colors group"
                >
                  <div>
                    <p className="text-sm font-medium text-ice">{room.name}</p>
                    <p className="text-xs text-sky-tint/60 mt-0.5">
                      Sleeps {room.capacity} · ₹{room.basePricePerNight.toLocaleString("en-IN")}/night
                    </p>
                  </div>
                  <span className="text-xs text-odyssey-blue group-hover:text-mascot-glow font-semibold transition-colors">
                    Book →
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        <p className="text-xs text-sky-tint/40 text-center">
          You&apos;ll be taken to WhatsApp to complete your booking request. We confirm and collect
          payment within hours.
        </p>
      </div>
    </div>
  );
}
