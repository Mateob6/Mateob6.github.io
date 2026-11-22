import type { Metadata } from "next";
import { pageMetadata, PERSON_ID, SITE_URL } from "@/lib/seo";
import { T } from "@/components/content/t";
import { ScrollReveal } from "@/components/content/scroll-reveal";
import { ComingSoonCard, Counts, CourseCard, PanelCurve, RecentList } from "@/components/content/materials";
import { getMaterials, getRecent } from "@/data/materials";
import { teachingDomains } from "@/data/teaching";

export const metadata: Metadata = pageMetadata({
  title: "Materials",
  description:
    "Class slides by Mateo Belalcazar for the courses he teaches, organized by course and unit: view them in the browser or download them as PDF. In Spanish, licensed CC BY 4.0.",
  path: "/materials",
});

const LICENSE_URL = "https://creativecommons.org/licenses/by/4.0/";
const RECENT_MIN = 3; // «Recently published» shows up once there are at least this many classes

export default async function MaterialsPage() {
  const courses = await getMaterials();
  const totalClasses = courses.reduce((a, c) => a + c.total, 0);
  const recent = totalClasses >= RECENT_MIN ? await getRecent(3) : [];
  const domains = teachingDomains
    .map((d, i) => ({ domain: d, courses: courses.filter((c) => c.course.dominio === i) }))
    .filter((d) => d.courses.length > 0);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/materials`,
    name: "Materials — Mateo Belalcazar",
    url: `${SITE_URL}/materials`,
    author: { "@id": PERSON_ID },
    hasPart: courses
      .filter((c) => c.total > 0)
      .map((c) => ({
        "@type": "Course",
        name: c.course.nombre,
        description: c.course.descripcion.en,
        url: `${SITE_URL}/materials/${c.slug}`,
        inLanguage: "es",
        provider: { "@id": PERSON_ID },
      })),
  };

  return (
    <div className="pt-12 space-y-10">
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
              en="Slides I build and use in my courses, organized by course and unit. Each class opens in the browser, in Spanish or English, and can be downloaded as a PDF."
              es="Diapositivas que preparo y uso en mis cursos, organizadas por curso y unidad. Cada clase se abre en el navegador, en español o en inglés, y se puede bajar en PDF."
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
              <T en="Spanish · English" es="Español · inglés" />
            </span>
            <span className="ml-1">
              <Counts courses={courses} />
            </span>
          </div>
        </div>
      </ScrollReveal>

      {/* The courses panel: full width, with the curved top edge */}
      <section className="relative left-1/2 w-[100vw] -translate-x-1/2" aria-labelledby="cursos">
        <PanelCurve />
        {/* the honeycomb under the blue curve, and its pointer light (globals.css «Panal») */}
        <div aria-hidden="true" className="panal-panel" />
        <div aria-hidden="true" className="panal-panel-luz" data-panal-luz="" />
        <div className="bg-surface pb-20">
          <div className="relative z-[1] mx-auto max-w-5xl space-y-14 px-6 pt-4">
            <h2 id="cursos" className="sr-only">
              <T en="Courses" es="Cursos" />
            </h2>

            {recent.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                  <T en="Recently published" es="Recién publicadas" />
                </h3>
                <RecentList items={recent} />
              </div>
            )}

            {domains.map(({ domain, courses: group }) => (
              <div key={domain.nameEn} className="space-y-5">
                <h3 className="border-b border-accent/15 pb-3 text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                  <T en={domain.nameEn} es={domain.nameEs} />
                </h3>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {group.map((c) =>
                    c.total > 0 ? <CourseCard key={c.slug} course={c} /> : <ComingSoonCard key={c.slug} course={c} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
