import { Chip } from "@/components/ui/Chip";
import { resolveChannelBadge } from "@/lib/channel-badges";

export interface ChannelBadgeProps {
  name: string;
  brandColor: string;
  logoKey: string;
}

// The one place channel brand colours are allowed to appear (PLAN.md
// Section 7 / CLAUDE.md rule): fixed shape/size chip, only colour + glyph vary.
export function ChannelBadge({ name, brandColor, logoKey }: ChannelBadgeProps) {
  const badge = resolveChannelBadge(logoKey);

  return (
    <Chip color={brandColor} className="uppercase" aria-label={name}>
      {badge.kind === "icon" ? <badge.Icon size={11} strokeWidth={2.5} /> : badge.text}
    </Chip>
  );
}
