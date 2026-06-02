// Greek/voyage themed labels — set THEMED = false to switch to plain labels
const THEMED = true;

export const labels = {
  nav: {
    stay: THEMED ? "The Stay" : "Stay",
    story: THEMED ? "Story" : "About",
    book: THEMED ? "Set Sail" : "Book Now",
    account: THEMED ? "Traveler" : "My Account",
  },
  hero: {
    heading: THEMED ? "Begin Your Odyssey" : "Book Your Stay",
    sub: THEMED ? "The Voyage Begins" : "Project Odyssey",
    cta: THEMED ? "Set Sail" : "Check Availability",
    scrollCue: THEMED ? "Begin the Journey" : "Explore",
  },
  rooms: {
    heading: THEMED ? "Pick Your Cabin" : "Our Rooms",
    sub: THEMED ? "Your Quarters Await" : "Choose a Room",
    bookCta: THEMED ? "Claim This Cabin" : "Book This Room",
    wholeFlat: THEMED ? "The Whole Vessel" : "Book Whole Flat",
  },
  amenities: {
    heading: THEMED ? "Provisions for the Journey" : "Amenities",
  },
  gallery: {
    heading: THEMED ? "A Glimpse of the Voyage" : "Gallery",
  },
  neighborhood: {
    heading: THEMED ? "Ports of Call" : "The Neighborhood",
    sub: THEMED ? "Explore the waters around you" : "What's Nearby",
  },
  reviews: {
    heading: THEMED ? "Tales from Fellow Travelers" : "Guest Reviews",
  },
  returningGuest: {
    heading: THEMED ? "Welcome Back, Traveler" : "Welcome Back",
    sub: THEMED ? "Rebook your favorite cabin in one tap." : "Pick up where you left off.",
    cta: THEMED ? "Rebook Now" : "Book Again",
  },
  futureProperties: {
    heading: THEMED ? "The Map Expands" : "More Destinations Coming",
    sub: THEMED
      ? "Project Odyssey is growing. More ports on the horizon."
      : "We're opening more properties soon.",
  },
  faq: {
    heading: THEMED ? "Before You Set Sail" : "FAQ",
  },
  booking: {
    checkIn: "Check In",
    checkOut: "Check Out",
    guests: "Guests",
    checkAvailability: THEMED ? "Set Sail" : "Check Availability",
    requestToBook: THEMED ? "Request This Cabin" : "Request to Book",
  },
} as const;
