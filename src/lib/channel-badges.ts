import {
  Heart,
  Circle,
  MessageCircle,
  Globe,
  Phone,
  Footprints,
  type LucideIcon,
} from "lucide-react";

// Resolves a channels.logo_key value into something renderable by
// ChannelBadge. logo_key is a lookup key, not a real logo asset — OTA
// badges render as short text monograms, the manual channels use a
// neutral icon from lucide-react. See PLAN.md Section 4.
export type ResolvedBadge =
  | { kind: "monogram"; text: string }
  | { kind: "icon"; Icon: LucideIcon };

const ICONS: Record<string, LucideIcon> = {
  heart: Heart,
  circle: Circle,
  "message-circle": MessageCircle,
  globe: Globe,
  phone: Phone,
  footprints: Footprints,
};

export function resolveChannelBadge(logoKey: string): ResolvedBadge {
  const [kind, value] = logoKey.split(":", 2);

  if (kind === "icon" && value in ICONS) {
    return { kind: "icon", Icon: ICONS[value] };
  }
  if (kind === "monogram" && value) {
    return { kind: "monogram", text: value };
  }
  // Fallback: render the raw key so a bad/unseeded value is still visible
  // instead of silently disappearing.
  return { kind: "monogram", text: logoKey.slice(0, 2) };
}
