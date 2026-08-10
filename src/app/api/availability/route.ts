import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";

export interface RoomTypeAvailability {
  name: string;
  available: number;
  nextFreeDate: string | null;
}

function isValidISODate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(new Date(value).getTime());
}

export async function GET(request: NextRequest) {
  const checkIn = request.nextUrl.searchParams.get("checkIn") ?? "";
  const checkOut = request.nextUrl.searchParams.get("checkOut") ?? "";

  if (!isValidISODate(checkIn) || !isValidISODate(checkOut) || checkOut <= checkIn) {
    return NextResponse.json({ error: "Invalid checkIn/checkOut dates" }, { status: 400 });
  }

  const supabase = createServiceClient();

  const [{ data: roomTypes, error: roomTypesError }, { data: roomsBeds, error: roomsBedsError }] =
    await Promise.all([
      supabase.from("room_types").select("id, name"),
      supabase.from("rooms_beds").select("id, room_type_id").eq("is_active", true),
    ]);

  if (roomTypesError || roomsBedsError) {
    return NextResponse.json({ error: "Could not load room inventory" }, { status: 500 });
  }

  // Bookings overlapping the requested range block their bed for it.
  const { data: overlapping, error: bookingsError } = await supabase
    .from("bookings")
    .select("room_bed_id, checkout_date")
    .neq("status", "cancelled")
    .lt("checkin_date", checkOut)
    .gt("checkout_date", checkIn);

  if (bookingsError) {
    return NextResponse.json({ error: "Could not load bookings" }, { status: 500 });
  }

  const blockingCheckoutByBed = new Map<string, string>();
  for (const booking of overlapping ?? []) {
    const current = blockingCheckoutByBed.get(booking.room_bed_id);
    // Keep the earliest checkout among a bed's overlapping bookings — that's
    // the soonest date this specific bed could free up.
    if (!current || booking.checkout_date < current) {
      blockingCheckoutByBed.set(booking.room_bed_id, booking.checkout_date);
    }
  }

  const availability: Record<string, RoomTypeAvailability> = {};
  for (const roomType of roomTypes ?? []) {
    const beds = (roomsBeds ?? []).filter((rb) => rb.room_type_id === roomType.id);
    const freeBeds = beds.filter((bed) => !blockingCheckoutByBed.has(bed.id));

    let nextFreeDate: string | null = null;
    if (freeBeds.length === 0 && beds.length > 0) {
      // Sold out for this range — surface the soonest date any bed of this
      // type reopens, i.e. the earliest of each occupied bed's blocking checkout.
      nextFreeDate = beds.reduce<string | null>((earliest, bed) => {
        const checkout = blockingCheckoutByBed.get(bed.id) ?? null;
        if (!checkout) return earliest;
        if (!earliest || checkout < earliest) return checkout;
        return earliest;
      }, null);
    }

    // Keyed by id (stable) rather than name (renameable in the PMS) — the
    // current name travels in the value so the site always reflects it.
    availability[roomType.id] = { name: roomType.name, available: freeBeds.length, nextFreeDate };
  }

  return NextResponse.json({ availability });
}
