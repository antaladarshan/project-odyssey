import type { Metadata } from "next";
import { Lightbulb, Zap, Projector, Wifi, MessageCircle, CalendarCheck } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import CtaBand from "@/components/ui/CtaBand";
import Faq from "@/components/sections/Faq";
import StudioImage from "@/components/studio/StudioImage";
import StudioBooking from "@/components/studio/StudioBooking";
import { buildStudioWhatsAppLink } from "@/lib/requestToBook";
import { photo } from "@/config/photos";
import { studioFaqs, studioMarquee, studioPhotos, studioStats, studioTerms } from "@/config/studio";

export const metadata: Metadata = {
  title: "Studio: Photoshoot & Podcast Location Rental in Ahmedabad | Project Odyssey",
  description:
    "Rent Project Odyssey by the hour for commercial photoshoots, podcasts, reels and brand content in Ahmedabad. From ₹1,800/hr, with 50% off the 8-hour package at launch.",
  alternates: { canonical: "/studio/" },
};

const enquiry = buildStudioWhatsAppLink({});

const amenities = [
  { icon: Lightbulb, title: "Natural light", text: "Daylight windows and warm interiors that photograph well." },
  { icon: Zap, title: "Power backup", text: "Keep your lights and cameras running through the session." },
  { icon: Projector, title: "Projector & screen", text: "Great for presentations, playback and mood backdrops." },
  { icon: Wifi, title: "Wi-Fi & AC", text: "Fast Wi-Fi and a comfortable room for long shoots." },
];

export default function StudioPage() {
  return (
    <>
      {/* Hero */}
      <section className="px-4 sm:px-6 pt-10 sm:pt-14 pb-10 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col gap-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <h1 className="font-display font-bold text-5xl sm:text-6xl text-po-ink leading-[1.05]">
              Your space.
              <span className="block headline-script text-5xl sm:text-6xl">Your vision.</span>
            </h1>
            <div className="flex flex-col gap-4">
              <p className="text-gray-600 text-base sm:text-lg max-w-md">
                A flexible location for brands, photographers, influencers and creators. Rent Project Odyssey by the
                hour for shoots, podcasts and reels in Ahmedabad.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#book"
                  className="inline-flex items-center gap-2 bg-po-pink hover:bg-po-pink-dark text-white font-bold px-7 py-3 rounded-full transition-colors"
                >
                  <CalendarCheck size={18} /> Book a slot
                </a>
                <a
                  href={enquiry}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border-2 border-po-pink text-po-pink hover:bg-po-pink hover:text-white font-bold px-7 py-3 rounded-full transition-colors"
                >
                  <MessageCircle size={18} /> WhatsApp us
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <StudioImage src={studioPhotos.shoot} label="Shoot set-up: sofa lounge" className="aspect-[4/3] shadow-lg" position="50% 62%" priority />
            <StudioImage src={studioPhotos.podcast} label="Podcast set-up: speaker and lounge" className="aspect-[4/3] shadow-lg" position="50% 72%" priority />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {studioMarquee.map((m) => (
              <span
                key={m}
                className="px-4 py-1.5 rounded-full bg-po-cream text-sm font-semibold text-po-ink border border-po-pink/15"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* About + stats */}
      <section className="px-4 sm:px-6 py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <StudioImage src={studioPhotos.about} label="Wall art, mirror and lamp corner" className="aspect-[4/5] shadow-lg" position="50% 35%" />
          <div className="flex flex-col gap-5">
            <SectionHeading align="left" script="The space" title="Built for the moments" />
            <p className="text-gray-600 leading-relaxed">
              Project Odyssey is a warm, character-filled space in Satellite, Ahmedabad: wall art, soft sofas, daylight
              and a balcony. Brands, photographers and creators use it for product shoots, lookbooks, interviews and
              podcasts, without the cost of a traditional studio.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {studioStats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-gray-100 p-4 shadow-sm">
                  <p className="font-display font-extrabold text-3xl text-po-pink">{s.value}</p>
                  <p className="text-xs font-bold tracking-widest uppercase text-gray-500 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-4 sm:px-6 pb-16 sm:pb-20 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col gap-10">
          <SectionHeading
            script="Look around"
            title="A room made for your frame"
            sub="Corners, colours and backdrops, all in one location."
          />
          <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-4">
            <StudioImage
              src={studioPhotos.galleryLarge}
              label="Sofa and coffee table"
              position="50% 70%"
              className="col-span-2 row-span-2 aspect-[4/3] md:aspect-auto md:min-h-[360px]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <StudioImage src={studioPhotos.galleryA} label="Projector movie night" className="aspect-square" position="50% 55%" sizes="25vw" />
            <StudioImage src={studioPhotos.galleryB} label="Hangout in the lounge" className="aspect-square" position="50% 60%" sizes="25vw" />
            <StudioImage src={studioPhotos.galleryC} label="Balcony" className="aspect-square" sizes="25vw" />
            <StudioImage src={studioPhotos.galleryD} label="Wall art detail" className="aspect-square" sizes="25vw" />
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="px-4 sm:px-6 pb-16 sm:pb-20 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {amenities.map((a) => (
            <div key={a.title} className="rounded-2xl border border-gray-100 p-6 shadow-sm">
              <span className="grid place-items-center w-11 h-11 rounded-full bg-po-pink/10 text-po-pink mb-3">
                <a.icon size={20} />
              </span>
              <h3 className="font-bold text-po-ink">{a.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{a.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Packages, calculator, slot picker */}
      <StudioBooking />

      {/* Terms */}
      <section className="px-4 sm:px-6 pb-4 bg-white">
        <div className="max-w-6xl mx-auto rounded-2xl bg-po-pink/5 border border-po-pink/15 p-6">
          <p className="text-xs font-bold tracking-widest uppercase text-po-pink mb-2">Booking terms</p>
          <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1.5">
            {studioTerms.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <Faq items={studioFaqs} script="Need help?" title="Frequently Asked Questions" />

      <CtaBand
        title="Ready when you are."
        text="Tell us the date and what you're creating, and we'll get your slot ready."
        buttonLabel="Message us"
        href={enquiry}
        image={photo.wallArtLamp}
      />
    </>
  );
}
