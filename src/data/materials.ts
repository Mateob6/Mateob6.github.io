// Materials: class slides built with Mateo's slide engine (repo Mateob6/diapositivas, served at /diapositivas/).
// The source of truth is that site: clases.json (one entry per class) and cursos.json (courses and their units).
// `clase.py publicar` and `clase.py cursos` write them and then trigger this site's deploy.
// Fetched once per build; if the fetch fails the build fails, so GitHub Pages keeps the previous version.
// Every course in cursos.json is listed (the ones Mateo teaches now); only courses with classes get their own page.

export const SLIDES_URL = "https://mateob6.github.io/diapositivas/";

export type Unit = { numero: number; slug: string; es: string; en: string };

export type Course = {
  nombre: string;
  perfil: string; // course name as it appears in teaching.ts
  dominio: number; // index of the teaching domain
  descripcion: { es: string; en: string };
  unidades: Unit[];
};

export type ClassDeck = {
  curso: string;
  unidad: string;
  clase: string;
  ruta: string;
  titulo: string;
  resumen: string;
  resumen_en: string;
  orden: number;
  pdf: string;
  diapositivas: number;
  actualizada: string; // YYYY-MM-DD
  miniatura: string; // WebP 960 × 540 of the slide chosen in publicacion.json (light theme)
  miniatura_oscura?: string; // same slide in the deck's dark mode
};

export type MaterialsCourse = {
  slug: string;
  course: Course;
  units: { unit: Unit; classes: ClassDeck[] }[]; // all units of the course, in order (some may be empty)
  total: number; // classes published
  updated: string | null; // most recent class date
  cover: ClassDeck | null; // most recent class: its thumbnail is the course cover
};

// One cache-busting value per build, so every page of the same build reads the same data
// (and the GitHub Pages CDN copy is skipped).
const VERSION = Date.now();

async function getJson<T>(file: string): Promise<T> {
  const res = await fetch(`${SLIDES_URL}${file}?v=${VERSION}`);
  if (!res.ok) throw new Error(`Materials: could not read ${SLIDES_URL}${file} (${res.status})`);
  return (await res.json()) as T;
}

const byDateDesc = (a: ClassDeck, b: ClassDeck) => b.actualizada.localeCompare(a.actualizada) || a.orden - b.orden;

export async function getMaterials(): Promise<MaterialsCourse[]> {
  const [courses, classes] = await Promise.all([
    getJson<Record<string, Course>>("cursos.json"),
    getJson<ClassDeck[]>("clases.json"),
  ]);
  const list = Object.entries(courses).map(([slug, course], i) => {
    const mine = classes.filter((c) => c.curso === slug);
    const recent = [...mine].sort(byDateDesc)[0] ?? null;
    return {
      i,
      slug,
      course,
      units: course.unidades.map((unit) => ({
        unit,
        classes: mine
          .filter((c) => c.unidad === unit.slug)
          .sort((a, b) => a.orden - b.orden || a.titulo.localeCompare(b.titulo, "es")),
      })),
      total: mine.length,
      updated: recent?.actualizada ?? null,
      cover: recent,
    };
  });
  // by teaching domain, then in cursos.json order
  return list.sort((a, b) => a.course.dominio - b.course.dominio || a.i - b.i).map(({ i: _i, ...c }) => c);
}

export async function getCourse(slug: string): Promise<MaterialsCourse | undefined> {
  return (await getMaterials()).find((c) => c.slug === slug);
}

/** Teaching course name → its page on /materials, for the courses that already have slides */
export async function getMaterialsLinks(): Promise<Record<string, string>> {
  const courses = await getMaterials();
  return Object.fromEntries(courses.filter((c) => c.total > 0).map((c) => [c.course.perfil, `/materials/${c.slug}`]));
}

/** The latest classes published, across courses */
export async function getRecent(n: number): Promise<{ deck: ClassDeck; course: MaterialsCourse }[]> {
  const courses = await getMaterials();
  return courses
    .flatMap((course) => course.units.flatMap((u) => u.classes.map((deck) => ({ deck, course }))))
    .sort((a, b) => byDateDesc(a.deck, b.deck))
    .slice(0, n);
}

const MONTHS_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_ES = ["ene.", "feb.", "mar.", "abr.", "may.", "jun.", "jul.", "ago.", "sep.", "oct.", "nov.", "dic."];

export function formatUpdated(date: string): { en: string; es: string } {
  const [y, m] = date.split("-").map(Number);
  return { en: `${MONTHS_EN[m - 1]} ${y}`, es: `${MONTHS_ES[m - 1]} de ${y}` };
}
