import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { absUrl, pageMetadata, PERSON_ID } from "@/lib/seo";
import { localePath, pick, type Lang } from "@/lib/i18n";
import { href, setLang } from "@/lib/lang-server";
import { breadcrumbs, jsonLd } from "@/lib/schema";
import { T } from "@/components/content/t";
import { CourseCover, CourseUnits, UnitTrack } from "@/components/content/materials";
import { COURSE_DOI, formatUpdated, getCourse, getMaterials, SLIDES_URL } from "@/data/materials";
import { teachingDomains } from "@/data/teaching";

// One page per course that already has classes; courses without classes only show on /materials
export async function courseStaticParams() {
  return (await getMaterials()).filter((c) => c.total > 0).map((c) => ({ curso: c.slug }));
}

export async function courseMetadata(lang: Lang, curso: string): Promise<Metadata> {
  const c = await getCourse(curso);
  if (!c) return {};
  return pageMetadata({
    lang,
    title: `${c.course.nombre} — ${pick(lang, "Materials", "Materiales")}`,
    description: pick(
      lang,
      `${c.course.descripcion.en} Class slides by Mateo Belalcazar, in Spanish and English: view them in the browser or download them as PDF.`,
      `${c.course.descripcion.es} Diapositivas de clase de Mateo Belalcazar, en español y en inglés: se ven en el navegador o se bajan en PDF.`
    ),
    path: `/materials/${c.slug}`,
  });
}

const LICENSE_URL = "https://creativecommons.org/licenses/by/4.0/";

export async function CourseView({ lang, curso }: { lang: Lang; curso: string }) {
  setLang(lang);
  const c = await getCourse(curso);
  if (!c || c.total === 0) notFound();
  const domain = teachingDomains[c.course.dominio];
  const counts = Object.fromEntries(c.units.map((u) => [u.unit.slug, u.classes.length]));
  const updated = formatUpdated(c.updated!);
  const k = c.total;
  const doi = COURSE_DOI[c.slug];

  const url = absUrl(localePath(lang, `/materials/${c.slug}`));
  const course = {
    "@type": "Course",
    "@id": url,
    name: c.course.nombre,
    description: pick(lang, c.course.descripcion.en, c.course.descripcion.es),
    url,
    inLanguage: ["es", "en"],
    provider: { "@id": PERSON_ID },
    ...(doi && {
      identifier: { "@type": "PropertyValue", propertyID: "DOI", value: doi },
      sameAs: `https://doi.org/${doi}`,
    }),
    hasPart: c.units.flatMap((u) =>
      u.classes.map((d) => ({
        "@type": "LearningResource",
        "@id": `${url}#${d.clase}`,
        name: lang === "en" && d.titulo_en ? d.titulo_en : d.titulo,
        alternateName: lang === "en" ? (d.titulo_en ? d.titulo : undefined) : d.titulo_en || undefined,
        description: lang === "en" && d.resumen_en ? d.resumen_en : d.resumen,
        url: `${SLIDES_URL}${d.ruta}/${lang === "en" && d.titulo_en ? "?en" : ""}`,
        inLanguage: d.titulo_en ? ["es", "en"] : "es",
        learningResourceType: "Presentation",
        educationalLevel: "Undergraduate",
        license: LICENSE_URL,
        author: { "@id": PERSON_ID },
        dateModified: d.actualizada,
        image: `${SLIDES_URL}${d.miniatura}`,
        encoding: [
          { "@type": "MediaObject", contentUrl: `${SLIDES_URL}${d.pdf}`, encodingFormat: "application/pdf", inLanguage: "es" },
          ...(d.pdf_en ? [{ "@type": "MediaObject", contentUrl: `${SLIDES_URL}${d.pdf_en}`, encodingFormat: "application/pdf", inLanguage: "en" }] : []),
        ],
      }))
    ),
  };
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      course,
      breadcrumbs(lang, [
        { name: pick(lang, "Materials", "Materiales"), path: "/materials" },
        { name: c.course.nombre, path: `/materials/${c.slug}` },
      ]),
    ],
  };

  return (
    <div className="py-12 space-y-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />

      <Link href={href("/materials")} className="inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-accent">
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
              en={`${k} ${k === 1 ? "class" : "classes"} · Updated ${updated.en} · Spanish and English · CC BY 4.0`}
              es={`${k} ${k === 1 ? "clase" : "clases"} · Actualizado en ${updated.es} · En español e inglés · CC BY 4.0`}
            />
          </p>
          {doi && (
            <p className="text-[11px] text-muted">
              <T en="Archived in Zenodo · DOI " es="Archivado en Zenodo · DOI " />
              <a
                href={`https://doi.org/${doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
              >
                {doi}
              </a>
            </p>
          )}
        </div>
        <CourseCover course={c} className="order-1 rounded-xl border border-border shadow-sm sm:order-2" />
      </header>

      <UnitTrack slug={c.slug} units={c.course.unidades} counts={counts} />

      <CourseUnits course={c} />
    </div>
  );
}
