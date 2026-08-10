import type { ChangeEvent } from "react";
import { Select } from "@/components/ui/Select";
import { formatShortDate } from "@/lib/dates";

export interface RoomBedPickerProps {
  roomTypes: { id: string; name: string }[];
  roomsBeds: { id: string; room_type_id: string; label: string }[];
  defaultValue?: string;
  error?: string;
  /** room_bed_id → ISO date it frees up. Beds present here render disabled
   *  with that date appended to their label. Omit entirely to render exactly
   *  as before, every option enabled — existing callers need no changes. */
  unavailableBeds?: Record<string, string>;
  /** Controlled mode — pass together with `onChange`. Without `onChange` this
   *  falls back to uncontrolled `defaultValue`, unchanged from before. */
  value?: string;
  onChange?: (roomBedId: string) => void;
}

export function RoomBedPicker({
  roomTypes,
  roomsBeds,
  defaultValue,
  error,
  unavailableBeds,
  value,
  onChange,
}: RoomBedPickerProps) {
  const selectProps = onChange
    ? { value: value ?? "", onChange: (e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value) }
    : { defaultValue };

  return (
    <div className="flex flex-col gap-1.5">
      <Select id="room_bed_id" name="room_bed_id" label="Room / bed" required {...selectProps}>
        <option value="" disabled>
          Select a room or bed
        </option>
        {roomTypes.map((roomType) => (
          <optgroup key={roomType.id} label={roomType.name}>
            {roomsBeds
              .filter((rb) => rb.room_type_id === roomType.id)
              .map((rb) => {
                const blockedUntil = unavailableBeds?.[rb.id];
                return (
                  <option key={rb.id} value={rb.id} disabled={Boolean(blockedUntil)}>
                    {rb.label}
                    {blockedUntil ? ` — occupied until ${formatShortDate(blockedUntil)}` : ""}
                  </option>
                );
              })}
          </optgroup>
        ))}
      </Select>
      {error && <p className="text-sm text-oxide">{error}</p>}
    </div>
  );
}
