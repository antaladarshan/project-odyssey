import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { properties } from "@/config/property";
import { landingPages } from "@/config/landing";
import { posts } from "@/config/posts";

export const dynamic = "force-static";

// next.config.ts sets trailingSlash: true, so every URL here ends in "/".
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/book/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/properties/`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...properties.filter((p) => !p.comingSoon).map((p) => ({
      url: `${base}/property/${p.slug}/`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...landingPages.filter((p) => p.ready).map((p) => ({
      url: `${base}/pg/${p.slug}/`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...posts.filter((p) => p.published).map((p) => ({
      url: `${base}/blog/${p.slug}/`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${base}/host-an-event/`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/partner-with-us/`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/about/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/faq/`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact/`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];
}
