// All copy/data for the redesigned homepage lives here. Everything is written to be
// true for Project Odyssey (Satellite, Ahmedabad). Photos come from ./photos.ts —
// each card uses the photo that actually shows what its text is about.

import { photo as P } from "./photos";

// ── Two properties shown on the home page ───────────────────────────────────
export interface HomeProperty {
  id: string;
  name: string;
  place: string;
  image: string;
  href: string;
  /** Shown as the "From ₹…" pill. Omit for coming-soon properties. */
  priceFrom?: number;
  badge?: string;
  comingSoon?: boolean;
}

export const homeProperties: HomeProperty[] = [
  {
    id: "odyssey",
    name: "Project Odyssey",
    place: "Satellite, Ahmedabad",
    image: P.livingSofa,
    href: "/property/project-odyssey-ahmedabad/",
    priceFrom: 700,
    badge: "Open now",
  },
  {
    id: "odyssey-2",
    name: "Project Odyssey 2.0",
    place: "Location announced soon",
    image: P.wallArt,
    href: "/properties/",
    badge: "Coming soon",
    comingSoon: true,
  },
];

export const featureBanner = {
  eyebrow: "Coming soon",
  title: "Project Odyssey 2.0",
  text: "A second stay built on everything guests love about the first — privacy curtains, personal lockers and a real community. Full details are on the way.",
  cta: "See all stays",
  href: "/properties/",
  image: P.wallArtLamp,
};

// ── "Why Project Odyssey" persona tabs ──────────────────────────────────────
export interface WhyCard {
  title: string;
  text: string;
  image: string;
}
export interface Persona {
  id: string;
  label: string;
  icon: "User" | "UserRound" | "Users" | "Heart" | "Baby" | "Laptop";
  cards: WhyCard[];
}

export const personas: Persona[] = [
  {
    id: "solo-female",
    label: "Solo Female",
    icon: "UserRound",
    cards: [
      { title: "Safety you can feel", text: "24-hour security, a personal locker at every bed, and a host who is always around.", image: P.smartLock },
      { title: "Privacy on your terms", text: "A curtain on every bunk, plus a reading light and power socket within reach.", image: P.curtainAisle },
      { title: "Easy to get around", text: "Jodhpur Cross Roads is a 2-minute walk, and the metro is about 10 minutes away on foot.", image: P.balcony },
      { title: "Right by ISRO & Star Bazaar", text: "Stay in Satellite — a calm, well-connected part of Ahmedabad.", image: P.livingSofa },
    ],
  },
  {
    id: "solo-male",
    label: "Solo Male",
    icon: "User",
    cards: [
      { title: "A bed, not a budget hit", text: "Beds from ₹700 a night — and the nightly rate drops the longer you stay.", image: P.bunkLadder },
      { title: "Meet people easily", text: "A shared common area and kitchen make it simple to start a conversation.", image: P.livingBeanbags },
      { title: "Everything within reach", text: "SG Highway is a 5-minute drive; the metro is a short walk.", image: P.balcony },
      { title: "Your own space", text: "Locker, light and socket at every bed so you can keep your things sorted.", image: P.entryLockers },
    ],
  },
  {
    id: "group",
    label: "Group",
    icon: "Users",
    cards: [
      { title: "Take the whole room", text: "Fill all 4 or 6 beds and the room is yours alone. Message us for group rates.", image: P.bunksWide },
      { title: "Hang out together", text: "A common area for games, chai and late-night plans.", image: P.movieNight },
      { title: "Book direct", text: "No OTA markup. Tell us your dates on WhatsApp and we confirm within hours.", image: P.livingSofa },
      { title: "Explore Ahmedabad", text: "ISKCON Temple, Sabarmati Riverfront and the Narendra Modi Stadium are all a short drive away.", image: P.balcony },
    ],
  },
  {
    id: "couple",
    label: "Couple",
    icon: "Heart",
    cards: [
      { title: "A room to yourselves", text: "Book every bed in a room for a private stay together.", image: P.bunksLit },
      { title: "Quiet corners", text: "Privacy curtains and soft reading lights for slow mornings and late nights.", image: P.livingEvening },
      { title: "Date-night Ahmedabad", text: "Riverfront walks, street food and city sunsets are a short ride away.", image: P.balcony },
      { title: "Cook something together", text: "Use the shared kitchen for chai and home-style meals.", image: P.dining },
    ],
  },
  {
    id: "family",
    label: "Family",
    icon: "Baby",
    cards: [
      { title: "Your own room", text: "Book the whole room so the family stays together under one roof.", image: P.bunksDeep },
      { title: "Comfort basics covered", text: "AC rooms, hot water and fast Wi-Fi in every room.", image: P.bathroom },
      { title: "Sights nearby", text: "ISKCON Temple (10 min) and the Sabarmati Riverfront (20 min) by car.", image: P.balcony },
      { title: "Easy meals", text: "A shared kitchen plus plenty of local food within a 5-minute walk.", image: P.fridge },
    ],
  },
  {
    id: "nomad",
    label: "Digital Nomad",
    icon: "Laptop",
    cards: [
      { title: "Workation plan", text: "Staying 7+ nights? Use the WORKATION coupon for an extra 15% off.", image: P.wallArtLamp },
      { title: "Fast Wi-Fi, cool rooms", text: "AC and a reading light at every bed for long working sessions.", image: P.bunkLadder },
      { title: "Monthly rates", text: "Stay 27+ nights and the nightly price drops the most.", image: P.livingSofa },
      { title: "Chai between calls", text: "A shared kitchen and a common area when you need a break.", image: P.dining },
    ],
  },
];

