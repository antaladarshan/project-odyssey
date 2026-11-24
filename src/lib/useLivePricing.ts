"use client";

import { useEffect, useState } from "react";
import {
  ODYSSEY_PRICING_CONFIG,
  RACK_NIGHTLY,
  hourlyMonthlyDiscountPct,
  istHourKey,
  msUntilNextIstHour,
  type PricingConfig,
} from "./pricing";
import type { PricingConfigResponse } from "@/app/api/pricing/route";

// Night-count thresholds are fixed application constants, not host-editable
// (see the PMS's Pricing settings page) — only the percentages come from
// /api/pricing. Kept in sync by hand with ODYSSEY_PRICING_CONFIG's defaults.
const FIXED_THRESHOLDS: Partial<PricingConfig> = {
  weeklyMinNights: 7,
  extendedMinNights: 14,
  monthlyMinNights: 27,
};

export interface LivePricing {
  /** Base price per bed per night, keyed by room_types.id. */
  basePriceByRoomTypeId: Record<string, number>;
  /** LOS/weekend discount config, ready to pass into calcPricing's `config`
   *  option. Falls back to ODYSSEY_PRICING_CONFIG while loading or on failure. */
  config: Partial<PricingConfig>;
  loading: boolean;
}

/** Resolve a room's live base price, falling back to its static config value. */
export function resolveBasePrice(
  basePriceByRoomTypeId: Record<string, number>,
  roomTypeId: string,
  fallback: number,
): number {
  return basePriceByRoomTypeId[roomTypeId] ?? fallback;
}

/**
 * Fetches live pricing (base rates + LOS/weekend discount %) from the PMS via
 * /api/pricing. Mirrors the existing liveAvailability fetch pattern in
 * PropertyDetail.tsx — same resilience: falls back to the static defaults in
 * pricing.ts while loading or if the fetch fails.
 */
export function useLivePricing(): LivePricing {
  const [data, setData] = useState<PricingConfigResponse | null>(null);
  const [loading, setLoading] = useState(true);
  // IST hour driving the monthly discount. null until mounted, so the
  // server-rendered HTML and first client render agree (no hydration mismatch).
  const [hourKey, setHourKey] = useState<number | null>(null);

  // Re-draw the monthly discount on every IST hour boundary, even if the page stays open.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      setHourKey(istHourKey());
      timer = setTimeout(tick, msUntilNextIstHour() + 50);
    };
    tick();
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/pricing", { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((json: PricingConfigResponse | null) => setData(json))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const config: Partial<PricingConfig> = {
    ...FIXED_THRESHOLDS,
    ...(data?.rules
      ? {
          weeklyDiscountPct: data.rules.weeklyDiscountPct / 100,
          extendedDiscountPct: data.rules.extendedDiscountPct / 100,
          monthlyDiscountPct: data.rules.monthlyDiscountPct / 100,
          weekendDiscountPct: data.rules.weekendDiscountPct / 100,
        }
      : ODYSSEY_PRICING_CONFIG),
  };

  // Hourly monthly discount: keeps the 30-night, 1-bed price (after WORKATION)
  // within ₹8,100–₹12,000. Anchored to the cheapest live bed price.
  if (hourKey !== null) {
    const bases = Object.values(data?.basePriceByRoomTypeId ?? {}).filter((n) => n > 0);
    const anchor = bases.length ? Math.min(...bases) : RACK_NIGHTLY;
    config.monthlyDiscountPct = hourlyMonthlyDiscountPct(anchor, hourKey);
  }

  return {
    basePriceByRoomTypeId: data?.basePriceByRoomTypeId ?? {},
    config,
    loading,
  };
}

export const FALLBACK_BASE_RATE = RACK_NIGHTLY;
