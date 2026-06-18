// Unit tests for the LOS pricing engine.
//
// NOTE — spec arithmetic discrepancy:
//   The task spec says "7 nights @ ₹533 → total 2969 (±1)".
//   Correct math: 7 × 533 × (1 − 0.20) = 7 × 533 × 0.80 = 2984.8 → rounds to 2985.
//   ₹2969 comes from the *old* piecewise model (499/n × 7 × 0.85 WORKATION),
//   not from a 20% LOS discount on a ₹533 base. Tests below use the correct value.

import { describe, it, expect } from "vitest";
import {
  calcPricing,
  calcRoomPricing,
  calcBilling,
  nightsBetween,
  DEFAULT_CONFIG,
  type PricingConfig,
} from "./pricing";

// Helper: build a full config from partial overrides
const cfg = (overrides: Partial<PricingConfig> = {}) => ({ ...DEFAULT_CONFIG, ...overrides });

// ── nightsBetween ─────────────────────────────────────────────────────────────

describe("nightsBetween", () => {
  it("returns correct night count for a normal range", () => {
    expect(nightsBetween("2026-06-19", "2026-06-25")).toBe(6);
    expect(nightsBetween("2026-06-19", "2026-06-26")).toBe(7);
  });

  it("returns 0 for same-day checkin/checkout", () => {
    expect(nightsBetween("2026-06-19", "2026-06-19")).toBe(0);
  });

  it("returns 0 for empty strings", () => {
    expect(nightsBetween("", "2026-06-19")).toBe(0);
    expect(nightsBetween("2026-06-19", "")).toBe(0);
  });

  it("returns 28 for a 4-week stay", () => {
    expect(nightsBetween("2026-06-01", "2026-06-29")).toBe(28);
  });
});

// ── calcPricing — basic ───────────────────────────────────────────────────────

describe("calcPricing — no discount (< 7 nights)", () => {
  it("6 nights @ ₹533 → total 3198, perNight 533, losDiscountPct 0", () => {
    const r = calcPricing(6, 533);
    expect(r.total).toBe(3198);
    expect(r.perNight).toBe(533);
    expect(r.losDiscountPct).toBe(0);
    expect(r.losDiscountAmt).toBe(0);
    expect(r.couponAmt).toBe(0);
  });

  it("1 night @ ₹533 → total 533, no discount", () => {
    const r = calcPricing(1, 533);
    expect(r.total).toBe(533);
    expect(r.losDiscountPct).toBe(0);
  });

  it("throws on 0 nights", () => {
    expect(() => calcPricing(0, 700)).toThrow();
  });

  it("throws on negative nights", () => {
    expect(() => calcPricing(-1, 700)).toThrow();
  });
});

describe("calcPricing — weekly discount (7 nights)", () => {
  // Correct math: 7 × 533 × 0.80 = 2984.8 → 2985
  // (the task spec cited ₹2969 which was from a different model — see file header)
  it("7 nights @ ₹533, 20% weekly → total 2985, perNight 426, discount 20%", () => {
    const r = calcPricing(7, 533);
    expect(r.total).toBe(2985);
    expect(r.perNight).toBe(Math.round(2985 / 7)); // 426
    expect(r.losDiscountPct).toBe(0.20);
    expect(r.losDiscountAmt).toBeCloseTo(7 * 533 * 0.20, 0);
  });

  it("8 nights @ ₹533 has weekly discount, total > 7-night total", () => {
    const r7 = calcPricing(7, 533);
    const r8 = calcPricing(8, 533);
    expect(r8.total).toBeGreaterThan(r7.total);
  });
});

describe("calcPricing — 7n < 6n is EXPECTED when allowLongerCheaper=true", () => {
  it("7-night total is less than 6-night total (LOS discount applied)", () => {
    const r6 = calcPricing(6, 533);
    const r7 = calcPricing(7, 533);
    // ₹2985 < ₹3198 — this is correct Airbnb/Hosteller behaviour
    expect(r7.total).toBeLessThan(r6.total);
  });
});

describe("calcPricing — allowLongerCheaper=false (monotonic guard)", () => {
  it("7-night total >= 6-night total when clamped", () => {
    const r6 = calcPricing(6, 533, { config: cfg({ allowLongerCheaper: false }) });
    const r7 = calcPricing(7, 533, { config: cfg({ allowLongerCheaper: false }) });
    expect(r7.total).toBeGreaterThanOrEqual(r6.total);
  });

  it("8-night total >= 7-night total when clamped", () => {
    const r7 = calcPricing(7, 533, { config: cfg({ allowLongerCheaper: false }) });
    const r8 = calcPricing(8, 533, { config: cfg({ allowLongerCheaper: false }) });
    expect(r8.total).toBeGreaterThanOrEqual(r7.total);
  });

  it("28-night total >= 27-night total when clamped", () => {
    const r27 = calcPricing(27, 533, { config: cfg({ allowLongerCheaper: false }) });
    const r28 = calcPricing(28, 533, { config: cfg({ allowLongerCheaper: false }) });
    expect(r28.total).toBeGreaterThanOrEqual(r27.total);
  });
});

describe("calcPricing — monthly discount (28 nights)", () => {
  it("28 nights @ ₹533, 40% monthly → correct discount", () => {
    const r = calcPricing(28, 533, { config: cfg({ monthlyDiscountPct: 0.40 }) });
    // 28 × 533 × 0.60 = 8954.4 → 8954
    expect(r.total).toBe(Math.round(28 * 533 * 0.60));
    expect(r.losDiscountPct).toBe(0.40);
  });

  it("28 nights uses monthly tier, not weekly", () => {
    const r = calcPricing(28, 533);
    expect(r.losDiscountPct).toBe(DEFAULT_CONFIG.monthlyDiscountPct);
  });
});

