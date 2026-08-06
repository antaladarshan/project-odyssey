"use client";

import { useRef, useState, useTransition } from "react";
import { updateRoomTypeNameAction } from "@/lib/actions/rooms";

export interface EditableRoomTypeNameProps {
  roomTypeId: string;
  name: string;
}

// Click to rename a room type in place. Note: renaming changes which
// RoomEmblem (if any) shows next to it — emblems are matched by name (see
// src/components/ui/RoomEmblem.tsx), so a renamed room type loses its
// themed icon until that map is updated too. Acceptable trade-off rather
// than adding a persisted icon-key column for this.
export function EditableRoomTypeName({ roomTypeId, name }: EditableRoomTypeNameProps) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(name);
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  function save() {
    const trimmed = value.trim();
    setEditing(false);
    if (!trimmed || trimmed === name) {
      setValue(name);
      return;
    }
    startTransition(async () => {
      const result = await updateRoomTypeNameAction(roomTypeId, trimmed);
      if (result.error) {
        setError(result.error);
        setValue(name);
        setTimeout(() => setError(null), 3000);
      }
    });
  }

  if (editing) {
    return (
      <input
        ref={inputRef}
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={(e) => e.target.select()}
        onBlur={save}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            save();
          }
          if (e.key === "Escape") {
            setValue(name);
            setEditing(false);
          }
        }}
        className="rounded border border-bronze bg-surface-white px-1 font-serif text-sm text-ink-navy outline-none"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setEditing(true)}
      title="Click to rename"
      className="font-serif text-sm text-ink-navy decoration-dotted decoration-ink-navy/30 underline-offset-2 hover:underline"
    >
      {error ? <span className="text-oxide">{error}</span> : value}
    </button>
  );
}
