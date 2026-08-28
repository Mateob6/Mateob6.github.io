"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui";

type Theme = "system" | "dark" | "light";
const CYCLE: Theme[] = ["system", "dark", "light"];

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved === "dark" || saved === "light") setTheme(saved);
  }, []);

  function cycle() {
    const next = CYCLE[(CYCLE.indexOf(theme) + 1) % CYCLE.length];
    setTheme(next);
    if (next === "system") {
      delete document.documentElement.dataset.theme;
      localStorage.removeItem("theme");
    } else {
      document.documentElement.dataset.theme = next;
      localStorage.setItem("theme", next);
    }
  }

  return (
    <Button variant="ghost" size="sm" onClick={cycle} aria-label="Change theme" title="Change theme" className="h-9 w-9 p-0">
      {theme === "dark" && <span aria-hidden="true">☀</span>}
      {theme === "light" && <span aria-hidden="true">☾</span>}
      {theme === "system" && (
        <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      )}
    </Button>
  );
}
