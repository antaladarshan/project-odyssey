import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

// Staff tool + API routes are not for search engines.
const privatePaths = [
  "/api/",
  "/account/",
  "/bookings/",
  "/calendar/",
  "/checkin/",
  "/checkins/",
  "/guests/",
  "/login/",
  "/settings/",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: privatePaths },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
