import type { Metadata } from "next";
import { T } from "@/components/content/t";
import { PublicationCard } from "@/components/content/publication-card";
import { PresentationEntry } from "@/components/content/presentation-entry";
import { ScrollReveal } from "@/components/content/scroll-reveal";
import { publications } from "@/data/publications";
import { presentations } from "@/data/presentations";
import { pick, type Lang } from "@/lib/i18n";
import { setLang } from "@/lib/lang-server";
import { breadcrumbs, jsonLd, presentationId, publicationsSchemas } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export function publicationsMetadata(lang: Lang): Metadata {
  return pageMetadata({
    lang,
    title: pick(lang, "Publications & Presentations", "Publicaciones y Presentaciones"),
    description: pick(
      lang,
      "Peer-reviewed articles, preprints, book chapters, and conference presentations by Mateo Belalcazar on psychometrics, computational methods, cognitive development, neuropsychology, and quantitative methodology.",
      "Artículos revisados por pares, preprints, capítulos de libro y ponencias de Mateo Belalcazar sobre psicometría, métodos computacionales, desarrollo cognitivo, neuropsicología y metodología cuantitativa."
    ),
    path: "/publications",
  });
}

export function PublicationsView({ lang }: { lang: Lang }) {
  setLang(lang);
  const articles = publications.filter((p) => p.type === "article");
  const preprints = publications.filter((p) => p.type === "preprint");
  const chapters = publications.filter((p) => p.type === "chapter");
  const title = pick(lang, "Publications & Presentations", "Publicaciones y Presentaciones");

  return (
    <div className="py-12 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@graph": [...publicationsSchemas(lang), breadcrumbs(lang, [{ name: title, path: "/publications" }])],
        })}
      />
      <ScrollReveal direction="left">
        <header className="subpage-hero pl-8">
          <p className="uppercase tracking-wider text-accent text-xs font-semibold mb-2">
            <T en="Publications" es="Publicaciones" />
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">{title}</h1>
        </header>
      </ScrollReveal>


      <section id="articles" aria-labelledby="articles-title" className="scroll-mt-20 space-y-4">
        <ScrollReveal>
          <h2 id="articles-title" className="text-xs uppercase tracking-[0.15em] text-accent font-semibold">
            <T en="Articles" es="Artículos" />
          </h2>
        </ScrollReveal>
        <ScrollReveal>
          <div className="pl-4 border-l-2 border-accent/20">
            {articles.map((pub) => (
              <PublicationCard
                key={pub.title}
                id={pub.id}
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

      <section id="preprints" aria-labelledby="preprints-title" className="scroll-mt-20 space-y-4">
        <ScrollReveal>
          <h2 id="preprints-title" className="text-xs uppercase tracking-[0.15em] text-accent font-semibold">
            Preprints
          </h2>
        </ScrollReveal>
        <ScrollReveal>
          <div className="pl-4 border-l-2 border-accent/20">
            {preprints.map((pub) => (
              <PublicationCard
                key={pub.title}
                id={pub.id}
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

      <section id="book-chapters" aria-labelledby="book-chapters-title" className="scroll-mt-20 space-y-4">
        <ScrollReveal>
          <h2 id="book-chapters-title" className="text-xs uppercase tracking-[0.15em] text-accent font-semibold">
            <T en="Book Chapters" es="Capítulos de Libro" />
          </h2>
        </ScrollReveal>
        <ScrollReveal>
          <div className="pl-4 border-l-2 border-accent/20">
            {chapters.map((pub) => (
              <PublicationCard
                key={pub.title}
                id={pub.id}
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

      <section id="presentations" aria-labelledby="presentations-title" className="scroll-mt-20 space-y-4">
        <ScrollReveal>
          <h2 id="presentations-title" className="text-xs uppercase tracking-[0.15em] text-accent font-semibold">
            <T en="Presentations" es="Presentaciones" />
          </h2>
        </ScrollReveal>
        <div className="space-y-2">
          {presentations.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 100}>
              <PresentationEntry
                id={presentationId(p)}
                title={p.title}
                venue={p.venue}
                location={p.location}
                year={p.year}
              />
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
