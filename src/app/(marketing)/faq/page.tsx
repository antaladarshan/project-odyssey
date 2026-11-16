import type { Metadata } from "next";
import Faq from "@/components/sections/Faq";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about staying at Project Odyssey — check-in, check-out, policies, and more.",
  alternates: { canonical: "/faq/" },
};

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-abyss pt-4">
      <Faq />
    </div>
  );
}
