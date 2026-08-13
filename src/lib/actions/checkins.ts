"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface AssignCheckinState {
  error?: string;
}

export async function assignTravelerToBedAction(
  travelerId: string,
  _prevState: AssignCheckinState,
  formData: FormData
): Promise<AssignCheckinState> {
  const bedId = String(formData.get("room_bed_id") ?? "").trim();
  if (!bedId) {
    return { error: "Pick a bed." };
  }

  const supabase = await createClient();

  const { data: traveler } = await supabase
    .from("guest_checkin_travelers")
    .select("*")
    .eq("id", travelerId)
    .single();

  if (!traveler || traveler.status !== "pending") {
    return { error: "This traveler has already been handled." };
  }

  const { data: checkin } = await supabase
    .from("guest_checkins")
    .select("*")
    .eq("id", traveler.checkin_id)
    .single();

  if (!checkin) {
    return { error: "Could not find this check-in." };
  }

  const { data: directChannel } = await supabase
    .from("channels")
    .select("id")
    .eq("name", "Direct Website")
    .single();

  if (!directChannel) {
    return { error: "Could not find the Direct Website channel." };
  }

  const { data: guest, error: guestError } = await supabase
    .from("guests")
    .insert({
      name: traveler.name,
      email: checkin.email,
      phone: checkin.phone,
      id_card_paths: traveler.id_card_paths,
    })
    .select("id")
    .single();

  if (guestError || !guest) {
    return { error: "Could not save guest details. Try again." };
  }

  const note = checkin.add_ons.length > 0 ? `Add-ons: ${checkin.add_ons.join(", ")}` : null;

  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .insert({
      channel_id: directChannel.id,
      guest_id: guest.id,
      room_bed_id: bedId,
      checkin_date: checkin.checkin_date,
      checkout_date: checkin.checkout_date,
      note,
    })
    .select("id")
    .single();

  if (bookingError || !booking) {
    // Don't leave an orphaned guest behind when the booking write fails
    // right after we created one for it (e.g. a bed conflict).
    await supabase.from("guests").delete().eq("id", guest.id);
    if (bookingError?.code === "23P01") {
      return { error: "That bed is already booked for an overlapping date range." };
    }
    return { error: "Could not create the booking. Try again." };
  }

  const { error: updateError } = await supabase
    .from("guest_checkin_travelers")
    .update({ status: "assigned", assigned_room_bed_id: bedId, booking_id: booking.id })
    .eq("id", travelerId);

  if (updateError) {
    return { error: "Booking created, but could not update the check-in record." };
  }

  revalidatePath("/calendar");
  revalidatePath("/checkins");
  revalidatePath(`/checkins/${traveler.checkin_id}`);
  return {};
}

export interface RejectCheckinState {
  error?: string;
}

export async function rejectTravelerAction(
  travelerId: string,
  _prevState: RejectCheckinState,
  _formData: FormData
): Promise<RejectCheckinState> {
  const supabase = await createClient();

  const { data: traveler } = await supabase
    .from("guest_checkin_travelers")
    .select("checkin_id")
    .eq("id", travelerId)
    .single();

  const { error } = await supabase
    .from("guest_checkin_travelers")
    .update({ status: "rejected" })
    .eq("id", travelerId)
    .eq("status", "pending");

  if (error) {
    return { error: "Could not reject this traveler." };
  }

  revalidatePath("/checkins");
  if (traveler) revalidatePath(`/checkins/${traveler.checkin_id}`);
  return {};
}
