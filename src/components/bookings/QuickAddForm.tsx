"use client";

import { useActionState, useEffect, useState } from "react";
import { createBookingAction, type QuickAddFormState } from "@/lib/actions/bookings";
import { RoomBedPicker } from "./RoomBedPicker";
import { ChannelPicker } from "./ChannelPicker";
import { GuestPicker } from "@/components/guests/GuestPicker";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { formatShortDate, toISODate } from "@/lib/dates";
import type { BedAvailabilityResponse } from "@/app/api/bookings/bed-availability/route";

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

  const [checkinDate, setCheckinDate] = useState(defaultCheckinDate ?? today);
  const [checkoutDate, setCheckoutDate] = useState("");
  const [roomBedId, setRoomBedId] = useState(defaultRoomBedId ?? "");
  const [unavailableBeds, setUnavailableBeds] = useState<Record<string, string> | null>(null);
  const hasValidRange = Boolean(checkinDate && checkoutDate && checkoutDate > checkinDate);

  // Fail open: null means "not loaded / errored" — nothing gets disabled and
  // nothing warns. Never block a booking over a network blip; the DB's
  // exclusion constraint (see createBookingAction's 23P01 catch) is still
  // the real backstop regardless of what this check finds. `hasValidRange`
  // gates whether stale results are actually consulted below, so it's safe
  // to just skip re-fetching (not reset) while the range is incomplete.
  useEffect(() => {
    if (!hasValidRange) return;
    const controller = new AbortController();
    const timer = setTimeout(() => {
      fetch(`/api/bookings/bed-availability?checkIn=${checkinDate}&checkOut=${checkoutDate}`, {
        signal: controller.signal,
      })
        .then((res) => (res.ok ? (res.json() as Promise<BedAvailabilityResponse>) : null))
        .then((data) => setUnavailableBeds(data?.blocked ?? {}))
        .catch(() => setUnavailableBeds(null));
    }, 300);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [checkinDate, checkoutDate, hasValidRange]);

  const blockedUntil = hasValidRange && roomBedId ? unavailableBeds?.[roomBedId] : undefined;
  const conflictWarning = blockedUntil
    ? `This bed is booked until ${formatShortDate(blockedUntil)} — pick another bed or adjust the dates.`
    : undefined;

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <RoomBedPicker
        roomTypes={roomTypes}
        roomsBeds={roomsBeds}
        value={roomBedId}
        onChange={setRoomBedId}
        unavailableBeds={hasValidRange ? (unavailableBeds ?? undefined) : undefined}
        error={state.fieldErrors?.room_bed_id?.[0] ?? conflictWarning}
      />

      <div className="grid grid-cols-2 gap-3">
        <Input
          id="checkin_date"
          name="checkin_date"
          type="date"
          label="Check-in"
          required
          value={checkinDate}
          onChange={(e) => setCheckinDate(e.target.value)}
        />
        <Input
          id="checkout_date"
          name="checkout_date"
          type="date"
          label="Check-out"
          required
          value={checkoutDate}
          onChange={(e) => setCheckoutDate(e.target.value)}
        />
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

      <Button type="submit" disabled={isPending || Boolean(conflictWarning)}>
        {isPending ? "Adding booking…" : "Add booking"}
      </Button>
    </form>
  );
}
