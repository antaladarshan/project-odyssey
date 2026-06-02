import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "My Account",
  description: "Manage your bookings and rebook in one tap.",
};

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-abyss pt-24 pb-16 px-4 sm:px-6 flex items-center justify-center">
      <div className="w-full max-w-sm flex flex-col gap-6 text-center">
        <h1 className="font-display font-bold text-3xl text-ice">Traveler Account</h1>
        <p className="text-sky-tint text-sm">
          Your booking history and one-tap rebook feature is coming in Phase 6 with full Supabase
          Auth integration.
        </p>
        <div className="p-6 rounded-2xl bg-ink border border-white/8 flex flex-col gap-3">
          <Link
            href="/login"
            className="bg-odyssey-blue hover:bg-azure-deep text-white font-semibold py-3 rounded-full transition-colors text-sm"
          >
            Sign In
          </Link>
          <Link
            href="/book"
            className="border border-white/15 hover:border-odyssey-blue text-sky-tint font-semibold py-3 rounded-full transition-colors text-sm"
          >
            Book Now
          </Link>
        </div>
        <Link href="/" className="text-sm text-odyssey-blue hover:text-mascot-glow transition-colors">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
