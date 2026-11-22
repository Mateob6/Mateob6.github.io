import type { Metadata } from "next";
import { pageMetadata, PERSON_ID, SITE_URL } from "@/lib/seo";
import { T } from "@/components/content/t";
import { ScrollReveal } from "@/components/content/scroll-reveal";
import { getMaterials, formatUpdated, SLIDES_URL, type ClassDeck } from "@/data/materials";

export const metadata: Metadata = pageMetadata({
  title: "Materials",
  description:
    "Class slides by Mateo Belalcazar, organized by course and unit: view them in the browser or download them as PDF. In Spanish, licensed CC BY 4.0.",
  path: "/materials",
});

const LICENSE_URL = "https://creativecommons.org/licenses/by/4.0/";

export default async function MaterialsPage() {
  const courses = await getMaterials();

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/materials`,
    name: "Materials — Mateo Belalcazar",
    url: `${SITE_URL}/materials`,
    author: { "@id": PERSON_ID },
    hasPart: courses.flatMap((c) =>
      c.units.flatMap((u) =>
        u.classes.map((k) => ({
          "@type": "LearningResource",
          name: k.titulo,
          description: k.resumen,
          url: `${SLIDES_URL}${k.ruta}/`,
          inLanguage: "es",
          learningResourceType: "Presentation",
          educationalLevel: "Undergraduate",
          isPartOf: { "@type": "Course", name: c.course.nombre },
          license: LICENSE_URL,
          author: { "@id": PERSON_ID },
          dateModified: k.actualizada,
          encoding: { "@type": "MediaObject", contentUrl: `${SLIDES_URL}${k.pdf}`, encodingFormat: "application/pdf" },
        }))
      )
    ),
  };

  return (
    <div className="py-12 space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <ScrollReveal direction="left">
        <header className="subpage-hero pl-8">
          <p className="uppercase tracking-wider text-accent text-xs font-semibold mb-2">
            <T en="Materials" es="Materiales" />
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            <T en="Class Materials" es="Materiales de clase" />
          </h1>
        </header>
      </ScrollReveal>

      <ScrollReveal>
        <div className="space-y-3 text-sm text-muted leading-relaxed">
          <p>
            <T
              en="Slides I build and use in my courses, organized by course and unit. Each class opens in the browser and can be downloaded as a PDF. The slides are in Spanish."
              es="Diapositivas que preparo y uso en mis cursos, organizadas por curso y unidad. Cada clase se abre en el navegador y se puede bajar en PDF."
            />
          </p>
          <p>
            <T
              en={<>Licensed under <a href={LICENSE_URL} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">CC BY 4.0</a>. You may share and adapt them with attribution.</>}
              es={<>Licencia <a href={`${LICENSE_URL}deed.es`} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">CC BY 4.0</a>. Se pueden compartir y adaptar citando la autoría.</>}
            />
          </p>
        </div>
      </ScrollReveal>

      {courses.map(({ slug, course, units }) => (
        <ScrollReveal key={slug}>
          <section id={slug} className="scroll-mt-20 space-y-8">
            <div>
              <h2 className="font-serif text-xl font-bold text-foreground pb-3 border-b border-accent/15">{course.nombre}</h2>
              <p className="text-sm text-muted leading-relaxed mt-3">
                <T en={course.descripcion.en} es={course.descripcion.es} />
              </p>
            </div>

            {units.map(({ unit, classes }) => (
              <div key={unit.slug} className="space-y-3">
                <h3 className="text-xs uppercase tracking-[0.15em] text-accent font-semibold">
                  <T en={`Unit ${unit.numero} · ${unit.en}`} es={`Unidad ${unit.numero} · ${unit.es}`} />
                </h3>
                <div className="pl-4 border-l-2 border-accent/20">
                  {classes.map((k) => (
                    <ClassEntry key={k.ruta} deck={k} />
                  ))}
                </div>
              </div>
            ))}
          </section>
        </ScrollReveal>
      ))}
    </div>
  );
}

function ClassEntry({ deck }: { deck: ClassDeck }) {
  const updated = formatUpdated(deck.actualizada);
  const button =
    "inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground transition-colors hover:border-accent/40 hover:text-accent";
  return (
    <article className="py-4 border-b border-border/40 last:border-b-0 space-y-2">
      <h4 className="font-serif text-lg text-foreground leading-snug">{deck.titulo}</h4>
      <p className="text-[13px] text-muted leading-relaxed">
        <T en={deck.resumen_en || deck.resumen} es={deck.resumen} />
      </p>
      <p className="text-[11px] text-muted">
        <T
          en={`${deck.diapositivas} slides · Updated ${updated.en}`}
          es={`${deck.diapositivas} diapositivas · Actualizada en ${updated.es}`}
        />
      </p>
      <div className="flex flex-wrap gap-2 pt-1">
        <a href={`${SLIDES_URL}${deck.ruta}/`} target="_blank" rel="noopener noreferrer" className={button}>
          <T en="View slides" es="Ver presentación" />
          <span aria-hidden="true">↗</span>
        </a>
        <a href={`${SLIDES_URL}${deck.pdf}`} download className={button}>
          PDF
          <span aria-hidden="true">↓</span>
        </a>
      </div>
    </article>
  );
}
