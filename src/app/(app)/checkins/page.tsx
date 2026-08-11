import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { RoomEmblem } from "@/components/ui/RoomEmblem";
import { toISODate, formatShortDate } from "@/lib/dates";

export default async function CheckinsPage() {
  const supabase = await createClient();

  const [{ data: roomType }, { data: pendingTravelers }] = await Promise.all([
    supabase.from("room_types").select("id, name").eq("name", "Ithaca").single(),
    supabase
      .from("guest_checkin_travelers")
      .select("id, checkin_id, name, sort_order, created_at")
      .eq("status", "pending")
      .order("created_at", { ascending: true }),
  ]);

  const checkinIds = [...new Set((pendingTravelers ?? []).map((t) => t.checkin_id))];
  const { data: checkins } =
    checkinIds.length > 0
      ? await supabase
          .from("guest_checkins")
          .select("id, checkin_date, checkout_date")
          .in("id", checkinIds)
      : { data: [] };
  const checkinById = new Map((checkins ?? []).map((c) => [c.id, c]));

  const partiesByCheckinId = new Map<string, { id: string; name: string; sort_order: number }[]>();
  for (const traveler of pendingTravelers ?? []) {
    const list = partiesByCheckinId.get(traveler.checkin_id) ?? [];
    list.push(traveler);
    partiesByCheckinId.set(traveler.checkin_id, list);
  }
  const parties = [...partiesByCheckinId.entries()]
    .map(([checkinId, travelers]) => ({
      checkinId,
      travelers: travelers.sort((a, b) => a.sort_order - b.sort_order),
      checkin: checkinById.get(checkinId),
    }))
    .filter((party) => party.checkin);

  const { data: beds } = roomType
    ? await supabase
        .from("rooms_beds")
        .select("id, label")
        .eq("room_type_id", roomType.id)
        .order("sort_order")
    : { data: [] };

  const today = toISODate(new Date());
  const bedIds = (beds ?? []).map((b) => b.id);

  const { data: activeBookings } =
    bedIds.length > 0
      ? await supabase
          .from("bookings")
          .select("id, room_bed_id, guest_id")
          .in("room_bed_id", bedIds)
          .neq("status", "cancelled")
          .lte("checkin_date", today)
          .gt("checkout_date", today)
      : { data: [] };

  const guestIds = [...new Set((activeBookings ?? []).map((b) => b.guest_id))];
  const { data: guests } =
    guestIds.length > 0
      ? await supabase.from("guests").select("id, name").in("id", guestIds)
      : { data: [] };

  const guestById = new Map((guests ?? []).map((g) => [g.id, g]));
  const bookingByBed = new Map((activeBookings ?? []).map((b) => [b.room_bed_id, b]));

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="font-serif text-2xl text-ink-navy">Check-ins</h1>
        <p className="text-sm text-charcoal/60">Guest self-check-in submissions and Ithaca bed status.</p>
      </div>

      <section>
        <h2 className="mb-3 font-serif text-lg text-ink-navy">Pending ({parties.length})</h2>
        {parties.length === 0 ? (
          <p className="rounded-2xl border border-ink-navy/10 bg-surface-white p-5 text-sm text-charcoal/60 shadow-soft">
            No pending check-ins.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {parties.map((party) => (
              <li key={party.checkinId}>
                <Link
                  href={`/checkins/${party.checkinId}`}
                  className="flex items-center justify-between rounded-2xl border border-ink-navy/10 bg-surface-white p-4 shadow-soft transition-shadow hover:shadow-card"
                >
                  <span className="font-medium text-ink-navy">
                    {party.travelers[0].name}
                    {party.travelers.length > 1 && (
                      <span className="text-charcoal/50"> +{party.travelers.length - 1} more</span>
                    )}
                  </span>
                  <span className="font-mono text-xs text-charcoal/60">
                    {formatShortDate(party.checkin!.checkin_date)} –{" "}
                    {formatShortDate(party.checkin!.checkout_date)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="mb-3 flex items-center gap-1.5 font-serif text-lg text-ink-navy">
          <RoomEmblem roomTypeName="Ithaca" size={16} className="text-bronze" />
          Ithaca beds
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {(beds ?? []).map((bed) => {
            const booking = bookingByBed.get(bed.id);
            const guestName = booking ? guestById.get(booking.guest_id)?.name : null;
            return (
              <div
                key={bed.id}
                className={`rounded-2xl border p-4 shadow-soft ${
                  booking
                    ? "border-ink-navy/10 bg-surface-white"
                    : "border-dashed border-ink-navy/15 bg-surface-white/60"
                }`}
              >
                <p className="font-mono text-[11px] uppercase tracking-wide text-charcoal/45">
                  {bed.label}
                </p>
                {booking ? (
                  <Link
                    href={`/bookings/${booking.id}`}
                    className="mt-1 block font-medium text-ink-navy hover:text-bronze"
                  >
                    {guestName ?? "Guest"}
                  </Link>
                ) : (
                  <p className="mt-1 text-sm text-charcoal/40">Vacant</p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
