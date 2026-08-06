import { z } from "zod";

export const guestSchema = z.object({
  name: z.string().trim().min(1, "Guest name is required"),
  phone: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v ? v : undefined)),
  email: z
    .string()
    .trim()
    .email("Enter a valid email")
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? v : undefined)),
});

export type GuestInput = z.infer<typeof guestSchema>;
