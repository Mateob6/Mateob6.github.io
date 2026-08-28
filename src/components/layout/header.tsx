"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/components/ui";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";

const NAV_LINKS = [
  { href: "/publications", en: "Publications", es: "Publicaciones" },
  { href: "/teaching", en: "Teaching", es: "Docencia" },
  { href: "/skills", en: "Skills", es: "Habilidades" },
  { href: "/awards", en: "Awards", es: "Premios" },
  { href: "/groups", en: "Groups", es: "Grupos" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-[60px] w-full items-center justify-between px-4 backdrop-blur-md md:px-6 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-surface/90 shadow-sm"
          : "border-b border-transparent bg-surface/60"
      )}
    >
      <div className="flex items-center gap-6">
        <Link href="/" className="font-serif text-lg italic text-accent transition-opacity hover:opacity-70">
          Mateo Belalcazar
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "text-accent"
                    : "text-muted hover:text-foreground"
                )}
              >
                <span className="en">{link.en}</span>
                <span className="es">{link.es}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-accent" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <LanguageToggle />
        <ThemeToggle />
        <div className="hidden h-8 w-8 overflow-hidden rounded-full border border-border shadow-sm transition-shadow hover:shadow-md sm:block">
          <img src="/photo.jpg" alt="Mateo Belalcazar" className="h-full w-full object-cover" />
        </div>
      </div>
    </header>
  );
}
