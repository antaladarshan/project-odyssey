"use client";

import { useActionState, useEffect, useState } from "react";
import { updateBookingDetailsAction, type EditBookingFormState } from "@/lib/actions/bookings";
import { RoomBedPicker } from "./RoomBedPicker";
import { DateRangeField } from "./DateRangeField";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { formatShortDate } from "@/lib/dates";
import type { BedAvailabilityResponse } from "@/app/api/bookings/bed-availability/route";

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

  const [checkIn, setCheckIn] = useState(checkinDate);
  const [checkOut, setCheckOut] = useState(checkoutDate);
  const [roomBedId, setRoomBedId] = useState(currentRoomBedId);
  const [unavailableBeds, setUnavailableBeds] = useState<Record<string, string> | null>(null);
  const hasValidRange = Boolean(checkIn && checkOut && checkOut > checkIn);

  // Same fail-open pattern as QuickAddForm — excludeBookingId keeps this
  // booking's own current occupancy from flagging its own bed as conflicting
  // with itself. hasValidRange gates whether stale results are consulted
  // below, so skipping (not resetting) while incomplete is safe.
  useEffect(() => {
    if (!hasValidRange) return;
    const controller = new AbortController();
    const timer = setTimeout(() => {
      fetch(
        `/api/bookings/bed-availability?checkIn=${checkIn}&checkOut=${checkOut}&excludeBookingId=${bookingId}`,
        { signal: controller.signal }
      )
        .then((res) => (res.ok ? (res.json() as Promise<BedAvailabilityResponse>) : null))
        .then((data) => setUnavailableBeds(data?.blocked ?? {}))
        .catch(() => setUnavailableBeds(null));
    }, 300);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [checkIn, checkOut, bookingId, hasValidRange]);

  const blockedUntil = hasValidRange && roomBedId ? unavailableBeds?.[roomBedId] : undefined;
  const conflictWarning = blockedUntil
    ? `This bed is booked until ${formatShortDate(blockedUntil)} — pick another bed or adjust the dates.`
    : undefined;

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <RoomBedPicker
        roomTypes={roomTypes}
        roomsBeds={roomsBeds}
        value={roomBedId}
        onChange={setRoomBedId}
        unavailableBeds={hasValidRange ? (unavailableBeds ?? undefined) : undefined}
        error={state.fieldErrors?.room_bed_id?.[0] ?? conflictWarning}
      />
      <DateRangeField
        checkinDate={checkinDate}
        checkoutDate={checkoutDate}
        error={state.fieldErrors?.checkout_date?.[0]}
        onDatesChange={(ci, co) => {
          setCheckIn(ci);
          setCheckOut(co);
        }}
      />
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
      <Button
        type="submit"
        variant="secondary"
        disabled={isPending || Boolean(conflictWarning)}
        className="self-start"
      >
        {isPending ? "Saving…" : "Save changes"}
      </Button>
    </form>
  );
}
