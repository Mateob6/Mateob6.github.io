"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/components/ui";
import { localePath, pick, stripLocale, type Lang } from "@/lib/i18n";
import { NAV_LINKS } from "@/lib/nav";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";

export function Header({ lang }: { lang: Lang }) {
  const pathname = stripLocale(usePathname());
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className={cn(
        "sticky top-0 z-30 flex h-[60px] w-full items-center justify-between px-4 backdrop-blur-md md:px-6 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-surface/90 shadow-sm"
          : "border-b border-transparent bg-surface/60"
      )}
    >
      <div className="flex items-center gap-6">
        <Link href={localePath(lang, "/")} className="font-serif text-lg italic text-accent transition-opacity hover:opacity-70">
          {pick(lang, "Home", "Inicio")}
        </Link>

        <nav aria-label={pick(lang, "Main", "Principal")} className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={localePath(lang, link.href)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "text-accent"
                    : "text-muted hover:text-foreground"
                )}
              >
                {pick(lang, link.en, link.es)}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-accent" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <LanguageToggle lang={lang} />
        <ThemeToggle lang={lang} />
        <div className="hidden h-8 w-8 overflow-hidden rounded-full border border-border shadow-sm transition-shadow hover:shadow-md sm:block">
          <img src="/photo.jpg" alt="Mateo Belalcazar" width={32} height={32} className="h-full w-full object-cover" />
        </div>
      </div>
    </header>
  );
}
