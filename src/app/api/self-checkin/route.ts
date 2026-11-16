import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import {
  ID_CARD_PATH_PATTERN,
  MAX_ID_FILES_PER_TRAVELER,
  selfCheckinSchema,
} from "@/lib/validations/self-checkin";

function isValidISODate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(new Date(value).getTime());
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const parsed = selfCheckinSchema.safeParse({
    email: formData.get("email"),
    phone: formData.get("phone"),
    checkin_date: formData.get("checkin_date"),
    checkout_date: formData.get("checkout_date"),
    add_ons: formData.getAll("add_ons"),
    traveler_name: formData.getAll("traveler_name"),
  });

  if (!parsed.success) {
    return NextResponse.json({ fieldErrors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }
  const input = parsed.data;

  if (!isValidISODate(input.checkin_date) || !isValidISODate(input.checkout_date)) {
    return NextResponse.json(
      { fieldErrors: { checkin_date: ["Enter valid dates"] } },
      { status: 400 }
    );
  }

  // Files are uploaded by the browser straight to Storage (see
  // /api/self-checkin/upload-urls); this route only receives the object
  // paths, one indexed field per traveler (traveler_id_card_paths_0, ...).
  const idCardPathsByTraveler = input.traveler_name.map((_, index) =>
    formData.getAll(`traveler_id_card_paths_${index}`).map(String)
  );
  const fail = (message: string) =>
    NextResponse.json({ fieldErrors: { traveler_id_card: [message] } }, { status: 400 });

  for (const paths of idCardPathsByTraveler) {
    if (paths.length === 0) return fail("Every traveler needs at least one ID photo or PDF");
    if (paths.length > MAX_ID_FILES_PER_TRAVELER) {
      return fail(`Upload at most ${MAX_ID_FILES_PER_TRAVELER} files per traveler`);
    }
    if (paths.some((path) => !ID_CARD_PATH_PATTERN.test(path))) {
      return fail("Upload a photo or PDF of each traveler's ID");
    }
  }
  const uploadedPaths = idCardPathsByTraveler.flat();
  if (new Set(uploadedPaths).size !== uploadedPaths.length) {
    return fail("Upload a photo or PDF of each traveler's ID");
  }

  const supabase = createServiceClient();

  const { data: roomType, error: roomTypeError } = await supabase
    .from("room_types")
    .select("id")
    .eq("name", "Ithaca")
    .single();

  if (roomTypeError || !roomType) {
    return NextResponse.json({ error: "Check-in is not available right now." }, { status: 500 });
  }

  // Make sure every referenced file really landed in Storage.
  const { data: signed, error: signError } = await supabase.storage
    .from("id-cards")
    .createSignedUrls(uploadedPaths, 60);
  if (signError || !signed || signed.some((entry) => !entry.signedUrl)) {
    return NextResponse.json(
      { error: "An ID upload did not finish. Please try again." },
      { status: 400 }
    );
  }

  const { data: checkin, error: checkinError } = await supabase
    .from("guest_checkins")
    .insert({
      room_type_id: roomType.id,
      email: input.email,
      phone: input.phone ?? null,
      checkin_date: input.checkin_date,
      checkout_date: input.checkout_date,
      add_ons: input.add_ons,
    })
    .select("id")
    .single();

  if (checkinError || !checkin) {
    console.error("[self-checkin] guest_checkins insert failed", checkinError);
    await supabase.storage.from("id-cards").remove(uploadedPaths);
    return NextResponse.json({ error: "Could not submit your check-in. Try again." }, { status: 500 });
  }

  const { error: travelersError } = await supabase.from("guest_checkin_travelers").insert(
    input.traveler_name.map((name, index) => ({
      checkin_id: checkin.id,
      name,
      id_card_paths: idCardPathsByTraveler[index],
      sort_order: index,
    }))
  );

  if (travelersError) {
    console.error("[self-checkin] guest_checkin_travelers insert failed", travelersError);
    await supabase.storage.from("id-cards").remove(uploadedPaths);
    await supabase.from("guest_checkins").delete().eq("id", checkin.id);
    return NextResponse.json({ error: "Could not submit your check-in. Try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
