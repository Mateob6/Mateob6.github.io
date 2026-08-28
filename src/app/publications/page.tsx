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

      <section className="space-y-6">
        <ScrollReveal>
          <div className="flex items-center gap-2">
            <div className="h-0.5 w-6 bg-accent" />
            <p className="text-xs uppercase tracking-[0.15em] text-accent font-semibold">
              <T en="Articles" es="Artículos" />
            </p>
          </div>
        </ScrollReveal>
        <div className="space-y-4">
          {articles.map((pub, i) => (
            <ScrollReveal key={pub.title} delay={i * 100}>
              <PublicationCard
                type={pub.type}
                title={pub.title}
                authors={pub.authors}
                venue={pub.journal}
                year={pub.year}
                doi={pub.doi}
              />
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <ScrollReveal>
          <div className="flex items-center gap-2">
            <div className="h-0.5 w-6 bg-accent" />
            <p className="text-xs uppercase tracking-[0.15em] text-accent font-semibold">
              <T en="Book Chapters" es="Capítulos de Libro" />
            </p>
          </div>
        </ScrollReveal>
        <div className="space-y-4">
          {chapters.map((pub) => (
            <ScrollReveal key={pub.title}>
              <PublicationCard
                type={pub.type}
                title={pub.title}
                authors={pub.authors}
                venue={pub.journal}
                year={pub.year}
                doi={pub.doi}
              />
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
