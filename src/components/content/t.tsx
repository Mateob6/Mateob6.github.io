import type { ReactNode } from "react";
import { getLang } from "@/lib/lang-server";

/** Bilingual text: only the language of the page is rendered, so each URL carries one clean language
 *  (Server Components only; client components get `lang` as a prop and use `pick`) */
export function T({ en, es }: { en: ReactNode; es: ReactNode }) {
  return <>{getLang() === "es" ? es : en}</>;
}
