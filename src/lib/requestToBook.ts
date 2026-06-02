import { siteConfig } from "@/config/site";

export interface BookingRequest {
  room?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  guestName?: string;
}

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return d;
  }
}

export function buildWhatsAppLink(req: BookingRequest): string {
  const lines: string[] = ["Hi! I'd like to book a stay at Project Odyssey."];
  if (req.room) lines.push(`Room: ${req.room}`);
  if (req.checkIn) lines.push(`Check-in: ${formatDate(req.checkIn)}`);
  if (req.checkOut) lines.push(`Check-out: ${formatDate(req.checkOut)}`);
  if (req.guests) lines.push(`Guests: ${req.guests}`);
  if (req.guestName) lines.push(`Name: ${req.guestName}`);
  lines.push("Please confirm availability. Thank you!");

  const text = encodeURIComponent(lines.join("\n"));
  const number = siteConfig.whatsapp.replace(/[^0-9]/g, "");
  return `https://wa.me/${number}?text=${text}`;
}

export function buildMailtoLink(req: BookingRequest): string {
  const subject = encodeURIComponent("Booking Request — Project Odyssey");
  const body = encodeURIComponent(
    [
      `Hi,`,
      ``,
      `I'd like to book a stay at Project Odyssey.`,
      req.room ? `Room: ${req.room}` : "",
      req.checkIn ? `Check-in: ${formatDate(req.checkIn)}` : "",
      req.checkOut ? `Check-out: ${formatDate(req.checkOut)}` : "",
      req.guests ? `Guests: ${req.guests}` : "",
      req.guestName ? `Name: ${req.guestName}` : "",
      ``,
      `Please confirm availability and next steps.`,
      ``,
      `Thank you!`,
    ]
      .filter(Boolean)
      .join("\n")
  );
  return `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
}
