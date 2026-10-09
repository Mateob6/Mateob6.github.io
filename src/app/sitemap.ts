import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://mateob6.github.io";
  const now = new Date();
  return [
    { url: base, lastModified: now },
    { url: `${base}/publications`, lastModified: now },
    { url: `${base}/teaching`, lastModified: now },
    { url: `${base}/skills`, lastModified: now },
    { url: `${base}/awards`, lastModified: now },
  ];
}
