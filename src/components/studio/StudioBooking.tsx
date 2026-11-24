"use client";

import { useMemo, useState } from "react";
import { Minus, Plus, MessageCircle, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import StudioSlotPicker from "./StudioSlotPicker";
import { launchOffer, shootTypes, studioRules, studioTiers, type ShootType } from "@/config/studio";
import { buildStudioWhatsAppLink } from "@/lib/requestToBook";
import { inr, quoteStudio } from "@/lib/studioPricing";

const quickHours = [1, 4, 8];

/** Packages + calculator + custom-pricing box + slot picker, sharing one selection. */
export default function StudioBooking() {
  const [hours, setHours] = useState(4);
  const [type, setType] = useState<ShootType>("Photoshoot");
  const [people, setPeople] = useState(2);
  const quote = useMemo(() => quoteStudio(hours), [hours]);

  const setClamped = (h: number) =>
    setHours(Math.min(studioRules.maxHours, Math.max(studioRules.minHours, h)));

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const custom = buildStudioWhatsAppLink({ type: "Full-day / multi-day / custom pricing enquiry" });

  return (
    <>
      {/* Packages */}
      <section className="px-4 sm:px-6 py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col gap-10">
          <SectionHeading
            script="Simple pricing"
            title="Pick your package"
            sub="Longer bookings get a lower hourly rate."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {studioTiers.map((t) => {
              const isOffer = launchOffer.active && t.hours === launchOffer.hours;
              const regular = t.hours * t.rate;
              const price = isOffer ? launchOffer.price : regular;
              return (
                <div
                  key={t.hours}
                  className={`relative flex flex-col gap-3 rounded-3xl p-7 ${
                    isOffer
                      ? "bg-gradient-to-br from-[#ff2e63] to-[#e11d48] text-white shadow-xl md:-translate-y-2"
                      : "border border-gray-100 shadow-sm bg-white"
                  }`}
                >
                  {isOffer && (
                    <span className="sticker sticker-yellow absolute -top-3 right-5">
                      {launchOffer.label} · Launch offer
                    </span>
                  )}
                  <p className={`text-xs font-bold tracking-widest uppercase ${isOffer ? "text-white/80" : "text-po-pink"}`}>
                    {t.label}
                  </p>
                  <div className="flex items-baseline gap-2">
                    {isOffer && <span className="text-lg line-through text-white/70">{inr(regular)}</span>}
                    <span className="font-display font-extrabold text-4xl">{inr(price)}</span>
                  </div>
                  <p className={`text-sm ${isOffer ? "text-white/90" : "text-gray-600"}`}>
                    {inr(Math.round(price / t.hours))}/hr
                    {isOffer ? " · pay only half" : t.hours > 1 ? " · discounted hourly rate" : ""}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setClamped(t.hours);
                      scrollTo("calculator");
                    }}
                    className={`mt-2 font-bold px-6 py-3 rounded-full transition-colors ${
                      isOffer
                        ? "bg-white text-po-pink hover:bg-po-yellow hover:text-po-ink"
                        : "bg-po-pink text-white hover:bg-po-pink-dark"
                    }`}
                  >
                    Book this
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section id="calculator" className="px-4 sm:px-6 pb-16 sm:pb-20 bg-white scroll-mt-20">
        <div className="max-w-6xl mx-auto rounded-3xl bg-po-cream p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8">
          <div className="flex flex-col gap-6">
            <h2 className="flex flex-col leading-none">
              <span className="headline-script text-3xl sm:text-4xl">Tell us what you&apos;re making.</span>
              <span className="font-display font-extrabold text-3xl sm:text-4xl text-po-pink -mt-0.5">
                We&apos;ll do the maths.
              </span>
            </h2>

            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-po-pink mb-2">What are you shooting?</p>
              <div className="flex flex-wrap gap-2">
                {shootTypes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setType(s)}
                    aria-pressed={type === s}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                      type === s
                        ? "bg-po-pink border-po-pink text-white"
                        : "bg-white border-gray-200 text-po-ink hover:border-po-pink"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-po-pink mb-2">Hours</p>
                <div className="flex items-center gap-3">
                  <Stepper
                    value={hours}
                    onChange={setClamped}
                    min={studioRules.minHours}
                    max={studioRules.maxHours}
                    label="hours"
                  />
                </div>
                <div className="flex gap-2 mt-3">
                  {quickHours.map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setClamped(h)}
                      aria-pressed={hours === h}
                      className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                        hours === h
                          ? "bg-po-ink border-po-ink text-white"
                          : "bg-white border-gray-200 text-po-ink hover:border-po-ink"
                      }`}
                    >
                      {h} hr{h > 1 ? "s" : ""}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-po-pink mb-2">People</p>
                <Stepper value={people} onChange={(n) => setPeople(Math.max(1, Math.min(20, n)))} min={1} max={20} label="people" />
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-[#ff2e63] to-[#e11d48] text-white p-7 flex flex-col gap-4">
            <p className="text-xs font-bold tracking-widest uppercase text-white/80">Your estimate</p>
            <p className="font-display font-extrabold text-5xl leading-none">
              {quote.hours} <span className="text-2xl">hr{quote.hours > 1 ? "s" : ""}</span>
            </p>
            <p className="text-sm text-white/85">
              {quote.tierLabel} · {inr(quote.rate)}/hr
            </p>
            <dl className="text-sm flex flex-col gap-1.5 border-t border-white/25 pt-4">
              {quote.savings > 0 && (
                <Row label="Regular price" value={<span className="line-through text-white/70">{inr(quote.regular)}</span>} />
              )}
              {quote.savings > 0 && <Row label="Launch saving" value={`−${inr(quote.savings)}`} />}
              <Row label="Total" value={<span className="font-display font-bold text-2xl">{inr(quote.total)}</span>} />
              <Row label={`${studioRules.advancePct}% advance`} value={inr(quote.advance)} />
              <Row label="Balance on the day" value={inr(quote.balance)} />
            </dl>
            {quote.upsell && (
              <button
                type="button"
                onClick={() => setClamped(quote.upsell!.hours)}
                className="text-left text-sm bg-white/15 hover:bg-white/25 rounded-xl px-4 py-3 transition-colors"
              >
                Better value: book {quote.upsell.hours} hrs for <b>{inr(quote.upsell.price)}</b> instead →
              </button>
            )}
            <button
              type="button"
              onClick={() => scrollTo("book")}
              className="mt-1 inline-flex items-center justify-center gap-2 bg-white text-po-pink hover:bg-po-yellow hover:text-po-ink font-bold px-6 py-3 rounded-full transition-colors"
            >
              Continue to booking <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Beyond the usual */}
      <section className="px-4 sm:px-6 pb-4 bg-white">
        <div className="max-w-6xl mx-auto rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-display font-bold text-xl text-po-ink">Book beyond the usual.</h3>
            <p className="text-sm text-gray-600 mt-1 max-w-xl">
              Full-day, multi-day or recurring bookings? Tell us what you need and we&apos;ll quote it.
            </p>
          </div>
          <a
            href={custom}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-po-pink hover:bg-po-pink-dark text-white font-bold px-6 py-3 rounded-full transition-colors shrink-0"
          >
            <MessageCircle size={18} /> Request custom pricing
          </a>
        </div>
      </section>

      <StudioSlotPicker quote={quote} type={type} people={people} />
    </>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-white/85">{label}</dt>
      <dd className="font-semibold">{value}</dd>
    </div>
  );
}

function Stepper({
  value,
  onChange,
  min,
  max,
  label,
}: {
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  label: string;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-white border border-gray-200 p-1">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={`Fewer ${label}`}
        className="grid place-items-center w-9 h-9 rounded-full hover:bg-po-cream disabled:opacity-30"
      >
        <Minus size={16} />
      </button>
      <span className="w-10 text-center font-display font-bold text-po-ink" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label={`More ${label}`}
        className="grid place-items-center w-9 h-9 rounded-full hover:bg-po-cream disabled:opacity-30"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
