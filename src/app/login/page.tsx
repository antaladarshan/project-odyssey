import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Project Odyssey account.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-abyss pt-24 pb-16 px-4 sm:px-6 flex items-center justify-center">
      <div className="w-full max-w-sm flex flex-col gap-6 text-center">
        <h1 className="font-display font-bold text-3xl text-ice">Welcome Back, Traveler</h1>
        <p className="text-sky-tint text-sm">
          Returning guest login (magic link / Google) coming in Phase 5 with Supabase Auth.
        </p>
        <div className="p-6 rounded-2xl bg-ink border border-white/8 flex flex-col gap-4">
          <p className="text-xs text-sky-tint/50">
            Until then, book via WhatsApp or email on the{" "}
            <Link href="/book" className="text-odyssey-blue hover:underline">booking page</Link>.
          </p>
        </div>
        <Link href="/" className="text-sm text-odyssey-blue hover:text-mascot-glow transition-colors">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
