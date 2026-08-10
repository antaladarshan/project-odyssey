export const CALENDAR_WINDOW_DAYS = 14;

// Uses local date components, not toISOString() (which is UTC-based) — our
// Date objects represent local calendar days (constructed via local
// midnight), and toISOString() shifts to the previous day for any positive
// UTC offset (e.g. IST, UTC+5:30) between midnight and the offset boundary.
export function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseISODate(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

/** Inclusive list of dates from `start`, `days` long. */
export function dateRange(start: Date, days: number): Date[] {
  return Array.from({ length: days }, (_, i) => addDays(start, i));
}

export function formatShortDate(iso: string): string {
  return parseISODate(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export function formatDateHeader(date: Date): { weekday: string; day: string; month: string } {
  return {
    weekday: date.toLocaleDateString("en-IN", { weekday: "short" }),
    day: date.toLocaleDateString("en-IN", { day: "2-digit" }),
    month: date.toLocaleDateString("en-IN", { month: "short" }),
  };
}

export function isSameDate(a: Date, b: Date): boolean {
  return toISODate(a) === toISODate(b);
}

/** Calendar-accurate months + remaining days between two ISO dates — e.g.
 *  10 Jul → 10 Jan is exactly "6 months", not a nights/30 approximation. */
export function monthsAndDaysBetween(checkin: string, checkout: string): { months: number; days: number } {
  const start = parseISODate(checkin);
  const end = parseISODate(checkout);
  let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  let days = end.getDate() - start.getDate();
  if (days < 0) {
    months -= 1;
    days += new Date(end.getFullYear(), end.getMonth(), 0).getDate(); // days in the month before end
  }
  return { months, days };
}

export function formatMonthsDays(months: number, days: number): string {
  const parts: string[] = [];
  if (months > 0) parts.push(`${months} month${months !== 1 ? "s" : ""}`);
  if (days > 0 || months === 0) parts.push(`${days} day${days !== 1 ? "s" : ""}`);
  return parts.join(" ");
}

/** 1-based grid-column start/end (exclusive end) for a booking's date span,
 * clamped to the visible window. */
export function gridColumnForStay(
  checkin: string,
  checkout: string,
  windowStart: Date,
  windowDays: number
): { start: number; end: number } | null {
  const windowEnd = addDays(windowStart, windowDays);
  const checkinDate = parseISODate(checkin);
  const checkoutDate = parseISODate(checkout);

  if (checkoutDate <= windowStart || checkinDate >= windowEnd) return null;

  const clampedStart = checkinDate < windowStart ? windowStart : checkinDate;
  const clampedEnd = checkoutDate > windowEnd ? windowEnd : checkoutDate;

  const start = Math.round((clampedStart.getTime() - windowStart.getTime()) / 86_400_000) + 2; // +1 for row-label column, +1 for 1-based grid lines
  const end = Math.round((clampedEnd.getTime() - windowStart.getTime()) / 86_400_000) + 2;

  return { start, end };
}
