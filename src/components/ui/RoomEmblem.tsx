import { Zap, Eye } from "lucide-react";

// PLAN.md Section 7: "Room emblems (laurel / thunderbolt / omphalos-eye) as
// row markers" for the room types (originally Olympus / Elysium / Oracle;
// Elysium was renamed to Ithaca — see supabase/seed.sql). Thunderbolt and
// the oracle's eye reuse lucide (already a dependency, matches the stroke
// weight used everywhere else); the laurel has no lucide equivalent, so
// it's hand-built from a symmetric ring of leaf marks.
const EMBLEM_BY_ROOM_TYPE: Record<string, "laurel" | "thunderbolt" | "omphalos-eye"> = {
  Olympus: "laurel",
  Ithaca: "thunderbolt",
  Oracle: "omphalos-eye",
};

function Laurel({ size, className }: { size: number; className?: string }) {
  const leaves = (side: 1 | -1) =>
    Array.from({ length: 4 }, (_, i) => {
      const t = i / 3;
      const x = 12 + side * (1.5 + t * 5.5);
      const y = 19 - t * 13;
      const angle = side * (30 + t * 55);
      return (
        <ellipse
          key={`${side}-${i}`}
          cx={x}
          cy={y}
          rx="2.1"
          ry="0.95"
          transform={`rotate(${angle} ${x} ${y})`}
        />
      );
    });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      {leaves(1)}
      {leaves(-1)}
    </svg>
  );
}

export interface RoomEmblemProps {
  roomTypeName: string;
  size?: number;
  className?: string;
}

export function RoomEmblem({ roomTypeName, size = 16, className = "" }: RoomEmblemProps) {
  const emblem = EMBLEM_BY_ROOM_TYPE[roomTypeName];
  if (!emblem) return null;

  if (emblem === "laurel") return <Laurel size={size} className={className} />;
  if (emblem === "thunderbolt")
    return <Zap size={size} className={className} strokeWidth={1.75} aria-hidden="true" />;
  return <Eye size={size} className={className} strokeWidth={1.75} aria-hidden="true" />;
}
