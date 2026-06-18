// ── Length-of-stay pricing engine ────────────────────────────────────────────
// Single source of truth for all price calculations on this site.
//
// Model: flat nightly rate × nights, then apply one LOS discount tier,
// then apply an optional coupon. Never round mid-calculation — only once
// at the very end, so there is no ±1 rupee drift.
//
// This site has no Razorpay / Supabase integration (WhatsApp handoff only).
// All calculations are client-side; there is no separate server re-validation
// step. If payment processing is added later, move calcPricing to a server
// route and call it from the Razorpay order handler.

// ── Config ────────────────────────────────────────────────────────────────────

export interface PricingConfig {
  /** nights threshold for weekly discount (>= n) */
  weeklyMinNights: number;
  /** fraction off, e.g. 0.20 = 20% */
  weeklyDiscountPct: number;
  /** nights threshold for monthly discount (>= n) */
  monthlyMinNights: number;
  /** fraction off, e.g. 0.40 = 40% */
  monthlyDiscountPct: number;
  /**
   * When true (Airbnb / Hosteller default) a 7-night stay CAN cost less than
   * a 6-night stay because the LOS discount is applied to the whole base.
   * When false, total(n) is clamped to max(total(n), total(n-1)) so a longer
   * stay is never cheaper than a shorter one.
   */
  allowLongerCheaper: boolean;
  /** nights threshold for the WORKATION coupon */
  workationMinNights: number;
  /** workation coupon fraction, e.g. 0.15 = 15% off after LOS discount */
  workationPct: number;
}

export const DEFAULT_CONFIG: PricingConfig = {
  weeklyMinNights: 7,
  weeklyDiscountPct: 0.20,
  monthlyMinNights: 28,
  monthlyDiscountPct: 0.40,
  allowLongerCheaper: true,
  workationMinNights: 7,
  workationPct: 0.15,
};

// Project Odyssey's specific discount rates.
// Anchors: ~₹497/night at 7 nights, ~₹357/night for a month.
//   700 × (1 – 0.29) = 497  → 7n = ₹3,479
//   700 × (1 – 0.49) = 357  → 30n room charges = ₹10,710
// Floor check: a 30-night stay WITH the 15% WORKATION coupon still totals
//   ≈ ₹9,103 (10,710 − 1,607) — kept around ₹9,000 minimum even after the coupon.
// Monthly tier starts at 27 nights.
export const ODYSSEY_PRICING_CONFIG: Partial<PricingConfig> = {
  weeklyDiscountPct: 0.29,
  monthlyMinNights: 27,
  monthlyDiscountPct: 0.49,
  allowLongerCheaper: true,
};

// ── Types ─────────────────────────────────────────────────────────────────────

export interface PricingBreakdown {
  nights: number;
  nightlyRate: number;
  /** nights × nightlyRate, before any discount */
  base: number;
  /** 0 | weeklyDiscountPct | monthlyDiscountPct */
  losDiscountPct: number;
  losDiscountAmt: number;
  /** coupon fraction applied (0 if workation not active) */
  couponPct: number;
  couponAmt: number;
  /** base – losDiscountAmt – couponAmt */
  taxableAmount: number;
  /** taxes are currently 0 (removed per product decision) */
  taxes: number;
  fees: number;
  /** final price, rounded to nearest rupee exactly once */
  total: number;
  /** total / nights, rounded */
  perNight: number;
}

// ── Core helpers ──────────────────────────────────────────────────────────────

/** Compute night count from ISO date strings in Asia/Kolkata timezone. */
export function nightsBetween(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  // Anchor both dates at midnight IST to avoid UTC-boundary drift
  const toIST = (d: string) => new Date(`${d}T00:00:00+05:30`).getTime();
  return Math.max(0, Math.round((toIST(checkOut) - toIST(checkIn)) / 86_400_000));
}

function losDiscountPctFor(nights: number, cfg: PricingConfig): number {
  if (nights >= cfg.monthlyMinNights) return cfg.monthlyDiscountPct;
  if (nights >= cfg.weeklyMinNights) return cfg.weeklyDiscountPct;
  return 0;
}

/** Raw (unrounded) total for use in the monotonic clamp — not exported. */
function rawTotal(
  nights: number,
  nightlyRate: number,
  workation: boolean,
  cfg: PricingConfig,
): number {
  const base = nights * nightlyRate;
  const losPct = losDiscountPctFor(nights, cfg);
  const afterLos = base * (1 - losPct);
  const workationEligible = nights >= cfg.workationMinNights;
  const couponPct = workation && workationEligible ? cfg.workationPct : 0;
  return afterLos * (1 - couponPct); // no taxes
}

// ── Main pricing function ─────────────────────────────────────────────────────

/**
 * calcPricing — the single source of truth.
 *
 * @param nights      Number of nights (checkout − checkin date diff).
 * @param nightlyRate Base per-bed per-night rate (e.g. room.basePricePerBedPerNight).
 * @param options.workation  Whether the WORKATION coupon is applied.
 * @param options.config     Override any PricingConfig fields.
 * @throws if nights ≤ 0.
 */
