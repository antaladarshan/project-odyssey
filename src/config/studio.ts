// Studio (photoshoot / podcast / content) rental: prices, copy and image slots.
// Single source of truth: the page, the calculator and the WhatsApp message all read from here.

export interface StudioTier {
  hours: number;
  /** Regular hourly rate in ₹ for this package. */
  rate: number;
  label: string;
}

export const studioTiers: StudioTier[] = [
  { hours: 1, rate: 1800, label: "1 Hour" },
  { hours: 4, rate: 1200, label: "4 Hours" },
  { hours: 8, rate: 1000, label: "8 Hours" },
];

/** Launch offer: 50% off the 8-hour package. Set `active: false` to switch it off. */
export const launchOffer = { active: true, hours: 8, price: 4000, label: "50% OFF" };

export const studioRules = {
  minHours: 1,
  maxHours: 12,
  advancePct: 50,
  /** Rate for each hour beyond the 8-hour package. */
  extraHourRate: 1000,
};

export const shootTypes = ["Photoshoot", "Podcast", "Reel / Video", "Brand shoot", "Other"] as const;
export type ShootType = (typeof shootTypes)[number];

/** Start times offered in the slot picker (24h → label). */
export const studioSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
];

export const studioMarquee = [
  "Natural light",
  "Wall-art backdrops",
  "Cosy sofa sets",
  "Projector & screen",
  "Power backup",
  "Wi-Fi & AC",
  "Balcony shots",
  "Ahmedabad, Satellite",
];

// TODO(owner): confirm these numbers before launch.
export const studioStats = [
  { value: "3+", label: "Set-up corners" },
  { value: "Natural", label: "Daylight windows" },
  { value: "AC", label: "Comfortable all day" },
  { value: "24/7", label: "Power backup" },
];

export const studioTerms = [
  "Minimum booking: 1 hour.",
  "4-hour and 8-hour packages offer discounted hourly rates.",
  "Special 50% discount applies to the 8-hour package.",
  "Advance booking and 50% payment required for confirmation.",
  "Additional hours charged as per the applicable rate.",
  "Subject to availability and prior approval.",
];

export const studioFaqs = [
  {
    q: "How far in advance should I book?",
    a: "As early as you can. Pick a date and slot above and we'll confirm on WhatsApp. Same-week bookings are possible, subject to availability.",
  },
  {
    q: "How does payment work?",
    a: "We need 50% in advance to confirm your slot. The rest is paid on the day.",
  },
  {
    q: "What if I need more than 8 hours?",
    a: "Additional hours are charged at the applicable rate. Message us with your plan and we'll quote it.",
  },
  {
    q: "What's included in the rental?",
    a: "The space itself, natural light, backdrops and furniture as set up, Wi-Fi, AC and power backup. Bring your own camera, lights and props. Ask us if you need something specific.",
  },
  {
    q: "Can I shoot a podcast here?",
    a: "Yes. The space works well for podcasts and interviews. Tell us how many people and what set-up you have in mind.",
  },
  {
    q: "Can I reschedule or cancel?",
    a: "Message us as early as possible. Rescheduling is subject to availability and prior approval.",
  },
  {
    q: "Can we bring food and drinks?",
    a: "Light snacks and water are fine. Please keep the space tidy and ask us before bringing anything messy.",
  },
];

/**
 * Studio photos (files in public/studio/). Set a slot to `null` to show a "photo coming soon" placeholder.
 */
export const studioPhotos = {
  shoot: "/studio/room-sofa-wide.webp" as string | null,
  podcast: "/studio/husky-speaker.webp" as string | null,
  about: "/studio/wall-art-corner.webp" as string | null,
  galleryLarge: "/studio/sofa-table.webp" as string | null,
  galleryA: "/studio/movie-night.webp" as string | null,
  galleryB: "/studio/hangout.webp" as string | null,
  galleryC: "/photos/balcony.webp" as string | null,
  galleryD: "/photos/living-wall-art.webp" as string | null,
};
