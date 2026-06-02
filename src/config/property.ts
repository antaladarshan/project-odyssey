// Shape mirrors the future Supabase schema (spec §8) — swap data source, not UI
export type RoomType = "private" | "dorm" | "whole_flat";

export interface Room {
  id: string;
  slug: string;
  name: string;
  type: RoomType;
  capacity: number;
  basePricePerNight: number;
  images: string[];
  amenities: string[];
  description: string;
  badge?: string;
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
  slug: "project-odyssey-pune",
  name: "Project Odyssey",
  city: "Pune",
  description:
    "A 3-room flat turned into a warm, well-designed backpacker stay in Pune. Think private rooms with real beds, a shared kitchen, a chill common area, and a community of people going somewhere.",
  heroMedia: "/brand/mascot-rear.png",
  lat: 18.5204, // TODO: real coords
  lng: 73.8567,
};

export const rooms: Room[] = [
  {
    id: "room-01",
    slug: "the-explorer",
    name: "The Explorer",
    type: "private",
    capacity: 2,
    basePricePerNight: 1499, // TODO: real price in INR
    images: ["/brand/room-placeholder.jpg"],
    amenities: ["Wi-Fi", "AC", "Private Bathroom", "King Bed", "Work Desk"],
    description:
      "The boldest room in the fleet — made for those who travel light but sleep heavy. A proper king bed, clean en-suite, and a desk for the ones who work while they wander.",
    badge: "Most Popular",
  },
  {
    id: "room-02",
    slug: "the-navigator",
    name: "The Navigator",
    type: "private",
    capacity: 2,
    basePricePerNight: 1299, // TODO: real price in INR
    images: ["/brand/room-placeholder.jpg"],
    amenities: ["Wi-Fi", "AC", "Shared Bathroom", "Queen Bed", "Work Desk"],
    description:
      "Compact, clever, and comfortable. The Navigator packs everything you need into a well-thought-out space — perfect for the solo traveler or a traveling pair.",
  },
  {
    id: "room-03",
    slug: "the-voyager",
    name: "The Voyager",
    type: "private",
    capacity: 2,
    basePricePerNight: 1199, // TODO: real price in INR
    images: ["/brand/room-placeholder.jpg"],
    amenities: ["Wi-Fi", "Fan", "Shared Bathroom", "Double Bed"],
    description:
      "The budget-smart pick. A clean, comfortable double room with everything you need and nothing you don't. Great for travelers who'd rather spend on experiences.",
  },
  {
    id: "room-04",
    slug: "whole-flat",
    name: "The Whole Vessel",
    type: "whole_flat",
    capacity: 6,
    basePricePerNight: 3499, // TODO: real price in INR
    images: ["/brand/room-placeholder.jpg"],
    amenities: ["Wi-Fi", "AC", "Full Kitchen", "3 Rooms", "Common Area", "Laundry"],
    description:
      "Book the entire flat for your crew. Three rooms, the full kitchen, the common area — all yours. Ideal for groups, retreats, or anyone who just wants their own ship.",
    badge: "For Groups",
  },
];

export const amenities = [
  { icon: "Wifi", label: "High-Speed Wi-Fi" },
  { icon: "UtensilsCrossed", label: "Shared Kitchen" },
  { icon: "Wind", label: "AC in All Rooms" },
  { icon: "Droplets", label: "Hot Water" },
  { icon: "Monitor", label: "Work Desks" },
  { icon: "WashingMachine", label: "Laundry Access" },
  { icon: "Coffee", label: "Coffee & Tea" },
  { icon: "ShieldCheck", label: "24h Security" },
  { icon: "MapPin", label: "Central Location" },
  { icon: "ParkingSquare", label: "Parking Nearby" },
];

export const neighborhoodHighlights = [
  {
    name: "Shivajinagar Station",
    distance: "10 min walk",
    type: "transport",
    description: "Quick metro access across Pune.",
  },
  {
    name: "FC Road",
    distance: "5 min drive",
    type: "food",
    description: "Best street food strip in the city.",
  },
  {
    name: "Osho Ashram",
    distance: "15 min walk",
    type: "attraction",
    description: "The iconic meditation retreat.",
  },
  {
    name: "Koregaon Park",
    distance: "10 min walk",
    type: "neighbourhood",
    description: "Cafes, bakeries, and the city's creative crowd.",
  },
  // TODO: add real neighborhood highlights
];

export const reviews = [
  {
    id: "r1",
    name: "Priya M.",
    location: "Mumbai",
    rating: 5,
    text: "Genuinely the best hostel stay I've had in India. The place is clean, the people were great, and Darshan is an incredible host. Will be back.",
    date: "2024-11",
  },
  {
    id: "r2",
    name: "Arjun S.",
    location: "Bangalore",
    rating: 5,
    text: "Booked The Explorer for a week — could not have asked for more. Great bed, fast Wi-Fi, the kitchen is super functional. Felt like home.",
    date: "2024-12",
  },
  {
    id: "r3",
    name: "Lena K.",
    location: "Germany",
    rating: 5,
    text: "Found this gem while searching for a place in Pune. The vibe is calm, the area is great, and the mascot on the wall made me smile every morning.",
    date: "2025-01",
  },
  // TODO: add real guest reviews
];

export const faqs = [
  {
    q: "What are the check-in and check-out times?",
    a: "Check-in is from 11:00 AM. Check-out is by 10:00 AM. Early check-in and late check-out may be available on request — just message us on WhatsApp.",
  },
  {
    q: "Can I book the whole flat for a group?",
    a: 'Yes! Select "The Whole Vessel" to book all three rooms as a private unit for up to 6 guests. This blocks individual room bookings for the same dates.',
  },
  {
    q: "How does booking work?",
    a: "Send a booking request with your dates and details. We confirm via WhatsApp within a few hours and collect payment. No surprises.",
  },
  {
    q: "Are meals included?",
    a: "No — but you get a fully equipped shared kitchen, and some of the best street food in Pune is a 5-minute walk away.",
  },
  {
    q: "What is the cancellation policy?",
    a: "Free cancellation up to 72 hours before check-in. After that, the first night is non-refundable. Reach us on WhatsApp for any special cases.", // TODO: confirm policy
  },
  {
    q: "Is the stay pet-friendly?",
    a: "We love animals, but the flat isn't set up for pets currently. Please check with us if you have a specific situation.",
  },
];
