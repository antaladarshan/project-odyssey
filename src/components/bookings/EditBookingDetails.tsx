"use client";

import { useActionState } from "react";
import { updateBookingDetailsAction, type EditBookingFormState } from "@/lib/actions/bookings";
import { RoomBedPicker } from "./RoomBedPicker";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

export interface EditBookingDetailsProps {
  bookingId: string;
  roomTypes: { id: string; name: string }[];
  roomsBeds: { id: string; room_type_id: string; label: string }[];
  currentRoomBedId: string;
  checkinDate: string;
  checkoutDate: string;
  rateTotal: number | null;
  amountPaid: number;
  note: string | null;
}

const initialState: EditBookingFormState = {};

export function EditBookingDetails({
  bookingId,
  roomTypes,
  roomsBeds,
  currentRoomBedId,
  checkinDate,
  checkoutDate,
  rateTotal,
  amountPaid,
  note,
}: EditBookingDetailsProps) {
  const action = updateBookingDetailsAction.bind(null, bookingId);
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <RoomBedPicker
        roomTypes={roomTypes}
        roomsBeds={roomsBeds}
        defaultValue={currentRoomBedId}
        error={state.fieldErrors?.room_bed_id?.[0]}
      />
      <div className="grid grid-cols-2 gap-3">
        <Input
          id="checkin_date"
          name="checkin_date"
          type="date"
          label="Check-in"
          defaultValue={checkinDate}
        />
        <Input
          id="checkout_date"
          name="checkout_date"
          type="date"
          label="Check-out"
          defaultValue={checkoutDate}
        />
      </div>
      {state.fieldErrors?.checkout_date && (
        <p className="text-sm text-oxide">{state.fieldErrors.checkout_date[0]}</p>
      )}
      <div className="grid grid-cols-2 gap-3">
        <Input
          id="rate_total"
          name="rate_total"
          type="number"
          min="0"
          step="0.01"
          label="Amount"
          defaultValue={rateTotal ?? ""}
        />
        <Input
          id="amount_paid"
          name="amount_paid"
          type="number"
          min="0"
          step="0.01"
          label="Amount paid"
          defaultValue={amountPaid}
        />
      </div>
      {(state.fieldErrors?.rate_total || state.fieldErrors?.amount_paid) && (
        <p className="text-sm text-oxide">
          {state.fieldErrors?.rate_total?.[0] ?? state.fieldErrors?.amount_paid?.[0]}
        </p>
      )}
      <Textarea id="note" name="note" label="Note" defaultValue={note ?? ""} />
      {state.error && <p className="text-sm text-oxide">{state.error}</p>}
      <Button type="submit" variant="secondary" disabled={isPending} className="self-start">
        {isPending ? "Saving…" : "Save changes"}
      </Button>
    </form>
  );
}
