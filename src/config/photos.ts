// Real photos of Project Odyssey (from the Airbnb listing), grouped by what they show.
// Files live in /public/photos. The sources were 240–480px thumbnails, so they are
// upscaled 3x with Lanczos — swap in the original full-size photos (same filenames)
// for sharper results; no code change needed.

export const photo = {
  // Living area
  superhost: "/photos/superhost-living.webp", // living room with the Airbnb Superhost badge (home hero)
  livingSofa: "/photos/living-sofa.webp",
  livingBeanbags: "/photos/living-sofa-beanbags.webp",
  livingEvening: "/photos/living-evening.webp",
  movieNight: "/photos/living-movie-night.webp",
  wallArt: "/photos/living-wall-art.webp",
  wallArtLamp: "/photos/living-wall-art-lamp.webp",

  // Kitchen & dining
  dining: "/photos/kitchen-dining.webp",
  fridge: "/photos/kitchen-fridge.webp",

  // Balcony
  balcony: "/photos/balcony.webp",

  // Bathroom
  bathroom: "/photos/bathroom.webp",
  bathroomGuide: "/photos/bathroom-guide.webp",

  // Dorm rooms
  bunkLadder: "/photos/dorm-bunk-ladder.webp",
  bunksWide: "/photos/dorm-bunks-wide.webp",
  bunksLit: "/photos/dorm-bunks-lit.webp",
  bunksDeep: "/photos/dorm-bunks-deep.webp",
  curtainAisle: "/photos/dorm-curtain-aisle.webp",
  pillow: "/photos/dorm-pillow.webp",

  // Entry & security
  entryLockers: "/photos/entry-lockers.webp",
  smartLock: "/photos/smart-lock.webp",

  // Not used on the site yet (promo poster)
  scooterPoster: "/photos/poster-scooter.webp",
} as const;
