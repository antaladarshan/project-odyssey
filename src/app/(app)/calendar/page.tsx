import Link from "next/link";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { CalendarGrid } from "@/components/calendar/CalendarGrid";
import { CALENDAR_WINDOW_DAYS, addDays, parseISODate, startOfToday, toISODate } from "@/lib/dates";

export default async function CalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ start?: string }>;
}) {
  const { start } = await searchParams;
  const windowStart = start ? parseISODate(start) : startOfToday();

  const prevStart = toISODate(addDays(windowStart, -CALENDAR_WINDOW_DAYS));
  const nextStart = toISODate(addDays(windowStart, CALENDAR_WINDOW_DAYS));
  const todayStart = toISODate(startOfToday());

  return (
    <div className="flex flex-col gap-5 p-4 md:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-bronze">
            Every booking, one calendar
          </p>
          <h1 className="font-serif text-3xl tracking-tight text-ink-navy">Calendar</h1>
        </div>
        <Link
          href="/bookings/new"
          className="flex items-center gap-1.5 rounded-xl bg-bronze px-4 py-2.5 text-sm font-medium text-surface-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift active:translate-y-0"
        >
          <Plus size={16} />
          Add booking
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href={`/calendar?start=${prevStart}`}
          className="rounded-lg border border-ink-navy/15 bg-surface-white p-1.5 text-ink-navy shadow-soft transition-shadow hover:shadow-lift"
          aria-label="Previous 14 days"
        >
          <ChevronLeft size={18} />
        </Link>
        <Link
          href={`/calendar?start=${todayStart}`}
          className="rounded-lg border border-ink-navy/15 bg-surface-white px-3 py-1.5 text-sm font-medium text-ink-navy shadow-soft transition-shadow hover:shadow-lift"
        >
          Today
        </Link>
        <Link
          href={`/calendar?start=${nextStart}`}
          className="rounded-lg border border-ink-navy/15 bg-surface-white p-1.5 text-ink-navy shadow-soft transition-shadow hover:shadow-lift"
          aria-label="Next 14 days"
        >
          <ChevronRight size={18} />
        </Link>
      </div>

      <CalendarGrid windowStart={windowStart} windowDays={CALENDAR_WINDOW_DAYS} />
    </div>
  );
}
