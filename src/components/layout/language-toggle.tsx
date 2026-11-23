"use client";

import { usePathname } from "next/navigation";
import { localePath, OTHER, stripLocale, type Lang } from "@/lib/i18n";

// A real link to the same page in the other language (/teaching ↔ /es/teaching), keeping the anchor
// (/teaching#methodology ↔ /es/teaching#methodology). The choice is remembered: SiteShell's script sends
// later visits to the chosen language.
export function LanguageToggle({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const next = OTHER[lang];
  const target = localePath(next, stripLocale(pathname));

  return (
    <a
      href={target}
      hrefLang={next}
      lang={next}
      onClick={(e) => {
        localStorage.setItem("lang", next);
        if (window.location.hash) {
          e.preventDefault();
          window.location.assign(target + window.location.hash);
        }
      }}
      aria-label={next === "en" ? "English version" : "Versión en español"}
      title={next === "en" ? "English" : "Español"}
      // same look as the ghost Button it replaces
      className="inline-flex h-9 min-h-[36px] items-center justify-center gap-2 rounded-lg px-2 text-sm font-medium text-muted transition-colors hover:bg-surface-raised hover:text-foreground"
    >
      {next === "en" ? "🇬🇧" : "🇪🇸"}
    </a>
  );
}
