"use client";

import { useRef, useState, useTransition } from "react";
import { updateBedLabelAction } from "@/lib/actions/rooms";

export interface EditableBedLabelProps {
  bedId: string;
  label: string;
}

// Click to rename a bed/room in place — no separate "manage rooms" screen
// needed for something this small. Reverts on error (e.g. the new label
// collides with another bed in the same room type).
export function EditableBedLabel({ bedId, label }: EditableBedLabelProps) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(label);
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  function save() {
    const trimmed = value.trim();
    setEditing(false);
    if (!trimmed || trimmed === label) {
      setValue(label);
      return;
    }
    startTransition(async () => {
      const result = await updateBedLabelAction(bedId, trimmed);
      if (result.error) {
        setError(result.error);
        setValue(label);
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
            setValue(label);
            setEditing(false);
          }
        }}
        className="w-full rounded border border-bronze bg-surface-white px-1 text-sm text-charcoal outline-none"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setEditing(true)}
      title="Click to rename"
      className="truncate text-left text-sm text-charcoal decoration-dotted decoration-charcoal/30 underline-offset-2 hover:underline"
    >
      {error ? <span className="text-oxide">{error}</span> : value}
    </button>
  );
}
