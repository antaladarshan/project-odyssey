// Mirrors the CSS custom properties in src/app/globals.css.
// Use these when a colour value is needed in JS (e.g. inline styles for
// dynamic per-channel `brand_color` values from the database) rather than
// as a static Tailwind class.
export const aegean = {
  inkNavy: "#1e3348",
  stone: "#edeeea",
  surface: "#fbfaf7",
  bronze: "#b08551",
  olive: "#6e7f54",
  oxide: "#a23e34",
  charcoal: "#2a2a28",
} as const;

export const bookingStatusColor: Record<
  "confirmed" | "checked_in" | "checked_out" | "cancelled",
  string
> = {
  confirmed: aegean.inkNavy,
  checked_in: aegean.olive,
  checked_out: aegean.bronze,
  cancelled: aegean.oxide,
};
