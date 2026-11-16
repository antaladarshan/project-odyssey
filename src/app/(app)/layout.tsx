import LogoPlaceholder from "@/components/layout/LogoPlaceholder";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { SignOutButton } from "@/components/SignOutButton";
import { DesktopNavLinks, MobileNavLinks } from "@/components/NavLinks";
import { getCurrentProfile } from "@/lib/auth/profile";

export const metadata: Metadata = {
  title: { default: "Project Odyssey", template: "%s | Project Odyssey" },
  description: "Unified booking manager for Project Odyssey",
  manifest: "/manifest.webmanifest",
  robots: { index: false, follow: false },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Project Odyssey",
  },
};

export default async function AppLayout({ children }: { children: ReactNode }) {
  const profile = await getCurrentProfile();
  const role = profile?.role ?? "staff";

  return (
    <div className="pms-scope flex min-h-full flex-1 flex-col md:flex-row">
      {/* Desktop left nav */}
      <aside className="hidden w-56 shrink-0 flex-col bg-surface-white p-4 shadow-[2px_0_12px_rgba(30,51,72,0.05)] md:flex">
        <div className="px-2">
          <LogoPlaceholder size="xs" />
        </div>
        <DesktopNavLinks role={role} />
        <div className="mt-auto">
          <SignOutButton />
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <main className="flex-1 pb-20 md:pb-0">{children}</main>

        {/* Mobile bottom nav */}
        <nav className="fixed inset-x-0 bottom-0 z-10 flex border-t border-ink-navy/10 bg-surface-white shadow-[0_-2px_12px_rgba(30,51,72,0.06)] md:hidden">
          <MobileNavLinks role={role} />
        </nav>
      </div>
    </div>
  );
}
