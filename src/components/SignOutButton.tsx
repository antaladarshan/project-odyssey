"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleSignOut}
      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-charcoal/70 hover:bg-stone hover:text-charcoal"
    >
      <LogOut size={16} />
      Sign out
    </button>
  );
}
