/**
 * Blog posts for local SEO. Config-driven like property.ts: add an object here and the
 * /blog index, post page and sitemap pick it up.
 *
 * `published: false` keeps a post noindex and out of the sitemap.
 */

export interface PostSection {
  heading: string;
  body: string[];
}

export interface Post {
  slug: string;
  published: boolean;
  title: string;
  description: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  intro: string;
  sections: PostSection[];
  /** Landing page slug this post should link to. */
  landing: string;
}

export const posts: Post[] = [
  {
    slug: "best-areas-girls-pg-ahmedabad",
    published: true,
    title: "Best areas for a girls PG in Ahmedabad: Satellite vs Vastrapur vs Navrangpura",
    description:
      "Comparing Satellite, Vastrapur and Navrangpura for a girls PG in Ahmedabad: commute, safety, food and monthly budget.",
    date: "2026-10-27",
    intro:
      "Choosing the right area matters more than the room itself. Your commute, evening safety and daily convenience all depend on where the PG is. Here is how three popular areas of Ahmedabad compare.",
    sections: [
      {
        heading: "Satellite and Jodhpur Village",
        body: [
          "Satellite is well connected to SG Highway, Vastrapur and Bodakdev, and has the ISRO Space Applications Centre nearby. Jodhpur Cross Roads has cafes, pharmacies and groceries within walking distance, which makes day-to-day life easy without a vehicle.",
        ],
      },
      {
        heading: "Vastrapur",
        body: [
          "Vastrapur is close to Gujarat University, IIM Ahmedabad and many offices, with plenty of restaurants and shopping. Expect busier roads and a lively evening scene.",
        ],
      },
      {
        heading: "Navrangpura",
        body: [
          "Navrangpura is an older, central neighbourhood near colleges and coaching centres. It is well suited to students, though commutes to the western offices can be longer.",
        ],
      },
      {
        heading: "How to choose",
        body: [
          "Pick the area closest to your daily destination, then compare PGs on safety, food, rules and rent. Always visit in the evening before you decide.",
        ],
      },
    ],
    landing: "girls-pg-satellite-ahmedabad",
  },
  {
    slug: "pg-near-isro-sac-ahmedabad",
    published: true,
    title: "PG near ISRO SAC, Ahmedabad: a guide for interns and new joiners",
    description:
      "Where to stay near ISRO Space Applications Centre in Ahmedabad: PG options, what to ask before booking, and how to get around.",
    date: "2026-10-27",
    intro:
      "Starting an internship or job at ISRO SAC in Ahmedabad? Short and flexible stays near Satellite make settling in much easier. Here is what to look for.",
    sections: [
      {
        heading: "Why Satellite works for ISRO SAC",
        body: [
          "The campus sits in the Satellite area, so staying in Jodhpur Village or nearby keeps your commute short and your options for food and groceries wide.",
        ],
      },
      {
        heading: "What to ask before you book",
        body: [
          "Ask about the minimum stay, the deposit, whether meals are included, laundry, Wi-Fi speed, visitor rules and any curfew. Flexible month-to-month stays are ideal if your internship has a fixed end date.",
        ],
      },
    ],
    landing: "pg-near-isro-ahmedabad",
  },
  {
    slug: "girls-pg-safety-checklist",
    published: true,
    title: "Safety checklist before choosing a girls PG",
    description:
      "A practical checklist for choosing a safe girls PG: security, locks, entry rules, neighbourhood, and the questions to ask the owner.",
    date: "2026-10-27",
    intro:
      "A good PG should feel safe from the first visit. Use this checklist when you tour a girls PG or hostel.",
    sections: [
      {
        heading: "The building",
        body: [
          "Look for 24-hour security or a guarded entrance, working locks on room doors, personal lockers, and good lighting in corridors and stairs.",
        ],
      },
      {
        heading: "The neighbourhood",
        body: [
          "Visit after dark. Check whether the street is lit and busy, how close the nearest main road and transport are, and where late-night food and pharmacies are.",
        ],
      },
      {
        heading: "Rules and the owner",
        body: [
          "Ask about entry timings, visitor policy, emergency contacts and how complaints are handled. Read recent reviews and, if you can, talk to a current resident.",
        ],
      },
    ],
    landing: "girls-pg-satellite-ahmedabad",
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
