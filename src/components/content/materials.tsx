import Link from "next/link";
import { ViewTransition } from "react";
import { T } from "@/components/content/t";
import { formatUpdated, SLIDES_URL, type ClassDeck, type MaterialsCourse, type Unit } from "@/data/materials";

const abs = (path: string) => (path.startsWith("/") || path.startsWith("http") ? path : `${SLIDES_URL}${path}`);

/** The slide chosen as thumbnail, light or dark following the site theme (classes in globals.css) */
export function Thumb({ deck }: { deck: ClassDeck }) {
  const img = "absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]";
  return (
    <span className="relative block aspect-video overflow-hidden bg-surface">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={abs(deck.miniatura)} alt={`Diapositiva de la clase ${deck.titulo}`} loading="lazy" className={`thumb-light ${img}`} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={abs(deck.miniatura_oscura || deck.miniatura)} alt="" aria-hidden="true" loading="lazy" className={`thumb-dark ${img}`} />
    </span>
  );
}

function Meta({ deck }: { deck: ClassDeck }) {
  const u = formatUpdated(deck.actualizada);
  return (
    <p className="text-[11px] text-muted">
      <T en={`${deck.diapositivas} slides · Updated ${u.en}`} es={`${deck.diapositivas} diapositivas · Actualizada en ${u.es}`} />
    </p>
  );
}

function Buttons({ deck }: { deck: ClassDeck }) {
  const base = "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors";
  return (
    <div className="flex flex-wrap gap-2">
      <a href={`${abs(deck.ruta)}/`} target="_blank" rel="noopener noreferrer" className={`${base} bg-accent text-accent-foreground hover:opacity-90`}>
        <T en="View slides" es="Ver presentación" />
        <span aria-hidden="true">↗</span>
      </a>
      <a href={abs(deck.pdf)} download className={`${base} border border-border text-foreground hover:border-accent/40 hover:text-accent`}>
        PDF
        <span aria-hidden="true">↓</span>
      </a>
    </div>
  );
}

function Summary({ deck }: { deck: ClassDeck }) {
  return (
    <p className="text-[13px] text-muted leading-relaxed">
      <T en={deck.resumen_en || deck.resumen} es={deck.resumen} />
    </p>
  );
}

/** One row per class: thumbnail on the left, text and buttons on the right (stacked on mobile) */
export function ClassRow({ deck }: { deck: ClassDeck }) {
  return (
    <article className="group flex flex-col gap-5 border-b border-border/40 py-5 last:border-b-0 sm:flex-row">
      <a href={`${abs(deck.ruta)}/`} target="_blank" rel="noopener noreferrer" className="block shrink-0 overflow-hidden rounded-lg border border-border sm:w-60" tabIndex={-1}>
        <Thumb deck={deck} />
      </a>
      <div className="flex-1 space-y-2">
        <h3 className="font-serif text-lg leading-snug text-foreground">{deck.titulo}</h3>
        <Summary deck={deck} />
        <Meta deck={deck} />
        <div className="pt-1">
          <Buttons deck={deck} />
        </div>
      </div>
    </article>
  );
}

