import type { HTMLAttributes, ReactNode } from "react";

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  /** Background colour — the only place a non-Aegean colour is allowed to appear. */
  color?: string;
  textColor?: string;
}

// Fixed shape/size chip. Only its colour changes per PLAN.md Section 4's
// badge rule, so the calendar reads as calm rather than a rainbow.
export function Chip({
  children,
  color,
  textColor = "#fbfaf7",
  className = "",
  style,
  ...props
}: ChipProps) {
  return (
    <span
      className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold leading-none ${className}`}
      style={{ backgroundColor: color, color: textColor, ...style }}
      {...props}
    >
      {children}
    </span>
  );
}
