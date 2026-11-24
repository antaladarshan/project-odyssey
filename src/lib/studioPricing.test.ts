import { describe, it, expect } from "vitest";
import { quoteStudio } from "./studioPricing";

describe("quoteStudio", () => {
  it("1 hour = ₹1,800", () => {
    const q = quoteStudio(1);
    expect(q.total).toBe(1800);
    expect(q.rate).toBe(1800);
    expect(q.upsell).toBeUndefined();
  });

  it("4 hours = ₹4,800 at ₹1,200/hr, and suggests the 8-hour offer", () => {
    const q = quoteStudio(4);
    expect(q.total).toBe(4800);
    expect(q.rate).toBe(1200);
    expect(q.upsell).toEqual({ hours: 8, price: 4000 });
  });

  it("5 hours = ₹6,000 and suggests the 8-hour offer", () => {
    const q = quoteStudio(5);
    expect(q.total).toBe(6000);
    expect(q.upsell?.price).toBe(4000);
  });

  it("8 hours = ₹4,000 launch price (regular ₹8,000, ₹500/hr)", () => {
    const q = quoteStudio(8);
    expect(q.total).toBe(4000);
    expect(q.regular).toBe(8000);
    expect(q.savings).toBe(4000);
    expect(q.rate).toBe(500);
    expect(q.upsell).toBeUndefined();
  });

  it("10 hours = 8-hour price + 2 extra at ₹1,000", () => {
    const q = quoteStudio(10);
    expect(q.total).toBe(6000);
    expect(q.regular).toBe(10000);
  });

  it("advance is 50% of the total", () => {
    const q = quoteStudio(8);
    expect(q.advance).toBe(2000);
    expect(q.balance).toBe(2000);
  });

  it("clamps to the 1–12 hour range", () => {
    expect(quoteStudio(0).hours).toBe(1);
    expect(quoteStudio(99).hours).toBe(12);
    expect(quoteStudio(NaN).hours).toBe(1);
  });
});
