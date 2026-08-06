import { Select } from "@/components/ui/Select";

export interface RoomBedPickerProps {
  roomTypes: { id: string; name: string }[];
  roomsBeds: { id: string; room_type_id: string; label: string }[];
  defaultValue?: string;
  error?: string;
}

export function RoomBedPicker({ roomTypes, roomsBeds, defaultValue, error }: RoomBedPickerProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Select id="room_bed_id" name="room_bed_id" label="Room / bed" required defaultValue={defaultValue}>
        <option value="" disabled>
          Select a room or bed
        </option>
        {roomTypes.map((roomType) => (
          <optgroup key={roomType.id} label={roomType.name}>
            {roomsBeds
              .filter((rb) => rb.room_type_id === roomType.id)
              .map((rb) => (
                <option key={rb.id} value={rb.id}>
                  {rb.label}
                </option>
              ))}
          </optgroup>
        ))}
      </Select>
      {error && <p className="text-sm text-oxide">{error}</p>}
    </div>
  );
}
