// The language of the page being rendered, for Server Components (the same idea as next-intl's setRequestLocale).
// Each root layout (SiteShell) and each page view calls setLang() first; <T> and href() read it below them.
// React's cache() keeps one value per request, so pages prerendered at the same time during the build do not mix.
// Client components cannot read it: they receive `lang` as a prop.
import { cache } from "react";
import { localePath, type Lang } from "./i18n";

const current = cache((): { lang: Lang } => ({ lang: "en" }));

export function setLang(lang: Lang) {
  current().lang = lang;
}

export function getLang(): Lang {
  return current().lang;
}

/** An internal link in the language of the page being rendered */
export function href(path: string): string {
  return localePath(getLang(), path);
}
