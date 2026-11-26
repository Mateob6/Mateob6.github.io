// An old URL whose content now lives in a section of the home: /more («Recognition», until 2026-11-26),
// /skills and /awards (merged into /more on 2026-10-17). Static export has no server redirects, so the page
// carries a meta refresh (React hoists it to <head>) plus a visible link, and noindex + a canonical to the home.
// `redirect()` from next/navigation does not emit a meta refresh under `output: "export"`: don't use it here.
import type { Metadata } from "next";
import Link from "next/link";
import { T } from "@/components/content/t";
import { localePath, type Lang } from "@/lib/i18n";
import { setLang } from "@/lib/lang-server";

export function movedMetadata(lang: Lang): Metadata {
  return { robots: { index: false }, alternates: { canonical: localePath(lang, "/") } };
}

/** `anchor`: the section of the home that holds the content now (#awards, #skills) */
export function MovedView({ lang, anchor, en, es }: { lang: Lang; anchor: string; en: string; es: string }) {
  setLang(lang);
  const to = localePath(lang, `/#${anchor}`);
  return (
    <div className="py-12">
      <meta httpEquiv="refresh" content={`0; url=${to}`} />
      <Link href={to} className="text-sm text-accent link-hover">
        <T en={en} es={es} />
      </Link>
    </div>
  );
}
