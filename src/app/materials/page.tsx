import type { Metadata } from "next";
import { pageMetadata, PERSON_ID, SITE_URL } from "@/lib/seo";
import { T } from "@/components/content/t";
import { ScrollReveal } from "@/components/content/scroll-reveal";
import { Counts, MaterialsCourses } from "@/components/content/materials";
import { getMaterials, SLIDES_URL } from "@/data/materials";

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
          image: `${SLIDES_URL}${k.miniatura}`,
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
        <div className="space-y-4">
          <p className="text-sm text-muted leading-relaxed">
            <T
              en="Slides I build and use in my courses, organized by course and unit. Each class opens in the browser and can be downloaded as a PDF."
              es="Diapositivas que preparo y uso en mis cursos, organizadas por curso y unidad. Cada clase se abre en el navegador y se puede bajar en PDF."
            />
          </p>
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted">
            <a
              href={LICENSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="Creative Commons Attribution 4.0"
              className="rounded-full border border-border px-2.5 py-0.5 transition-colors hover:border-accent/40 hover:text-accent"
            >
              CC BY 4.0
            </a>
            <span className="rounded-full border border-border px-2.5 py-0.5">
              <T en="Slides in Spanish" es="En español" />
            </span>
            <span className="ml-1">
              <Counts courses={courses} />
            </span>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <MaterialsCourses courses={courses} />
      </ScrollReveal>
    </div>
  );
}
