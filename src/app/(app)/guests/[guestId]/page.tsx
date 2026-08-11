import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { GuestProfileCard } from "@/components/guests/GuestProfileCard";
import { GuestStayHistory, type StayHistoryItem } from "@/components/guests/GuestStayHistory";

export default async function GuestProfilePage({
  params,
}: {
  params: Promise<{ guestId: string }>;
}) {
  const { guestId } = await params;
  const supabase = await createClient();

  const { data: guest } = await supabase.from("guests").select("*").eq("id", guestId).single();
  if (!guest) notFound();

  const { data: bookings } = await supabase
    .from("bookings")
    .select("id, checkin_date, checkout_date, status, room_bed_id, channel_id")
    .eq("guest_id", guestId)
    .order("checkin_date", { ascending: false });

  const roomBedIds = [...new Set((bookings ?? []).map((b) => b.room_bed_id))];
  const channelIds = [...new Set((bookings ?? []).map((b) => b.channel_id))];

  const [{ data: roomsBeds }, { data: channels }] = await Promise.all([
    roomBedIds.length > 0
      ? supabase.from("rooms_beds").select("id, label").in("id", roomBedIds)
      : Promise.resolve({ data: [] }),
    channelIds.length > 0
      ? supabase.from("channels").select("id, name, brand_color, logo_key").in("id", channelIds)
      : Promise.resolve({ data: [] }),
  ]);

  const roomBedById = new Map((roomsBeds ?? []).map((rb) => [rb.id, rb]));
  const channelById = new Map((channels ?? []).map((c) => [c.id, c]));

  const { data: idCardSignedUrl } = guest.id_card_path
    ? await supabase.storage.from("id-cards").createSignedUrl(guest.id_card_path, 300)
    : { data: null };

  const stays: StayHistoryItem[] = (bookings ?? []).flatMap((booking) => {
    const channel = channelById.get(booking.channel_id);
    if (!channel) return [];
    return [
      {
        id: booking.id,
        checkin_date: booking.checkin_date,
        checkout_date: booking.checkout_date,
        status: booking.status,
        room_bed_label: roomBedById.get(booking.room_bed_id)?.label ?? "",
        channel,
      },
    ];
  });

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-6 p-4 md:p-6">
      <Link href="/guests" className="flex items-center gap-1.5 text-sm text-charcoal/60 hover:text-charcoal">
        <ArrowLeft size={16} />
        Back to guests
      </Link>

      <GuestProfileCard name={guest.name} phone={guest.phone} email={guest.email} notes={guest.notes} />

      {idCardSignedUrl?.signedUrl && (
        <div className="rounded-2xl border border-ink-navy/10 bg-surface-white p-5 shadow-soft">
          <h2 className="mb-3 font-serif text-lg text-ink-navy">ID card</h2>
          {/* eslint-disable-next-line @next/next/no-img-element -- private bucket, signed URL changes per request */}
          <img
            src={idCardSignedUrl.signedUrl}
            alt="Guest ID card"
            className="w-full rounded-xl border border-ink-navy/10"
          />
        </div>
      )}

      <div>
        <h2 className="mb-3 font-serif text-lg text-ink-navy">Stay history</h2>
        <GuestStayHistory stays={stays} />
      </div>
    </div>
  );
}
