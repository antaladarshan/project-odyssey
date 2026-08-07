import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Project Odyssey",
    short_name: "Odyssey",
    description: "Unified booking manager for Project Odyssey",
    start_url: "/calendar",
    display: "standalone",
    background_color: "#edeeea",
    theme_color: "#1e3348",
    icons: [{ src: "/icon.png", sizes: "1024x1024", type: "image/png", purpose: "any" }],
  };
}
