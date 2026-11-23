import type { Metadata } from "next";
import { absUrl, pageMetadata, PERSON_ID } from "@/lib/seo";
import { localePath, pick, type Lang } from "@/lib/i18n";
import { setLang } from "@/lib/lang-server";
import { breadcrumbs, jsonLd } from "@/lib/schema";
import { T } from "@/components/content/t";
import { ScrollReveal } from "@/components/content/scroll-reveal";
import { ComingSoonCard, Counts, CourseCard, RecentList } from "@/components/content/materials";
import { CurvedPanel } from "@/components/content/curved-panel";
import { getMaterials, getRecent } from "@/data/materials";
import { teachingDomains } from "@/data/teaching";

export function materialsMetadata(lang: Lang): Metadata {
  return pageMetadata({
    lang,
    title: pick(lang, "Materials", "Materiales"),
    description: pick(
      lang,
      "Class slides by Mateo Belalcazar for the courses he teaches, organized by course and unit: view them in the browser, in Spanish or English, or download them as PDF. Licensed CC BY 4.0.",
      "Diapositivas de clase de Mateo Belalcazar para los cursos que dicta, organizadas por curso y unidad: se ven en el navegador, en español o en inglés, o se bajan en PDF. Licencia CC BY 4.0."
    ),
    path: "/materials",
  });
}

const LICENSE_URL = "https://creativecommons.org/licenses/by/4.0/";
const RECENT_MIN = 3; // «Recently published» shows up once there are at least this many classes

export async function MaterialsView({ lang }: { lang: Lang }) {
  setLang(lang);
  const courses = await getMaterials();
  const totalClasses = courses.reduce((a, c) => a + c.total, 0);
  const recent = totalClasses >= RECENT_MIN ? await getRecent(3) : [];
  const domains = teachingDomains
    .map((d, i) => ({ domain: d, courses: courses.filter((c) => c.course.dominio === i) }))
    .filter((d) => d.courses.length > 0);

  const url = absUrl(localePath(lang, "/materials"));
  const title = pick(lang, "Materials", "Materiales");
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": url,
        name: `${title} — Mateo Belalcazar`,
        url,
        inLanguage: lang,
        author: { "@id": PERSON_ID },
        license: LICENSE_URL,
        hasPart: courses
          .filter((c) => c.total > 0)
          .map((c) => ({
            "@type": "Course",
            name: c.course.nombre,
            description: pick(lang, c.course.descripcion.en, c.course.descripcion.es),
            url: absUrl(localePath(lang, `/materials/${c.slug}`)),
            inLanguage: ["es", "en"],
            provider: { "@id": PERSON_ID },
          })),
      },
      breadcrumbs(lang, [{ name: title, path: "/materials" }]),
    ],
  };

  return (
    <div className="pt-12 space-y-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />

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
      <CurvedPanel final labelledBy="cursos">
        <div className="space-y-14">
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
            <div key={domain.nameEn} id={domain.slug} className="scroll-mt-20 space-y-5">
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
      </CurvedPanel>
    </div>
  );
}
