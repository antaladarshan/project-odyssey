"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/Input";

export interface GuestPickerProps {
  guests: { id: string; name: string; phone: string | null }[];
  errors?: { guest_name?: string[] };
}

// Search-existing-or-create-new, inline in the quick-add form. Selecting a
// match sets the hidden guest_id; otherwise the typed name (+ optional
// phone) creates a new guest on submit.
export function GuestPicker({ guests, errors }: GuestPickerProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<{ id: string; name: string; phone: string | null } | null>(
    null
  );
  const [showDropdown, setShowDropdown] = useState(false);

  const matches = useMemo(() => {
    if (!query || selected) return [];
    const q = query.toLowerCase();
    return guests
      .filter((g) => g.name.toLowerCase().includes(q) || g.phone?.includes(q))
      .slice(0, 6);
  }, [query, selected, guests]);

  return (
    <div className="relative flex flex-col gap-3">
      <div>
        <Input
          label="Guest name"
          name="guest_name"
          required
          autoComplete="off"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelected(null);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
          placeholder="Search existing guests or type a new name"
        />
        <input type="hidden" name="guest_id" value={selected?.id ?? ""} />
        {errors?.guest_name && <p className="mt-1 text-sm text-oxide">{errors.guest_name[0]}</p>}

        {showDropdown && matches.length > 0 && (
          <ul className="absolute z-10 mt-1 w-full overflow-hidden rounded-lg border border-ink-navy/15 bg-surface-white shadow-md">
            {matches.map((g) => (
              <li key={g.id}>
                <button
                  type="button"
                  onMouseDown={() => {
                    setSelected(g);
                    setQuery(g.name);
                    setShowDropdown(false);
                  }}
                  className="flex w-full flex-col items-start px-3 py-2 text-left text-sm hover:bg-stone"
                >
                  <span className="text-charcoal">{g.name}</span>
                  {g.phone && <span className="text-xs text-charcoal/50">{g.phone}</span>}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selected ? (
        <p className="text-xs text-charcoal/60">
          Existing guest{selected.phone ? ` · ${selected.phone}` : ""}
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <Input label="Phone (optional)" name="guest_phone" type="tel" placeholder="+91…" />
          <Input label="Email (optional)" name="guest_email" type="email" placeholder="guest@email.com" />
        </div>
      )}
    </div>
  );
}
