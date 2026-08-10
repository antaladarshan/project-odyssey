"use client";

import { useState, useTransition } from "react";
import { Ban, CheckCircle2 } from "lucide-react";
import { setRoomTypeActiveAction } from "@/lib/actions/rooms";

export interface RoomTypeBlockToggleProps {
  roomTypeId: string;
  isBlocked: boolean;
}

// Blocking flips is_active off for every bed in the room type. The public
// availability API already excludes inactive beds from its counts, so this
// alone is what makes the room type show as SOLD OUT on the marketing site.
export function RoomTypeBlockToggle({ roomTypeId, isBlocked: initialBlocked }: RoomTypeBlockToggleProps) {
  const [isBlocked, setIsBlocked] = useState(initialBlocked);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function toggle() {
    const wasBlocked = isBlocked;
    const nextBlocked = !wasBlocked;
    setIsBlocked(nextBlocked);
    startTransition(async () => {
      const result = await setRoomTypeActiveAction(roomTypeId, !nextBlocked);
      if (result.error) {
        setIsBlocked(wasBlocked);
        setError(result.error);
        setTimeout(() => setError(null), 3000);
      }
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={isPending}
      title={
        isBlocked
          ? "Unblock this room type — make it bookable again"
          : "Block this room type from new bookings (shows as sold out on the site)"
      }
      className={`ml-auto flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium transition-colors disabled:opacity-50 ${
        isBlocked
          ? "border-oxide/30 bg-oxide/10 text-oxide hover:bg-oxide/15"
          : "border-ink-navy/15 bg-surface-white text-charcoal/60 hover:border-oxide/30 hover:text-oxide"
      }`}
    >
      {isBlocked ? <CheckCircle2 size={12} /> : <Ban size={12} />}
      {error ? "Error — retry" : isBlocked ? "Blocked · Unblock" : "Block room"}
    </button>
  );
}
