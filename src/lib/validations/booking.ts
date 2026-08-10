import { z } from "zod";

const optionalMoney = z
  .string()
  .trim()
  .optional()
  .transform((v) => (v ? Number(v) : undefined))
  .refine((v) => v === undefined || (!Number.isNaN(v) && v >= 0), {
    message: "Must be 0 or more",
  });

export const quickAddBookingSchema = z
  .object({
    room_bed_id: z.string().uuid("Pick a room/bed"),
    channel_id: z.string().uuid("Pick a channel"),
    checkin_date: z.string().min(1, "Check-in date is required"),
    checkout_date: z.string().min(1, "Check-out date is required"),
    guest_id: z
      .string()
      .trim()
      .optional()
      .transform((v) => (v ? v : undefined)),
    guest_name: z
      .string()
      .trim()
      .optional()
      .transform((v) => (v ? v : undefined)),
    guest_phone: z
      .string()
      .trim()
      .optional()
      .transform((v) => (v ? v : undefined)),
    guest_email: z
      .string()
      .trim()
      .optional()
      .transform((v) => (v ? v : undefined)),
    rate_total: optionalMoney,
    amount_paid: optionalMoney,
    note: z
      .string()
      .trim()
      .optional()
      .transform((v) => (v ? v : undefined)),
  })
  .refine((data) => data.checkout_date > data.checkin_date, {
    message: "Check-out must be after check-in",
    path: ["checkout_date"],
  })
  .refine((data) => Boolean(data.guest_id || data.guest_name), {
    message: "Pick an existing guest or enter a name",
    path: ["guest_name"],
  });

export type QuickAddBookingInput = z.infer<typeof quickAddBookingSchema>;
