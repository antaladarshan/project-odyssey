import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";

export const dynamic = "force-dynamic";

export interface PricingRulesResponse {
  /** Percentages (0-100), as stored in the PMS — not fractions. */
  weeklyDiscountPct: number;
  extendedDiscountPct: number;
  monthlyDiscountPct: number;
  weekendDiscountPct: number;
}

export interface PricingConfigResponse {
  basePriceByRoomTypeId: Record<string, number>;
  rules: PricingRulesResponse | null;
}

export async function GET() {
  const supabase = createServiceClient();

  const [{ data: ratePlans, error: ratePlansError }, { data: rules, error: rulesError }] = await Promise.all([
    supabase.from("rate_plans").select("room_type_id, base_price").eq("is_default", true),
    supabase.from("pricing_rules").select("*").limit(1).maybeSingle(),
  ]);

  if (ratePlansError || rulesError) {
    return NextResponse.json({ error: "Could not load pricing" }, { status: 500 });
  }

  const basePriceByRoomTypeId: Record<string, number> = {};
  for (const plan of ratePlans ?? []) {
    basePriceByRoomTypeId[plan.room_type_id] = plan.base_price;
  }

  const response: PricingConfigResponse = {
    basePriceByRoomTypeId,
    rules: rules
      ? {
          weeklyDiscountPct: rules.weekly_discount_pct,
          extendedDiscountPct: rules.extended_discount_pct,
          monthlyDiscountPct: rules.monthly_discount_pct,
          weekendDiscountPct: rules.weekend_discount_pct,
        }
      : null,
  };

  return NextResponse.json(response);
}
