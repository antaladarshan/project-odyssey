/**
 * Keyword landing pages for local SEO ("PG for girls in Satellite", "PG near ISRO", ...).
 *
 * `ready: false` keeps a page noindex and out of the sitemap. Flip it to true once the
 * TODO inputs (monthly rent, girls-only units, rules, real distances) are filled in.
 */

export interface LandingSection {
  heading: string;
  body: string[];
}

export interface LandingPageConfig {
  slug: string;
  ready: boolean;
  /** Short name used in breadcrumbs, footer and cross-links. */
  label: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  intro: string;
  highlights: string[];
  sections: LandingSection[];
  /** Monthly rent rows — leave empty until the owner supplies real numbers. */
  pricing: { type: string; rent: string; includes: string }[];
  faqs: { q: string; a: string }[];
  /** Slugs of related landing pages for internal linking. */
  related: string[];
}

const SHARING_PRICING = [
  {
    type: "4-sharing room",
    rent: "From ₹700/bed/night, lower for longer stays",
    includes: "AC, Wi-Fi, hot water, locker, reading light, privacy curtain",
  },
  {
    type: "6-sharing room",
    rent: "From ₹700/bed/night, lower for longer stays",
    includes: "AC, Wi-Fi, hot water, locker, reading light, privacy curtain",
  },
];

const RULES_SECTION: LandingSection = {
  heading: "House rules and visitors",
  body: [
    "Visitors are welcome between 10:00 AM and 10:00 PM. Visitors are not allowed to stay after 10:00 PM, which keeps the rooms safe and quiet for everyone who lives here.",
  ],
};

const COMING_SOON_SECTION: LandingSection = {
  heading: "Coming soon: Flat A-102 in the same building",
  body: [
    "We are opening a second stay in Flat A-102, Aishwarya Apartments, at the same address. It will have smaller 3-4 sharing rooms and 1-2 sharing rooms for guests who want more privacy. Message us on WhatsApp to be told when it opens.",
  ],
};

const LOCATION_SECTION: LandingSection = {
  heading: "Where we are: Jodhpur Village, Satellite",
  body: [
    "We are in Aishwarya Apartments, opposite Star Bazaar in Jodhpur Village, Satellite, Ahmedabad 380015. The ISRO Space Applications Centre is only about 500 metres away, and Jodhpur Cross Roads, with its cafes, chai stalls, pharmacies and everyday shops, is a couple of minutes' walk.",
    "Satellite is one of the most connected parts of western Ahmedabad. SG Highway, Vastrapur and Bodakdev are all within easy reach, and the nearest metro station is a short walk.",
  ],
};

const SAFETY_SECTION: LandingSection = {
  heading: "Safety, security and comfort",
  body: [
    "The building has 24-hour security, and every bed has its own locker, reading light and power socket. Rooms are air-conditioned, hot water is available, and Wi-Fi is fast enough for video calls and remote work.",
    "A host is available on WhatsApp for anything you need, from room questions to local recommendations.",
  ],
};

