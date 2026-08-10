"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface RatePlanFormState {
  error?: string;
}

export async function updateRatePlanAction(
  roomTypeId: string,
  _prevState: RatePlanFormState,
  formData: FormData
): Promise<RatePlanFormState> {
  const basePrice = Number(String(formData.get("base_price") ?? "").trim());

  if (!Number.isFinite(basePrice) || basePrice <= 0) {
    return { error: "Enter a valid price above 0" };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("rate_plans")
    .update({ base_price: basePrice, updated_at: new Date().toISOString() })
    .eq("room_type_id", roomTypeId)
    .eq("is_default", true);

  if (error) return { error: "Could not save" };

  revalidatePath("/settings/pricing");
  return {};
}

export interface PricingRulesFormState {
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

const PCT_FIELDS = [
  ["weekly_discount_pct", "7-night discount"],
  ["extended_discount_pct", "14-night discount"],
  ["monthly_discount_pct", "Monthly discount"],
  ["weekend_discount_pct", "Weekend discount"],
] as const;

export async function updatePricingRulesAction(
  propertyId: string,
  _prevState: PricingRulesFormState,
  formData: FormData
): Promise<PricingRulesFormState> {
  const values: Record<string, number> = {};
  const fieldErrors: Record<string, string[]> = {};

  for (const [field, label] of PCT_FIELDS) {
    const raw = Number(String(formData.get(field) ?? "").trim());
    if (!Number.isFinite(raw) || raw < 0 || raw > 100) {
      fieldErrors[field] = [`${label} must be between 0 and 100`];
      continue;
    }
    values[field] = raw;
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("pricing_rules")
    .update({ ...values, updated_at: new Date().toISOString() })
    .eq("property_id", propertyId);

  if (error) return { error: "Could not save" };

  revalidatePath("/settings/pricing");
  return {};
}
