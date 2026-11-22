import type { MetadataRoute } from "next";
import { getMaterials } from "@/data/materials";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://mateob6.github.io";
  const now = new Date();
  const courses = (await getMaterials()).filter((c) => c.total > 0);
  return [
    { url: base, lastModified: now },
    { url: `${base}/publications`, lastModified: now },
    { url: `${base}/teaching`, lastModified: now },
    { url: `${base}/materials`, lastModified: now },
    ...courses.map((c) => ({ url: `${base}/materials/${c.slug}`, lastModified: new Date(c.updated!) })),
    { url: `${base}/more`, lastModified: now },
  ];
}
