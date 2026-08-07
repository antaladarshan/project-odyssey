"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { GreekKeyDivider } from "@/components/ui/GreekKeyDivider";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("loading");

    const redirectTo = new URLSearchParams(window.location.search).get("redirectTo") ?? "/calendar";
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setStatus("error");
      return;
    }

    window.location.assign(redirectTo);
  }

  return (
    <main
      className="flex min-h-full flex-1 items-center justify-center bg-stone px-4 py-12"
      style={{
        backgroundImage:
          "radial-gradient(circle at 50% 15%, rgba(30,51,72,0.09), transparent 60%)",
      }}
    >
      <div className="w-full max-w-sm">
        <div className="mx-auto mb-6 h-24 w-24 overflow-hidden rounded-2xl shadow-card">
          <Image
            src="/mascot.png"
            alt=""
            width={192}
            height={192}
            priority
            className="h-full w-full object-cover"
          />
        </div>

        <div className="rounded-2xl border border-ink-navy/10 bg-surface-white p-8 shadow-card">
          <h1 className="font-serif text-3xl tracking-tight text-ink-navy">Project Odyssey</h1>
          <p className="mt-1.5 text-sm text-charcoal/70">
            Sign in to manage bookings.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <Input
              id="email"
              label="Email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@projectodyssey.in"
            />
            <Input
              id="password"
              label="Password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            <Button type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Signing in…" : "Sign in"}
            </Button>
            {status === "error" && (
              <p className="text-sm text-oxide">Incorrect email or password.</p>
            )}
          </form>
        </div>

        <GreekKeyDivider className="mt-6 text-ink-navy" />
      </div>
    </main>
  );
}
