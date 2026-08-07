import Link from "next/link";
import { ChannelBadge } from "@/components/calendar/ChannelBadge";
import { BookingStatusBadge } from "@/components/bookings/BookingStatusBadge";
import type { BookingStatus } from "@/types/database.types";

export interface StayHistoryItem {
  id: string;
  checkin_date: string;
  checkout_date: string;
  status: BookingStatus;
  room_bed_label: string;
  channel: { name: string; brand_color: string; logo_key: string };
}

export function GuestStayHistory({ stays }: { stays: StayHistoryItem[] }) {
  if (stays.length === 0) {
    return (
      <p className="rounded-xl border border-ink-navy/10 bg-surface-white px-4 py-6 text-center text-sm text-charcoal/50 shadow-soft">
        No stays yet.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {stays.map((stay) => (
        <li key={stay.id}>
          <Link
            href={`/bookings/${stay.id}`}
            className="flex items-center justify-between gap-3 rounded-xl border border-ink-navy/10 bg-surface-white px-3.5 py-3 text-sm shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift"
          >
            <div className="flex items-center gap-2">
              <ChannelBadge
                name={stay.channel.name}
                brandColor={stay.channel.brand_color}
                logoKey={stay.channel.logo_key}
              />
              <span className="font-mono text-charcoal">
                {stay.checkin_date} → {stay.checkout_date}
              </span>
              <span className="text-charcoal/50">{stay.room_bed_label}</span>
            </div>
            <BookingStatusBadge status={stay.status} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