export function calcPricing(
  nights: number,
  nightlyRate: number,
  options: { workation?: boolean; config?: Partial<PricingConfig> } = {},
): PricingBreakdown {
  const cfg: PricingConfig = { ...DEFAULT_CONFIG, ...options.config };
  const workation = options.workation ?? false;

  if (nights <= 0) {
    throw new Error(`calcPricing: nights must be > 0, got ${nights}`);
  }

  const base = nights * nightlyRate;
  const losPct = losDiscountPctFor(nights, cfg);
  const losDiscountAmt = base * losPct;
  const afterLos = base - losDiscountAmt;

  const workationEligible = nights >= cfg.workationMinNights;
  const couponPct = workation && workationEligible ? cfg.workationPct : 0;
  const couponAmt = afterLos * couponPct;

  const taxableAmount = afterLos - couponAmt;
  const taxes = 0;
  const fees = 0;

  let totalRaw = taxableAmount + taxes + fees;

  // Monotonic guard: clamp so total(n) ≥ total(n-1)
  if (!cfg.allowLongerCheaper && nights > 1) {
    const prevRaw = rawTotal(nights - 1, nightlyRate, workation, cfg);
    totalRaw = Math.max(totalRaw, prevRaw);
  }

  // Round exactly once at the end
  const total = Math.round(totalRaw);

  return {
    nights,
    nightlyRate,
    base,
    losDiscountPct: losPct,
    losDiscountAmt,
    couponPct,
    couponAmt,
    taxableAmount,
    taxes,
    fees,
    total,
    perNight: Math.round(total / nights),
  };
}

// ── Convenience wrappers used by booking components ───────────────────────────

/**
 * Per-room pricing for the availability list.
 * Returns perNight, pctOff (integer %, 0 if no LOS discount), and roomCharges.
 */
export function calcRoomPricing(
  nights: number,
  beds: number,
  nightlyRate: number,
  config?: Partial<PricingConfig>,
): { perNight: number; pctOff: number; roomCharges: number } {
  if (nights <= 0) {
    return { perNight: nightlyRate, pctOff: 0, roomCharges: 0 };
  }
  const bd = calcPricing(nights, nightlyRate, { config });
  const pctOff = Math.round(bd.losDiscountPct * 100);
  // beds are independent units — multiply after rounding to avoid drift
  const roomCharges = bd.total * beds;
  return { perNight: bd.perNight, pctOff, roomCharges };
}

/**
 * Billing summary: apply the WORKATION coupon to the already-computed
 * room charges total (which may span multiple rooms/beds).
 * Workation is a coupon on the total, applied after all LOS discounts.
 */
export function calcBilling({
  roomCharges,
  nights,
  workation,
  config,
}: {
  roomCharges: number;
  nights: number;
  workation: boolean;
  config?: Partial<PricingConfig>;
}) {
  const cfg: PricingConfig = { ...DEFAULT_CONFIG, ...config };
  const workationEligible = nights >= cfg.workationMinNights;
  const workationApplied = workation && workationEligible;
  const workationDiscount = workationApplied
    ? Math.round(roomCharges * cfg.workationPct)
    : 0;
  const totalPrice = roomCharges - workationDiscount;
  return {
    roomCharges,
    workationDiscount,
    totalRoomCharges: totalPrice,
    taxes: 0,
    totalPrice,
    workationEligible,
  };
}

// ── Legacy shims — kept so existing BookingWidget still compiles ──────────────

export const RACK_NIGHTLY = 700;
export const WORKATION_MIN_NIGHTS = DEFAULT_CONFIG.workationMinNights;
export const WORKATION_PCT = DEFAULT_CONFIG.workationPct * 100;
export const GST_PCT = 0;

export function getDiscount(nights: number, config?: Partial<PricingConfig>) {
  const losPct = losDiscountPctFor(nights, { ...DEFAULT_CONFIG, ...ODYSSEY_PRICING_CONFIG, ...config });
  if (losPct === 0) return null;
  const pct = Math.round(losPct * 100);
  return { pct, label: `${nights}-night stay`, badge: `${pct}% off` };
}

export function effectiveNightly(nights: number, config?: Partial<PricingConfig>): number {
  if (nights <= 0) return RACK_NIGHTLY;
  const cfg = { ...DEFAULT_CONFIG, ...ODYSSEY_PRICING_CONFIG, ...config };
  const losPct = losDiscountPctFor(nights, cfg);
  return Math.round(RACK_NIGHTLY * (1 - losPct));
}

export function calcBedTotal(nights: number, beds = 1, config?: Partial<PricingConfig>) {
  if (nights <= 0) return { base: 0, discount: 0, total: 0, perNight: RACK_NIGHTLY, discountInfo: null };
  const cfg = { ...ODYSSEY_PRICING_CONFIG, ...config };
  const { perNight, pctOff, roomCharges } = calcRoomPricing(nights, beds, RACK_NIGHTLY, cfg);
  const base = RACK_NIGHTLY * nights * beds;
  const discount = base - roomCharges;
  const discountInfo = pctOff > 0 ? { pct: pctOff, label: `${nights}-night stay`, badge: `${pctOff}% off` } : null;
  return { base, discount, total: roomCharges, perNight, discountInfo };
}

export const PRICING = {
  perBedPerNight: RACK_NIGHTLY,
  wholeRoom4Bed: 3000,
  wholeRoom6Bed: 5000,
  discounts: [
    { minNights: 27, pct: 49, label: "Monthly Stay", badge: "49% off" },
    { minNights: 7, pct: 29, label: "Weekly Stay", badge: "29% off" },
  ],
} as const;
