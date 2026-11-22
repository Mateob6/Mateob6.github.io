// Materials: class slides built with Mateo's slide engine (repo Mateob6/diapositivas, served at /diapositivas/).
// The source of truth is that site: clases.json (one entry per class) and cursos.json (courses and units).
// `clase.py publicar` writes both and then triggers this site's deploy, so a newly published class shows up here.
// Fetched once during `next build`; if the fetch fails the build fails, so GitHub Pages keeps the previous version.

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
};

export type MaterialsCourse = {
  slug: string;
  course: Course;
  units: { unit: Unit; classes: ClassDeck[] }[];
};

async function getJson<T>(file: string): Promise<T> {
  // ?v= skips the GitHub Pages CDN copy, so the build always reads the latest published index
  const res = await fetch(`${SLIDES_URL}${file}?v=${Date.now()}`);
  if (!res.ok) throw new Error(`Materials: could not read ${SLIDES_URL}${file} (${res.status})`);
  return (await res.json()) as T;
}

export async function getMaterials(): Promise<MaterialsCourse[]> {
  const [courses, classes] = await Promise.all([
    getJson<Record<string, Course>>("cursos.json"),
    getJson<ClassDeck[]>("clases.json"),
  ]);
  return Object.entries(courses)
    .map(([slug, course]) => ({
      slug,
      course,
      units: course.unidades
        .map((unit) => ({
          unit,
          classes: classes
            .filter((c) => c.curso === slug && c.unidad === unit.slug)
            .sort((a, b) => a.orden - b.orden || a.titulo.localeCompare(b.titulo, "es")),
        }))
        .filter((u) => u.classes.length > 0),
    }))
    .filter((c) => c.units.length > 0);
}

/** Teaching course name → anchor on /materials, for the courses that already have slides */
export async function getMaterialsLinks(): Promise<Record<string, string>> {
  const courses = await getMaterials();
  return Object.fromEntries(courses.map((c) => [c.course.perfil, `/materials#${c.slug}`]));
}

const MONTHS_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_ES = ["ene.", "feb.", "mar.", "abr.", "may.", "jun.", "jul.", "ago.", "sep.", "oct.", "nov.", "dic."];

export function formatUpdated(date: string): { en: string; es: string } {
  const [y, m] = date.split("-").map(Number);
  return { en: `${MONTHS_EN[m - 1]} ${y}`, es: `${MONTHS_ES[m - 1]} de ${y}` };
}
