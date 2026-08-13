import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { selfCheckinSchema } from "@/lib/validations/self-checkin";

function isValidISODate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(new Date(value).getTime());
}

const MAX_FILE_BYTES = 8 * 1024 * 1024;
const MAX_FILES_PER_TRAVELER = 5;

function isAllowedIdCardType(type: string): boolean {
  return type.startsWith("image/") || type === "application/pdf";
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

  // traveler_name is an array; each traveler's file(s) come in under their
  // own indexed field (traveler_id_card_0, traveler_id_card_1, ...) since a
  // traveler can now attach more than one file and a single shared field
  // name would lose the traveler boundary once `multiple` is involved.
  const idCardsByTraveler = input.traveler_name.map((_, index) =>
    formData.getAll(`traveler_id_card_${index}`)
  );

  for (const files of idCardsByTraveler) {
    if (files.length === 0) {
      return NextResponse.json(
        { fieldErrors: { traveler_id_card: ["Every traveler needs at least one ID photo or PDF"] } },
        { status: 400 }
      );
    }
    if (files.length > MAX_FILES_PER_TRAVELER) {
      return NextResponse.json(
        {
          fieldErrors: {
            traveler_id_card: [`Upload at most ${MAX_FILES_PER_TRAVELER} files per traveler`],
          },
        },
        { status: 400 }
      );
    }
    for (const file of files) {
      if (!(file instanceof File) || file.size === 0) {
        return NextResponse.json(
          { fieldErrors: { traveler_id_card: ["Upload a photo or PDF of each traveler's ID"] } },
          { status: 400 }
        );
      }
      if (file.size > MAX_FILE_BYTES) {
        return NextResponse.json(
          {
            fieldErrors: {
              traveler_id_card: ["A file is too large — please use a smaller image or PDF"],
            },
          },
          { status: 400 }
        );
      }
      if (!isAllowedIdCardType(file.type)) {
        return NextResponse.json(
          { fieldErrors: { traveler_id_card: ["Upload image or PDF files only"] } },
          { status: 400 }
        );
      }
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
  const idCardPathsByTraveler: string[][] = [];
  for (const [travelerIndex, files] of idCardsByTraveler.entries()) {
    const paths: string[] = [];
    for (const file of files as File[]) {
      const extension = file.name.includes(".") ? file.name.split(".").pop() : "jpg";
      const objectPath = `${crypto.randomUUID()}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from("id-cards")
        .upload(objectPath, file, { contentType: file.type });

      if (uploadError) {
        console.error("[self-checkin] storage upload failed", {
          travelerIndex,
          fileName: file.name,
          uploadError,
        });
        if (uploadedPaths.length > 0) await supabase.storage.from("id-cards").remove(uploadedPaths);
        return NextResponse.json({ error: "Could not upload an ID card. Try again." }, { status: 500 });
      }
      uploadedPaths.push(objectPath);
      paths.push(objectPath);
    }
    idCardPathsByTraveler.push(paths);
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
