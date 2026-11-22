import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata, PERSON_ID, SITE_URL } from "@/lib/seo";
import { T } from "@/components/content/t";
import { CourseCover, CourseUnits, UnitTrack } from "@/components/content/materials";
import { formatUpdated, getCourse, getMaterials, SLIDES_URL } from "@/data/materials";
import { teachingDomains } from "@/data/teaching";

// One page per course that already has classes; courses without classes only show on /materials
export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getMaterials()).filter((c) => c.total > 0).map((c) => ({ curso: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ curso: string }> }): Promise<Metadata> {
  const { curso } = await params;
  const c = await getCourse(curso);
  if (!c) return {};
  return pageMetadata({
    title: `${c.course.nombre} — Materials`,
    description: `${c.course.descripcion.en} Class slides by Mateo Belalcazar, in Spanish: view them in the browser or download them as PDF.`,
    path: `/materials/${c.slug}`,
  });
}

const LICENSE_URL = "https://creativecommons.org/licenses/by/4.0/";

export default async function CoursePage({ params }: { params: Promise<{ curso: string }> }) {
  const { curso } = await params;
  const c = await getCourse(curso);
  if (!c || c.total === 0) notFound();
  const domain = teachingDomains[c.course.dominio];
  const counts = Object.fromEntries(c.units.map((u) => [u.unit.slug, u.classes.length]));
  const updated = formatUpdated(c.updated!);
  const k = c.total;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${SITE_URL}/materials/${c.slug}`,
    name: c.course.nombre,
    description: c.course.descripcion.en,
    url: `${SITE_URL}/materials/${c.slug}`,
    inLanguage: "es",
    provider: { "@id": PERSON_ID },
    hasPart: c.units.flatMap((u) =>
      u.classes.map((d) => ({
        "@type": "LearningResource",
        name: d.titulo,
        description: d.resumen,
        url: `${SLIDES_URL}${d.ruta}/`,
        inLanguage: "es",
        learningResourceType: "Presentation",
        educationalLevel: "Undergraduate",
        license: LICENSE_URL,
        author: { "@id": PERSON_ID },
        dateModified: d.actualizada,
        image: `${SLIDES_URL}${d.miniatura}`,
        encoding: { "@type": "MediaObject", contentUrl: `${SLIDES_URL}${d.pdf}`, encodingFormat: "application/pdf" },
      }))
    ),
  };

  return (
    <div className="py-12 space-y-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <Link href="/materials" className="inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-accent">
        <T en="← All courses" es="← Todos los cursos" />
      </Link>

      <header className="grid items-center gap-6 sm:grid-cols-[minmax(0,1fr)_17rem]">
        <div className="order-2 space-y-3 sm:order-1">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
            <T en={domain.nameEn} es={domain.nameEs} />
          </p>
          <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">{c.course.nombre}</h1>
          <p className="text-sm leading-relaxed text-muted">
            <T en={c.course.descripcion.en} es={c.course.descripcion.es} />
          </p>
          <p className="text-[11px] text-muted">
            <T
              en={`${k} ${k === 1 ? "class" : "classes"} · Updated ${updated.en} · Slides in Spanish · CC BY 4.0`}
              es={`${k} ${k === 1 ? "clase" : "clases"} · Actualizado en ${updated.es} · En español · CC BY 4.0`}
            />
          </p>
        </div>
        <CourseCover course={c} className="order-1 rounded-xl border border-border shadow-sm sm:order-2" />
      </header>

      <UnitTrack slug={c.slug} units={c.course.unidades} counts={counts} />

      <CourseUnits course={c} />
    </div>
  );
}
