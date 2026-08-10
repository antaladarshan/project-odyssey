// Mirrors the length-of-stay discount math in src/lib/pricing.ts so the PMS
// pricing page can show a worked example before saving. Thresholds (7 / 14 /
// 27 nights) are fixed, matching the live engine.

export interface PreviewTier {
  nights: number;
  label: string;
  pct: number;
  perNight: number;
  total: number;
}

const TIERS = [
  { nights: 7, label: "7 nights" },
  { nights: 14, label: "14 nights" },
  { nights: 27, label: "27+ nights (monthly)" },
] as const;

export function previewTiers(
  basePrice: number,
  pct: { weekly: number; extended: number; monthly: number }
): PreviewTier[] {
  const pctFor = (nights: number) => {
    if (nights >= 27) return pct.monthly;
    if (nights >= 14) return pct.extended;
    if (nights >= 7) return pct.weekly;
    return 0;
  };

  return TIERS.map(({ nights, label }) => {
    const p = pctFor(nights);
    const total = Math.round(nights * basePrice * (1 - p / 100));
    return { nights, label, pct: p, perNight: nights > 0 ? Math.round(total / nights) : 0, total };
  });
}
