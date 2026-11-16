import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Users, Sofa, Wifi, Wind, UserCheck, MessageCircle } from "lucide-react";
import PageHeroBanner from "@/components/ui/PageHeroBanner";
import SectionHeading from "@/components/ui/SectionHeading";
import CtaBand from "@/components/ui/CtaBand";
import { buildWhatsAppLink } from "@/lib/requestToBook";
import { photo } from "@/config/photos";

export const metadata: Metadata = {
  title: "Host an Event at Project Odyssey, Ahmedabad",
  description:
    "Planning a workshop, meetup or community event in Satellite, Ahmedabad? Talk to Project Odyssey about hosting it in our common area.",
  alternates: { canonical: "/host-an-event/" },
};

const enquiry = buildWhatsAppLink({ room: "Event hosting enquiry" });

// TODO(owner): confirm each of these is something you can actually offer before launch.
const included = [
  { icon: Sofa, title: "Common area space", text: "Our shared common area, set up for your session or meetup." },
  { icon: Wifi, title: "Wi-Fi", text: "Fast Wi-Fi for presentations, streaming and your attendees." },
  { icon: Wind, title: "Air-conditioned comfort", text: "A comfortable space whatever the Ahmedabad weather is doing." },
  { icon: UserCheck, title: "On-site host", text: "A member of the Odyssey team around to help with seating and logistics." },
];

const whyBlocks = [
  {
    icon: MapPin,
    title: "Right in the middle of Ahmedabad",
    text: "We're in Satellite, Jodhpur Village — close to ISRO SAC, Star Bazaar, SG Highway and the metro, so your guests can get here easily.",
    image: photo.balcony,
  },
  {
    icon: Users,
    title: "A curious, young community",
    text: "Backpackers, students, interns and remote workers stay with us all year round — an audience that loves meeting new people and trying new things.",
    image: photo.livingBeanbags,
  },
];

export default function HostAnEventPage() {
  return (
    <>
      <PageHeroBanner
        title="Host an Event at"
        accent="Project Odyssey"
        text="Ready to put on a show and find the right venue? Our common area in Satellite, Ahmedabad is open to community events, workshops and meetups."
        image={photo.movieNight}
      >
        <a
          href={enquiry}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-po-pink hover:bg-po-pink-dark text-white font-bold px-7 py-3 rounded-full transition-colors"
        >
          <MessageCircle size={18} /> Enquire on WhatsApp
        </a>
      </PageHeroBanner>

      {/* Why host with us */}
      <section className="px-4 sm:px-6 pb-16 sm:pb-20 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col gap-14">
          <SectionHeading align="left" script="Glad you asked" title="Why host with us?" />
          {whyBlocks.map((b, i) => (
            <div key={b.title} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className={`relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg ${i % 2 ? "md:order-2" : ""}`}>
                <Image src={b.image} alt={b.title} fill quality={90} sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </div>
              <div className="flex flex-col gap-3 md:px-6">
                <span className="grid place-items-center w-12 h-12 rounded-full bg-po-pink/10 text-po-pink">
                  <b.icon size={22} />
                </span>
                <h3 className="font-display font-bold text-xl text-po-ink">{b.title}</h3>
                <p className="text-gray-600 leading-relaxed">{b.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Charges: no numbers yet */}
      <section className="px-4 sm:px-6 pb-16 sm:pb-20 bg-white">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-4 rounded-3xl bg-po-cream p-8 sm:p-10">
          <p className="text-xs font-bold tracking-widest uppercase text-po-pink">Event hosting charges</p>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-po-ink">Tell us about your event</h2>
          <p className="text-gray-600 max-w-lg">
            Pricing depends on your date, group size and what you need. Message us the details and we&apos;ll
            come back with a quote.
          </p>
          <a
            href={enquiry}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-po-pink hover:bg-po-pink-dark text-white font-bold px-8 py-3 rounded-full transition-colors"
          >
            Ask for a quote
          </a>
        </div>
      </section>

      {/* What's included */}
      <section className="px-4 sm:px-6 pb-16 sm:pb-20 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col gap-10">
          <SectionHeading align="left" script="Everything you need" title="What's included?" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {included.map((it) => (
              <div key={it.title} className="flex gap-4 rounded-2xl border border-gray-100 p-5 shadow-sm">
                <span className="grid place-items-center w-12 h-12 shrink-0 rounded-full bg-po-pink/10 text-po-pink">
                  <it.icon size={22} />
                </span>
                <div>
                  <h3 className="font-bold text-po-ink">{it.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{it.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Please note */}
      <section className="px-4 sm:px-6 pb-4 bg-white">
        <div className="max-w-6xl mx-auto rounded-2xl bg-po-pink/5 border border-po-pink/15 p-6">
          <p className="text-xs font-bold tracking-widest uppercase text-po-pink mb-2">Please note</p>
          <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1.5">
            {/* TODO(owner): replace with your real event rules */}
            <li>Timings, capacity and house rules are confirmed with you for each event.</li>
            <li>All visitors may be asked to share ID at the door, as for any stay.</li>
            <li>Event dates are subject to availability of the common area.</li>
          </ul>
        </div>
      </section>

      <CtaBand
        title="Ready to host your next event with us?"
        text="Send us a message with the date and what you have in mind — we'll get back to you."
        buttonLabel="Message us"
        href={enquiry}
        image={photo.livingSofa}
      />
    </>
  );
}
