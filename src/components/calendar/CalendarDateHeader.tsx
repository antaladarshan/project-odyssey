import { formatDateHeader, isSameDate } from "@/lib/dates";

export interface CalendarDateHeaderProps {
  dates: Date[];
}

export function CalendarDateHeader({ dates }: CalendarDateHeaderProps) {
  const today = new Date();

  return (
    <div
      className="sticky top-0 z-30 grid border-b border-ink-navy/10 bg-surface-white"
      style={{ gridTemplateColumns: `9rem repeat(${dates.length}, minmax(3.5rem, 1fr))` }}
    >
      {/* z-30: must always paint above scrolling row content — booking
          bars sit at z-[1] (z-50 while hover-lifted, see BookingBar.tsx),
          and without a header z-index clearly above both, same-z siblings
          tie-break by DOM order, which favours whichever row scrolled
          under the header last, splitting it visually mid-scroll. */}
      <div className="sticky left-0 z-[1] bg-surface-white" />
      {dates.map((date) => {
        const { weekday, day, month } = formatDateHeader(date);
        const isToday = isSameDate(date, today);
        const isWeekend = date.getDay() === 0 || date.getDay() === 6;
        return (
          <div
            key={date.toISOString()}
            className={`flex flex-col items-center gap-0.5 border-l border-ink-navy/5 py-2 text-center ${
              isToday ? "bg-bronze/[0.08]" : isWeekend ? "bg-ink-navy/[0.02]" : ""
            }`}
          >
            <span className="font-mono text-[10px] uppercase tracking-wide text-charcoal/50">
              {weekday}
            </span>
            <span className={`font-mono text-sm ${isToday ? "font-semibold text-bronze" : "text-charcoal"}`}>
              {day}
            </span>
            <span className="text-[10px] text-charcoal/40">{month}</span>
          </div>
        );
      })}
    </div>
  );
}
