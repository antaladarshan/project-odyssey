import { Select } from "@/components/ui/Select";

export interface ChannelPickerProps {
  channels: { id: string; name: string }[];
  defaultValue?: string;
  error?: string;
}

// Restricted to manual channels (WhatsApp / Phone / Walk-in / Direct) — the 6
// OTAs are only ever created via Phase 2 iCal import, never quick-added.
export function ChannelPicker({ channels, defaultValue, error }: ChannelPickerProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Select id="channel_id" name="channel_id" label="Source" required defaultValue={defaultValue}>
        <option value="" disabled>
          How did this booking come in?
        </option>
        {channels.map((channel) => (
          <option key={channel.id} value={channel.id}>
            {channel.name}
          </option>
        ))}
      </Select>
      {error && <p className="text-sm text-oxide">{error}</p>}
    </div>
  );
}
