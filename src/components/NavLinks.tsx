"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, PlusCircle, Users, IndianRupee } from "lucide-react";

const NAV_ITEMS = [
  { href: "/calendar", label: "Calendar", Icon: CalendarDays },
  { href: "/bookings/new", label: "Add", Icon: PlusCircle },
  { href: "/guests", label: "Guests", Icon: Users },
  { href: "/settings/pricing", label: "Pricing", Icon: IndianRupee },
];

function isActive(pathname: string, href: string) {
  return href === "/calendar" ? pathname === "/calendar" : pathname.startsWith(href);
}

export function DesktopNavLinks() {
  const pathname = usePathname();

  return (
    <nav className="mt-6 flex flex-col gap-1">
      {NAV_ITEMS.map(({ href, label, Icon }) => {
        const active = isActive(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 rounded-lg border-l-2 px-3 py-2.5 text-sm font-medium transition-colors ${
              active
                ? "border-bronze bg-bronze/10 text-ink-navy"
                : "border-transparent text-ink-navy/70 hover:bg-ink-navy/5 hover:text-ink-navy"
            }`}
          >
            <Icon size={18} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export function MobileNavLinks() {
  const pathname = usePathname();

  return (
    <>
      {NAV_ITEMS.map(({ href, label, Icon }) => {
        const active = isActive(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-xs font-medium transition-colors ${
              active ? "text-bronze" : "text-ink-navy/60"
            }`}
          >
            <Icon size={20} />
            {label}
          </Link>
        );
      })}
    </>
  );
}