export const landingPages: LandingPageConfig[] = [
  {
    slug: "girls-pg-satellite-ahmedabad",
    ready: true,
    label: "Girls PG in Satellite",
    title: "Girls PG in Satellite, Ahmedabad (Near ISRO) | Safe Girls Hostel",
    description:
      "Safe girls PG and ladies hostel in Satellite, Jodhpur Village, Ahmedabad, 500 m from ISRO and opposite Star Bazaar. AC rooms, Wi-Fi, lockers and 24h security. Contact for rent and availability.",
    h1: "Girls PG in Satellite, Ahmedabad",
    eyebrow: "Girls PG & Ladies Hostel · Near ISRO",
    intro:
      "Looking for a safe, clean girls PG in Satellite, Ahmedabad? We offer AC rooms, fast Wi-Fi, personal lockers and 24-hour security in Jodhpur Village, next to Star Bazaar and only 500 metres from ISRO SAC, with SG Highway and Vastrapur a short ride away.",
    highlights: [
      "Girls-only rooms",
      "24-hour security",
      "AC rooms with lockers",
      "Fast Wi-Fi",
      "Opposite Star Bazaar",
      "500 m from ISRO SAC",
    ],
    sections: [
      LOCATION_SECTION,
      {
        heading: "Who this girls PG is for",
        body: [
          "Students, interns, and working women who want a safe, comfortable base in Ahmedabad without the hassle of renting and furnishing a flat. Whether you are joining a company on SG Highway, studying nearby, or moving for an internship at ISRO, you can move in with a suitcase and start your month.",
        ],
      },
      SAFETY_SECTION,
      RULES_SECTION,
      COMING_SOON_SECTION,
    ],
    pricing: SHARING_PRICING,
    faqs: [
      {
        q: "Is this a girls-only PG in Satellite, Ahmedabad?",
        a: "Yes, the girls PG rooms are for women only. Message us on WhatsApp to confirm which rooms and floors are currently available.",
      },
      {
        q: "How far is the PG from ISRO Space Applications Centre?",
        a: "We are about 500 metres from the ISRO SAC campus, a few minutes' walk, in Jodhpur Village, Satellite.",
      },
      {
        q: "Is the girls PG safe?",
        a: "The building has 24-hour security, every bed has a personal locker, and a host is reachable on WhatsApp at any time.",
      },
      {
        q: "What facilities are included?",
        a: "AC rooms, Wi-Fi, hot water, lockers, reading lights and laundry access. Ask us on WhatsApp what is included in your monthly rent.",
      },
      {
        q: "What are the visitor timings?",
        a: "Visitors are allowed from 10:00 AM to 10:00 PM. They cannot stay after 10:00 PM.",
      },
      {
        q: "Can I visit before booking?",
        a: "Yes. Message us on WhatsApp to schedule a visit and see the rooms before you decide.",
      },
    ],
    related: ["pg-near-isro-ahmedabad", "pg-for-students-ahmedabad", "co-ed-pg-satellite-ahmedabad"],
  },
  {
    slug: "pg-near-isro-ahmedabad",
    ready: true,
    label: "PG near ISRO",
    title: "PG Near ISRO SAC, Ahmedabad | Satellite & Jodhpur Village",
    description:
      "PG and hostel just 500 m from ISRO Space Applications Centre, Satellite, Ahmedabad. AC rooms, Wi-Fi, lockers and flexible stays for interns, trainees and new joiners.",
    h1: "PG near ISRO, Ahmedabad",
    eyebrow: "PG near ISRO SAC · Satellite",
    intro:
      "Joining ISRO SAC as an intern, project trainee or new employee? Our PG in Jodhpur Village, Satellite is just 500 metres from the campus, with AC rooms, Wi-Fi, lockers and flexible month-to-month stays.",
    highlights: [
      "500 m from ISRO SAC",
      "Flexible stays, weekly to monthly",
      "AC and Wi-Fi",
      "Personal lockers",
      "Shared kitchen",
      "Metro nearby",
    ],
    sections: [
      LOCATION_SECTION,
      {
        heading: "A base for interns and new joiners",
        body: [
          "Interns and project trainees often need a place for a few weeks or months, not a year-long lease. Our stays are flexible, and the per-night price drops automatically for longer stays, so you only pay for the time you need.",
        ],
      },
      SAFETY_SECTION,
      RULES_SECTION,
      COMING_SOON_SECTION,
    ],
    pricing: SHARING_PRICING,
    faqs: [
      {
        q: "Is this PG near ISRO SAC in Ahmedabad?",
        a: "Yes. We are about 500 metres from the ISRO Space Applications Centre in Jodhpur Village, Satellite, a few minutes' walk.",
      },
      {
        q: "Can I stay for just a few weeks as an intern?",
        a: "Yes. Stays are flexible, from a few nights to monthly, and longer stays cost less per night.",
      },
      {
        q: "Are there rooms for girls and for boys?",
        a: "We have girls-only and mixed options. Message us on WhatsApp with your dates and we will confirm what is available.",
      },
      {
        q: "Is food included?",
        a: "Meals are not part of the base price, but there is a shared kitchen and plenty of food options within a 5-minute walk.",
      },
    ],
    related: ["girls-pg-satellite-ahmedabad", "pg-for-students-ahmedabad", "hostel-in-ahmedabad"],
  },
  {
    slug: "co-ed-pg-satellite-ahmedabad",
    ready: true,
    label: "Co-ed PG in Satellite",
    title: "Co-ed PG & Hostel in Satellite, Ahmedabad | Boys & Girls",
    description:
      "Co-ed PG and hostel in Satellite, Jodhpur Village, Ahmedabad. Private and shared rooms for boys and girls with AC, Wi-Fi, lockers and 24h security.",
    h1: "Co-ed PG & Hostel in Satellite, Ahmedabad",
    eyebrow: "Co-ed PG · Boys & Girls",
    intro:
      "A friendly co-ed PG and hostel in Satellite, Ahmedabad for students, working professionals and remote workers. Shared dorms and private rooms, AC, fast Wi-Fi and 24-hour security, right opposite Star Bazaar.",
    highlights: [
      "Boys & girls welcome",
      "Dorms and private rooms",
      "AC and Wi-Fi",
      "24-hour security",
      "Shared kitchen",
      "Opposite Star Bazaar",
    ],
    sections: [
      LOCATION_SECTION,
      {
        heading: "Shared and private options",
        body: [
          "Pick a bed in a 4-sharing or 6-sharing room, or book a whole room for your group. Each bed has a privacy curtain, reading light, power socket and locker.",
        ],
      },
      SAFETY_SECTION,
      RULES_SECTION,
      COMING_SOON_SECTION,
    ],
    pricing: SHARING_PRICING,
    faqs: [
      {
        q: "Is this a co-ed PG in Satellite?",
        a: "Yes, we have mixed dorms and private rooms. Girls-only rooms are also available on request.",
      },
      {
        q: "Can I book a whole room for my group?",
        a: "Yes. If your group fills every bed in a room, you have it to yourselves. Message us on WhatsApp to confirm.",
      },
      {
        q: "Are there discounts for monthly stays?",
        a: "Yes. The per-night rate drops automatically with each extra night, with the lowest rate for stays of 27 nights or more.",
      },
    ],
    related: ["girls-pg-satellite-ahmedabad", "hostel-in-ahmedabad", "pg-near-isro-ahmedabad"],
  },
  {
    slug: "hostel-in-ahmedabad",
    ready: true,
    label: "Hostel in Ahmedabad",
    title: "Hostel in Ahmedabad (Satellite) | Backpacker Dorm Beds",
    description:
      "Backpacker hostel in Satellite, Ahmedabad. Bunk beds with privacy curtains, AC, Wi-Fi and lockers. Book direct with no middleman and no markup.",
    h1: "Hostel in Ahmedabad: Project Odyssey",
    eyebrow: "Backpacker Hostel · Satellite",
    intro:
      "Project Odyssey is a boutique backpacker hostel in Satellite, Ahmedabad. Bunk beds with privacy curtains, AC, Wi-Fi and lockers, a shared kitchen, and a community of fellow travellers. Book direct with no OTA markup.",
    highlights: [
      "Bunk beds with privacy curtains",
      "AC and Wi-Fi",
      "Personal lockers",
      "Shared kitchen",
      "Book direct, no markup",
      "Near metro",
    ],
    sections: [LOCATION_SECTION, SAFETY_SECTION, RULES_SECTION, COMING_SOON_SECTION],
    pricing: SHARING_PRICING,
    faqs: [
      {
        q: "How much is a hostel bed in Ahmedabad?",
        a: "Beds start at ₹700 per night, and the rate drops automatically for longer stays.",
      },
      {
        q: "Can I book directly?",
        a: "Yes. Send a request on WhatsApp or use the booking page. We confirm within a few hours.",
      },
    ],
    related: ["co-ed-pg-satellite-ahmedabad", "pg-near-isro-ahmedabad", "girls-pg-satellite-ahmedabad"],
  },
  {
    slug: "pg-for-students-ahmedabad",
    ready: true,
    label: "Student PG in Ahmedabad",
    title: "PG for Students in Ahmedabad (Satellite) | Affordable Student Stay",
    description:
      "Affordable PG for students in Satellite, Ahmedabad. AC rooms, Wi-Fi, lockers and a shared kitchen, with flexible monthly stays near colleges and coaching centres.",
    h1: "PG for Students in Satellite, Ahmedabad",
    eyebrow: "Student PG · Satellite",
    intro:
      "A comfortable, affordable PG for students in Satellite, Ahmedabad. Quiet study-friendly rooms with AC, Wi-Fi, lockers and a shared kitchen, with flexible monthly stays.",
    highlights: [
      "Study-friendly rooms",
      "Fast Wi-Fi",
      "Shared kitchen",
      "Monthly stays",
      "24-hour security",
      "Metro nearby",
    ],
    sections: [LOCATION_SECTION, SAFETY_SECTION, RULES_SECTION, COMING_SOON_SECTION],
    pricing: SHARING_PRICING,
    faqs: [
      {
        q: "Is there a PG for students in Satellite, Ahmedabad?",
        a: "Yes. We offer monthly stays with AC, Wi-Fi, lockers and a shared kitchen in Jodhpur Village, Satellite.",
      },
      {
        q: "Is a deposit required?",
        a: "Message us on WhatsApp for the current deposit and move-in terms.",
      },
    ],
    related: ["girls-pg-satellite-ahmedabad", "co-ed-pg-satellite-ahmedabad", "pg-near-isro-ahmedabad"],
  },
];

export function getLandingPage(slug: string) {
  return landingPages.find((p) => p.slug === slug);
}
