"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { quickAddBookingSchema } from "@/lib/validations/booking";
import { guestSchema } from "@/lib/validations/guest";
import { createClient } from "@/lib/supabase/server";
import type { BookingStatus } from "@/types/database.types";

export interface QuickAddFormState {
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

export async function createBookingAction(
  _prevState: QuickAddFormState,
  formData: FormData
): Promise<QuickAddFormState> {
  const parsed = quickAddBookingSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }
  const input = parsed.data;

  const supabase = await createClient();

  let guestId = input.guest_id;
  if (!guestId) {
    const newGuest = guestSchema.safeParse({ name: input.guest_name, phone: input.guest_phone });
    if (!newGuest.success) {
      return { fieldErrors: newGuest.error.flatten().fieldErrors };
    }

    const { data: guest, error: guestError } = await supabase
      .from("guests")
      .insert(newGuest.data)
      .select("id")
      .single();

    if (guestError || !guest) {
      return { error: "Could not save guest details. Try again." };
    }
    guestId = guest.id;
  }

  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .insert({
      room_bed_id: input.room_bed_id,
      channel_id: input.channel_id,
      guest_id: guestId,
      checkin_date: input.checkin_date,
      checkout_date: input.checkout_date,
      rate_total: input.rate_total,
      amount_paid: input.amount_paid ?? 0,
      note: input.note,
    })
    .select("id")
    .single();

  if (bookingError || !booking) {
    if (bookingError?.code === "23P01") {
      return { error: "That room/bed is already booked for an overlapping date range." };
    }
    return { error: "Could not create the booking. Try again." };
  }

  revalidatePath("/calendar");
  redirect(`/bookings/${booking.id}`);
}

export interface BookingActionState {
  error?: string;
}

export async function setBookingStatusAction(
  bookingId: string,
  status: BookingStatus
): Promise<BookingActionState> {
  const supabase = await createClient();
  const { error } = await supabase.from("bookings").update({ status }).eq("id", bookingId);

  if (error) return { error: "Could not update the booking." };

  revalidatePath("/calendar");
  revalidatePath(`/bookings/${bookingId}`);
  return {};
}

export interface EditBookingFormState {
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

export async function updateBookingDetailsAction(
  bookingId: string,
  _prevState: EditBookingFormState,
  formData: FormData
): Promise<EditBookingFormState> {
  const rateTotalRaw = String(formData.get("rate_total") ?? "").trim();
  const amountPaidRaw = String(formData.get("amount_paid") ?? "").trim();
  const note = String(formData.get("note") ?? "").trim();
  const roomBedId = String(formData.get("room_bed_id") ?? "").trim();
  const checkinDate = String(formData.get("checkin_date") ?? "").trim();
  const checkoutDate = String(formData.get("checkout_date") ?? "").trim();

  const rateTotal = rateTotalRaw ? Number(rateTotalRaw) : null;
  const amountPaid = amountPaidRaw ? Number(amountPaidRaw) : 0;

  if (rateTotalRaw && Number.isNaN(rateTotal)) {
    return { fieldErrors: { rate_total: ["Enter a valid amount"] } };
  }
  if (Number.isNaN(amountPaid) || amountPaid < 0) {
    return { fieldErrors: { amount_paid: ["Enter a valid amount"] } };
  }
  if (!roomBedId) {
    return { fieldErrors: { room_bed_id: ["Pick a room/bed"] } };
  }
  if (!checkinDate || !checkoutDate) {
    return { fieldErrors: { checkout_date: ["Pick both check-in and check-out dates"] } };
  }
  if (checkoutDate <= checkinDate) {
    return { fieldErrors: { checkout_date: ["Check-out must be after check-in"] } };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("bookings")
    .update({
      rate_total: rateTotal,
      amount_paid: amountPaid,
      note: note || null,
      room_bed_id: roomBedId,
      checkin_date: checkinDate,
      checkout_date: checkoutDate,
    })
    .eq("id", bookingId);

  if (error) {
    if (error.code === "23P01") {
      return { error: "That room/bed is already booked for an overlapping date range." };
    }
    return { error: "Could not save changes." };
  }

  revalidatePath("/calendar");
  revalidatePath(`/bookings/${bookingId}`);
  return {};
}
