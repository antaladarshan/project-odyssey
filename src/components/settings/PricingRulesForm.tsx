"use client";

import { useActionState, useState } from "react";
import { updatePricingRulesAction, type PricingRulesFormState } from "@/lib/actions/pricing";
import { previewTiers } from "@/lib/previewPricing";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export interface PricingRulesFormProps {
  propertyId: string;
  weeklyDiscountPct: number;
  extendedDiscountPct: number;
  monthlyDiscountPct: number;
  weekendDiscountPct: number;
  /** Example base price used only to render the live preview below. */
  previewBasePrice: number;
}

const initialState: PricingRulesFormState = {};

export function PricingRulesForm({
  propertyId,
  weeklyDiscountPct,
  extendedDiscountPct,
  monthlyDiscountPct,
  weekendDiscountPct,
  previewBasePrice,
}: PricingRulesFormProps) {
  const action = updatePricingRulesAction.bind(null, propertyId);
  const [state, formAction, isPending] = useActionState(action, initialState);

  // Mirrors the form inputs so the preview panel updates live as the host
  // types, without turning the inputs themselves into controlled fields.
  const [pct, setPct] = useState({
    weekly: weeklyDiscountPct,
    extended: extendedDiscountPct,
    monthly: monthlyDiscountPct,
  });

  const tiers = previewTiers(previewBasePrice, pct);

  function onPctChange(key: keyof typeof pct) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = Number(e.target.value);
      setPct((prev) => ({ ...prev, [key]: Number.isFinite(v) ? v : prev[key] }));
    };
  }

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 rounded-2xl border border-ink-navy/10 bg-surface-white p-5 shadow-card"
    >
      <h2 className="font-serif text-lg text-ink-navy">Length-of-stay discounts</h2>

      <div className="grid grid-cols-2 gap-3">
        <Input
          id="weekly_discount_pct"
          name="weekly_discount_pct"
          type="number"
          min="0"
          max="100"
          step="1"
          label="7-night discount %"
          defaultValue={weeklyDiscountPct}
          onChange={onPctChange("weekly")}
        />
        <Input
          id="extended_discount_pct"
          name="extended_discount_pct"
          type="number"
          min="0"
          max="100"
          step="1"
          label="14-night discount %"
          defaultValue={extendedDiscountPct}
          onChange={onPctChange("extended")}
        />
        <Input
          id="monthly_discount_pct"
          name="monthly_discount_pct"
          type="number"
          min="0"
          max="100"
          step="1"
          label="Monthly (27+ night) discount %"
          defaultValue={monthlyDiscountPct}
          onChange={onPctChange("monthly")}
        />
        <Input
          id="weekend_discount_pct"
          name="weekend_discount_pct"
          type="number"
          min="0"
          max="100"
          step="1"
          label="Weekend (Fri/Sat night) discount %"
          defaultValue={weekendDiscountPct}
        />
      </div>

      {state.fieldErrors && (
        <ul className="text-sm text-oxide">
          {Object.values(state.fieldErrors)
            .flat()
            .map((msg) => (
              <li key={msg}>{msg}</li>
            ))}
        </ul>
      )}
      {state.error && <p className="text-sm text-oxide">{state.error}</p>}

      <div className="rounded-xl bg-stone/60 p-4">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-charcoal/50">
          Example at ₹{previewBasePrice}/bed/night
        </p>
        <div className="grid grid-cols-3 gap-3">
          {tiers.map((t) => (
            <div key={t.nights} className="flex flex-col gap-0.5">
              <p className="text-xs text-charcoal/60">{t.label}</p>
              <p className="font-mono text-sm text-ink-navy">
                ₹{t.perNight}/night{t.pct > 0 && <span className="text-olive"> −{t.pct}%</span>}
              </p>
              <p className="font-mono text-xs text-charcoal/50">₹{t.total} total</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-charcoal/50">
          Weekend discount applies per Friday/Saturday night, on top of whichever tier above applies.
        </p>
      </div>

      <Button type="submit" disabled={isPending} className="self-start">
        {isPending ? "Saving…" : "Save discounts"}
      </Button>
    </form>
  );
}
