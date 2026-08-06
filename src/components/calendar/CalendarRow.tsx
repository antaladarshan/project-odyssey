import { CalendarCell } from "./CalendarCell";
import { BookingBar } from "./BookingBar";
import { EditableBedLabel } from "./EditableBedLabel";
import { gridColumnForStay, isSameDate } from "@/lib/dates";
import type { BookingStatus } from "@/types/database.types";

export interface CalendarRowBooking {
  id: string;
  guest_name: string;
  guest_phone: string | null;
  status: BookingStatus;
  checkin_date: string;
  checkout_date: string;
  rate_total: number | null;
  amount_paid: number;
  channel: { name: string; brand_color: string; logo_key: string };
}

export interface CalendarRowProps {
  roomBed: { id: string; label: string; is_private_room: boolean; is_active: boolean };
  dates: Date[];
  bookings: CalendarRowBooking[];
  windowStart: Date;
}

export function CalendarRow({ roomBed, dates, bookings, windowStart }: CalendarRowProps) {
  const today = new Date();

  return (
    <div
      className={`grid ${!roomBed.is_active ? "opacity-40" : ""}`}
      style={{ gridTemplateColumns: `9rem repeat(${dates.length}, minmax(3.5rem, 1fr))` }}
    >
      <div
        style={{ gridColumn: 1, gridRow: 1 }}
        className="sticky left-0 z-[1] flex h-14 items-center border-t border-ink-navy/5 bg-surface-white px-3"
      >
        <EditableBedLabel bedId={roomBed.id} label={roomBed.label} />
        {!roomBed.is_active && <span className="ml-1.5 shrink-0 text-[10px] text-oxide">Blocked</span>}
      </div>

      {dates.map((date, i) => (
        <CalendarCell
          key={date.toISOString()}
          gridColumn={i + 2}
          isToday={isSameDate(date, today)}
          isWeekend={date.getDay() === 0 || date.getDay() === 6}
        />
      ))}

      {bookings.map((booking) => {
        const span = gridColumnForStay(
          booking.checkin_date,
          booking.checkout_date,
          windowStart,
          dates.length
        );
        if (!span) return null;

        return (
          <BookingBar
            key={booking.id}
            id={booking.id}
            guestName={booking.guest_name}
            guestPhone={booking.guest_phone}
            status={booking.status}
            channel={booking.channel}
            checkinDate={booking.checkin_date}
            checkoutDate={booking.checkout_date}
            rateTotal={booking.rate_total}
            amountPaid={booking.amount_paid}
            gridColumn={`${span.start} / ${span.end}`}
          />
        );
      })}
    </div>
  );
}
