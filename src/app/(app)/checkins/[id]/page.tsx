import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { AssignBedForm } from "@/components/checkins/AssignBedForm";
import { RejectCheckinButton } from "@/components/checkins/RejectCheckinButton";

export default async function CheckinDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: checkin } = await supabase.from("guest_checkins").select("*").eq("id", id).single();
  if (!checkin) notFound();

  const { data: travelers } = await supabase
    .from("guest_checkin_travelers")
    .select("*")
    .eq("checkin_id", id)
    .order("sort_order");

  const { data: beds } = await supabase
    .from("rooms_beds")
    .select("id, label")
    .eq("room_type_id", checkin.room_type_id)
    .order("sort_order");

  const bedIds = (beds ?? []).map((b) => b.id);

  // Beds already booked for an overlapping range render disabled — same
  // overlap check used by /api/availability. Assigning one traveler creates
  // a real booking immediately, which naturally removes that bed from this
  // list on the next traveler's turn (via revalidation), so travelers in
  // the same party can never collide on a bed.
  const { data: overlapping } =
    bedIds.length > 0
      ? await supabase
          .from("bookings")
          .select("room_bed_id")
          .in("room_bed_id", bedIds)
          .neq("status", "cancelled")
          .lt("checkin_date", checkin.checkout_date)
          .gt("checkout_date", checkin.checkin_date)
      : { data: [] };

  const unavailableBedIds = [...new Set((overlapping ?? []).map((b) => b.room_bed_id))];

  const signedUrlByPath = new Map<string, string>();
  for (const traveler of travelers ?? []) {
    const { data } = await supabase.storage.from("id-cards").createSignedUrl(traveler.id_card_path, 300);
    if (data?.signedUrl) signedUrlByPath.set(traveler.id_card_path, data.signedUrl);
  }

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-6 p-4 md:p-6">
      <Link href="/checkins" className="flex items-center gap-1.5 text-sm text-charcoal/60 hover:text-charcoal">
        <ArrowLeft size={16} />
        Back to check-ins
      </Link>

      <div>
        <h1 className="font-serif text-2xl tracking-tight text-ink-navy">
          {travelers && travelers.length > 1 ? `Party of ${travelers.length}` : "Check-in"}
        </h1>
        {checkin.phone && <p className="text-sm text-charcoal/60">{checkin.phone}</p>}
        <p className="text-sm text-charcoal/60">{checkin.email}</p>
      </div>

      <dl className="grid grid-cols-2 gap-5 rounded-2xl border border-ink-navy/10 bg-surface-white p-5 shadow-card">
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-wide text-charcoal/45">Check-in</dt>
          <dd className="mt-0.5 font-mono text-sm text-charcoal">{checkin.checkin_date}</dd>
        </div>
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-wide text-charcoal/45">Check-out</dt>
          <dd className="mt-0.5 font-mono text-sm text-charcoal">{checkin.checkout_date}</dd>
        </div>
        <div className="col-span-2">
          <dt className="font-mono text-[11px] uppercase tracking-wide text-charcoal/45">Add-ons</dt>
          <dd className="mt-0.5 text-sm text-charcoal">
            {checkin.add_ons.length > 0 ? checkin.add_ons.join(", ") : "None"}
          </dd>
        </div>
      </dl>

      <div className="flex flex-col gap-4">
        {(travelers ?? []).map((traveler, index) => {
          const signedUrl = signedUrlByPath.get(traveler.id_card_path);
          return (
            <div
              key={traveler.id}
              className="rounded-2xl border border-ink-navy/10 bg-surface-white p-5 shadow-soft"
            >
              <h2 className="mb-3 font-serif text-lg text-ink-navy">
                {travelers && travelers.length > 1 ? `Traveler ${index + 1} · ` : ""}
                {traveler.name}
              </h2>

              {signedUrl ? (
                // eslint-disable-next-line @next/next/no-img-element -- private bucket, signed URL changes per request
                <img
                  src={signedUrl}
                  alt={`${traveler.name}'s ID card`}
                  className="mb-4 w-full rounded-xl border border-ink-navy/10"
                />
              ) : (
                <p className="mb-4 text-sm text-charcoal/60">Could not load the ID card image.</p>
              )}

              {traveler.status === "pending" ? (
                <>
                  <h3 className="mb-2 text-sm font-medium text-ink-navy">Assign bed</h3>
                  <AssignBedForm
                    travelerId={traveler.id}
                    beds={beds ?? []}
                    unavailableBedIds={unavailableBedIds}
                  />
                  <div className="mt-4 border-t border-ink-navy/10 pt-4">
                    <RejectCheckinButton travelerId={traveler.id} />
                  </div>
                </>
              ) : (
                <p className="text-sm text-charcoal">
                  {traveler.status === "assigned" ? (
                    <>
                      Already assigned.{" "}
                      {traveler.booking_id && (
                        <Link
                          href={`/bookings/${traveler.booking_id}`}
                          className="text-bronze hover:underline"
                        >
                          View booking
                        </Link>
                      )}
                    </>
                  ) : (
                    "Rejected."
                  )}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
