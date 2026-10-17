import type { Metadata } from "next";

export const SITE_URL = "https://mateob6.github.io";
export const SITE_NAME = "Mateo Belalcazar";
export const PERSON_ID = `${SITE_URL}/#person`;

export const SITE_DESCRIPTION =
  "Psychologist and statistician at Universidad del Valle (Colombia) studying how psychological constructs are measured, through psychometrics and computational methods.";

// Shared OG fields: a page-level `openGraph` replaces the root one entirely, so every page spreads these
export const baseOpenGraph = {
  type: "website",
  siteName: SITE_NAME,
  locale: "en_US",
  alternateLocale: ["es_CO"],
  images: [{ url: "/og-image.png", width: 1200, height: 630, alt: SITE_NAME }],
} satisfies Metadata["openGraph"];

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      ...baseOpenGraph,
      title: `${title} — ${SITE_NAME}`,
      description,
      url: `${SITE_URL}${path}`,
    },
  };
}
