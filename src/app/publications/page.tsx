import type { Metadata } from "next";
import { T } from "@/components/content/t";
import { PublicationCard } from "@/components/content/publication-card";
import { ScrollReveal } from "@/components/content/scroll-reveal";
import { publications } from "@/data/publications";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Peer-reviewed articles and book chapters by Mateo Belalcazar on cognitive development, neuropsychology, psychometrics, and quantitative methodology.",
  alternates: { canonical: "/publications" },
  openGraph: {
    title: "Publications — Mateo Belalcazar",
    description:
      "Peer-reviewed articles and book chapters by Mateo Belalcazar on cognitive development, neuropsychology, psychometrics, and quantitative methodology.",
    url: "https://mateob6.github.io/publications",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

function parseAuthorsForSchema(authors: string): { "@type": string; name: string }[] {
  const clean = authors.replace(/\*\*/g, "");
  // Split on ", &" or " & " first, then on "., " (APA separator between "Initials., Next")
  return clean
    .replace(/,?\s*&\s*/g, "., ")
    .split(/\.\,\s*/)
    .map((s) => s.trim().replace(/\.$/, ""))
    .filter(Boolean)
    .map((name) => ({ "@type": "Person" as const, name }));
}

export default function PublicationsPage() {
  const articles = publications.filter((p) => p.type === "article");
  const chapters = publications.filter((p) => p.type === "chapter");

  const articleSchemas = publications
    .filter((p) => p.doi)
    .map((pub) => ({
      "@type": "ScholarlyArticle" as const,
      headline: pub.title,
      author: parseAuthorsForSchema(pub.authors),
      datePublished: String(pub.year),
      isPartOf: { "@type": "Periodical" as const, name: pub.journal.split(",")[0] },
      url: `https://doi.org/${pub.doi}`,
      identifier: { "@type": "PropertyValue" as const, propertyID: "DOI", value: pub.doi },
    }));

  return (
    <div className="py-12 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ "@context": "https://schema.org", "@graph": articleSchemas }),
        }}
      />
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
