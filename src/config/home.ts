// Content for the redesigned homepage sections. Copy is based on facts already
// in property.ts / site.ts — edit freely, and swap images when real photos arrive.

export interface WhyCard {
  title: string;
  caption: string;
  image: string;
}

export const whyUsTabs: { id: string; label: string; cards: WhyCard[] }[] = [
  {
    id: "solo",
    label: "Solo travellers",
    cards: [
      { title: "Meet people, keep your space", caption: "Shared dorms with a privacy curtain on every bed.", image: "/gallery/room-3a.webp" },
      { title: "Your own locker", caption: "A personal locker for every bed, so your things stay put.", image: "/gallery/room-1a.webp" },
      { title: "24h security", caption: "Someone is always around, day or night.", image: "/gallery/room-2a.webp" },
    ],
  },
  {
    id: "students",
    label: "Students & interns",
    cards: [
      { title: "Near ISRO SAC", caption: "In Satellite, close to ISRO SAC and Star Bazaar.", image: "/gallery/room-2a.webp" },
      { title: "Fast Wi-Fi", caption: "Study, apply and stream without the buffering.", image: "/gallery/room-3a.webp" },
      { title: "Monthly rate", caption: "Stay 27+ nights and the nightly price drops the most.", image: "/gallery/room-1a.webp" },
    ],
  },
  {
    id: "nomads",
    label: "Digital nomads",
    cards: [
      { title: "Workation plan", caption: "7+ nights? Use the WORKATION coupon for an extra 15% off.", image: "/gallery/room-1a.webp" },
      { title: "AC + reading light", caption: "Cool rooms and a light at every bed for late sessions.", image: "/gallery/room-3a.webp" },
      { title: "Shared kitchen", caption: "Make your own chai or meals between calls.", image: "/gallery/room-2a.webp" },
    ],
  },
  {
    id: "groups",
    label: "Friends & groups",
    cards: [
      { title: "Book the whole room", caption: "Fill all 4 or 6 beds and the room is yours alone.", image: "/gallery/room-3a.webp" },
      { title: "Common area", caption: "Hang out together without leaving the stay.", image: "/gallery/room-2a.webp" },
      { title: "Direct pricing", caption: "No OTA markup — message us on WhatsApp for group rates.", image: "/gallery/room-1a.webp" },
    ],
  },
];

export const galleryTiles = [
  { label: "Clean, cosy rooms", image: "/gallery/room-2a.webp" },
  { label: "Privacy curtains", image: "/gallery/room-1a.webp" },
  { label: "Social dorm", image: "/gallery/room-3a.webp" },
];
