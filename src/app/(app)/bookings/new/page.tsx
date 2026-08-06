import { createClient } from "@/lib/supabase/server";
import { QuickAddForm } from "@/components/bookings/QuickAddForm";

export default async function NewBookingPage({
  searchParams,
}: {
  searchParams: Promise<{ room_bed_id?: string; checkin_date?: string }>;
}) {
  const { room_bed_id, checkin_date } = await searchParams;
  const supabase = await createClient();

  const [{ data: roomTypes }, { data: roomsBeds }, { data: channels }, { data: guests }] =
    await Promise.all([
      supabase.from("room_types").select("id, name").order("sort_order"),
      supabase
        .from("rooms_beds")
        .select("id, room_type_id, label")
        .eq("is_active", true)
        .order("sort_order"),
      supabase
        .from("channels")
        .select("id, name")
        .in("type", ["messaging", "direct", "phone", "walkin"])
        .eq("is_active", true)
        .order("name"),
      supabase.from("guests").select("id, name, phone").order("name"),
    ]);

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-5 p-4 md:p-6">
      <div>
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-bronze">
          WhatsApp · Phone · Walk-in · Direct
        </p>
        <h1 className="font-serif text-3xl tracking-tight text-ink-navy">Add booking</h1>
      </div>
      <div className="rounded-2xl border border-ink-navy/10 bg-surface-white p-5 shadow-card md:p-6">
        <QuickAddForm
          roomTypes={roomTypes ?? []}
          roomsBeds={roomsBeds ?? []}
          channels={channels ?? []}
          guests={guests ?? []}
          defaultRoomBedId={room_bed_id}
          defaultCheckinDate={checkin_date}
        />
      </div>
    </div>
  );
}