// ── Hover-expand rows ───────────────────────────────────────────────────────
export interface ExpandItem {
  label: string;
  image: string;
}

export const socialStays = {
  script: "Social Stays",
  title: "that fit your vibe",
  text: "Vibe your way. Whether you're rolling with your gang or flying solo, Project Odyssey is built so it's easy to connect — or easy to keep to yourself. Quirky common areas, a shared kitchen and a community of fellow travellers.",
  items: [
    { label: "Spacious common areas", image: P.livingBeanbags },
    { label: "Shared kitchen", image: P.dining },
    { label: "Meet fellow travellers", image: P.movieNight },
  ] as ExpandItem[],
};

export const travelStyle = {
  title: "Hostels for every travel style",
  text: "Made for backpackers, students, interns and remote workers. From solo trips to weekend getaways and group stays, there's a way to stay for every vibe — with the comforts that actually matter.",
  items: [
    { label: "Cleanliness = non-negotiable", image: P.bathroom },
    { label: "Well-designed dorms", image: P.bunksWide },
    { label: "Personal lockers", image: P.entryLockers },
  ] as ExpandItem[],
};

// ── Amenities (lucide icon keys are resolved in Amenities.tsx) ──────────────
// 3D illustrations in /public/amenities, same order/labels as the reference.
// NOTE(owner): confirm each of these is something Odyssey really offers (power backup,
// 24/7 front desk, co-working stations, 24/7 café, water dispenser) — delete any that aren't.
export const amenityGrid: readonly { label: string; image: string }[] = [
  { label: "High Speed WiFi", image: "/amenities/wifi.webp" },
  { label: "Power Backup", image: "/amenities/powerbackup.webp" },
  { label: "24/7 Front Desk", image: "/amenities/frontdesk.webp" },
  { label: "Lockers", image: "/amenities/bluetoothlocks.webp" },
  { label: "Privacy Curtains", image: "/amenities/curtains.webp" },
  { label: "Co-working Stations", image: "/amenities/coworking.webp" },
  { label: "Water Dispensers", image: "/amenities/dispenser.webp" },
  { label: "24/7 Café", image: "/amenities/cafe.webp" },
  { label: "Air conditioning", image: "/amenities/acs.webp" },
  { label: "Geysers", image: "/amenities/geyser.webp" },
  { label: "Spacious common areas", image: "/amenities/common.webp" },
  // Generated in-house in the same style (not from the reference site).
  { label: "Projector", image: "/amenities/projector.webp" },
  { label: "Laundry", image: "/amenities/laundry.webp" },
  { label: "Iron", image: "/amenities/iron.webp" },
];

// Real Odyssey extras without an illustration — shown as a text line under the grid.
export const amenityExtras = [
  "Reading lights",
  "Bedside power sockets",
  "Shared kitchen",
  "24h security",
  "Central location",
];

// ── Team offsites banner ────────────────────────────────────────────────────
export const offsite = {
  title: "Looking for Team Offsites & Group Stays That Actually Feel Fun?",
  cta: "View Offsite",
  image: P.movieNight,
};

// ── Host an Event / Partner with Us cards ───────────────────────────────────
export const hostPartnerCards = [
  {
    title: "Host an",
    accent: "Event",
    rest: "at Project Odyssey",
    text: "Workshops, meetups, open mics — our common area is open to community events.",
    cta: "Host with us",
    href: "/host-an-event/",
    icon: "PartyPopper",
  },
  {
    title: "Partner with",
    accent: "Us",
    rest: "",
    text: "Have a property in Gujarat? Let's talk about running it the Odyssey way.",
    cta: "Get in touch",
    href: "/partner-with-us/",
    icon: "Handshake",
  },
] as const;

// ── Kept for the (unused-on-home) Gallery section ───────────────────────────
export const galleryTiles = [
  { label: "Clean, cosy rooms", image: P.bunksLit },
  { label: "Privacy curtains", image: P.curtainAisle },
  { label: "Social dorm", image: P.livingSofa },
];
