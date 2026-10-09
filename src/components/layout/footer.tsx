import Link from "next/link";

const NAV_LINKS = [
  { href: "/publications", en: "Publications", es: "Publicaciones" },
  { href: "/teaching", en: "Teaching", es: "Docencia" },
  { href: "/skills", en: "Skills", es: "Habilidades" },
  { href: "/awards", en: "Awards", es: "Premios" },
];

const PROFILE_LINKS = [
  { href: "https://scholar.google.com/citations?user=RoI0VQ8AAAAJ", label: "Scholar" },
  { href: "https://orcid.org/0000-0001-8276-9734", label: "ORCID" },
  { href: "https://github.com/Mateob6", label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-3xl mx-auto px-6">
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-muted hover:text-accent transition-colors"
            >
              <span className="en">{link.en}</span>
              <span className="es">{link.es}</span>
            </Link>
          ))}
        </nav>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mb-4">
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
          Cali, Colombia ·{" "}
          <span className="en">Updated October 2026</span>
          <span className="es">Actualizado en octubre de 2026</span>
        </p>
      </div>
    </footer>
  );
}
