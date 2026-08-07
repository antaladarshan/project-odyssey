"use client";

import { useActionState } from "react";
import { createBookingAction, type QuickAddFormState } from "@/lib/actions/bookings";
import { RoomBedPicker } from "./RoomBedPicker";
import { ChannelPicker } from "./ChannelPicker";
import { GuestPicker } from "@/components/guests/GuestPicker";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { toISODate } from "@/lib/dates";

export interface QuickAddFormProps {
  roomTypes: { id: string; name: string }[];
  roomsBeds: { id: string; room_type_id: string; label: string }[];
  channels: { id: string; name: string }[];
  guests: { id: string; name: string; phone: string | null }[];
  defaultRoomBedId?: string;
  defaultCheckinDate?: string;
}

const initialState: QuickAddFormState = {};

export function QuickAddForm({
  roomTypes,
  roomsBeds,
  channels,
  guests,
  defaultRoomBedId,
  defaultCheckinDate,
}: QuickAddFormProps) {
  const [state, formAction, isPending] = useActionState(createBookingAction, initialState);
  const today = toISODate(new Date());

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <RoomBedPicker
        roomTypes={roomTypes}
        roomsBeds={roomsBeds}
        defaultValue={defaultRoomBedId}
        error={state.fieldErrors?.room_bed_id?.[0]}
      />

      <div className="grid grid-cols-2 gap-3">
        <Input
          id="checkin_date"
          name="checkin_date"
          type="date"
          label="Check-in"
          required
          defaultValue={defaultCheckinDate ?? today}
        />
        <Input id="checkout_date" name="checkout_date" type="date" label="Check-out" required />
      </div>
      {state.fieldErrors?.checkout_date && (
        <p className="-mt-3 text-sm text-oxide">{state.fieldErrors.checkout_date[0]}</p>
      )}

      <ChannelPicker channels={channels} error={state.fieldErrors?.channel_id?.[0]} />

      <GuestPicker guests={guests} errors={{ guest_name: state.fieldErrors?.guest_name }} />

      <div className="grid grid-cols-2 gap-3">
        <Input id="rate_total" name="rate_total" type="number" min="0" step="0.01" label="Amount (optional)" />
        <Input
          id="amount_paid"
          name="amount_paid"
          type="number"
          min="0"
          step="0.01"
          label="Advance paid (optional)"
        />
      </div>

      <Textarea id="note" name="note" label="Note (optional)" placeholder="Anything worth remembering" />

      {state.error && (
        <p className="rounded-lg bg-oxide/10 px-4 py-3 text-sm text-oxide">{state.error}</p>
      )}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Adding booking…" : "Add booking"}
      </Button>
    </form>
  );
}
