import type { Metadata } from "next";
import { T } from "@/components/content/t";
import { PublicationCard } from "@/components/content/publication-card";
import { ScrollReveal } from "@/components/content/scroll-reveal";
import { publications } from "@/data/publications";

export const metadata: Metadata = { title: "Publications" };

export default function PublicationsPage() {
  const articles = publications.filter((p) => p.type === "article");
  const chapters = publications.filter((p) => p.type === "chapter");

  return (
    <div className="py-12 space-y-12">
      <ScrollReveal direction="left">
        <header className="subpage-hero pl-8">
          <p className="uppercase tracking-wider text-accent text-xs font-semibold mb-2">
            <T en="Publications" es="Publicaciones" />
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            <T en="Publications" es="Publicaciones" />
          </h1>
        </header>
      </ScrollReveal>

      <section className="space-y-4">
        <ScrollReveal>
          <h2 className="text-xs uppercase tracking-[0.15em] text-accent font-semibold">
            <T en="Articles" es="Artículos" />
          </h2>
        </ScrollReveal>
        <ScrollReveal>
          <div className="pl-4 border-l-2 border-accent/20">
            {articles.map((pub) => (
              <PublicationCard
                key={pub.title}
                type={pub.type}
                title={pub.title}
                authors={pub.authors}
                venue={pub.journal}
                year={pub.year}
                doi={pub.doi}
              />
            ))}
          </div>
        </ScrollReveal>
      </section>

      <section className="space-y-4">
        <ScrollReveal>
          <h2 className="text-xs uppercase tracking-[0.15em] text-accent font-semibold">
            <T en="Book Chapters" es="Capítulos de Libro" />
          </h2>
        </ScrollReveal>
        <ScrollReveal>
          <div className="pl-4 border-l-2 border-accent/20">
            {chapters.map((pub) => (
              <PublicationCard
                key={pub.title}
                type={pub.type}
                title={pub.title}
                authors={pub.authors}
                venue={pub.journal}
                year={pub.year}
                doi={pub.doi}
              />
            ))}
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
