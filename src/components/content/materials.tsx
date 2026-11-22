import { T } from "@/components/content/t";
import { formatUpdated, SLIDES_URL, type ClassDeck, type MaterialsCourse, type Unit } from "@/data/materials";

const abs = (path: string) => (path.startsWith("/") || path.startsWith("http") ? path : `${SLIDES_URL}${path}`);

/** The slide chosen as thumbnail, light or dark following the site theme (classes in globals.css) */
function Thumb({ deck }: { deck: ClassDeck }) {
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
        <h4 className="font-serif text-lg leading-snug text-foreground">{deck.titulo}</h4>
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

/** Intro line: counts of courses, units and classes */
export function Counts({ courses }: { courses: MaterialsCourse[] }) {
  const units = courses.reduce((a, c) => a + c.units.length, 0);
  const classes = courses.reduce((a, c) => a + c.units.reduce((b, u) => b + u.classes.length, 0), 0);
  const p = (n: number, en: [string, string], es: [string, string]) => ({ en: `${n} ${n === 1 ? en[0] : en[1]}`, es: `${n} ${n === 1 ? es[0] : es[1]}` });
  const c = p(courses.length, ["course", "courses"], ["curso", "cursos"]);
  const u = p(units, ["unit", "units"], ["unidad", "unidades"]);
  const k = p(classes, ["class", "classes"], ["clase", "clases"]);
  return <T en={`${c.en} · ${u.en} · ${k.en}`} es={`${c.es} · ${u.es} · ${k.es}`} />;
}

/** The course sections: name, description, unit track, then each unit with its classes */
export function MaterialsCourses({ courses }: { courses: MaterialsCourse[] }) {
  return (
    <div className="space-y-16">
      {courses.map(({ slug, course, units }) => {
        const counts = Object.fromEntries(units.map((u) => [u.unit.slug, u.classes.length]));
        return (
          <section key={slug} id={slug} className="scroll-mt-20 space-y-10">
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground">{course.nombre}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                <T en={course.descripcion.en} es={course.descripcion.es} />
              </p>
              <UnitTrack slug={slug} units={course.unidades} counts={counts} />
            </div>
            {units.map(({ unit, classes }) => (
              <div key={unit.slug} id={`${slug}-${unit.slug}`} className="scroll-mt-20 space-y-4">
                <h3 className="border-b border-accent/15 pb-3 text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                  <T en={`Unit ${unit.numero} · ${unit.en}`} es={`Unidad ${unit.numero} · ${unit.es}`} />
                </h3>
                <div>
                  {classes.map((k) => (
                    <ClassRow key={k.ruta} deck={k} />
                  ))}
                </div>
              </div>
            ))}
          </section>
        );
      })}
    </div>
  );
}
