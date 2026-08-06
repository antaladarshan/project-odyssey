export interface CalendarCellProps {
  gridColumn: number;
  isToday?: boolean;
  isWeekend?: boolean;
}

// gridColumn/gridRow are explicit (not left to CSS Grid auto-placement) so
// this never competes with BookingBar's explicit placement — see
// src/components/calendar/CalendarRow.tsx for why that matters.
export function CalendarCell({ gridColumn, isToday, isWeekend }: CalendarCellProps) {
  return (
    <div
      style={{ gridColumn, gridRow: 1 }}
      className={`h-14 border-l border-t border-ink-navy/5 ${isToday ? "bg-bronze/[0.06]" : isWeekend ? "bg-ink-navy/[0.02]" : ""}`}
    />
  );
}
