"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui";

export function LanguageToggle() {
  const [lang, setLang] = useState("es");

  useEffect(() => {
    setLang(document.documentElement.lang || "es");
  }, []);

  function toggle() {
    const next = lang === "es" ? "en" : "es";
    setLang(next);
    document.documentElement.lang = next;
    localStorage.setItem("lang", next);
    const html = document.documentElement;
    const title = next === "en"
      ? html.getAttribute("data-title-en")
      : html.getAttribute("data-title-es");
    if (title) document.title = title;
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggle}
      aria-label={lang === "es" ? "Switch to English" : "Cambiar a Español"}
      title={lang === "es" ? "English" : "Español"}
      className="h-9 px-2 text-sm"
    >
      {lang === "es" ? "🇬🇧" : "🇪🇸"}
    </Button>
  );
}
