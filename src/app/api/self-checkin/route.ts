import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { selfCheckinSchema } from "@/lib/validations/self-checkin";

function isValidISODate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(new Date(value).getTime());
}

const MAX_FILE_BYTES = 8 * 1024 * 1024;

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

  // traveler_name and traveler_id_card are two parallel arrays, appended to
  // FormData in matching order by the client — one pair per traveler.
  const idCards = formData.getAll("traveler_id_card");
  if (idCards.length !== input.traveler_name.length) {
    return NextResponse.json(
      { fieldErrors: { traveler_id_card: ["Every traveler needs an ID photo"] } },
      { status: 400 }
    );
  }
  for (const idCard of idCards) {
    if (!(idCard instanceof File) || idCard.size === 0) {
      return NextResponse.json(
        { fieldErrors: { traveler_id_card: ["Upload a photo of each traveler's ID card"] } },
        { status: 400 }
      );
    }
    if (idCard.size > MAX_FILE_BYTES) {
      return NextResponse.json(
        { fieldErrors: { traveler_id_card: ["A photo is too large — please use a smaller image"] } },
        { status: 400 }
      );
    }
    if (!idCard.type.startsWith("image/")) {
      return NextResponse.json(
        { fieldErrors: { traveler_id_card: ["Upload image files only"] } },
        { status: 400 }
      );
    }
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

  const uploadedPaths: string[] = [];
  for (const idCard of idCards as File[]) {
    const extension = idCard.name.includes(".") ? idCard.name.split(".").pop() : "jpg";
    const objectPath = `${crypto.randomUUID()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("id-cards")
      .upload(objectPath, idCard, { contentType: idCard.type });

    if (uploadError) {
      if (uploadedPaths.length > 0) await supabase.storage.from("id-cards").remove(uploadedPaths);
      return NextResponse.json({ error: "Could not upload an ID card. Try again." }, { status: 500 });
    }
    uploadedPaths.push(objectPath);
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
    await supabase.storage.from("id-cards").remove(uploadedPaths);
    return NextResponse.json({ error: "Could not submit your check-in. Try again." }, { status: 500 });
  }

  const { error: travelersError } = await supabase.from("guest_checkin_travelers").insert(
    input.traveler_name.map((name, index) => ({
      checkin_id: checkin.id,
      name,
      id_card_path: uploadedPaths[index],
      sort_order: index,
    }))
  );

  if (travelersError) {
    await supabase.storage.from("id-cards").remove(uploadedPaths);
    await supabase.from("guest_checkins").delete().eq("id", checkin.id);
    return NextResponse.json({ error: "Could not submit your check-in. Try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
