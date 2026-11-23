import type { MetadataRoute } from "next";
import { getMaterials } from "@/data/materials";
import { localePath, LANGS } from "@/lib/i18n";
import { absUrl } from "@/lib/seo";

export const dynamic = "force-static";

// Every page in both languages, each entry listing its English, Spanish and default (English) versions (hreflang)
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const courses = (await getMaterials()).filter((c) => c.total > 0);
  const pages: { path: string; lastModified: Date }[] = [
    { path: "/", lastModified: now },
    { path: "/publications", lastModified: now },
    { path: "/teaching", lastModified: now },
    { path: "/materials", lastModified: now },
    ...courses.map((c) => ({ path: `/materials/${c.slug}`, lastModified: new Date(c.updated!) })),
    { path: "/more", lastModified: now },
  ];
  return pages.flatMap(({ path, lastModified }) => {
    const languages = {
      en: absUrl(path),
      es: absUrl(localePath("es", path)),
      "x-default": absUrl(path),
    };
    return LANGS.map((lang) => ({ url: absUrl(localePath(lang, path)), lastModified, alternates: { languages } }));
  });
}
