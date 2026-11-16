import Image from "next/image";
import BookingWidget from "@/components/ui/BookingWidget";

export default function Hero() {
  return (
    <section id="hero" className="relative">
      {/* Photo hero */}
      <div className="relative h-[560px] sm:h-[640px] overflow-hidden bg-po-ink">
        <Image
          src="/gallery/room-2a.webp"
          alt="Bunk beds with privacy curtains at Project Odyssey, Ahmedabad"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />

        {/* Stickers */}
        <div className="absolute left-3 sm:left-10 top-28 sm:top-36 flex flex-col items-start gap-1 z-10">
          <span className="sticker text-sm sm:text-2xl">More than just a bed</span>
          <span className="sticker sticker-yellow text-xs sm:text-xl ml-4">It&apos;s an experience</span>
        </div>
        <div className="absolute right-3 sm:right-10 top-28 sm:top-36 flex flex-col items-end gap-1 z-10">
          <span className="sticker sticker-yellow text-sm sm:text-2xl">Near ISRO SAC</span>
          <span className="sticker text-xs sm:text-xl mr-4">From ₹700 / night</span>
        </div>

        {/* Headline */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pb-16">
          <h1
            className="font-condensed uppercase text-white text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-wide"
            style={{ textShadow: "3px 3px 0 #f43f5e" }}
          >
            Gen Z stays here,
            <br />
            so does the fun!
          </h1>
          <p className="mt-5 max-w-xl text-white/90 text-sm sm:text-lg">
            Backpacker bunks with privacy curtains &amp; personal lockers — book direct, no OTA markup.
          </p>
        </div>
      </div>

      {/* Search card overlapping the hero's bottom edge */}
      <div className="relative z-20 -mt-16 sm:-mt-20 px-4 pb-4">
        <BookingWidget className="w-full max-w-3xl mx-auto" />
      </div>
    </section>
  );
}