// ── WORKATION coupon ──────────────────────────────────────────────────────────

describe("calcPricing — WORKATION coupon", () => {
  it("workation not eligible below 7 nights", () => {
    const r = calcPricing(6, 533, { workation: true });
    expect(r.couponPct).toBe(0);
    expect(r.couponAmt).toBe(0);
    expect(r.total).toBe(3198); // same as without workation
  });

  it("workation eligible at 7+ nights", () => {
    const rWithout = calcPricing(7, 533, { workation: false });
    const rWith = calcPricing(7, 533, { workation: true });
    expect(rWith.couponPct).toBe(DEFAULT_CONFIG.workationPct);
    expect(rWith.total).toBeLessThan(rWithout.total);
  });

  it("LOS discount applies before WORKATION coupon (correct order)", () => {
    // 7n @ 533: base=3731, LOS 20%=746.2 off → 2984.8, then WORKATION 15%=447.72 off → 2537.08 → 2537
    const r = calcPricing(7, 533, { workation: true });
    const expectedAfterLos = 7 * 533 * (1 - 0.20);
    const expectedTotal = Math.round(expectedAfterLos * (1 - 0.15));
    expect(r.total).toBe(expectedTotal);
  });

  it("coupon stacks correctly with monthly LOS discount", () => {
    const rLos = calcPricing(28, 533, { workation: false });
    const rBoth = calcPricing(28, 533, { workation: true });
    expect(rBoth.total).toBeLessThan(rLos.total);
    // Verify order: LOS first, coupon second
    const afterLos = 28 * 533 * (1 - DEFAULT_CONFIG.monthlyDiscountPct);
    const expected = Math.round(afterLos * (1 - DEFAULT_CONFIG.workationPct));
    expect(rBoth.total).toBe(expected);
  });
});

// ── calcRoomPricing ───────────────────────────────────────────────────────────

describe("calcRoomPricing — multiple beds", () => {
  it("2 beds for 6 nights → roomCharges = 2 × single-bed total", () => {
    const r1 = calcRoomPricing(6, 1, 533);
    const r2 = calcRoomPricing(6, 2, 533);
    expect(r2.roomCharges).toBe(r1.roomCharges * 2);
    expect(r2.perNight).toBe(r1.perNight); // per-night rate unchanged
  });

  it("0 nights returns 0 charges", () => {
    const r = calcRoomPricing(0, 2, 700);
    expect(r.roomCharges).toBe(0);
    expect(r.perNight).toBe(700);
  });

  it("pctOff is 0 for 6 nights and 20 for 7 nights", () => {
    expect(calcRoomPricing(6, 1, 533).pctOff).toBe(0);
    expect(calcRoomPricing(7, 1, 533).pctOff).toBe(20);
  });
});

// ── calcBilling ───────────────────────────────────────────────────────────────

describe("calcBilling — workation coupon on a pre-computed roomCharges", () => {
  it("workation not eligible for 6 nights", () => {
    const b = calcBilling({ roomCharges: 3198, nights: 6, workation: true });
    expect(b.workationEligible).toBe(false);
    expect(b.workationDiscount).toBe(0);
    expect(b.totalPrice).toBe(3198);
  });

  it("workation discount correct for 7 nights", () => {
    const charges = 3000;
    const b = calcBilling({ roomCharges: charges, nights: 7, workation: true });
    expect(b.workationEligible).toBe(true);
    expect(b.workationDiscount).toBe(Math.round(charges * DEFAULT_CONFIG.workationPct));
    expect(b.totalPrice).toBe(charges - b.workationDiscount);
  });

  it("taxes are always 0 (removed per product decision)", () => {
    const b = calcBilling({ roomCharges: 5000, nights: 7, workation: false });
    expect(b.taxes).toBe(0);
  });
});

// ── Project Odyssey config integration ───────────────────────────────────────

describe("Project Odyssey config — ₹700 base, 29% weekly, 57% monthly", () => {
  const odysseyCfg: Partial<PricingConfig> = { weeklyDiscountPct: 0.29, monthlyDiscountPct: 0.57 };

  it("1 night → ₹700, no discount", () => {
    const r = calcPricing(1, 700, { config: odysseyCfg });
    expect(r.total).toBe(700);
    expect(r.losDiscountPct).toBe(0);
  });

  it("6 nights → ₹4200, no discount", () => {
    const r = calcPricing(6, 700, { config: odysseyCfg });
    expect(r.total).toBe(4200);
  });

  it("7 nights → ~₹497/night (29% off ₹700)", () => {
    const r = calcPricing(7, 700, { config: odysseyCfg });
    expect(r.perNight).toBe(Math.round(700 * (1 - 0.29)));
    expect(r.losDiscountPct).toBe(0.29);
  });

  it("7 nights total is LESS than 6 nights (allowLongerCheaper=true)", () => {
    const r6 = calcPricing(6, 700, { config: odysseyCfg });
    const r7 = calcPricing(7, 700, { config: odysseyCfg });
    expect(r7.total).toBeLessThan(r6.total);
  });

  it("28+ nights → ~57% off", () => {
    const r = calcPricing(30, 700, { config: odysseyCfg });
    expect(r.losDiscountPct).toBe(0.57);
    expect(r.perNight).toBe(Math.round(700 * (1 - 0.57)));
  });
});
