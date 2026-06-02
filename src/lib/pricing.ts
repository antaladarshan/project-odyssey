export const PRICING = {
  perBedPerNight: 700,
  wholeRoom4Bed: 3000,
  wholeRoom6Bed: 5000,
  discounts: [
    { minNights: 30, pct: 60, label: "Monthly Stay", badge: "60% off" },
    { minNights: 7, pct: 15, label: "Weekly Stay", badge: "15% off" },
  ],
} as const;

export function getDiscount(nights: number): { pct: number; label: string; badge: string } | null {
  for (const d of PRICING.discounts) {
    if (nights >= d.minNights) return d;
  }
  return null;
}

export function calcBedTotal(nights: number, beds = 1): {
  base: number;
  discount: number;
  total: number;
  perNight: number;
  discountInfo: ReturnType<typeof getDiscount>;
} {
  const base = PRICING.perBedPerNight * nights * beds;
  const discountInfo = getDiscount(nights);
  const discount = discountInfo ? Math.round(base * (discountInfo.pct / 100)) : 0;
  const total = base - discount;
  return { base, discount, total, perNight: Math.round(total / nights / beds), discountInfo };
}

export function calcRoomTotal(nights: number, roomType: "4bed" | "6bed"): {
  base: number;
  discount: number;
  total: number;
  perNight: number;
  discountInfo: ReturnType<typeof getDiscount>;
} {
  const nightly = roomType === "6bed" ? PRICING.wholeRoom6Bed : PRICING.wholeRoom4Bed;
  const base = nightly * nights;
  const discountInfo = getDiscount(nights);
  const discount = discountInfo ? Math.round(base * (discountInfo.pct / 100)) : 0;
  const total = base - discount;
  return { base, discount, total, perNight: Math.round(total / nights), discountInfo };
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  return Math.max(0, Math.round(diff / 86400000));
}
