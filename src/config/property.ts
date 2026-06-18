export type RoomType = "mixed_dorm" | "dorm" | "whole_flat";

export interface Room {
  id: string;
  slug: string;
  name: string;
  type: RoomType;
  beds: number;
  bedType: string;
  capacity: number;
  basePricePerBedPerNight: number;
  wholeRoomPerNight: number;
  images: string[];
  amenities: string[];
  description: string;
  badge?: string;
  sqft?: number;
  bedsAvailable: number; // 0 = SOLD OUT
}

export interface PropertyConfig {
  id: string;
  slug: string;
  name: string;
  city: string;
  address?: string;
  description: string;
  heroMedia: string;
  images?: string[];
  lat: number;
  lng: number;
  /** Direct Google Maps link to the exact place (opens the named pin). */
  mapsUrl?: string;
  comingSoon?: boolean;
  tag?: string;
}

// ── Active property ────────────────────────────────────────────────────────────
export const property: PropertyConfig = {
  id: "prop-01",
  slug: "project-odyssey-ahmedabad",
  name: "Project Odyssey",
  city: "Ahmedabad",
  address: "Aishwarya Apartments, Jodhpur Village, Ahmedabad, Gujarat 380015",
  description:
    "A 3-room backpacker hostel in the heart of Ahmedabad. Bunk beds, privacy curtains, fast Wi-Fi, and a community of fellow travelers — all without the OTA markup.",
  heroMedia: "/brand/mascot-rear.png",
  images: ["/gallery/room-1a.webp", "/gallery/room-2a.webp", "/gallery/room-3a.webp"],
  lat: 23.0246061,
  lng: 72.5233259,
  mapsUrl: "https://maps.app.goo.gl/LbiucnPctPXGrzLH9",
};

// ── All properties (active + coming soon) ────────────────────────────────────
export const properties: PropertyConfig[] = [
  property,
  {
    id: "prop-02",
    slug: "project-odyssey-mumbai",
    name: "Project Odyssey",
    city: "Mumbai",
    address: "Bandra West, Mumbai, Maharashtra",
    description: "A sea-facing bunk hostel in Bandra. Catch sunsets, meet artists, hop on the local.",
    heroMedia: "/brand/mascot-rear.png",
    lat: 19.0596,
    lng: 72.8295,
    comingSoon: true,
    tag: "Opening Q3 2026",
  },
  {
    id: "prop-03",
    slug: "project-odyssey-goa",
    name: "Project Odyssey",
    city: "Goa",
    address: "Anjuna, North Goa",
    description: "Steps from the beach. Sun, sand, and a community of wanderers — your base for the coast.",
    heroMedia: "/brand/mascot-rear.png",
    lat: 15.5736,
    lng: 73.7443,
    comingSoon: true,
    tag: "Opening Q4 2026",
  },
];

// ── Rooms (for the active Ahmedabad property) ─────────────────────────────────
export const rooms: Room[] = [
  {
    id: "room-01",
    slug: "the-explorer-dorm",
    name: "The Explorer",
    type: "mixed_dorm",
    beds: 4,
    bedType: "Bunk Beds",
    capacity: 4,
    basePricePerBedPerNight: 700,
    wholeRoomPerNight: 3000,
    images: ["/gallery/room-2a.webp"],
    amenities: ["Wi-Fi", "AC", "Privacy Curtain", "Reading Light", "Locker", "Hot Water"],
    description:
      "A cozy 4-bed bunk dorm with privacy curtains, personal reading lights, under-bed lockers, and AC. Perfect for solo travelers and small groups.",
    badge: "Most Popular",
    sqft: 160,
    bedsAvailable: 3,
  },
  {
    id: "room-02",
    slug: "the-navigator-dorm",
    name: "The Navigator",
    type: "mixed_dorm",
    beds: 4,
    bedType: "Bunk Beds",
    capacity: 4,
    basePricePerBedPerNight: 700,
    wholeRoomPerNight: 3000,
    images: ["/gallery/room-1a.webp"],
    amenities: ["Wi-Fi", "AC", "Privacy Curtain", "Reading Light", "Locker", "Hot Water"],
    description:
      "Sister room to The Explorer — same 4-bed bunk setup with curtains and personal lighting. The window-side beds get Ahmedabad morning light.",
    sqft: 160,
    bedsAvailable: 4,
  },
  {
    id: "room-03",
    slug: "the-voyager-dorm",
    name: "The Voyager",
    type: "dorm",
    beds: 6,
    bedType: "Bunk Beds",
    capacity: 6,
    basePricePerBedPerNight: 700,
    wholeRoomPerNight: 5000,
    images: ["/gallery/room-3a.webp"],
    amenities: ["Wi-Fi", "AC", "Privacy Curtain", "Reading Light", "Locker", "Hot Water"],
    description:
      "Our 6-bed dormitory — the social heart of Project Odyssey. Three bunk pairs, privacy curtains on every bed, shared locker row. Best value, best stories.",
    badge: "Best Value",
    sqft: 220,
    bedsAvailable: 5,
  },
];

