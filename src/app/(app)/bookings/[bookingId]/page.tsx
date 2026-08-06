import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ChannelBadge } from "@/components/calendar/ChannelBadge";
import { BookingStatusBadge } from "@/components/bookings/BookingStatusBadge";
import { BookingActions } from "@/components/bookings/BookingActions";
import { EditBookingDetails } from "@/components/bookings/EditBookingDetails";
import { RoomEmblem } from "@/components/ui/RoomEmblem";
import { parseISODate } from "@/lib/dates";

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) {
  const { bookingId } = await params;
  const supabase = await createClient();

  const { data: booking } = await supabase.from("bookings").select("*").eq("id", bookingId).single();
  if (!booking) notFound();

  const [{ data: guest }, { data: channel }, { data: roomBed }, { data: roomTypes }, { data: roomsBeds }] =
    await Promise.all([
      supabase.from("guests").select("*").eq("id", booking.guest_id).single(),
      supabase.from("channels").select("*").eq("id", booking.channel_id).single(),
      supabase.from("rooms_beds").select("*").eq("id", booking.room_bed_id).single(),
      supabase.from("room_types").select("id, name").order("sort_order"),
      supabase.from("rooms_beds").select("id, room_type_id, label").order("sort_order"),
    ]);

  const { data: roomType } = roomBed
    ? await supabase.from("room_types").select("name").eq("id", roomBed.room_type_id).single()
    : { data: null };

  const nights = Math.round(
    (parseISODate(booking.checkout_date).getTime() - parseISODate(booking.checkin_date).getTime()) /
      86_400_000
  );
  const balanceDue = booking.rate_total !== null ? booking.rate_total - booking.amount_paid : null;

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-6 p-4 md:p-6">
      <Link href="/calendar" className="flex items-center gap-1.5 text-sm text-charcoal/60 hover:text-charcoal">
        <ArrowLeft size={16} />
        Back to calendar
      </Link>

      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl tracking-tight text-ink-navy">{guest?.name ?? "Guest"}</h1>
          {guest?.phone && <p className="text-sm text-charcoal/60">{guest.phone}</p>}
        </div>
        <BookingStatusBadge status={booking.status} />
      </div>

      {channel && (
        <div className="flex items-center gap-2 text-sm text-charcoal">
          <ChannelBadge name={channel.name} brandColor={channel.brand_color} logoKey={channel.logo_key} />
          {channel.name}
        </div>
      )}

      <dl className="grid grid-cols-2 gap-5 rounded-2xl border border-ink-navy/10 bg-surface-white p-5 shadow-card">
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-wide text-charcoal/45">Check-in</dt>
          <dd className="mt-0.5 font-mono text-sm text-charcoal">{booking.checkin_date}</dd>
        </div>
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-wide text-charcoal/45">Check-out</dt>
          <dd className="mt-0.5 font-mono text-sm text-charcoal">{booking.checkout_date}</dd>
        </div>
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-wide text-charcoal/45">Nights</dt>
          <dd className="mt-0.5 text-sm text-charcoal">{nights}</dd>
        </div>
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-wide text-charcoal/45">Room / bed</dt>
          <dd className="mt-0.5 flex items-center gap-1.5 text-sm text-charcoal">
            {roomType?.name && <RoomEmblem roomTypeName={roomType.name} size={14} className="text-bronze" />}
            {roomBed?.label}
            {roomType?.name ? ` · ${roomType.name}` : ""}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-wide text-charcoal/45">Amount</dt>
          <dd className="mt-0.5 font-mono text-sm text-charcoal">
            {booking.rate_total !== null ? `₹${booking.rate_total}` : "Not set"}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-wide text-charcoal/45">Balance due</dt>
          <dd className="mt-0.5 font-mono text-sm text-charcoal">
            {balanceDue !== null ? `₹${balanceDue}` : "—"}
          </dd>
        </div>
      </dl>

      <BookingActions bookingId={booking.id} status={booking.status} guestPhone={guest?.phone ?? null} />

      <div className="rounded-2xl border border-ink-navy/10 bg-surface-white p-5 shadow-soft">
        <h2 className="mb-3 font-serif text-lg text-ink-navy">Edit details</h2>
        <EditBookingDetails
          bookingId={booking.id}
          roomTypes={roomTypes ?? []}
          roomsBeds={roomsBeds ?? []}
          currentRoomBedId={booking.room_bed_id}
          rateTotal={booking.rate_total}
          amountPaid={booking.amount_paid}
          note={booking.note}
        />
      </div>
    </div>
  );
}
