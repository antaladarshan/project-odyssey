import { siteConfig } from "@/config/site";
import { property } from "@/config/property";

const AREAS_SERVED = [
  "Satellite, Ahmedabad",
  "Jodhpur Village, Ahmedabad",
  "Vastrapur, Ahmedabad",
  "Bodakdev, Ahmedabad",
  "Ambawadi, Ahmedabad",
  "ISRO Space Applications Centre, Ahmedabad",
];

const AMENITIES = ["Free Wi-Fi", "Air conditioning", "Kitchen", "Hot water", "Lockers", "24-hour security", "Laundry"];

export function absoluteUrl(path: string) {
  return `${siteConfig.url}${path}`;
}

/** Site-wide LodgingBusiness / Hostel entity, rendered once in the root layout. */
export function lodgingSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Hostel", "LodgingBusiness"],
    "@id": absoluteUrl("/#organization"),
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.whatsapp,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.pincode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.address.lat,
      longitude: siteConfig.address.lng,
    },
    hasMap: property.mapsUrl,
    image: [absoluteUrl(siteConfig.ogImage)],
    priceRange: "₹₹",
    checkinTime: siteConfig.checkIn,
    checkoutTime: siteConfig.checkOut,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    areaServed: AREAS_SERVED.map((name) => ({ "@type": "Place", name })),
    amenityFeature: AMENITIES.map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
    sameAs: [siteConfig.socials.instagram, property.mapsUrl].filter(Boolean),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
