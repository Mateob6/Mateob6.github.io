// Plain-text (Markdown) copies of every page, for AI agents and LLM crawlers (llms.txt convention, llmstxt.org).
// Built from the same data as the HTML at build time, so they never drift: /index.md, /publications.md, …,
// the Spanish ones under /es, plus /llms.txt (the index) and /llms-full.txt (everything in one file).
import { awards } from "@/data/awards";
import { education } from "@/data/education";
import { groups } from "@/data/groups";
import { COURSE_DOI, getMaterials, SLIDES_URL } from "@/data/materials";
import { presentations } from "@/data/presentations";
import { bio, CV, researchLines } from "@/data/profile";
import { publications } from "@/data/publications";
import { skillGroups } from "@/data/skills";
import { teachingDomains } from "@/data/teaching";
import { localePath, pick, type Lang } from "./i18n";
import { awardText, EMAIL, PROFILES } from "./schema";
import { absUrl, mdPath, SITE_DESCRIPTION, SITE_URL } from "./seo";
import { formatPeriod, levelName } from "./teaching";

const url = (lang: Lang, path: string) => absUrl(localePath(lang, path));
const md = (lang: Lang, path: string) => `${SITE_URL}${mdPath(lang, path)}`;

const articles = publications.filter((p) => p.type === "article");
const chapters = publications.filter((p) => p.type === "chapter");

function reference(p: (typeof publications)[number]) {
  return `${p.authors} (${p.year}). ${p.title}. ${p.journal}.${p.doi ? ` https://doi.org/${p.doi}` : ""}${
    p.book ? ` ISBN ${p.book.isbn}.` : ""
  }`;
}

/** Header shared by every page: who, where, how to cite the name, and the page in the other language */
function header(lang: Lang, title: string, path: string) {
  const other = lang === "en" ? "es" : "en";
  return [
    `# ${title}`,
    "",
    `> ${SITE_DESCRIPTION[lang]}`,
    "",
    `${pick(lang, "Web page", "Página web")}: ${url(lang, path)}`,
    `${pick(lang, "Spanish version", "English version")}: ${url(other, path)} (${pick(lang, "text", "texto")}: ${md(other, path)})`,
    "",
  ].join("\n");
}

export function homeMd(lang: Lang): string {
  const out = [header(lang, "Mateo Belalcazar", "/")];
  out.push(
    `- ${pick(lang, "Location", "Ubicación")}: Cali, Colombia`,
    `- ${pick(lang, "Affiliation", "Afiliación")}: ${pick(
      lang,
      "Universidad del Valle (doctoral student in Psychology, Instituto CIDEAS); university lecturer at Pontificia Universidad Javeriana Cali and Universidad del Valle",
      "Universidad del Valle (estudiante del Doctorado en Psicología, Instituto CIDEAS); docente universitario en la Pontificia Universidad Javeriana Cali y la Universidad del Valle"
    )}`,
    `- Email: ${EMAIL}`,
    `- ORCID: ${PROFILES[0].url}`,
    `- CV (PDF): ${SITE_URL}${CV[lang]}`,
    `- ${pick(lang, "Name forms in publications", "Formas del nombre en publicaciones")}: Belalcazar, M.; Belalcázar, M.; Belalcázar Correa, M.; Belalcazar Correa, M.`,
    "",
    `## ${pick(lang, "About", "Acerca de")}`,
    "",
    ...pick<readonly string[]>(lang, bio.en, bio.es).flatMap((p) => [p, ""]),
    `## ${pick(lang, "Education", "Educación")}`,
    "",
    ...[...education].reverse().map((e) => `- ${pick(lang, e.degreeEn, e.degreeEs)} — ${e.institution}${e.detail ? ` (${e.detail})` : ""}, ${e.period.replace("present", pick(lang, "present", "presente"))}`),
    "",
    `## ${pick(lang, "Research lines", "Líneas de investigación")}`,
    "",
    ...researchLines.flatMap((r) => [`### ${pick(lang, r.titleEn, r.titleEs)}`, "", pick(lang, r.descriptionEn, r.descriptionEs), ""]),
    `## ${pick(lang, "Research groups", "Grupos de investigación")}`,
    "",
    ...groups.map((g) => `- ${g.name} — ${g.institution}, ${g.period.replace("present", pick(lang, "present", "presente"))}${g.rank === "Instituto" ? "" : ` (${pick(lang, "Minciencias category", "categoría Minciencias")} ${g.rank})`}`),
    "",
    `## ${pick(lang, "Selected publications", "Publicaciones destacadas")}`,
    "",
    ...articles.map((p) => `- ${reference(p)}`),
    "",
    `${pick(lang, "All publications", "Todas las publicaciones")}: ${md(lang, "/publications")}`,
    "",
    `## ${pick(lang, "Academic profiles", "Perfiles académicos")}`,
    "",
    ...PROFILES.map((p) => `- ${p.label}: ${p.url}`),
    "",
    `## ${pick(lang, "Pages of this site", "Páginas de este sitio")}`,
    "",
    `- ${pick(lang, "Publications and presentations", "Publicaciones y ponencias")}: ${url(lang, "/publications")} (${md(lang, "/publications")})`,
    `- ${pick(lang, "Teaching", "Docencia")}: ${url(lang, "/teaching")} (${md(lang, "/teaching")})`,
    `- ${pick(lang, "Class materials", "Materiales de clase")}: ${url(lang, "/materials")} (${md(lang, "/materials")})`,
    `- ${pick(lang, "Awards and skills", "Premios y habilidades")}: ${url(lang, "/more")} (${md(lang, "/more")})`,
    ""
  );
  return out.join("\n");
}

