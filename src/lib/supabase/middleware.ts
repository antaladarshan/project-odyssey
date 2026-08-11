import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/types/database.types";

// Paths only the 'owner' role may reach — everyone else gets bounced to
// /calendar. Extend this list as more owner-only sections get built.
const OWNER_ONLY_PATHS = ["/settings/pricing"];

// Refreshes the Supabase auth session and redirects unauthenticated staff to
// /login. Invoked from src/proxy.ts (Next.js 16 renamed the middleware.ts
// file convention to proxy.ts), whose matcher already limits this to the
// staff PMS routes — every other route on the site never reaches here.
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (OWNER_ONLY_PATHS.some((path) => request.nextUrl.pathname.startsWith(path))) {
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    if (profile?.role !== "owner") {
      return NextResponse.redirect(new URL("/calendar", request.url));
    }
  }

  return response;
}
