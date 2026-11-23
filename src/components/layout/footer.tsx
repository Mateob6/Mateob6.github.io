import Link from "next/link";
import { CV } from "@/data/profile";
import { T } from "@/components/content/t";
import { getLang, href } from "@/lib/lang-server";
import { NAV_LINKS } from "@/lib/nav";

const PROFILE_LINKS = [
  { href: "https://scholar.google.com/citations?user=RoI0VQ8AAAAJ", label: "Scholar" },
  { href: "https://orcid.org/0000-0001-8276-9734", label: "ORCID" },
  { href: "https://github.com/Mateob6", label: "GitHub" },
];

export function Footer() {
  const lang = getLang();
  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-3xl mx-auto px-6">
        <nav aria-label={lang === "es" ? "Secciones" : "Sections"} className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={href(link.href)}
              className="text-xs text-muted hover:text-accent transition-colors"
            >
              <T en={link.en} es={link.es} />
            </Link>
          ))}
        </nav>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mb-4">
          <a href={CV[lang]} target="_blank" rel="noopener" className="text-xs text-muted hover:text-accent transition-colors">
            CV
          </a>
          {PROFILE_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted hover:text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className="text-xs text-muted text-center">
          Cali, Colombia · <T en="Updated November 2026" es="Actualizado en noviembre de 2026" />
        </p>
      </div>
    </footer>
  );
}
