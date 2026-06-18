import { siteConfig } from "@/config/site";
import { nightsBetween, calcBedTotal, getDiscount } from "@/lib/pricing";

export interface BookingRequest {
  room?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  guestName?: string;
  extraNote?: string;
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
  const lines: string[] = ["Hi! I'd like to book a stay at Project Odyssey, Ahmedabad."];

  if (req.room) lines.push(`Room / Beds: ${req.room}`);
  if (req.checkIn) lines.push(`Check-in: ${formatDate(req.checkIn)}`);
  if (req.checkOut) lines.push(`Check-out: ${formatDate(req.checkOut)}`);
  if (req.guests) lines.push(`Beds needed: ${req.guests}`);
  if (req.guestName) lines.push(`Name: ${req.guestName}`);

  // Auto-calculate price and discount if dates + beds are known
  if (req.checkIn && req.checkOut && req.guests) {
    const nights = nightsBetween(req.checkIn, req.checkOut);
    if (nights > 0) {
      const { base, discount, total, discountInfo } = calcBedTotal(nights, req.guests);
      lines.push(`Nights: ${nights}`);
      lines.push(`Base total: ₹${base.toLocaleString("en-IN")}`);
      if (discountInfo) {
        lines.push(`Discount: ${discountInfo.badge} → −₹${discount.toLocaleString("en-IN")}`);
        lines.push(`Total after discount: ₹${total.toLocaleString("en-IN")}`);
      } else {
        lines.push(`Total: ₹${base.toLocaleString("en-IN")}`);
      }
    }
  }

  if (req.extraNote) lines.push(req.extraNote);
  lines.push("Please confirm availability. Thank you!");

  const text = encodeURIComponent(lines.join("\n"));
  const number = siteConfig.whatsapp.replace(/[^0-9]/g, "");
  return `https://wa.me/${number}?text=${text}`;
}

export function buildMailtoLink(req: BookingRequest): string {
  const subject = encodeURIComponent("Booking Request — Project Odyssey, Ahmedabad");
  const nights = req.checkIn && req.checkOut ? nightsBetween(req.checkIn, req.checkOut) : 0;
  const discount = nights > 0 && req.guests ? getDiscount(nights) : null;

  const body = encodeURIComponent(
    [
      `Hi,`,
      ``,
      `I'd like to book a stay at Project Odyssey, Ahmedabad.`,
      req.room ? `Room/Beds: ${req.room}` : "",
      req.checkIn ? `Check-in: ${formatDate(req.checkIn)}` : "",
      req.checkOut ? `Check-out: ${formatDate(req.checkOut)}` : "",
      req.guests ? `Beds: ${req.guests}` : "",
      nights > 0 ? `Nights: ${nights}` : "",
      discount ? `Discount applicable: ${discount.badge}` : "",
      req.guestName ? `Name: ${req.guestName}` : "",
      ``,
      `Please confirm availability and next steps.`,
      `Thank you!`,
    ]
      .filter(Boolean)
      .join("\n")
  );
  return `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
}
