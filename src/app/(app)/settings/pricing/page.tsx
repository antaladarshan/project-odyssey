import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth/profile";
import { RatePlanForm } from "@/components/settings/RatePlanForm";
import { PricingRulesForm } from "@/components/settings/PricingRulesForm";

export default async function PricingSettingsPage() {
  const profile = await getCurrentProfile();
  if (profile?.role !== "owner") redirect("/calendar");

  const supabase = await createClient();

  const { data: property } = await supabase.from("properties").select("id").limit(1).single();

  const [{ data: roomTypes }, { data: ratePlans }, { data: pricingRules }] = await Promise.all([
    supabase.from("room_types").select("id, name").order("sort_order"),
    supabase.from("rate_plans").select("room_type_id, base_price").eq("is_default", true),
    property
      ? supabase.from("pricing_rules").select("*").eq("property_id", property.id).single()
      : Promise.resolve({ data: null }),
  ]);

  const priceByRoomType = new Map((ratePlans ?? []).map((r) => [r.room_type_id, r.base_price]));

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="font-serif text-3xl tracking-tight text-ink-navy">Pricing</h1>
        <p className="mt-1 text-sm text-charcoal/60">
          Changes here go live on the booking site immediately — no redeploy needed.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="font-serif text-lg text-ink-navy">Base price per bed</h2>
        {(roomTypes ?? []).map((rt) => (
          <RatePlanForm
            key={rt.id}
            roomTypeId={rt.id}
            roomTypeName={rt.name}
            basePrice={priceByRoomType.get(rt.id) ?? 0}
          />
        ))}
      </div>

      {property && pricingRules && (
        <PricingRulesForm
          propertyId={property.id}
          weeklyDiscountPct={pricingRules.weekly_discount_pct}
          extendedDiscountPct={pricingRules.extended_discount_pct}
          monthlyDiscountPct={pricingRules.monthly_discount_pct}
          weekendDiscountPct={pricingRules.weekend_discount_pct}
          previewBasePrice={priceByRoomType.values().next().value ?? 700}
        />
      )}
    </div>
  );
}
