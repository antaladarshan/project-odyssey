// All copy/data for the redesigned homepage lives here. Everything is written to be
// true for Project Odyssey (Satellite, Ahmedabad). Swap `image` paths for real photos
// (drop files in /public/home/ and point at them) — nothing else needs to change.

const PHOTOS = {
  a: "/gallery/room-2a.webp",
  b: "/gallery/room-1a.webp",
  c: "/gallery/room-3a.webp",
};

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
    image: PHOTOS.a,
    href: "/property/project-odyssey-ahmedabad/",
    priceFrom: 700,
    badge: "Open now",
  },
  {
    id: "odyssey-2",
    name: "Project Odyssey 2.0",
    place: "Location announced soon",
    image: PHOTOS.c,
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
  image: PHOTOS.b,
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
      { title: "Safety you can feel", text: "24-hour security, a personal locker at every bed, and a host who is always around.", image: PHOTOS.a },
      { title: "Privacy on your terms", text: "A curtain on every bunk, plus a reading light and power socket within reach.", image: PHOTOS.b },
      { title: "Easy to get around", text: "Jodhpur Cross Roads is a 2-minute walk, and the metro is about 10 minutes away on foot.", image: PHOTOS.c },
      { title: "Right by ISRO & Star Bazaar", text: "Stay in Satellite — a calm, well-connected part of Ahmedabad.", image: PHOTOS.a },
    ],
  },
  {
    id: "solo-male",
    label: "Solo Male",
    icon: "User",
    cards: [
      { title: "A bed, not a budget hit", text: "Beds from ₹700 a night — and the nightly rate drops the longer you stay.", image: PHOTOS.b },
      { title: "Meet people easily", text: "A shared common area and kitchen make it simple to start a conversation.", image: PHOTOS.c },
      { title: "Everything within reach", text: "SG Highway is a 5-minute drive; the metro is a short walk.", image: PHOTOS.a },
      { title: "Your own space", text: "Locker, light and socket at every bed so you can keep your things sorted.", image: PHOTOS.b },
    ],
  },
  {
    id: "group",
    label: "Group",
    icon: "Users",
    cards: [
      { title: "Take the whole room", text: "Fill all 4 or 6 beds and the room is yours alone. Message us for group rates.", image: PHOTOS.c },
      { title: "Hang out together", text: "A common area for games, chai and late-night plans.", image: PHOTOS.a },
      { title: "Book direct", text: "No OTA markup. Tell us your dates on WhatsApp and we confirm within hours.", image: PHOTOS.b },
      { title: "Explore Ahmedabad", text: "ISKCON Temple, Sabarmati Riverfront and the Narendra Modi Stadium are all a short drive away.", image: PHOTOS.c },
    ],
  },
  {
    id: "couple",
    label: "Couple",
    icon: "Heart",
    cards: [
      { title: "A room to yourselves", text: "Book every bed in a room for a private stay together.", image: PHOTOS.b },
      { title: "Quiet corners", text: "Privacy curtains and soft reading lights for slow mornings and late nights.", image: PHOTOS.a },
      { title: "Date-night Ahmedabad", text: "Riverfront walks, street food and city sunsets are a short ride away.", image: PHOTOS.c },
      { title: "Cook something together", text: "Use the shared kitchen for chai and home-style meals.", image: PHOTOS.b },
    ],
  },
  {
    id: "family",
    label: "Family",
    icon: "Baby",
    cards: [
      { title: "Your own room", text: "Book the whole room so the family stays together under one roof.", image: PHOTOS.a },
      { title: "Comfort basics covered", text: "AC rooms, hot water and fast Wi-Fi in every room.", image: PHOTOS.c },
      { title: "Sights nearby", text: "ISKCON Temple (10 min) and the Sabarmati Riverfront (20 min) by car.", image: PHOTOS.b },
      { title: "Easy meals", text: "A shared kitchen plus plenty of local food within a 5-minute walk.", image: PHOTOS.a },
    ],
  },
  {
    id: "nomad",
    label: "Digital Nomad",
    icon: "Laptop",
    cards: [
      { title: "Workation plan", text: "Staying 7+ nights? Use the WORKATION coupon for an extra 15% off.", image: PHOTOS.c },
      { title: "Fast Wi-Fi, cool rooms", text: "AC and a reading light at every bed for long working sessions.", image: PHOTOS.b },
      { title: "Monthly rates", text: "Stay 27+ nights and the nightly price drops the most.", image: PHOTOS.a },
      { title: "Chai between calls", text: "A shared kitchen and a common area when you need a break.", image: PHOTOS.c },
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
    { label: "Spacious common areas", image: PHOTOS.a },
    { label: "Shared kitchen", image: PHOTOS.b },
    { label: "Meet fellow travellers", image: PHOTOS.c },
  ] as ExpandItem[],
};

export const travelStyle = {
  title: "Hostels for every travel style",
  text: "Made for backpackers, students, interns and remote workers. From solo trips to weekend getaways and group stays, there's a way to stay for every vibe — with the comforts that actually matter.",
  items: [
    { label: "Cleanliness = non-negotiable", image: PHOTOS.b },
    { label: "Well-designed dorms", image: PHOTOS.a },
    { label: "Personal lockers", image: PHOTOS.c },
  ] as ExpandItem[],
};

// ── Amenities (lucide icon keys are resolved in Amenities.tsx) ──────────────
// `image` = 3D illustration in /public/amenities; others fall back to a lucide icon.
export const amenityGrid: readonly { icon: string; label: string; image?: string }[] = [
  { icon: "Wifi", label: "High-Speed Wi-Fi", image: "/amenities/wifi.webp" },
  { icon: "Wind", label: "Air Conditioning", image: "/amenities/acs.webp" },
  { icon: "Droplets", label: "Hot Water (Geysers)", image: "/amenities/geyser.webp" },
  { icon: "Blinds", label: "Privacy Curtains", image: "/amenities/curtains.webp" },
  { icon: "Sofa", label: "Spacious Common Areas", image: "/amenities/common.webp" },
  { icon: "Lock", label: "Personal Lockers" },
  { icon: "Lamp", label: "Reading Lights" },
  { icon: "Plug", label: "Bedside Power Sockets" },
  { icon: "UtensilsCrossed", label: "Shared Kitchen" },
  { icon: "ShieldCheck", label: "24h Security" },
  { icon: "WashingMachine", label: "Laundry Access" },
  { icon: "MapPin", label: "Central Location" },
];

// ── Team offsites banner ────────────────────────────────────────────────────
export const offsite = {
  title: "Looking for Team Offsites & Group Stays That Actually Feel Fun?",
  cta: "View Offsite",
  image: PHOTOS.c,
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
  { label: "Clean, cosy rooms", image: PHOTOS.a },
  { label: "Privacy curtains", image: PHOTOS.b },
  { label: "Social dorm", image: PHOTOS.c },
];
