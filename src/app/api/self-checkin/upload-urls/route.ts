import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServiceClient } from "@/lib/supabase/service";
import {
  MAX_ID_FILE_BYTES,
  MAX_ID_FILES_PER_TRAVELER,
  isAllowedIdCardType,
} from "@/lib/validations/self-checkin";

const bodySchema = z.object({
  files: z
    .array(
      z.object({
        travelerIndex: z.number().int().min(0).max(49),
        name: z.string().max(255),
        type: z.string().max(100),
        size: z.number().int().positive(),
      })
    )
    .min(1)
    .max(50 * MAX_ID_FILES_PER_TRAVELER),
});

function fail(message: string, status = 400) {
  return NextResponse.json({ fieldErrors: { traveler_id_card: [message] } }, { status });
}

// Step 1 of a check-in: validate file metadata and hand back one signed
// upload URL per file so the browser can upload straight to Storage.
export async function POST(request: NextRequest) {
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return fail("Invalid upload request");

  const perTraveler = new Map<number, number>();
  for (const file of parsed.data.files) {
    const count = (perTraveler.get(file.travelerIndex) ?? 0) + 1;
    perTraveler.set(file.travelerIndex, count);
    if (count > MAX_ID_FILES_PER_TRAVELER) {
      return fail(`Upload at most ${MAX_ID_FILES_PER_TRAVELER} files per traveler`);
    }
    if (file.size > MAX_ID_FILE_BYTES) {
      return fail("A file is too large — please use a file under 8 MB");
    }
    if (!isAllowedIdCardType(file.type)) {
      return fail("Upload image or PDF files only");
    }
  }

  const supabase = createServiceClient();

  const uploads = await Promise.all(
    parsed.data.files.map(async (file) => {
      const rawExt = file.name.includes(".") ? file.name.split(".").pop()!.toLowerCase() : "";
      const extension = /^[a-z0-9]{1,5}$/.test(rawExt)
        ? rawExt
        : file.type === "application/pdf"
          ? "pdf"
          : "jpg";
      const path = `${crypto.randomUUID()}.${extension}`;
      const { data, error } = await supabase.storage.from("id-cards").createSignedUploadUrl(path);
      if (error || !data) {
        console.error("[self-checkin] createSignedUploadUrl failed", error);
        return null;
      }
      return { travelerIndex: file.travelerIndex, path, token: data.token };
    })
  );

  if (uploads.some((u) => u === null)) {
    return NextResponse.json({ error: "Could not prepare the upload. Try again." }, { status: 500 });
  }

  return NextResponse.json({ uploads });
}
