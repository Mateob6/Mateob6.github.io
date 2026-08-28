import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://mateob6.github.io";
  return [
    { url: base, lastModified: new Date("2026-08-28") },
    { url: `${base}/publications`, lastModified: new Date("2026-08-28") },
    { url: `${base}/teaching`, lastModified: new Date("2026-08-28") },
    { url: `${base}/presentations`, lastModified: new Date("2026-08-28") },
    { url: `${base}/skills`, lastModified: new Date("2026-08-28") },
    { url: `${base}/awards`, lastModified: new Date("2026-08-28") },
    { url: `${base}/groups`, lastModified: new Date("2026-08-28") },
  ];
}
