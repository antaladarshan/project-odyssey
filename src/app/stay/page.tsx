import { redirect } from "next/navigation";

// /stay redirects to the rooms section on the homepage for now
// This becomes a standalone property page in Phase 4+
export default function StayPage() {
  redirect("/#rooms");
}
