"use client";

import { useActionState } from "react";
import { updateRatePlanAction, type RatePlanFormState } from "@/lib/actions/pricing";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export interface RatePlanFormProps {
  roomTypeId: string;
  roomTypeName: string;
  basePrice: number;
}

const initialState: RatePlanFormState = {};

export function RatePlanForm({ roomTypeId, roomTypeName, basePrice }: RatePlanFormProps) {
  const action = updateRatePlanAction.bind(null, roomTypeId);
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form
      action={formAction}
      className="flex items-end gap-3 rounded-xl border border-ink-navy/10 bg-surface-white px-4 py-3.5 shadow-soft"
    >
      <div className="flex-1">
        <p className="mb-1.5 text-sm font-medium text-ink-navy">{roomTypeName}</p>
        <Input
          id={`base_price_${roomTypeId}`}
          name="base_price"
          type="number"
          min="0"
          step="1"
          defaultValue={basePrice}
          aria-label={`${roomTypeName} base price per bed per night`}
        />
      </div>
      <span className="pb-2.5 text-xs text-charcoal/50">/ bed / night</span>
      <Button type="submit" variant="secondary" disabled={isPending}>
        {isPending ? "Saving…" : "Save"}
      </Button>
      {state.error && <p className="text-sm text-oxide">{state.error}</p>}
    </form>
  );
}
