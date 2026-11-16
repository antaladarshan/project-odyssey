import type { Metadata } from "next";
import { MapPin, LayoutGrid, ShieldCheck, FileCheck2, Handshake, Brush, Sparkles, CalendarCheck, Users, Building2, MessageCircle } from "lucide-react";
import PageHeroBanner from "@/components/ui/PageHeroBanner";
import SectionHeading from "@/components/ui/SectionHeading";
import CtaBand from "@/components/ui/CtaBand";
import Faq from "@/components/sections/Faq";
import { buildWhatsAppLink } from "@/lib/requestToBook";

export const metadata: Metadata = {
  title: "Partner with Project Odyssey",
  description:
    "Have a property in Gujarat? Talk to Project Odyssey about turning it into a well-run, community-first stay.",
  alternates: { canonical: "/partner-with-us/" },
};

const enquiry = buildWhatsAppLink({ room: "Partnership enquiry" });

// "What we look at" — a conversation, not a checklist. No numeric thresholds on purpose.
const criteria = [
  { icon: MapPin, title: "Location", text: "A well-connected area with demand from travellers, students and working professionals." },
  { icon: LayoutGrid, title: "Space", text: "Rooms that can work as dorms or private rooms, plus a common area for guests to gather." },
  { icon: ShieldCheck, title: "Condition", text: "A clean, safe building that suits hospitality use." },
  { icon: FileCheck2, title: "Paperwork", text: "The permissions and licences needed to run a stay at the property." },
];

const benefits = [
  { icon: Sparkles, title: "A brand guests recognise", text: "Project Odyssey is built around privacy curtains, personal lockers and a real community." },
  { icon: CalendarCheck, title: "Direct bookings", text: "A booking system and direct channel so guests can reserve without a middleman." },
  { icon: Brush, title: "Thoughtful design", text: "Bunks, lockers and shared spaces planned to make the most of the space you have." },
  { icon: Users, title: "Community feel", text: "A shared-stay experience that brings guests back and gets them talking about it." },
  { icon: Handshake, title: "A real partnership", text: "We agree the structure with you up front — no one-size-fits-all contract." },
  { icon: Building2, title: "Your property, upgraded", text: "Turn an underused building into a lively, well-run stay." },
];

const steps = [
  { n: "01", title: "Tell us about it", text: "Share the location, photos and a few details about your property." },
  { n: "02", title: "Property review", text: "We look at feasibility and, if it fits, schedule a visit." },
  { n: "03", title: "Agree how we work", text: "We discuss how involved each side wants to be, and put it in writing." },
  { n: "04", title: "Launch", text: "Set up the space, onboard the team and open to guests." },
];

const partnerFaqs = [
  { q: "What kind of property are you looking for?", a: "A well-located building in Gujarat with space for dorms or private rooms and a shared area. Tell us about yours and we will take it from there." },
  { q: "Who runs the property day to day?", a: "That is part of the conversation — we agree the split of responsibilities with each partner before anything is signed." },
  { q: "What does it cost to get started?", a: "It depends on the property and the setup. We will share a clear picture after we have reviewed the space." },
  { q: "How long does it take to launch?", a: "It varies with the condition of the property and the work needed. We will give you a realistic timeline after the visit." },
  { q: "Do I need hospitality experience?", a: "No. If you have the property and the intent, we can help with the rest." },
];

export default function PartnerWithUsPage() {
  return (
    <>
      <PageHeroBanner
        title="Turn your property into a"
        accent="Project Odyssey."
        text="You bring the space. We bring the brand, the guests and the know-how to run it well."
        image="/gallery/room-1a.webp"
      >
        <a
          href={enquiry}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-po-pink hover:bg-po-pink-dark text-white font-bold px-7 py-3 rounded-full transition-colors"
        >
          <MessageCircle size={18} /> Partner with us
        </a>
      </PageHeroBanner>

      {/* What we look at */}
      <section className="px-4 sm:px-6 pb-16 sm:pb-20 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col gap-10">
          <SectionHeading
            align="left"
            script="Property criteria"
            title="Does your property qualify?"
            sub="Four things we look at. If your property ticks most of them, it is worth a conversation."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {criteria.map((c) => (
              <div key={c.title} className="rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col gap-3">
                <span className="grid place-items-center w-11 h-11 rounded-full bg-po-pink/10 text-po-pink">
                  <c.icon size={20} />
                </span>
                <h3 className="font-bold text-po-ink">{c.title}</h3>
                <p className="text-sm text-gray-600">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-4 sm:px-6 py-16 sm:py-20 bg-po-cream">
        <div className="max-w-6xl mx-auto flex flex-col gap-10">
          <SectionHeading
            align="left"
            script="Why Project Odyssey"
            title="You bring the property. We bring the hospitality."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-2xl bg-white p-6 shadow-sm flex flex-col gap-3">
                <span className="grid place-items-center w-11 h-11 rounded-full bg-po-pink/10 text-po-pink">
                  <b.icon size={20} />
                </span>
                <h3 className="font-bold text-po-ink">{b.title}</h3>
                <p className="text-sm text-gray-600">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="px-4 sm:px-6 py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col gap-10">
          <SectionHeading align="left" script="The process" title="From property to launch." />
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <li key={s.n} className="flex flex-col gap-2">
                <span className="grid place-items-center w-12 h-12 rounded-full border-2 border-po-pink text-po-pink font-bold">
                  {s.n}
                </span>
                <h3 className="font-bold text-po-ink mt-1">{s.title}</h3>
                <p className="text-sm text-gray-600">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Faq items={partnerFaqs} script="Need help?" title="Frequently Asked Questions" />

      <CtaBand
        title="Let's build the next Project Odyssey together."
        text="Tell us about your property and we'll take it from there."
        buttonLabel="Partner with us"
        href={enquiry}
        image="/gallery/room-3a.webp"
      />
    </>
  );
}
