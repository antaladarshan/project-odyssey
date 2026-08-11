import { createClient } from "@/lib/supabase/server";
import type { StaffRole } from "@/types/database.types";

export interface CurrentProfile {
  id: string;
  role: StaffRole;
  fullName: string;
}

export async function getCurrentProfile(): Promise<CurrentProfile | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, role, full_name")
    .eq("id", user.id)
    .single();

  return profile ? { id: profile.id, role: profile.role, fullName: profile.full_name } : null;
}
