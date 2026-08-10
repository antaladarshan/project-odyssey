import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Per-bed overlap check for the admin add/edit-booking forms. Unlike
// /api/availability (public, service-role, per-room-type counts for
// anonymous site visitors), this is authenticated-staff-only and per-bed —
// it drives disabling individual <option>s in the room/bed picker. Not
// covered by proxy.ts's middleware matcher (only /calendar, /bookings,
// /guests page routes, not /api/bookings/...), so auth is checked here
// explicitly rather than relied on upstream.

export interface BedAvailabilityResponse {
  /** room_bed_id → ISO date it frees up. Absence = free for the range. */
  blocked: Record<string, string>;
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isValidISODate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(new Date(value).getTime());
}

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const checkIn = request.nextUrl.searchParams.get("checkIn") ?? "";
  const checkOut = request.nextUrl.searchParams.get("checkOut") ?? "";
  const excludeBookingId = request.nextUrl.searchParams.get("excludeBookingId");

  if (!isValidISODate(checkIn) || !isValidISODate(checkOut) || checkOut <= checkIn) {
    return NextResponse.json({ error: "Invalid checkIn/checkOut dates" }, { status: 400 });
  }
  if (excludeBookingId && !UUID_RE.test(excludeBookingId)) {
    return NextResponse.json({ error: "Invalid excludeBookingId" }, { status: 400 });
  }

  let query = supabase
    .from("bookings")
    .select("room_bed_id, checkout_date")
    .neq("status", "cancelled")
    .lt("checkin_date", checkOut)
    .gt("checkout_date", checkIn);

  if (excludeBookingId) {
    query = query.neq("id", excludeBookingId);
  }

  const { data: overlapping, error } = await query;
  if (error) {
    return NextResponse.json({ error: "Could not load bookings" }, { status: 500 });
  }

  const blocked: Record<string, string> = {};
  for (const booking of overlapping ?? []) {
    const current = blocked[booking.room_bed_id];
    if (!current || booking.checkout_date < current) {
      blocked[booking.room_bed_id] = booking.checkout_date;
    }
  }

  return NextResponse.json({ blocked });
}
