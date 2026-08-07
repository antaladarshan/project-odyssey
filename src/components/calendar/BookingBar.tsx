import Link from "next/link";
import type { CSSProperties } from "react";
import { MessageCircle } from "lucide-react";
import { ChannelBadge } from "./ChannelBadge";
import { BookingStatusBadge } from "@/components/bookings/BookingStatusBadge";
import { parseISODate } from "@/lib/dates";
import type { BookingStatus } from "@/types/database.types";

export interface BookingBarProps {
  id: string;
  guestName: string;
  guestPhone: string | null;
  status: BookingStatus;
  channel: { name: string; brand_color: string; logo_key: string };
  checkinDate: string;
  checkoutDate: string;
  rateTotal: number | null;
  amountPaid: number;
  gridColumn: string;
}

// The bar itself stays in the Aegean palette (status conveys colour); the
// channel's brand colour is confined to the ChannelBadge chip. See
// CLAUDE.md: "Channel brand colours ONLY on booking badges."
const STATUS_STYLE: Record<BookingStatus, string> = {
  confirmed: "bg-surface-white border-ink-navy/15 text-ink-navy",
  checked_in: "bg-olive/15 border-olive/30 text-olive",
  checked_out: "bg-bronze/15 border-bronze/30 text-bronze",
  cancelled: "bg-oxide/8 border-oxide/20 text-oxide/70 line-through",
};

export function BookingBar({
  id,
  guestName,
  guestPhone,
  status,
  channel,
  checkinDate,
  checkoutDate,
  rateTotal,
  amountPaid,
  gridColumn,
}: BookingBarProps) {
  const style: CSSProperties = { gridColumn, gridRow: 1 };
  const nights = Math.round(
    (parseISODate(checkoutDate).getTime() - parseISODate(checkinDate).getTime()) / 86_400_000
  );
  const balanceDue = rateTotal !== null ? rateTotal - amountPaid : null;

  return (
    <div style={style} className="group relative z-[1] my-2 self-center hover:z-20">
      {/* hover:z-20 lifts this row's own stacking context above sibling
          rows — without it, the hover card's z-index is trapped inside
          this wrapper's local stacking context (position:relative +
          z-index create one) and can never out-rank a later sibling row,
          which always wins ties by DOM order regardless of the card's
          own z-index. Stays below CalendarDateHeader's z-30 so the sticky
          header always wins against scrolled/hovered row content. */}
      <Link
        href={`/bookings/${id}`}
        className={`flex items-center gap-1.5 overflow-hidden rounded-lg border px-2 py-1.5 text-xs font-medium shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift ${STATUS_STYLE[status]}`}
      >
        <ChannelBadge name={channel.name} brandColor={channel.brand_color} logoKey={channel.logo_key} />
        <span className="truncate">{guestName}</span>
      </Link>

      {/* Hover-only detail card — desktop enhancement, doesn't affect the
          click-through-to-detail behaviour on touch devices. */}
      <div className="pointer-events-none absolute left-0 top-full z-10 mt-2 hidden w-60 flex-col gap-2 rounded-xl border border-ink-navy/10 bg-surface-white p-3 shadow-lift group-hover:flex">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-sm font-medium text-charcoal">{guestName}</span>
          <BookingStatusBadge status={status} />
        </div>
        <div className="flex items-center gap-1.5 text-xs text-charcoal/70">
          <ChannelBadge name={channel.name} brandColor={channel.brand_color} logoKey={channel.logo_key} />
          {channel.name}
        </div>
        <div className="font-mono text-xs text-charcoal">
          {checkinDate} → {checkoutDate}
          <span className="text-charcoal/50"> · {nights} nights</span>
        </div>
        {guestPhone && (
          <div className="flex items-center gap-1.5 font-mono text-xs text-charcoal/70">
            <MessageCircle size={12} />
            {guestPhone}
          </div>
        )}
        {rateTotal !== null && (
          <div className="font-mono text-xs text-charcoal/70">
            ₹{rateTotal} · balance ₹{balanceDue}
          </div>
        )}
      </div>
    </div>
  );
}
