"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { rejectTravelerAction, type RejectCheckinState } from "@/lib/actions/checkins";

const initialState: RejectCheckinState = {};

export function RejectCheckinButton({ travelerId }: { travelerId: string }) {
  const action = rejectTravelerAction.bind(null, travelerId);
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form action={formAction}>
      <button
        type="submit"
        disabled={isPending}
        className="flex items-center gap-1.5 text-sm font-medium text-oxide hover:underline disabled:opacity-50"
      >
        {isPending && <Loader2 size={14} className="animate-spin" />}
        {isPending ? "Rejecting…" : "Reject this traveler"}
      </button>
      {state.error && <p className="mt-1 text-sm text-oxide">{state.error}</p>}
    </form>
  );
}