export const amenities = [
  { icon: "Wifi", label: "High-Speed Wi-Fi" },
  { icon: "Wind", label: "AC in All Rooms" },
  { icon: "Droplets", label: "Hot Water" },
  { icon: "Lock", label: "Personal Lockers" },
  { icon: "Lamp", label: "Reading Lights" },
  { icon: "Coffee", label: "Common Area" },
  { icon: "UtensilsCrossed", label: "Shared Kitchen" },
  { icon: "ShieldCheck", label: "24h Security" },
  { icon: "WashingMachine", label: "Laundry Access" },
  { icon: "MapPin", label: "Central Location" },
];

export const neighborhoodHighlights = [
  {
    name: "Narendra Modi Stadium",
    distance: "15 min drive",
    type: "attraction",
    description: "World's largest cricket stadium — catch a match or take a stadium tour.",
  },
  {
    name: "Metro Station",
    distance: "10 min walk",
    type: "transport",
    description: "Direct metro access to the rest of Ahmedabad — no auto required.",
  },
  {
    name: "SG Highway",
    distance: "5 min drive",
    type: "neighbourhood",
    description: "Ahmedabad's main commercial spine — malls, food, everything.",
  },
  {
    name: "Jodhpur Cross Roads",
    distance: "2 min walk",
    type: "food",
    description: "Local cafes, chai stalls, and everyday essentials right outside.",
  },
  {
    name: "ISKCON Temple",
    distance: "10 min drive",
    type: "attraction",
    description: "One of the largest ISKCON temples in India.",
  },
  {
    name: "Sabarmati Riverfront",
    distance: "20 min drive",
    type: "attraction",
    description: "Evening walks, street food, and city sunsets.",
  },
];

export const reviews = [
  {
    id: "r1",
    name: "Priya M.",
    location: "Mumbai",
    rating: 5,
    text: "Genuinely the best hostel stay I've had in India. The place is clean, the vibe is great, and the host is an incredible human. Will absolutely be back.",
    date: "2024-11",
  },
  {
    id: "r2",
    name: "Arjun S.",
    location: "Bangalore",
    rating: 5,
    text: "Booked a bed in The Explorer for a week — could not have asked for more. Privacy curtains are a game-changer, Wi-Fi is fast, and the common area is great.",
    date: "2024-12",
  },
  {
    id: "r3",
    name: "Lena K.",
    location: "Germany",
    rating: 5,
    text: "Found this gem while exploring Ahmedabad. The bunk rooms are clean and thoughtfully designed. The mascot on the wall made me smile every morning!",
    date: "2025-01",
  },
  {
    id: "r4",
    name: "Rohan V.",
    location: "Pune",
    rating: 5,
    text: "Stayed in the 6-bed dorm and met some amazing people. The beds are comfortable, AC works great, and the lockers give you real peace of mind.",
    date: "2025-02",
  },
];

export const faqs = [
  {
    q: "What are the check-in and check-out times?",
    a: "Check-in is from 11:00 AM. Check-out is by 10:00 AM. Early check-in or late check-out may be possible — just message us on WhatsApp before arrival.",
  },
  {
    q: "How does a bunk bed dorm work?",
    a: "Each bunk has a mattress, pillow, blanket, reading light, power socket, and a privacy curtain. Your personal locker is right below the bed. Bathrooms are shared between the 3 rooms.",
  },
  {
    q: "Can I book a whole room for just my group?",
    a: "Yes — if your group fills all beds in a room (4 or 6), you effectively have the room to yourselves. Message us on WhatsApp and we'll confirm availability.",
  },
  {
    q: "How does booking work?",
    a: "Send a booking request via WhatsApp with your dates and number of beds. We confirm within a few hours and collect payment. Simple and direct.",
  },
  {
    q: "Are there discounts for longer stays?",
    a: "Yes! The per-night rate drops automatically for every extra night — from ₹700 for 1 night down to ₹497 for 7 nights and ₹357 for monthly stays (27+ nights). Discounts are applied automatically.",
  },
  {
    q: "What is the WORKATION plan?",
    a: "Staying 7+ nights and working remotely? Apply the WORKATION coupon at checkout for an extra flat 15% off on top of your long-stay discount. Perfect for digital nomads.",
  },
  {
    q: "Can I book the whole room privately?",
    a: "Yes. Book all 4 beds in The Explorer or The Navigator for ₹3,000/night, or all 6 beds in The Voyager for ₹5,000/night. Weekly and monthly discounts apply to whole-room bookings too.",
  },
  {
    q: "Are meals included?",
    a: "No — but you have access to a shared kitchen, and some of the best street food and chai in Ahmedabad is within a 5-minute walk.",
  },
  {
    q: "What is the cancellation policy?",
    a: "Free cancellation up to 72 hours before check-in. After that, the first night per bed is non-refundable. Reach us on WhatsApp for any special situations.",
  },
  {
    q: "Is it safe for solo travelers?",
    a: "Absolutely. We have 24h security, personal lockers for every bed, and a host who's available. Many of our guests are solo travelers — it's the best way to meet people.",
  },
];
