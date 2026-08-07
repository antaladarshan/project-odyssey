import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export default async function GuestsPage() {
  const supabase = await createClient();
  const { data: guests } = await supabase.from("guests").select("id, name, phone").order("name");

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-5 p-4 md:p-6">
      <h1 className="font-serif text-3xl tracking-tight text-ink-navy">Guests</h1>

      {(guests ?? []).length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-ink-navy/10 bg-surface-white px-6 py-12 text-center shadow-card">
          <div className="h-16 w-16 overflow-hidden rounded-xl shadow-soft">
            <Image src="/mascot.png" alt="" width={128} height={128} className="h-full w-full object-cover" />
          </div>
          <p className="text-sm text-charcoal/60">No guests yet — they show up here after a booking.</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {guests!.map((guest) => (
            <li key={guest.id}>
              <Link
                href={`/guests/${guest.id}`}
                className="flex items-center justify-between rounded-xl border border-ink-navy/10 bg-surface-white px-4 py-3.5 text-sm shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift"
              >
                <span className="font-medium text-charcoal">{guest.name}</span>
                {guest.phone && <span className="font-mono text-charcoal/50">{guest.phone}</span>}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
