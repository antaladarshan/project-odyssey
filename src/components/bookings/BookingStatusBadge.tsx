import type { BookingStatus } from "@/types/database.types";

const LABEL: Record<BookingStatus, string> = {
  confirmed: "Confirmed",
  checked_in: "Checked in",
  checked_out: "Checked out",
  cancelled: "Cancelled",
};

const STYLE: Record<BookingStatus, string> = {
  confirmed: "bg-ink-navy/10 text-ink-navy ring-ink-navy/15",
  checked_in: "bg-olive/15 text-olive ring-olive/20",
  checked_out: "bg-bronze/15 text-bronze ring-bronze/20",
  cancelled: "bg-oxide/10 text-oxide ring-oxide/20",
};

const DOT_STYLE: Record<BookingStatus, string> = {
  confirmed: "bg-ink-navy",
  checked_in: "bg-olive",
  checked_out: "bg-bronze",
  cancelled: "bg-oxide",
};

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wide ring-1 ring-inset ${STYLE[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${DOT_STYLE[status]}`} />
      {LABEL[status]}
    </span>
  );
}
