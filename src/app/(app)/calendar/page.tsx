import Link from "next/link";
import { Plus } from "lucide-react";
import { CalendarGrid } from "@/components/calendar/CalendarGrid";
import { CalendarNav } from "@/components/calendar/CalendarNav";
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

      <CalendarNav prevStart={prevStart} todayStart={todayStart} nextStart={nextStart} />

      <CalendarGrid windowStart={windowStart} windowDays={CALENDAR_WINDOW_DAYS} />
    </div>
  );
}