export function publicationsMd(lang: Lang): string {
  return [
    header(lang, pick(lang, "Publications & Presentations — Mateo Belalcazar", "Publicaciones y Presentaciones — Mateo Belalcazar"), "/publications"),
    `## ${pick(lang, "Peer-reviewed articles", "Artículos revisados por pares")}`,
    "",
    ...articles.map((p) => `- ${reference(p)}${p.quartile ? ` [${p.quartile}]` : ""}`),
    "",
    `## ${pick(lang, "Book chapters", "Capítulos de libro")}`,
    "",
    ...chapters.map((p) => `- ${reference(p)}`),
    "",
    `## ${pick(lang, "Conference presentations", "Ponencias en congresos")}`,
    "",
    ...presentations.map((p) => `- ${p.title.replace(/\.$/, "")}. ${p.venue}, ${p.location}, ${p.year}.`),
    "",
  ].join("\n");
}

export async function teachingMd(lang: Lang): Promise<string> {
  const courses = await getMaterials();
  const withSlides = Object.fromEntries(courses.filter((c) => c.total > 0).map((c) => [c.course.perfil, c.slug]));
  const out = [
    header(lang, pick(lang, "Teaching — Mateo Belalcazar", "Docencia — Mateo Belalcazar"), "/teaching"),
    pick(
      lang,
      "University courses in three areas, across undergraduate and graduate programs at Pontificia Universidad Javeriana Cali, Universidad del Valle and Universidad de San Buenaventura Cali (Colombia). Courses are taught in Spanish; semesters are written year-term (2026-02 is the second term of 2026).",
      "Cursos universitarios en tres áreas, en programas de pregrado y posgrado de la Pontificia Universidad Javeriana Cali, la Universidad del Valle y la Universidad de San Buenaventura Cali (Colombia). Los cursos se dictan en español; los semestres se escriben año-periodo (2026-02 es el segundo periodo de 2026)."
    ),
    "",
  ];
  for (const d of teachingDomains) {
    out.push(`## ${pick(lang, d.nameEn, d.nameEs)}`, "", `${pick(lang, "On the site", "En el sitio")}: ${url(lang, `/teaching#${d.slug}`)}`, "");
    for (const c of d.courses) {
      out.push(`### ${c.name}`, "", pick(lang, c.descriptionEn, c.descriptionEs), "");
      for (const x of c.instances) {
        out.push(`- ${x.university} · ${levelName(x.level, lang)} · ${formatPeriod(x.semesters, lang)} (${pick(lang, "semesters", "semestres")} ${x.semesters.join(", ")})`);
      }
      if (withSlides[c.name]) out.push(`- ${pick(lang, "Class slides", "Diapositivas de clase")}: ${url(lang, `/materials/${withSlides[c.name]}`)}`);
      out.push("");
    }
  }
  return out.join("\n");
}

export async function materialsMd(lang: Lang): Promise<string> {
  const courses = await getMaterials();
  const out = [
    header(lang, pick(lang, "Class Materials — Mateo Belalcazar", "Materiales de clase — Mateo Belalcazar"), "/materials"),
    pick(
      lang,
      "Slides I build and use in my courses, organized by course and unit. Each class opens in the browser, in Spanish or English (add ?en to the slides URL), and can be downloaded as a PDF. License: CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/).",
      "Diapositivas que preparo y uso en mis cursos, organizadas por curso y unidad. Cada clase se abre en el navegador, en español o en inglés (con ?en al final de la dirección), y se puede bajar en PDF. Licencia: CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/)."
    ),
    "",
  ];
  for (const c of courses) {
    const domain = teachingDomains[c.course.dominio];
    out.push(`## ${c.course.nombre}`, "", `${pick(lang, "Area", "Área")}: ${pick(lang, domain.nameEn, domain.nameEs)}`, "");
    out.push(pick(lang, c.course.descripcion.en, c.course.descripcion.es), "");
    if (c.total === 0) {
      out.push(pick(lang, "Classes in preparation.", "Clases en preparación."), "");
      out.push(`${pick(lang, "Units", "Unidades")}: ${c.course.unidades.map((u) => `${u.numero}. ${pick(lang, u.en, u.es)}`).join("; ")}`, "");
      continue;
    }
    out.push(`${pick(lang, "Course page", "Página del curso")}: ${url(lang, `/materials/${c.slug}`)}`);
    if (COURSE_DOI[c.slug]) out.push(`${pick(lang, "Archived in Zenodo", "Archivado en Zenodo")}: https://doi.org/${COURSE_DOI[c.slug]}`);
    out.push("");
    for (const { unit, classes } of c.units) {
      out.push(`### ${pick(lang, "Unit", "Unidad")} ${unit.numero} · ${pick(lang, unit.en, unit.es)}`, "");
      if (classes.length === 0) {
        out.push(pick(lang, "Coming soon.", "Próximamente."), "");
        continue;
      }
      for (const d of classes) {
        const en = lang === "en" && d.titulo_en;
        out.push(
          `#### ${en ? d.titulo_en : d.titulo}${d.titulo_en ? ` (${en ? d.titulo : d.titulo_en})` : ""}`,
          "",
          en && d.resumen_en ? d.resumen_en : d.resumen,
          "",
          `- ${pick(lang, "Slides (web)", "Presentación (web)")}: ${SLIDES_URL}${d.ruta}/${en ? "?en" : ""}`,
          `- PDF (${pick(lang, "Spanish", "español")}): ${SLIDES_URL}${d.pdf}`,
          ...(d.pdf_en ? [`- PDF (${pick(lang, "English", "inglés")}): ${SLIDES_URL}${d.pdf_en}`] : []),
          `- ${d.diapositivas} ${pick(lang, "slides", "diapositivas")} · ${pick(lang, "updated", "actualizada")} ${d.actualizada}`,
          ""
        );
      }
    }
  }
  return out.join("\n");
}

export function recognitionMd(lang: Lang): string {
  const out = [
    header(lang, pick(lang, "Awards & Skills — Mateo Belalcazar", "Premios y Habilidades — Mateo Belalcazar"), "/more"),
    `## ${pick(lang, "Awards and grants", "Premios y becas")}`,
    "",
    ...awards.map((a) => `- ${awardText(a, lang)}`),
    "",
    `## ${pick(lang, "Skills", "Habilidades")}`,
    "",
  ];
  for (const g of skillGroups) {
    out.push(`### ${pick(lang, g.categoryEn, g.categoryEs)}`, "");
    if (g.items) out.push(g.items.join(", "), "");
    for (const s of g.subgroups ?? []) out.push(`- ${pick(lang, s.labelEn, s.labelEs)}: ${s.items.join(", ")}`);
    if (g.subgroups) out.push("");
  }
  return out.join("\n");
}

/** /llms.txt: what the site is and where the plain-text pages are (llmstxt.org format) */
export async function llmsTxt(): Promise<string> {
  const courses = await getMaterials();
  const classes = courses.reduce((a, c) => a + c.total, 0);
  const nCourses = teachingDomains.reduce((a, d) => a + d.courses.length, 0);
  return [
    "# Mateo Belalcazar",
    "",
    `> ${SITE_DESCRIPTION.en}`,
    "",
    "Academic website of Mateo Belalcazar (also published as Mateo Belalcázar and Mateo Belalcázar Correa; ORCID 0000-0001-8276-9734), doctoral student in Psychology at Universidad del Valle (Instituto CIDEAS, Cali, Colombia), with a B.Sc. in Psychology and an M.Sc. in Statistics from the same university. University lecturer in statistics, research methodology and cognitive development at Pontificia Universidad Javeriana Cali and Universidad del Valle. The research combines psychometrics, quantitative methodology and computational methods (artificial intelligence, contextual embeddings) to study how psychological constructs are measured, mainly in cognitive development and education.",
    "",
    `Every page exists in English (${SITE_URL}) and Spanish (${SITE_URL}/es). Each one has a plain-text copy: add .md to its address (the home is /index.md).`,
    "",
    "## Pages",
    "",
    `- [Profile](${md("en", "/")}): bio, education, research lines, research groups and selected publications`,
    `- [Publications and presentations](${md("en", "/publications")}): ${articles.length} peer-reviewed articles with DOI, ${chapters.length} book chapter${chapters.length === 1 ? "" : "s"} and ${presentations.length} conference presentations`,
    `- [Teaching](${md("en", "/teaching")}): ${nCourses} university courses at three Colombian universities, by area, with semesters`,
    `- [Class materials](${md("en", "/materials")}): open class slides (CC BY 4.0) by course and unit, ${classes} ${classes === 1 ? "class" : "classes"} published so far, with PDFs in Spanish and English, archived in Zenodo`,
    `- [Awards and skills](${md("en", "/more")}): ${awards.length} awards and grants; statistical, psychometric and computational methods`,
    "",
    "## En español",
    "",
    `- [Perfil](${md("es", "/")})`,
    `- [Publicaciones y ponencias](${md("es", "/publications")})`,
    `- [Docencia](${md("es", "/teaching")})`,
    `- [Materiales de clase](${md("es", "/materials")})`,
    `- [Premios y habilidades](${md("es", "/more")})`,
    "",
    "## Academic profiles",
    "",
    ...PROFILES.map((p) => `- [${p.label}](${p.url})`),
    "",
    "## Optional",
    "",
    `- [Full text of the site in one file](${SITE_URL}/llms-full.txt)`,
    `- [CV in English (PDF)](${SITE_URL}${CV.en})`,
    `- [CV en español (PDF)](${SITE_URL}${CV.es})`,
    `- [Sitemap](${SITE_URL}/sitemap.xml)`,
    "",
  ].join("\n");
}

/** /llms-full.txt: every English page, one after the other */
export async function llmsFullTxt(): Promise<string> {
  const pages = [homeMd("en"), publicationsMd("en"), await teachingMd("en"), await materialsMd("en"), recognitionMd("en")];
  return pages.join("\n---\n\n");
}

export function markdownResponse(text: string, type = "text/markdown") {
  return new Response(text, { headers: { "Content-Type": `${type}; charset=utf-8` } });
}
