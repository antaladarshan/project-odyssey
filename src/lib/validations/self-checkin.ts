import { z } from "zod";

// Fixed starter list for v1 — no admin UI for these yet, edit here if the
// property's actual add-ons change.
export const ADD_ON_OPTIONS = ["Breakfast", "Airport Pickup", "Late Checkout", "Extra Mattress"] as const;
export type AddOn = (typeof ADD_ON_OPTIONS)[number];

// One submission is a party: whoever fills the form, plus any travelers
// they add on behalf of the group. traveler_name is validated here;
// traveler_id_card is a parallel array of Files, validated separately in
// the route handler (Zod doesn't model File well across the FormData
// boundary) — the two arrays are matched up by index.
export const selfCheckinSchema = z
  .object({
    email: z.string().trim().email("Enter a valid email"),
    phone: z
      .string()
      .trim()
      .optional()
      .transform((v) => (v ? v : undefined)),
    checkin_date: z.string().min(1, "Check-in date is required"),
    checkout_date: z.string().min(1, "Check-out date is required"),
    add_ons: z.array(z.enum(ADD_ON_OPTIONS)).default([]),
    traveler_name: z
      .array(z.string().trim().min(1, "Every traveler needs a name"))
      .min(1, "Add at least one traveler"),
  })
  .refine((data) => data.checkout_date > data.checkin_date, {
    message: "Check-out must be after check-in",
    path: ["checkout_date"],
  });

export type SelfCheckinInput = z.infer<typeof selfCheckinSchema>;
