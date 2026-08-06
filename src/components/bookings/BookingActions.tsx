"use client";

import { useState, useTransition } from "react";
import { MessageCircle } from "lucide-react";
import { setBookingStatusAction } from "@/lib/actions/bookings";
import { Button } from "@/components/ui/Button";
import type { BookingStatus } from "@/types/database.types";

export interface BookingActionsProps {
  bookingId: string;
  status: BookingStatus;
  guestPhone: string | null;
}

const WHATSAPP_MESSAGE = encodeURIComponent("Hi! Regarding your booking at Project Odyssey — ");

export function BookingActions({ bookingId, status, guestPhone }: BookingActionsProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function transition(next: BookingStatus) {
    setError(null);
    startTransition(async () => {
      const result = await setBookingStatusAction(bookingId, next);
      if (result.error) setError(result.error);
    });
  }

  const whatsappHref = guestPhone
    ? `https://wa.me/${guestPhone.replace(/[^\d]/g, "")}?text=${WHATSAPP_MESSAGE}`
    : null;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {status === "confirmed" && (
          <Button variant="secondary" disabled={isPending} onClick={() => transition("checked_in")}>
            Check in
          </Button>
        )}
        {status === "checked_in" && (
          <Button variant="secondary" disabled={isPending} onClick={() => transition("checked_out")}>
            Check out
          </Button>
        )}
        {(status === "confirmed" || status === "checked_in") && (
          <Button variant="ghost" disabled={isPending} onClick={() => transition("cancelled")}>
            Cancel booking
          </Button>
        )}
        {whatsappHref && (
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" type="button">
              <MessageCircle size={16} />
              Message guest
            </Button>
          </a>
        )}
      </div>
      {error && <p className="text-sm text-oxide">{error}</p>}
    </div>
  );
}
