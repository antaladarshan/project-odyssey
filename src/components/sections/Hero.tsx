import Image from "next/image";
import BookingWidget from "@/components/ui/BookingWidget";
import { photo } from "@/config/photos";

// Layout copied from the reference hero: nav floats transparently over the photo,
// stickers sit at ~27% of the hero height (left pink pair, right yellow pair),
// two-line condensed headline centred, search card overlapping the bottom edge.
export default function Hero() {
  return (
    <section id="hero" className="relative">
      <div className="relative h-[78svh] min-h-[600px] overflow-hidden bg-po-ink">
        <Image
          src={photo.superhost}
          alt="Living area at Project Odyssey, Ahmedabad — an Airbnb Superhost stay"
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover object-[50%_14%]"
        />
        {/* light scrim: just enough for the white nav + headline to read */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/20" />

        {/* Left stickers */}
        <div className="absolute left-[1%] top-[24%] sm:top-[27%] z-10 flex flex-col items-start text-[clamp(0.85rem,1.5vw,1.85rem)]">
          <span className="sticker sticker-float -rotate-[4deg]">More than just a bed</span>
          <span className="sticker sticker-float ml-[8%] -mt-1 -rotate-[1deg]" style={{ animationDelay: "0.6s" }}>It&apos;s an experience</span>
        </div>

        {/* Right stickers */}
        <div className="absolute right-[3%] lg:right-[8%] top-[24%] sm:top-[28%] z-10 flex flex-col items-end text-[clamp(0.85rem,1.5vw,1.85rem)]">
          <span className="sticker sticker-yellow sticker-float" style={{ animationDelay: "1.2s" }}>Near ISRO SAC</span>
          <span className="sticker sticker-yellow sticker-float -mt-1 -rotate-[4deg]" style={{ animationDelay: "1.8s" }}>From ₹700 / night</span>
        </div>

        {/* Headline */}
        <div className="absolute inset-x-0 top-[44%] sm:top-[40%] -translate-y-1/2 z-10 text-center px-4">
          <h1
            className="font-condensed uppercase text-white text-[clamp(2.75rem,4.2vw,5rem)] leading-[0.95] tracking-wide"
            style={{ textShadow: "3px 3px 0 #f43f5e" }}
          >
            Gen Z stays here,
            <br />
            so does the fun!
          </h1>
        </div>
      </div>

      {/* Search card overlapping the hero's bottom edge */}
      <div className="relative z-20 -mt-24 px-4 pb-4">
        <BookingWidget className="w-full max-w-5xl mx-auto" />
      </div>
    </section>
  );
}
