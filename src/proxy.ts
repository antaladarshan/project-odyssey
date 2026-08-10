import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// Next.js 16 renamed the `middleware.ts` file convention to `proxy.ts`
// (the `middleware` export is now `proxy`). See node_modules/next/dist/docs/
// 01-app/03-api-reference/03-file-conventions/proxy.md.
export function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  // Allow-list: only run the auth check on the staff PMS routes. Every
  // marketing route (/, /about, /book, /stay, ...) is public by default and
  // never reaches this proxy at all.
  matcher: ["/calendar/:path*", "/bookings/:path*", "/guests/:path*", "/settings/:path*"],
};
