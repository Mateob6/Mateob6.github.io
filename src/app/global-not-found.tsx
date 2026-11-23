import type { Metadata } from "next";
import { inter, lora } from "@/lib/fonts";
import { NAV_LINKS } from "@/lib/nav";
import "./globals.css";

// The 404 page for any unknown URL (out/404.html, which GitHub Pages serves). With two root layouts (/ and /es)
// there is no single layout to build it from, so it is a full document of its own, in both languages.
export const metadata: Metadata = {
  title: "Page not found · Página no encontrada — Mateo Belalcazar",
  robots: { index: false },
};

const THEME_SCRIPT = `(function(){var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.dataset.theme=t}})();`;

export default function GlobalNotFound() {
  return (
    <html lang="en" suppressHydrationWarning className={`${lora.variable} ${inter.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="grid min-h-screen place-items-center px-6 font-sans">
        <main className="max-w-md space-y-8 py-16 text-center">
          <p className="font-serif text-6xl font-bold text-accent">404</p>
          <div className="space-y-2">
            <h1 className="font-serif text-2xl font-bold text-foreground">Page not found</h1>
            <p lang="es" className="font-serif text-lg text-muted">Página no encontrada</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <a href="/" className="rounded-full bg-accent px-4 py-1.5 font-medium text-accent-foreground hover:opacity-90">
              Home →
            </a>
            <a href="/es" lang="es" className="rounded-full border border-border px-4 py-1.5 font-medium text-foreground hover:border-accent/40 hover:text-accent">
              Inicio →
            </a>
          </div>
          <nav aria-label="Sections" className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-muted">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-accent">
                {l.en}
              </a>
            ))}
          </nav>
        </main>
      </body>
    </html>
  );
}
