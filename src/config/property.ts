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
}

export interface PropertyConfig {
  id: string;
  slug: string;
  name: string;
  city: string;
  address?: string;
  description: string;
  heroMedia: string;
  lat: number;
  lng: number;
}

export const property: PropertyConfig = {
  id: "prop-01",
  slug: "project-odyssey-ahmedabad",
  name: "Project Odyssey",
  city: "Ahmedabad",
  address: "Aishwarya Apartments, Jodhpur Village, Ahmedabad, Gujarat 380015",
  description:
    "A 3-room backpacker hostel in the heart of Ahmedabad. Bunk beds, privacy curtains, fast Wi-Fi, and a community of fellow travelers — all without the OTA markup.",
  heroMedia: "/brand/mascot-rear.png",
  lat: 23.0292,
  lng: 72.5313,
};

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
      "Sister room to The Navigator — same 4-bed bunk setup with curtains and personal lighting. The window-side beds get Ahmedabad morning light.",
    sqft: 160,
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
    name: "SG Highway",
    distance: "5 min drive",
    type: "transport",
    description: "Ahmedabad's main commercial spine — malls, food, everything.",
  },
  {
    name: "Jodhpur Cross Roads",
    distance: "2 min walk",
    type: "neighbourhood",
    description: "Local cafes, chai stalls, and everyday essentials.",
  },
  {
    name: "ISKCON Temple",
    distance: "10 min drive",
    type: "attraction",
    description: "One of the largest ISKCON temples in India.",
  },
  {
    name: "Alpha One Mall",
    distance: "12 min drive",
    type: "food",
    description: "Food court, cinema, and shopping under one roof.",
  },
  {
    name: "Sabarmati Riverfront",
    distance: "20 min drive",
    type: "attraction",
    description: "Evening walks, street food, and city sunsets.",
  },
  {
    name: "Ahmedabad Railway Station",
    distance: "15 min drive",
    type: "transport",
    description: "Direct trains to Mumbai, Delhi, Jaipur.",
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
    a: "Yes! Book for 7+ nights and get 15% off. Stay for a month and get 60% off — that brings the per-bed rate down to ₹280/night. Discounts are applied automatically when you book.",
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
