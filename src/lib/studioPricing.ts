import { launchOffer, studioRules, studioTiers } from "../config/studio";

export interface StudioQuote {
  hours: number;
  /** Hourly rate that applies (effective, after any launch offer). */
  rate: number;
  tierLabel: string;
  /** Price before the launch offer. */
  regular: number;
  total: number;
  savings: number;
  advance: number;
  balance: number;
  /** Set when a longer package would cost less than this one. */
  upsell?: { hours: number; price: number };
}

function tierFor(hours: number) {
  // Highest tier whose hours <= requested hours.
  return [...studioTiers].reverse().find((t) => hours >= t.hours) ?? studioTiers[0];
}

export function quoteStudio(rawHours: number): StudioQuote {
  const hours = Math.min(
    studioRules.maxHours,
    Math.max(studioRules.minHours, Math.round(Number.isFinite(rawHours) ? rawHours : studioRules.minHours)),
  );
  const tier = tierFor(hours);
  const eightHour = studioTiers.find((t) => t.hours === launchOffer.hours)!;
  const eightHourRegular = eightHour.hours * eightHour.rate;
  const eightHourNow = launchOffer.active ? launchOffer.price : eightHourRegular;

  let regular: number;
  let total: number;
  let tierLabel = tier.label;

  if (hours > eightHour.hours) {
    const extra = hours - eightHour.hours;
    regular = eightHourRegular + extra * studioRules.extraHourRate;
    total = eightHourNow + extra * studioRules.extraHourRate;
    tierLabel = `${eightHour.label} + ${extra} extra`;
  } else if (hours === eightHour.hours) {
    regular = eightHourRegular;
    total = eightHourNow;
  } else {
    regular = hours * tier.rate;
    total = regular;
  }

  const rate = Math.round(total / hours);
  const advance = Math.round((total * studioRules.advancePct) / 100);
  const upsell =
    hours < eightHour.hours && total > eightHourNow
      ? { hours: eightHour.hours, price: eightHourNow }
      : undefined;

  return {
    hours,
    rate,
    tierLabel,
    regular,
    total,
    savings: regular - total,
    advance,
    balance: total - advance,
    upsell,
  };
}

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
