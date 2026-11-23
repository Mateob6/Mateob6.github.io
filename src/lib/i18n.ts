// Two languages, two sets of URLs (2026-11-23): English at the root (the URLs Google already knows),
// Spanish under /es with the same slugs (/teaching → /es/teaching). Each page renders only its own language.

export type Lang = "en" | "es";
export const LANGS: readonly Lang[] = ["en", "es"];
export const OTHER: Record<Lang, Lang> = { en: "es", es: "en" };

/** A path of the site in a given language. Accepts a hash: "/#about" → "/es#about" */
export function localePath(lang: Lang, path: string): string {
  if (lang === "en") return path;
  if (path === "/") return "/es";
  if (path.startsWith("/#")) return `/es${path.slice(1)}`;
  return `/es${path}`;
}

/** The language-neutral path of a URL path: /es/teaching → /teaching, /es → / */
export function stripLocale(pathname: string): string {
  if (pathname === "/es" || pathname === "/es/") return "/";
  return pathname.startsWith("/es/") ? pathname.slice(3) : pathname;
}

export function pick<V>(lang: Lang, en: V, es: V): V {
  return lang === "es" ? es : en;
}

/** Stable id for anchors: lowercase ASCII, accents removed, words joined by hyphens */
export function slugify(text: string, maxWords = 8): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, maxWords)
    .join("-");
}
