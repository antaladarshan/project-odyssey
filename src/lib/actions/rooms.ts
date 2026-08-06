"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface RenameActionState {
  error?: string;
}

export async function updateRoomTypeNameAction(
  roomTypeId: string,
  name: string
): Promise<RenameActionState> {
  const trimmed = name.trim();
  if (!trimmed) return { error: "Name can't be empty" };

  const supabase = await createClient();
  const { error } = await supabase.from("room_types").update({ name: trimmed }).eq("id", roomTypeId);

  if (error) {
    if (error.code === "23505") return { error: "That name is already used" };
    return { error: "Could not save" };
  }

  revalidatePath("/calendar");
  return {};
}

export async function updateBedLabelAction(bedId: string, label: string): Promise<RenameActionState> {
  const trimmed = label.trim();
  if (!trimmed) return { error: "Label can't be empty" };

  const supabase = await createClient();
  const { error } = await supabase.from("rooms_beds").update({ label: trimmed }).eq("id", bedId);

  if (error) {
    if (error.code === "23505") return { error: "That label is already used in this room type" };
    return { error: "Could not save" };
  }

  revalidatePath("/calendar");
  return {};
}
