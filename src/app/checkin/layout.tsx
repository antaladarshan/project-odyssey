import type { ReactNode } from "react";
import type { Metadata } from "next";
import LogoPlaceholder from "@/components/layout/LogoPlaceholder";

export const metadata: Metadata = {
  title: "Check In | Project Odyssey",
  description: "Upload your ID and a few details to check in.",
};

export default function CheckinLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-abyss">
      <header className="flex items-center justify-center border-b border-white/8 px-4 py-4">
        <LogoPlaceholder size="sm" />
      </header>
      <main className="flex flex-1 flex-col items-center px-4 py-8">{children}</main>
    </div>
  );
}
