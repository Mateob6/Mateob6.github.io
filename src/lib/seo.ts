import type { Metadata } from "next";
import { localePath, OTHER, type Lang } from "./i18n";

export const SITE_URL = "https://mateob6.github.io";
export const SITE_NAME = "Mateo Belalcazar";
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const SITE_DESCRIPTION: Record<Lang, string> = {
  en: "Psychologist and statistician at Universidad del Valle (Colombia) studying how psychological constructs are measured, through psychometrics and computational methods.",
  es: "Psicólogo y estadístico de la Universidad del Valle (Colombia) que estudia cómo se miden los constructos psicológicos, con psicometría y métodos computacionales.",
};

export const HOME_TITLE: Record<Lang, string> = {
  en: "Mateo Belalcazar — Psychometrics & Computational Psychology",
  es: "Mateo Belalcazar — Psicometría y Psicología Computacional",
};

const OG_LOCALE: Record<Lang, string> = { en: "en_US", es: "es_CO" };

/** Absolute URL of a site path (the home has no trailing slash, as in the sitemap) */
export function absUrl(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

/** The plain-text copy of a page for AI agents: / → /index.md, /teaching → /teaching.md, /es/teaching → /es/teaching.md */
export function mdPath(lang: Lang, path: string): string {
  return `${lang === "es" ? "/es" : ""}${path === "/" ? "/index" : path}.md`;
}

// Shared OG fields: a page-level `openGraph` replaces the root one entirely, so every page spreads these
export function baseOpenGraph(lang: Lang) {
  return {
    type: "website",
    siteName: SITE_NAME,
    locale: OG_LOCALE[lang],
    alternateLocale: [OG_LOCALE[OTHER[lang]]],
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: SITE_NAME }],
  } satisfies Metadata["openGraph"];
}

/** hreflang alternates of a page that exists in both languages; English is the default */
export function languageAlternates(path: string) {
  return { en: path, es: localePath("es", path), "x-default": path };
}

export function pageMetadata({
  lang,
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  lang: Lang;
  title: string;
  description: string;
  /** language-neutral path: "/teaching" (the Spanish page gets /es/teaching) */
  path: string;
  /** the home: the title is used as is, without the « — Mateo Belalcazar» template */
  absoluteTitle?: boolean;
}): Metadata {
  const url = localePath(lang, path);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
      types: { "text/markdown": mdPath(lang, path) },
    },
    openGraph: {
      ...baseOpenGraph(lang),
      title: absoluteTitle ? SITE_NAME : `${title} — ${SITE_NAME}`,
      description,
      url: absUrl(url),
    },
  };
}

/** Metadata shared by every page of one language (the root layout of /, or of /es) */
export function rootMetadata(lang: Lang): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: HOME_TITLE[lang], template: `%s — ${SITE_NAME}` },
    description: SITE_DESCRIPTION[lang],
    keywords: [
      "Mateo Belalcazar",
      "Mateo Belalcázar",
      "Mateo Belalcázar Correa",
      ...(lang === "es"
        ? ["psicometría", "metodología cuantitativa", "psicología computacional", "medición psicológica", "estadística", "desarrollo cognitivo"]
        : ["psychometrics", "quantitative methodology", "computational psychology", "psychological measurement", "statistics", "cognitive development"]),
      "Universidad del Valle",
      "CIDEAS",
    ],
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    openGraph: { ...baseOpenGraph(lang), title: SITE_NAME, description: SITE_DESCRIPTION[lang], url: absUrl(localePath(lang, "/")) },
    // No title/description here: Next fills them from each page's own metadata
    twitter: { card: "summary_large_image" },
  };
}
