// A restrained Greek-key (meander) accent — used sparingly (per the "warm &
// textured", not "bold & decorative", direction), e.g. under the login
// card. Hex is hardcoded to match --color-ink-navy since data-URI
// backgrounds can't reference CSS custom properties.
export function GreekKeyDivider({ className = "" }: { className?: string }) {
  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={`h-3 w-full opacity-[0.16] ${className}`}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='12' viewBox='0 0 24 12'%3E%3Cpath d='M0 10 H6 V2 H18 V6 H12 V10 H24' fill='none' stroke='%231e3348' stroke-width='2'/%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat-x",
        backgroundSize: "24px 12px",
      }}
    />
  );
}
