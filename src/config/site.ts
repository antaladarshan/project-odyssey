export const siteConfig = {
  name: "Project Odyssey",
  tagline: "Begin Your Odyssey",
  description:
    "A boutique backpacker stay in the heart of Pune — three private rooms, one whole flat, and a community of fellow travelers. Book directly and save.",
  url: "https://projectodyssey.in",
  ogImage: "/brand/og-image.jpg",
  whatsapp: "+919999999999", // TODO: replace with real WhatsApp number
  email: "stay@projectodyssey.in", // TODO: replace with real email
  address: {
    street: "TODO: Street Address",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    pincode: "411001",
    lat: 18.5204, // TODO: replace with exact coordinates
    lng: 73.8567,
  },
  socials: {
    instagram: "https://instagram.com/projectodyssey.in",
    // TODO: add actual social handles
  },
  checkIn: "11:00 AM",
  checkOut: "10:00 AM",
} as const;
