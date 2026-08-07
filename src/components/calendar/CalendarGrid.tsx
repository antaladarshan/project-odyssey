import { createClient } from "@/lib/supabase/server";
import { addDays, dateRange, toISODate } from "@/lib/dates";
import { CalendarDateHeader } from "./CalendarDateHeader";
import { CalendarRow, type CalendarRowBooking } from "./CalendarRow";
import { CalendarScrollArea } from "./CalendarScrollArea";
import { EditableRoomTypeName } from "./EditableRoomTypeName";
import { RoomEmblem } from "@/components/ui/RoomEmblem";

export interface CalendarGridProps {
  windowStart: Date;
  windowDays: number;
}

export async function CalendarGrid({ windowStart, windowDays }: CalendarGridProps) {
  const supabase = await createClient();
  const windowEnd = addDays(windowStart, windowDays);
  const dates = dateRange(windowStart, windowDays);

  const [{ data: roomTypes }, { data: roomsBeds }, { data: channels }, { data: bookings }] =
    await Promise.all([
      supabase.from("room_types").select("id, name, sort_order").order("sort_order"),
      supabase
        .from("rooms_beds")
        .select("id, room_type_id, label, is_private_room, is_active, sort_order")
        .order("sort_order"),
      supabase.from("channels").select("id, name, brand_color, logo_key"),
      supabase
        .from("bookings")
        .select(
          "id, room_bed_id, guest_id, channel_id, checkin_date, checkout_date, status, rate_total, amount_paid"
        )
        .lt("checkin_date", toISODate(windowEnd))
        .gt("checkout_date", toISODate(windowStart)),
    ]);

  const guestIds = [...new Set((bookings ?? []).map((b) => b.guest_id))];
  const { data: guests } =
    guestIds.length > 0
      ? await supabase.from("guests").select("id, name, phone").in("id", guestIds)
      : { data: [] };

  const channelById = new Map((channels ?? []).map((c) => [c.id, c]));
  const guestById = new Map((guests ?? []).map((g) => [g.id, g]));

  const bookingsByRoomBed = new Map<string, CalendarRowBooking[]>();
  for (const booking of bookings ?? []) {
    const channel = channelById.get(booking.channel_id);
    if (!channel) continue;

    const list = bookingsByRoomBed.get(booking.room_bed_id) ?? [];
    list.push({
      id: booking.id,
      guest_name: guestById.get(booking.guest_id)?.name ?? "Guest",
      guest_phone: guestById.get(booking.guest_id)?.phone ?? null,
      status: booking.status,
      checkin_date: booking.checkin_date,
      checkout_date: booking.checkout_date,
      rate_total: booking.rate_total,
      amount_paid: booking.amount_paid,
      channel,
    });
    bookingsByRoomBed.set(booking.room_bed_id, list);
  }

  return (
    <CalendarScrollArea>
      <div className="min-w-max">
        <CalendarDateHeader dates={dates} />
        {(roomTypes ?? []).map((roomType) => {
          const beds = (roomsBeds ?? []).filter((rb) => rb.room_type_id === roomType.id);
          if (beds.length === 0) return null;

          return (
            <div key={roomType.id}>
              <div className="flex items-center gap-1.5 border-t border-ink-navy/10 bg-bronze/[0.06] px-3 py-1.5">
                <RoomEmblem roomTypeName={roomType.name} size={14} className="shrink-0 text-bronze" />
                <EditableRoomTypeName roomTypeId={roomType.id} name={roomType.name} />
              </div>
              {beds.map((roomBed) => (
                <CalendarRow
                  key={roomBed.id}
                  roomBed={roomBed}
                  dates={dates}
                  bookings={bookingsByRoomBed.get(roomBed.id) ?? []}
                  windowStart={windowStart}
                />
              ))}
            </div>
          );
        })}
      </div>
    </CalendarScrollArea>
  );
}
