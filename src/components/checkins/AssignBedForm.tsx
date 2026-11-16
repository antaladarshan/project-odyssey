"use client";

import { useActionState, useState } from "react";
import { Loader2 } from "lucide-react";
import { assignTravelerToBedAction, type AssignCheckinState } from "@/lib/actions/checkins";

interface AssignBedFormProps {
  travelerId: string;
  beds: { id: string; label: string }[];
  unavailableBedIds: string[];
}

const initialState: AssignCheckinState = {};

export function AssignBedForm({ travelerId, beds, unavailableBedIds }: AssignBedFormProps) {
  const action = assignTravelerToBedAction.bind(null, travelerId);
  const [state, formAction, isPending] = useActionState(action, initialState);
  const unavailable = new Set(unavailableBedIds);
  const [pendingBedId, setPendingBedId] = useState<string | null>(null);

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-2">
        {beds.map((bed) => {
          const disabled = unavailable.has(bed.id) || isPending;
          return (
            <button
              key={bed.id}
              type="submit"
              name="room_bed_id"
              value={bed.id}
              disabled={disabled}
              onClick={() => setPendingBedId(bed.id)}
              className="rounded-xl border border-ink-navy/15 bg-surface-white px-4 py-3 text-sm font-medium text-ink-navy transition-colors hover:border-bronze hover:bg-bronze/5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-ink-navy/15 disabled:hover:bg-surface-white"
            >
              {isPending && pendingBedId === bed.id ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 size={14} className="animate-spin" />
                  Assigning…
                </span>
              ) : (
                bed.label
              )}
              {unavailable.has(bed.id) && (
                <span className="block text-xs text-charcoal/45">Occupied</span>
              )}
            </button>
          );
        })}
      </div>
      {state.error && <p className="text-sm text-oxide">{state.error}</p>}
    </form>
  );
}