/** The course units in order; units without published classes stay faint */
export function UnitTrack({ slug, units, counts }: { slug: string; units: Unit[]; counts: Record<string, number> }) {
  return (
    <ol className="mt-5 grid gap-3 sm:grid-flow-col sm:auto-cols-fr sm:gap-0">
      {units.map((u, i) => {
        const n = counts[u.slug] ?? 0;
        const on = n > 0;
        const body = (
          <>
            <span
              className={`relative z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-semibold ${
                on ? "bg-accent text-accent-foreground" : "border border-border bg-background text-muted"
              }`}
            >
              {u.numero}
            </span>
            <span className="min-w-0">
              <span className={`block text-[13px] leading-snug ${on ? "text-foreground" : "text-muted"}`}>
                <T en={u.en} es={u.es} />
              </span>
              <span className={`block text-[11px] ${on ? "text-accent" : "text-muted"}`}>
                {on ? (
                  <T en={`${n} ${n === 1 ? "class" : "classes"}`} es={`${n} ${n === 1 ? "clase" : "clases"}`} />
                ) : (
                  <T en="Coming soon" es="Próximamente" />
                )}
              </span>
            </span>
          </>
        );
        return (
          <li key={u.slug} className={`relative flex items-start gap-3 sm:flex-col sm:pr-6 ${on ? "" : "opacity-50"}`}>
            {i < units.length - 1 && (
              <span aria-hidden="true" className="absolute left-3.5 top-7 h-[calc(100%-0.25rem)] w-px bg-border sm:left-7 sm:right-0 sm:top-3.5 sm:h-px sm:w-auto" />
            )}
            {on ? (
              <a href={`#${slug}-${u.slug}`} className="flex items-start gap-3 hover:opacity-80 sm:flex-col">
                {body}
              </a>
            ) : (
              <div className="flex items-start gap-3 sm:flex-col">{body}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

const plural = (n: number, en: [string, string], es: [string, string]) => ({
  en: `${n} ${n === 1 ? en[0] : en[1]}`,
  es: `${n} ${n === 1 ? es[0] : es[1]}`,
});

/** Intro line: courses and classes */
export function Counts({ courses }: { courses: MaterialsCourse[] }) {
  const c = plural(courses.length, ["course", "courses"], ["curso", "cursos"]);
  const k = plural(courses.reduce((a, x) => a + x.total, 0), ["class", "classes"], ["clase", "clases"]);
  return <T en={`${c.en} · ${k.en}`} es={`${c.es} · ${k.es}`} />;
}

/** Shared name for the cover that morphs from the course card into the course page header */
export function CourseCover({ course, className = "" }: { course: MaterialsCourse; className?: string }) {
  return (
    <ViewTransition name={`curso-${course.slug}`} share="morph" default="none">
      <span className={`block overflow-hidden ${className}`}>{course.cover && <Thumb deck={course.cover} />}</span>
    </ViewTransition>
  );
}

function CourseStats({ course }: { course: MaterialsCourse }) {
  const u = plural(course.course.unidades.length, ["unit", "units"], ["unidad", "unidades"]);
  if (course.total === 0) {
    return <T en={`${u.en} · classes in preparation`} es={`${u.es} · clases en preparación`} />;
  }
  const k = plural(course.total, ["class", "classes"], ["clase", "clases"]);
  const d = formatUpdated(course.updated!);
  return <T en={`${u.en} · ${k.en} · ${d.en}`} es={`${u.es} · ${k.es} · ${d.es}`} />;
}

/** A course with classes: the whole card opens its page */
export function CourseCard({ course }: { course: MaterialsCourse }) {
  return (
    <Link
      href={`/materials/${course.slug}`}
      className="group card-lift flex flex-col overflow-hidden rounded-xl border border-border bg-background"
    >
      <CourseCover course={course} className="border-b border-border" />
      <span className="flex flex-1 flex-col gap-2 p-5">
        <span className="font-serif text-lg font-bold leading-snug text-foreground">{course.course.nombre}</span>
        <span className="line-clamp-2 text-[13px] leading-relaxed text-muted">
          <T en={course.course.descripcion.en} es={course.course.descripcion.es} />
        </span>
        <span className="mt-auto pt-2 text-[11px] text-muted">
          <CourseStats course={course} />
        </span>
        <span className="text-xs font-medium text-accent">
          <T en="Open course →" es="Ver curso →" />
        </span>
      </span>
    </Link>
  );
}

/** Honeycomb pattern for courses that have no classes yet; follows the theme through currentColor */
function HexPattern() {
  return (
    <svg aria-hidden="true" className="absolute inset-0 h-full w-full text-border">
      <defs>
        <pattern id="hexagonos" width="28" height="48.5" patternUnits="userSpaceOnUse" patternTransform="scale(0.9)">
          <path
            d="M14 0 L28 8.08 L28 24.25 L14 32.33 L0 24.25 L0 8.08 Z M14 32.33 L14 48.5 M0 24.25 L-14 32.33 M28 24.25 L42 32.33"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hexagonos)" />
    </svg>
  );
}

/** A course Mateo teaches but without published classes: visible, not clickable */
export function ComingSoonCard({ course }: { course: MaterialsCourse }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-dashed border-border bg-background/60" aria-disabled="true">
      <span className="relative block aspect-video overflow-hidden border-b border-dashed border-border">
        <HexPattern />
        <span className="absolute inset-0 grid place-items-center">
          <span className="rounded-full border border-border bg-background px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-muted">
            <T en="Coming soon" es="Próximamente" />
          </span>
        </span>
      </span>
      <span className="flex flex-1 flex-col gap-2 p-5">
        <span className="font-serif text-lg font-bold leading-snug text-foreground/70">{course.course.nombre}</span>
        <span className="line-clamp-2 text-[13px] leading-relaxed text-muted">
          <T en={course.course.descripcion.en} es={course.course.descripcion.es} />
        </span>
        <span className="mt-auto pt-2 text-[11px] text-muted">
          <CourseStats course={course} />
        </span>
      </span>
    </div>
  );
}

/** The latest classes across courses, compact */
export function RecentList({ items }: { items: { deck: ClassDeck; course: MaterialsCourse }[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-3">
      {items.map(({ deck, course }) => (
        <li key={deck.ruta}>
          <a href={`${abs(deck.ruta)}/`} target="_blank" rel="noopener noreferrer" className="group flex gap-3 sm:flex-col">
            <span className="w-32 shrink-0 overflow-hidden rounded-md border border-border sm:w-full">
              <Thumb deck={deck} />
            </span>
            <span className="min-w-0">
              <span className="block text-[11px] uppercase tracking-wider text-accent">{course.course.nombre}</span>
              <span className="block font-serif text-[15px] leading-snug text-foreground group-hover:text-accent">{deck.titulo}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/** The top edge of the courses panel: the curve Mateo drew (flat, a broad rise, then a drop at the right) */
export function PanelCurve() {
  const top = "M0 64 C 380 64 640 66 860 50 C 1060 34 1190 26 1290 34 C 1360 40 1410 66 1440 96";
  return (
    <svg aria-hidden="true" viewBox="0 0 1440 120" preserveAspectRatio="none" className="block h-12 w-full sm:h-20">
      <path d={`${top} L1440 120 L0 120 Z`} className="fill-surface" />
      <path d={top} fill="none" className="stroke-accent/40" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/** The units of one course (course page): heading per unit and its classes */
export function CourseUnits({ course }: { course: MaterialsCourse }) {
  return (
    <div className="space-y-12">
      {course.units
        .filter((u) => u.classes.length > 0)
        .map(({ unit, classes }) => (
          <section key={unit.slug} id={`${course.slug}-${unit.slug}`} className="scroll-mt-20 space-y-4">
            <h2 className="border-b border-accent/15 pb-3 text-xs font-semibold uppercase tracking-[0.15em] text-accent">
              <T en={`Unit ${unit.numero} · ${unit.en}`} es={`Unidad ${unit.numero} · ${unit.es}`} />
            </h2>
            <div>
              {classes.map((k) => (
                <ClassRow key={k.ruta} deck={k} />
              ))}
            </div>
          </section>
        ))}
    </div>
  );
}
